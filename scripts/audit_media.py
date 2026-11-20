import os
import re
import json
from collections import defaultdict

MEDIA_EXTS = {
    # Images
    '.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif', '.ico',
    # Videos
    '.mp4', '.webm', '.mov', '.mkv',
    # Documents
    '.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx'
}

EXCLUDE_DIRS = {'node_modules', '.next', '.git', 'out', '.gemini', '.turbo'}

def run_audit():
    # 1. Discover all media files
    local_media = {}
    folder_tree = defaultdict(list)
    file_type_breakdown = defaultdict(lambda: {'count': 0, 'size': 0})
    
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in MEDIA_EXTS:
                rel_path = os.path.normpath(os.path.join(root, f))
                size = os.path.getsize(rel_path)
                
                # Next.js web path representation
                if rel_path.startswith('public/'):
                    web_path = '/' + rel_path[len('public/'):]
                else:
                    web_path = '/' + rel_path
                    
                local_media[rel_path] = {
                    'filename': f,
                    'ext': ext,
                    'size': size,
                    'web_path': web_path,
                    'rel_path': rel_path,
                    'dir': os.path.dirname(rel_path)
                }
                
                folder_tree[os.path.dirname(rel_path)].append(rel_path)
                file_type_breakdown[ext]['count'] += 1
                file_type_breakdown[ext]['size'] += size

    # 2. Search for all references across source files
    code_exts = {'.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.md', '.html'}
    references_by_file = defaultdict(list)
    source_files_with_media = set()
    external_urls = []
    dynamic_references = []
    
    # URL patterns
    media_url_regex = re.compile(
        r'https?://[^\s"\'<>)]+\.(?:jpg|jpeg|png|webp|gif|svg|avif|ico|mp4|webm|pdf|doc|docx)', 
        re.IGNORECASE
    )
    
    all_source_files = []
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for f in files:
            ext = os.path.splitext(f)[1].lower()
            if ext in code_exts:
                all_source_files.append(os.path.normpath(os.path.join(root, f)))

    for src_path in all_source_files:
        # Skip audit script or output from check
        if 'audit_media.py' in src_path or 'media-migration' in src_path:
            continue
        try:
            with open(src_path, 'r', encoding='utf-8', errors='ignore') as fp:
                lines = fp.readlines()
                full_content = ''.join(lines)
                
                # Check for external URLs
                for m in media_url_regex.finditer(full_content):
                    external_urls.append({
                        'url': m.group(0),
                        'source': src_path
                    })
                
                # Check for dynamic references like `/images/` with template literals or variables
                for line_idx, line in enumerate(lines, 1):
                    if ('/images/' in line or '/documents/' in line) and ('${' in line or ' + ' in line):
                        dynamic_references.append({
                            'source': src_path,
                            'line': line_idx,
                            'code': line.strip()
                        })

                # Check references to each local media
                for rel_path, meta in local_media.items():
                    web_path = meta['web_path'] # e.g. /images/hero/campus-main.webp
                    raw_filename = meta['filename'] # e.g. campus-main.webp
                    path_no_slash = web_path.lstrip('/')
                    
                    found = False
                    # Direct path reference: "/images/..." or "images/..."
                    if web_path in full_content or f'"{path_no_slash}"' in full_content or f"'{path_no_slash}'" in full_content:
                        found = True
                    # In Next.js favicon/metadata can refer to /favicon.ico or favicon.ico
                    elif raw_filename in full_content and ('favicon' in raw_filename or 'og-image' in raw_filename):
                        found = True
                        
                    if found:
                        references_by_file[rel_path].append(src_path)
                        source_files_with_media.add(src_path)

        except Exception as e:
            print(f"Error reading {src_path}: {e}")

    # 3. Classify assets
    referenced_assets = []
    unused_assets = []
    uncertain_assets = []
    
    for rel_path, meta in local_media.items():
        refs = references_by_file.get(rel_path, [])
        if refs:
            # Check if it's only referenced in docs or scrape scripts vs actual app/content/components
            app_refs = [r for r in refs if not r.startswith('docs/') and not r.startswith('scripts/scrape/output/')]
            if app_refs:
                meta['refs'] = refs
                meta['app_refs'] = app_refs
                referenced_assets.append(meta)
            else:
                meta['refs'] = refs
                meta['uncertain_reason'] = f"Only referenced in docs or scrape output ({', '.join(refs)})"
                uncertain_assets.append(meta)
        else:
            # Check if filename appears without extension or partially
            base = os.path.splitext(meta['filename'])[0]
            unused_assets.append(meta)

    output = {
        'total_files': len(local_media),
        'total_size_bytes': sum(m['size'] for m in local_media.values()),
        'referenced_count': len(referenced_assets),
        'unused_count': len(unused_assets),
        'uncertain_count': len(uncertain_assets),
        'external_urls_count': len(external_urls),
        'dynamic_references_count': len(dynamic_references),
        'file_type_breakdown': dict(file_type_breakdown),
        'folder_tree': {k: len(v) for k, v in folder_tree.items()},
        'referenced_assets': referenced_assets,
        'unused_assets': unused_assets,
        'uncertain_assets': uncertain_assets,
        'external_urls': external_urls,
        'dynamic_references': dynamic_references
    }
    
    with open('scripts/audit_result.json', 'w', encoding='utf-8') as out_f:
        json.dump(output, out_f, indent=2)

    print("Audit script completed successfully.")

if __name__ == '__main__':
    run_audit()

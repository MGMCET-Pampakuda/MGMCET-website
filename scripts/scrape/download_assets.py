import os
import urllib.request
from io import BytesIO
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PUBLIC_DIR = os.path.join(BASE_DIR, "public")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

def download_file(url, target_path):
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    print(f"[DOWNLOAD] {url} -> {os.path.relpath(target_path, BASE_DIR)}")
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        content = resp.read()
        with open(target_path, "wb") as f:
            f.write(content)
    size_kb = os.path.getsize(target_path) / 1024
    print(f"  Saved ({size_kb:.1f} KB)")
    return target_path

def download_and_convert_webp(url, target_path, max_kb=120, max_dimension=1920):
    os.makedirs(os.path.dirname(target_path), exist_ok=True)
    print(f"[IMAGE] {url} -> {os.path.relpath(target_path, BASE_DIR)} (max {max_kb} KB)")
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            img = Image.open(BytesIO(data))
            
            # Convert RGBA/P to RGB if saving as standard WebP
            if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                # Keep RGBA for transparent images
                pass
            else:
                img = img.convert("RGB")
            
            # Resize if exceeding max dimensions
            width, height = img.size
            if max(width, height) > max_dimension:
                scale = max_dimension / max(width, height)
                new_size = (int(width * scale), int(height * scale))
                img = img.resize(new_size, Image.Resampling.LANCZOS)
            
            # Optimize quality to fit under max_kb
            quality = 85
            while quality >= 20:
                buf = BytesIO()
                img.save(buf, format="WEBP", quality=quality, method=6)
                size_kb = len(buf.getvalue()) / 1024
                if size_kb <= max_kb or quality <= 25:
                    with open(target_path, "wb") as f:
                        f.write(buf.getvalue())
                    print(f"  Converted to WebP ({size_kb:.1f} KB at Q={quality})")
                    break
                quality -= 10
            return target_path
    except Exception as e:
        print(f"  [ERROR] Failed to convert {url}: {e}")
        return None

def main():
    print("=== Downloading Real MGMCET Documents & Assets ===")

    # 1. Real PDFs
    documents = [
        ("https://www.mgmcet.ac.in/_files/ugd/d90d18_65b15d9cb0494f99a097b6428817f406.pdf",
         os.path.join(PUBLIC_DIR, "documents", "aicte-approval-2024-25.pdf")),
        ("https://www.mgmcet.ac.in/_files/ugd/d90d18_9a8d824a353841bfb624181f38589250.pdf",
         os.path.join(PUBLIC_DIR, "documents", "nirf-report-2024.pdf")),
        ("https://www.mgmcet.ac.in/_files/ugd/d90d18_81c625c975e044d6a6503ccb3b8c4d04.pdf",
         os.path.join(PUBLIC_DIR, "documents", "sc-st-committee.pdf")),
        ("https://www.mgmcet.ac.in/_files/ugd/d90d18_ccf58f557c2f42f4baa54befc003661f.pdf",
         os.path.join(PUBLIC_DIR, "documents", "mandatory-disclosure-2024.pdf")),
        ("https://www.mgmcet.ac.in/_files/ugd/d90d18_1d318eef77f4418d996fe73d83a1207b.pdf",
         os.path.join(PUBLIC_DIR, "documents", "anti-ragging-committee.pdf")),
    ]

    for url, path in documents:
        try:
            download_file(url, path)
        except Exception as e:
            print(f"Error downloading doc {url}: {e}")

    # Remove fake prospectus if exists
    fake_prospectus = os.path.join(PUBLIC_DIR, "documents", "prospectus.pdf")
    if os.path.exists(fake_prospectus):
        os.remove(fake_prospectus)
        print("[REMOVED] Fake prospectus.pdf deleted")

    # 2. Brand Images
    brand_images = [
        ("https://static.wixstatic.com/media/d90d18_043cf52bc334455aaf5c4cb37ecf78ab~mv2.png",
         os.path.join(PUBLIC_DIR, "images", "brand", "logo.png")),
        ("https://static.wixstatic.com/media/d90d18_24581ee73618413d882e736ad9ad1c8d~mv2.png",
         os.path.join(PUBLIC_DIR, "images", "brand", "emblem.png")),
    ]
    for url, path in brand_images:
        try:
            download_file(url, path)
        except Exception as e:
            print(f"Error downloading brand {url}: {e}")

    # 3. Hero images (under 200 KB)
    hero_images = [
        ("https://static.wixstatic.com/media/230211_c4e3bf29b473463e9eb85cec4d9cabfb~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "hero", "campus-main.webp"), 190, 1920),
        ("https://static.wixstatic.com/media/d90d18_e3ec56ba21fb405aae5c15a8882ad9ef~mv2.webp",
         os.path.join(PUBLIC_DIR, "images", "hero", "campus-front.webp"), 190, 1920),
        ("https://static.wixstatic.com/media/d90d18_a78558586f444f00b19dfb97749794fd~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "hero", "campus-academic.webp"), 190, 1920),
    ]
    for url, path, max_kb, max_dim in hero_images:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 4. Leadership (under 120 KB)
    leadership = [
        ("https://static.wixstatic.com/media/d90d18_6e7ae967b28a400ca4f957c0b7e8d07c~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "leadership", "director-h-ahinus.webp"), 110, 800),
        ("https://static.wixstatic.com/media/d90d18_9f1216ba68cd4e2193adba7d379b77af~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "leadership", "chairman-dr-geevarghese-yohannan.webp"), 110, 800),
        ("https://static.wixstatic.com/media/d90d18_09e42e3bf50c4ad8a7dbec4c08dcacd6~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "leadership", "vice-chairman-vinod-thomas.webp"), 110, 800),
        ("https://static.wixstatic.com/media/230211_a68eac7a371f46179a595bb3e3a52914~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "leadership", "principal-dr-dhanya-g.webp"), 110, 800),
        ("https://static.wixstatic.com/media/d90d18_7dc0178008d746dfbaa65c0bd16c9fc5~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "leadership", "principal-poly-er-nk-rajan.webp"), 110, 800),
    ]
    for url, path, max_kb, max_dim in leadership:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 5. Facilities (under 120 KB)
    facilities = [
        ("https://static.wixstatic.com/media/d90d18_a924e4c0f77d47bead5ccbeab68a3974~mv2.avif",
         os.path.join(PUBLIC_DIR, "images", "facilities", "facility-faculty.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_82a22b6e01b94b42aabb6c4ed93da37e~mv2.avif",
         os.path.join(PUBLIC_DIR, "images", "facilities", "facility-labs.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_42a88472765546198f0a9eaf34c3c40e~mv2.avif",
         os.path.join(PUBLIC_DIR, "images", "facilities", "facility-library.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_c264fa6da7f245f8ad6f7ec2bd2ed07f~mv2.avif",
         os.path.join(PUBLIC_DIR, "images", "facilities", "facility-hostel.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_f6dd52f192564604afce89fb1a41b375~mv2.avif",
         os.path.join(PUBLIC_DIR, "images", "facilities", "facility-transport.webp"), 110, 1024),
    ]
    for url, path, max_kb, max_dim in facilities:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 6. Campus & About
    campus = [
        ("https://static.wixstatic.com/media/d90d18_589f0c3a62a5405bb0d8685b3daa37f2f000.jpg",
         os.path.join(PUBLIC_DIR, "images", "campus", "about-campus.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_bc1545a6dfa448499b77b2daa84ed43d~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "campus", "autobahn-truck.webp"), 110, 1200),
    ]
    for url, path, max_kb, max_dim in campus:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 7. Department banners
    dept_images = [
        ("https://static.wixstatic.com/media/230211_a65fa883e75443ec9a8ecf2f1bbde8db~mv2.png",
         os.path.join(PUBLIC_DIR, "images", "departments", "btech-aiml.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_52e355b28e404f96b1e90ef6f14e5d05~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "btech-cse.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_31f5ad29b079430cbd4a23f11740e031~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "btech-cyber-security.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_444d7f934bd6448f9a9c0e13a02063d4~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "btech-ece.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_d99932eec82d4c22844ea5cab1a26b87~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "btech-mechanical.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/d90d18_6c2f84be97584a5a831e451fa89522ee~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "mtech-iic.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_5b9c89dc0945465386afac319595f9bd~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "mtech-se-cm.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_420f1a08f6aa44d3b7c0c27210bfcacb~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-ai.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_0b3de1d5618f4812beead6fe25955251~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-cse.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_8374589f04334c83b10a2cc67ddb5ab8~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-civil.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_439597290af74af4b33be670bac50b32~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-automobile.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_2067d51072d7450fab4ffac19f7459ce~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-mechanical.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_0b8fecc63c90476bab63e6af5be9bae5~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-eee.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_0bf4964885e041d599176cc1b4141a27~mv2.png",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-ece.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/d90d18_3e6d9598739140ac9604c5bf819b3f9b~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "departments", "polytechnic-ev.webp"), 110, 1024),
    ]
    for url, path, max_kb, max_dim in dept_images:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 8. Recruiter Logos
    recruiters = [
        ("https://static.wixstatic.com/media/50456a_aba9deb9ce2e4136994d01aa602cf5e6~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-01.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_e06fb0e3b4df4e55b918773f19677c2d~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-02.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_e75793bae39c49cfa34900d6643f17dd~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-03.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_97a1ff577b78433fbe6fa85054c8fcd3~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-04.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_8524fe7d240e4711a5f00ef15ff1f0ec~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-05.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_899810e7fc104f82aec15db98959d1ee~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-06.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_20b8f0efcc614a48b902f00b1e36c027~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-07.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_072129cd969248919ab241ac8b2abb82~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-08.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_7dfbcc5015444a228b5754cc42842f30~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-09.webp"), 60, 400),
        ("https://static.wixstatic.com/media/50456a_d1ed523d4571411eb6987393acb90736~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "recruiters", "recruiter-10.webp"), 60, 400),
    ]
    for url, path, max_kb, max_dim in recruiters:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 9. Real News & Events Images
    news_images = [
        ("https://static.wixstatic.com/media/d90d18_f66138c6a86545e2bca698674d40c004~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "hiring-faculty.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/230211_6233e2b687f94c1db8dcea1c7629d6b4~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "placement-2025.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/230211_a74138831518486cbda209792ddb2fd0~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "comstream-placement.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/230211_dc72a59d70074483a00eb8569058aae6~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "hackathon-achievement.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/50456a_1174b1a756e0448d92f38cf0a99427c4~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "placement-training.webp"), 110, 1024),
        ("https://static.wixstatic.com/media/50456a_c5a64bcaa8a541849bfe9834d55ff6ec~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "news", "technical-seminar.webp"), 110, 1024),
    ]
    for url, path, max_kb, max_dim in news_images:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    # 10. Real Gallery Images (Sports, Arts, NSS, Celebrations)
    gallery_images = [
        ("https://static.wixstatic.com/media/230211_b396127e121e4b45b63d16c43b72aac2~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "gallery", "arts-fest.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/50456a_044507afde8945659b0ad31f62b7592e~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "gallery", "placement-orientation.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_bc1545a6dfa448499b77b2daa84ed43d~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "gallery", "autobahn-bharatbenz.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/d90d18_589f0c3a62a5405bb0d8685b3daa37f2f000.jpg",
         os.path.join(PUBLIC_DIR, "images", "gallery", "campus-life.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/230211_c4e3bf29b473463e9eb85cec4d9cabfb~mv2.jpg",
         os.path.join(PUBLIC_DIR, "images", "gallery", "campus-aerial.webp"), 110, 1200),
        ("https://static.wixstatic.com/media/d90d18_e3ec56ba21fb405aae5c15a8882ad9ef~mv2.webp",
         os.path.join(PUBLIC_DIR, "images", "gallery", "front-entrance.webp"), 110, 1200),
    ]
    for url, path, max_kb, max_dim in gallery_images:
        download_and_convert_webp(url, path, max_kb=max_kb, max_dimension=max_dim)

    print("=== All real assets downloaded and converted successfully! ===")

if __name__ == "__main__":
    main()

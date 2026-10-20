import NextLink from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SmartLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  isExternal?: boolean;
  isPdf?: boolean;
  showIcon?: boolean;
  /** Next.js specific Link props if internal */
  prefetch?: boolean;
}

/**
 * Smart Link component that automatically inspects destination href:
 * - Internal routes use Next.js <Link> for client-side navigation.
 * - External URLs open safely in a new tab with rel="noopener noreferrer".
 * - PDF documents open in a new tab and can optionally render a file indicator icon.
 */
export function SmartLink({
  href,
  isExternal,
  isPdf,
  showIcon = false,
  className,
  children,
  target,
  rel,
  prefetch,
  ...props
}: SmartLinkProps) {
  const isHttpExternal =
    isExternal !== undefined
      ? isExternal
      : href.startsWith("http://") || href.startsWith("https://");

  const isPdfFile =
    isPdf !== undefined
      ? isPdf
      : href.toLowerCase().endsWith(".pdf") || href.toLowerCase().includes(".pdf");

  if (isHttpExternal || isPdfFile) {
    return (
      <a
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={cn("inline-flex items-center gap-1", className)}
        {...props}
      >
        {children}
        {showIcon && isPdfFile && (
          <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
        )}
        {showIcon && !isPdfFile && isHttpExternal && (
          <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden="true" />
        )}
      </a>
    );
  }

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
}

export { SmartLink as Link };

import React from "react";

export interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders sanitized JSON-LD structured data script for search engines and crawlers.
 * Escapes '<' to prevent XSS injection.
 */
export function JsonLd({ data }: JsonLdProps) {
  const sanitizedJson = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizedJson }}
    />
  );
}

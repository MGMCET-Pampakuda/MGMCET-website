import React from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Safely renders JSON-LD structured data into the document head/body for search engines.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

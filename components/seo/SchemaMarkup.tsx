/**
 * Renders one or more JSON-LD objects (see lib/schema.ts builders) as
 * <script type="application/ld+json"> tags. Server Component — safe to use
 * directly inside any page.tsx.
 */
export function SchemaMarkup({ schema }: { schema: object | object[] }) {
  const items = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

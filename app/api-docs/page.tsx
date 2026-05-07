export default function ApiDocsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">API Documentation</h1>
      <p className="mt-4 text-muted-foreground">
        This service publishes an API catalog for automated API discovery per RFC
        9727.
      </p>
      <p className="mt-2 text-muted-foreground">
        Machine-readable API description is available at <code>/openapi.json</code>,
        and health status is available at <code>/api/health</code>.
      </p>
    </section>
  )
}

# Integration plan (not active in demo)
- Prometheus/PromQL: query Prometheus HTTP API with allowlisted templates, deadlines and response-size limits.
- OpenTelemetry: configure SDK providers, trace propagation and OTLP exporters.
- Grafana: provision dashboards and alert rules as version-controlled files.
- PostgreSQL: persist audit events in append-only tables with retention and integrity controls.
- JWT/OAuth2: validate issuer, audience, signature, expiry, scopes and roles using a trusted identity provider. Demo tokens are not secure.
- Helm/GitLab CI: add charts, environment-specific values, secret references, tests, security scans and deployment approvals.

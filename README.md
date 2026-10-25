# Observability, Capacity Analysis and Secure Operations Portal

Runnable NestJS starter with sample Prometheus-style capacity metrics, PromQL-shaped query responses, server-sent events (SSE), role-gated operations, and in-memory audit records.

## Run
Requires Node.js 20+.
```bash
npm install
cp .env.example .env
npm run start:dev
```
API: http://localhost:3002

## Endpoints
- GET /health
- GET /metrics/summary
- GET /metrics/query?query=up
- GET /alerts/stream (SSE)
- POST /alerts/demo with `{"message":"CPU threshold exceeded"}`
- GET /audit
- POST /operations/action with `{"operation":"inspect"}`

Demo authorization: send `Authorization: Bearer demo-admin` or `Bearer demo-operator`. `demo-viewer` is read-only. These are deliberately fake demo tokens, not real JWT/OAuth2 validation.

Prometheus, OpenTelemetry, Grafana, PostgreSQL, Helm and GitLab CI/CD are documented extension points, not active production integrations. Add real authentication, persistent audit storage, security controls and integration tests before deployment.

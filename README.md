# API Gateway Platform

Users register a public upstream API and receive a proxy URL plus an API key. The gateway authenticates the request, applies a per-client rate limit, optionally caches safe `GET` responses, records analytics, and forwards the request to the upstream API.

## What the proxy supports

The proxy URL is `https://api.example.com/proxy/{proxyId}`. It forwards `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, and `HEAD`, including extra path segments, query strings, JSON/form/binary request bodies, and non-hop-by-hop request headers. Upstream status codes and safe response headers are preserved.

```bash
curl "https://api.example.com/proxy/PROXY_ID/v1/items?limit=10" \
  -H "x-api-key: sk_live_..."
```

Do not put API keys in a browser address-bar URL: query-string credentials are logged by browsers, servers, and analytics tools. A browser app must send the key in the `x-api-key` header through `fetch`, or use its own backend.

## Security controls

- API keys are generated with cryptographic randomness and only an HMAC hash is stored for newly created or regenerated keys.
- Public `http`/`https` targets are validated at registration and again at connection time; loopback, private, link-local, and reserved addresses are rejected to reduce SSRF risk.
- Redirects are not followed, upstream calls time out, and request/response size limits are enforced.
- Cache entries vary by proxy URL and request method. Only unauthenticated, cookie-free `GET` requests may be cached; configured cache TTL and enable/disable settings are respected.
- Rate limits are per proxy and client IP. Set `TRUST_PROXY=true` only behind a known reverse proxy, otherwise IP attribution can be forged.

## Run locally

1. Copy [Backend/.env.example](Backend/.env.example) to `Backend/.env` and fill every value. For local testing, public-only upstream validation intentionally rejects `localhost`; deploy a public test API or adapt the policy only in a separate development environment.
2. Install and start the backend:

   ```bash
   cd Backend
   npm install
   npm test
   npm run dev
   ```

3. Configure `FrontEnd/.env`:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Install and start the frontend:

   ```bash
   cd FrontEnd
   npm install
   npm run dev
   ```

## Production launch checklist

- Use HTTPS, a managed MongoDB deployment, and Redis with TLS.
- Put all `.env` values in the host's secret manager; never commit them.
- Set `BASE_URL` and `VITE_API_URL` to their final HTTPS domains, and set `FRONTEND_ORIGINS` exactly to the frontend origins.
- Deploy behind a configured reverse proxy/load balancer and set `TRUST_PROXY=true` only if it strips client-provided forwarding headers.
- Enable database backups, Redis monitoring, uptime checks against `/health`, structured logs, and alerting for 5xx/429 spikes.
- Run `npm test`, `npm run build` in `FrontEnd`, and a staging smoke test covering API registration, authorized proxy calls, POST forwarding, cache behavior, and rate limiting.

## Current boundaries

This is a secure first-release gateway, not a complete API-management product. Before offering paid or high-volume multi-tenant service, add usage quotas/billing, audit logs, account recovery/email verification, key scopes/rotation history, custom domains, WebSocket/streaming policy, background analytics aggregation, load testing, and an independent security review.

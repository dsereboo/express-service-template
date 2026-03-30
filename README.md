# Express Service Template
v5 Express.js API template. Designed as a starting point for building a REST service.
C# Developer friendly.


## Table of Contents

- [Technologies & Packages](#technologies--packages)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [Middleware](#middleware)
- [Authentication](#authentication)
- [Logging](#logging)
- [Error Handling](#error-handling)
- [References](#references)


## Technologies & Packages

### Core

| Package | Purpose |
|---|---|
| [express](https://expressjs.com/) | HTTP server and routing framework |
| [typescript](https://www.typescriptlang.org/) | Static typing for JavaScript |
| [dotenv](https://github.com/motdotla/dotenv) | Loads environment variables from `.env` |
| [uuid](https://github.com/uuidjs/uuid) | Generates unique IDs (e.g. request correlation IDs) |

### Database

| Package | Purpose |
|---|---|
| [pg](https://node-postgres.com/) | PostgreSQL client for Node.js (node-postgres) |

### Security

| Package | Purpose |
|---|---|
| [helmet](https://helmetjs.github.io/) | Sets secure HTTP response headers |
| [cors](https://github.com/expressjs/cors) | Configures Cross-Origin Resource Sharing |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Protects endpoints from brute-force and abuse |
| [argon2](https://github.com/ranisalt/node-argon2) | Password hashing using the Argon2id algorithm |
| [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) | Issues and verifies JSON Web Tokens |

### Validation

| Package | Purpose |
|---|---|
| [zod](https://zod.dev/) | Runtime schema validation with TypeScript type inference |

### Logging

| Package | Purpose |
|---|---|
| [morgan](https://github.com/expressjs/morgan) | HTTP request logging middleware |
| [winston](https://github.com/winstonjs/winston) | Structured application logger |
| [@datalust/winston-seq](https://github.com/datalust/winston-seq) | Winston transport that ships logs to a Seq server |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- npm v9+
- A running PostgreSQL instance
- A running [Seq](https://datalust.co/seq) instance (optional — logs fall back to console if not configured)

### Installation

```bash
# Clone the repository
git clone https://github.com/dsereboo/express-service-template
cd express-service

# Install dependencies
yarn install

# Copy environment variables
cp .env.example .env
```


### Development
```bash
yarn run dev
```

Starts the server via `tsx`. 

### Production

```bash
yarn run build   # Compiles TypeScript to dist/
yarn start       # Runs the compiled output
```

## Environment Variables

## Database

### Health Check


## Middleware

The following middleware is registered globally in `app.ts` in this order:

| Middleware | Package | Description |
|---|---|---|
| Security headers | `helmet` | Adds `X-Content-Type-Options`, `X-Frame-Options`, CSP, and other protective headers |
| CORS | `cors` | Restricts which origins can access the API — configure allowed origins in `src/config` |
| Rate limiting | `express-rate-limit` | Applies a request cap per IP across all routes; can be overridden per route |
| HTTP logging | `morgan` | Logs every incoming request — output is piped through Winston |
| Body parsing | `express.json()` | Parses incoming JSON request bodies |
| Error handler | custom | Catches all thrown errors and formats them into a consistent response envelope |

Route-level middleware:

| Middleware | Description |
|---|---|
| `authenticate` | Verifies the `Authorization: Bearer <token>` header using `jsonwebtoken` |
| `validate(schema)` | Accepts a Zod schema, runs `safeParse` on `req.body`, and returns `400` with concatenated `.issues` messages on failure |

## Authentication

## Logging

Logging is handled by **Winston** with two transports:

- **Console** — human-readable output in development, JSON in production
- **Seq** — structured log events are shipped to the Seq server at `SEQ_SERVER_URL`

Each request is assigned a correlation ID via `uuid` which is attached to all log entries for that request, making it straightforward to trace a request end-to-end in Seq.

Morgan is configured to pipe HTTP request logs through Winston rather than writing directly to `stdout`, so all log output flows through a single pipeline.


## Error Handling

All errors flow through the `errorHandler` middleware registered at the end of `app.ts`. Route handlers and services throw typed errors which are caught and formatted into a consistent response envelope:

```json
{
  "success": false,
  "error": {
    "message": "Validation failed: name is required, email is invalid"
  }
}
```

Zod validation errors from the `validate` middleware map `result.error.issues` to a comma-delimited string of messages before responding with a `400`.

Unexpected errors are logged via Winston (including shipping to Seq) before a generic `500` response is returned — raw error details are never leaked to the caller in production.


## References
Links to articles, guides, and resources that influenced the design of this template.
- e.g. structure and organization — https://alexkondov.com/tao-of-node 
- e.g. Structured logging with Winston and Seq - https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-winston-and-morgan-to-log-node-js-applications/

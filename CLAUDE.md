# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Panorama** — a Next.js web app for browsing Mexican fisheries data and legislation (pesquerías, vedas, normativas, and production statistics from the Carta Nacional Pesquera). The codebase is in **Spanish**: comments, DB column names, UI text, and API query params are all Spanish, including accented identifiers (e.g. the query param `año`). Match this convention when adding code.

## Commands

```bash
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build
pnpm start          # serve production build
pnpm lint           # next lint

npx drizzle-kit generate   # generate SQL migration from lib/schema.ts (output → ./drizzle)
npx drizzle-kit migrate    # apply migrations
```

There is **no test suite** — no test runner is configured.

Loading production data (CSV → Postgres, Python 3.9+):
```bash
cd scripts && pip install -r requirements.txt
python load_csv_to_postgres.py --host localhost --port 5432 --database fisheries --user postgres --password <pw>
```

## Git conventions

**Never add a `Co-Authored-By` trailer (or any co-author line) to commits.** Commit messages should contain only the message itself, with no co-author attribution.

## Build caveats (important)

`next.config.mjs` sets `eslint.ignoreDuringBuilds: true` **and** `typescript.ignoreBuildErrors: true`. This means `pnpm build` will **not** fail on TypeScript or lint errors — a green build does not mean the types are sound. Run `pnpm lint` and check types explicitly (e.g. `npx tsc --noEmit`) when correctness matters.

## Environment variables

The runtime code (`lib/db.ts`), `drizzle.config.ts`, `README.md`, and `.env.example` all use the **`PG*`** variables:

```
PGHOST  PGPORT  PGDATABASE  PGUSER  PGPASSWORD  PGSSLMODE
```

Set `PGSSLMODE=require` for a Neon/hosted Postgres (enables SSL with `rejectUnauthorized: false`); leave it unset for local Postgres. Defaults if unset: `localhost:5432`, db `fisheries`, user/pass `postgres`.

## Architecture

Next.js 15 **App Router** + React 18 + TypeScript, styled with Tailwind + shadcn/ui (Radix), charts via Recharts. Path alias `@/*` maps to the repo root. Package manager is **pnpm**.

### Two data sources — know which is which

1. **Postgres (Drizzle ORM)** — holds **only** the `produccion_pesquera` table (fisheries production records, 2018–2025, ~35 columns). Defined as a single table in `lib/schema.ts`. All API routes under `app/api/` query this one table. Connection is a pooled `pg.Pool` wrapped by Drizzle in `lib/db.ts`, exported as `db`.

2. **Static TypeScript data** — vedas (`lib/vedas-data.ts`) and normativas/especies metadata are **hardcoded in the source**, not in the database. Vedas and normativas pages render from these static arrays; there is no DB table for them.

### API routes (`app/api/`)

All are Drizzle queries against `produccion_pesquera`, built with dynamic `conditions: SQL[]` arrays combined via `and(...)`:
- `datos/route.ts` — paginated/filtered raw records. Filters: `año`, `añoInicio`+`añoFin`, `estado`, `especie`, `litoral`, `origen`; plus `page`/`limit`.
- `especies/[especie]/indicadores/route.ts` — aggregated indicators for one species. The `[especie]` URL slug is decoded and de-hyphenated (`replace(/-/g, ' ')`) then matched with `ilike '%...%'` against `nombrePrincipal`/`nombreEspecie` — there is no slug→canonical-name lookup table, matching is fuzzy.
- `stats/route.ts` — dashboard aggregates.
- `sugerencias/route.ts` — currently **empty** (suggestion-box endpoint, not implemented).

Species matching throughout is fuzzy `ilike` on name columns, not FK/id joins.

### Pages (`app/`)

- `especies/` — species list + `especies/[especie]/page.tsx` dynamic detail page. Note several species also have their **own hardcoded page** (e.g. `especies/pulpo/page.tsx`, `camaron-cafe`, `almejas`, …) rather than going through the dynamic route.
- `vedas/`, `normativas/`, `dashboard/` — render from static data / the stats API.
- `layout.tsx` wraps everything; theming via `next-themes` (`components/theme-provider.tsx`).

### Components

`components/ui/` is generated shadcn/ui (see `components.json`) — treat as vendored primitives. App-specific components live directly under `components/` (`navbar`, `footer`, `vedas-calendar`, `vedas-filters`, `vedas-list`, `buzon-sugerencias`).

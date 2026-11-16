# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Panorama Pesquero** (panoramapesca.org) — a Next.js web app for browsing Mexican fisheries legislation (pesquerías, vedas and normativas from the Carta Nacional Pesquera). The codebase is in **Spanish**: comments, identifiers, UI text and data fields are all Spanish, including accented identifiers (e.g. the field `año`). Match this convention when adding code.

## Commands

```bash
pnpm dev            # dev server at http://localhost:3000
pnpm build          # production build
pnpm start          # serve production build
npx tsc --noEmit    # type check
```

There is **no test suite** — no test runner is configured. ESLint is **not configured** either (`pnpm lint` / `next lint` would prompt to set it up).

## Git conventions

**Never add a `Co-Authored-By` trailer (or any co-author line) to commits.** Commit messages should contain only the message itself, with no co-author attribution.

## Build caveats

`next.config.mjs` sets `typescript.ignoreBuildErrors: false`, so `pnpm build` **fails on type errors** (types are currently clean). It sets `eslint.ignoreDuringBuilds: true` because ESLint isn't configured, and `images.unoptimized: true`.

## Environment variables

Only one, read in `lib/site.ts`:

```
NEXT_PUBLIC_SITE_URL   # public site URL, used for metadataBase, OG image, robots.txt and sitemap.xml
```

Defaults to `https://panoramapesca.org` in production and `http://localhost:3000` in development (trailing slashes stripped). The site name ("Panorama Pesquero") is `siteName` in the same file.

## Architecture

Next.js 15 **App Router** + React 18 + TypeScript, styled with Tailwind + shadcn/ui (Radix), charts via Recharts, visits via `@vercel/analytics`. Path alias `@/*` maps to the repo root. Package manager is **pnpm**.

### No database — all data is static TypeScript

There is **no database and no data API**. All content is hardcoded in `lib/`:

- `lib/especies-data.ts` — private `catalogo` array (92 fisheries from the CNP, `region` is `"Litoral del Pacífico"` or `"Golfo de México y Mar Caribe"`) and `fichas: Record<string, FichaPesqueria>` keyed by `id` (59 fichas), attached at the bottom via `especie.ficha = fichas[especie.id]`. The exported `especies` is `catalogo` filtered to entries **with** a ficha, so fisheries without one are hidden everywhere (catalog, search, counts, routes, sitemap) until their ficha is added. `especie.ficha` is the single source for the detail view.
- `lib/vinculos-data.ts` — hand-curated links from each fishery id to veda ids and normativas document ids (NOM, planes, ZRP); rendered by `components/ficha-vinculos.tsx` (header summary + "Regulación de esta pesquería" card in the Normatividad tab).
- `lib/sustentabilidad-data.ts` — hand-curated MSC status, active FIPs (FisheryProgress) and Seafood Watch ratings per fishery id, with `FECHA_CONSULTA` and source links; rendered by `components/ficha-sustentabilidad.tsx` in the always-visible "Sustentabilidad" tab. Only list what matches the ficha's species and area; refresh the date when re-checking sources.
- `lib/vedas-data.ts` — `vedasData` (146 vedas) plus helpers (`isVedaActive`, `getUnique*`, `formatDateToDDMM`).
- `lib/normativas-data.ts` — `documents` (114) and `CATEGORY_META`, the single source used by the normativas page, the home page and the carousel.
- `lib/site.ts` — `siteUrl` and `metadataSeccion()` (per-section metadata; Next replaces rather than merges `openGraph`/`twitter`, so shared fields are repeated).

Home-page counts are computed from these arrays (`especies.length`, etc.), not hardcoded.

### API routes (`app/api/`)

- `download/route.ts` — the **only** route. Streams a PDF from an allow-listed official host (`dof.gob.mx`, `gob.mx`, `diputados.gob.mx`, `conapesca.gob.mx`, https only) to avoid acting as an open proxy (SSRF). Keep new hosts in `ALLOWED_HOSTS`.

### Pages (`app/`)

- `page.tsx` — home: `BuscadorInicio` (search across pesquerías, vedas and normas), action cards overlapping the hero, "¿Por qué?", `VedasHoy` (active/upcoming vedas, server-rendered with today's Mexico City date via `fechaHoyMexico()`; the page has `revalidate = 3600`, and the client recomputes only if its local date differs; dates are formatted by hand, not with `Intl`, to avoid hydration mismatches), litorales, `EspeciesCarrusel` and an "anuarios" teaser.
- `especies/page.tsx` and `especies/[especie]/page.tsx` — server pages that both render the client `EspeciesExplorador` (catalog + side panel with `FichaDetalle`). Each fishery has its own statically generated route `/especies/{id}` (`generateStaticParams`, `dynamicParams = false`, per-species `generateMetadata`), so the initial HTML already contains that ficha — all its sections, not just the active tab (inactive ones are `hidden`; a `<noscript>` style shows them all and hides the tab bar). Picking another fishery swaps the panel client-side and `replaceState`s the URL to `/especies/{id}`. Old `/especies?id=…` links get a 308 from `middleware.ts` (not from the page: `loading.tsx` starts streaming before `redirect()` could set the status). `/especies?region=…` preselects the region filter.
- `vedas/page.tsx` — `VedasFilters` + `VedasTimeline`.
- `normativas/page.tsx` — document library (also lists vedas via `VedasList`).
- Pages under `vedas/` and `normativas/` are client components, so their `metadata` lives in the sibling `layout.tsx` (`especies/layout.tsx` too, for `/especies`). Its plain-string title drops the root `title.template` for children, so `/especies/{id}` sets `title.absolute` itself.
- `layout.tsx` wraps everything with `ThemeProvider` (forced light theme), `Navbar`, `Footer` and `<Analytics />`. Also `not-found.tsx`, `opengraph-image.tsx`, `robots.ts` (disallows `/api/`), `sitemap.ts` (also lists `/especies/{id}` for every published fishery), `icon.svg`.

### Components

`components/ui/` is generated shadcn/ui (see `components.json`) — treat as vendored primitives. App-specific components live directly under `components/`: `navbar`, `footer`, `page-header`, `filter-bar`, `especie-imagen` (photo from `public/images/especies/{id}.jpg` with icon fallback), `buscador-inicio`, `vedas-hoy`, `especies-carrusel`, `especies-explorador`, `ficha-detalle`, `vedas-filters`, `vedas-timeline`, `vedas-list`. `buzon-sugerencias`, `normativas-carrusel` and `panorama-graficas` (the old "El panorama en cifras" home charts) exist but aren't used by any page.

### Leftovers from the old Postgres version

Postgres dependencies, `scripts/` and `initdb.d/` were removed. Only `data/` (gitignored CSVs) remains locally.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Panorama** — a Next.js web app for browsing Mexican fisheries legislation (pesquerías, vedas and normativas from the Carta Nacional Pesquera). The codebase is in **Spanish**: comments, identifiers, UI text and data fields are all Spanish, including accented identifiers (e.g. the field `año`). Match this convention when adding code.

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

Defaults to `http://localhost:3000` (trailing slashes stripped).

## Architecture

Next.js 15 **App Router** + React 18 + TypeScript, styled with Tailwind + shadcn/ui (Radix), charts via Recharts, visits via `@vercel/analytics`. Path alias `@/*` maps to the repo root. Package manager is **pnpm**.

### No database — all data is static TypeScript

There is **no database and no data API**. All content is hardcoded in `lib/`:

- `lib/especies-data.ts` — `especies` array (92 fisheries, `region` is `"Litoral del Pacífico"` or `"Golfo de México y Mar Caribe"`). Entries without detail only have `id`, `nombre`, `region`, `ultimaActualizacion` and render as "Próximamente". A separate `fichas: Record<string, FichaPesqueria>` object keyed by `id` holds the detail (59 fichas) and is attached at the bottom of the file via `especie.ficha = fichas[especie.id]`. `especie.ficha` is the single source for the detail view and the home charts.
- `lib/vedas-data.ts` — `vedasData` (146 vedas) plus helpers (`isVedaActive`, `getUnique*`, `formatDateToDDMM`).
- `lib/normativas-data.ts` — `documents` (114) and `CATEGORY_META`. **Caveat:** `app/normativas/page.tsx` still contains its own identical inline copy of `documents`, `DocumentItem` and `CATEGORY_META`; the home page and carousel use `lib/normativas-data.ts`. Edit both, or refactor the page to import from `lib/`.
- `lib/site.ts` — `siteUrl` and `metadataSeccion()` (per-section metadata; Next replaces rather than merges `openGraph`/`twitter`, so shared fields are repeated).

Home-page counts are computed from these arrays (`especies.length`, etc.), not hardcoded.

### API routes (`app/api/`)

- `download/route.ts` — the **only** route. Streams a PDF from an allow-listed official host (`dof.gob.mx`, `gob.mx`, `diputados.gob.mx`, `conapesca.gob.mx`, https only) to avoid acting as an open proxy (SSRF). Keep new hosts in `ALLOWED_HOSTS`.

### Pages (`app/`)

- `page.tsx` — home: stats, `EspeciesCarrusel`, `PanoramaGraficas`.
- `especies/page.tsx` — client component: catalog + side panel (`FichaDetalle`), selected fishery in `?id=`. `especies/[especie]/page.tsx` only **redirects** to `/especies?id=…` for old links; there are no per-species pages.
- `vedas/page.tsx` — `VedasFilters` + `VedasTimeline`.
- `normativas/page.tsx` — document library (also lists vedas via `VedasList`).
- Pages under `especies/`, `vedas/`, `normativas/` are client components, so their `metadata` lives in the sibling `layout.tsx`.
- `layout.tsx` wraps everything with `ThemeProvider` (forced light theme), `Navbar`, `Footer` and `<Analytics />`. Also `not-found.tsx`, `opengraph-image.tsx`, `robots.ts` (disallows `/api/`), `sitemap.ts`, `icon.svg`.

### Components

`components/ui/` is generated shadcn/ui (see `components.json`) — treat as vendored primitives. App-specific components live directly under `components/`: `navbar`, `footer`, `page-header`, `filter-bar`, `especie-imagen` (photo from `public/images/especies/{id}.jpg` with icon fallback), `especies-carrusel`, `ficha-detalle`, `panorama-graficas`, `vedas-filters`, `vedas-timeline`, `vedas-list`. `buzon-sugerencias` and `normativas-carrusel` exist but aren't used by any page.

### Leftovers from the old Postgres version

Postgres dependencies, `scripts/` and `initdb.d/` were removed. Only `data/` (gitignored CSVs) remains locally. `PENDIENTES-PUBLICACION.md` is a publishing checklist partly outdated.

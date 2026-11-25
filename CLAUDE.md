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
- `lib/site.ts` — `siteUrl`, `alternos()` and `metadataSeccion()` (per-section, per-language metadata; Next replaces rather than merges `openGraph`/`twitter`, so shared fields are repeated).
- `lib/i18n.ts` — languages, `rutaLocal()`/`sinPrefijo()`, hand-formatted dates per language and the label translators (see "Languages").

Home-page counts are computed from these arrays (`especies.length`, etc.), not hardcoded.

### API routes (`app/api/`)

- `download/route.ts` — the **only** route. Streams a PDF from an allow-listed official host (`dof.gob.mx`, `gob.mx`, `diputados.gob.mx`, `conapesca.gob.mx`, https only) to avoid acting as an open proxy (SSRF). Keep new hosts in `ALLOWED_HOSTS`.

### Languages (`app/[lang]/`, `lib/i18n.ts`)

The site is in Spanish and English. All pages live under `app/[lang]/` (`lang` is `es` or `en`, `generateStaticParams` + `dynamicParams = false`); `app/[lang]/layout.tsx` is the root layout (sets `<html lang>`, wraps everything in `IdiomaProvider`). Spanish is the default and is served **without a prefix**: `middleware.ts` rewrites `/vedas` → `/es/vedas` internally and 308-redirects any public `/es/…` URL back to the unprefixed one; English lives under `/en/…`. Entering without a prefix always shows Spanish (no Accept-Language redirect). The ES/EN switch is `components/selector-idioma.tsx` (in the navbar on desktop, inside the mobile menu sheet).

Only the **interface** is translated. Each component keeps its strings in a local `TEXTOS = { es: {...}, en: {...} }` object; client components read the language with `useIdioma()` (`components/idioma-provider.tsx`), which also returns `ruta(path)` to build prefixed internal links — use it for every internal `href`. Server pages read `params.lang`. Content (fichas, vedas, normas text) stays in Spanish; `AvisoIdioma` tells English readers so. Short data values used as labels (regions, veda zones and types, exploitation status, MSC/FIP/Seafood Watch states, normativas categories) are translated with the `etiqueta*` helpers and `CATEGORIAS_EN` in `lib/i18n.ts`, which fall back to the original value. Data values in query strings (`?region=`, `?zona=`) stay in Spanish.

Keep `loading.tsx` files out of routes that can `notFound()`: a `loading.tsx` above a page starts streaming with status 200 before the 404 is known. That's why the home page and the `/especies` catalog sit in the route groups `(inicio)` and `especies/(catalogo)` with their own `loading.tsx`, and `app/[lang]/[...resto]/page.tsx` (which calls `notFound()` for unknown URLs) has none above it.

### Pages (`app/[lang]/`)

- `(inicio)/page.tsx` — home: `BuscadorInicio` (search across pesquerías, vedas and normas), action cards overlapping the hero, "¿Por qué?", `VedasHoy` (active/upcoming vedas, server-rendered with today's Mexico City date via `fechaHoyMexico()`; the page has `revalidate = 3600`, and the client recomputes only if its local date differs; dates are formatted by hand, not with `Intl`, to avoid hydration mismatches), litorales, `EspeciesCarrusel` and an "anuarios" teaser.
- `especies/(catalogo)/page.tsx` and `especies/[especie]/page.tsx` — server pages that both render the client `EspeciesExplorador` (catalog + side panel with `FichaDetalle`). Each fishery has its own statically generated route `/especies/{id}` (`generateStaticParams`, `dynamicParams = false`, per-species `generateMetadata`), so the initial HTML already contains that ficha — all its sections, not just the active tab (inactive ones are `hidden`; a `<noscript>` style shows them all and hides the tab bar). Picking another fishery swaps the panel client-side and `replaceState`s the URL to `/especies/{id}` (with `/en` in English). Old `/especies?id=…` links (and `/en/especies?id=…`) get a 308 from `middleware.ts` (not from the page: `loading.tsx` starts streaming before `redirect()` could set the status). `/especies?region=…` preselects the region filter.
- `vedas/page.tsx` — `VedasFilters` + `VedasTimeline`.
- `normativas/page.tsx` — document library (also lists vedas via `VedasList`).
- Pages under `vedas/` and `normativas/` are client components, so their metadata lives in the sibling `layout.tsx` (`generateMetadata` per language via `metadataSeccion()` in `lib/site.ts`, which also sets canonical + hreflang alternates; `especies/layout.tsx` too, for `/especies`). Its plain-string title drops the root `title.template` for children, so `/especies/{id}` sets `title.absolute` itself.
- `layout.tsx` wraps everything with `IdiomaProvider`, `ThemeProvider` (light/dark, follows the system by default; toggle in `selector-tema.tsx`), `Navbar`, `Footer` and `<Analytics />`. `not-found.tsx` is a client component (to read the language). At the `app/` root stay `globals.css`, `opengraph-image.tsx`, `robots.ts` (disallows `/api/`), `sitemap.ts` (every page in both languages with hreflang alternates, including `/especies/{id}` for every published fishery), `icon.svg` and `api/`.

### Components

`components/ui/` is generated shadcn/ui (see `components.json`) — treat as vendored primitives. App-specific components live directly under `components/`: `navbar`, `footer`, `page-header`, `filter-bar`, `especie-imagen` (photo from `public/images/especies/{id}.jpg` with icon fallback), `buscador-inicio`, `vedas-hoy`, `especies-carrusel`, `especies-explorador`, `ficha-detalle`, `vedas-filters`, `vedas-timeline`, `vedas-list`, `idioma-provider`, `selector-idioma`, `selector-tema`, `aviso-idioma`, `pantalla-carga`. `buzon-sugerencias`, `normativas-carrusel` and `panorama-graficas` (the old "El panorama en cifras" home charts) exist but aren't used by any page.

### Leftovers from the old Postgres version

Postgres dependencies, `scripts/` and `initdb.d/` were removed. Only `data/` (gitignored CSVs) remains locally.

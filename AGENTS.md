<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ReadLoop client

Next.js 16 App Router frontend for a library app. Authentication and user records live in MongoDB via Better Auth; books, categories, and users come from a **separate REST backend** at `NEXT_PUBLIC_API_URL` (local default `http://localhost:5000`).

## Commands

- `npm run dev` — dev server on `:3000` (Turbopack).
- `npm run build` — production build, which also runs TypeScript and prerenders data-fetching pages. `/start`, `/start/admin`, `/start/admin/add-books`, and `/start/admin/categories` are currently **static** and fetch the backend during the build; the backend must be running or the build fails, and backend data is baked in until the next build.
- `npm run lint` — repo-wide ESLint. It currently fails on pre-existing `react-hooks/set-state-in-effect` errors in generated `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`; check only the files you touched with `npx eslint <paths>`.
- `npx tsc --noEmit` — typecheck only.
- After adding a route, a `PageProps<"/new/route">` can fail with `does not satisfy the constraint 'AppRoutes'` until generated route types are refreshed: run `npm run build` (or delete `.next/types` while dev is stopped). `tsconfig.json` includes both `.next/types` and `.next/dev/types`, and `next dev` only refreshes the latter.

## Setup

- `.env` is gitignored. Required keys: `MONOGDB_URI` (code reads this exact misspelling — do not rename), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (`http://localhost:3000`), `NEXT_PUBLIC_API_URL` (`http://localhost:5000`), `NEXT_PUBLIC_IMGBB_API_KEY`.
- No test runner, CI, formatter, or `typecheck` script is configured.

## Structure and conventions

- Path alias: `@/*` → `src/*`.
- Routes live in `src/app`: `(auth)` for sign-in/up, `start` for the public Navbar/Footer shell, `start/admin` for the sidebar dashboard. The only Next.js API route is Better Auth at `src/app/api/auth/[...all]/route.ts`.
- `src/lib/actions/**` are plain `fetch` wrappers for the external backend (`adminApi.ts`, `bothApi.ts`), not server actions. Add backend calls there; shared shapes are in `src/lib/type.ts`.
- Auth helpers: `GetSessionFromServer()` uses `auth.api.getSession` with `next/headers`; `GetSessionFromClient()` wraps `useSession`; client auth methods come from `src/lib/auth-client.ts`. There is no middleware or route guard — `/start/admin` is currently reachable without a session.
- Images use `next/image`; `next.config.ts` allows any HTTPS host because covers/avatars are external (uploads go to ImgBB via `src/lib/uploadImageUrl.ts`).
- UI components are shadcn (style `base-nova`) built on `@base-ui/react`, **not Radix**. Add them into `src/components/ui` with the shadcn CLI. Tailwind v4 is configured CSS-first in `src/app/globals.css` (there is no `tailwind.config.*`). `cn` is re-exported from `src/lib/utils.ts`, but generated files import it directly from `"cn"`.
- Next 16 uses generated typed props such as `LayoutProps<"/">`; read the relevant guide in `node_modules/next/dist/docs/` before using unfamiliar APIs. Keep the `nextjs-agent-rules` block above — `next dev` rewrites it.
- `src/app/start/layout.tsx` renders a nested `<body>` inside the root layout's `<body>`; this is existing scaffolding, not a pattern to copy.

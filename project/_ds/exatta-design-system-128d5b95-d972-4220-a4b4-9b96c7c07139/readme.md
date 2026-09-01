# Exatta Design System

A modern, digital-first design system for **Exatta Contabilidade Digital** — a Brazilian 100%
digital accounting firm (contabilidade digital). It brands the client-facing product surfaces:
the **Área do Cliente** (accounting portal) and **Exatta GED** (document/onboarding system at
`onboard.taxhubfiscal.com.br`).

This system was built to *modernize and elevate* the current product, which today is a thin,
minimally-styled login. The direction: a trustworthy fintech feel for accounting — clean surfaces,
confident type, financial-aware colour, and warm, human copy.

## Sources
- Product / login surface: **https://onboard.taxhubfiscal.com.br/** (theme color `#7c3aed`, "Exatta GED").
- Marketing & positioning: **https://exattacontabilidade.com.br/** ("Não somos robô"; atendimento por WhatsApp, e-mail, vídeo).
- The current site exposes only a bare login page — no component library, Figma, or codebase was
  provided. Visual foundations here are an **intentional, brand-aligned modernization**, not a 1:1
  copy. The one fixed brand signal from the source was the theme colour `#7c3aed`; per the client's
  direction the brand was re-based onto **red `#BF0202`** (the logo star) + **navy `#170F49`**.

> **Logo:** the official Exatta logo is provided in `assets/` — `exatta-mark.svg` (the red
> 8-point star mark), `exatta-logo-color.jpg` (horizontal lockup for light backgrounds), and
> `exatta-logo-white.png` (reverse, for dark backgrounds). The mark's red is `#B20703` (≈ the
> brand red `#BF0202`). Use the mark in tight/nav contexts and the full lockup where space allows.

---

## Content fundamentals — how Exatta writes
- **Language:** Brazilian Portuguese (pt-BR). Always.
- **Person:** second person, informal — trata o cliente por **"você"**. First person plural for the
  firm ("nós cuidamos", "a gente resolve").
- **Tone:** warm, human, reassuring, anti-bureaucratic. The north star is *"Não somos robô"* —
  real people, no endless tickets. Reduce anxiety around taxes and deadlines.
- **Casing:** sentence case everywhere (headings, buttons). UPPERCASE only for tiny eyebrows/labels
  with letter-spacing. Never Title Case Every Word.
- **Clarity:** short sentences, plain language, no juridiquês. When a fiscal acronym is unavoidable
  (DAS, DRE, DCTFWeb, FGTS), explain it (tooltip or inline).
- **Examples (do):** "Deixa a burocracia com a gente." · "Seus impostos estão em dia." ·
  "Envie seus documentos em segundos." · "Fale com seu contador quando quiser."
- **Examples (avoid):** "Prezado cliente, solicitamos o envio da documentação pertinente." (cold,
  formal, robotic).
- **Emoji:** not used. Convey warmth through wording and colour, not emoji.
- **Numbers/money:** Brazilian format — `R$ 128.450,00`, `12.345.678/0001-90`, dates `20/06`.
  Always render figures in the mono font.

## Visual foundations
- **Colour:** a **two-colour brand** — **red `#BF0202`** (the logo star) is the **primary** colour:
  primary buttons, active states, toggles, the brand mark. **Navy `#170F49`** is the structural
  partner: ink/headings, dark panels, secondary emphasis, and **focus rings** (kept navy so focus
  never reads as an error). Over **cool slate** neutrals. To avoid a red-primary / red-error clash,
  the **destructive** button is a red *outline* (not a second solid-red button), and input focus is
  navy while validation errors are red. Financial semantics stay first-class: **green =
  crédito/pago**, **red = débito/atraso** (same brand red family), **amber = pendente**, **blue =
  informativo**; a mint accent adds a fresh note, and a bright **teal `#03DCC9`** (`--highlight`,
  `--teal-*`) is the digital-energy accent — novidade badges, data-viz highlights, emphasis. App backgrounds are near-white with white cards;
  gradient appears only on the login/onboarding brand panel (navy-800→950).
- **Type:** three families — **Sora** (display/headings, extra-bold, tight tracking, geometric),
  **Plus Jakarta Sans** (body/UI, humanist, friendly), **JetBrains Mono** (all financial figures,
  CNPJ, codes — tabular). Display tracking is negative (`-0.02` to `-0.03em`); body is neutral.
- **Spacing:** 4px base grid (`--space-*`). Generous card padding (24px default). Layouts use flex/
  grid with `gap`, not margins.
- **Radii:** soft but not pill-y for containers — inputs/buttons 10px (`--radius-md`), cards 14px
  (`--radius-lg`), modals 20px, dropzones/hero tiles 20–28px. Pills (`--radius-pill`) only for
  badges, tags, progress, avatars.
- **Borders:** hairline `1px` in cool neutral (`--border-subtle` #E2E2EA) is the default card/table
  divider. Inputs use `--border-default`; focus swaps to navy + a 3px navy ring (`--ring-brand`),
  kept navy so focus never reads as a (red) error.
- **Shadows:** soft, cool-tinted, layered (never harsh). `--shadow-sm` for resting cards,
  `--shadow-lg` on hover-lift and popovers, `--shadow-xl` for modals. Primary buttons carry a red
  **glow** (`--shadow-brand`) — the brand's signature affordance.
- **Motion:** quick and unfussy. `--dur-fast` (120ms) for hovers, `--dur-base` (200ms) for most,
  `--dur-slow` (320ms) for entrances. Easing `--ease-out` for UI; `--ease-spring` for toggles,
  toasts and modal pop. No infinite/decorative loops.
- **Hover states:** buttons darken one brand step **and** lift `translateY(-1px)`; cards lift
  `-2px` + deepen shadow; nav/list rows fill with `--surface-sunken`.
- **Press/active:** darken a further brand step (`--brand-active`); no aggressive shrink.
- **Transparency/blur:** reserved — modal overlays (`rgba(23,23,28,0.45)` + 3px blur) and the dot
  texture on the login brand panel. Not used decoratively in content.
- **Imagery:** none required by the system; the brand panel uses a geometric dot texture, not
  photos. If photography is added, keep it warm and human (real people, atendimento), never stocky
  robot/AI clichés.

## Iconography
- **Set:** a **Lucide-style** line set (24px grid, ~1.75–2px stroke, round caps/joins). It is a
  first-class component — **`Icon`** (`components/icons/`) with 34 named glyphs (`ICON_NAMES`) and
  colour via `currentColor`. The UI kits also ship the same set as a lightweight local helper
  (`ui_kits/portal/Icons.jsx`) for screen composition. **Substitution flagged:** in production, use
  the real [Lucide](https://lucide.dev) library — the set is drawn to match its geometry so the swap
  is 1:1.
- **Usage:** icons are supporting, not decorative — nav items, KPI tiles, input prefixes, status.
  Colour = `--text-muted` at rest, `--brand` when active/emphasized. No emoji, no unicode-as-icon.
- **Financial glyphs:** receipt (guias/impostos), file (documentos/GED), wallet (financeiro), chart
  (relatórios/faturamento), shield (regularidade), calendar (vencimentos).

---

## Components  (`window.ExattaDesignSystem_128d5b`)
Reusable React primitives. Each has a `.jsx`, `.d.ts`, `.prompt.md`, and a per-group `@dsCard`.

**Forms** (`components/forms/`): `Button`, `IconButton`, `Input`, `Textarea`, `Select`,
`Checkbox`, `Radio`, `Switch`.

**Display** (`components/display/`): `Card`, `StatCard`, `Badge`, `Tag`, `Avatar`.

**Feedback** (`components/feedback/`): `Alert`, `Dialog`, `Toast`, `Tooltip`.

**Notifications** (`components/notifications/`): `Notification` (row), `NotificationPanel` (dropdown).

**Navigation** (`components/navigation/`): `Tabs`, `Progress`.

**Icons** (`components/icons/`): `Icon` — 34-glyph line set (`ICON_NAMES`, `GLYPHS`).

### Intentional additions
No source component inventory existed, so a standard set was authored, tuned to accounting:
- **StatCard** — financial KPI tile (mono figures + trend) for dashboards.
- **Progress** — onboarding/upload/obrigações completion.
Both earn their place in the portal and onboarding kits.

## UI kits
- **`ui_kits/portal/`** — *Backoffice*: **top-menu** chrome (TopNav) + the "Clientes" page with a
  compact KPI row and clients table. Matches the real product layout.
- **`ui_kits/onboarding/`** — *Exatta GED*: split-screen login → 4-step onboarding wizard
  (dados da empresa → regime → documentos → concluído).

## File index
- `styles.css` — global entry (import-only); reaches all tokens + fonts.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/{forms,display,feedback,navigation}/` — primitives + cards.
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/{portal,onboarding}/` — full-screen recreations (+ their own README.md).
- `SKILL.md` — Agent-Skill entry point.

## Caveats
- **Fonts** are loaded from Google Fonts (`tokens/fonts.css`) — no local binaries were available.
  Swap for self-hosted `@font-face` if offline/consistency is required.
- **No real screenshots/codebase** were provided; visuals are a brand-aligned
  modernization anchored on the client's brand colours red `#BF0202` + navy `#170F49` and the
  official logo in `assets/`. Provide brand fonts and real product screens to tighten fidelity.

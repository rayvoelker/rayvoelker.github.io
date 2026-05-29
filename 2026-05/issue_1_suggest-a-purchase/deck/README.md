# Suggest-a-Purchase deck — markdown/YAML build (IUG-style)

Built the same way as the IUG 2026 talks (`github.com/rayvoelker/iug2026`):
**edit prose in YAML → run `build.py` → reveal.js HTML.**

## Edit + rebuild

1. Edit the prose in `slides/suggest-a-purchase.yaml` (the only file you normally touch).
2. Rebuild:
   ```bash
   cd deck
   uv run --with pyyaml --with jinja2 python build.py
   ```
   (or, if you prefer the IUG repo's setup: `uv sync && uv run python build.py`)
3. Open / present `suggest-a-purchase.html`.

## Present

`→`/`Space` next · `←` back · `F` fullscreen · **`S` speaker notes** · `Esc` overview.
The bottom progress bar is the **elapsed-time bar** (15-min budget; turns amber/red as time runs out).

## Slide schema (in the YAML)

- `type: title` / `closing` — split beige/white layout with the CHPL logo.
- `type: content` — `title`, optional `subtitle`, then any of:
  `bullets:` (HTML allowed; `<span class="accent">…</span>` = orange emphasis),
  `image: {src, alt, style}`, `code: {language, body}`, `links_list:`, `link: {url,text}`
  (a `link` auto-inserts an iframe slide after it unless `no_iframe: true`),
  `custom_html:` (free-form), `footer_text:`, and `notes:` (speaker view).
  `background: "#0C2340"` makes a dark navy slide (footer auto-hides).
- `subslides:` — vertical (down-arrow) sub-slides, e.g. Q&A deep-dives.

## What's vendored here (offline — no internet at talk time)

- `revealjs/` — reveal.js 5.1 core + markdown / highlight / notes plugins.
- `plugin/elapsed-time-bar/` — the speaker timer bar.
- `css/iug2026.css` — the CHPL/IUG hybrid theme (navy #0C2340, beige footer, orange accent).
- `assets/` — CHPL brandmark. `templates/presentation.html.j2` — the Jinja template.

Images on slides 3/4/8 reference `../diagrams/` and `../screenshots/` in the kit —
keep this `deck/` folder inside the talk-kit folder so those resolve.

> Provenance: toolchain copied + adapted from `github.com/rayvoelker/iug2026`
> (dropped the IUG conference logo; CHPL-only branding for this internal talk).

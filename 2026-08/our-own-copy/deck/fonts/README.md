# Vendored web font — Inter

**Why these files exist:** `css/chpl-brand.css` used to `@import` Inter from
`fonts.googleapis.com`. That made the deck quietly need the internet — with no
network it fell through to Arial (→ Liberation Sans on this host), whose metrics
are *not* the ones `check-fit.py` measured its 15/15 pass against. Vendored
2026-08-19, the morning of the SLT talk, so offline == online.

**Brand note.** Inter is not a CHPL-sanctioned typeface. The brand guidelines
(`~/Documents/CHPL_BrandGuidelines/CHPL_BrandGuidelines.pdf`, p. 22) name
**BrownStd** (licensed, Lineto) as the primary face — Bold headlines, Bold/Regular
subheads, Light body — and **Arial** as the approved alternate "in digital
scenarios when BrownStd is unavailable." Inter is in the stack as the closest
free match to BrownStd, ahead of Arial. If BrownStd is ever licensed onto the
presenting machine it wins automatically; nothing here needs changing.

## The files

| File | Subset | Bytes |
|---|---|--:|
| `inter-latin.woff2` | latin | 48,256 |
| `inter-latin-ext.woff2` | latin-ext | 85,068 |

Both are **variable** — one file covers weights 300/400/600/700, which is why the
eight `@font-face` blocks in `../css/chpl-brand.css` point at only two files.
That is exactly what Google was serving; the bytes are unchanged, only the host is.

## License

SIL Open Font License 1.1 — `LICENSE.txt`, kept alongside the fonts because the
OFL requires it to travel with them. This is also why publishing the deck to
GitHub Pages is fine, and why BrownStd could **not** be vendored here even if we
had the files.

## Regenerating

```bash
curl -s -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36' \
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap'
```

Take the `latin` and `latin-ext` `@font-face` blocks, download their `url(...)`
woff2 files to the names above, rewrite the `src:` to `url('../fonts/<name>')`,
and keep each block's `unicode-range` verbatim — the ranges are what make the
browser fetch only what a slide actually needs.

`publish-pages.sh` copies this directory; if you rename it, fix that too.

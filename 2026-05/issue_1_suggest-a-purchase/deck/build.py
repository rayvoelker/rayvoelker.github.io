#!/usr/bin/env python3
"""Build reveal.js presentations from YAML slide definitions."""

import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).parent
SLIDES_DIR = ROOT / "slides"
TEMPLATES_DIR = ROOT / "templates"


def build_talk(yaml_path: Path) -> None:
    with open(yaml_path) as f:
        data = yaml.safe_load(f)

    env = Environment(
        loader=FileSystemLoader(TEMPLATES_DIR),
        keep_trailing_newline=True,
    )
    template = env.get_template("presentation.html.j2")

    # Auto-insert iframe slides after any slide with a link
    expanded = []
    for slide in data["slides"]:
        expanded.append(slide)
        if slide.get("link") and not slide.get("no_iframe"):
            expanded.append({
                "type": "iframe",
                "title": slide["link"].get("text", slide.get("title", "")),
                "url": slide["link"]["url"],
            })

    html = template.render(meta=data["meta"], slides=expanded)

    output_path = ROOT / data["meta"]["filename"]
    output_path.write_text(html)
    print(f"  {yaml_path.name} → {output_path.name}")


def main():
    yaml_files = sorted(SLIDES_DIR.glob("*.yaml"))
    if not yaml_files:
        print("No YAML files found in slides/")
        sys.exit(1)

    print(f"Building {len(yaml_files)} presentation(s)...")
    for yf in yaml_files:
        build_talk(yf)
    print("Done.")


if __name__ == "__main__":
    main()

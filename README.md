# Python to Rust Skill for Humans and Agents

Local-first reference app and portable skill pack for Python developers learning Rust.

It is designed to answer the practical question:

> "I know how I would do this in Python. What is the Rust way, and what mindset change comes with it?"

## What it includes

- searchable concept browser
- category filters
- side-by-side Python and Rust examples
- mental model notes for each translation
- recipe cards for common patterns
- official docs and GitHub source links for each concept
- a bundled markdown reading pack in `official-references.md`
- portable agent files for Codex, Copilot, Cursor, and Antigravity

## Run locally

```powershell
cd C:\Users\SANJEEV K\OneDrive\Documents\Playground\python-rust-reference
python -m http.server 4181
```

Then open:

```text
http://localhost:4181
```

## Best use

Use it while:

- rewriting Python scripts into Rust
- learning ownership and borrowing
- translating list/dict-heavy logic
- moving from exception-driven code to `Result`

## Agent formats

- Generic portable guide: `AGENTS.md`
- Copilot skill: `.github/skills/python-rust-atlas/`
- Copilot repo instructions: `.github/copilot-instructions.md`
- Cursor rule: `.cursor/rules/python-rust-atlas.mdc`
- Antigravity skill: `.agent/skills/python-rust-atlas/`
- Antigravity workspace rule: `.agent/rules/python-rust-atlas.md`

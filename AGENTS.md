# Python to Rust Atlas Agent Guide

Use this repository as a Python-to-Rust translation reference when a task
involves:

- converting Python code into idiomatic Rust
- explaining Rust concepts to a Python developer
- mapping Python control flow, data models, collections, exceptions, or async
  patterns into Rust
- citing official learning resources for Python, Rust, Tokio, Reqwest, or Serde

## Preferred workflow

1. Identify the Python concept or coding habit first.
2. Translate the mental model before writing Rust.
3. Prefer native Rust constructs over Python-like emulation.
4. Show a concise side-by-side mapping when code is involved.
5. Call out the main watchouts clearly.
6. Link official references when the user wants citations or deeper study.

## Primary local references

- Skill entrypoint: `.github/skills/python-rust-atlas/SKILL.md`
- Antigravity skill entrypoint: `.agent/skills/python-rust-atlas/SKILL.md`
- Concept mappings: `.github/skills/python-rust-atlas/references/concepts.md`
- Rewrite patterns: `.github/skills/python-rust-atlas/references/patterns.md`
- Official links: `.github/skills/python-rust-atlas/references/official-links.md`
- Human reading pack: `official-references.md`

## Output shape

- Start with the Rust equivalent in one sentence.
- Explain the mental shift in plain language.
- Show a small Rust example or Python-to-Rust mapping.
- Mention 1-3 practical watchouts.
- Add official links only when useful.

## Guardrails

- Do not preserve Python class-heavy architecture by default. Prefer structs,
  enums, traits, and plain functions.
- Do not hide recoverable errors behind `unwrap()` unless an intentional crash
  is acceptable.
- Do not ignore ownership or borrowing tradeoffs in order to make the code look
  more like Python.
- Do not assume borrowed data can freely cross async task boundaries.

## Source preference

Prefer these source categories in order:

1. Official Python docs
2. Official Rust docs and the Rust Book
3. Official docs.rs pages for widely used crates such as Tokio, Reqwest, and
   Serde
4. Official GitHub org repos for rust-lang, tokio-rs, reqwest, and serde-rs

For tools without a repo-specific format, treat this `AGENTS.md` file as the
main portable instruction file.

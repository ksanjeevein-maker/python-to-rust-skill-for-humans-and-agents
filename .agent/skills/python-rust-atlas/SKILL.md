---
name: python-rust-atlas
description: Translate Python concepts, snippets, and migration habits into idiomatic Rust. Use when an agent needs a Python-to-Rust reference, wants to explain ownership and borrowing to a Python developer, or needs concise rewrite patterns with official links.
---

# Python Rust Atlas

Use this skill to answer "what is the Rust way to do the Python thing I
already know?"

## Quick Start

- Read `references/concepts.md` for conceptual mapping and mindset shifts.
- Read `references/patterns.md` for concrete rewrite patterns.
- Read `references/official-links.md` when official docs or source repos are
  needed.

## Workflow

1. Identify the Python construct or coding habit.
2. Translate the mental model before writing Rust.
3. Prefer native Rust types and control flow.
4. Show a small Rust example instead of a giant transliteration.
5. Call out the main watchouts clearly.

## Output

- Start with the Rust equivalent in one sentence.
- Explain the mental shift in plain language.
- Show a concise mapping or snippet.
- Mention 1-3 watchouts.
- Add official links only when useful.

## Guardrails

- Do not force Python classes, mutable aliasing, or exception-heavy control flow
  directly into Rust.
- Do not hide recoverable errors behind `unwrap()` unless an intentional crash
  is acceptable.
- Do not ignore ownership or async task boundaries just to preserve Python
  shape.

## Extended references

- Read `references/decision-guide.md` when the user needs a migration path or sequence.
- Read `references/worked-example.md` when a concrete example would help.
- Read `references/review-checklist.md` when reviewing an implementation or plan.

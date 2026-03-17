# Python to Rust Skill for Humans and Agents

A local-first reference app and portable skill pack for Python developers learning Rust.

The hard part is not syntax. The hard part is learning ownership, explicit errors, and data modeling without dragging Python assumptions into Rust.

## What makes this repo more useful now

- A stronger learning path for self-study and onboarding
- A worked example that shows the migration or debugging move end to end
- A mental-model diagram for fast orientation
- A review checklist for code review or design review
- Portable agent files for Codex, Copilot, Cursor, and Antigravity

## Learning path

- Start with ownership, borrowing, and mutability before touching async or traits.
- Move next into `Option` and `Result`, because error handling changes how functions are designed.
- Then translate data modeling: structs, enums, `Vec`, `HashMap`, and iterators.
- Finish with async and ecosystem crates such as Tokio, Reqwest, Serde, and Clippy-driven cleanup.

## High-signal traps

- Trying to preserve Python class hierarchies instead of using structs, enums, and traits.
- Using `unwrap()` to silence compiler pressure instead of designing error paths.
- Moving borrowed data into spawned async work and fighting lifetime errors blindly.
- Porting line by line instead of redesigning around ownership and explicit types.

## Read this next

- Main portable guide: `AGENTS.md`
- Decision guide: `docs/decision-guide.md`
- Worked example: `examples/worked-example.md`
- Mental-model diagram: `docs/mental-model-map.md`
- Review checklist: `docs/review-checklist.md`
- Official references: `official-references.md`

## Agent formats

- Codex and generic portable guide: `AGENTS.md`
- Copilot repo instructions: `.github/copilot-instructions.md`
- Copilot skill: `.github/skills/python-rust-atlas/`
- Cursor rule: `.cursor/rules/python-rust-atlas.mdc`
- Antigravity-style rule: `.agent/rules/python-rust-atlas.md`
- Antigravity-style skill: `.agent/skills/python-rust-atlas/`

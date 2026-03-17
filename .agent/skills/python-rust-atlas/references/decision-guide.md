# Python to Rust Skill for Humans and Agents Decision Guide

Use this when you need to choose the next move instead of reading every reference front to back.

## When to use this guide

- Use it when the user is blocked by one of these traps: Trying to preserve Python class hierarchies instead of using structs, enums, and traits., Using `unwrap()` to silence compiler pressure instead of designing error paths..
- Use it when you need to decide the order of migration work, not just the target syntax.
- Use it when you need a short review path before shipping or approving code.

## Recommended sequence

### Step 1: Orient

- Focus: Start with ownership, borrowing, and mutability before touching async or traits.
- Exit check: Does the Rust code use owned vs borrowed values deliberately?

### Step 2: Translate

- Focus: Move next into `Option` and `Result`, because error handling changes how functions are designed.
- Exit check: Are missing values and recoverable failures modeled with `Option` and `Result`?

### Step 3: Implement

- Focus: Then translate data modeling: structs, enums, `Vec`, `HashMap`, and iterators.
- Exit check: Did the data model become simpler in Rust rather than more Python-shaped?

### Step 4: Harden

- Focus: Finish with async and ecosystem crates such as Tokio, Reqwest, Serde, and Clippy-driven cleanup.
- Exit check: Are async tasks and shared state safe for Tokio execution?

## If the user is stuck, choose this next move

- If they are porting line by line, redirect to the mental model in `docs/mental-model-map.md` and call out: Porting line by line instead of redesigning around ownership and explicit types.
- If they need proof, show `examples/worked-example.md` and explain what changed structurally.
- If they are ready to merge or publish, run the checklist in `docs/review-checklist.md`.

## Escalate when

- The implementation still violates this review check: Is the code leaning on compiler-checked structure instead of runtime guesswork?
- The chosen approach depends on preserving a source-side habit that keeps causing trouble: Trying to preserve Python class hierarchies instead of using structs, enums, and traits.

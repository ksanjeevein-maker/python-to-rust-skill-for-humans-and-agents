# Python to Rust Concepts

## Ownership and mutability

- Python habit: alias objects freely and mutate through live references.
- Rust equivalent: one owner plus explicit immutable or mutable borrows.
- Mental shift: data access is part of the type contract.
- Watchouts:
  - Moving a non-`Copy` value invalidates the old binding.
  - Mutable and immutable borrows cannot overlap.

## Functions and returns

- Python habit: rely on flexible runtime typing.
- Rust equivalent: declare parameter types, return types, and ownership in the
  signature.
- Mental shift: the function signature is a compiler-checked contract.
- Watchouts:
  - A trailing semicolon changes the return value to `()`.
  - Returning references requires valid lifetimes.

## Structs instead of classes

- Python habit: put data and behavior together inside classes.
- Rust equivalent: use `struct` for data and `impl` blocks for behavior.
- Mental shift: model data shape first, then attach behavior.
- Watchouts:
  - There is no inheritance chain to recreate by default.
  - Mutating methods must take `&mut self`.

## dict to HashMap

- Python habit: default to `dict` for almost everything.
- Rust equivalent: use `HashMap<K, V>` and explicit lookup/update APIs.
- Mental shift: map access is more typed and often returns borrowed values.
- Watchouts:
  - `.get()` returns `Option<&V>`.
  - `entry()` is often the best translation for in-place updates.

## None and exceptions to Option and Result

- Python habit: use `None` plus `try/except`.
- Rust equivalent: use `Option<T>` for absence and `Result<T, E>` for
  recoverable failure.
- Mental shift: absence and failure belong in the type system.
- Watchouts:
  - `?` only works in compatible `Option` or `Result` contexts.
  - `unwrap()` is a deliberate crash path.

## asyncio to Tokio

- Python habit: think in coroutines and an event loop.
- Rust equivalent: choose a runtime such as Tokio and account for ownership
  across tasks.
- Mental shift: async is still cooperative, but task boundaries are stricter.
- Watchouts:
  - Spawned tasks usually need owned or thread-safe data.
  - Cross-thread futures may need `Send`.

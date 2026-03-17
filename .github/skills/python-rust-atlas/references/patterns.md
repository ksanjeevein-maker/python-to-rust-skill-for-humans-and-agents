# Python to Rust Patterns

## Mutate in place

Python:

```python
def grow(values):
    values.append(99)
```

Rust:

```rust
fn grow(values: &mut Vec<i32>) {
    values.push(99);
}
```

## Expression return

Python:

```python
def square(x):
    return x * x
```

Rust:

```rust
fn square(x: i32) -> i32 {
    x * x
}
```

## Constructor pattern

Python:

```python
user = User("Mina")
```

Rust:

```rust
impl User {
    fn new(name: &str) -> Self {
        Self { name: name.to_string() }
    }
}
```

## Counter update

Python:

```python
counts[word] = counts.get(word, 0) + 1
```

Rust:

```rust
*counts.entry(word).or_insert(0) += 1;
```

## Fallback default

Python:

```python
name = maybe_name or "guest"
```

Rust:

```rust
let name = maybe_name.unwrap_or("guest");
```

## Parallel async work

Python:

```python
results = await asyncio.gather(*tasks)
```

Rust:

```rust
let (a, b) = tokio::join!(task_a(), task_b());
```

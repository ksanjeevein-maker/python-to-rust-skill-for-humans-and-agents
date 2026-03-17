# Worked example: from Python report builder to Rust service module

This scenario turns a small Python reporting function into a Rust module that uses typed records, explicit fallbacks, and `HashMap` aggregation instead of mutable dictionary sprawl.

## Python

```python
from collections import defaultdict

def summarize(rows):
    totals = defaultdict(int)
    for row in rows:
        region = row.get("region") or "unknown"
        totals[region] += row.get("amount", 0)
    return totals
```

## Rust

```rust
use std::collections::HashMap;

struct OrderRow {
    region: Option<String>,
    amount: i64,
}

fn summarize(rows: &[OrderRow]) -> HashMap<String, i64> {
    let mut totals = HashMap::new();

    for row in rows {
        let region = row.region.as_deref().unwrap_or("unknown").to_string();
        *totals.entry(region).or_insert(0) += row.amount;
    }

    totals
}
```

## What to notice

- The fallback for missing region is explicit instead of duck-typed.
- Aggregation happens through `entry()` rather than implicit dict mutation.
- Typed rows make later compiler feedback much more useful.

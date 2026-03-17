# Python to Rust Skill for Humans and Agents Review Checklist

Use this checklist during code review, design review, or migration planning.

- Does the Rust code use owned vs borrowed values deliberately?
- Are missing values and recoverable failures modeled with `Option` and `Result`?
- Did the data model become simpler in Rust rather than more Python-shaped?
- Are async tasks and shared state safe for Tokio execution?
- Is the code leaning on compiler-checked structure instead of runtime guesswork?

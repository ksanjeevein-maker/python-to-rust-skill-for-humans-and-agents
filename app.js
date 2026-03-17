const categories = [
  { id: "all", label: "All concepts" },
  { id: "mindset", label: "Mindset" },
  { id: "syntax", label: "Syntax" },
  { id: "collections", label: "Collections" },
  { id: "errors", label: "Errors" },
  { id: "async", label: "Async" },
];

const concepts = [
  {
    id: "ownership",
    category: "mindset",
    level: "Core shift",
    title: "Ownership and mutability",
    summary:
      "Rust makes you say who owns data, who borrows it, and whether it may change.",
    keywords: ["ownership", "borrowing", "mut"],
    python: ["items = [1, 2, 3]", "alias = items", "alias.append(4)"].join("\n"),
    rust: [
      "let mut items = vec![1, 2, 3];",
      "items.push(4);",
      "let view = &items;",
    ].join("\n"),
    checklist: [
      "Default to immutable `let` bindings.",
      "Borrow with `&value` to read without moving ownership.",
      "Use `&mut value` when a function must mutate the original.",
    ],
    crates: [
      "Learn `Vec`, `String`, references, and slices before adding crates.",
      "Run `cargo clippy` early. It teaches borrowing habits fast.",
    ],
    mentalShift:
      "Python aliasing is casual. Rust ownership is a map of where data lives and who may touch it.",
    habitDrop: "Stop assuming mutable access can be duplicated freely.",
    habitBuild: "Ask: who owns it, who borrows it, and does it need mutation?",
    watchouts: [
      "Moving a value invalidates the old binding unless the type is `Copy`.",
      "You cannot hold mutable and immutable borrows of the same value at once.",
    ],
    recipes: [
      {
        title: "Mutate in place",
        summary: "Turn a Python mutating helper into an explicit mutable borrow.",
        python: ["def grow(values):", "    values.append(99)"].join("\n"),
        rust: ["fn grow(values: &mut Vec<i32>) {", "    values.push(99);", "}"].join("\n"),
      },
    ],
  },
  {
    id: "functions",
    category: "syntax",
    level: "Start here",
    title: "Functions and returns",
    summary:
      "Rust functions are explicit about parameter types, return types, and ownership.",
    keywords: ["fn", "return", "types"],
    python: [
      "def greet(name, excited=False):",
      "    return f\"Hello, {name}!\" if excited else f\"Hello, {name}\"",
    ].join("\n"),
    rust: [
      "fn greet(name: &str, excited: bool) -> String {",
      "    if excited {",
      "        format!(\"Hello, {}!\", name)",
      "    } else {",
      "        format!(\"Hello, {}\", name)",
      "    }",
      "}",
    ].join("\n"),
    checklist: [
      "Annotate parameters and return types.",
      "Remember the last expression returns when there is no semicolon.",
      "Use `&str` for borrowed text and `String` for owned text.",
    ],
    crates: ["`format!` is the usual bridge from Python f-strings to owned strings."],
    mentalShift:
      "Python functions feel open-ended. Rust functions feel like contracts the compiler can verify.",
    habitDrop: "Stop relying on implicit duck typing inside function bodies.",
    habitBuild: "Think in input shape, output shape, and ownership at the signature level.",
    watchouts: [
      "A trailing semicolon changes an expression into `()`.",
      "Returning a borrowed value requires the borrow to outlive the function.",
    ],
    recipes: [
      {
        title: "Expression return",
        summary: "Rust can return the final expression directly.",
        python: ["def square(x):", "    return x * x"].join("\n"),
        rust: ["fn square(x: i32) -> i32 {", "    x * x", "}"].join("\n"),
      },
    ],
  },
  {
    id: "structs",
    category: "syntax",
    level: "Core shift",
    title: "Structs instead of classes",
    summary:
      "Rust separates data shape from behavior. `struct` holds fields and `impl` holds methods.",
    keywords: ["struct", "impl", "methods"],
    python: [
      "class User:",
      "    def __init__(self, name):",
      "        self.name = name",
    ].join("\n"),
    rust: [
      "struct User {",
      "    name: String,",
      "}",
      "",
      "impl User {",
      "    fn label(&self) -> String {",
      "        self.name.to_uppercase()",
      "    }",
      "}",
    ].join("\n"),
    checklist: [
      "Put data in the struct and behavior in an `impl` block.",
      "Use `&self` for read-only methods and `&mut self` for mutating methods.",
      "Prefer composition and traits over inheritance trees.",
    ],
    crates: ["Serde is a common next step once structs need JSON serialization."],
    mentalShift:
      "Rust models data first and behavior second. There is less magic, but the type shape becomes clearer.",
    habitDrop: "Stop rebuilding inheritance chains by default.",
    habitBuild: "Model the fields honestly, then add methods that respect ownership.",
    watchouts: [
      "There is no magic constructor like `__init__`.",
      "Mutating methods must take `&mut self`.",
    ],
    recipes: [
      {
        title: "Simple constructor",
        summary: "Use an associated function like `new`.",
        python: ["user = User(\"Mina\")"].join("\n"),
        rust: [
          "impl User {",
          "    fn new(name: &str) -> Self {",
          "        Self { name: name.to_string() }",
          "    }",
          "}",
        ].join("\n"),
      },
    ],
  },
  {
    id: "hashmap",
    category: "collections",
    level: "Core shift",
    title: "dict to HashMap",
    summary:
      "Rust does not have a built-in dict literal in the language. The common translation is `HashMap<K, V>`.",
    keywords: ["dict", "hashmap", "entry"],
    python: [
      "counts = {\"red\": 2, \"blue\": 5}",
      "counts[\"green\"] = 1",
      "value = counts.get(\"red\", 0)",
    ].join("\n"),
    rust: [
      "use std::collections::HashMap;",
      "",
      "let mut counts = HashMap::from([(\"red\", 2), (\"blue\", 5)]);",
      "counts.insert(\"green\", 1);",
      "let value = counts.get(\"red\").copied().unwrap_or(0);",
    ].join("\n"),
    checklist: [
      "Import `std::collections::HashMap`.",
      "Use `.insert()` for updates.",
      "Learn `.entry()` for in-place counter patterns.",
    ],
    crates: ["Use `indexmap` when insertion order should stay stable."],
    mentalShift:
      "Python dict is the default Swiss army knife. Rust makes map behavior more explicit and more typed.",
    habitDrop: "Stop expecting map lookups to hand back owned values automatically.",
    habitBuild: "Think in borrowed references, copied values, and entry APIs.",
    watchouts: [
      "`.get()` returns `Option<&V>`, not `V` directly.",
      "Owned keys and borrowed lookup values interact differently.",
    ],
    recipes: [
      {
        title: "Increment a counter",
        summary: "Translate `dict.get` plus assignment into `entry`.",
        python: ["counts[word] = counts.get(word, 0) + 1"].join("\n"),
        rust: ["*counts.entry(word).or_insert(0) += 1;"].join("\n"),
      },
    ],
  },
  {
    id: "option-result",
    category: "errors",
    level: "Start here",
    title: "None and exceptions become Option and Result",
    summary:
      "Rust turns missing values and failures into explicit types instead of runtime surprises.",
    keywords: ["Option", "Result", "None", "exceptions"],
    python: [
      "try:",
      "    data = json.loads(payload)",
      "except ValueError:",
      "    data = None",
    ].join("\n"),
    rust: [
      "fn parse(payload: &str) -> Result<Value, serde_json::Error> {",
      "    serde_json::from_str(payload)",
      "}",
      "",
      "let maybe_name: Option<&str> = Some(\"mina\");",
    ].join("\n"),
    checklist: [
      "Use `Option<T>` for expected absence.",
      "Use `Result<T, E>` for recoverable failure.",
      "Reach for `match`, `if let`, `.unwrap_or()`, and `?` often.",
    ],
    crates: [
      "`anyhow` is useful for app-level errors.",
      "`thiserror` is good for custom library error types.",
    ],
    mentalShift:
      "Python catches reality afterward with `try/except`. Rust makes the error or absence visible in the function contract.",
    habitDrop: "Stop using broad exception handling as a normal control-flow tool.",
    habitBuild: "Model absence and failure in the type system from the start.",
    watchouts: [
      "`?` only works in functions that return a compatible `Result` or `Option`.",
      "Avoid `unwrap()` in production paths unless crashing is intentional.",
    ],
    recipes: [
      {
        title: "Fallback default",
        summary: "Turn an optional value into a safe default.",
        python: ["name = maybe_name or \"guest\""].join("\n"),
        rust: ["let name = maybe_name.unwrap_or(\"guest\");"].join("\n"),
      },
    ],
  },
  {
    id: "async",
    category: "async",
    level: "Workflow",
    title: "asyncio to async/await with Tokio",
    summary:
      "Rust async looks familiar on the surface, but you usually choose a runtime like Tokio and stay explicit about ownership across tasks.",
    keywords: ["asyncio", "tokio", "await", "spawn"],
    python: [
      "async def fetch(client, url):",
      "    async with client.get(url) as response:",
      "        return await response.text()",
    ].join("\n"),
    rust: [
      "async fn fetch(client: &reqwest::Client, url: &str) -> reqwest::Result<String> {",
      "    let response = client.get(url).send().await?;",
      "    response.text().await",
      "}",
    ].join("\n"),
    checklist: [
      "Pick a runtime early. Tokio is the default choice for most app work.",
      "Expect spawned tasks to need owned or thread-safe data.",
      "Use `tokio::join!` or `tokio::spawn` for concurrency patterns.",
    ],
    crates: ["`tokio` for the runtime.", "`reqwest` for async HTTP work."],
    mentalShift:
      "Python async is mostly about cooperative concurrency. Rust async adds ownership and Send/Sync concerns once work crosses tasks.",
    habitDrop: "Stop assuming borrowed data can casually live inside spawned tasks.",
    habitBuild: "Think about runtime choice, task ownership, and cancellation together.",
    watchouts: [
      "Some futures must be `Send` to move across runtime threads.",
      "A borrowed value often has to become owned before `spawn`.",
    ],
    recipes: [
      {
        title: "Parallel work",
        summary: "Join futures explicitly rather than relying on implicit event-loop helpers.",
        python: ["results = await asyncio.gather(*tasks)"].join("\n"),
        rust: ["let (a, b) = tokio::join!(task_a(), task_b());"].join("\n"),
      },
    ],
  },
];

const referencesByConcept = {
  ownership: [
    {
      label: "Control flow and function definitions",
      source: "Python tutorial",
      type: "Docs",
      url: "https://docs.python.org/3/tutorial/controlflow.html",
    },
    {
      label: "What is ownership?",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html",
    },
    {
      label: "References and borrowing",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",
    },
    {
      label: "Rust book source repo",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/rust-lang/book",
    },
  ],
  functions: [
    {
      label: "Function definitions in Python",
      source: "Python tutorial",
      type: "Docs",
      url: "https://docs.python.org/3/tutorial/controlflow.html",
    },
    {
      label: "How functions work",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch03-03-how-functions-work.html",
    },
    {
      label: "Rust by Example",
      source: "rust-lang",
      type: "Docs",
      url: "https://doc.rust-lang.org/rust-by-example/",
    },
    {
      label: "Rust by Example source",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/rust-lang/rust-by-example",
    },
  ],
  structs: [
    {
      label: "Classes in Python",
      source: "Python tutorial",
      type: "Docs",
      url: "https://docs.python.org/3/tutorial/classes.html",
    },
    {
      label: "Defining structs",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch05-01-defining-structs.html",
    },
    {
      label: "Traits: shared behavior",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch10-02-traits.html",
    },
    {
      label: "Serde source repo",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/serde-rs/serde",
    },
  ],
  hashmap: [
    {
      label: "Python data structures",
      source: "Python tutorial",
      type: "Docs",
      url: "https://docs.python.org/3/tutorial/datastructures.html",
    },
    {
      label: "HashMap in the standard library",
      source: "Rust std",
      type: "Docs",
      url: "https://doc.rust-lang.org/std/collections/struct.HashMap.html",
    },
    {
      label: "Rust by Example",
      source: "rust-lang",
      type: "Docs",
      url: "https://doc.rust-lang.org/rust-by-example/",
    },
    {
      label: "Rustlings exercises",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/rust-lang/rustlings",
    },
  ],
  "option-result": [
    {
      label: "Errors and exceptions",
      source: "Python tutorial",
      type: "Docs",
      url: "https://docs.python.org/3/tutorial/errors.html",
    },
    {
      label: "Error handling",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch09-00-error-handling.html",
    },
    {
      label: "Option",
      source: "Rust std",
      type: "Docs",
      url: "https://doc.rust-lang.org/std/option/",
    },
    {
      label: "Result",
      source: "Rust std",
      type: "Docs",
      url: "https://doc.rust-lang.org/std/result/",
    },
    {
      label: "serde_json::from_str",
      source: "docs.rs",
      type: "Docs",
      url: "https://docs.rs/serde_json/latest/serde_json/fn.from_str.html",
    },
    {
      label: "Serde source repo",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/serde-rs/serde",
    },
  ],
  async: [
    {
      label: "asyncio",
      source: "Python library",
      type: "Docs",
      url: "https://docs.python.org/3/library/asyncio.html",
    },
    {
      label: "asyncio tasks",
      source: "Python library",
      type: "Docs",
      url: "https://docs.python.org/3/library/asyncio-task.html",
    },
    {
      label: "Async and await",
      source: "The Rust Book",
      type: "Docs",
      url: "https://doc.rust-lang.org/book/ch17-00-async-await.html",
    },
    {
      label: "tokio::join!",
      source: "docs.rs",
      type: "Docs",
      url: "https://docs.rs/tokio/latest/tokio/macro.join.html",
    },
    {
      label: "tokio::spawn",
      source: "docs.rs",
      type: "Docs",
      url: "https://docs.rs/tokio/latest/tokio/task/fn.spawn.html",
    },
    {
      label: "Reqwest docs",
      source: "docs.rs",
      type: "Docs",
      url: "https://docs.rs/reqwest/latest/reqwest/",
    },
    {
      label: "Tokio source repo",
      source: "GitHub",
      type: "Repo",
      url: "https://github.com/tokio-rs/tokio",
    },
  ],
};

const sharedReferences = [
  {
    label: "Project markdown reference pack",
    source: "This project",
    type: "Guide",
    url: "./official-references.md",
  },
  {
    label: "Python tutorial",
    source: "docs.python.org",
    type: "Docs",
    url: "https://docs.python.org/3/tutorial/",
  },
  {
    label: "The Rust Programming Language",
    source: "rust-lang",
    type: "Docs",
    url: "https://doc.rust-lang.org/book/",
  },
  {
    label: "Rust by Example",
    source: "rust-lang",
    type: "Docs",
    url: "https://doc.rust-lang.org/rust-by-example/",
  },
  {
    label: "Rustlings practice repo",
    source: "GitHub",
    type: "Repo",
    url: "https://github.com/rust-lang/rustlings",
  },
  {
    label: "Tokio source repo",
    source: "GitHub",
    type: "Repo",
    url: "https://github.com/tokio-rs/tokio",
  },
];

const state = {
  search: "",
  category: "all",
  selectedId: "ownership",
  detailTab: "code",
};

const elements = {
  statCount: document.getElementById("stat-count"),
  statCategory: document.getElementById("stat-category"),
  statSelected: document.getElementById("stat-selected"),
  resultsCount: document.getElementById("results-count"),
  searchInput: document.getElementById("search-input"),
  categoryChips: document.getElementById("category-chips"),
  conceptList: document.getElementById("concept-list"),
  detailCategory: document.getElementById("detail-category"),
  detailTitle: document.getElementById("detail-title"),
  detailLevel: document.getElementById("detail-level"),
  detailSummary: document.getElementById("detail-summary"),
  pythonCode: document.getElementById("python-code"),
  rustCode: document.getElementById("rust-code"),
  translationChecklist: document.getElementById("translation-checklist"),
  crateNotes: document.getElementById("crate-notes"),
  mentalShift: document.getElementById("mental-shift"),
  habitDrop: document.getElementById("habit-drop"),
  habitBuild: document.getElementById("habit-build"),
  watchouts: document.getElementById("watchouts"),
  recipeGrid: document.getElementById("recipe-grid"),
  detailReferenceCount: document.getElementById("detail-reference-count"),
  detailReferenceList: document.getElementById("detail-reference-list"),
  sharedReferenceList: document.getElementById("shared-reference-list"),
  detailTabs: [...document.querySelectorAll(".detail-tab")],
  detailPanels: [...document.querySelectorAll(".detail-tab-panel")],
};

bindSearch();
bindDetailTabs();
bindCopyButtons();
render();

function bindSearch() {
  elements.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    ensureSelectedConcept();
    render();
  });
}

function bindDetailTabs() {
  elements.detailTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.detailTab = tab.dataset.detailTab;
      renderDetailTabs();
    });
  });
}

function bindCopyButtons() {
  document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.dataset.copyTarget;
      const node = document.getElementById(targetId);
      if (!node) {
        return;
      }
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(node.textContent);
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Use localhost";
      }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    });
  });
}

function render() {
  renderCategoryChips();
  renderConceptList();
  renderDetail();
  renderStats();
  renderDetailTabs();
}

function renderCategoryChips() {
  elements.categoryChips.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-chip${state.category === category.id ? " is-active" : ""}`;
    button.textContent = category.label;
    button.addEventListener("click", () => {
      state.category = category.id;
      ensureSelectedConcept();
      render();
    });
    elements.categoryChips.appendChild(button);
  });
}

function renderConceptList() {
  const filtered = getFilteredConcepts();
  const template = document.getElementById("concept-card-template");

  elements.conceptList.innerHTML = "";
  elements.resultsCount.textContent = `${filtered.length} concept${filtered.length === 1 ? "" : "s"}`;

  if (filtered.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No concepts match that filter. Try a broader search like ownership, async, or dict.";
    elements.conceptList.appendChild(empty);
    return;
  }

  filtered.forEach((concept) => {
    const fragment = template.content.cloneNode(true);
    const button = fragment.querySelector(".concept-card");
    fragment.querySelector(".concept-category").textContent = getCategoryLabel(concept.category);
    fragment.querySelector(".concept-level").textContent = concept.level;
    fragment.querySelector(".concept-title").textContent = concept.title;
    fragment.querySelector(".concept-summary").textContent = concept.summary;
    button.classList.toggle("is-active", concept.id === state.selectedId);

    concept.keywords.forEach((keyword) => {
      const chip = document.createElement("span");
      chip.className = "keyword-chip";
      chip.textContent = keyword;
      fragment.querySelector(".concept-keywords").appendChild(chip);
    });

    button.addEventListener("click", () => {
      state.selectedId = concept.id;
      render();
    });

    elements.conceptList.appendChild(fragment);
  });
}

function renderDetail() {
  const concept = getSelectedConcept();
  elements.detailCategory.textContent = getCategoryLabel(concept.category);
  elements.detailTitle.textContent = concept.title;
  elements.detailLevel.textContent = concept.level;
  elements.detailSummary.textContent = concept.summary;
  elements.pythonCode.textContent = concept.python;
  elements.rustCode.textContent = concept.rust;
  renderBulletList(elements.translationChecklist, concept.checklist);
  renderBulletList(elements.crateNotes, concept.crates);
  elements.mentalShift.textContent = concept.mentalShift;
  elements.habitDrop.textContent = concept.habitDrop;
  elements.habitBuild.textContent = concept.habitBuild;
  renderBulletList(elements.watchouts, concept.watchouts);
  renderRecipes(concept.recipes);
  renderReferenceShelf(concept);
}

function renderRecipes(recipes) {
  const template = document.getElementById("recipe-template");
  elements.recipeGrid.innerHTML = "";
  recipes.forEach((recipe) => {
    const fragment = template.content.cloneNode(true);
    fragment.querySelector(".recipe-title").textContent = recipe.title;
    fragment.querySelector(".recipe-summary").textContent = recipe.summary;
    fragment.querySelector(".recipe-python").textContent = recipe.python;
    fragment.querySelector(".recipe-rust").textContent = recipe.rust;
    elements.recipeGrid.appendChild(fragment);
  });
}

function renderReferenceShelf(concept) {
  const conceptReferences = referencesByConcept[concept.id] ?? [];
  elements.detailReferenceCount.textContent =
    `${conceptReferences.length} concept link${getPluralSuffix(conceptReferences.length)} + ` +
    `${sharedReferences.length} shelf link${getPluralSuffix(sharedReferences.length)}`;
  renderReferenceList(elements.detailReferenceList, conceptReferences);
  renderReferenceList(elements.sharedReferenceList, sharedReferences);
}

function renderReferenceList(element, references) {
  element.innerHTML = "";
  references.forEach((reference) => {
    const anchor = document.createElement("a");
    anchor.className = "reference-link";
    anchor.href = reference.url;
    anchor.target = "_blank";
    anchor.rel = "noreferrer noopener";

    const top = document.createElement("div");
    top.className = "reference-link-top";

    const title = document.createElement("span");
    title.className = "reference-link-title";
    title.textContent = reference.label;

    const type = document.createElement("span");
    type.className = "reference-type";
    type.textContent = reference.type;

    const meta = document.createElement("p");
    meta.className = "reference-meta";
    meta.textContent = reference.source;

    top.append(title, type);
    anchor.append(top, meta);
    element.appendChild(anchor);
  });
}

function renderStats() {
  elements.statCount.textContent = String(concepts.length);
  elements.statCategory.textContent = getCategoryLabel(state.category);
  elements.statSelected.textContent = getSelectedConcept().title;
}

function renderDetailTabs() {
  elements.detailTabs.forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.detailTab === state.detailTab);
  });
  elements.detailPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.detailPanel === state.detailTab);
  });
}

function renderBulletList(element, values) {
  element.innerHTML = "";
  values.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    element.appendChild(item);
  });
}

function getFilteredConcepts() {
  return concepts.filter((concept) => {
    const matchesCategory = state.category === "all" || concept.category === state.category;
    if (!matchesCategory) {
      return false;
    }
    if (!state.search) {
      return true;
    }
    const haystack = [concept.title, concept.summary, ...concept.keywords].join(" ").toLowerCase();
    return haystack.includes(state.search);
  });
}

function ensureSelectedConcept() {
  const filtered = getFilteredConcepts();
  if (filtered.some((concept) => concept.id === state.selectedId)) {
    return;
  }
  state.selectedId = filtered[0]?.id ?? concepts[0].id;
}

function getSelectedConcept() {
  return concepts.find((concept) => concept.id === state.selectedId) || concepts[0];
}

function getCategoryLabel(categoryId) {
  return categories.find((category) => category.id === categoryId)?.label ?? "All concepts";
}

function getPluralSuffix(count) {
  return count === 1 ? "" : "s";
}

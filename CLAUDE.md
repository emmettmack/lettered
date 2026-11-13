# Working on Lettered

Read `docs/product.md` and `docs/brand.md` before changing anything. The decisions there are settled.

## Owner

Emmett is the founder. He's a USC sprinter and a PR major. He wants work that looks extremely refined and doesn't read as AI-made.

## How to work with him

- Don't repeat his requests back to him. Do the work, then say what changed in a line or two.
- Ask before big rebuilds. Small fixes, just make them.
- Short, direct sentences. Opinion first.

## The prototype

- One self-contained file: `prototype/index.html`. Plain HTML, CSS and JavaScript, no framework, no build.
- State lives in the `S` object. Each screen is a function in `V`, rendered by `render()`.
- Photos are placeholder canvases drawn per sport in `shot()`. Replace them with real photos when they exist.
- Keep everything in one file unless asked to split it.

## Rules

- Follow the brand colors and fonts exactly.
- Copy follows the voice rules in `docs/brand.md`.
- Never add a free trial, waitlist numbers or member numbers. See "Ruled out" in `docs/product.md`.
- Test any change by opening the file in a browser before committing.

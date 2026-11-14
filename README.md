# Eridanus

A private [shadcn registry](https://ui.shadcn.com/docs/registry/github) of React components, hooks and design tokens on Base UI, in the `base-rhea` style (preset `beqC918K`).

```bash
gh auth login                                          # once: the repository is private
npx shadcn@latest init juchangrong/eridanus/base       # start a project on the Eridanus base
npx shadcn@latest add juchangrong/eridanus/time        # add an item to a shadcn project
```

## Development

```bash
bun install
bun run dev          # the docs site: every item and shadcn primitive with live examples
bun check            # type-check, lint, format check, registry validation and the docs build
bun fmt              # format, sort imports and Tailwind classes
bun lint --fix       # apply safe lint fixes
bun run test:install # install every item into a fresh app and build it
```

Bun's linter ships only in canary builds so far: `bun upgrade --canary`.

See [docs/plan.md](docs/plan.md) for the scope, layout and roadmap.

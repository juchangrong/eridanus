# Eridanus

A private [shadcn registry](https://ui.shadcn.com/docs/registry/github) of React components, hooks and design tokens on Base UI, in the `base-rhea` style (preset `beqC918K`).

```bash
gh auth login                                          # once: the repository is private
npx shadcn@latest init juchangrong/eridanus/base       # start a project on the Eridanus base
npx shadcn@latest add juchangrong/eridanus/time        # add an item to a shadcn project
```

## Development

```bash
pnpm install
pnpm dev            # the docs site: every item and shadcn primitive with live examples
pnpm check          # type-check, lint, registry validation and the docs build
pnpm lint:fix       # format, sort imports and apply safe lint fixes with Biome
pnpm test:install   # install every item into a fresh app and build it
```

See [docs/plan.md](docs/plan.md) for the scope, layout and roadmap.

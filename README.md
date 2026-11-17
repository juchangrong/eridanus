# Eridanus

An open-source [shadcn registry](https://ui.shadcn.com/docs/registry/github) of React components, hooks and design tokens on Base UI, in the `base-rhea` style (preset `beqC918K`).

```bash
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

## License

MIT. The primitives in `src/components/ui` are adapted from [shadcn/ui](https://github.com/shadcn-ui/ui), also MIT; see [LICENSE](LICENSE) and [THIRD_PARTY_LICENSES](THIRD_PARTY_LICENSES).

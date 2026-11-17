# Product

## Register

product

## Users

Engineers building operations consoles and admin tools with React and shadcn, anywhere: Eridanus is meant to be public and open source. They install items with the shadcn CLI and assemble screens from them: an app shell, list pages with search, filters, tables and pagination, detail pages, settings forms and confirmations. The people who then use those consoles are operators watching runs, queues and jobs, often for long stretches, switching between scanning a table and acting on one row.

## Product Purpose

Eridanus is a shadcn registry of components, hooks and design tokens on Base UI that gives an operations console a finished, coherent look and the behaviour such consoles keep needing: readable times with the exact value on hover, status that never relies on colour alone, row selection across pages, filters kept in the URL, bilingual text (Chinese and English). Success is a team going from `init` to a believable console screen in an afternoon, with every control, gap and corner already agreeing with every other.

## Brand Personality

Soft, precise, calm. Every control is a pill and corners are rounded, but alignment, insets and spacing are exact and measured, not approximate. Colour is quiet: neutrals carry the interface and colour appears only where it means something (status, a destructive action). Copy is short and specific. The interface should feel settled and trustworthy over long sessions, never busy.

## Anti-references

- Stock shadcn: an untouched shadcn install with nothing of its own. Eridanus starts from shadcn but must be recognisably itself.
- Dark-by-default developer tools: neon accents on black, terminal cosplay, glow. Both themes are first-class; neither is the default identity.

## Design Principles

- Precision makes softness credible: round shapes only feel calm when every inset, gap and optical centre is deliberate and consistent across components.
- Quiet by default, colour with meaning: neutrals for structure, colour reserved for state and consequence.
- One system, not a kit: a control, its label, its menu and its container agree on height, radius and inset everywhere.
- Encode the console's rules in components, so teams get correct behaviour (times, status, selection, empty and error states) without re-deciding it.
- Practice what you ship: the docs site uses the components it documents, in both languages and both themes.

## Accessibility & Inclusion

WCAG 2.2 AA in both light and dark themes: 4.5:1 for text (including status text on its tint), 3:1 for focus indicators (fields are marked by a soft fill and their label rather than a 3:1 border, a deliberate choice for the calm look), full keyboard operation, correct roles and names for screen readers, and reduced-motion alternatives for every animation. Status never relies on colour alone.

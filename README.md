# Proving grounds for StyleX PoCs and validations

The purpose of this repo is to find out how to properly chain up the tooling to integrate the marvelously wonderful
StyleX into our technology stack.

## Stack

Target is to enable multiple apps to utilise multiple packages via configuration and modularity.

- `pnpm` for workspace package and app management
- `Astro` for meta platform
- `React` for client side logic
- `StyleX` for styles

## Problemskis

- [x] How to omit compilation in `packages` and leave it upp to the consuming end (`apps`)
- [ ] How to chain up external StyleX packages into the `packages` and `apps`. E.g. how to include the `@stylexjs/open-props` package and use the vars defined in it without making the compilation go BOOM
- [ ] How to release a StyleX compilation compatible Design System implementation that will expose the raw StyleX for the pleasure of the consuming app

# SvelteKit + Effect integraton

This is a simple example of how to integrate [Effect](https://effect.dev) with [SvelteKit](https://kit.svelte.dev).

It allows to run Effects easily on your SvelteKit server.

## How it works

The repo provides two main functions to run Effects server-side:

- `runLoader` runs an Effect on SvelteKit load functions and maps the result/error to a SvelteKit loader response
- `runAction` runs an Effect on SvelteKit form action and maps the result/error to a SvelteKit action response

## How to use

1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`

## Packages

- [SvelteKit](https://kit.svelte.dev)
- [Effect](https://effect.dev)
- [SvelteKit Superforms](https://superforms.rocks/)
- [SvelteKit Flash Message](https://github.com/ciscoheat/sveltekit-flash-message)
- [Shadcn Svelte](https://www.shadcn-svelte.com/)

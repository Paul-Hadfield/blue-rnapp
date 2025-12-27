# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Quick commands

### Install
- `npm install`

### Run the app (Expo)
- `npm run start` — start Expo dev server
- `npm run ios` — start and open iOS simulator
- `npm run android` — start and open Android emulator/device
- `npm run web` — start web build/dev server

### Typecheck
There is no dedicated script; run TypeScript directly:
- `npx tsc --noEmit`

### Tests / lint
This repo currently does not include a test runner or lint config/scripts in `package.json`.

## Codebase architecture (big picture)

### Runtime entrypoint
- `index.ts` is the JS entrypoint (`package.json#main`). It imports `App` and calls `registerRootComponent(App)` from Expo.
- `App.tsx` is the root React component rendered by the app.

### Configuration
- `app.json` contains the Expo app configuration (name/slug/version, icons/splash, platform-specific settings).
- `tsconfig.json` extends Expo’s base TypeScript config (`expo/tsconfig.base`) and enables `strict` mode.

### Assets
- `assets/` contains images referenced by `app.json` (icons, splash, favicon).

### Native projects
- `ios/` and `android/` are gitignored in `.gitignore`, so this repo is currently set up to run via Expo without committed native projects.
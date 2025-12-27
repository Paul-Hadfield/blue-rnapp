# claude.md

This file provides context to Claude Code when working with this repository.

## Project Overview

This is a Bluesky app built with Expo and React Native. It's currently in early development with a basic Expo starter setup.

## Tech Stack

- **Framework**: Expo ~54.0.30
- **React**: 19.1.0
- **React Native**: 0.81.5
- **Language**: TypeScript 5.9.2
- **Platform**: iOS, Android, Web (via Expo)

## Project Structure

```
bluesky-app/
├── index.ts              # Entry point, registers root component
├── App.tsx               # Root React component
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript config (extends expo/tsconfig.base, strict mode)
├── assets/               # Images (icons, splash screens, favicon)
└── node_modules/         # Dependencies (gitignored native projects)
```

## Common Commands

### Development
- `npm start` - Start Expo dev server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

### Type Checking
- `npx tsc --noEmit` - Run TypeScript type checker

### Installation
- `npm install` - Install dependencies

## Configuration Notes

- **Expo New Architecture**: Enabled (`newArchEnabled: true` in app.json)
- **Android Edge-to-Edge**: Enabled
- **Android Predictive Back**: Disabled
- **iOS**: Supports tablet
- **UI Style**: Light mode

## Development Status

Currently a fresh Expo project with default starter code. The app shows a basic "Open up App.tsx to start working on your app!" message.

## Native Projects

The `ios/` and `android/` directories are gitignored. This project runs via Expo without committed native code.

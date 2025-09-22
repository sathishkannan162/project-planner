# Mobile Project Planner

## Overview
The Expo React Native mobile application for project planning, located in `apps/mobile-project-planner/`. It provides a cross-platform mobile interface integrated with the monorepo's API.

## Setup
- **Framework**: Expo SDK ~54.0.9
- **React Native**: 0.81.4
- **React**: 19.1.0
- **To run**: `pnpm --filter mobile-project-planner start` (supports android, ios, web)

## Project Structure
```
apps/mobile-project-planner/
├── package.json
├── app.json
├── App.js          # Main app entry point
├── index.js        # JS entry point
└── assets/         # App icons and splash screens
```

## Integration Notes
- Use tRPC client for API calls to `apps/api`.
- Consider NativeWind for Tailwind CSS styling compatibility.
- Wrap app with necessary providers (e.g., QueryClient for React Query).

## Preferences

- Use functional components with hooks for state management.
- Leverage Expo modules and APIs for native features (e.g., navigation with Expo Router).
- Use React Native UI libraries like React Native Paper or Tamagui if needed; avoid heavy web-specific components like shadcn/ui.
- Focus on offline-first capabilities where possible, syncing with the API.
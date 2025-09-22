# Project Planner Memory Bank

This document serves as a reference for LLMs working on the project-planner codebase, listing the key technologies, frameworks, libraries, and tools used in the project.

## Project Overview
- **Type**: Monorepo web and mobile application
- **Main App**: Next.js React application for project planning
- **Mobile App**: Expo React Native application for project planning
- **Architecture**: Turborepo monorepo with shared packages

## Frameworks & Libraries
- **Frontend Framework**: React 19.0.0
- **Web Framework**: Next.js 15.2.1 (with Turbopack for development)
- **Mobile Framework**: Expo SDK 54.0.9
- **React Native**: 0.81.4
- **Styling**: Tailwind CSS 4.1.3

## UI Components & Design System
- **Component Library**: shadcn/ui (New York style)
- **Base Components**: Radix UI primitives (@radix-ui/react-slot 1.1.2)
- **Icons**: Lucide React 0.487.0

## Build System & Tooling
- **Monorepo Tool**: Turborepo 2.4.4
- **Linting/Formatting**: Biome 1.9.4 (extends ultracite config)

## Package Management
- **Package Manager**: pnpm 9.0.0
- **Workspace Configuration**: pnpm-workspace.yaml


## Project Structure
- **Root**: Monorepo root with shared configs
- **Apps**: Next.js application in `apps/project-planner/` and Expo app in `apps/mobile-project-planner/`
- **Packages**:
  - `@repo/ui`: Shared UI components
  - `@repo/typescript-config`: Shared TypeScript configurations
  - `repo/api` - api built with express.

### App Locations
- `project-planner`: `apps/project-planner/`
- `mobile-project-planner`: `apps/mobile-project-planner/`

### Package Locations
- `@repo/typescript-config`: `packages/typescript-config/`
- `@repo/ui`: `packages/ui/`

## Key Dependencies Summary
- React ecosystem: React 19, Next.js 15, TypeScript
- Mobile: Expo 54, React Native 0.81
- Styling: Tailwind CSS 4, PostCSS, shadcn/ui
- Build: Turborepo, pnpm
- Quality: Biome (with ultracite), TypeScript strict mode
- Icons: Lucide React
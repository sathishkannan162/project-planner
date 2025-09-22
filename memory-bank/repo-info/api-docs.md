# Express API with tRPC Documentation

## Overview
The Express API app is located in `apps/api/` and provides a backend for the project-planner monorepo. It uses Express.js for the server foundation and integrates tRPC for type-safe API procedures. This setup allows for RESTful routes alongside tRPC endpoints.

## Setup
- **Framework**: Express.js ^5.1.0
- **RPC Framework**: tRPC ^10.45.2
- **Validation**: Zod ^3.23.8
- **Language**: TypeScript 5.8.2
- **Build Tool**: Turborepo 2.4.4
- **Package Manager**: pnpm 9.0.0
- **Development**: tsx ^4.20.5 for hot reloading

To run:
- Development: `pnpm --filter @repo/api dev` (starts on port 3001)
- Build: `pnpm --filter @repo/api build`
- Start: `pnpm --filter @repo/api start`

## Project Structure
```
apps/api/
├── package.json
├── tsconfig.json
└── src/
    ├── server.ts          # Main Express server with tRPC integration
    └── trpc/
        └── router.ts      # tRPC app router and procedures
```

## Endpoints

### RESTful Routes
- **GET /**: Returns a welcome message JSON `{ message: 'Welcome to the Project Planner API' }`.

### tRPC Endpoints
tRPC procedures are mounted at `/trpc`. Use tRPC client to query/mutate.

#### Example Procedure: `hello`
- **Path**: `/trpc/hello`
- **Method**: Query (GET/POST via tRPC)
- **Input**: `{ name: string }`
- **Output**: `string` (e.g., "Hello, World!")
- **Usage**: Query with input `{ name: "World" }` to get "Hello, World!".

Future procedures can be added to the router in `src/trpc/router.ts`.

## Integration Notes
- tRPC uses the Express adapter for seamless integration.
- All procedures are type-safe with Zod validation.
- Shared TypeScript config from `@repo/typescript-config`.
- For client-side integration (e.g., in Next.js app), install `@trpc/client`, `@trpc/react-query`, `@trpc/server` (for types), and `@tanstack/react-query` in the consuming package.
- Create a tRPC client in `lib/trpc.ts` using `createTRPCReact` and `httpBatchLink` pointing to `http://localhost:3001/trpc`.
- Wrap the app in `layout.tsx` with `TRPCReactProvider` and `QueryClientProvider`.
- Use path mapping in `tsconfig.json` for importing types: `"api/*": ["../../apps/api/src/*"]`.
- Example client usage: Import `api` from `lib/trpc` and use `api.hello.useQuery({ name: 'World' })`.
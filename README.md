# ADDIS-EAT

A modern food delivery platform built with React, Vite, TypeScript, Tailwind CSS, Zustand, and React Router.

## Features

- JWT-based authentication with mock backend
- Role-based access for customers and restaurants
- Responsive UI with restaurant browsing, cart, checkout, and order history
- Restaurant dashboard with analytics, order management, and menu control
- Mock data for restaurants, menus, and orders

## Project Structure

- `client/` - React application source
  - `src/pages/` - page views
  - `src/components/` - shared UI components
  - `src/stores/` - Zustand state management
  - `src/lib/` - utilities and mock data
- `server/` - backend entry point
- `package.json` - scripts and dependencies
- `tsconfig.json` - TypeScript configuration

## Setup

```bash
cd c:\Users\AMI\OneDrive\Documents\GitHub\business-redesign-samuelfetene26-commits
pnpm install
pnpm dev
```

Open `http://localhost:3000` after the dev server starts.

## Available Scripts

- `pnpm dev` - run the Vite development server
- `pnpm build` - build the client and bundle `server/index.ts`
- `pnpm start` - run the production build
- `pnpm preview` - preview the production build
- `pnpm check` - run TypeScript checks
- `pnpm format` - format project files with Prettier

## Notes

- The project uses `pnpm` as the package manager.
- If `pnpm` is not installed, install it with `npm install -g pnpm`.
- Existing docs: `ADDIS_EAT_README.md`, `QUICK_START.md`, and `LOCAL_SETUP_GUIDE.md`.

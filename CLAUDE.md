# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

The project uses pnpm as the package manager. Key development commands:

- `pnpm dev` - Start development server with Turbopack for faster builds
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint to check code quality

## Tech Stack & Architecture

This is a Next.js 15 application using the App Router architecture with the following key technologies:

- **Next.js 15** with App Router (`src/app/` directory structure)
- **React 19** with TypeScript
- **Tailwind CSS v4** for styling with PostCSS
- **ESLint** with Next.js and TypeScript configurations
- **Turbopack** for fast development builds

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles and Tailwind imports
- `public/` - Static assets (SVG icons and images)
- Configuration files:
  - `tsconfig.json` - TypeScript config with `@/*` path mapping to `src/*`
  - `eslint.config.mjs` - ESLint configuration extending Next.js rules
  - `next.config.ts` - Next.js configuration (currently minimal)
  - `postcss.config.mjs` - PostCSS configuration for Tailwind

## Key Development Notes

- The application uses Geist fonts (both sans and mono variants) loaded via `next/font/google`
- TypeScript is configured with strict mode and path aliases (`@/*` maps to `src/*`)
- ESLint extends `next/core-web-vitals` and `next/typescript` configurations
- Uses Tailwind CSS v4 with PostCSS for styling
- Development server runs on port 3000 by default
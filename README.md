# Full Stack AI Splitwise Clone with Next JS, Convex, Tailwind, Inngest, Shadcn UI Tutorial 🔥🔥



# SplitSetGO – Smart Bill Splitting

Modern, free bill‑splitting for friends and groups. Built with Next.js App Router, Convex, Clerk, Tailwind, shadcn/ui, and Inngest.

## Features
- Equal / percentage / exact splits
- Groups with invite links and roles
- Dashboard analytics and charts
- Email reminders via Inngest (mock)
- Receipt OCR (mock API) to pre‑fill expenses
- Dark/light theme toggle

## Getting Started
1. Install deps: `npm i`
2. Configure environment variables (Clerk, Convex, RESEND)
3. Run dev: `npm run dev`

## Architecture
- Next.js for UI and routes
- Convex for data and server functions
- Inngest for workflows
- shadcn/ui + Tailwind for polished UI

## Deploy
Deploy on Vercel. Provide env vars in the project settings.

## Tests
Run UI tests:
```
npm run test
```

## Diagram
High-level architecture:
```
User → Next.js (App Router) → Convex (queries/mutations)
           ↘ Inngest (workflows) → Email provider
```

### Make sure to create a `.env` file with following variables -

```
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=

NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

CLERK_JWT_ISSUER_DOMAIN=

RESEND_API_KEY=

GEMINI_API_KEY=
```

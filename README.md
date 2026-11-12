# DARKNET ACADEMY

A front-end educational cybersecurity platform built with React, TypeScript and Tailwind CSS. Dark, neon, editorial UI with field notes, free courses, a reference library and a local demo community.

> **Demo project.** Everything runs in the browser. Accounts, certificates, community posts and progress are local demo data. This project is not affiliated with Apple or any accreditation body, and it does not issue real credentials.

## Features

- **FYP field notes** — 12 long-form topics with categories, levels, reading time, search, filters, favorites and reading progress. Notes are marked finished after you scroll through them or press the finish button.
- **Courses** — 6 free courses with lessons, quizzes, enrollment and locally persisted progress. The catalog is open to browse; lessons unlock after creating a free demo profile. Deep links are gated too, and sign-in returns you to the course you tried to open.
- **Cyber Library** — glossaries, cheat sheets, field guides and research digests.
- **Community** — demo posts, replies, likes, event reminders and category filters. Posts you create stay in your browser.
- **Apple-style demo authentication** — a clearly labeled local simulation of a minimalist Apple ID flow. No real Apple request is made and the password is never stored.
- **Profile** — editable demo profile, enrolled courses, favorites, achievements, activity and sign out.
- **Licenses & certificates** — four fictional, watermarked `DEMO — NOT OFFICIAL` documents with a certificate viewer and demo download.
- **Site-wide search** — `Ctrl/Cmd + K`, keyboard navigation and results across field notes, courses and the library.
- **Language switcher** — English and Russian interface labels. Learning content remains in English.
- **Notifications, FAQ accordion, contact form** — fully interactive, validated locally, no backend required.
- **Responsive layout** — desktop, tablet and mobile navigation.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS 3
- React Router 6
- Framer Motion
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

### Demo sign-in

1. Choose **Continue with Apple** on the register or login page.
2. Enter any test email and a password of at least 8 characters. Do not use a real Apple ID password.
3. Use the demo verification code `123456` (or press **Use demo code**).
4. Accept the demo consent notice.

No credentials leave the browser and the password is discarded after the demo flow.

## Local data

Demo state is stored under the `darknet-academy:v1` key in `localStorage`. To reset everything, clear that key or use the reset action in the profile area. Nothing is sent to a server.

## Project structure

```
src/
  components/
    auth/        Apple-styled demo auth screens
    community/   Post cards and community UI
    courses/     Course covers and lesson quizzes
    layout/      Header, footer, notifications, mobile drawer
    ui/          Buttons, badges, accordion, modal, progress, etc.
  context/       AppContext: auth, favorites, progress, posts, toasts
  data/          Static educational content and demo records
  lib/           Types, i18n, storage and utility helpers
  pages/         Route-level pages
```

## Educational and ethical scope

All offensive-security material is introductory and framed around consent, scope and lawful practice. The platform is a portfolio demonstration, not a certification program, and must not be presented as an official accreditation or licensing authority.

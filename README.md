# ContiClub Frontend

React admin dashboard for the ContiClub tire loyalty program. Built on
[Material Dashboard Pro React](https://www.creative-tim.com/product/material-dashboard-pro-react)
(Material-UI v3). This SPA talks to the
[ContiClub API](https://github.com/miguelcamargo9/conticlubphp) backend.

**Production:** [https://conticlub.co](https://conticlub.co)
**API:** `https://server.conticlub.co`

---

## Stack

| Layer       | Version                                              |
|-------------|------------------------------------------------------|
| Runtime     | **Node.js 10** (required — do not upgrade casually)  |
| Framework   | React 16.x (CRA / `react-scripts` 2.1.5)            |
| UI Library  | Material-UI v3 (`@material-ui/core`)                 |
| State       | Redux + `redux-thunk` + `redux-react-session`        |
| Styles      | JSS (`withStyles`) + SCSS (`node-sass` 4.14.1)       |
| HTTP        | Axios                                                |
| Lint        | ESLint (`eslint:recommended` + Prettier + React)     |

---

## Quickstart

```bash
# 1. Clone and enter the project
git clone <repo-url> conticlub && cd conticlub

# 2. Use Node.js 10 (nvm recommended)
nvm use 10

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env
# Edit .env with your values (see Environment section)

# 5. Start development server
npm start
```

The app runs at **http://localhost:3000** and proxies API calls to the backend.

---

## Commands

```bash
npm start              # dev server (react-scripts start)
npm run build          # production build → build/
npm test               # jest in jsdom (CRA test runner)
npm run lint:check     # eslint . --ext=js,jsx
npm run lint:fix       # eslint --fix
npm run compile-sass   # build main CSS from src/assets/scss
```

---

## Environment

Create a `.env` file in the project root:

```
NODE_PATH=./src
GENERATE_SOURCEMAP=false

# API CLIENT (OAuth2 credentials for the backend)
REACT_APP_CLIENT_ID=...
REACT_APP_CLIENT_SECRET=...
REACT_APP_CLIENT_GRANT_TYPE=...

AUTH=...
```

| Variable                      | Purpose                                                        |
|-------------------------------|----------------------------------------------------------------|
| `NODE_PATH=./src`             | Enables absolute imports (e.g. `import Sidebar from "components/Sidebar/Sidebar.jsx"`) |
| `GENERATE_SOURCEMAP`          | Disable source maps in production builds                       |
| `REACT_APP_CLIENT_ID`         | OAuth2 client ID for backend authentication                    |
| `REACT_APP_CLIENT_SECRET`     | OAuth2 client secret                                           |
| `REACT_APP_CLIENT_GRANT_TYPE` | OAuth2 grant type                                              |

---

## Project Structure

```
src/
├── actions/          ← Redux action creators (thunks)
├── assets/
│   ├── img/          ← static images
│   ├── jss/          ← JSS style objects (per-component)
│   └── scss/         ← global SCSS (Material Dashboard theme)
├── components/       ← reusable UI components (Sidebar, Navbar, Card, CustomUpload, etc.)
├── constants/        ← server URL, profile names, shared constants
├── layouts/          ← Auth.jsx, Admin.jsx, RTL.jsx (top-level shells)
├── reducers/         ← Redux reducers
├── routes/           ← route arrays per user profile (admin, sell, default, general)
├── services/         ← Axios wrappers per resource (invoiceService, userService, etc.)
├── store/            ← Redux store configuration
└── views/            ← pages organized by feature
    ├── Admin/        ← CRUD pages (Brands, Cities, Tires, Products, etc.)
    ├── Forms/        ← create/edit forms (Sales, Users)
    ├── Home/         ← dashboard home
    ├── Lists/        ← list views (Invoices, Users, Products)
    └── Pages/        ← auth pages (Login, Logout, Recovery)
```

---

## Architecture

### Authentication
Login via `POST /api/login` with OAuth2 credentials. Session stored in IndexedDB
via `redux-react-session`. `Admin.jsx` guards all `/admin/*` routes — redirects to
`/auth/logout-page` if no valid session.

### Profile-Based Routing
Navigation is dynamic based on `user.profiles_id`:

| profiles_id | Role       | Route set     |
|-------------|------------|---------------|
| 1           | Admin      | `adminRoutes` (full access) |
| 4           | Aprobador  | `sellRoutes`  |
| 5           | Comprador  | `sellRoutes`  |
| other       | General    | `defaultRoutes` |

### State Management
Redux with `redux-thunk`. Actions dispatch to feature reducers. Session state managed
exclusively through `sessionService` (do not write to the `session` reducer directly).
`localSession` reducer holds transient UI state like updated points balance.

### Services
`src/services/*.js` are thin Axios wrappers. Each service reads the bearer token from
the session and calls the backend API. Errors are caught and logged — callers receive
`undefined` on failure.

---

## Deployment

```bash
# Build production bundle
npm run build

# The build/ directory contains the static files to deploy
# Currently deployed to AWS (conticlub.co)
```

---

## Conventions

- **File extensions:** `.jsx` for React components, `.js` for plain modules
- **Imports:** use absolute paths via `NODE_PATH` (e.g. `import X from "components/X/X.jsx"`)
- **Components:** class components (pre-hooks codebase — match existing style)
- **Lint:** `lint:check` exits 0 even on errors — read the output manually

---

## Further Reading

- [`CLAUDE.md`](./CLAUDE.md) — detailed architecture guide for AI-assisted development
- [ContiClub API (backend)](https://github.com/miguelcamargo9/conticlubphp) — Laravel backend repo

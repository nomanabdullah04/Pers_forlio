# Portfolio Website

This repository contains a personal portfolio website and a related Nexus platform project.

## Contents

- `index.html` — main static portfolio site (root)
- `css/`, `js/`, `assets/` — frontend assets for the portfolio
- `nexus_platform/` — Vite + React frontend and Django backend for the Nexus platform
  - `nexus_platform/public` and `nexus_platform/src` — React app
  - `nexus_platform/backend` — Django backend (`manage.py`, `requirements.txt`)
- `portal/` — built/frontend bundle for a portal (prebuilt assets)

## Quick start

### Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Python 3.8+
- pip

### Run the portfolio (static)

Open `index.html` in a browser, or serve the folder with a simple server:

```bash
# using npm's http-server (no install required via npx)
npx http-server -c-1 .
```

### Run the Nexus platform frontend

```bash
cd nexus_platform
npm install
npm run dev
```

### Run the Nexus platform backend (Django)

```bash
cd nexus_platform/backend
python -m venv .venv
# Activate the venv (PowerShell)
.\.venv\\Scripts\\Activate.ps1
# Or Windows cmd
.\.venv\\Scripts\\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Project notes

- The React app lives in `nexus_platform/src` and uses Vite.
- The Django backend is in `nexus_platform/backend` and exposes API endpoints consumed by the frontend.
- See `nexus_platform/README.md` (if present) for platform-specific docs.

## Contributing

- Open an issue or PR for changes. Keep frontend and backend changes separated and include run instructions.

## License

- Add a license file if you want to set a license for this project.

## Contact

- For questions, update this README or add a CONTRIBUTING.md with preferred contact details.

# 07. Setup, Testing & Deployment Guide

This guide explains how to install, configure, test, and run FoodBridgeAI locally and in production.

---

## 1. Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Optional! If a local MongoDB instance is not detected, the application automatically launches an in-memory database (`mongodb-memory-server`) with zero manual setup.

---

## 2. Installation

Clone the repository and install dependencies:

```bash
# Clone the repository
git clone https://github.com/mrnitinpandey/Garuda-Foodbridge-Ai-.git
cd Garuda-Foodbridge-Ai-

# Install root orchestrator dependencies
npm install

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Return to root
cd ..
```

---

## 3. Environment Configuration

Copy the example environment configuration:

```bash
# In the root directory:
cp .env.example .env
```

Default configuration variables (`.env`):
```ini
PORT=5000
NODE_ENV=development
# Leave as memory or point to your MongoDB Atlas / local URI:
MONGODB_URI=memory
JWT_SECRET=super_secret_foodbridge_jwt_key_2026_dev
CLIENT_URL=http://localhost:5173
```

---

## 4. Running the Application

### Development Mode (Both Frontend & Backend concurrently)
```bash
npm run dev
```
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

### Run Components Individually
```bash
# Start backend server only
npm run dev:server

# Start frontend Vite client only
npm run dev:client
```

---

## 5. Automated Testing

Run the automated backend unit test suite:
```bash
npm test
```
Or directly in the server directory:
```bash
cd server
npm test
```

### Verified Test Cases
```
✔ Haversine distance calculation is accurate within geographic bounds
✔ Eligibility check excludes unverified NGOs
✔ Eligibility check excludes NGOs when food category is not supported
✔ Eligibility check fails if deadline is expired
✔ Component scoring correctly weights urgency, quantity, travel, and demand
```

---

## 6. Building for Production

Build the production frontend bundle:
```bash
npm run build
```
The optimized bundle is placed in `client/dist/`.

---

## 7. Demo Accounts & Credentials

The platform includes pre-configured demo users across all roles (password for all accounts: `password123`):

| Role | Email | Purpose / View |
| :--- | :--- | :--- |
| **Donor** (College Canteen) | `canteen@college.edu` | Quick-post meals, view AI matches, track active rescues (`/donor`). |
| **Verified NGO** (Annapurna) | `annapurna@ngo.org` | High-capacity food bank, accept rescues (`/ngo`). |
| **Verified NGO** (Hope Home) | `hope@ngo.org` | Medium-capacity shelter (`/ngo`). |
| **Pending NGO** (Seva Center) | `seva@ngo.org` | Showcase safety exclusion in AI matching engine. |
| **Volunteer Driver** | `volunteer@foodbridge.org` | Route navigation, confirm pickup & delivery. |
| **Platform Administrator** | `admin@foodbridge.org` | Manage accreditation, seed demo data, export CSV report (`/admin`). |


# 02. System Architecture & Tech Stack

## 1. System Architecture Diagram

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|   React 18  •  Vite  •  Tailwind CSS  •  Leaflet Maps  •  Lucide Icons  |
|                                                                         |
|  +--------------------+  +--------------------+  +-------------------+  |
|  |  Donor Dashboard   |  |   NGO Dashboard    |  |  Admin Dashboard  |  |
|  | - Quick Post       |  | - Matches Intake   |  | - Add NGO Modal   |  |
|  | - Live Matches     |  | - Route Navigation |  | - CSV Export      |  |
|  | - Impact Metrics   |  | - Delivery Proof   |  | - Seed Database   |  |
|  +--------------------+  +--------------------+  +-------------------+  |
+------------------------------------+------------------------------------+
                                     |  REST API & Socket.IO WebSockets
+------------------------------------v------------------------------------+
|                             BACKEND API                                 |
|           Node.js  •  Express.js  •  JWT Auth  •  Morgan / Helmet       |
|                                                                         |
|  +---------------------+  +--------------------+  +------------------+  |
|  | Matching Engine     |  | Route & OSRM       |  | Rescue Lifecycle |  |
|  | - Eligibility Check |  | - Road Distance    |  | - State Machine  |  |
|  | - 4-Factor Scoring  |  | - Duration Est.    |  | - Impact Compute |  |
|  +---------------------+  +--------------------+  +------------------+  |
+------------------------------------+------------------------------------+
                                     |  Mongoose ODM
+------------------------------------v------------------------------------+
|                            DATABASE LAYER                               |
|   MongoDB / MongoMemoryServer (Zero-setup in-memory automatic fallback) |
|   Collections: Users, DonorProfiles, NGOProfiles, Donations, Rescues,   |
|                Matches, ImpactRecords, AuditLogs                        |
+-------------------------------------------------------------------------+
```

---

## 2. Technology Stack Details

### Frontend
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS (with custom forest-green `#0B3B24` and emerald styling)
- **Routing**: React Router DOM v6 with role-based `ProtectedRoute` guards
- **Mapping**: Leaflet & React-Leaflet with custom map pins and route lines
- **Data Visualization**: Recharts for impact breakdowns and portions analytics
- **Icons**: Lucide React
- **Network / Sockets**: Axios HTTP Client, Socket.IO Client

### Backend
- **Runtime**: Node.js (ES Modules, `type: "module"`)
- **Server Framework**: Express.js
- **Database Engine**: Mongoose with MongoDB
- **Zero-Setup Memory DB**: `mongodb-memory-server` ensuring full out-of-the-box local execution even without a pre-installed MongoDB daemon
- **Authentication**: JSON Web Tokens (JWT) & `bcryptjs` password hashing
- **Security & Logging**: Helmet, CORS, Morgan request logger, rate limiting
- **Real-Time Layer**: Socket.IO server emitting event rooms (`donor_<id>`, `ngo_<id>`)

---

## 3. Directory Structure

```
UDAYAM/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets & backgrounds
│   └── src/
│       ├── components/         # Reusable widgets (Navbar, RouteMap, ScoreBreakdownCard)
│       ├── context/            # AuthContext (Role authentication & token persistence)
│       ├── layouts/            # DashboardLayout (Sidebar, navigation, user profile)
│       ├── pages/              # Donor, NGO, Admin, Auth, Landing pages
│       └── services/           # Axios API instance & Socket.IO connection
├── server/                     # Backend Application
│   ├── seed/                   # Deterministic database seeding script (seed.js)
│   ├── src/
│   │   ├── config/             # DB connection with auto-memory fallback
│   │   ├── controllers/        # Business logic for auth, donations, matching, rescues, admin
│   │   ├── middleware/         # Auth verification & role-based authorization
│   │   ├── models/             # Mongoose database models
│   │   ├── routes/             # RESTful endpoints
│   │   ├── services/           # Matching algorithm, rescue workflow, OSRM routing
│   │   └── sockets/            # Socket.IO WebSocket handlers
│   └── tests/                  # Automated unit test suite
├── Document/                   # Complete Project Documentation
├── docs/                       # Architecture diagrams & design artifacts
├── .env.example                # Sample environment configuration
└── package.json                # Monorepo task runner
```


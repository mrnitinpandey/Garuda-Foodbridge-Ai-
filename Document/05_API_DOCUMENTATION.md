# 05. API Reference & Endpoints

All endpoints are prefixed with `/api`. Protected routes require a Bearer token in the `Authorization` header (`Authorization: Bearer <JWT>`).

---

## 1. Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new user (`DONOR`, `NGO`, `VOLUNTEER`). |
| `POST` | `/api/auth/login` | Public | Authenticate with email/password; returns JWT and user profile. |
| `GET` | `/api/auth/me` | Protected | Fetch current logged-in user details. |

---

## 2. Donation Routes (`/api/donations`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/donations` | Donor, Admin | Create a new surplus food donation. |
| `GET` | `/api/donations` | Protected | List donations (filtered by donor or available listings). |
| `GET` | `/api/donations/:id` | Protected | Retrieve full donation details by ID. |
| `PATCH`| `/api/donations/:id/cancel`| Donor, Admin | Cancel a donation before it has been picked up. |

---

## 3. Matching Routes (`/api/matches`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/matches/find/:donationId` | Donor, Admin | Run AI matching engine on a specific donation. |
| `GET` | `/api/matches/donation/:donationId`| Protected | View proposed matches and score breakdowns. |
| `POST` | `/api/matches/:id/accept` | NGO, Admin | Accept match proposal and automatically spawn a Rescue mission. |
| `POST` | `/api/matches/:id/decline` | NGO, Admin | Decline match with reason. |

---

## 4. NGO Routes (`/api/ngos`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/ngos/profile` | NGO, Admin | Retrieve NGO organization profile and capabilities. |
| `PUT` | `/api/ngos/profile` | NGO, Admin | Update capacity, demand, and storage capabilities. |
| `GET` | `/api/ngos/matches` | NGO, Admin | List active match proposals awaiting NGO acceptance. |
| `GET` | `/api/ngos/nearby` | Protected | Discover nearby verified NGOs for map view. |

---

## 5. Rescue Mission Routes (`/api/rescues`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/rescues` | Protected | List active or historical rescue missions. |
| `GET` | `/api/rescues/:id` | Protected | Get rescue details, route geometry, and status. |
| `PATCH`| `/api/rescues/:id/pickup` | Volunteer, NGO | Confirm food handover at donor location. |
| `PATCH`| `/api/rescues/:id/deliver`| Volunteer, NGO | Confirm safe delivery at NGO shelter with notes. |

---

## 6. Analytics & Impact (`/api/analytics`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/analytics/impact` | Protected | Aggregated meals delivered, kg waste avoided, and $CO_2$ averted. |

---

## 7. Platform Governance & Admin (`/api/admin`)

*All admin endpoints require `role: 'ADMIN'`.*

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/admin/overview` | Platform-wide metrics (pending verifications, completed rescues, active users). |
| `GET` | `/api/admin/verifications` | List all NGO applicants with documents and accreditation status. |
| `PATCH`| `/api/admin/ngos/:id/verify` | Approve (`VERIFIED`), reject (`REJECTED`), or suspend an NGO. |
| `POST` | `/api/admin/ngos` | Directly onboard a new authorized NGO partner. |
| `GET` | `/api/admin/users` | List all registered platform users. |
| `GET` | `/api/admin/audit-logs` | Retrieve recent immutable system audit trails. |
| `POST` | `/api/admin/seed` | Trigger live database seeding with demo donations and NGOs. |
| `GET` | `/api/admin/export-csv` | Download complete platform report in RFC-compliant CSV format (`?type=all`). |


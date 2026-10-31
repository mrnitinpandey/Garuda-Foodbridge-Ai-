# 06. Admin Operations & Governance

The platform provides a dedicated governance center for platform administrators accessible at the `/admin` route.

---

## 1. Overview & Capabilities

The **Admin Dashboard** provides administrative control over:
1. **Accreditation Queue**: Reviewing, approving, or rejecting new NGO applicants.
2. **Onboarding New NGO Partners**: Direct form to register trusted NGO organizations.
3. **Database Seeding**: 1-click seeding of realistic demo data for presentations or testing.
4. **CSV Exporting**: Comprehensive downloadable audit reports in `.csv` format.
5. **Immutable Audit Stream**: Live ledger recording all administrative decisions.

---

## 2. Onboarding an NGO Partner

Admins can onboard verified organizations directly without forcing them through public self-registration:
1. Click the **"+ Add New NGO Partner"** button in the top action bar.
2. Fill in the modal form:
   - **Organization Name** (e.g. *Annapurna Food Relief*)
   - **Contact Name** & **Official Email**
   - **Phone Number** & **Government Registration No.**
   - **Collection Capacity** (maximum meal portions transport can handle)
   - **Service Radius** (operational coverage in km)
   - **Address & City**
   - **Initial Status**: Select `VERIFIED` (immediately active) or `PENDING` (held for review).
3. Click **"Save & Onboard NGO"**. The backend securely hashes passwords via `bcryptjs`, creates both the user and NGO profile records, and logs the action to `AuditLog`.

---

## 3. 1-Click Database Seeding

To quickly prepare the application for a demonstration or reset demo records:
1. Click the **"Seed Demo Data"** button in the Admin Dashboard header.
2. Confirm the prompt.
3. The server populates:
   - **College Canteen Donor** (`canteen@college.edu`)
   - **3 Diverse NGOs** (High-capacity, medium-capacity, and pending)
   - **Volunteer Driver** (`volunteer@foodbridge.org`)
   - **Surplus Donation**: 100-portion freshly cooked meal
   - **Historical Rescues & Impact Data**: Meals delivered and $CO_2$ avoided metrics.

---

## 4. Downloading CSV Database Reports

To extract data for offline analysis, government compliance, or grant reporting:
1. Click the **"Download CSV Report"** button in the Admin Dashboard header.
2. The browser automatically downloads a file named:
   `FoodBridge_Report_all_YYYY-MM-DD.csv`
3. The report compiles:
   - All **Donations** (Titles, categories, portions, donor names, dates)
   - All **Rescue Missions** (Allocated portions, distances, statuses, proof notes)
   - All **NGO Partners** (Capacities, demands, contact emails, verification states)
   - All **Users** (Roles, active states, contact info)

---

## 5. Audit Trail & Compliance

Every status change (NGO approval, direct partner creation, database reseed) creates an immutable record in the `AuditLog` collection containing:
- **Actor ID & Role**
- **Action Type** (e.g. `NGO_VERIFICATION_VERIFIED`, `ADMIN_CREATE_NGO`)
- **Entity Type & Entity ID**
- **Previous & New State**
- **Timestamp** (UTC)


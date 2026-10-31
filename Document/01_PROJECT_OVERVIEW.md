# 01. Project Overview & Features

## 1. Executive Summary
**FoodBridgeAI** is a smart, explainable surplus food rescue platform connecting food donors (college canteens, restaurants, catering companies) with verified Non-Governmental Organizations (NGOs) and volunteer rescue dispatchers.

Every day, large educational institutions and catering services prepare food in bulk. When surplus occurs, standard disposal routes result in environmental degradation (methane release in landfills) and missed opportunities to nourish food-insecure populations. FoodBridgeAI solves this through:
1. **Explainable AI matching** ensuring food reaches the closest, most suitable NGO before its safety window expires.
2. **Transparent safety verifications** and cold-storage compatibility checks.
3. **Atomic reservation protection** to eliminate double-claim conflicts.
4. **Automated carbon and meal impact accounting**.

---

## 2. Platform Stakeholders

| Stakeholder | Role in Platform | Primary Capabilities |
| :--- | :--- | :--- |
| **Food Donor** | College canteens, catering services, corporate cafeterias | Quick-post surplus meals, specify dietary details, view ranked AI matches, track rescue status. |
| **NGO Partner** | Food banks, community shelters, orphanages | Receive instant alerts, review distance & portions, accept/decline matched rescues, log delivery confirmations. |
| **Volunteer Driver** | Community volunteers, delivery partners | Receive assigned pickup routing, view OSRM turn-by-turn road paths, mark food as picked up and delivered. |
| **Platform Administrator** | System governance & safety compliance | Verify/reject NGO registrations, add new NGO partners directly, seed realistic data, view immutable audit logs, download CSV reports. |

---

## 3. Core Features

### 🍱 Instant Donation Quick-Post
- Post surplus in under 60 seconds with food category, number of portions, preparation time, safe collection deadline, and dietary preferences.
- Pre-filled defaults optimized for institutional canteens (e.g. 100 portions, 45-minute collection window).

### 🤖 Explainable AI Match Engine
- Ranks candidate NGOs using a 4-component weighted model (Urgency, Quantity Fit, Road Distance, and Real-Time Demand).
- Excludes ineligible NGOs with clear natural-language rationale (e.g., lack of cold storage or unverified status).

### 🗺️ Road Route Optimization (Leaflet + OSRM)
- Computes real road network distances and travel times rather than straight-line approximations.
- Fallback to Haversine geographic calculation when external mapping networks are constrained.

### 🛡️ Food Safety & Cold Chain Protection
- Declares storage temperature, packaging integrity, and allergen flags.
- Real-time countdown clock monitoring safe pickup windows.

### 📊 Auditable Environmental Impact
- Calculates kilograms of food waste avoided using standard UNEP/FAO baselines (0.45 kg per meal portion).
- Computes averted greenhouse gas ($CO_2e$) emissions.

### 📑 Administrative Governance & CSV Data Export
- 1-click database seeding for demonstrations.
- Full CSV export of platform data (Donations, Rescues, NGOs, and Users) for offline audits and reporting.

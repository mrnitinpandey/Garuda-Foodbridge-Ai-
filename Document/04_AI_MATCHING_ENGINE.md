# 04. AI Matching Engine & Algorithms

The Food Rescue Intelligence Engine is implemented in [`server/src/services/matchingService.js`](../server/src/services/matchingService.js). It evaluates candidates using safety hard-constraints followed by a multi-factor weighted scoring algorithm.

---

## 1. Hard Eligibility Filters (Safety First)

Before any candidate NGO is scored, it must pass all mandatory safety constraints:

1. **Accreditation Verification**:
   The NGO's `verificationStatus` must be `VERIFIED`. `PENDING`, `REJECTED`, and `SUSPENDED` profiles are immediately excluded.
2. **Category Compatibility**:
   The donation's `foodCategory` must be listed in the NGO's `acceptedFoodCategories`.
3. **Shelf-Life & Transit Window Constraint**:
   The estimated road transit duration plus a mandatory buffer must be strictly less than the remaining collection deadline:
   $$\text{TravelMinutes} + \text{BufferMinutes} \le \text{MinutesUntilDeadline}$$
4. **Service Radius Limit**:
   The calculated distance between the donor and the NGO must be within the NGO's declared `serviceRadiusKm`.

---

## 2. Multi-Factor Scoring Formula

Every eligible NGO is evaluated on four normalized dimensions (0 to 100):

$$\text{FinalScore} = (0.35 \times S_{\text{urgency}}) + (0.25 \times S_{\text{quantity}}) + (0.25 \times S_{\text{travel}}) + (0.15 \times S_{\text{demand}})$$

### Factor Breakdown

#### 1. Urgency Score ($S_{\text{urgency}}$, Weight: 35%)
Prioritizes donations closer to their expiration deadline:
$$S_{\text{urgency}} = \max\left(0, \min\left(100, 100 - \left(\frac{\text{HoursRemaining}}{12} \times 100\right)\right)\right)$$
If a donation has only 1 hour remaining, urgency nears 100; if it has 12+ hours, urgency is lower.

#### 2. Quantity Fit Score ($S_{\text{quantity}}$, Weight: 25%)
Measures how closely the donation's portion size matches the NGO's single-trip intake capacity:
- Ideal fit: Capacity matches portions $\rightarrow 100$ points.
- Penalties are applied linearly if the quantity exceeds maximum capacity or is too small to justify transit.

#### 3. Travel Efficiency Score ($S_{\text{travel}}$, Weight: 25%)
Measures proximity to reduce transit degradation and delivery time:
$$S_{\text{travel}} = \max\left(0, 100 - \left(\frac{\text{DistanceInKm}}{25} \times 100\right)\right)$$
Closer NGOs receive significantly higher scores.

#### 4. Demand Fit Score ($S_{\text{demand}}$, Weight: 15%)
Evaluates the NGO's current unmet daily portion demand:
$$S_{\text{demand}} = \min\left(100, \left(\frac{\text{RemainingPortionDemand}}{\text{PortionsAvailable}}\right) \times 100\right)$$

---

## 3. Road Routing & Distance Calculation

Implemented in [`server/src/services/routeService.js`](../server/src/services/routeService.js):

- **Primary Route Engine**: OpenStreetMap / OSRM (Open Source Routing Machine). Computes real turn-by-turn road geometries, actual driving distance, and traffic-calibrated duration.
- **Geographic Fallback**: When OSRM is unreachable or throttled, the system computes the great-circle distance via the **Haversine formula**:
  $$d = 2R \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)}\right)$$
  (where $R = 6371\text{ km}$, $\Delta \phi$ is latitude difference, $\Delta \lambda$ is longitude difference).

---

## 4. Explainable AI (XAI) Output

The engine does not provide a black-box number. For every recommended candidate, it generates:
- An overall priority badge (`High`, `Optimal`, `Moderate`).
- An exact radar/bar breakdown of the 4 factor scores.
- A natural-language sentence explaining **why** this match is recommended (e.g., *"Matched 100 portions with Annapurna Food Bank due to immediate 120 portion demand, 4.2 km road proximity, and valid cold storage."*).

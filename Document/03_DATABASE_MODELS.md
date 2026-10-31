# 03. Database Schema & Data Models

FoodBridgeAI utilizes MongoDB with Mongoose ODM. Schemas enforce strict data types, relations, geospatial indexing, and validation constraints.

---

## 1. Primary Models Summary

```
   +-------------+           1:1           +------------------+
   |    User     | ----------------------> |   DonorProfile   |
   | (Auth/Role) |                         +------------------+
   +------+------+
          |
          | 1:1              1:N           +------------------+
          +------------------------------> |    NGOProfile    |
          |                                +------------------+
          | 1:1              1:N
          +------------------------------> | VolunteerProfile |
                                           +------------------+
                                                    |
   +-------------+           1:N                    |
   |  Donation   | <--------------------+           |
   +------+------+                      |           |
          |                             |           |
          | 1:N                         |           |
          v                             |           |
   +-------------+     creates     +----+----+      |
   |    Match    | --------------> |  Rescue | <----+
   +-------------+                 +----+----+
                                        | 1:1
                                        v
                                   +----+----+
                                   | Impact  |
                                   | Record  |
                                   +---------+
```

---

## 2. Model Specifications

### 1. `User` (`server/src/models/User.js`)
Stores authentication credentials and permissions.
- `name` (String, required): Full name or point of contact.
- `email` (String, required, unique, indexed): Login email.
- `passwordHash` (String, required, selected false by default): Hashed via bcrypt.
- `role` (String, enum: `['DONOR', 'NGO', 'VOLUNTEER', 'ADMIN']`).
- `phone` (String).
- `isActive` (Boolean, default: `true`).

### 2. `DonorProfile` (`server/src/models/DonorProfile.js`)
Profiles for canteens, banquets, and restaurants.
- `userId` (ObjectId, ref: `User`, unique).
- `organizationName` (String, required).
- `organizationType` (String, enum: `['COLLEGE_CANTEEN', 'RESTAURANT', 'CATERER', 'HOTEL', 'OTHER']`).
- `pickupLocation` (GeoJSON Point: `[longitude, latitude]`, 2dsphere indexed).
- `address` (Object: street, city, state, zipCode).
- `contactPerson` (Object: name, phone).

### 3. `NGOProfile` (`server/src/models/NGOProfile.js`)
Profiles for hunger relief organizations.
- `userId` (ObjectId, ref: `User`, unique).
- `organizationName` (String, required).
- `registrationNumber` (String).
- `verificationStatus` (String, enum: `['PENDING', 'VERIFIED', 'REJECTED', 'SUSPENDED']`).
- `serviceRadiusKm` (Number, default: 15).
- `mealDemand` (Number, daily target portions).
- `collectionCapacity` (Number, maximum intake capacity).
- `acceptedFoodCategories` (Array of Strings: `COOKED_MEALS`, `PACKAGED_FOOD`, `BAKERY_ITEMS`, etc.).
- `location` (GeoJSON Point, 2dsphere indexed).
- `foodHandlingCapabilities` (hasColdStorage, hasInsulatedBoxes, foodSafetyCertified).
- `transportCapabilities` (hasVehicle, vehicleType, maxLoadKg).

### 4. `Donation` (`server/src/models/Donation.js`)
Surplus food offerings.
- `donorId` (ObjectId, ref: `User`).
- `donorProfileId` (ObjectId, ref: `DonorProfile`).
- `title` (String, required).
- `foodCategory` (String, enum: `COOKED_MEALS`, `PACKAGED_FOOD`, `BAKERY_ITEMS`, etc.).
- `portionsAvailable` (Number, required).
- `portionsRemaining` (Number).
- `preparedAt` (Date).
- `collectionDeadline` (Date, required).
- `storageConditions` (String: `ROOM_TEMPERATURE`, `HEATED`, `REFRIGERATED`).
- `foodTemperatureCelsius` (Number).
- `status` (String, enum: `['AVAILABLE', 'MATCHED', 'RESERVED', 'PICKED_UP', 'DELIVERED', 'EXPIRED', 'CANCELLED']`).
- `pickupLocation` (GeoJSON Point, 2dsphere indexed).

### 5. `Match` (`server/src/models/Match.js`)
Explainable match suggestions between donations and NGOs.
- `donationId` (ObjectId, ref: `Donation`).
- `ngoId` (ObjectId, ref: `User`).
- `ngoProfileId` (ObjectId, ref: `NGOProfile`).
- `priorityScore` (Number, 0–100 score).
- `scoreBreakdown` (Object: urgencyScore, quantityFitScore, travelEfficiencyScore, demandFitScore).
- `estimatedTravelMinutes` (Number).
- `estimatedDistanceKm` (Number).
- `recommendationExplanation` (String, plain English explanation).
- `status` (String: `PROPOSED`, `ACCEPTED`, `DECLINED`, `EXPIRED`, `COMPLETED`).

### 6. `Rescue` (`server/src/models/Rescue.js`)
Operational rescue missions.
- `donationId`, `matchId`, `donorId`, `ngoId`, `volunteerId`.
- `status` (String: `ASSIGNED`, `PICKUP_CONFIRMED`, `PICKED_UP`, `IN_TRANSIT`, `DELIVERED`, `FAILED`).
- `pickupTime`, `deliveryTime`.
- `handoverNotes`, `deliveryProofNotes`.

### 7. `ImpactRecord` (`server/src/models/ImpactRecord.js`)
Auditable metrics of saved food and emissions.
- `rescueId`, `donationId`, `donorId`, `ngoId`.
- `mealsDelivered` (Number).
- `estimatedFoodWasteAvoidedKg` (Formula: meals * 0.45 kg).
- `co2EquivalentAvoidedKg` (Formula: kg avoided * 2.5 kg $CO_2e$).

### 8. `AuditLog` (`server/src/models/AuditLog.js`)
Immutable ledger for platform governance.
- `actorId` (ObjectId, ref: `User`).
- `actorRole` (String: `ADMIN`, `DONOR`, `NGO`, etc.).
- `action` (String: e.g. `NGO_VERIFICATION_VERIFIED`, `ADMIN_CREATE_NGO`, `ADMIN_RESEED_DATABASE`).
- `entityType` (String), `entityId` (ObjectId).
- `reason` (String).
- `timestamp` (Date, default `Date.now`).

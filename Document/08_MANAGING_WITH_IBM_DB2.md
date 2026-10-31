# Managing FoodBridgeAI Database with IBM Db2 Extension

This guide details how to connect, run, and manage the FoodBridgeAI relational database using the **IBM Db2 Developer Extension** in your IDE / VS Code.

---

## 1. Extension Details
- **Extension Name**: IBM Db2 Developer Extension (or IBM Db2 for z/OS / LUW)
- **Extension ID**: `ibm.db2forzosdeveloperextension` / `IBM.db2-for-luw`
- **Location in Project**: All SQL scripts and schema files are placed in [`db2/`](../db2/).

---

## 2. Included Database Scripts

| File | Purpose |
| :--- | :--- |
| **[`db2/01_schema.sql`](../db2/01_schema.sql)** | Complete DDL script creating all 8 relational tables (`USERS`, `DONOR_PROFILES`, `NGO_PROFILES`, `DONATIONS`, `MATCHES`, `RESCUES`, `IMPACT_RECORDS`, `AUDIT_LOGS`), foreign keys, check constraints, and performance indexes. |
| **[`db2/02_seed.sql`](../db2/02_seed.sql)** | Realistic initial seed dataset (demo canteens, verified NGOs, active 100-portion donations, historical rescues, impact accounting). |
| **[`db2/03_queries.sql`](../db2/03_queries.sql)** | Useful administrative and analytical SQL queries (active listings, match scores, accreditation queue, impact totals). |

---

## 3. Step-by-Step Connection & Management Guide

### Step 1: Open the Db2 Extension
1. In your editor's left activity bar, click on the **IBM Db2** icon.
2. In the **Connections** view, click the **+ (Add Connection)** button.

### Step 2: Configure Connection Parameters
Enter your Db2 connection details:
- **Profile Name**: `FoodBridgeAI_Db2`
- **Host**: Your Db2 hostname or IP (e.g., `localhost` or IBM Cloud host `*.databases.appdomain.cloud`)
- **Port**: Usually `50000` (or `50001` with SSL enabled)
- **Database Name**: `BLUDB` / `FOODBRG` / your assigned Db2 database name
- **User ID**: Your Db2 username
- **Password**: Your Db2 password
- **SSL**: Check `Enable SSL` if connecting to IBM Cloud / remote Db2.

Click **Save and Connect**.

---

### Step 3: Run the Schema DDL
1. Open [`db2/01_schema.sql`](../db2/01_schema.sql) in the editor.
2. Ensure the active connection profile in the status bar (bottom right) is set to `FoodBridgeAI_Db2`.
3. Right-click inside the SQL editor and select **Run All Statements** (or press `Ctrl+Enter` / `Cmd+Enter` on individual blocks).
4. Verify all tables appear under the **Schemas > Tables** tree in the Db2 extension pane.

---

### Step 4: Populate Seed Data
1. Open [`db2/02_seed.sql`](../db2/02_seed.sql).
2. Right-click and choose **Run All Statements**.
3. All core demo records (canteen donors, NGOs, 100-portion surplus meals, impact records) will be populated.

---

### Step 5: Query and Inspect
1. Open [`db2/03_queries.sql`](../db2/03_queries.sql).
2. Highlight any query (e.g. *Social & Environmental Impact Summary* or *Explainable AI Match ranking report*).
3. Right-click and select **Run Query**. Results will display in the interactive Db2 Results viewer tab.

import express from 'express';
import {
  getAdminOverview,
  getPendingVerifications,
  verifyNgo,
  getAllUsers,
  getAuditLogs,
  createNgo,
  triggerDatabaseSeed,
  exportReportCsv,
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, authorize('ADMIN'));

router.get('/overview', getAdminOverview);
router.get('/verifications', getPendingVerifications);
router.patch('/ngos/:id/verify', verifyNgo);
router.post('/ngos', createNgo);
router.get('/users', getAllUsers);
router.get('/audit-logs', getAuditLogs);
router.post('/seed', triggerDatabaseSeed);
router.get('/export-csv', exportReportCsv);

export default router;

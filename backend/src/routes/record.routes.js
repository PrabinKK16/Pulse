import { Router } from "express";
import { createRecord, getRecords, deleteRecord, updateRecord, bulkDeleteRecords, getRecordStats } from "../controllers/record.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);

router.post("/", createRecord);
router.get("/", getRecords);
router.delete("/:id", deleteRecord);
router.patch("/:id", updateRecord);
router.post("/bulk-delete", bulkDeleteRecords);
router.get("/stats", getRecordStats);

export default router;

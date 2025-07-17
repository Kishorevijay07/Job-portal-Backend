// ✅ ROUTES (routes/jobRoutes.js)
import express from "express";
import { createJob, getAllJobs } from "./../controller/jobController.js";

const router = express.Router();

router.post("/create", createJob);
router.get("/all", getAllJobs);

export default router;

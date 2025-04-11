import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs,addJobApplication, getAllJobs, getJobById, postJob, getStatusCount } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/jobs", addJobApplication);
router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);
router.get("/status-count", getStatusCount); 

export default router;
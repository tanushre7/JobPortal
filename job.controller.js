import { Job } from "../models/job.model.js";


// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
// student k liye
// student k liye
// job.model.js should have fields: company, role, status, appliedDate, link

export const addJobApplication = async (req, res) => {
    try {
      const { company, role, status, appliedDate, link } = req.body;
      if (!company || !role || !status || !appliedDate || !link) {
        return res.status(400).json({ message: "All fields are required", success: false });
      }
  
      const newJob = await Job.create({ company, role, status, appliedDate, link });
      return res.status(201).json({ message: "Job added", job: newJob, success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", success: false });
    }
  };
  
export const getAllJobs = async (req, res) => {
    try {
      const keyword = req.query.keyword || "";
      const query = {
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      };
  
      const jobs = await Job.find(query)
        .populate({ path: "company" })
        .sort({ appliedDate: -1 }); // 🔁 Sort by appliedDate (latest first)
  
      if (!jobs || jobs.length === 0) {
        return res.status(404).json({
          message: "Jobs not found.",
          success: false,
        });
      }
  
      return res.status(200).json({
        jobs,
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error", success: false });
    }
  };
  
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// ✅ Count job applications by status (e.g., Applied, Interview, Offer, Rejected)
export const getStatusCount = async (req, res) => {
    try {
        const jobs = await Job.find();
        const statusCount = {};

        jobs.forEach(job => {
            const status = job.status || "Unknown";
            statusCount[status] = (statusCount[status] || 0) + 1;
        });

        return res.status(200).json({
            statusCount,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

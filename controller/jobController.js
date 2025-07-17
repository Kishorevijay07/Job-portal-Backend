import Job from "./../model/Job.js";
import {v2 as cloudinary} from 'cloudinary';


export const createJob = async (req, res) => {
  try {
    const {
      companyName,
      title,
      location,
      jobType,
      mode = "Onsite",
      salaryMin,
      salaryMax,
      description,
    } = req.body;

    let {companyLogo} = req.body;

    console.log( companyName,
      title,
      location,
      jobType,
      mode ,
      salaryMin,
      salaryMax,
      description)
    console.log("Company name is ",companyName);
    // Determine experience based on salary

    let imageUrl = "";
    if (companyLogo) {
      const uploadRes = await cloudinary.uploader.upload(companyLogo, {
        folder: "rooms",
      });
      imageUrl = uploadRes.secure_url;
    }

    let exp = "1-2 yr Exp";
    if (salaryMax > 1500000) exp = "4-5 yr Exp";
    else if (salaryMax > 800000) exp = "2-3 yr Exp";

    const newJob = new Job({
      companyName,
      companyLogo:imageUrl,
      title,
      location,
      jobType,
      mode,
      exp,
      salary: { min: salaryMin, max: salaryMax },
      description,
    });

    console.log(newJob)
    await newJob.save();
    res.status(201).json({ message: "Job created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

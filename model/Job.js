// ✅ UPDATED MONGOOSE MODEL (models/Job.js)
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyLogo: {
    type: String,
    required:true
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ["FullTime", "Internship", "PartTime", "Contract"],
    required: true,
  },
  time: {
    type: String,
    default: () => new Date().toLocaleString(),
  },
  exp: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
    default: "Onsite",
  },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  deadline: {
    type: Date,
    default: () => new Date(new Date().setMonth(new Date().getMonth() + 1))
  },
  description: {
    type: String,
  }
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;

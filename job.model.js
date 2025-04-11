import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  requirements: [{
    type: String // list of strings like ["HTML", "CSS", "Teamwork"]
  }],
  salary: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type:String,
    required: true
  },
  position: {
    type: Number,
    required: true
  },
  appliedDate: {
    type: Date,
    required: true,
  },
  
  
  company: {
    type: mongoose.Schema.Types.ObjectId, // list of strings like ["HTML", "CSS", "Teamwork"]
    ref:'Company',
    required:true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, // list of strings like ["HTML", "CSS", "Teamwork"]
    ref:'User',
    required:true
  },
  applications:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application',
    }
]
},{timestamps:true});

export const Job = mongoose.model("Job", jobSchema);


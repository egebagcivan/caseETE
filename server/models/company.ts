import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  legalNumber: { type: String, required: true },
  country: { type: String, required: true },
  website: { type: String, required: false },
});

const Company = mongoose.model("Company", companySchema);

export { Company };


import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  organization: {type: String, required: true},
  branch: {type: String, required: true},
  theme: {type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true // Remove if you don't need unique emails
  },
  phone: { type: String, required: true },
  filePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Remove this if you're getting duplicate index warnings
// registrationSchema.index({ email: 1 }, { unique: true });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

export default Registration;
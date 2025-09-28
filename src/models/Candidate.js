const mongoose = require('mongoose');

const ConsentSchema = new mongoose.Schema({
    at: { type: Date, default: Date.now },
}, { _id: false });

const CandidateSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    lastConsentAt: { type: Date },
    consents: { type: [ConsentSchema], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
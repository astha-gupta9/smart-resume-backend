const Candidate = require('../models/Candidate');

exports.connectConsent = async (req, res, next) => {
    try {
        const uid = req.params.id;
        const { name, email } = req.body || {};

        if (!uid) {
            return res.status(400).json({ error: 'Missing candidate ID in path' });
        }

        const now = new Date();
        
        const candidate = await Candidate.findOneAndUpdate(
            { uid },
            {
                $set: { name, email, lastConsentAt: now },
                $push: { consents: { at: now } }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.status(201).json({ 
            message: 'Consent recorded', 
            candidate: {
                uid: candidate.uid,
                name: candidate.name,
                email: candidate.email,
                lastConsentAt: candidate.lastConsentAt
            } 
        });
    } catch (err) {
        next(err);
    }
};

exports.listCandidatesForRecruiter = async (req, res, next) => {
    try {
        const candidates = await Candidate.find({}, 'uid name email lastConsentAt').lean();
        res.json({ count: candidates.length, candidates });
    } catch (err) {
        next(err);
    }
};

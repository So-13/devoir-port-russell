const Catway = require('../models/Catway');

/**
 * Récupérer la liste de tous les catways (GET /catways)
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des catways", error: error.message });
    }
};

/**
 * Récupérer un catway spécifique par son numéro (GET /catways/:id)
 */
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Créer un nouveau catway (POST /catways)
 */
exports.createCatway = async (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;
    try {
        const existingCatway = await Catway.findOne({ catwayNumber });
        if (existingCatway) {
            return res.status(400).json({ message: "Ce numéro de catway existe déjà." });
        }
        const newCatway = new Catway({ catwayNumber, catwayType, catwayState });
        await newCatway.save();
        return res.status(201).json({ message: "Catway créé avec succès", catway: newCatway });
    } catch (error) {
        return res.status(400).json({ message: "Erreur lors de la création", error: error.message });
    }
};

/**
 * Modifier l'état d'un catway spécifique (PUT /catways/:id)
 */
exports.updateCatway = async (req, res) => {
    const { catwayState } = req.body;
    try {
        const updatedCatway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState },
            { new: true, runValidators: true }
        );
        if (!updatedCatway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        return res.status(200).json({ message: "État du catway mis à jour avec succès", catway: updatedCatway });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
};

/**
 * Supprimer un catway (DELETE /catways/:id)
 */
exports.deleteCatway = async (req, res) => {
    try {
        const deletedCatway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        if (!deletedCatway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        return res.status(200).json({ message: "Catway supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};
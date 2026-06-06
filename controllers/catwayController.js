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
        // Dans ton sujet, le paramètre :id correspond au catwayNumber unique
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        
        if (!catway) {
            return res.status(404).json({ message: "Catway non trouvé" });
        }
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
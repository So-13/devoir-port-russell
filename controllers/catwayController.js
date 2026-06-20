const Catway = require('../models/Catway');

// 1. GET /catways - Liste tous les catways (API)
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        return res.status(200).json(catways);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 2. GET /catways/:id - Récupère un catway par son numéro
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await Catway.findOne({ catwayNumber: req.params.id });
        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 3. POST /catways - Crée un catway (Formulaire HTML)
exports.createCatway = async (req, res) => {
    try {
        const { catwayNumber, catwayType, catwayState } = req.body;

        await Catway.create({
            catwayNumber,
            catwayType,
            catwayState
        });

        return res.redirect('/catways/catways-dashboard');
    } catch (error) {
        return res.status(500).send("Erreur lors de la création du catway : " + error.message);
    }
};

// 4. PUT /catways/:id - Modifie l'état d'un catway
exports.updateCatway = async (req, res) => {
    try {
        const { catwayState } = req.body;
        const catway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id },
            { catwayState },
            { new: true }
        );
        if (!catway) {
            return res.status(404).json({ message: "Catway introuvable" });
        }
        return res.status(200).json(catway);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// 5. DELETE /catways/:id - Supprime un catway
// 5. DELETE /catways/:id - Supprime un catway
exports.deleteCatway = async (req, res) => {
    try {
        // 1. On cherche et on supprime le catway grâce à son numéro
        await Catway.findOneAndDelete({ catwayNumber: req.params.id });
        
        // 2. Une fois supprimé, on recharge immédiatement ton tableau de bord
        return res.redirect('/catways/catways-dashboard');
    } catch (error) {
        // En cas de problème, on affiche l'erreur sur l'écran
        return res.status(500).send("Erreur lors de la suppression : " + error.message);
    }
};
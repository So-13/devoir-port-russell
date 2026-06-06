const User = require('../models/User');

/**
 * Récupérer tous les utilisateurs (sans afficher leurs mots de passe)
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Sécurité : on masque le mot de passe
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Créer un nouvel utilisateur de la capitainerie
 */
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Style défensif : on vérifie si l'utilisateur existe déjà
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cette adresse email est déjà utilisée" });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        return res.status(201).json({ message: "Utilisateur créé avec succès", user: { username, email } });
    } catch (error) {
        return res.status(400).json({ message: "Erreur lors de la création", error: error.message });
    }
};
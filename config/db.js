const mongoose = require('mongoose');

/**
 * Fonction de connexion à la base de données MongoDB
 */
const connectDB = async () => {
    try {
        // Style défensif : On vérifie que la variable d'environnement est bien chargée
        if (!process.env.MONGO_URI) {
            throw new Error("La variable MONGO_URI n'est pas définie dans le fichier .env");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connecté avec succès : ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erreur de connexion à MongoDB : ${error.message}`);
        process.exit(1); // Arrête le serveur si la connexion échoue
    }
};

module.exports = connectDB;
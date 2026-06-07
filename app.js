const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Importation des fichiers de routes (Architecture MVC)
const userRoute = require('./routes/userRoute');
const catwayRoute = require('./routes/catwayRoute');
const reservationRoute = require('./routes/reservationRoute');

// Chargement des variables d'environnement (.env)
dotenv.config();

// Connexion à la base de données MongoDB
connectDB();

const app = express();

// Middlewares globaux indispensables
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configuration du moteur de templates EJS pour l'interface visuelle
app.set('view engine', 'ejs');

// Liaison de toutes les routes de l'API
app.use('/users', userRoute); // Gère les utilisateurs
app.use('/catways', catwayRoute); // Gère les catways

// Style défensif : les réservations dépendent logiquement d'un catway
app.use('/catways/:id/reservations', reservationRoute);

// Route temporaire pour tester l'accueil du site
app.get('/', (req, res) => {
    res.send("Le serveur de la capitainerie du Port de Russell est entièrement connecté !");
});

// Sécurité / Style défensif : Gestion des erreurs 404 si l'URL demandée n'existe pas
app.use((req, res, next) => {
    res.status(404).json({ message: "Désolé, cette ressource n'existe pas." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});
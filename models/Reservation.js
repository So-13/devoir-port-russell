const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour une Réservation de catway
 */
const reservationSchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, "Le numéro de catway est obligatoire"],
        ref: 'Catway' // Fait le lien logique avec le modèle Catway
    },
    clientName: {
        type: String,
        required: [true, "Le nom du client est obligatoire"],
        trim: true
    },
    boatName: {
        type: String,
        required: [true, "Le nom du bateau est obligatoire"],
        trim: true
    },
    startDate: {
        type: Date,
        required: [true, "La date de début est obligatoire"]
    },
    endDate: {
        type: Date,
        required: [true, "La date de fin est obligatoire"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
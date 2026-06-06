const mongoose = require('mongoose');

/**
 * Schéma Mongoose pour un Catway (ponton)
 */
const catwaySchema = new mongoose.Schema({
    catwayNumber: {
        type: Number,
        required: [true, "Le numéro de catway est obligatoire"],
        unique: true // Style défensif : impossible d'avoir deux fois le même numéro
    },
    catwayType: {
        type: String,
        required: [true, "Le type de catway est obligatoire"],
        enum: {
            values: ['long', 'short'], // Uniquement les deux choix imposés par le sujet
            message: "Le type doit être 'long' ou 'short'"
        }
    },
    catwayState: {
        type: String,
        required: [true, "L'état du catway est obligatoire"],
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Catway', catwaySchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Schéma Mongoose pour les utilisateurs de la capitainerie
 */
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, "Le nom d'utilisateur est obligatoire"], 
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, "L'adresse email est obligatoire"], 
        unique: true, // Style défensif : pas de doublons d'emails en BDD
        lowercase: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, "Le mot de passe est obligatoire"] 
    }
}, { timestamps: true });

// Style défensif : On hache le mot de passe automatiquement avant de l'enregistrer
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
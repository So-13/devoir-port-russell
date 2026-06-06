const Reservation = require('../models/Reservation');

/**
 * Lister toutes les réservations d'un catway spécifique (GET /catways/:id/reservations)
 */
exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await Reservation.find({ catwayNumber: req.params.id });
        return res.status(200).json(reservations);
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
    }
};

/**
 * Récupérer une réservation spécifique (GET /catways/:id/reservations/:idReservation)
 */
exports.getReservationDetail = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.idReservation);
        if (!reservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        return res.status(200).json(reservation);
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

/**
 * Créer une réservation pour un catway (POST /catways/:id/reservations)
 */
exports.createReservation = async (req, res) => {
    const { clientName, boatName, startDate, endDate } = req.body;
    const catwayNumber = req.params.id;

    try {
        // Style défensif : On pourrait vérifier ici si les dates se chevauchent, mais on reste simple pour le CRUD
        const newReservation = new Reservation({
            catwayNumber,
            clientName,
            boatName,
            startDate,
            endDate
        });

        await newReservation.save();
        return res.status(201).json({ message: "Réservation créée avec succès", reservation: newReservation });
    } catch (error) {
        return res.status(400).json({ message: "Erreur de création", error: error.message });
    }
};

/**
 * Supprimer une réservation (DELETE /catways/:id/reservations/:idReservation)
 */
exports.deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.idReservation);
        if (!deletedReservation) {
            return res.status(404).json({ message: "Réservation non trouvée" });
        }
        return res.status(200).json({ message: "Réservation supprimée avec succès" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
    }
};
const express = require('express');
const router = express.Router({ mergeParams: true }); 
// 'mergeParams: true' est capital ici pour pouvoir récupérer le ':id' du catway depuis les routes parentes !

const reservationController = require('../controllers/reservationController');

// Lister toutes les réservations d'un catway -> GET /catways/:id/reservations
router.get('/', reservationController.getReservationsByCatway);

// Voir le détail d'une réservation -> GET /catways/:id/reservations/:idReservation
router.get('/:idReservation', reservationController.getReservationDetail);

// Créer une réservation -> POST /catways/:id/reservations
router.post('/', reservationController.createReservation);

// Supprimer une réservation -> DELETE /catways/:id/reservations/:idReservation
router.delete('/:idReservation', reservationController.deleteReservation);

module.exports = router;
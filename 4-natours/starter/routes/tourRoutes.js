const express = require("express");
const tourController = require("../controllers/tourController");

// ROUTER MOUNTING
const router = express.Router();

// router.param("id", tourController.checkId);

router // aliasing (renaming frequently called routes)
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour); //tourController.checkBody, ...
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

// if( !mongoose.Types.ObjectId.isValid(id) ) return false;

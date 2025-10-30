const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/moviesController");
const { validateMovie } = require("../middlewares/validate");
const upload = require("../middlewares/upload");

router.post("/", upload.single("poster"), validateMovie, ctrl.createMovie);
router.get("/", ctrl.getMovies);
router.get("/:id", ctrl.getMovieById);
router.put("/:id", upload.single("poster"), validateMovie, ctrl.updateMovie);
router.delete("/:id", ctrl.deleteMovie);

module.exports = router;

const { Movie } = require("../models");
const { getPagination } = require("../utils/paginate");

const getPosterUrl = (posterUrl) =>
  posterUrl
    ? `${process.env.SERVER_URL || "http://localhost:5000"}${posterUrl}`
    : `${process.env.SERVER_URL || "http://localhost:5000"}/uploads/default-placeholder.jpg`;

async function createMovie(req, res, next) {
  try {
    const movieData = req.body;
    if (req.file) {
      movieData.poster_url = `/uploads/${req.file.filename}`;
    }
    const movie = await Movie.create(movieData);
    // Return movie with full poster_url
    const movieJSON = movie.toJSON();
    movieJSON.poster_url = getPosterUrl(movie.poster_url);
    res.status(201).json(movieJSON);
  } catch (err) {
    next(err);
  }
}

async function getMovies(req, res, next) {
  try {
    const limitParam = req.query.limit || 20;
    const offsetParam = (req.query.page - 1) * limitParam || 0;
    const { limit, offset } = getPagination(limitParam, offsetParam);

    const movies = await Movie.findAndCountAll({
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const data = movies.rows.map((movie) => {
      const m = movie.toJSON();
      m.poster_url = getPosterUrl(m.poster_url);
      return m;
    });

    res.json({
      data,
      total: movies.count,
      limit,
      offset,
    });
  } catch (err) {
    next(err);
  }
}

async function getMovieById(req, res, next) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const movieJSON = movie.toJSON();
    movieJSON.poster_url = getPosterUrl(movie.poster_url);

    res.json(movieJSON);
  } catch (err) {
    next(err);
  }
}

async function updateMovie(req, res, next) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const updatedData = req.body;
    if (req.file) {
      updatedData.poster_url = `/uploads/${req.file.filename}`;
    }

    await movie.update(updatedData);

    const movieJSON = movie.toJSON();
    movieJSON.poster_url = getPosterUrl(movie.poster_url);

    res.json(movieJSON);
  } catch (err) {
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createMovie, getMovies, getMovieById, updateMovie, deleteMovie };

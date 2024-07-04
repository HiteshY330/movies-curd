const express = require("express");
const router = express.Router();
const Movie = require("../models/index");

router.get("/", async (req, res) => {
  try {
    const movie = await Movie.find();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, img, summary } = req.body;
  console.log("req", req.body);
  const newMovie = new Movie({
    name,
    img,
    summary,
  });

  try {
    const checkMovie = await Movie.findOne({ name });
    if (checkMovie)
      return res.status(400).json({ message: "Movie already exists" });
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { name, img, summary } = req.body;

  try {
    const movie = await Movie.findById(req.params.id);
    console.log(movie, "##############################");
    if (!movie) return res.status(404).json({ message: "movie not found" });

    movie.name = name || movie.name;
    movie.img = img || movie.img;
    movie.summary = summary || movie.summary;

    const updatedmovie = await movie.save();
    res.json(updatedmovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.deleteOne({ _id: req.params.id });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

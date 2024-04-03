/*
  Programmers: Andy Tran, Sreypich Heng

  Description: Server side of the final project using Express and MongoDB.
*/

// Running database ("/c/Program Files/MongoDB/Server/7.0/bin/mongod.exe" --dbpath="C:\Web Dev\Web Programming\data\animes")
// "/Users/sreypichheng/Documents/Rowan/Spring_24/Web_Programming/WebProgramming2024/express-final-project/mongodb-osx-x86_64-3.0.15/bin/mongod" --dbpath="/Users/sreypichheng/Documents/Rowan/Spring_24/Web_Programming/WebProgramming2024/express-final-project/data/animes"

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/animes')
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err))

// Schema and Model
const animeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true }
});

const AnimeModel = mongoose.model('Anime', animeSchema);

app.use(express.json());

// Mock data for anime collection
let animes = [
  { id: 1, title: "Attack on Titan", genre: "Action, Dark Fantasy, Post-apocalyptic" },
  { id: 2, title: "My Hero Academia", genre: "Superhero, Action" }
];

// GET all animes
app.get('/api/animes', async (req, res) => {
  try {
    const storedAnimes = await AnimeModel.find({});
    res.json(storedAnimes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET a single anime by id
app.get('/api/animes/:id', async (req, res) => {
  const anime = await AnimeModel.find(a => a.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).send('Anime not found');
  }
  res.json(anime);
});

// POST a new anime
app.post('/api/animes', async (req, res) => {
  const { title, genre } = req.body;

  const anime = new AnimeModel({
    title, genre
  });

  try {
    const newAnime = await anime.save()
    res.status(201).send(anime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT update an anime
app.put('/api/animes/:id', async (req, res) => {
  const { id } = req.params.id;
  const { title, genre } = req.body;

  try {
    const updatedAnime = await AnimeModel.findByIdAndUpdate(id, { title, genre });

    if (updatedAnime) {
      res.json(updatedAnime);
    } else {
      res.status(404).send('Anime Not Found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE an anime
app.delete('/api/animes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnime = await AnimeModel.findByIdAndDelete(id);

    if (deletedAnime) {
      res.status(204).send(); //Nothing to send back
    } else {
      res.status(404).send('Anime Not Found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});

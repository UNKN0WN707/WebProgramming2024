/*
  Programmers: Andy Tran, Sreypich Heng

  Description: Server side of the final project using Express and MongoDB.
*/

// Running database ("/c/Program Files/MongoDB/Server/7.0/bin/mongod.exe" --dbpath="C:\Web Dev\Web Programming\data\animes")

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8081;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Could not connect to database ...', err));


// Schema and Model
const animeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true }
});

const AnimeModel = mongoose.model('Anime', animeSchema);

app.use(express.json());

// Mock data
const mockData = [
  { title: 'Naruto', genre: 'Action' },
  { title: 'One Piece', genre: 'Adventure' },
  { title: 'Death Note', genre: 'Mystery' }
];

// Insert mock data into the database
AnimeModel.insertMany(mockData)
  .then(() => console.log('Mock data inserted'))
  .catch(err => console.error('Failed to insert mock data:', err));


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
  try {
    const anime = await AnimeModel.findById(req.params.id);
    if (!anime) {
      return res.status(404).send('Anime not found');
    }
    res.json(anime);
  } catch (error) {
    res.status(500).send(error);
  }
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
  const { title, genre } = req.body;

  try {
    const updatedAnime = await AnimeModel.findByIdAndUpdate(req.params.id, { title, genre }, { new: true });
    if (!updatedAnime) {
      return res.status(404).send('Anime Not Found');
    }
    res.json(updatedAnime);
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE an anime
app.delete('/api/animes/:id', async (req, res) => {
  try {
    const deletedAnime = await AnimeModel.findByIdAndDelete(req.params.id);
    if (!deletedAnime) {
      return res.status(404).send('Anime Not Found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});


app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});

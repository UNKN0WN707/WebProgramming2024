/**
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Server side of the final project using Express and MongoDB.
 */

// Running database ("/c/Program Files/MongoDB/Server/7.0/bin/mongod.exe" --dbpath="C:\Web Dev\Web Programming\data\animes")

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const port = 8000;

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/animes')
        .then(() => console.log('Connected to database'))
        .catch((err) => console.log(err))

// Anime Schema and Model
const animeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  genre: { type: String, required: true }
});

const AnimeModel = mongoose.model('Anime', animeSchema);

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  feedback: { type: String, required: true}
});

const ContactModel = mongoose.model('Contact', contactSchema);

app.use(express.json());

// Mock data for anime collection
let animes = [
  { id: 1, title: "Attack on Titan", genre: "Action, Dark Fantasy, Post-apocalyptic" },
  { id: 2, title: "My Hero Academia", genre: "Superhero, Action" }
];

// GET all the feedback from Contact Form
router.get('/api/contacts', async (req, res) => {
  try {
    const feedbacks = await ContactModel.find({});
    res.json(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

// POST new feedback
router.post('/api/contacts', async (req, res) => {
  const { name, email, feedback } = req.body;

  const inquire = new ContactModel({
    name, email, feedback
  });

  try {
    const newFeedback = await inquire.save()
    res.status(201).send(inquire);
  } catch (error) {
    res.status(500).send(error);
  }
});

// POST a new anime
router.post('/api/animes', async (req, res) => {
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

// PUT update feedback
router.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params.id;
  const { name, email, feedback } = req.body;

  try {
    const updatedFeedback = await ContactModel.findByIdAndUpdate(id, { name, email, feedback });

    if (updatedFeedback) {
      res.json(updatedFeedback);
    } else {
      res.status(404).send('Feedback Not Found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT update an anime
router.put('/api/animes/:id', async (req, res) => {
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

// DELETE a piece of feedback
router.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await ContactModel.findByIdAndDelete(id);

    if (deletedContact) {
      res.status(204).send(); //Nothing to send back
    } else {
      res.status(404).send('Feedback Not Found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// DELETE an anime
router.delete('/api/animes/:id', async (req, res) => {
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

app.use('/', router);

app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});

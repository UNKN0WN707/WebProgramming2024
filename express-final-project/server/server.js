/*
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Server side of the final project using Express and MongoDB.
 */

// Running database ("/c/Program Files/MongoDB/Server/7.0/bin/mongod.exe" --dbpath="C:\Web Dev\Web Programming\data\animes")

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();
const port = 8080;

app.use(cors());
app.use(express.json()); 

// Secret key used for the JWT token
secretKey = require('crypto').randomBytes(32).toString('hex');

// Connect to the MongoDB database
mongoose.connect('mongodb://host.docker.internal:27017/animes')
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

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model('User', userSchema);

// Mock data for anime collection
let animes = [
  { id: 1, title: "Attack on Titan", genre: "Action, Dark Fantasy, Post-apocalyptic" },
  { id: 2, title: "My Hero Academia", genre: "Superhero, Action" }
];

// Login User
app.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const user = await UserModel.findOne({ name });

  if (password && password === user.password) {
    const token = jwt.sign({ name }, secretKey, { expiresIn: '1h' });
    res.json({token});
  } else {
    res.status(401).send('Invalid username or password');
  }
})

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
router.get('/api/animes', async (req, res) => {
  try {
    const storedAnimes = await AnimeModel.find({});
    res.json(storedAnimes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a user by name
router.get('/api/users/:name', async (req, res) => {
  const user = await UserModel.find(a => a.name === req.params.name);

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// GET a single anime by id
router.get('/api/animes/:id', async (req, res) => {
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

// POST a new user
router.post('/api/users', async (req, res) => {
  const { name, password } = req.body;

  const user = new UserModel({
    name, password
  });

  try {
    const newUser = await user.save()
    res.status(201).send(newUser);
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

// PUT update a user
router.put('/api/user/:id', async (req, res) => {
  const { id } = req.params.id;
  const { password } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { password });

    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).send('User Not Found');
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

// DELETE a user
router.delete('/api/user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser= await UserModel.findByIdAndDelete(id);

    if (deletedUser) {
      res.status(204).send(); //Nothing to send back
    } else {
      res.status(404).send('User Not Found');
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
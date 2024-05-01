/*
 *   Programmers: Andy Tran, Sreypich Heng
 *   Rowan University
 *   Course: Web Programming CS04305
 *   Instructor: Marquise Pullen
 *
 *   Description: Server side of the final project using Express and MongoDB.
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
  title: { type: String, required: true },
  genre: { type: String, required: true },
});

const AnimeModel = mongoose.model('Anime', animeSchema);

// Contact Schema and Model
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  feedback: { type: String, required: true}
});

const ContactModel = mongoose.model('Contact', contactSchema);

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const UserModel = mongoose.model('User', userSchema);

// Define routes
router.get('/api/contacts', async (req, res) => {
  try {
    const feedbacks = await ContactModel.find({});
    res.json(feedbacks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/api/animes', async (req, res) => {
  try {
    const storedAnimes = await AnimeModel.find({});
    res.json(storedAnimes);
  } catch (error) {
    res.status(500).send(error);
  }
});

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

// GET a single anime by id
router.get('/api/animes/:id', async (req, res) => {
  const anime = await AnimeModel.find(a => a.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).send('Anime not found');
  }
  res.json(anime);
});

// Get a user by name
router.get('/api/users/:name', async (req, res) => {
  const user = await UserModel.find(a => a.name === req.params.name);

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
});

// POST new feedback
router.post('/api/contacts', async (req, res) => {
  const { name, email, feedback } = req.body;

  const newContact = new ContactModel({ name, email, feedback });

  try {
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: error.message });
  }
});


// POST a new anime
router.post('/api/animes', async (req, res) => {
  const { title, genre } = req.body;

  try {
    // Check if an anime with the same title already exists
    const existingAnime = await AnimeModel.findOne({ title });

    if (existingAnime) {
      // If an anime with the same title exists, return an error
      return res.status(400).json({ message: 'An anime with the same title already exists.' });
    }

    // If the anime title is unique, save the new anime
    const newAnime = new AnimeModel({ title, genre });
    await newAnime.save();

    res.status(201).json(newAnime);
  } catch (error) {
    console.error('Failed to save anime:', error); 
    res.status(500).json({ message: "Failed to add anime", error: error.message });
  }
});


// POST - Create a new user
router.post('/api/users', async (req, res) => {
  const { username, email, password } = req.body;

  const signup = new UserModel({
    username, email, password
  });

  try {
      // Check if user with given email already exists
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Create new user
      const newUser = new UserModel({ username, email, password });
      await newUser.save();

      res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});


// PUT update feedback
router.put('/api/contacts/:id', async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const { title, genre } = req.body;

  try {
    const updatedAnime = await AnimeModel.findByIdAndUpdate(id, { title, genre }, { new: true });

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


// POST - Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with given email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user without hashing the password
    const newUser = new UserModel({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST - Signin
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Login failed! User not found' });
    }

    // Compare the plaintext password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Login failed! Password not a match' });

    }

    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    console.log(token);

    
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        token: token
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use('/', router);
app.use('/api', router); 

app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});


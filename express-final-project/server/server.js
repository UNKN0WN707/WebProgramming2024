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
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const router = express.Router();
const port = 8080;

app.use(cors());
app.use(express.json()); 

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

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

/*
// define any additional methods or hooks for the user schema, such as password hashing
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
*/

const UserModel = mongoose.model('User', userSchema);

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
    const newAnime = await anime.save();
    res.status(201).send(anime);
  } catch (error) {
    console.error('Failed to save anime:', error); 
    res.status(500).send({ message: "Failed to add anime", error: error.message });
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

// GET - Get all users
router.get('/api/users', async (req, res) => {
  try {
      const users = await UserModel.find({});
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT - Update user by ID
router.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, { username, email, password }, { new: true });

      if (updatedUser) {
          res.json(updatedUser);
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE - Delete user by ID
router.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const deletedUser = await UserModel.findByIdAndDelete(id);

      if (deletedUser) {
          res.status(204).send(); // No content to send back
      } else {
          res.status(404).json({ message: 'User not found' });
      }
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
  const { id } = req.params; 
  const { title, genre } = req.body;

  try {
    // Ensuring the updated document is returned by setting { new: true }
    const updatedAnime = await AnimeModel.findByIdAndUpdate(id, { title, genre }, { new: true });

    if (updatedAnime) {
      res.json(updatedAnime); 
    } else {
      res.status(404).send('Anime Not Found');
    }
  } catch (error) {
    res.status(500).send({ message: "Failed to update anime", error: error.message });
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


/*
// POST - Create a new user
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user with given email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});
*/

// POST - Create a new user without hashing
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

    /*
    // Compare the hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Login failed! Password not a match' });
    }
    */
   
    // Compare the plaintext password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Login failed! Password not a match' });
    }

    // Return user data (excluding the password)
    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// utilize Cookies for Sensitive Data
app.post('/signin', async (req, res) => {
  // user authentication logic 
  if (authenticated) {
    res.cookie('sessionToken', sessionToken, {
      httpOnly: true,
      secure: true,  // Set to true if using HTTPS
      sameSite: 'Strict'
    });
    res.status(200).json({ message: 'Authentication successful' });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

app.use('/', router);
app.use('/api', router); 


app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});


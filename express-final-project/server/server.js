const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

// Mock data for anime collection
let animes = [
  { id: 1, title: "Attack on Titan", genre: "Action, Dark Fantasy, Post-apocalyptic" },
  { id: 2, title: "My Hero Academia", genre: "Superhero, Action" }
];

// GET all animes
app.get('/api/animes', (req, res) => {
  res.json(animes);
});

// GET a single anime by id
app.get('/api/animes/:id', (req, res) => {
  const anime = animes.find(a => a.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).send('Anime not found');
  }
  res.json(anime);
});

// POST a new anime
app.post('/api/animes', (req, res) => {
  const anime = {
    id: animes.length + 1,
    title: req.body.title,
    genre: req.body.genre
  };
  animes.push(anime);
  res.status(201).send(anime);
});

// PUT update an anime
app.put('/api/animes/:id', (req, res) => {
  const anime = animes.find(a => a.id === parseInt(req.params.id));
  if (!anime) {
    return res.status(404).send('Anime not found');
  }
  anime.title = req.body.title || anime.title;
  anime.genre = req.body.genre || anime.genre;
  res.send(anime);
});

// DELETE an anime
app.delete('/api/animes/:id', (req, res) => {
  animes = animes.filter(a => a.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Anime Collection Tracker API running at http://localhost:${port}`);
});

/*communication avec le serveur*/
const express = require('express');
const app = express(); /*application Express*/
const bodyParser = require('body-parser'); //application body-parser
const mongoose = require('mongoose'); //application MongoDB

/*connection à MongoDB*/
mongoose.connect('mongodb+srv://Admin:<coucou>@clustersauces.axin0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie'))
  .catch(() => console.log('Connexion à MongoDB échouée'));


/*middleware communication des différent port(localhost) possible*/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à notre API depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //envoyer des requêtes avec les méthodes mentionnées
  next();
});

/*middlewares de confirmation
app.use((req, res, next) => {
  console.log('Requête reçue');
  next();
});
app.use((req, res, next) => {
  res.status(201);
  next();
});
app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue'});
  next();
});
app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès');
});

app.post('/api/sauces', (req, res, next) => {
})*/

/*parle en json*/
app.use(bodyParser.json());

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const saucesRoutes = require('./routes/sauces');
app.use('/api/sauces', saucesRoutes);

const userRoutes = require('./routes/user');
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
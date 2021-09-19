const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://<Admin>:<coucou>@clustersauces.axin0.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use('/api/sauces', (req, res, next) => {
    const stuff = [
      {
        userId: 'identifiant MongoDB créateur sauce',
        name: 'nom sauce',
        manufactuer: 'fabrican',
        description: 'description de la sauce',
        mainPeper: 'ingrédiant principal',
        imageUrl: 'imagesauce',
        heat: 10,
        likes: 11,
        dislikes: 12,
        usersLiked: 'tableau personne qui on like',
        userDislider: 'tableau personne qui on dislike',
      },
    ];
    res.status(200).json(stuff);
  });

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });

  const Thing = require('./models/thing');

  //enregistrement dans la BdS
  app.post('/api/sauces', (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //récupération total
  app.use('/api/sauces', (req, res, next) => {
    Sauces.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
  });

  //récupération spécifique
  app.get('/api/sauces/:id', (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  });

  //MaJ sauce existante
  app.put('/api/sauces/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //Supprimer sauce
  app.delete('/api/sauce/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  const stuffRoutes = require('./routes/stuff');
  app.use('/api/stuff', stuffRoutes);
const router = require('express').Router();
const { Sport, Post } = require('../models');

// GET all sports cards
router.get('/', async (req, res) => {
  try {
  // Search the database for a dish with an id that matches params
  const postData = await Post.findAll();

  // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
  const posts = postData.map((post)=>post.get({ plain: true }));
  console.log(posts);
  // Then, the 'dish' template is rendered and dish is passed into the template.
  res.render('homepage', posts);
  } catch (err) {
      res.status(500).json(err);
  }
});

// GET one sport with posts
router.get('/sport/:id', async (req, res) => {
  try {
    const sportData = await Sport.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: [
            'id',
            'title',
          ],
        },
      ],
    });
    const sport = sportData.get({ plain: true });
    res.render('sport-posts', { sport, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
    
// GET one blog post
router.get('/post/:id', async (req, res) => {
  try {
    const sportData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          attributes: [
            'id',
            'title',
          ],
          model: Post,  
        }
      ]
  })
    const sport = sportData.get({ plain: true });
    res.render('post', { sport, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});




// Create a post route
router.post('/post/create', async (req, res) => {
  res.render('create-post');
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      looking_for_players: req.body.looking_for_players,
      looking_for_students: req.body.looking_for_students,
      looking_for_coach: req.body.looking_for_coach,
      date_created: Date.toLocaleDateString(),
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      res.status(200).json(postData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });



module.exports = router;
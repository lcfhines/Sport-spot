const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blogpost-routes');

const createUserRoutes=require('./create-user');

const sportPostRoutes=require('./sport-post');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

router.use('/create-user', createUserRoutes);

router.use('/sport', sportPostRoutes);

module.exports = router;

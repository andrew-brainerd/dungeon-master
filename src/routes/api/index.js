const router = require('express').Router();
const version = process.env.API_VERSION;

router.get('/', (req, res) => {
  res.send({
    message: `Welcome to the 3 Minute Dungeon API v${version}!`
  });
});

router.use('/dungeons', require('./dungeons'));
router.use('/sync', require('./sync'));

module.exports = router;

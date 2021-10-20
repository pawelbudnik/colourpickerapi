const express = require('express');

const emojis = require('./emojis');
const colourpicker = require('./colourpicker');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/colourpicker', colourpicker);

module.exports = router;

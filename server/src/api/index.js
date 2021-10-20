const express = require('express');

const colourpicker = require('./colourpicker');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/colourpicker', colourpicker);

module.exports = router;

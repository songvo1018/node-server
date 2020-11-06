const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/:fileName', (req, res, next) => {
  const file = req.params.fileName;
  try {
    res.sendFile(`uploads/${file}`)
  } catch(err) {
    console.error(err)
  }
})

module.exports = router;
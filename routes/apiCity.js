const express = require('express');
const router = express.Router();

router.get('/', async function (req, res, next) {
    let data;
    try {
      const [rows] = await db.query('SELECT * FROM city ORDER BY id desc');
      data = rows;
      // res.json(data);
      res.render('city', { data });
    } catch (err) {
      console.log('Errors on getting city!');
      res.render('city', { data: '' });
    }
  });

module.exports = router;
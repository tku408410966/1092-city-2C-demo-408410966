const express = require('express');
const router = express.Router();
const db = require('../lib/db');

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

// display add city page
router.get('/add', async function (req, res, next) {
//  res.send('display add city page')
  res.render('city/add', {
    name: '',
  });
});

// add a new city
router.post('/add', async function (req, res, next) {
//  res.send('Add a new city.')
  const name = req.body.name;
  console.log(name);

  const from_data = {
    name: name,
  };

  try{
    await db.query('INSERT INTO city SET ?', from_data);
    res.redirect('/city');
  } catch (err){
    console.log(err);
    res.render('city/add', {
    name: from_data.name,
    });
  }
});

// display edit city page
router.get('/edit/:id', async function (req, res, next) {
  //res.send('display edit city page');
  const id = req.params.id;
  try{
    const[row] = await db.query('SELECT * FROM city WHERE id = ?', [id]);
    res.render('city/edit', {
      id: row[0].id,
      name: row[0].name,
    });
  }catch (err) {
    console.log(err);
  }
});

// update city data
router.post('/update', async function (req, res, next) {
  //res.send('update city data');
  const name = req.body.name;
  const id = req.body.id;

  try {
    await db.query('UPDATE city SET name = ? WHERE id = ?', [
      name,
      id,
    ]);
    //res.status(200).json({ message: 'Updating successful' });
    res.redirect('/city');
  }catch (err) {
    console.log(err);
  }
});

// delete book
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM city WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/city');
});

module.exports = router;

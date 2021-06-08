const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
      const response = await fetch('http://localhost:1337/cities');
      const data = await response.json(); 
      //const [rows] = await db.query('SELECT * FROM city ORDER BY id desc');
      res.render('apiCity/index', { data });
    } catch (err) {
      console.log('Errors on getting city!');
      res.render('apiCity/index', { data: '' });
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
        //await db.query('INSERT INTO city SET ?', from_data);

        const response = await fetch('http://localhost:1337/cities', {
            method: 'post',
            body: JSON.stringify(from_data),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        res.redirect('/apiCity');
      } catch (err){
        console.log(err);
        res.render('apiCity/add', {
        name: from_data.name,
        });
      }
    });

    // display edit city page
router.get('/edit/:id', async function (req, res, next) {
    //res.send('display edit city page');
    const id = req.params.id;
    try{
      const response = await fetch(`http://localhost:1337/cities/${id}`);
      const data = await response.json();
      //const[row] = await db.query('SELECT * FROM city WHERE id = ?', [id]);
      res.render('apiCity/edit', {
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
      //await db.query('UPDATE city SET name = ? WHERE id = ?', [
      //  name,
      //  id,
      // ]);
      //res.status(200).json({ message: 'Updating successful' });
      res.redirect('/city');
    }catch (err) {
      console.log(err);
    }
  });

module.exports = router;
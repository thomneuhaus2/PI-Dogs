const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const axios = require('axios');
const e = require('express');
const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const infoApi = await axios.get('https://api.thedogapi.com/v1/breeds');//[{},{},{}]
        const temperaments = infoApi.data.map(el => {
            if (el.temperament) {
               return el.temperament.split(',')
            }
            else {
                return [];
            }
        })
        const tempSet = temperaments.flat();//[4,6,4,6,6,6,5,7]
        let newSet = new Set(tempSet)
        let newArr = [...newSet]
        newArr.forEach(el => {
            Temperament.findOrCreate({
                where: { name: el }
            });
        });
        const temperamentsDB = await Temperament.findAll();
        res.send(temperamentsDB);
    } catch (error) {
        next(error)
    }
   
});

module.exports = router;
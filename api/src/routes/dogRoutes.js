const { Router } = require('express');
const { Dog, Temperament } = require('../db')
const axios = require('axios')
const router = Router();

const getApiInfo = async () => {
    const url = await axios.get('https://api.thedogapi.com/v1/breeds');
    const info = await url.data.map(el => {
        return {
            name: el.name,
            id: el.id,
            image: el.image,
            height: el.height,
            weight: el.weight,
            lifeSpan: el.life_span,
            temperament: el.temperament ? el.temperament.split(',') : "",
            createdInDB: false
        };
    });
    return info;
};

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
};

const getAll = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


router.get('/', async (req, res, next) => {
    try {
        let name = req.query.name;
        let info = await getAll();
        if (name) {
            let dogsName = await info.filter(el => el.name.toLowerCase().includes(name));
            dogsName.length ?
                res.status(200).send(dogsName) :
                res.status(404).send('No hay perros con ese nombre')
        } else {
            res.status(200).send(info)
        }
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const info = await getAll();
        if (id) {
            let dogsWanted = await info.filter(el => el.id == id);
            dogsWanted.length ?
                res.status(200).send(dogsWanted) :
                res.status(404).send('No existe un perro con ese id')
        }
    } catch (error) {
        next(error)
    }

})


router.post('/', async (req, res) => {
    try {
        let {
            name,
            height,
            weight,
            lifeSpan,
            image,
            createdInDB,
            temperament
        } = req.body;
        let newDog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
            image,
            createdInDB
        })
    
        let temperamento = await Temperament.findAll({ where: { name: temperament } });
        newDog.addTemperament(temperamento);
        res.send('se agrego el perro')
    } catch (error) {
        next(error)
    }
});




module.exports = router;
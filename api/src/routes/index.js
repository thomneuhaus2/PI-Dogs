const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoutes = require('./dogRoutes.js');
const tempRoutes = require('./tempRoutes.js');
const Dog = require('../models/Dog.js');
const Temperament = require('../models/Temperament.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogRoutes);
router.use('/temperaments', tempRoutes);




module.exports = router;

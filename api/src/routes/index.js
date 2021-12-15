const { Router } = require('express')
// Importar todos los routers;
const characters = require('../controllers/characters');
const episodes = require('../controllers/episodes');
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/characters', characters);
router.use('/episodes', episodes);

module.exports = router

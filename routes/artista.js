const { Router } = require('express');
const { getArtistas, crearArtista, actualizarArtista, eliminarArtista } = require('../controller/artista');

const router = Router();

router.get('/', getArtistas);

router.post('/', crearArtista);

router.put('/:id', actualizarArtista);

router.delete('/:id', eliminarArtista);

module.exports = router;
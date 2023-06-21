const { Router } = require('express');
const { getAlbumes, crearAlbum, eliminarAlbum } = require('../controller/album');

const router = Router();

router.get('/', getAlbumes);

router.post('/', crearAlbum);

router.delete('/:id', eliminarAlbum);

module.exports = router;
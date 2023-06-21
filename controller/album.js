const { response } = require('express');
const Album = require('../models/album');
const Artista = require('../models/artista');


const getAlbumes = async (req, res = response) => {

    const albumes = await Album.find();

    res.json({
        ok: true,
        msg: albumes
    });

}

const crearAlbum = async (req, res = response) => {

    const { titulo, artista } = req.body;

    try {

        const existe = await Album.findOne({ titulo });

        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: 'El albúm que intenta registar ya existe'
            });
        }

        const album = new Album(req.body);

        const getArtistaId = await Artista.findOne({ nombreArtistico: artista });

        album.artista = getArtistaId._id;

        const albumSave = await album.save(album);

        res.status(201).json({
            ok: true,
            msg: albumSave
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar el albúm'
        });
    }

}

const eliminarAlbum = async (req, res = response) => {

    const albumId = req.params.id;

    try {

        const album = await Album.findById(albumId);

        if (!album) {
            res.status(404).json({
                ok: false,
                msg: `El albúm con id ${albumId} no existe`
            });
        }

        await Album.findByIdAndDelete(albumId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error no se pudo eliminar el albúm'
        });
    }

}

module.exports = {
    getAlbumes,
    crearAlbum,
    eliminarAlbum
}

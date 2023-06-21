const { response } = require('express');
const Artista = require('../models/artista');

const getArtistas = async (req, res = response) => {

    const artistas = await Artista.find().populate('nombreArtistico', 'nombre');

    res.json({
        ok: true,
        artistas
    });

}

const crearArtista = async (req, res = response) => {

    const { nombreArtistico } = new Artista(req.body);

    try {

        const existe = await Artista.findOne({ nombreArtistico })
        if (existe) {
            return res.status(400).json({
                ok: false,
                msg: 'El artista ya existe'
            });
        }

        const artista = new Artista(req.body);

        const artistaSave = await artista.save();

        res.status(201).json({
            ok: true,
            artistaSave
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error no se pudo registrar el artista'
        });
    }

}

const actualizarArtista = async (req, res = response) => {

    const artistaId = req.params.id;

    try {

        const artista = await Artista.findById(artistaId);

        if (!artista) {
            return res.status(404).json({
                ok: false,
                msg: `El equipo con id ${artistaId} no existe`
            });
        }

        const cambioArtista = {
            ...req.body
        }

        const artistaAct = await Artista.findByIdAndUpdate(artistaId, cambioArtista, { new: true });

        res.json({
            ok: true,
            artista: artistaAct
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error no se pudo actualizar el artista'
        });
    }

}

const eliminarArtista = async (req, res = response) => {

    const artistaId = req.params.id;

    try {

        const artista = await Artista.findById(artistaId);

        if (!artista) {
            res.status(404).json({
                ok: false,
                msg: `El artista con id ${artistaId} no existe`
            });
        }

        await Artista.findByIdAndDelete(artistaId);

        res.json({ ok: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error no se pudo eliminar el artista'
        });
    }


}

module.exports = {
    getArtistas,
    crearArtista,
    actualizarArtista,
    eliminarArtista
}
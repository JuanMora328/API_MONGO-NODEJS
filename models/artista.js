const { Schema, model } = require('mongoose');

const ArtistaSchema = Schema({

    nombre: {
        type: String,
        required: true
    },

    nombreArtistico: {
        type: String,
        required: true,
        unique: true
    },

    edad: {
        type: Number,
        required: true
    }

});

module.exports = model('Artista', ArtistaSchema);
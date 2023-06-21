const { Schema, model } = require('mongoose');

const AlbumSchema = Schema({

    titulo: {
        type: String,
        required: true,
        unique: true
    },

    lanzamiento: {
        type: Date,
        required: true
    },

    artista: {
        type: Schema.Types.ObjectId,
        ref: 'Artista',
        required: true
    }

});

module.exports = model('Album', AlbumSchema);
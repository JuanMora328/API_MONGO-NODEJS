const mongoose = require('mongoose');
const DB_URL = 'mongodb+srv://admin:admin@cluster0.ayvx5.mongodb.net/'

const dbConnection = async () => {
    try {

        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Se estableció conexión con la DB correctamente');

    } catch (error) {

        console.log(error);
        throw new Error('No se pudo conectar a la DB');
    }
}

module.exports = {
    dbConnection
}
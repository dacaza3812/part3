const {Schema, model} = require('mongoose');

const apagonSchema = new Schema({
    idApagon: Number,
    idCircuito: Number,
    idCodCircuito: String,
    zona: String,
    fechaApertura: Date,
    fechaCierre: Date
})

apagonSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Apagon = model('Apagon', apagonSchema);

module.exports = Apagon;
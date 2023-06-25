const mongoose = require("mongoose")

const connectionString = "mongodb://127.0.0.1/midudb"


mongoose.connect(connectionString)
    .then(() => {
        console.log("Database connected")
    }).catch(err => {
        console.error(err)
    })



/*
Note.find({}).then(result => {
    console.log(result);
    mongoose.connection.close()
})*/
/*
const note = new Note({
    content: "MongoDB es increible",
    date: new Date(),
    important: true
})    */
/*
note.save()  // devuelve el objeto que se ha creado
    .then(result => {
        console.log(result);
        mongoose.connection.close()
    })
    .catch(err => {
        console.error(err)
    })   
    */
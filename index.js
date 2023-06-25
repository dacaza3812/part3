require("./mongo.js")
//require("./mongo_apagon.js")



const express = require('express');
const app = express()

const Note = require("./models/Note");
const Apagon = require("./models/Apagon");
//const e = require("express");

app.use(express.json())

//let notes = []

app.get("/", (request, response) => { // Obtener HTML
    response.send("<h1>Hola Mundo</h1>")
})

app.get("/api/notes", (request, response) => {   // Obtener todas las notas
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get("/api/notes/:id", (request, response, next) => { // Obtener Nota por ID
  const {id} = request.params

  Note.findById(id).then( note => {
    if(note){
      return response.json(note)
    }else {
      response.status(400).end()
    }
  }).catch(err => {
    next(err)
  })
})
    
app.put("/api/notes/:id", (request, response, next) => { // Actualizar Nota por ID
  const {id} = request.params
  const note = request.body

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, {new: true})
    .then(result => {
      response.json(result)
    })
  })

app.delete("/api/notes/:id", (request, response)=> {  // Eliminar nota por ID
  const {id} = request.params

  Note.findByIdAndRemove(id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
  response.status(204).end()
})

app.post("/api/notes", (request, response) => {  // Añadir nueva Nota
  const note = request.body
  
  if(!note.content) {
    return response.status(400).json({
      error: "Required content field is missing"
    })
  }

  const newNote = new Note({
    content: note.content,
    date: new Date(),
    important: note.important || false
  })

  newNote.save().then(savedNote => {
    response.json(savedNote)
  })
})



app.use((request, response, next) => {
  response.status(404).end()
})

app.use((error, request, response, next) => {
  console.error(error)
  console.log(error.name)
  if(error.name === "CastError"){
    return response.status(400).send({error: "malformatted id"}).end()
  }else{
    response.status(500).end()
  }
}

)


const PORT = 3000
app.listen(PORT, () => (
    console.log(`Server Runing on port ${PORT}`)
))
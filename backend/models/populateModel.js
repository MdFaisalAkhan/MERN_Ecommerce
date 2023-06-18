const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true
    },
    age: Number,
    subject: String,
})
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        unique:true
    },
    students: [{type: 'ObjectId', ref:'Student'}]
})

const Student = mongoose.model("Studend",studentSchema);
const Class = mongoose.model("Class",classSchema);
import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/College").then(
    function (resolve) {
        console.log("database is connected")
    },
    function (reject) {
        console.log("Database did not connected")
    }
)

const studentsSchema = mongoose.Schema({
    RollNumber: Number,
    StudentName: String,
    StudentAge: Number,
})

const Student = mongoose.model("StudentsRecords", studentsSchema);

app.get("/studentrecords", async function (request, response) {
    const datas = await Student.find()
    response.send(datas)
})

app.post("/register", async function (request, response) {
    console.log(request.body)
    const saveRecord = await new Student({
        RollNumber: request.body.RollNumber,
        StudentName: request.body.StudentName,
        StudentAge: request.body.StudentAge,
    })
    saveRecord.save()
    response.send(await Student.find())
})

app.get("/delete", async function (request, response) {
    await Student.deleteOne({ _id: request.query.Id });
    response.send(await Student.find())
})

app.post('/update', async function (request, response) {
    await Student.updateOne(
        { _id: Id },
        {
            $set: {
                RollNumber: request.query.RollNumber,
                StudentName: request.query.StudentName,
                StudentAge: request.query.StudentAge
            }
        }
    );
    response.send(await Student.find())
});


app.listen(3001, function (err) {
    console.log("Server is started")
})
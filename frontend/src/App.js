import { useEffect, useState } from "react";


function App() {
  var [students, setStudents] = useState([])
  var [RollNumber, setRollNumber] = useState("")
  var [StudentName, setStudentName] = useState("")
  var [StudentAge, setStudentAge] = useState("")

  useEffect(function () {
    var studnetRecord = fetch("http://localhost:3001/studentrecords").then(
      function (response) {
        return response.json()
      },
      function (reject) {
        console.log(reject)
      }
    )
    studnetRecord.then(
      function (response) {
        setStudents(response)
      }
    )
  }, [students])


  function RollNumberHandle(e) {
    setRollNumber(e.target.value)
  }
  function setStudentNameHandle(e) {
    setStudentName(e.target.value)
  }
  function setStudentAgeHandle(e) {
    setStudentAge(e.target.value)
  }

  function deleteFunction(Id) {
    fetch(`http://localhost:3001/delete?Id=${Id}`)
  }

  function saveData(e) {
    e.preventDefault()
    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        RollNumber: RollNumber,
        StudentName: StudentName,
        StudentAge: StudentAge,
      })
    })
  }
  return (
    <div>
      <h1 className="header">Student App </h1>
      <form className="form">
        <input type="text" placeholder="RollNumber" value={RollNumber} onChange={RollNumberHandle} />
        <input type="text" placeholder="StudentName" value={StudentName} onChange={setStudentNameHandle} />
        <input type="number" placeholder="StudentAge" value={StudentAge} onChange={setStudentAgeHandle} />
        <input type="button" value="Create" onClick={saveData} />
      </form>
      <table>
        <thead>
          <tr>
            <th>RollNumber</th>
            <th>StudentName</th>
            <th>StudentAge</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            students.map(function (stud) {
              return (
                <tr key={stud._id}>
                  <td>{stud.RollNumber}</td>
                  <td>{stud.StudentName}</td>
                  <td>{stud.StudentAge}</td>
                  <td><button type="button" onClick={() => deleteFunction(stud._id)}>Delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>

  );
}

export default App;

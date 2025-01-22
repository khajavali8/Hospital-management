import React, { useEffect, useState } from "react";
import axios from "axios";

function AddPatients() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [patients, setPatients] = useState([]); 
  const [editableId, setEditableId] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    getPatients();
  }, []);

  let getPatients = async () => {
    try {
      let reqOptions = {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      };
      const response = await fetch("http://localhost:5001/Hos/getPatient", reqOptions);
      const result = await response.json();
      console.log(result);
      setPatients(result); 
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const sendSignupDataToServerThroughAxios = async () => {
    if (!name || !age || !gender) {
      alert("Please fill out all fields.");
      return;
    }

    const data = { name, age, gender };
    console.log(data);

    try {
      const response = await axios.post("http://localhost:5001/Hos/createPatient", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);
      alert("Patient added successfully!");
      getPatients(); 
    } catch (error) {
      alert("Error during Adding Patient:", error);
    }
  };

  const toggleEdit = (id) => {
    const patient = patients.find((patient) => patient._id === id);
    if (patient) {
      setEditableId(id);
      setEditedData({ ...patient });
    } else {
      setEditableId(null);
      setEditedData({
        name: "",
        age: "",
        gender: "",
      });
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/Hos/Patient/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save edit");
      }

      setPatients((data) =>
        data.map((patient) =>
          patient._id === id ? { ...patient, ...editedData } : patient
        )
      );
      setEditableId(null);
      getPatients();
      alert("Patient data updated successfully!");
    } catch (err) {
      console.error("Error while editing data:", err);
      alert("Error updating patient.");
    }
  };

  const deletePatientfromlist = async (id) => {
    try {
      if (!id) return;

      const response = await fetch(`http://localhost:5001/Hos/Patient/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }

      setPatients((data) => data.filter((patient) => patient._id !== id));
      alert("Patient deleted successfully!");
    } catch (err) {
      console.error("Error deleting patient:", err);
      alert("Error while deleting patient.");
    }
  };

  return (
    <div className="App">
      <br />
      <form>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>Add New Patient</h1>

        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age: </label>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Gender: </label>
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={sendSignupDataToServerThroughAxios}
          >
            Add Patient
          </button>
        </div>
      </form>

      <div>
        <h1>Patient List</h1>
        <ul>
          {patients && patients.length > 0 ? (
            patients.map((patient) => (
              <li className="dashboardLi" key={patient._id}>
                {editableId === patient._id ? (
                  <>
                    <div>
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) =>
                          setEditedData({ ...editedData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={editedData.age}
                        onChange={(e) =>
                          setEditedData({ ...editedData, age: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={editedData.gender}
                        onChange={(e) =>
                          setEditedData({ ...editedData, gender: e.target.value })
                        }
                      />
                    </div>
                    <button onClick={() => saveEdit(patient._id)}>Save</button>
                    <button onClick={() => toggleEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <b><p>Name: {patient.name}</p></b>
                    <p>Age: {patient.age}</p>
                    <p>Gender: {patient.gender}</p>
                    <button onClick={() => toggleEdit(patient._id)}>Edit</button>
                    <button
                      className="delete"
                      onClick={() => deletePatientfromlist(patient._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No patients found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AddPatients;

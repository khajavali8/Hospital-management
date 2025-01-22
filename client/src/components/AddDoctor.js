import React, { useEffect, useState } from "react";
import axios from "axios";

function AddDoctors() {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedData, setEditedData] = useState({
    name: "",
    specialty: "",
  });

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:5001/Hos/getDoctor");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const addDoctor = async () => {
    if (!name || !specialty) {
      alert("Please fill out all fields.");
      return;
    }

    const data = { name, specialty };

    try {
      await axios.post("http://localhost:5001/Hos/createDoctor", data);
      alert("Doctor added successfully!");
      getDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Error adding doctor.");
    }
  };

  const toggleEdit = (id) => {
    const doctor = doctors.find((doc) => doc._id === id);
    if (doctor) {
      setEditableId(id);
      setEditedData({ ...doctor });
    } else {
      setEditableId(null);
      setEditedData({
        name: "",
        specialty: "",
      });
    }
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5001/Hos/Doctor/${id}`, editedData);
      setEditableId(null);
      getDoctors();
      alert("Doctor updated successfully!");
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Error updating doctor.");
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/Hos/Doctor/${id}`);
      getDoctors();
      alert("Doctor deleted successfully!");
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Error deleting doctor.");
    }
  };

  return (
    <div className="App">
      <br />
      <form>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>Add New Doctor</h1>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Specialty: </label>
          <input
            type="text"
            placeholder="Specialty"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
        </div>
        <div>
          <button
            className="btn"
            type="button"
            onClick={addDoctor}
          >
            Add Doctor
          </button>
        </div>
      </form>

      <div>
        <h1>Doctor List</h1>
        <ul>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <li key={doctor._id}>
                {editableId === doctor._id ? (
                  <>
                    <input
                      type="text"
                      value={editedData.name}
                      onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                    />
                    <input
                      type="text"
                      value={editedData.specialty}
                      onChange={(e) => setEditedData({ ...editedData, specialty: e.target.value })}
                    />
                    <button onClick={() => saveEdit(doctor._id)}>Save</button>
                    <button onClick={() => toggleEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <p>Name: {doctor.name}</p>
                    <p>Specialty: {doctor.specialty}</p>
                    <button onClick={() => toggleEdit(doctor._id)}>Edit</button>
                    <button onClick={() => deleteDoctor(doctor._id)}>Delete</button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No doctors found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AddDoctors;

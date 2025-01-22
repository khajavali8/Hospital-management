import React, { useState, useEffect } from "react";
import axios from "axios";

function ManageAppointments() {
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedData, setEditedData] = useState({
    patientName: "",
    doctorName: "",
    date: "",
  });

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/Hos/getAppointment");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const createAppointment = async () => {
    if (!patientName || !doctorName || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const data = { patientName, doctorName, date };

    try {
      await axios.post("http://localhost:5001/Hos/createAppointment", data);
      alert("Appointment added successfully!");
      getAppointments(); // Refresh the appointment list
    } catch (error) {
      alert("Error adding appointment:", error);
    }
  };

  const toggleEdit = (id) => {
    const appointment = appointments.find((app) => app._id === id);
    if (appointment) {
      setEditableId(id);
      setEditedData({ ...appointment });
    } else {
      setEditableId(null);
      setEditedData({
        patientName: "",
        doctorName: "",
        date: "",
      });
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/Hos/Appointment/${id}`, editedData);
      if (response.status === 200) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === id ? { ...appointment, ...editedData } : appointment
          )
        );
        setEditableId(null);
        getAppointments();
        alert("Appointment updated successfully!");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error while saving appointment.");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/Hos/Appointment/${id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
      alert("Appointment deleted successfully!");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Error while deleting appointment.");
    }
  };

  return (
    <div className="App">
      <br />
      <form>
        <h1 style={{ textAlign: "center", color: "#007bff" }}>Add New Appointment</h1>

        <div>
          <label>Patient Name: </label>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Doctor Name: </label>
          <input
            type="text"
            placeholder="Doctor Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Appointment Date: </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            className="btn"
            type="button"
            onClick={createAppointment}
          >
            Add Appointment
          </button>
        </div>
      </form>

      <div>
        <h1>Appointment List</h1>
        <ul>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <li className="dashboardLi" key={appointment._id}>
                {editableId === appointment._id ? (
                  <>
                    <div>
                      <input
                        type="text"
                        value={editedData.patientName}
                        onChange={(e) =>
                          setEditedData({ ...editedData, patientName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={editedData.doctorName}
                        onChange={(e) =>
                          setEditedData({ ...editedData, doctorName: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <input
                        type="datetime-local"
                        value={editedData.date}
                        onChange={(e) =>
                          setEditedData({ ...editedData, date: e.target.value })
                        }
                      />
                    </div>
                    <button onClick={() => saveEdit(appointment._id)}>Save</button>
                    <button onClick={() => toggleEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <b><p>Patient: {appointment.patientName}</p></b>
                    <p>Doctor: {appointment.doctorName}</p>
                    <p>Date: {new Date(appointment.date).toLocaleString()}</p>
                    <button onClick={() => toggleEdit(appointment._id)}>Edit</button>
                    <button
                      className="delete"
                      onClick={() => deleteAppointment(appointment._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))
          ) : (
            <p>No appointments found</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ManageAppointments;

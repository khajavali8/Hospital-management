import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import dotenv from "dotenv";

dotenv.config();

class UserController {
  // Appointment
  async creatingAppointment(req, res) {
    try {
      const newAppointment = new Appointment(req.body);
      const savedAppointment = await newAppointment.save();
      res.status(201).json({ message: "Appointment booked successfully", savedAppointment });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getallAppointment(req, res) {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAppointmentId(req, res) {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(200).json(appointment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateAppointment(req, res) {
    try {
      const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(200).json(updatedAppointment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteAppointment(req, res) {
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
      if (!deletedAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Doctor
  async createDoctor(req, res) {
    try {
      const newDoctor = new Doctor(req.body);
      const savedDoctor = await newDoctor.save();
      res.status(201).json({ message: "Doctor added successfully", savedDoctor });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getallDoctor(req, res) {
    try {
      const doctors = await Doctor.find();
      res.status(200).json(doctors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDoctor(req, res) {
    try {
      const doctor = await Doctor.findById(req.params.id);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDoctor(req, res) {
    try {
      const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteDoctor(req, res) {
    try {
      const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
      if (!deletedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Patient
  async createPatient(req, res) {
    try {
      const newPatient = new Patient(req.body);
      const savedPatient = await newPatient.save();
      res.status(201).json({ message: "Patient added successfully", savedPatient });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getallPatient(req, res) {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getPatient(req, res) {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json(patient);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updatePatient(req, res) {
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json(updatedPatient);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletePatient(req, res) {
    try {
      const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
      if (!deletedPatient) {
        return res.status(404).json({ message: "Patient not found" });
      }
      res.status(200).json({ message: "Patient deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();

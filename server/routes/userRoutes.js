import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// All user routes
router.post('/createAppointment', userController.creatingAppointment);
router.get('/getAppointment', userController.getallAppointment);
router.get('/Appointment/:id', userController.getAppointmentId);
router.put('/Appointment/:id', userController.updateAppointment);
router.delete('/Appointment/:id', userController.deleteAppointment);



router.post('/createDoctor', userController.createDoctor);
router.get('/getDoctor', userController.getallDoctor);
router.get('/Doctor/:id', userController.getDoctor);
router.put('/Doctor/:id', userController.updateDoctor);
router.delete('/Doctor/:id', userController.deleteDoctor);


router.post('/createPatient', userController.createPatient);
router.get('/getPatient', userController.getallPatient);
router.get('/Patient/:id', userController.getPatient);
router.put('/Patient/:id', userController.updatePatient);
router.delete('/Patient/:id', userController.deletePatient);

export default router; 
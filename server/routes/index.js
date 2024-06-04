import express from "express";
// import { getPatients } from "../database/functions";
import { addProcedureToVisit, createDoctor, createPatient, createProcedure, createVisit, deleteDoctor, deletePatient, deleteProcedure, deleteVisit, deleteVisitProcedure, editDoctor, editPatient, editProcedure, editVisit, editVisitProcedure, findDoctor, findDoctorsWhoPerformedAllProceduresOfDoctorX, findDoctorsWhoPerformedMoreThanXProcedures, findDoctorsWhoPerformedProcedureWithCostBetweenXAndY, findDoctorsWhoPerformedProcedureX, findDoctorsWhoPerformedSameProceduresAsDoctorX, findPatient, findPatientsWhoUnderwentProcedureX, findProcedure, findTotalCostForPatientX, findVisit, findVisitProcedure, findVisitsOfPatientXToDoctorWithSpecializationY, getDoctors, getPatients, getProcedures, getVisits } from "../database/functions.js";
const router = express.Router();


//GET
router.get("/patients", async (req, res) => {
    try {
        const [patients] = await getPatients();
    
        return res.status(200).json({error: false, message: "Success", patients: patients});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/doctors", async (req, res) => {
    try {
        const [doctors] = await getDoctors();
    
        return res.status(200).json({error: false, message: "Success", doctors: doctors});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/procedures", async (req, res) => {
    try {
        const [procedures] = await getProcedures();
    
        return res.status(200).json({error: false, message: "Success", procedures: procedures});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/visits", async (req, res) => {
    try {
        const [visits] = await getVisits();
    
        return res.status(200).json({error: false, message: "Success", visits: visits});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});



router.get("/query-1", async (req, res) => {
    try {
        const [totalCost] = await findTotalCostForPatientX(req.query.patientID);
    
        return res.status(200).json({error: false, message: "Success", totalCost: totalCost});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-2", async (req, res) => {
    try {
        const [doctors] = await findDoctorsWhoPerformedProcedureX(req.query.procedureName);
    
        return res.status(200).json({error: false, message: "Success", doctors: doctors});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-3", async (req, res) => {
    try {
        const [doctorsAndProcedure] = await findDoctorsWhoPerformedProcedureWithCostBetweenXAndY(req.query.fromCost, req.query.toCost);
    
        return res.status(200).json({error: false, message: "Success", doctorsAndProcedure: doctorsAndProcedure});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});


router.get("/query-4", async (req, res) => {
    try {
        const [patients] = await findPatientsWhoUnderwentProcedureX(req.query.procedureName);
    
        return res.status(200).json({error: false, message: "Success", patients: patients});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-5", async (req, res) => {
    try {
        const [visits] = await findVisitsOfPatientXToDoctorWithSpecializationY(req.query.patientID, req.query.specialization);
    
        return res.status(200).json({error: false, message: "Success", visits: visits});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-6", async (req, res) => {
    try {
        console.log(req.query.count)
        const [doctors] = await findDoctorsWhoPerformedMoreThanXProcedures(req.query.count);
    
        return res.status(200).json({error: false, message: "Success", doctors: doctors});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-7", async (req, res) => {
    try {
        const [doctors] = await findDoctorsWhoPerformedSameProceduresAsDoctorX(req.query.doctorID);
    
        return res.status(200).json({error: false, message: "Success", doctors: doctors});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.get("/query-8", async (req, res) => {
    try {
        const [doctors] = await findDoctorsWhoPerformedAllProceduresOfDoctorX(req.query.doctorID);
    
        return res.status(200).json({error: false, message: "Success", doctors: doctors});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});



//POST
router.post("/doctors", async (req, res) => {
    try {
        const {firstName, lastName, specialization, phoneNumber, email} = req.body;
        await createDoctor(firstName, lastName, specialization, phoneNumber, email);
    
        return res.status(200).json({error: false, message: "Successfully created"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.post("/patients", async (req, res) => {
    try {
        const {firstName, lastName, dateOfBirth, phoneNumber, address} = req.body;
        await createPatient(firstName, lastName, dateOfBirth, phoneNumber, address);
    
        return res.status(200).json({error: false, message: "Successfully created"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.post("/procedures", async (req, res) => {
    try {
        const {procedureName, procedureDescription} = req.body;

        await createProcedure(procedureName, procedureDescription);
    
        return res.status(200).json({error: false, message: "Successfully created"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.post("/visits", async (req, res) => {
    try {
        const {visitDate, patientID, doctorID, reasonForVisit, procedures} = req.body;

        const [patient] = await findPatient(patientID);
        const [doctor] = await findDoctor(doctorID);

        if(patient.length < 1) {
            return res.status(400).json({error: false, message: "Пацієнта з таким ID не знайдено"});
        }
        if(doctor.length < 1) {
            return res.status(400).json({error: false, message: "Лікаря з таким ID не знайдено"});
        }

        //Create visit
        const [createdVisit] = await createVisit(visitDate, patientID, doctorID, reasonForVisit);

        //Add procedures to the visit
        for (const object of procedures) {
            await addProcedureToVisit(createdVisit.insertId, object.procedureID, object.cost);
        }
    
        return res.status(200).json({error: false, message: "Successfully created"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.post("/visits/procedure", async (req, res) => {
    try {
        const [visit] = await findVisit(req.body.visitID);
        const [procedure] = await findProcedure(req.body.procedureID);
        const [visitProcedure] = await findVisitProcedure(req.body.visitID, req.body.procedureID)
        if(visitProcedure.length > 0){
             return res.status(400).json({error: false, message: "Даний візит уже має цю процедуру"});
         }
 
        if(visit.length < 1){
            return res.status(400).json({error: false, message: "Візиту з таким ID не знайдено"});
        }

        if(procedure.length < 1){
            return res.status(400).json({error: false, message: "Процедури з таким ID не знайдено"});
        }
        await addProcedureToVisit(req.body.visitID, req.body.procedureID, req.body.cost);
    
        return res.status(200).json({error: false, message: "Successfully added"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

//PATCH
router.patch("/procedures", async (req, res) => {
    try {
        const [procedure] = await findProcedure(req.body.procedureID);
        if(procedure.length < 1){
            return res.status(400).json({error: false, message: "Процедуру з таким ID не знайдено"});
        }

        for (const object of req.body.newData) {
            await editProcedure(object.column, object.value, req.body.procedureID);
        }
    
        return res.status(200).json({error: false, message: "Successfully edited"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.patch("/patients", async (req, res) => {
    try {
        const [patient] = await findPatient(req.body.patientID);
        if(patient.length < 1){
            return res.status(400).json({error: false, message: "Пацієнта з таким ID не знайдено"});
        }

        for (const object of req.body.newData) {
            await editPatient(object.column, object.value, req.body.patientID);
        }
    
        return res.status(200).json({error: false, message: "Successfully edited"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.patch("/doctors", async (req, res) => {
    try {
        const [doctor] = await findDoctor(req.body.doctorID);
        if(doctor.length < 1){
            return res.status(400).json({error: false, message: "Лікаря з таким ID не знайдено"});
        }

        for (const object of req.body.newData) {
            await editDoctor(object.column, object.value, req.body.doctorID);
        }
    
        return res.status(200).json({error: false, message: "Successfully edited"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
            
        }
});

router.patch("/visits", async (req, res) => {
    try {
        const [visit] = await findVisit(req.body.visitID);
        if(visit.length < 1){
            return res.status(400).json({error: false, message: "Візиту з таким ID не знайдено"});
        }

        for (const object of req.body.newData) {
            await editVisit(object.column, object.value, req.body.visitID);
        }
    
        return res.status(200).json({error: false, message: "Successfully edited"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
            
        }
});

router.patch("/visits/procedure", async (req, res) => {
    try {
        const [visit] = await findVisit(req.body.visitID);
        const [procedure] = await findProcedure(req.body.procedureID);

        if(visit.length < 1){
            return res.status(400).json({error: false, message: "Візиту з таким ID не знайдено"});
        }

        if(procedure.length < 1){
            return res.status(400).json({error: false, message: "Процедури з таким ID не знайдено"});
        }

        for (const object of req.body.newData) {
            await editVisitProcedure(object.column, object.value, req.body.visitID, req.body.procedureID);
        }
    
        return res.status(200).json({error: false, message: "Successfully edited"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

//DELETE
router.delete("/visits", async (req, res) => {
    try {
        const [visit] = await findVisit(req.body.visitID);
        if(visit.length < 1){
            return res.status(400).json({error: false, message: "Візиту з таким ID не знайдено"});
        }

        await deleteVisit(req.body.visitID)
    
        return res.status(200).json({error: false, message: "Successfully deleted"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.delete("/procedures", async (req, res) => {
    try {
        const [procedure] = await findProcedure(req.body.procedureID);
        if(procedure.length < 1){
            return res.status(400).json({error: false, message: "Процедури з таким ID не знайдено"});
        }

        await deleteProcedure(req.body.procedureID)
    
        return res.status(200).json({error: false, message: "Successfully deleted"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.delete("/patients", async (req, res) => {
    try {
        const [patient] = await findPatient(req.body.patientID);

        if(patient.length < 1) {
            return res.status(400).json({error: false, message: "Пацієнта з таким ID не знайдено"});
        }

        await deletePatient(req.body.patientID)
    
        return res.status(200).json({error: false, message: "Successfully deleted"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.delete("/doctors", async (req, res) => {
    try {
        const [doctor] = await findDoctor(req.body.doctorID);

        if(doctor.length < 1) {
            return res.status(400).json({error: false, message: "Лікаря з таким ID не знайдено"});
        }

        await deleteDoctor(req.body.doctorID)
    
        return res.status(200).json({error: false, message: "Successfully deleted"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});

router.delete("/visits/procedure", async (req, res) => {
    try {
        const [visit] = await findVisit(req.body.visitID);
        if(visit.length < 1){
            return res.status(400).json({error: false, message: "Візиту з таким ID не знайдено"});
        }

       const [visitProcedure] = await findVisitProcedure(req.body.visitID, req.body.procedureID)
       if(visitProcedure.length < 1){
            return res.status(400).json({error: false, message: "Даний візит не має процедури з таким ID"});
        }

        await deleteVisitProcedure(req.body.visitID, req.body.procedureID)
    
        return res.status(200).json({error: false, message: "Successfully deleted"});
        
        } catch (error) {
            return res.status(500).json({error: true, message: error.message});
        }
});



export default router;
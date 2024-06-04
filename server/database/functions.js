import pool from "./config.js"

//------------------------
//View 
export function getPatients() {
    return pool.execute(`
        SELECT * FROM patients
    `);
}

export function getDoctors() {
    return pool.execute(`
        SELECT * FROM doctors
    `);
}

export function getProcedures() {
    return pool.execute(`
        SELECT * FROM procedures
    `);
}

export function getVisits() {
    return pool.execute(`
        SELECT v.*, vp.PerformedProceduresIDs, vp.TotalCost
        FROM visits v
        JOIN (
            SELECT VisitID, GROUP_CONCAT(ProcedureID) AS PerformedProceduresIDs, SUM(Cost) AS TotalCost
            FROM visit_procedures
            GROUP BY VisitID
        ) vp ON v.VisitID = vp.VisitID
    `);
}
//------------------------
//Create
export function createDoctor(firstName, lastName, specialization, phoneNumber, email) {
    return pool.execute(`
        INSERT INTO doctors(FirstName, LastName, Specialization, PhoneNumber, Email)
        VALUES(?, ?, ?, ?, ?)
    `, [firstName, lastName, specialization, phoneNumber, email]);
}

export function createPatient(firstName, lastName, dateOfBirth, phoneNumber, address) {
    return pool.execute(`
        INSERT INTO patients(FirstName, LastName, DateOfBirth, PhoneNumber, Address)
        VALUES(?, ?, ?, ?, ?)
    `, [firstName, lastName, dateOfBirth, phoneNumber, address]);
}

export function createProcedure(procedureName, procedureDescription) {
    return pool.execute(`
        INSERT INTO procedures(ProcedureName, ProcedureDescription)
        VALUES(?, ?)
    `, [procedureName, procedureDescription]);
}

export function createVisit(visitDate, patientID, doctorID, reasonForVisit) {
    return pool.execute(`
        INSERT INTO visits(VisitDate, PatientID, DoctorID, ReasonForVisit)
        VALUES(?, ?, ?, ?)
    `, [visitDate, patientID, doctorID, reasonForVisit]);
}

export function addProcedureToVisit(visitID, procedureID, cost) {
    return pool.execute(`
        INSERT INTO visit_procedures(VisitID, ProcedureID, Cost)
        VALUES(?, ?, ?)
    `, [visitID, procedureID, cost]);
}
//------------------------
//Delete
export async function deleteProcedure(procedureID) {
    await pool.execute(`
        DELETE FROM visit_procedures
        WHERE procedureID = ?
    `, [procedureID]);

    return pool.execute(`
       DELETE FROM procedures
       WHERE procedureID = ?
    `, [procedureID]);
}

export async function deletePatient(patientID) {
    await pool.execute(`
        DELETE FROM visit_procedures
        WHERE visitID IN (
            SELECT visitID
            FROM visits
            WHERE patientID = ?
        )
    `, [patientID]);

    await pool.execute(`
    DELETE FROM visits
    WHERE patientID = ?
    `, [patientID]);

    return pool.execute(`
       DELETE FROM patients
       WHERE patientID = ?
    `, [patientID]);
}

export async function deleteDoctor(doctorID) {
     await pool.execute(`
        DELETE FROM visit_procedures
        WHERE visitID IN (
            SELECT visitID
            FROM visits
            WHERE doctorID = ?
        )
    `, [doctorID]);

    await pool.execute(`
       DELETE FROM visits
       WHERE doctorID = ?
    `, [doctorID]);

    return pool.execute(`
       DELETE FROM doctors
       WHERE doctorID = ?
    `, [doctorID]);
}


export async function deleteVisit(visitID) {
    await pool.execute(`
        DELETE FROM visit_procedures
        WHERE visitID = ?
    `, [visitID]);

    return pool.execute(`
       DELETE FROM visits
       WHERE visitID = ?
    `, [visitID]);
}
//------------------------

//Edit
export function editDoctor(column, value, doctorID) {
    return pool.execute(`
        UPDATE doctors
        SET ${column} = ? WHERE doctorID = ?
    `, [value, doctorID]);
}

export function editPatient(column, value, patientID) {
    return pool.execute(`
        UPDATE patients
        SET ${column} = ? WHERE patientID = ?
    `, [value, patientID]);
}

export function editProcedure(column, value, procedureID) {
    return pool.execute(`
        UPDATE procedures
        SET ${column} = ? WHERE procedureID = ?
    `, [value, procedureID]);
}

export function editVisit(column, value, visitID) {
    return pool.execute(`
        UPDATE visits
        SET ${column} = ? WHERE visitID = ?
    `, [value, visitID]);
}

export function editVisitProcedure(column, value, visitID, procedureID) {
    return pool.execute(`
        UPDATE visit_procedures
        SET ${column} = ? WHERE visitID = ? AND procedureID = ?
    `, [value, visitID, procedureID]);
}

export function deleteVisitProcedure(visitID, procedureID) {
    return pool.execute(`
        DELETE FROM visit_procedures
       WHERE visitID = ? AND procedureID = ?
    `, [visitID, procedureID]);
}

//------------------------
//Queries
export function findVisitsOfPatientXToDoctorWithSpecializationY(patientID, specialization) {
    return pool.execute(`
        SELECT v.VisitID, v.VisitDate, v.ReasonForVisit, p.patientID, d.DoctorID, d.FirstName AS DoctorFirstName, d.LastName AS DoctorLastName,d.Specialization
        FROM  Visits v
        JOIN Doctors d ON v.DoctorID = d.DoctorID
        JOIN  Patients p ON v.PatientID = p.PatientID
        WHERE  v.PatientID = ? AND d.Specialization = ?; 
    `, [patientID, specialization]);
}

export function findPatientsWhoUnderwentProcedureX(procedureName) {
    return pool.execute(`
        SELECT DISTINCT p.PatientID, p.FirstName, p.LastName
        FROM Patients p
        JOIN Visits v ON p.PatientID = v.PatientID
        JOIN Visit_Procedures vp ON v.VisitID = vp.VisitID
        JOIN Procedures pr ON vp.ProcedureID = pr.ProcedureID
        WHERE pr.ProcedureName = ?;
    `, [procedureName]);
}

export function findDoctorsWhoPerformedProcedureX(procedureName) {
    return pool.execute(`
        SELECT DISTINCT d.DoctorID, d.FirstName AS DoctorFirstName, d.LastName AS DoctorLastName, d.Specialization, d.PhoneNumber, d.Email
        FROM Doctors d
        JOIN Visits v ON d.DoctorID = v.DoctorID
        JOIN Visit_Procedures vp ON v.VisitID = vp.VisitID
        JOIN Procedures mp ON vp.ProcedureID = mp.ProcedureID
        WHERE mp.ProcedureName = ?;
    `, [procedureName]);
}


export function findDoctorsWhoPerformedProcedureWithCostBetweenXAndY(costFrom, costTo) {
    return pool.execute(`
        SELECT d.DoctorID, d.FirstName AS DoctorFirstName, d.LastName AS DoctorLastName, d.Specialization, d.PhoneNumber, d.Email, mp.ProcedureName, vp.Cost
        FROM Doctors d
        JOIN Visits v ON d.DoctorID = v.DoctorID
        JOIN Visit_Procedures vp ON v.VisitID = vp.VisitID
        JOIN Procedures mp ON vp.ProcedureID = mp.ProcedureID
        WHERE  vp.Cost BETWEEN ? AND ?;
    `, [costFrom, costTo]);
}


export function findTotalCostForPatientX(patientID) {
    return pool.execute(`
        SELECT  v.PatientID, SUM(vp.Cost) AS TotalCost
        FROM Visits v
        JOIN  Visit_Procedures vp ON v.VisitID = vp.VisitID
        WHERE  v.PatientID = ?
        GROUP BY v.PatientID;
    `, [patientID]);
}

//--
export function findDoctorsWhoPerformedSameProceduresAsDoctorX(doctorID) {
    return pool.execute(`
        SELECT DISTINCT d2.DoctorID, d2.FirstName, d2.LastName, d2.specialization
        FROM Doctors d1
        JOIN Visits v1 ON d1.DoctorID = v1.DoctorID
        JOIN Visit_Procedures vp1 ON v1.VisitID = vp1.VisitID
        JOIN Doctors d2 ON d2.DoctorID != d1.DoctorID
        JOIN Visits v2 ON d2.DoctorID = v2.DoctorID
        JOIN Visit_Procedures vp2 ON v2.VisitID = vp2.VisitID AND vp1.ProcedureID = vp2.ProcedureID
        WHERE d1.DoctorID = ?;
    `, [doctorID]);
}

export function findDoctorsWhoPerformedAllProceduresOfDoctorX(doctorID) {
    return pool.execute(`
        SELECT DISTINCT d2.DoctorID, d2.FirstName, d2.LastName, d2.specialization
        FROM Doctors d1
        JOIN Visits v1 ON d1.DoctorID = v1.DoctorID
        JOIN Visit_Procedures vp1 ON v1.VisitID = vp1.VisitID
        JOIN Doctors d2 ON d2.DoctorID != d1.DoctorID
        JOIN Visits v2 ON d2.DoctorID = v2.DoctorID
        JOIN Visit_Procedures vp2 ON v2.VisitID = vp2.VisitID
        WHERE d1.DoctorID = ? 
        GROUP BY d2.DoctorID
        HAVING COUNT(DISTINCT vp1.ProcedureID) = COUNT(DISTINCT CASE WHEN vp1.ProcedureID = vp2.ProcedureID THEN vp2.ProcedureID ELSE NULL END);
    `, [doctorID]);
}


export function findDoctorsWhoPerformedMoreThanXProcedures(count) {
    return pool.execute(`
    SELECT d.FirstName, d.LastName, d.Specialization
    FROM Doctors d
    JOIN Visits v ON d.DoctorID = v.DoctorID
    JOIN Visit_Procedures vp ON v.VisitID = vp.VisitID
    GROUP BY d.DoctorID, d.FirstName, d.LastName, d.Specialization
    HAVING COUNT(DISTINCT vp.ProcedureID) > ?;
    `, [count]);
}
//------------------------
//Additional
export function findProcedure(procedureID) {
    return pool.execute(`
       SELECT * FROM procedures
       WHERE procedureID = ?
    `, [procedureID]);
}

export function findDoctor(doctorID) {
    return pool.execute(`
       SELECT * FROM doctors
       WHERE doctorID = ?
    `, [doctorID]);
}

export function findPatient(patientID) {
    return pool.execute(`
       SELECT * FROM patients
       WHERE patientID = ?
    `, [patientID]);
}

export function findVisit(visitID) {
    return pool.execute(`
       SELECT * FROM visits
       WHERE visitID = ?
    `, [visitID]);
}

export function findVisitProcedure(visitID, procedureID) {
    return pool.execute(`
       SELECT * FROM visit_procedures
       WHERE visitID = ? AND procedureID = ?
    `, [visitID, procedureID]);
}

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//-------------------
//Get
export const getPatients = () => {
  return instance.get(`/patients`);
};

export const getDoctors = () => {
  return instance.get(`/doctors`);
};

export const getProcedures = () => {
  return instance.get(`/procedures`);
};

export const getVisits = () => {
  return instance.get(`/visits`);
};

export const getTotalCostForPatientX = (params) => {
  return instance.get(`/query-1${params}`);
};

export const getDoctorsWhoPerformedProcedureX = (params) => {
  return instance.get(`/query-2${params}`);
};

export const getDoctorsWhoPerformedProcedureWithCostBetweenXAndY = (params) => {
  return instance.get(`/query-3${params}`);
};

export const getPatientsWhoUnderwentProcedureX = (params) => {
  return instance.get(`/query-4${params}`);
};

export const getVisitsOfPatientXToDoctorWithSpecializationY = (params) => {
  return instance.get(`/query-5${params}`);
};

export const getDoctorsWhoPerformedMoreThanXProcedures = (params) => {
  return instance.get(`/query-6${params}`);
};

export const getDoctorsWhoPerformedSameProceduresAsDoctorX = (params) => {
  return instance.get(`/query-7${params}`);
};

export const getDoctorsWhoPerformedAllProceduresOfDoctorX = (params) => {
  return instance.get(`/query-8${params}`);
};
//-------------------
//Create
export const createDoctor = (data) => {
  return instance.post(`/doctors`, data);
};

export const createPatient = (data) => {
  return instance.post(`/patients`, data);
};

export const createProcedure = (data) => {
  return instance.post(`/procedures`, data);
};

export const createVisit = (data) => {
  return instance.post(`/visits`, data);
};

export const createVisitProcedure = (data) => {
  return instance.post(`/visits/procedure`, data);
};
//-------------------
//Edit
export const editPatient = (data) => {
  return instance.patch(`/patients`, data);
};

export const editDoctor = (data) => {
  return instance.patch(`/doctors`, data);
};

export const editProcedure = (data) => {
  return instance.patch(`/procedures`, data);
};

export const editVisit = (data) => {
  return instance.patch(`/visits`, data);
};

export const editVisitProcedure = (data) => {
  return instance.patch(`/visits/procedure`, data);
};
//-------------------
//Delete
export const deleteVisitProcedure = (data) => {
  return instance.delete(`/visits/procedure`, {data});
};
export const deleteVisit = (data) => {
  return instance.delete(`/visits`, {data});
};
export const deleteProcedure = (data) => {
  return instance.delete(`/procedures`, {data});
};
export const deletePatient = (data) => {
  return instance.delete(`/patients`, {data});
};
export const deleteDoctor = (data) => {
  return instance.delete(`/doctors`, {data});
};

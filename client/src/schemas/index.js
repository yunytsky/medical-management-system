import * as yup from "yup";

function isDateValid(value) {
  if (!value) return true;

  const now = new Date();

  const parts = value.split('-').map(Number); // split the date string and convert parts to numbers
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  
  const date = new Date(year, month - 1, day);
  
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 && 
    date.getDate() === day &&
    date < now
  );
}

export const newPatientSchema = yup.object().shape({
  firstName: yup.string().required("Введення імені є обов'язковим"),
  lastName: yup.string().required("Введення прізвища є обов'язковим"),
  dateOfBirth: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Дата народження повинна бути у форматі РРРР-ММ-ДД").test('is-valid-date', 'Некоректна дата', isDateValid)
  .required("Введення дати народження є обов'язковим"),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Номер телефону має бути в форматі XXX-XXX-XXXX")
    .required("Введення номеру телефона є обов'язковим"),
  address: yup.string().required("Введненя адреси є обов'язковим"),
});

export const newDoctorSchema = yup.object().shape({
  firstName: yup.string().required("Введення імені є обов'язковим"),
  lastName: yup.string().required("Введення прізвища є обов'язковим"),
  specialization: yup.string().required("Введення спеціалізації є обов'язковим"),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Номер телефону має бути в форматі XXX-XXX-XXXX")
    .required("Введення номеру телефона є обов'язковим"),
  email: yup.string().email("Введіть дійсну електронну адресу").required("Введення електронної адреси є обов'язковим"),
});

export const newProcedureSchema = yup.object().shape({
  procedureName: yup.string().required("Введення назви процедури є обов'язковим"),
  procedureDescription: yup.string().required("Введення опису процедури є обов'язковим"),
});

export const newVisitSchema = yup.object().shape({
  visitDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Дата повинна бути у форматі РРРР-ММ-ДД").test('is-valid-date', 'Некоректна дата', isDateValid)
  .required("Введення дати є обов'язковим"),
  patientID: yup.number().required("Введення ID пацієнта є обов'язковим"),
  doctorID: yup.number().required("Введення ID лікаря є обов'язковим"),
  reasonForVisit: yup.string().required("Введення причини візиту є обов'язковим"),
  procedures: yup.array().of(
    yup.object().shape({
      procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
      cost: yup.number().min(0, "Вартість не може бути менше за 0").required("Введення вартості процедури є обов'язковим")
    })
  ) .min(1, "Повинна бути принаймні одна процедура")
  .test(
    "unique-procedureID",
    "Процедури повинні бути унікальними",
    (procedures) => {
      const procedureIDs = procedures.map((procedure) => procedure.procedureID);
      const uniqueIDs = new Set(procedureIDs);
      return uniqueIDs.size === procedureIDs.length;
    }
  )
});


export const newVisitProcedureSchema = yup.object().shape({
  visitID: yup.number().required("Введення ID візиту є обов'язковим"),
  procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
  cost: yup.number().min(0, "Вартість не може бути менше за 0").required("Введення вартості процедури є обов'язковим")

});


export const editDoctorSchema = yup.object().shape({
  doctorID: yup.number().required("Введення ID лікаря є обов'язковим"),
  firstName: yup.string(),
  lastName: yup.string(),
  specialization: yup.string(),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Номер телефону має бути в форматі XXX-XXX-XXXX"),
  email: yup.string().email("Введіть дійсну електронну адресу"),
});

export const editPatientSchema = yup.object().shape({
  patientID: yup.number().required("Введення ID пацієнта є обов'язковим"),
  firstName: yup.string(),
  lastName: yup.string(),
  dateOfBirth: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Дата народження повинна бути у форматі РРРР-ММ-ДД").test('is-valid-date', 'Некоректна дата', isDateValid),
  phoneNumber: yup
    .string()
    .matches(/^\d{3}-\d{3}-\d{4}$/, "Номер телефону має бути в форматі XXX-XXX-XXXX"),
  address: yup.string(),
});

export const editProcedureSchema = yup.object().shape({
  procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
  procedureName: yup.string(),
  procedureDescription: yup.string(),
});

export const editVisitSchema = yup.object().shape({
  visitID: yup.number().required("Введення ID візиту є обов'язковим"),
  visitDate: yup.string().matches(/^\d{4}-\d{2}-\d{2}$/, "Дата повинна бути у форматі РРРР-ММ-ДД").test('is-valid-date', 'Некоректна дата', isDateValid),
  patientID: yup.number(),
  doctorID: yup.number(),
  reasonForVisit: yup.string(),
});

export const editVisitProcedureSchema = yup.object().shape({
  visitID: yup.number().required("Введення ID візиту є обов'язковим"),
  procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
  cost: yup.number().min(0, "Вартість не може бути менше за 0")
});

export const deleteVisitProcedureSchema = yup.object().shape({
  visitID: yup.number().required("Введення ID візиту є обов'язковим"),
  procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
});

export const deleteVisitSchema = yup.object().shape({
  visitID: yup.number().required("Введення ID візиту є обов'язковим"),
});

export const deletePatientSchema = yup.object().shape({
  patientID: yup.number().required("Введення ID пацієнта є обов'язковим"),
});

export const deleteProcedureSchema = yup.object().shape({
  procedureID: yup.number().required("Введення ID процедури є обов'язковим"),
});

export const deleteDoctorSchema = yup.object().shape({
  doctorID: yup.number().required("Введення ID лікаря є обов'язковим"),
});

export const querySchema1 = yup.object().shape({
  patientID: yup.number().required("Введення ID пацієнта є обов'язковим"),
});


export const querySchema2 = yup.object().shape({
  procedureName: yup.string().required("Введення назви процедури є обов'язковим")
});


export const querySchema3 = yup.object().shape({
  fromCost: yup.number().min(0, "Вартість не може бути менше за 0").required("Введення нижньої межі є обов'язковим"),
  toCost: yup.number().min(0, "Вартість не може бути менше за 0").required("Введення верхньої межі є обов'язковим")
});

export const querySchema4 = yup.object().shape({
  procedureName: yup.string().required("Введення назви процедури є обов'язковим")
});

export const querySchema5 = yup.object().shape({
  patientID: yup.number().required("Введення ID пацієнта є обов'язковим"),
  specialization: yup.string().required("Введення спеціалізації є обов'язковим"),
});

export const querySchema6 = yup.object().shape({
  count: yup.number().min(0, "Значення не може бути менше за 0").required("Поле є обов'язковим"),
});

export const querySchema7And8 = yup.object().shape({
  doctorID: yup.number().required("Введення ID лікаря є обов'язковим"),
});
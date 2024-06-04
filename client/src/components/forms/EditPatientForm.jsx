import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editPatientSchema } from "../../schemas";
import {editPatient } from "../../api";

const EditPatientForm = () => {
  const [submitError, setSubmitError] = useState({ error: false, message: "" });
  const [updatedMessageVisible, setUpdatedMessageVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      if (submitError) {
        setSubmitError({ error: false, message: "" });
      }
      if(updatedMessageVisible){
        setUpdatedMessageVisible(false);
      }

      if(!values.firstName && !values.lastName && !values.dateOfBirth && !values.phoneNumber && !values.address){
        return;
      }

 
      const data = {patientID: values.patientID, newData: []}
      if(values.firstName){
        data.newData.push({column: "firstName", value: values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase()})
      }
      if(values.lastName){
        data.newData.push({column: "lastName", value: values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase()})
      }
      if(values.dateOfBirth){
        data.newData.push({column: "dateOfBirth", value: values.dateOfBirth})
      }
      if(values.phoneNumber){
        data.newData.push({column: "phoneNumber", value: values.phoneNumber})
      }
      if(values.address){
        data.newData.push({column: "address", value: values.address})
      }

      const res = await editPatient(data)

      actions.resetForm();
      setUpdatedMessageVisible(true);
       setTimeout(() => {
        setUpdatedMessageVisible(false);
      }, 6000);

    } catch (error) {
      if (error.response && error.response.data.message) {
        setSubmitError({ error: true, message: error.response.data.message });
      } else {
        setSubmitError({ error: true, message: "Error" });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      patientID: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      address: ""
    },
    validationSchema: editPatientSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Patient ID */}
      <label className="form-label" htmlFor="patientID">
        ID пацієнта <Link target="_blank" to={"/view/patients"}>(Список пацієнтів)</Link>
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="patientID"
        id="patientID"
        value={formik.values.patientID}
        onChange={formik.handleChange}
      />

      {formik.errors.patientID && formik.touched.patientID && (
        <span className="form-error">{formik.errors.patientID}</span>
      )}

      {/* First Name */}
      <label className="form-label" htmlFor="firstName">
        Ім'я
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="firstName"
        id="firstName"
        value={formik.values.firstName}
        onChange={formik.handleChange}
      />

      {formik.errors.firstName && formik.touched.firstName && (
        <span className="form-error">{formik.errors.firstName}</span>
      )}

      {/* Last Name */}
      <label className="form-label" htmlFor="lastName">
        Прізвище
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="lastName"
        id="lastName"
        value={formik.values.lastName}
        onChange={formik.handleChange}
      />

      {formik.errors.lastName && formik.touched.lastName && (
        <span className="form-error">{formik.errors.lastName}</span>
      )}

      {/* Date of birth */}
      <label className="form-label" htmlFor="dateOfBirth">
        Дата народження (РРРР-ММ-ДД)
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="dateOfBirth"
        id="dateOfBirth"
        value={formik.values.dateOfBirth}
        onChange={formik.handleChange}
      />

      {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
        <span className="form-error">{formik.errors.dateOfBirth}</span>
      )}

      {/* Phone number */}
      <label className="form-label" htmlFor="phoneNumber">
        Номер телефону
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="phoneNumber"
        id="phoneNumber"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
      />

      {formik.errors.phoneNumber && formik.touched.phoneNumber && (
        <span className="form-error">{formik.errors.phoneNumber}</span>
      )}

    {/* Address */}
        <label className="form-label" htmlFor="address">
        Адреса (вул., буд.)
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="address"
        id="address"
        value={formik.values.address}
        onChange={formik.handleChange}
      />

      {formik.errors.address && formik.touched.address && (
        <span className="form-error">{formik.errors.address}</span>
      )}

      {updatedMessageVisible && (<span className="form-updated-message">Запис оновлено ✓</span>)}

      {/* Buttons */}
      <div className="actions">
        <button onClick={() => {navigate(-1)}} type="button" className="button empty">
            Назад
        </button>
        <button type="submit" className="button" disabled={formik.isSubmitting}>
          Редагувати
        </button>
      </div>

      {/* Submit error */}
      {submitError.error && (
        <span className="form-submit-error">{submitError.message}</span>
      )}
    </form>
  );
};

export default EditPatientForm;

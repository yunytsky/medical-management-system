import {useState } from "react";
import {  Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {  editDoctorSchema } from "../../schemas";
import { editDoctor } from "../../api";

const EditDoctorForm = () => {
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

      if(!values.firstName && !values.lastName && !values.specialization && !values.phoneNumber && !values.email){
        return;
      }

 
      const data = {doctorID: values.doctorID, newData: []}
      if(values.firstName){
        data.newData.push({column: "firstName", value: values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase()})
      }
      if(values.lastName){
        data.newData.push({column: "lastName", value: values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase()})
      }
      if(values.specialization){
        data.newData.push({column: "specialization", value: values.specialization.charAt(0).toUpperCase() + values.specialization.slice(1).toLowerCase()})
      }
      if(values.phoneNumber){
        data.newData.push({column: "phoneNumber", value: values.phoneNumber})
      }
      if(values.email){
        data.newData.push({column: "email", value: values.email.toLowerCase()})
      }

      const res = await editDoctor(data)

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
      doctorID: "",
      firstName: "",
      lastName: "",
      specialization: "",
      phoneNumber: "",
      email: ""
    },
    validationSchema: editDoctorSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-doctor-form form">
      {/* Doctor ID */}
      <label className="form-label" htmlFor="doctorID">
        ID лікаря <Link target="_blank" to={"/view/doctors"}>(Список лікарів)</Link>
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="doctorID"
        id="doctorID"
        value={formik.values.doctorID}
        onChange={formik.handleChange}
      />

      {formik.errors.doctorID && formik.touched.doctorID && (
        <span className="form-error">{formik.errors.doctorID}</span>
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

      {/* Specialization */}
      <label className="form-label" htmlFor="specialization">
        Спеціалізація
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="specialization"
        id="specialization"
        value={formik.values.specialization}
        onChange={formik.handleChange}
      />

      {formik.errors.specialization && formik.touched.specialization && (
        <span className="form-error">{formik.errors.specialization}</span>
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

      
      {/* Email */}
      <label className="form-label" htmlFor="email">
        Електронна пошта
      </label>
      <input
        autoComplete="off"
        type="email"
        className="form-input"
        name="email"
        id="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      {formik.errors.email && formik.touched.email && (
        <span className="form-error">{formik.errors.email}</span>
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

export default EditDoctorForm;

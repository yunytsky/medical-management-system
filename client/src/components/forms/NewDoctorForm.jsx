import {useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {  newDoctorSchema } from "../../schemas";
import { createDoctor } from "../../api";

const NewDoctorForm = () => {
  const [submitError, setSubmitError] = useState({ error: false, message: "" });
  const [createdMessageVisible, setCreatedMessageVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      if (submitError) {
        setSubmitError({ error: false, message: "" });
      }
      if(createdMessageVisible){
        setCreatedMessageVisible(false);
      }

      values.email = values.email.toLowerCase();
      values.firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase();
      values.lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase();
      values.specialization = values.specialization.charAt(0).toUpperCase() + values.specialization.slice(1).toLowerCase();

      const res = await createDoctor(values);

      actions.resetForm();
      setCreatedMessageVisible(true);
      setTimeout(() => {
        setCreatedMessageVisible(false);
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
      firstName: "",
      lastName: "",
      specialization: "",
      phoneNumber: "",
      email: ""
    },
    validationSchema: newDoctorSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-doctor-form form">
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


      {createdMessageVisible && (<span className="form-created-message">Новий запис створено ✓</span>)}

      {/* Buttons */}
      <div className="actions">
        <button onClick={() => {navigate(-1)}} type="button" className="button empty">
          Назад
        </button>
        <button type="submit" className="button" disabled={formik.isSubmitting}>
          Додати
        </button>
      </div>

      {/* Submit error */}
      {submitError.error && (
        <span className="form-submit-error">{submitError.message}</span>
      )}
    </form>
  );
};

export default NewDoctorForm;

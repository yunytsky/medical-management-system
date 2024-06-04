import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { newPatientSchema } from "../../schemas";
import {createPatient } from "../../api";

const NewPatientForm = () => {
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

      values.firstName = values.firstName.charAt(0).toUpperCase() + values.firstName.slice(1).toLowerCase();
      values.lastName = values.lastName.charAt(0).toUpperCase() + values.lastName.slice(1).toLowerCase()

      const res = await createPatient(values);

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
      dateOfBirth: "",
      phoneNumber: "",
      address: ""
    },
    validationSchema: newPatientSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
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

export default NewPatientForm;

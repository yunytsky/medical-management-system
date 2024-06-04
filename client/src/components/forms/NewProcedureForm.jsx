import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { newProcedureSchema } from "../../schemas";
import {createProcedure } from "../../api";

const NewProcedureForm = () => {
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

      const res = await createProcedure(values);

      actions.resetForm();
      setCreatedMessageVisible(true);
      setTimeout(() => {
        setCreatedMessageVisible(false);
      }, 6000);

    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setSubmitError({ error: true, message: error.response.data.message });
      } else {
        setSubmitError({ error: true, message: "Error" });
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      procedureName: "",
      procedureDescription: "",
    },
    validationSchema: newProcedureSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Procedure name */}
      <label className="form-label" htmlFor="procedureName">
        Назва процедури
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="procedureName"
        id="procedureName"
        value={formik.values.procedureName}
        onChange={formik.handleChange}
      />

      {formik.errors.procedureName && formik.touched.procedureName && (
        <span className="form-error">{formik.errors.procedureName}</span>
      )}

      {/* Procedure description */}
      <label className="form-label" htmlFor="procedureDescription">
        Опис процедури
      </label>
      <textarea
         rows={8}
        autoComplete="off"
        className="form-input"
        name="procedureDescription"
        id="procedureDescription"
        value={formik.values.procedureDescription}
        onChange={formik.handleChange}
      />

      {formik.errors.procedureDescription && formik.touched.procedureDescription && (
        <span className="form-error">{formik.errors.procedureDescription}</span>
      )}

      {createdMessageVisible && (
        <span className="form-created-message">Новий запис створено ✓</span>
      )}

      {/* Buttons */}
      <div className="actions">
        <button
          onClick={() => {navigate(-1)}}
          type="button"
          className="button empty"
        >
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

export default NewProcedureForm;

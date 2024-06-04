import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { newVisitProcedureSchema } from "../../schemas";
import { createVisitProcedure } from "../../api";

const NewVisitProcedureForm = () => {
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

      const res = await createVisitProcedure(values);

      actions.resetForm();
      setUpdatedMessageVisible(true);
      setTimeout(() => {
        setUpdatedMessageVisible(false);
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
      visitID: "",
      procedureID: "",
      cost: ""
    },
    validationSchema: newVisitProcedureSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Visit ID */}
      <label className="form-label" htmlFor="visitID">
        ID візиту{" "}
        <Link target="_blank" to={"/view/visits"}>
          (Список візитів)
        </Link>
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="visitID"
        id="visitID"
        value={formik.values.visitID}
        onChange={formik.handleChange}
      />

      {formik.errors.visitID && formik.touched.visitID && (
        <span className="form-error">{formik.errors.visitID}</span>
      )}

      {/* Procedure ID */}
      <label className="form-label" htmlFor="procedureID">
        ID процедури{" "}
        <Link target="_blank" to={"/view/procedures"}>
          (Список процедур)
        </Link>
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="procedureID"
        id="procedureID"
        value={formik.values.procedureID}
        onChange={formik.handleChange}
      />

      {formik.errors.procedureID && formik.touched.procedureID && (
        <span className="form-error">{formik.errors.procedureID}</span>
      )}

      {/*Cost */}
      <label className="form-label" htmlFor="cost">
        Вартість
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="cost"
        id="cost"
        value={formik.values.cost}
        onChange={formik.handleChange}
      />

      {formik.errors.cost && formik.touched.cost && (
        <span className="form-error">{formik.errors.cost}</span>
      )}

      {updatedMessageVisible && (
        <span className="form-updated-message">Запис оновлено ✓</span>
      )}

      {/* Buttons */}
      <div className="actions">
        <button
          onClick={() => {
            navigate(-1);
          }}
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

export default NewVisitProcedureForm;

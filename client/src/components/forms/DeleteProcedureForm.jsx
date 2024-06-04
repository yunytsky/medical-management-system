import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { deleteProcedureSchema, deleteVisitProcedureSchema, deleteVisitSchema, editVisitProcedureSchema, editVisitSchema } from "../../schemas";
import { deletePatient, deleteProcedure, deleteVisit, deleteVisitProcedure, editVisitProcedure } from "../../api";

const DeleteProcedureForm = () => {
  const [submitError, setSubmitError] = useState({ error: false, message: "" });
  const [deletedMessageVisible, setDeletedMessageVisible] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      if (submitError) {
        setSubmitError({ error: false, message: "" });
      }
      if(deletedMessageVisible){
        setDeletedMessageVisible(false);
      }

      const res = await deleteProcedure(values);

      actions.resetForm();
      setDeletedMessageVisible(true);
      setTimeout(() => {
        setDeletedMessageVisible(false);
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
      procedureID: "",
    },
    validationSchema: deleteProcedureSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
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


      {deletedMessageVisible && (
        <span className="form-deleted-message">Запис видалено ✓</span>
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
          Видалити
        </button>
      </div>

      {/* Submit error */}
      {submitError.error && (
        <span className="form-submit-error">{submitError.message}</span>
      )}
    </form>
  );
};

export default DeleteProcedureForm;

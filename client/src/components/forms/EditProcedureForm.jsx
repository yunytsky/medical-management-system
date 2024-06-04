import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editProcedureSchema } from "../../schemas";
import {editProcedure } from "../../api";

const EditProcedureForm = () => {
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

      if(!values.procedureName && !values.procedureDescription){
        return;
      }

 
      const data = {procedureID: values.procedureID, newData: []}
      if(values.procedureName){
        data.newData.push({column: "procedureName", value: values.procedureName})
      }
      if(values.procedureDescription){
        data.newData.push({column: "procedureDescription", value: values.procedureDescription})
      }

      const res = await editProcedure(data)

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
      procedureID: "",
      procedureName: "",
      procedureDescription: "",
    },
    validationSchema: editProcedureSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Procedure ID */}
      <label className="form-label" htmlFor="procedureID">
        ID процедури <Link target="_blank" to={"/view/procedures"}>(Список процедур)</Link>
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

      {updatedMessageVisible && (
        <span className="form-updated-message">Запис оновлено ✓</span>
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

export default EditProcedureForm;

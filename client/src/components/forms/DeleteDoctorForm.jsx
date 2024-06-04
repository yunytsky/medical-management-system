import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { deleteDoctorSchema, deleteVisitProcedureSchema, deleteVisitSchema, editVisitProcedureSchema, editVisitSchema } from "../../schemas";
import { deleteDoctor, deletePatient, deleteVisit, deleteVisitProcedure, editVisitProcedure } from "../../api";

const DeleteDoctorForm = () => {
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

      const res = await deleteDoctor(values);

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
      doctorID: "",
    },
    validationSchema: deleteDoctorSchema,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
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

export default DeleteDoctorForm;

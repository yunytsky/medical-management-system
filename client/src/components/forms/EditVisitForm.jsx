import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editVisitSchema } from "../../schemas";
import { editVisit } from "../../api";

const EditVisitForm = () => {
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

      if(!values.visitDate && !values.patientID && !values.doctorID && !values.reasonForVisit){
        return;
      }

      const data = {visitID: values.visitID, newData: []}
      if(values.visitDate){
        data.newData.push({column: "visitDate", value: values.visitDate})
      }
      if(values.patientID){
        data.newData.push({column: "patientID", value: values.patientID})
      }
      if(values.doctorID){
        data.newData.push({column: "doctorID", value: values.doctorID})
      }
      if(values.reasonForVisit){
        data.newData.push({column: "reasonForVisit", value: values.reasonForVisit})
      }


      const res = await editVisit(data)

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
      visitID: "",
      visitDate: "",
      patientID: "",
      doctorID: "",
      reasonForVisit: "",
    },
    validationSchema: editVisitSchema,
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

      {/* Visit date  */}
      <label className="form-label" htmlFor="visitDate">
        Дата візиту (РРРР-ММ-ДД)
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="visitDate"
        id="visitDate"
        value={formik.values.visitDate}
        onChange={formik.handleChange}
      />

      {formik.errors.visitDate && formik.touched.visitDate && (
        <span className="form-error">{formik.errors.visitDate}</span>
      )}

      {/* Patient ID */}
      <label className="form-label" htmlFor="patientID">
        ID пацієнта{" "}
        <Link target="_blank" to={"/view/patients"}>
          (Список пацієнтів)
        </Link>
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

      {/* Doctor ID */}
      <label className="form-label" htmlFor="doctorID">
        ID лікаря{" "}
        <Link target="_blank" to={"/view/doctors"}>
          (Список лікарів)
        </Link>
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

      {/* Reason for visit*/}
      <label className="form-label" htmlFor="reasonForVisit">
        Причина візиту
      </label>
      <input
        autoComplete="off"
        type="text"
        className="form-input"
        name="reasonForVisit"
        id="reasonForVisit"
        value={formik.values.reasonForVisit}
        onChange={formik.handleChange}
      />

      {formik.errors.reasonForVisit && formik.touched.reasonForVisit && (
        <span className="form-error">{formik.errors.reasonForVisit}</span>
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

export default EditVisitForm;

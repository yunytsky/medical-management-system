import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { querySchema1, querySchema5 } from "../../schemas";
import {getTotalCostForPatientX, getVisitsOfPatientXToDoctorWithSpecializationY } from "../../api";
import Table from "../Table";

const QueryForm5 = () => {
  const [submitError, setSubmitError] = useState({ error: false, message: "" });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false)

  const onSubmit = async (values, actions) => {
    try {
      if (submitError) {
        setSubmitError({ error: false, message: "" });
      }
      if(noData){
        setNoData(false);
      }
      const res = await getVisitsOfPatientXToDoctorWithSpecializationY(`?patientID=${values.patientID}&specialization=${values.specialization}`);
      setData(res.data.visits);
      if(!res.data.visits || res.data.visits.length <1){
        setNoData(true);
      }
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
      patientID: "",
      specialization: ""
    },
    validationSchema: querySchema5,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Patient ID */}
      <label className="form-label" htmlFor="patientID">
        X (ID пацієнта <Link target="_blank" to={"/view/patients"}>(Список пацієнтів)</Link>)
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

{/* Specialization */}
<label className="form-label" htmlFor="specialization">
        Y (Спеціалізація)
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
          Пошук
        </button>
      </div>

      {/* Submit error */}
      {submitError.error && (
        <span className="form-submit-error">{submitError.message}</span>
      )}

      {data && data.length > 0 && (
        <Table data={data}/>
      )}
            {noData && (<span className="no-data">За запитом нічого не знайдено</span>)}

    </form>
  );
};

export default QueryForm5;

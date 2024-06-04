import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { querySchema1, querySchema5, querySchema6, querySchema7And8 } from "../../schemas";
import {getDoctorsWhoPerformedAllProceduresOfDoctorX, getDoctorsWhoPerformedSameProceduresAsDoctorX, getTotalCostForPatientX, getVisitsOfPatientXToDoctorWithSpecializationY } from "../../api";
import Table from "../Table";

const QueryForm8 = () => {
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
      const res = await getDoctorsWhoPerformedAllProceduresOfDoctorX(`?doctorID=${values.doctorID}`);
      setData(res.data.doctors);
      if(!res.data.doctors || res.data.doctors.length < 1){
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
      doctorID: "",
    },
    validationSchema: querySchema7And8,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Patient ID */}
      <label className="form-label" htmlFor="doctorID">
        X (ID лікаря <Link target="_blank" to={"/view/doctors"}>(Список лікарів)</Link>)
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

export default QueryForm8;

import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { querySchema1, querySchema5, querySchema6 } from "../../schemas";
import {getDoctorsWhoPerformedMoreThanXProcedures, getTotalCostForPatientX, getVisitsOfPatientXToDoctorWithSpecializationY } from "../../api";
import Table from "../Table";

const QueryForm6 = () => {
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
      const res = await getDoctorsWhoPerformedMoreThanXProcedures(`?count=${values.count}`);
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
      count: "",
    },
    validationSchema: querySchema6,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Count */}
      <label className="form-label" htmlFor="count">
        X (К-ть)
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="count"
        id="count"
        value={formik.values.count}
        onChange={formik.handleChange}
      />

      {formik.errors.count && formik.touched.count && (
        <span className="form-error">{formik.errors.count}</span>
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

export default QueryForm6;

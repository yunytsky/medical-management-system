import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { querySchema1, querySchema3 } from "../../schemas";
import {getDoctorsWhoPerformedProcedureWithCostBetweenXAndY, getTotalCostForPatientX } from "../../api";
import Table from "../Table";

const QueryForm3 = () => {
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

      const res = await getDoctorsWhoPerformedProcedureWithCostBetweenXAndY(`?fromCost=${values.fromCost}&toCost=${values.toCost}`);
      setData(res.data.doctorsAndProcedure);
      if(!res.data.doctorsAndProcedure || res.data.doctorsAndProcedure.length <1){
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
        fromCost: "",
        toCost: "",
    },
    validationSchema: querySchema3,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* From cost */}
      <label className="form-label" htmlFor="fromCost">
        X (Від)
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="fromCost"
        id="fromCost"
        value={formik.values.fromCost}
        onChange={formik.handleChange}
      />

      {formik.errors.fromCost && formik.touched.fromCost && (
        <span className="form-error">{formik.errors.fromCost}</span>
      )}

            {/* To cost */}
            <label className="form-label" htmlFor="toCost">
        Y (До)
      </label>
      <input
        autoComplete="off"
        type="number"
        className="form-input"
        name="toCost"
        id="toCost"
        value={formik.values.toCost}
        onChange={formik.handleChange}
      />

      {formik.errors.toCost && formik.touched.toCost && (
        <span className="form-error">{formik.errors.toCost}</span>
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

export default QueryForm3;

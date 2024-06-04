import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { newProcedureSchema, querySchema4 } from "../../schemas";
import {createProcedure, getPatientsWhoUnderwentProcedureX } from "../../api";
import Table from "../Table";

const QueryForm4 = () => {
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

      const res = await getPatientsWhoUnderwentProcedureX(`?procedureName=${values.procedureName}`);
      setData(res.data.patients);
      if(!res.data.patients || res.data.patients.length <1){
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
      procedureName: "",
    },
    validationSchema: querySchema4,
    onSubmit: onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="new-patient-form form">
      {/* Procedure name */}
      <label className="form-label" htmlFor="procedureName">
      Х (Назва процедури <Link target="_blank" to={"/view/procedures"}>(Список процедур)</Link>)
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

export default QueryForm4;

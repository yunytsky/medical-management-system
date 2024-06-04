import React, { useState } from "react";
import { useFormik, Formik, Form, Field, FieldArray } from "formik";
import { newVisitSchema } from "../../schemas";
import { Link, useNavigate } from "react-router-dom";
import { createVisit } from "../../api";


const NewVisitForm = () => {
  const [submitError, setSubmitError] = useState({ error: false, message: "" });
  const [createdMessageVisible, setCreatedMessageVisible] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      if (submitError) {
        setSubmitError({ error: false, message: "" });
      } 
      if(createdMessageVisible){
        setCreatedMessageVisible(false);
      }

      const res = await createVisit(values);

    //   actions.resetForm();
        setCreatedMessageVisible(true);
        setTimeout(() => {
        setCreatedMessageVisible(false);
        }, 6000);

    } catch (error) {
      if (error.response && error.response.data.message) {
        setSubmitError({ error: true, message: error.response.data.message });
      } else {
        setSubmitError({ error: true, message: "Error" });
      }
    }
  };

  return (
    <Formik
      initialValues={{
        visitDate: "",
        patientID: "",
        doctorID: "",
        reasonForVisit: "",
        procedures: [{ procedureID: "", cost: "" }],
      }}
      validationSchema={newVisitSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit} className="visit-form form">
          {/* Visit Date */}
          <label className="form-label" htmlFor="visitDate">
            Дата візиту (РРРР-ММ-ДД)
          </label>
          <Field
            autoComplete="off"
            type="text"
            className="form-input"
            name="visitDate"
            id="visitDate"
          />
          {errors.visitDate && touched.visitDate && (
            <span className="form-error">{errors.visitDate}</span>
          )}

          {/* Patient ID */}
          <label className="form-label" htmlFor="patientID">
            ID пацієнта{" "}
            <Link target="_blank" to={"/view/patients"}>
              (Список пацієнтів)
            </Link>
          </label>
          <Field
            autoComplete="off"
            type="number"
            className="form-input"
            name="patientID"
            id="patientID"
          />
          {errors.patientID && touched.patientID && (
            <span className="form-error">{errors.patientID}</span>
          )}

          {/* Doctor ID */}
          <label className="form-label" htmlFor="doctorID">
            ID лікаря{" "}
            <Link target="_blank" to={"/view/doctors"}>
              (Список лікарів)
            </Link>
          </label>
          <Field
            autoComplete="off"
            type="number"
            className="form-input"
            name="doctorID"
            id="doctorID"
          />
          {errors.doctorID && touched.doctorID && (
            <span className="form-error">{errors.doctorID}</span>
          )}

          {/* Reason for Visit */}
          <label className="form-label" htmlFor="reasonForVisit">
            Причина візиту
          </label>
          <Field
            autoComplete="off"
            type="text"
            className="form-input"
            name="reasonForVisit"
            id="reasonForVisit"
          />
          {errors.reasonForVisit && touched.reasonForVisit && (
            <span className="form-error">{errors.reasonForVisit}</span>
          )}

          {/* Procedures */}
          <FieldArray name="procedures">
            {({ insert, remove, push }) => (
              <div>
                {values.procedures.length > 0 &&
                  values.procedures.map((procedure, index) => (
                    <div className="procedure" key={index}>
                      <label
                        className="form-label"
                        htmlFor={`procedures.${index}.procedureID`}
                      >
                        ID процедури{" "}
                        <Link target="_blank" to={"/view/procedures"}>
                          (Список процедур)
                        </Link>
                      </label>
                      <Field
                        autoComplete="off"
                        name={`procedures.${index}.procedureID`}
                        type="number"
                        className="form-input"
                      />
                      {errors.procedures &&
                        errors.procedures[index] &&
                        errors.procedures[index].procedureID &&
                        touched.procedures &&
                        touched.procedures[index] &&
                        touched.procedures[index].procedureID && (
                          <span className="form-error">
                            {errors.procedures[index].procedureID}
                          </span>
                        )}

                      <label
                        className="form-label"
                        htmlFor={`procedures.${index}.cost`}
                      >
                        Вартість процедури
                      </label>
                      <Field
                        autoComplete="off"
                        name={`procedures.${index}.cost`}
                        type="number"
                        className="form-input"
                      />
                      {errors.procedures &&
                        errors.procedures[index] &&
                        errors.procedures[index].cost &&
                        touched.procedures &&
                        touched.procedures[index] &&
                        touched.procedures[index].cost && (
                          <span className="form-error">
                            {errors.procedures[index].cost}
                          </span>
                        )}

                      {values.procedures.length > 1 && (
                        <button
                          type="button"
                          className="remove-procedure"
                          onClick={() => remove(index)}
                        >
                          Видалити процедуру -
                        </button>
                      )}
                    </div>
                  ))}
                <button
                  type="button"
                  className="add-procedure"
                  onClick={() => push({ procedureID: "", cost: "" })}
                >
                  Додати процедуру +
                </button>
              </div>
            )}
          </FieldArray>

          {errors.procedures &&
            !Array.isArray(errors.procedures) &&
            touched.procedures && (
              <span className="form-error procedures">{errors.procedures}</span>
            )}

          {createdMessageVisible && (
            <span className="form-created-message">Новий запис створено ✓</span>
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
            <button type="submit" className="button" disabled={isSubmitting}>
              Додати
            </button>
          </div>

          {/* Submit error */}
          {submitError.error && (
            <span className="form-submit-error">{submitError.message}</span>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NewVisitForm;
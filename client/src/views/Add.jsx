import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDoctors, getPatients, getProcedures, getVisits } from "../api";
import Table from "../components/Table";
import NewDoctorForm from "../components/forms/NewDoctorForm";
import NewPatientForm from "../components/forms/NewPatientForm";
import NewProcedureForm from "../components/forms/NewProcedureForm";
import NewVisitForm from "../components/forms/NewVisitForm";

const Add = () => {
    const [heading, setHeading] = useState("");
    const [form, setForm] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const page =  location.pathname.split('/').pop();
        if (page == "patients") {
            setHeading("Створити нового пацієнта")
            setForm(<NewPatientForm/>)
        } else if (page == "doctors") {
            setHeading("Створити нового лікаря")
            setForm(<NewDoctorForm/>)
        }  else if (page == "procedures") {
            setHeading("Створити нову процедуру")
            setForm(<NewProcedureForm/>)
        }  else if (page == "visits") {
            setHeading("Створити новий візит")
            setForm(<NewVisitForm/>)

        }
        
    }, [location])

    return(
        <div className="add">
           <h3>{heading}</h3>
           {form}
           <Link className="back-to-main-menu" to={"/"}>Повернутись на головне меню</Link>
        </div>
    );
};

export default Add;
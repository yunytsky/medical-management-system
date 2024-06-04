import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDoctors, getPatients, getProcedures, getVisits } from "../api";
import Table from "../components/Table";
import NewDoctorForm from "../components/forms/NewDoctorForm";
import NewPatientForm from "../components/forms/NewPatientForm";
import NewProcedureForm from "../components/forms/NewProcedureForm";
import NewVisitForm from "../components/forms/NewVisitForm";
import DeletePatientForm from "../components/forms/DeletePatientForm";
import DeleteDoctorForm from "../components/forms/DeleteDoctorForm";
import DeleteProcedureForm from "../components/forms/DeleteProcedureForm";
import DeleteVisitForm from "../components/forms/DeleteVisitForm";

const Delete = () => {
    const [heading, setHeading] = useState("");
    const [form, setForm] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const page =  location.pathname.split('/').pop();
        if (page == "patients") {
            setHeading("Видалити запис про пацієнта")
            setForm(<DeletePatientForm/>)
        } else if (page == "doctors") {
            setHeading("Видалити запис про лікаря")
            setForm(<DeleteDoctorForm/>)
        }  else if (page == "procedures") {
            setHeading("Видалити запис про процедуру")
            setForm(<DeleteProcedureForm/>)
        }  else if (page == "visits") {
            setHeading("Видалити запис про візит")
            setForm(<DeleteVisitForm/>)

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

export default Delete;
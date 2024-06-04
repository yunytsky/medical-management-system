import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Table from "../components/Table";
import EditProcedureForm from "../components/forms/EditProcedureForm";
import EditDoctorForm from "../components/forms/EditDoctorForm";
import EditPatientForm from "../components/forms/EditPatientForm";
import EditVisitForm from "../components/forms/EditVisitForm";
import EditVisitProcedureForm from "../components/forms/EditVisitProcedureForm";
import NewVisitProcedureForm from "../components/forms/NewVisitProcedureForm";
import DeleteVisitProcedureForm from "../components/forms/DeleteVisitProcedureForm";

const Edit = () => {
    const [heading, setHeading] = useState("");
    const [form, setForm] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const page =  location.pathname.split('/').pop();
        
        if (page == "patients") {
            setHeading("Редагувати запис про пацієнта")
            setForm(<EditPatientForm/>)
        } else if (page == "doctors") {
            setHeading("Редагувати запис про лікаря")
            setForm(<EditDoctorForm/>)
        }  else if (page == "procedures") {
            setHeading("Редагувати запис про процедуру")
            setForm(<EditProcedureForm/>)
        }  else if (location.pathname.includes("visits") && location.pathname.includes("general")) {
            setHeading("Редагувати запис про візит")
            setForm(<EditVisitForm/>)
        }else if (location.pathname.includes("visits") && location.pathname.includes("procedure/edit")) {
            setHeading("Редагувати запис про процедуру візиту")
            setForm(<EditVisitProcedureForm/>)
        }else if (location.pathname.includes("visits") && location.pathname.includes("procedure/add")) {
            setHeading("Додати запис про процедуру візиту")
            setForm(<NewVisitProcedureForm/>)
        }else if (location.pathname.includes("visits") && location.pathname.includes("procedure/delete")) {
            setHeading("Видалити запис про процедуру візиту")
            setForm(<DeleteVisitProcedureForm/>)
        }

    }, [location])

    return(
        <div className="edit">
           <h3>{heading}</h3>
           {form}
           <Link className="back-to-main-menu" to={"/"}>Повернутись на головне меню</Link>
        </div>
    );
};

export default Edit;
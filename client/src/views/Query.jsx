import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDoctors, getPatients, getProcedures, getVisits } from "../api";
import Table from "../components/Table";
import NewDoctorForm from "../components/forms/NewDoctorForm";
import NewPatientForm from "../components/forms/NewPatientForm";
import NewProcedureForm from "../components/forms/NewProcedureForm";
import NewVisitForm from "../components/forms/NewVisitForm";
import QueryForm4 from "../components/forms/QueryForm4";
import QueryForm1 from "../components/forms/QueryForm1";
import QueryForm2 from "../components/forms/QueryForm2";
import QueryForm3 from "../components/forms/QueryForm3";
import QueryForm5 from "../components/forms/QueryForm5";
import QueryForm6 from "../components/forms/QueryForm6";
import QueryForm7 from "../components/forms/QueryForm7";
import QueryForm8 from "../components/forms/QueryForm8";

const Query = () => {
    const [heading, setHeading] = useState("");
    const [form, setForm] = useState(null);

    const location = useLocation();

    useEffect(() => {
        const page =  location.pathname.split('/').pop();
        if (page == "query-1") {
            setHeading("Загальна вартість процедур для пацієнта Х")
            setForm(<QueryForm1/>)
        }else  if (page == "query-2") {
            setHeading("Список лікарів, які проводили процедуру Х")
            setForm(<QueryForm2/>)
        }else if (page == "query-3") {
            setHeading("Лікарі, які проводили процедури з вартістю між Х та Y та назви цих процедур")
            setForm(<QueryForm3/>)
        }else if (page == "query-4") {
            setHeading("Список пацієнтів, які проходили процедуру X")
            setForm(<QueryForm4/>)
        }else if (page == "query-5") {
            setHeading("Візити пацієнта Х до лікаря зі спеціалізацією Y")
            setForm(<QueryForm5/>)
        }else if (page == "query-6") {
            setHeading("Імена та спеціалізації лікарів, які проводили більше Х видів процедур")
            setForm(<QueryForm6/>)
        }else if (page == "query-7") {
            setHeading("Імена лікарів, що виконували такі ж процедури, як і лікар Х")
            setForm(<QueryForm7/>)
        }else if (page == "query-8") {
            setHeading("Імена лікарів, які виконували всі процедури, що виконуються лікарем Х")
            setForm(<QueryForm8/>)
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

export default Query;
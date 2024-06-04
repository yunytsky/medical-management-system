import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getDoctors, getPatients, getProcedures, getVisits } from "../api";
import Table from "../components/Table";

const View = () => {
    const [data, setData] = useState([]);
    const [heading, setHeading] = useState("");

    const location = useLocation();

    useEffect(() => {
        const page =  location.pathname.split('/').pop();

        const fetchData = async () => {
            try {
                if (page == "patients") {
                    const res = await getPatients();
                    setData(res.data.patients);
                    setHeading("Пацієнти");
                } else if (page == "doctors") {
                    const res = await getDoctors();
                    setData(res.data.doctors);
                    setHeading("Лікарі");
                }  else if (page == "procedures") {
                    const res = await getProcedures();
                    setData(res.data.procedures);
                    setHeading("Процедури");
                }  else if (page == "visits") {
                    const res = await getVisits();
                    setData(res.data.visits);
                    setHeading("Візити");
                }else{
                    return;
                }
               
            } catch (error) {
                console.log(error)
            }
        }
        
      fetchData();
    }, [location])

    return(
        <div className="view">
            <h3>{heading}</h3>
           <Table data={data}/>
           <Link to={-1} className="button" style={{marginBottom: "1em"}}>Назад</Link>
           <Link className="back-to-main-menu" to={"/"}>Повернутись на головне меню</Link>

        </div>
    );
};

export default View;
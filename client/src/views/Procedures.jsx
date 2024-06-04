import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProcedures } from "../api";
import Table from "../components/Table";

const Procedures = () => {
    const [procedures, setProcedures] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProcedures();
                setProcedures(res.data.procedures);
            } catch (error) {
                
            }
        }

        fetchData();
    }, [])

    return(
        <div className="procedures">
           <Table data={procedures}/>
        </div>
    );
};

export default Procedures;
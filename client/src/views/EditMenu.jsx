import { Link } from "react-router-dom";

const EditMenu = () => {
   
    return(
        <div className="edit">
            <h3>Редагування записів</h3>
           <div className="menu-form">
            <Link className="menu-form-button button empty" to={"patients"}>Пацієнти</Link>
            <Link className="menu-form-button button empty" to={"doctors"}>Лікарі</Link>
            <Link className="menu-form-button button empty" to={"procedures"}>Процедури</Link>
            <Link className="menu-form-button button empty" to={"visits"}>Візити</Link>
       
            <Link to={-1} className="button menu-form-back-button">Назад</Link>

           </div>        
        </div>
    );
};

export default EditMenu;
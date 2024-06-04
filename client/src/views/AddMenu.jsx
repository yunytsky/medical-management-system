import { Link } from "react-router-dom";

const AddMenu = () => {
   
    return(
        <div className="add">
            <h3>Створення нових записів</h3>
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

export default AddMenu;
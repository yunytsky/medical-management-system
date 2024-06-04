import { Link } from "react-router-dom";

const DeleteMenu = () => {
   
    return(
        <div className="delete">
            <h3>Видалення записів</h3>
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

export default DeleteMenu;
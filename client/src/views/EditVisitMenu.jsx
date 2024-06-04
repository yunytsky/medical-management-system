import { Link } from "react-router-dom";

const EditVisitMenu = () => {
   
    return(
        <div className="edit">
            <h3>Редагування візитів</h3>
           <div className="menu-form">
            <Link className="menu-form-button button empty" to={"general"}>Редагувати візит</Link>
            <Link className="menu-form-button button empty" to={"procedure/add"}>Додати процедуру до візиту</Link>
            <Link className="menu-form-button button empty" to={"procedure/edit"}>Редагувати процедуру візиту</Link>
            <Link className="menu-form-button button empty" to={"procedure/delete"}>Видалити процедуру з візиту</Link>
       
            <Link to={-1} className="button menu-form-back-button">Назад</Link>
            <Link className="back-to-main-menu" to={"/"}>Повернутись на головне меню</Link>

           </div>        
        </div>
    );
};

export default EditVisitMenu;
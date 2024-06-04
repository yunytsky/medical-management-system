import { Link } from "react-router-dom";

const Menu = () => {
   
    return(
        <div className="menu">
            <h3>Управління медичною системою</h3>
           <div className="menu-form">
            <Link className="menu-form-button button empty" to={"view"}>Перегляд даних</Link>
            <Link className="menu-form-button button empty" to={"edit"}>Редагування даних</Link>
            <Link className="menu-form-button button empty" to={"add"}>Введення даних</Link>
            <Link className="menu-form-button button empty" to={"delete"}>Видалення даних</Link>
            <Link className="menu-form-button button empty" to={"queries"}>Параметризовані запити</Link>
           </div>
        </div>
    );
};

export default Menu;
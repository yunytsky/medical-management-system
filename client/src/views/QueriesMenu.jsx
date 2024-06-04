import { Link } from "react-router-dom";

const QueriesMenu = () => {
   
    return(
        <div className="queries">
            <h3>Параметризовані запити</h3>
           <div className="menu-form">
            <Link className="menu-form-button button empty" to={"query-1"}>1. Загальна вартість процедур для пацієнта Х</Link>
            <Link className="menu-form-button button empty" to={"query-2"}>2. Список лікарів, які проводили процедуру Х</Link>
            <Link className="menu-form-button button empty" to={"query-3"}>3. Лікарі, які проводили процедури з вартістю між Х та Y та назви цих процедур</Link>
            <Link className="menu-form-button button empty" to={"query-4"}>4. Список пацієнтів, які проходили процедуру Х</Link>
            <Link className="menu-form-button button empty" to={"query-5"}>5. Візити пацієнта Х до лікаря зі спеціалізацією Y</Link>

            <Link className="menu-form-button button empty" to={"query-6"}>6. Імена та спеціалізації лікарів, які проводили більше Х видів процедур</Link>
            <Link className="menu-form-button button empty" to={"query-7"}>7. Імена лікарів, що виконували такі ж процедури, як і лікар Х</Link>
            <Link className="menu-form-button button empty" to={"query-8"}>8. Імена лікарів, які виконували всі процедури, що виконуються лікарем Х</Link>

            <Link to={-1} className="button menu-form-back-button">Назад</Link>

           </div>        
        </div>
    );
};

export default QueriesMenu;
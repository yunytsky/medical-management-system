import {RouterProvider, createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Menu from "./views/Menu";
import ViewMenu from "./views/ViewMenu";
import View from "./views/View";
import Add from "./views/Add";
import NotFound from "./views/NotFound";
import AddMenu from "./views/AddMenu";
import EditMenu from "./views/EditMenu";
import Edit from "./views/Edit";
import EditVisitMenu from "./views/EditVisitMenu";
import QueriesMenu from "./views/QueriesMenu";
import Query from "./views/Query";
import DeleteMenu from "./views/DeleteMenu";
import Delete from "./views/Delete";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Menu/>}/>
      
      <Route path="view">
        <Route index element={<ViewMenu/>}/>
        <Route path="patients" element={<View/>}/>
        <Route path="doctors" element={<View/>}/>
        <Route path="procedures" element={<View/>}/>
        <Route path="visits" element={<View/>}/>
      </Route>

      <Route path="add">
        <Route index element={<AddMenu/>}/>
        <Route path="doctors" element={<Add/>}/>
        <Route path="patients" element={<Add/>}/>
        <Route path="procedures" element={<Add/>}/>
        <Route path="visits" element={<Add/>}/>
      </Route>

      <Route path="edit">
        <Route index element={<EditMenu/>}/>
        <Route path="doctors" element={<Edit/>}/>
        <Route path="patients" element={<Edit/>}/>
        <Route path="procedures" element={<Edit/>}/>
        <Route path="visits">
          <Route index element={<EditVisitMenu/>}/>
          <Route path="general" element={<Edit/>}/>
          <Route path="procedure/add" element={<Edit/>}/>
          <Route path="procedure/edit" element={<Edit/>}/>
          <Route path="procedure/delete" element={<Edit/>}/>
        </Route>
      </Route>

      <Route path="delete">
        <Route index element={<DeleteMenu/>}/>
        <Route path="doctors" element={<Delete/>}/>
        <Route path="patients" element={<Delete/>}/>
        <Route path="procedures" element={<Delete/>}/>
        <Route path="visits" element={<Delete/>}/>
      </Route>



      <Route path="queries">
        <Route index element={<QueriesMenu/>}/>
        <Route path="query-1" element={<Query/>}/>
        <Route path="query-2" element={<Query/>}/>
        <Route path="query-3" element={<Query/>}/>
        <Route path="query-4" element={<Query/>}/>
        <Route path="query-5" element={<Query/>}/>
        <Route path="query-6" element={<Query/>}/>
        <Route path="query-7" element={<Query/>}/>
        <Route path="query-8" element={<Query/>}/>
      </Route>


      <Route path="*" element={<NotFound/>}/>
    </Route>
  )
)

function App() {

  return (
    <div className="app">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App

import Layout from "./components/Layout";
import Map from "./components/Pages/Map";
import AdminAdd from "./components/Admin/Add";
import AdminEdit from "./components/Admin/Edit";
import AdminList from "./components/Admin/List";
import AdminDelete from "./components/Admin/Delete";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Map} />
        <Route exact path="/admin" component={AdminList} />
        <Route exact path="/admin/add" component={AdminAdd} />
        <Route exact path="/admin/edit/:id" component={AdminEdit} />
        <Route exact path="/admin/delete/:id" component={AdminDelete} />
      </Switch>
    </Layout>
  );
}

export default App;

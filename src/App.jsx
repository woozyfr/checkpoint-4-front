import Layout from './components/Layout';
import Map from './components/Pages/Map';
import { Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Layout>
      <Switch>
          <Route exact path="/" component={Map} />
      </Switch></Layout>
  );
}

export default App;

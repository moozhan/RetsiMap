import { Route, Switch } from 'react-router-dom';
import Map from './pages/Map';

function App() {
  return (
      <Switch>
        <Route path='/' exact>
          <Map />
        </Route>
      </Switch>
  );
}

export default App;

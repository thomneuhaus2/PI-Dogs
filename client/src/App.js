import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import CreateForm from './Components/CreateForm';
import Detail from './Components/Detail';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={LandingPage} />
          <Route  exact path={'/home'} component={Home} />
          <Route  exact path={'/dogForm'} component={CreateForm} />
          <Route  exact path={'/home/:id'} component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

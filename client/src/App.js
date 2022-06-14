import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/index.jsx';
import Form from './components/CreateGame/index.jsx';
import Landing from './components/Landing/index.jsx';
import Detail from './components/DetailGame/index.jsx';



function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route exact path='/create/game'><Form/></Route>
      <Route exact path='/detail/game/:id' component={Detail}/>
    </div>
  );
}

export default App;

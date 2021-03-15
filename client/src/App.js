import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Etudiant from './pages/etudiant';
import Module from './pages/module';
import ModifierEtudiant from './pages/components/modifierEtudiant';
import ModifierModule from "./pages/components/modifierModule";
import { EtudiantContextProvider, ModuleContextProvider } from './context/context';
import {useState} from 'react';



function App() {

  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  return (
    

    <Router>
      <Switch>

        <Route exact path="/">
        <h1 className="text-center">Authentification</h1>

         <div className="d-flex justify-content-center mt-4">

                  <form>
            <div className="form-group row">
              <h5>Nom d'utilisateur</h5>
              <div className="col-sm-10 mt-4">
                <input value={user} onChange={(e)=>{setUser(e.target.value)}} type="text" className="col-sm-10 col-form-label"/>
              </div>
              <div className="col-sm-10 mt-4">
              <h5>Mot de passe</h5>
              <input value={pass} onChange={(e)=>{setPass(e.target.value)}} type="password" className="col-sm-10 col-form-label"/>

              </div>
            </div>
            <Link to={()=> {return (user==="user"&&pass==="pass"?"/menu" : "/")}}><button className="mt-4 btn btn-success">S'authentifier</button></Link>
          </form>
         </div>
        </Route>

        <Route exact path="/menu">
          <div className="d-flex justify-content-center mt-4">
            <h2>Menu principal</h2>
          </div>
          <div className="d-flex justify-content-center">
            <ul className="list-group">
              <li className="list-group-item list-group-item-secondary">
                <Link to="/Module">Manipuler la table des Modules</Link>
              </li>
              <li className="list-group-item list-group-item-secondary">
                <Link to="/Etudiant">Manipuler la table des Etudiants</Link>
              </li>
            </ul>
          </div>
        </Route>


        <Route exact path="/Etudiant">
        <EtudiantContextProvider><Etudiant/></EtudiantContextProvider>
        </Route>

        <Route exact path="/Module">
          <ModuleContextProvider><Module/></ModuleContextProvider>
        </Route>
        
        <Route exact path="/modifierEtudiant/:matricule">
          <ModifierEtudiant/>
        </Route>

        <Route exact path="/modifierModule/:codemodule">
          <ModifierModule/>
        </Route>
      </Switch>
    </Router>

    
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";

function App() {
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
  };

  const setLoginStatus = (status) => {
    setLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          <FetchDefault />
        </Route>
        <Route path="/page2">
          <Placeholder />
        </Route>
        <Route path="/page3">
          <User />
        </Route>
        <Route path="/page4">
          <Admin />
        </Route>
        <Route path="/login">
          {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
{
  /* <Login
            loginMsg={loggedIn ? "Logout" : "Login"}
            loggedIn={loggedIn}
            setLoginStatus={setLoginStatus}
          /> */
}

function FetchDefault() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    facade.fetchDefault(setArray);
  }, []);

  return (
    <div>
      <h3>Data fetched from api:</h3>
      <ul>
        {array.map((data) => {
          return <li>{data}</li>;
        })}
      </ul>
    </div>
  );
}

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page1">
          Page 1
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page2">
          Page2
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/page3">
              Page 3
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Page 4
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink exact activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Home() {
  return (
    <>
      <h3>Use instructions</h3>
      <p>
        I choose to center my project around species.<br/>
        I have used our start code to make it possible.<br/>
        to get all species, species by id if you are an user<br/>
        and add a species if you are an admin. <br/>
        I also made a lot of test to make sure it worked.<br/>
        
      </p>
    </>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

function User() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const[arr,setArr]=useState([]);
  const [species,setSpecies]=useState({});
  const[id,setId]=useState();
  const handleChange = (event) => {
    const target = event.target; 
    const property = target.id; 
    const value = target.value;
    setId(value);
    };
    const handleSubmit = (event) => {
      facade.fetchById(setSpecies,id);
      };

  useEffect(() => {
    facade.fetchAll(setArr);
  }, []);
  
  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  return (
    <div>
      
      <h3>{dataFromServer}</h3>
      <p>{errorUser}</p>

  <table className="table"><tr><th>Title</th><th>Description</th></tr>
    {arr.map(x=>{
    return <tr><th>{x.title}</th><th>{x.description}</th></tr>
  })}</table>
    <h1>ID</h1><input type="number" onChange={handleChange}/>
    <h3>{id}</h3>
    <button onClick={handleSubmit}>Get By ID</button>
<h3>{species.title}</h3>
<h3>{species.description}</h3>
    </div>
  );
}

function Admin() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");
  const[title,setTitle]=useState("");
  const[desc,setDesc]=useState("");
  const[dto,setDTO]=useState({});
  const handleSubmit=()=>{
    
    facade.postSpecies(title,desc);
    console.log("SUCCESS");
  }
  const handleChange = (event) => {
    const target = event.target; 
    const property = target.id; 
    const value = target.value;
    if(property=="title"){
      setTitle(value);
    }else{
      setDesc(value);
    }
    
    };

  useEffect(() => {
    facade
      .fetchDataAdmin()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  return (
    <div>
      <h3>{dataFromServer}</h3>
      <p>{errorAdmin}</p>
      <h3>Title</h3><input id="title" type="text" onChange={handleChange}/>
      <h3>Description</h3><input id="desc" type="text" onChange={handleChange}/><br/><br/>
      <button onClick={handleSubmit}>Send new species to DB</button>
  <h3>Title {title}</h3>
  <h3>Desc {desc}</h3>
      <h3></h3>
    </div>
  );
}

export default App;

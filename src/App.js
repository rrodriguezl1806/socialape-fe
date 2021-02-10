import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux"
import store from './redux/store'

// Components
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute"
import axios from "axios";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff',
        }
    }
})

axios.defaults.baseURL = "http://localhost:5001/socialaep-f9baf/us-central1/api"

let authtenticated
const token = localStorage.getItem('token')
if (token) {
 const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
        window.location.href = '/login'
        authtenticated = false
    } else {
        authtenticated = true
    }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <AuthRoute exact path='/login' component={Login} authenticated={authtenticated}/>
                        <AuthRoute exact path='/signup' component={Signup} authenticated={authtenticated}/>
                    </Switch>
                </div>
            </Router>
        </Provider>
    </MuiThemeProvider>
  );
}

export default App;

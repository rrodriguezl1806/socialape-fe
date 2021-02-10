import React, { useState, useEffect} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import {CircularProgress, Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {login} from "../services/login";
import { getUserData } from "../services/userServices"
import {useDispatch, useSelector} from "react-redux";
import {setLoginUser, setUserData} from "../redux/actions/userActions";
import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS} from "../redux/types";

const styles = {
    form: {
        textAlign: 'center'
    },
    button: {
        marginTop: 20
    }
}

const Login = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
    });
    const { classes } = props

    const { loading, errors } = useSelector((state) => state.ui);

    useEffect(() => {
    }, [loading]);

    useEffect(() => {
    }, [errors]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const userData = {
            email: state.email,
            password: state.password
        }
        await loginUser(userData)
    }

    const loginUser = async (userData) => {
        try {
            dispatch({type: LOADING_UI})
            const loginData = await login(userData)
            dispatch(setLoginUser(loginData.data))
            localStorage.setItem('token', loginData.data.token)
            const userDataRes = await getUserData()
            dispatch(setUserData(userDataRes.data))
            dispatch({type: CLEAR_ERRORS})
            props.history.push('/')
        } catch (error) {
            console.error(error.response.data);
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            })
        }
    }

    const handleChange = (event) => {
        const {value, name} = event.target
        setState ({
            ...state,
            [name]: value
        })
    }

    return (
        <Grid container className={classes.form}>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h2">Login</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={state.email}
                        helperText={errors.email}
                        error={errors.email ? true: false}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        value={state.password}
                        helperText={errors.password}
                        error={errors.password ? true: false}
                        onChange={handleChange}
                        fullWidth
                    />
                    {errors.general && (
                        <Typography variant={"body2"}>{errors.general}</Typography>
                    )}
                    <Button
                        type={"submit"}
                        variant={"contained"}
                        color={"primary"}
                        className={classes.button}
                        disabled={loading}
                    >
                        Login
                        {loading && <CircularProgress size={30}/> }
                    </Button>
                    <br/>
                    <small>Dont have an account? sign up <Link to={'/signup'}>here</Link></small>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    );
}

export default withStyles(styles)(Login)

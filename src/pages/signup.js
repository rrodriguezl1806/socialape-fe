import {Grid, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import withStyles from '@material-ui/core/styles/withStyles'
import {useState} from "react";
import { register } from "../services/register";
import {getUserData} from "../services/userServices";
import {setUserData} from "../redux/actions/userActions";
import {CLEAR_ERRORS, LOADING_UI, SET_ERRORS} from "../redux/types";
import {useDispatch, useSelector} from "react-redux";

const styles = {
    form: {

    }
}

const Signup = (props) => {
    const { classess } = props
    const dispatch = useDispatch();
    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        handle: ''
    });
    const { loading, errors } = useSelector((state) => state.ui);

    const handleChange = (event) => {
        const {value, name} = event.target
        setSignupData ({
            ...signupData,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        register(signupData)
            .then(res => {
                dispatch({type: LOADING_UI})
                localStorage.setItem('token', res.data.token)
                getUserData().then(userDataRes => {
                    dispatch(setUserData(userDataRes.data))
                    dispatch({type: CLEAR_ERRORS})
                    props.history.push('/')
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            })
    }

    return (
        <Grid container>
            <Grid item sm/>
            <Grid item sm>
                <Typography variant="h2">Signup</Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={signupData.email}
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
                        value={signupData.password}
                        helperText={errors.password}
                        error={errors.password ? true: false}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={signupData.confirmPassword}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true: false}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        id="handle"
                        name="handle"
                        type="text"
                        label="Handle"
                        value={signupData.handle}
                        helperText={errors.handle}
                        error={errors.handle ? true: false}
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
                    >
                        Signup
                    </Button>
                    <br/>
                </form>
            </Grid>
            <Grid item sm/>
        </Grid>
    )
}

export default withStyles(styles)(Signup)

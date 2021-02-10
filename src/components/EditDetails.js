import React, {useState, useEffect} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import {useDispatch, useSelector} from "react-redux";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {editUserDetails, getUserData} from "../services/userServices";
import {setLoadingUser, setUserData} from "../redux/actions/userActions";
import {CLEAR_ERRORS, SET_ERRORS} from "../redux/types";

const styles = {

}

const EditDetails = (props) => {
    const dispatch = useDispatch();
    const { classes } = props
    const { loading, credentials } = useSelector((state) => state.user);
    const { errors } = useSelector((state) => state.ui);

    const [userState, setUserState] = useState({
        handle: '',
        email: '',
        website: '',
        location: '',
        bio: ''
    });
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setUserState({
            handle: credentials.handle,
            email: credentials.email,
            website: credentials.website,
            location: credentials.location,
            bio: credentials.bio
        })
    }, []);

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleChange = (event) => {
        const {value, name} = event.target
        setUserState({
            ...userState,
            [name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        // dispatch(setLoadingUser())
        editUserDetails(userState).then(res => {
            getUserData().then(userRes => {
                dispatch(setUserData(userRes.data))
                dispatch({type: CLEAR_ERRORS})
                handleClose()
            })
        }).catch(err => {
            console.log(err.response.data)
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
    }


    return (
        <>
            <IconButton onClick={handleOpen}>
                <EditIcon color={"primary"}/>
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth={"sm"}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Edit Details</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email Address"
                            value={userState.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="bio"
                            name="bio"
                            type="text"
                            label="Bio"
                            value={userState.bio}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="location"
                            name="location"
                            type="text"
                            label="Location"
                            value={userState.location}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="website"
                            name="website"
                            type="text"
                            label="Web Site"
                            value={userState.website}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};


export default withStyles(styles)(EditDetails)

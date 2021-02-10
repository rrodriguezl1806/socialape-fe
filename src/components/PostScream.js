import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import {TextField} from "@material-ui/core";
import {postNewScream} from "../services/scream";
import {postScream} from "../redux/actions/dateActions";
import {LOADING_DATA} from "../redux/types";

const PostScream = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const { errors } = useSelector(state => state.ui)
    const { loading } = useSelector(state => state.data)
    const [state, setState] = useState({
        body: '',
    });

    const handleOpenClose = () => {
        setOpen((prevState => !prevState))
    }

    const handlePostScream = () => {
        dispatch({ type: LOADING_DATA })
        postNewScream(state).then(res => {
            console.log(res.data)
            dispatch(postScream(res.data))
            handleOpenClose()
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const handleChange = (ev) => {
        const {value, name} = ev.target
        setState ({
            ...state,
            [name]: value
        })
    }

    return (
        <>
            <IconButton className='button' onClick={handleOpenClose}>
                <AddIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleOpenClose}
                fullWidth
                maxWidth={"sm"}
            >
                <DialogTitle>
                    Post a new scream
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField
                            name={'body'}
                            value={state.body}
                            type={'text'}
                            label={'SCREAM !!'}
                            multiline
                            rows={3}
                            plaseholder={'Scream'}
                            helperText={errors.handle}
                            error={errors.handle ? true: false}
                            onChange={handleChange}
                            fullWidth
                        />
                    </form>
                    { loading && (<p>Loading ...</p>)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenClose} color={"secondary"}>Cancel</Button>
                    <Button onClick={handlePostScream} color={"primary"}>Post</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PostScream;

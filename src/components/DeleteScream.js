import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from "@material-ui/core/Button";
import {deleteScream} from "../services/scream";
import {setDeleteScream} from "../redux/actions/dateActions";

const DeleteScream = (props) => {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const handleOpenClose = () => {
        setOpen((prevState => !prevState))
    }

    const handleDeleteScream = () => {
        deleteScream(props.screamId).then(res => {
            dispatch(setDeleteScream(props.screamId))
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <IconButton className='button' onClick={handleOpenClose}>
                <Delete color={'primary'} />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleOpenClose}
                fullWidth
                maxWidth={"sm"}
            >
                <DialogTitle>
                    Are you sure you want delete this scream?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleOpenClose} color={"primary"}>Cancel</Button>
                    <Button onClick={handleDeleteScream} color={"secondary"}>Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteScream

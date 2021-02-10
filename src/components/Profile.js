import Paper from '@material-ui/core/Paper';
import {useDispatch, useSelector} from "react-redux";
import MuiLink from '@material-ui/core/Link';
import {Link} from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit'
import IconButton from "@material-ui/core/IconButton";
import {getUserData, uploadImage} from "../services/userServices";
import {logoutUser, setLoadingUser, setUserData} from "../redux/actions/userActions";
import {Icon} from "@material-ui/core";
import {KeyboardReturn} from "@material-ui/icons";
import EditDetails from "./EditDetails";

const styles = {
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '$ button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .image': {
            width: 200,
            heigth: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .details': {
            textAlign: 'center'
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    }
}

const Profile = (props) => {
    const { classes } = props
    const { authenticated, loading, credentials: {imageUrl, createdAt, handle, email, bio, location, website} } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleImageChange = (ev) => {
        const image = ev.target.files[0]
        const formData = new FormData();
        formData.append('image', image, image.name)
        dispatch(setLoadingUser())
        uploadImage(formData).then(res => {
            getUserData().then(res => {
                dispatch(setUserData(res.data))
            })
        }).catch(err => {
            console.log(err)
        })
    }
    const handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click()
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    const renderProfile = () => {
        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="avatar" className={'image'}/>
                        <input type='file' hidden='hidden' id={'imageInput'} onChange={handleImageChange} />
                        <IconButton onClick={handleEditPicture} className='button'>
                            <EditIcon color={'primary'} />
                        </IconButton>
                    </div>
                    <hr/>
                    <div className="details">
                        <MuiLink
                            component={Link}
                            to={`/user/${handle}`}
                            variant={"h5"}
                            color={"primary"}
                        >
                            @{handle}
                        </MuiLink>
                        <hr/>
                        { email && <Typography variant={"body2"}>{email}</Typography> }
                        <hr/>
                        { bio && <Typography variant={"body2"}>{bio}</Typography> }
                        <hr/>
                        { location && <Typography variant={"body2"}>{location}</Typography> }
                        <hr/>
                        { website && <Typography variant={"body2"}>{website}</Typography> }
                        <hr/>
                        <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <IconButton onClick={handleLogout}>
                        <KeyboardReturn color={"primary"}/>
                    </IconButton>
                    <EditDetails/>
                </div>
            </Paper>
        )
    }

    const renderNoProfile = () => {
        return (
            <Paper className={classes.paper}>
                <Typography variant={"body2"} align={"center"}>
                    No profile found, please login again.
                </Typography>
                <div>
                    <Button variant={"contained"} color={"primary"} component={Link} to='/login'>
                        Login
                    </Button>
                    <Button variant={"contained"} color={"secondary"} component={Link} to='/signup'>
                        Signup
                    </Button>
                </div>
            </Paper>
        )
    }
    return (
        <>
            { !loading ? (
                authenticated ? renderProfile(): renderNoProfile())
                : <p>Loading ...</p>
            }

        </>
    );
};

export default withStyles(styles)(Profile)

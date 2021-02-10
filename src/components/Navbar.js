import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import {useSelector} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { Notifications} from "@material-ui/icons";
import PostScream from "./PostScream";

const Navbar = (props) => {

    const { authenticated } = useSelector((state) => state.user);
    return (
        <AppBar position="static">
            <Toolbar className='nav-container'>
                { authenticated ? (
                    <>
                        <PostScream/>
                        <IconButton className='button'>
                            <HomeIcon color={'primary'} />
                        </IconButton>
                        <IconButton className='button'>
                            <Notifications color={'primary'} />
                        </IconButton>
                    </>
                ): (
                    <>
                        <Button color="inherit" component={Link} to='/login'>Login</Button>
                        <Button color="inherit" component={Link} to='/'>Home</Button>
                        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;

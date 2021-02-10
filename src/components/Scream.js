import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from "@material-ui/core/Typography";
import {Link} from 'react-router-dom'
import ChatIcon from "@material-ui/icons/Chat";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {Delete, Favorite, FavoriteBorder} from "@material-ui/icons";
import {getLike, getUnlike} from "../services/scream";
import {setLike, setUnlike} from "../redux/actions/dateActions";
import DeleteScream from '../components/DeleteScream'

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

const Scream = (props) => {
    dayjs.extend(relativeTime)
    const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = props
    const { likes, authenticated, credentials } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const renderLikeButton = () => {
        let likedScreams = !!(likes && likes.find(like => like.screamId === screamId))
        return (
            <>
                { likedScreams ? (
                    <IconButton className='button' onClick={unlikeScream}>
                        <Favorite color={'primary'} />
                    </IconButton>
                ): (
                    <IconButton className='button'  onClick={likeScream}>
                        <FavoriteBorder color={'primary'} />
                    </IconButton>
                    )
                }
            </>
        )
    }

    const likeScream = () => {
        getLike(screamId).then(res => {
            dispatch(setLike(res.data))
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const unlikeScream = () => {
        getUnlike(screamId).then(res => {
            dispatch(setUnlike(res.data))
        }).catch(err => {
            console.log(err.response.data)
        })
    }

    const renderDeleteScream = () => {
        let isMyScream = (credentials && userHandle === credentials.handle)
        return (
            <>
                { isMyScream && (<DeleteScream screamId={screamId} />) }
            </>
        )
    }

    const deleteScream = () => {
        console.log('delete', screamId)
    }

    return (
        <Card className={classes.card}>
            <CardMedia image={userImage} title="Profile image" className={classes.image} />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`user/${userHandle}`} color="primary">{userHandle}</Typography>
                { authenticated && (renderDeleteScream()) }
                <Typography variant="body2" color="textSecondary" component="p">{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant="body1" component="p">{body}</Typography>
                { !authenticated ? (
                    <IconButton className='button'>
                        <Link to={'/login'}>
                            <FavoriteBorder color={'primary'} />
                        </Link>
                    </IconButton>
                    ): renderLikeButton()
                }
                <span>{likeCount} Likes</span>
                <IconButton className='button'>
                    <ChatIcon color={'primary'} />
                </IconButton>
                <span>{commentCount} Comments</span>
            </CardContent>
        </Card>
    );
}

export default withStyles(styles)(Scream);

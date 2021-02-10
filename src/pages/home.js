import React, { useEffect, useState} from 'react'
import {Grid} from "@material-ui/core";

import Scream from '../components/Scream'
import Profile from '../components/Profile'
import {getAllScreams} from "../services/scream";
import {getScreams} from "../redux/actions/dateActions";
import {useDispatch, useSelector} from "react-redux";

const Home = () => {
    const dispatch = useDispatch()
    const { screams } = useSelector(state => state.data)

    useEffect(() => {
        getAllScreams()
            .then(res => {
                console.log(res.data)
                dispatch(getScreams(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {
                    screams ? (
                        screams.map((scream, index) => <Scream key={index} scream={scream} />)
                    ): <p>loadding ...</p>
                }
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile />
            </Grid>
        </Grid>
    );
}

export default Home

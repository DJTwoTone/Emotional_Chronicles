import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import UserContext from './UserContext';



function Nav({ logout }) {

    const { user } = useContext(UserContext);

    return (
        <nav className="Nav n">

        </nav>
        )



}
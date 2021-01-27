import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withRouter } from 'react-router-dom';

//set up the admin menu
//setup login check

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton : {
        marginRight: theme.spacing(2)
    },
    headerOptions: {
        display: "flex",
        flex: 1,
        justifyContent: 'space-around'
    },
    title: {
        [theme.breakpoints.down('xs')]: {
            flexGrow: 1
        }
    }
}))

function Header(props) {

    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const handleMenu = evt => {
        setAnchorEl(evt.currentTarget);
    };

    const handleMenuClick = url => {
        history.push(url);
        setAnchorEl(null);
    }

    const handleButtonClick = url => {
        history.push(url);
    }

    const menuItems = [
        {
            menuItemName: "Home",
            url: '/'
        },
        {
            menuItemName: "Login",
            url: '/login'
        },
        {
            menuItemName: "Signup",
            url: '/signup'
        },
        {
            menuItemName: "Inspiration",
            url: '/inspiration'
        },
        {
            menuItemName: "Profile",
            url: '/profile'
        },
        {
            menuItemName: "Calendar",
            url: '/calendar'
        },
        {
            menuItemName: "Write",
            url: '/entryform'
        }
    ];

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography>
                        Emotional Chronicles
                    </Typography>
                    {isMobile ? (
                        <>
                        <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='menu'
                            onClick={handleMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: 'right'
                            }}
                            open={open}
                            onClose={() => setAnchorEl(null)}
                        >
                        {menuItems.map(menuItem => {
                            const { menuItemName, url } = menuItem;
                            return (
                                <MenuItem onClick={() => handleMenuClick(url)}>
                                    {menuItemName}
                                </MenuItem>
                            );
                        })}

                        </Menu>

                        </>
                    ) : (
                        <div className={classes.headerOptions}>
                            {menuItems.map(menuItem => {
                                const { menuItemName, url } = menuItem;
                                return (
                                    <Button
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => handleButtonClick(url)}
                                    >
                                        {menuItemName}
                                    </Button>
                                )
                            })}

                        </div>

                    )}
                </Toolbar>

            </AppBar>

        </div>
        
        )


}

export default withRouter(Header)
import React from 'react'
import {
    Box,
    AppBar,
    Toolbar,
    Drawer,
    IconButton,
    Button,
    ListItem,
    List,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
// import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
// import CreateIcon from '@mui/icons-material/Create';
import MenuBookIcon from '@mui/icons-material/MenuBook'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Link from 'next/link'
import { DataStore } from 'aws-amplify'
import { useRouter } from 'next/router'


const NavBar = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const router = useRouter()
    const {user, signOut} = props

    const handleNavChoice = (choice, shouldToggle) => {
        router.push(`/${choice}`)
        if (shouldToggle) toggleDrawer()
    }

    const handleSignOut = () => {
        DataStore.clear()
        signOut()
    }

    const drawerItemList = () => (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                <ListItem button onClick={() => handleNavChoice('characters', true)}>
                    <ListItemIcon>
                        <EmojiPeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Characters" />
                </ListItem>
                <ListItem button onClick={() => handleNavChoice('favorites', true)}>
                    <ListItemIcon>
                        <FavoriteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Favorites" />
                </ListItem>
                <ListItem button onClick={handleSignOut}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>

        </Box>
    )

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ background: '#F0131E' }}>
                    <Toolbar sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <Box>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                onClick={toggleDrawer}
                            >
                                <MenuIcon />
                            </IconButton>
                            <IconButton
                                size="large"
                                aria-label="home button"
                                color="inherit"
                                onClick={() => handleNavChoice('', false)}
                            >
                                    <HomeIcon />
                            </IconButton>
                        </Box>
                        <Box>

                            {!user && (
                            <>
                                <Button color="inherit">
                                    <Link href="/signup"><a>Sign Up</a></Link>
                                </Button>
                                <Button color="inherit">
                                    <Link href="/login"><a>Login</a></Link>
                                </Button>
                            </>
                            )}
                            
                            {user && (
                                <Button color='inherit' onClick={handleSignOut}>
                                    Logout
                                </Button>
                            )}

                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Drawer achor="left" open={isOpen} onClick={toggleDrawer}>
                {drawerItemList()}
            </Drawer>
        </>
    )
}

export default NavBar
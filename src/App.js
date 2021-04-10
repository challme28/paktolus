// @flow
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchStorage,
  login,
  logout,
  selectInitialized,
  selectName,
  selectBalance,
} from './modules/casino/duck';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import logo from './logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
  },
  flexGrow: { flexGrow: 1 },
  logo: {
    height: '32px',
    width: '32px',
  },
}));

function App() {
  const initialized = useSelector(selectInitialized) || false;
  const dispatch = useDispatch();
  if (!initialized) dispatch(fetchStorage());
  const name = useSelector(selectName);
  const balance = useSelector(selectBalance);

  const [user, setUser] = useState(name || "");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(logout());
    setUser("");
    setAnchorEl(null);
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setUser(e.currentTarget.value);
  };

  const handleLogin = () => {
    dispatch(login({ name: user }));
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <AppBar position="static">
          <Toolbar>
            <img src={logo} alt="logo" className={classes.logo}/>
            <Typography variant="h6" className={classes.flexGrow}>
              Paktolus
            </Typography>
            {name &&
            (<>
              <Typography variant="h6">
                Balance: ${balance.toFixed(2)}
              </Typography>
              <IconButton onClick={handleAvatar}>
                <AccountCircle/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>)}
            {!name &&
            (<>
              <Button onClick={handleLogin}>Login</Button>
              <TextField value={user} onChange={handleChange}/>
            </>)
            }
          </Toolbar>
        </AppBar>
      </Container>
    </div>
  );
}

export default App;

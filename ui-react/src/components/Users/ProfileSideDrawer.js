import React from 'react';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import StarIcon from '@material-ui/icons/Star';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function ProfileSideDrawer({
    admin,
    // state to switch pages 
    setHome,
    setUpcoming 
}) {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    Menu: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleHome = () => {
    setHome(true)
    setUpcoming(false)
  };
  const handleUpcoming = () => {
      setUpcoming(true)
      setHome(false)
  }
  const handlePast = () => {

  }
  const handleFavorites = () => {
      
  }
  const handleAdmin = () => {
      
  }


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'Menu'
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key="profile" name="home" value="home" onClick={handleHome}>
            <ListItemIcon name="home"><PersonIcon/></ListItemIcon>
            <ListItemText primary="Profile" id="home" value="home" />
        </ListItem>
        <ListItem button key="upcoming-reservations" name="upcoming" onClick={handleUpcoming}>
            <ListItemIcon><EventAvailableIcon /></ListItemIcon>
            <ListItemText primary="Future Reservations" /> 
        </ListItem>
      </List>
      <List>
          <ListItem button key="past-reservations" onClick={handlePast}>
            <ListItemIcon><EventBusyIcon /></ListItemIcon>
            <ListItemText primary="Past Reservations" />
          </ListItem>
      </List>
      {/* Uncomment when favorite functionality is built */}
      {/* <List>
          <ListItem button key="favorites" onClick={handleFavorites}>
            <ListItemIcon><StarIcon /></ListItemIcon>
            <ListItemText primary="Favorited Items" />
          </ListItem>
      </List> */}
      {admin ? 
      <List>
        <ListItem button key="admin" onClick={handleAdmin}>
            <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
            <ListItemText primary="Admin" />
        </ListItem>
      </List>
      :
      null
      }
    </div>
  );

  return (
    <div>
      {['Menu'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

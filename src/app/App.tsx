import React, {useCallback, useEffect} from 'react'
import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton,
  LinearProgress,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {Todos} from '../features/Todos/Todos'
import {ErrorSnackbar} from '../components/ErrorCnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initAppTC, RequestStatusType} from './app-reducer'
import {Login} from '../features/Login/Login'
import {Route, Switch} from 'react-router-dom'
import {logoutTC} from '../features/Login/auth-reducer'
import {SimpleBackdrop} from '../components/Backdrop/Backdrop'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

const App = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC())
  }, [dispatch])

  useEffect(() => {
    dispatch(initAppTC())
  }, [dispatch])

  return (
    <div>
      <SimpleBackdrop />
      <ErrorSnackbar />
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>

          {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
      <Container fixed>
        <Switch>
          <Route exact path="/" render={() => <Todos />} />
          <Route path="/login" render={() => <Login />} />
        </Switch>
      </Container>
    </div>
  )
}

export default App

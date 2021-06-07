import React from 'react'
import {
  AppBar,
  Button,
  Container,
  createStyles,
  IconButton, LinearProgress,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {Todos} from '../features/Todos/Todos'
import {ErrorSnackbar} from '../components/ErrorCnackbar/ErrorSnackbar'
import {useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'

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

  const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

  return (
    <div>
      <ErrorSnackbar />
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {status === 'loading' && <LinearProgress />}
      <Container fixed>
        <Todos />
      </Container>
    </div>
  )
}

export default App

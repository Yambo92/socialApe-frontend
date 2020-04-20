import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles'

//Icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

//redux
import {connect} from 'react-redux'


const styles = (theme) => ({
    ...theme.spreadThis
})
class Navbar extends Component {
    render() {
        const {authenticated, classes} = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <MyButton tip="创建Scream">
                                <AddIcon className={classes.primaryColor} />
                            </MyButton>
                            <Link to="/">
                                <MyButton tip="主页">
                                    <HomeIcon className={classes.primaryColor} />
                                </MyButton>
                            </Link>
                            <MyButton tip="消息">
                                <Notifications  className={classes.primaryColor} />
                            </MyButton>
                            
                        </Fragment>
                    ) : (
                        <Fragment>
                             <Button color="inherit" component={Link} to="/">主页</Button>
                            <Button color="inherit" component={Link} to="/login">登录</Button>
                            <Button color="inherit" component={Link} to="/signup">注册</Button>
                        </Fragment>
                    )}
                   
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes={
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(Navbar))

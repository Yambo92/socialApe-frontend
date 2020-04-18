import React, { Component } from 'react'
import {Link} from 'react-router-dom'
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';



export default class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/">主页</Button>
                    <Button color="inherit" component={Link} to="/login">登录</Button>
                    <Button color="inherit" component={Link} to="/signup">注册</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

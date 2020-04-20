import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
import {URI} from '../config/api'
import {Link} from 'react-router-dom'
//Mui Stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress'

//redux stuff
import {connect} from 'react-redux'
import {signupUser} from '../redux/actions/userAction'

const styles = (theme) => ({
    ...theme.spreadThis
})

export class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
     
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        };
        this.props.signupUser(newUserData, this.props.history)
        
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Icon" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>SignUp</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="邮箱"
                         className={classes.textfield} helperText={errors.email} error={errors.email ? true : false}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                        />
                        <TextField id="password" name="password" type="password" label="密码" className={classes.textfield}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                             helperText={errors.password} error={errors.password ? true : false}
                        />
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="确认密码" className={classes.textfield}
                            value={this.state.confirmPassword} onChange={this.handleChange} fullWidth
                             helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}
                        />
                        <TextField id="handle" name="handle" type="text" label="唯一标识" className={classes.textfield}
                            value={this.state.handle} onChange={this.handleChange} fullWidth
                             helperText={errors.handle} error={errors.handle ? true : false}
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError} >
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary"
                            className={classes.button}
                            disabled={loading}
                         >
                            注册
                            { loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            ) }
                        </Button>
                        <br /><small>已有账户？ <Link to="/login">登录</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, { signupUser })( withStyles(styles)(signup))

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
const styles = (theme) => ({
    ...theme.spreadThis
})

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post(`${URI}/login`, userData)
        .then(res => {
            localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
            this.setState({
                loading:false
            });
            this.props.history.replace('/')
        })
        .catch(err => {
            this.setState({
                loading: false,
                errors: err.response.data
            })
        })

        
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Icon" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="邮箱"
                         className={classes.textfield} helperText={errors.email} error={errors.email ? true : false}
                            value={this.state.email} onChange={this.handleChange} fullWidth
                        />
                        <TextField id="password" name="password" type="password" label="密码" className={classes.textfield}
                            value={this.state.password} onChange={this.handleChange} fullWidth
                             helperText={errors.password} error={errors.password ? true : false}
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
                            登录
                            { loading && (
                                <CircularProgress size={30} className={classes.progress} />
                            ) }
                        </Button>
                        <br /><small>没有账户？ <Link to="/signup">注册</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)

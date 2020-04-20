import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
//redux
import {connect} from 'react-redux'
import { editUserDetails } from '../redux/actions/userAction'

//Mui
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
//icons
import EditIcon from '@material-ui/icons/Edit'



const styles = (theme) => ({
    ...theme.spreadThis,
    button:{
        float: 'right'
    }
})

class EditDetails extends Component {
    state = {
        bio:'',
        website: '',
        location: '',
        open: false
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }
    componentDidMount(){
        const { credentials } = this.props
        this.mapUserDetailsToState(credentials);
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
 
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location,
        };
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <MyButton tip="编辑详情" placement="top" onClick={this.handleOpen} btnClassName={classes.button}>
                     <EditIcon className={classes.primaryColor} />
                </MyButton>
                <Dialog 
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <DialogTitle>编辑您的详情</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows='3'
                                placeholder="简介。。。"
                                className={classes.TextField}
                                value={this.state.bio}
                                onChange={this.handleChange}
                                fullWidth />
                                 <TextField
                                name="website"
                                type="text"
                                label="Website"
                                multiline
                                rows='3'
                                placeholder="网址。。。"
                                className={classes.TextField}
                                value={this.state.website}
                                onChange={this.handleChange}
                                fullWidth />
                                 <TextField
                                name="location"
                                type="text"
                                label="Location"
                                multiline
                                rows='3'
                                placeholder="地址"
                                className={classes.TextField}
                                value={this.state.location}
                                onChange={this.handleChange}
                                fullWidth />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">取消</Button>
                        <Button onClick={this.handleSubmit} color="primary">确认</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})
const mapActionsToProps = {
    editUserDetails
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails) )

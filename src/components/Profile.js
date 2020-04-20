import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import EditDetails from './EditDetails'
import MyButton from '../util/MyButton'
//Mui
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import MuiLink from '@material-ui/core/Link'
import  Typography  from '@material-ui/core/Typography'
import  Tooltip  from '@material-ui/core/Tooltip'
//redux
import {connect} from 'react-redux'
import {logoutUser, uploadImage} from '../redux/actions/userAction'
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

dayjs.locale('zh-cn');

const styles = (theme) => ({
    ...theme.spreadThis
})


export class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData)
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click();
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, user:
                            { credentials:
                                 { handle, createdAt, imageUrl, bio, website, location },
                                    loading,
                                    authenticated
                            } } = this.props
        
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.pager}>
                <div className={classes.profile}>
                    <div className='image-wrapper'>
                        <img src={imageUrl} alt='profile' className='profile-image' />
                        <input 
                            type="file" 
                            id="imageInput" 
                            hidden="hidden"
                            onChange={this.handleImageChange} />
                       
                        <MyButton tip="编辑图片" onClick={this.handleEditPicture} btnClassName="button" placement="top">
                            <EditIcon className={classes.primaryColor} />   
                        </MyButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {location && (
                            <Fragment>
                                <LocationOn className={classes.primaryColor}/> <span>{location}</span>
                                <hr/>
                            </Fragment>
                            
                        )}
                          {website && (
                            <Fragment>
                                <LinkIcon className={classes.primaryColor}/> 
                                <a href={website} target="_blank" rel="noopener noreferrer">
                                    {' '}{website}
                                </a>
                                <hr/>
                            </Fragment>
                        )}
                        <CalendarToday className={classes.primaryColor}/>{' '}
                          <span> {dayjs(createdAt).format('YYYY-MM')} 加入</span>
                    </div>
                  
                    <MyButton tip="登出" onClick={this.handleLogout} placement="top">
                            <KeyboardReturn className={classes.primaryColor} />   
                        </MyButton>
                    <EditDetails />
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color="primary" component={Link} to="/login">登录</Button>
                    <Button variant='contained' color="secondary" component={Link} to="/signup">注册</Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionsToProps = {
    logoutUser,
    uploadImage
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)( withStyles(styles)(Profile) )
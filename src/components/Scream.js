import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime';

//redux
import {connect} from 'react-redux'
import {likeScream, unlikeScream} from '../redux/actions/dataAction'

//Mui Stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography  from '@material-ui/core/Typography';
//ICONS
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = (theme) => ({
    ...theme.spreadThis,
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        maxWidth: 200,
        minWidth: 125,
        objectFit: "cover"

    },
    content:{
        padding: 25
    }
})
export class Scream extends Component {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)){
            return true;
        } else {
            return false;
        }
    };
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    };
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }
    render() {
        
        dayjs.locale('zh-cn');
        dayjs.extend(relativeTime);
        const { classes,
                scream : {
                     body, createdAt, userImage, userHandle, screamId, likeCount, commentCount 
                    },
                user: {
                    authenticated
                }
                } = this.props;

        const likeButton = !authenticated ? (
            <MyButton tip="Like">
                <Link to="/login">
                    <FavoriteBorder className={classes.primaryColor} />
                </Link>
            </MyButton>
        ) : (
            this.likedScream() ? (
                <MyButton tip="取消赞" onClick={this.unlikeScream}>
                    <FavoriteIcon  className={classes.primaryColor} />
                </MyButton>
            ) : (
                <MyButton tip="赞" onClick={this.likeScream}>
                    <FavoriteBorder  className={classes.primaryColor} />
                </MyButton>
            )
        )

        return (
            <Card className={classes.card}>
                <CardMedia  className={classes.image}
                    image={userImage}
                    title="Profile image"
                />
                <CardContent className={classes.content}>
                    <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>{ userHandle }</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{ body }</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="评论">
                        <ChatIcon className={classes.primaryColor} />
                    </MyButton>
                    <span>{ commentCount } comments</span>
                </CardContent>
                
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)( withStyles(styles)(Scream))

import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';

export default class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            review: null,
            creator: null
        };
    }

    componentDidMount() {
        ReviewService.getReview(this.props.id).then((review) => {
            console.log('[ReviewComponent] Success getting review', review);
            UserService.getUserFullName(review.created_by).then((user) => {
            console.log('[ReviewComponent] Success getting user', user);
            this.setState({creator: user});
            }, (error) => {
            console.log('[ReviewComponent] Error getting user', error);
            });
            this.setState({review: review});
        }, (error) => {
            console.log('[ReviewComponent] Error getting review', error);
        });
    }

    render() {
        return( 
        this.state.review &&
        this.state.creator &&
        <Card style={style} className="md-block-centered">
        <CardTitle title={this.state.creator} subtitle={this.state.review.rating}/>
        <CardText>{this.state.review.comment}</CardText>
      </Card>)
    }
}
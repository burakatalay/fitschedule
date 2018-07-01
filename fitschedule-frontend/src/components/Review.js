import React from 'react';
import {Card, CardText, CardTitle, Divider} from 'react-md';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';

const containerStyle = {margin: '1rem'};
const headerStyle = {display: 'flex', justifyContent: 'space-between', alignItems: 'center'};
const dateStyle = {opacity: 0.5};

export default class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: this.props.courseReviews,
            creatorNames: [],
            reviewContents: [],
            reviewDates: []
        };
        console.log("[Review State]: ", this.state)
    }

    componentDidMount() {
        this.state.reviews.forEach(review => {
            ReviewService.getReview(review).then((writtenreview) => {
                console.log('[ReviewComponent] Success getting review', writtenreview);
                UserService.getUserFullName(writtenreview.created_by).then((user) => {
                    console.log('[ReviewComponent] Success getting user', user);
                    const creators = this.state.creatorNames;
                    creators.push(user);
                    this.setState({creatorNames: creators});
                    console.log("state creator names", this.state.creatorNames);
                }, (error) => {
                    console.log('[ReviewComponent] Error getting user', error);
                });
                const r = this.state.reviewContents;
                r.push(writtenreview.comment);
                this.setState({reviewContents: r});
                console.log("state review contents", this.state.reviewContents);
                const dates = this.state.reviewDates;
                dates.push(writtenreview.created_at);
                this.setState({reviewDates: dates});
            }, (error) => {
                console.log('[ReviewComponent] Error getting review', error);
            });
        });

    }

    render() {
        return (
            <div>
                {this.state.creatorNames.map((name, i) => (
                    <div style={containerStyle} key={i}>
                        <div style={headerStyle}>
                            <h4>{name}</h4>
                            <p style={dateStyle}>{this.state.reviewDates[i].substring(0, 10)}</p>
                        </div>
                        <p>{this.state.reviewContents[i]}</p>
                        <Divider/>
                    </div>
                ))
                }
            </div>
        );
    }
}
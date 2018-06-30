import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import ReviewService from '../services/ReviewService';
import UserService from '../services/UserService';

export default class Review extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            reviews: this.props.courseReviews,
            creatorNames: [],
            reviewContents: [],
            reviewDates: []
        };
        console.log("[Review State]: ",this.state)
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
                this.setState({reviewContents:r});
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
        return(
            <div>
                {this.state.creatorNames.map((name,i) => (
                    <Card className="md-block-centered">
                        <CardTitle title={name} subtitle={this.state.reviewDates[i].substring(0,10)}/>
                        <CardText>
                        <p>
                            {this.state.reviewContents[i]}
                        </p>
                        </CardText>
                    </Card>
                    
                    
                    ))}
            </div>
        );
    }
}
import React from 'react';
import { Button, TextField, SVGIcon } from 'react-md';
import ReviewService from '../services/ReviewService';
import Schedule from './Schedule';


const style = {width: 500, height: 500};

export default class AddReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: this.props.courseId,
            review: ""
        };

        this.onClick = this.onClick.bind(this);
        this.handleChangeReview = this.handleChangeReview.bind(this);
        
    }

    componentDidMount() {
       console.log("componentdidmount");
       console.log(this.state);
    }

    onClick() {
        console.log('[ReviewComponent] Clicked done button for review');
        console.log("course id:", this.state.courseId);
        console.log("review: ", this.state.review);
        ReviewService.publishReview(this.state.courseId, this.state.review).then((review) => {
            console.log('[ReviewComponent] Review published successfully', review);
            this.props.onClick(false);
        }, (error) => {
            console.log('[ReviewComponent] Error getting review', error);
        });
    }

    handleChangeReview(value){
        this.setState({review: value});
    }

    render() {
        return( 
            <div style={style}>
                <TextField
                    id="simple-action-dialog-field"
                    label="Please Review Your Course."
                    placeholder="Review here..."
                    value={this.state.review}
                    onChange={this.handleChangeReview}
                />
                <Button flat primary swapTheming
                    onClick={this.onClick}
                >Done</Button>
          </div>
          
          );
    }
}
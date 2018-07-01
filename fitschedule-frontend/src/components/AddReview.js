import React from 'react';
import {Button, DialogContainer, TextField} from 'react-md';
import ReviewService from '../services/ReviewService';

export default class AddReview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: null,
            review: "",
            visible: false
        };

        this.onClick = this.onClick.bind(this);
        this.hide = this.hide.bind(this);
        this.handleChangeReview = this.handleChangeReview.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    componentWillUnmount() {
        this.props.onRef(undefined);
    }

    onClick() {
        ReviewService.publishReview(this.state.courseId, this.state.review).then((review) => {
            console.log('[ReviewComponent] Success publishing review', review);
            this.hide();
        }, (error) => {
            console.log('[ReviewComponent] Error publishing review', error);
            this.hide();
        });
    }

    handleChangeReview(value) {
        this.setState({review: value});
    }

    show(id) {
        this.setState({visible: true, courseId: id});
    };

    hide() {
        this.setState({visible: false, review: ''});
    };

    render() {
        const actions = [];
        actions.push({secondary: true, children: 'Cancel', onClick: this.hide});
        actions.push(<Button flat primary onClick={this.onClick}>Add Review</Button>);

        return (
            <DialogContainer
                id="simple-action-dialog"
                visible={this.state.visible}
                onHide={this.hide}
                actions={actions}
                title="Leave a review">
                <TextField
                    id="simple-action-dialog-field"
                    label="Please Review Your Course."
                    placeholder="Review here..."
                    value={this.state.review}
                    row={5}
                    onChange={this.handleChangeReview}/>
            </DialogContainer>
        );
    }
}
"use strict";

import React from 'react';
import {Button, Card, CardText, CardTitle, Cell, Grid, Media} from 'react-md';
import {withRouter} from 'react-router-dom'
import Page from "./Page";

const placeCenter = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};
const upperSection = {
    height: '700px',
    backgroundColor: '#EEE'
};

const lowerSection = {
    height: '700px'
};

const lowerHeader = {
    paddingTop: '15px'
};

const gridStyle = {
    height: '600px',
    padding: '16px'
};

const picStyle = {
    top: '15px',
    border: '1px solid',
    borderRadius: '50%',
    backgroundSize: 'cover',
    display: 'block',
    width: '150px',
    height: '150px'
};

const cardStyle = {
    height: '450px',
    width: '300px'
};

const backgroundImage = {
    maxWidth: '100%',
    height: 'auto',
    opacity: '0.2'
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.history.push('/discover');
    }

    render() {
        return (
            <Page>
                <section>
                    <div>
                        <div style={backgroundImage}>
                            <Media>
                                <img
                                    src="https://static1.squarespace.com/static/59395a6af7e0ab64b2dec2b8/t/59d743958419c2e1411cb91a/1507279772412/fitness_efsaneleri_5.jpeg"/>
                            </Media>
                        </div>
                        <div style={placeCenter} className="md-text-center">
                            <form onSubmit={this.handleSubmit}>
                                <h1 className="md-display-4">FitSchedule</h1>
                                <h3 className="md-display-2">Build your fitness schedule right now!</h3>
                                <Button className="md-text-center" id="submit" type="submit" raised secondary>Get
                                    Started</Button>
                            </form>
                        </div>
                    </div>
                </section>
                <section style={lowerSection}>
                    <h2 style={lowerHeader} className="md-text-center">Because what our customers think matters</h2>
                    <Grid style={gridStyle}>
                        <Cell size={4}>
                            <Card style={cardStyle} className="md-block-centered">
                                <Media className="md-block-centered" style={picStyle}>
                                    <img
                                        src="http://gaia.adage.com/images/bin/imgstore/work/full/s/h/u/Shutterstock_TheBestBobintheWorld16.jpg"
                                        alt="customer picture"/>
                                </Media>
                                <CardTitle title="Customer One"/>
                                <CardText>
                                    <p style={lowerHeader}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida nunc nec
                                        ipsum ornare convallis. Vivamus laoreet pellentesque massa, eu viverra ligula
                                        venenatis sit amet. Etiam pretium tincidunt turpis.</p>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell size={4}>
                            <Card style={cardStyle} className="md-block-centered">
                                <Media className="md-block-centered" style={picStyle}>
                                    <img
                                        src="https://thumb9.shutterstock.com/display_pic_with_logo/580987/623388845/stock-photo-sad-disappointed-young-woman-with-glass-of-wine-crying-and-playing-with-shower-in-bathtub-623388845.jpg"
                                        alt="customer picture"/>
                                </Media>
                                <CardTitle title="Customer Two"/>
                                <CardText>
                                    <p style={lowerHeader}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida nunc nec
                                        ipsum ornare convallis. Vivamus laoreet pellentesque massa, eu viverra ligula
                                        venenatis sit amet. Etiam pretium tincidunt turpis, vitae viverra arcu tincidunt
                                        a.</p>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell size={4}>
                            <Card style={cardStyle} className="md-block-centered">
                                <Media className="md-block-centered" style={picStyle}>
                                    <img
                                        src="https://thumb1.shutterstock.com/display_pic_with_logo/937165/115854550/stock-photo-man-with-nervous-crisis-isolated-on-white-background-115854550.jpg"
                                        alt="customer picture"/>
                                </Media>
                                <CardTitle title="Customer Three"/>
                                <CardText>
                                    <p style={lowerHeader}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida nunc nec
                                        ipsum ornare convallis. Vivamus laoreet pellentesque massa, eu viverra ligula
                                        venenatis sit amet. Etiam pretium tincidunt turpis, vitae viverra arcu tincidunt
                                        a.</p>
                                </CardText>
                            </Card>
                        </Cell>
                    </Grid>
                </section>
            </Page>
        )
    }
}


export default withRouter(Home);
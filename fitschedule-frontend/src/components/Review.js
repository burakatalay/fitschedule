import React from 'react';
import { Card, CardTitle, CardText } from 'react-md';

export default class Reviews extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return( <Card style={style} className="md-block-centered">
        <CardTitle title="Using CardTitle" subtitle="With CardText" />
        <CardText>
          <p>
            The <code>CardText</code> component is really just useful for displaying any
            content with some additional padding.
          </p>
        </CardText>
      </Card>)
    }
}
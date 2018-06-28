import React from 'react';

export default class Timeslots extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mon: null,
            tue: null,
            wed: null,
            thu: null,
            fri: null,
            sat: null,
            sun: null,
        };
    }

    componentDidMount() {
        this.props.timeslot.forEach((slot) => {
            switch (slot.day) {
                case 0:
                    const mon = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({mon: mon});
                    break;
                case 1:
                    const tue = {
                        start: sthis.parseDate(lot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({tue: tue});
                    break;
                case 2:
                    const wed = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({wed: wed});
                    break;
                case 3:
                    const thu = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({thu: thu});
                    break;
                case 4:
                    const fri = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({fri: fri});
                    break;
                case 5:
                    const sat = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({sat: sat});
                    break;
                case 6:
                    const sun = {
                        start: this.parseDate(slot.start),
                        end: this.parseDate(slot.end)
                    };
                    this.setState({sun: sun});
                    break;
            }
        });
    }

    parseDate(date) {
        const formattedDate = new Date(date);
        let formattedMinute = formattedDate.getMinutes();
        formattedMinute = formattedMinute === 0 ? '00' : formattedMinute;
        return formattedDate.getHours() + ':' + formattedMinute;
    }

    render() {
        return (
            <div>
                {this.state.mon &&
                <p><strong>Monday: </strong>{this.state.mon.start} - {this.state.mon.end}</p>}
                {this.state.tue &&
                <p><strong>Tuesday: </strong>{this.state.tue.start} - {this.state.tue.end}</p>}
                {this.state.wed &&
                <p><strong>Wednesday: </strong>{this.state.wed.start} - {this.state.wed.end}</p>}
                {this.state.thu &&
                <p><strong>Thursday: </strong>{this.state.thu.start} - {this.state.thu.end}</p>}
                {this.state.fri &&
                <p><strong>Friday: </strong>{this.state.fri.start} - {this.state.fri.end}</p>}
                {this.state.sat &&
                <p><strong>Saturday: </strong>{this.state.sat.start} - {this.state.sat.end}</p>}
                {this.state.sun &&
                <p><strong>Sunday: </strong>{this.state.sun.start} - {this.state.sun.end}</p>}
            </div>
        );
    }
}

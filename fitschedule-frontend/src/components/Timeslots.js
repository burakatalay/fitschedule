import React from 'react';

const labelStyle = {fontWeight: 'bold'};
const rowStyle = {display: 'flex', justifyContent: 'space-between', marginRight: '1rem', marginBottom: '1rem'};

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
                        start: this.parseDate(slot.start),
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
                <div style={rowStyle}>
                    <div style={labelStyle}>Monday:</div>
                    <div>{this.state.mon.start} - {this.state.mon.end}</div>
                </div>}
                {this.state.tue &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Tuesday:</div>
                    <div>{this.state.tue.start} - {this.state.tue.end}</div>
                </div>}
                {this.state.wed &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Wednesday:</div>
                    <div>{this.state.wed.start} - {this.state.wed.end}</div>
                </div>}
                {this.state.thu &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Thursday:</div>
                    <div>{this.state.thu.start} - {this.state.thu.end}</div>
                </div>}
                {this.state.fri &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Friday:</div>
                    <div>{this.state.fri.start} - {this.state.fri.end}</div>
                </div>}
                {this.state.sat &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Saturday:</div>
                    <div>{this.state.sat.start} - {this.state.sat.end}</div>
                </div>}
                {this.state.sun &&
                <div style={rowStyle}>
                    <div style={labelStyle}>Sunday:</div>
                    <div>{this.state.sun.start} - {this.state.sun.end}</div>
                </div>}
            </div>
        );
    }
}

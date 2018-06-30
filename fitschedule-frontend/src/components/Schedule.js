"use strict";

import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import ScheduleService from "../services/ScheduleService";
import UserService from  '../services/UserService';
import { scheduleStyle } from "../css/schedule.css";
import AddReview from './AddReview';

const style = {maxWidth: 500, maxHeight: 500};
var now = new Date();

var colors= {
    "color-1":"rgba(102, 195, 131 , 1)",
    "color-2":"rgba(242, 177, 52, 1)",
    "color-3":"rgba(235, 85, 59, 1)" ,
    "color-4":"rgba(70, 159, 213, 1)",
    "color-5":"rgba(170, 59, 123, 1)"
  }

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected:[],
            cellHeight:30,
            showModal:false,
            rowsPerHour:2,
            numberOfDays:7,
            startDate: new Date(),
            endDate: new Date()+6,
            courseId: 0,
        }
        //courses = this.state.items;
        this.handleRangeSelection = this.handleRangeSelection.bind(this);
        this.handleItemEdit = this.handleItemEdit.bind(this);
        this._openModal = this._openModal.bind(this);
        this._closeModal = this._closeModal.bind(this);
        this.addNewEvent = this.addNewEvent.bind(this);
        this.removeEvent = this.removeEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
        this.changeView = this.changeView.bind(this);
        this.handleCellSelection = this.handleCellSelection.bind(this);
        
    } 

    findCourses() {
        ScheduleService.getSchedule()
            .then((schedule) => {
                console.log('[ScheduleComponent] Success getting user schedule', schedule);
                schedule.forEach((course) => {
                    ScheduleService.getCourse(course)
                        .then((course) => {
                            console.log('[ScheduleComponent] Success getting a course from user schedule', course)
                            const courses = this.state.items;
                            for(var i=0;i<course.timeslot.length;i++) {
                                
                                for(var j=0;j<4;j++) {
                                    const startTime = new Date(course.timeslot[i].start);
                                    const endTime = new Date(course.timeslot[i].end);
                                    const currentDay = startTime.getDay()-1;
                                    const day = course.timeslot[i].day;
                                    var dayDifference = (day+7-currentDay) % 7;
                                    startTime.setDate(startTime.getDate()+(7*j) + dayDifference);
                                    endTime.setDate(endTime.getDate()+(7*j) + dayDifference);
                                    var c = {
                                        "_id": course._id,
                                        "name": course.name,
                                        "startDateTime" : new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate(),startTime.getHours(),startTime.getMinutes()),
                                        "endDateTime"   : new Date(endTime.getFullYear(),endTime.getMonth(),endTime.getDate(),endTime.getHours(),endTime.getMinutes()),
                                        "classes": "color-1"
                                    };
                                    courses.push(c);
                                    this.setState({items:courses});
                                }
                                
                            }
                            
                        });
                });
            }).catch((e) => {
            console.error('[ScheduleComponent] Error getting course providers', e);
        });
    }

    updateCourse() {

    }

    deleteCourse(id) {
        ScheduleService.deleteCourse(id)
            .then(() => {
                console.log('[ScheduleComponent] Success deleting course from the schedule');
                
            }, (error) => {
                console.error('[ScheduleComponent] Error deleting course from the schedule', error);
            });
    }

    //This method will fetch everytime user goes to schedule
    componentDidMount(){
        this.findCourses();
        console.log('[ScheduleComponent] componentDidMount state', this.state);
    }
    
    componentWillReceiveProps(next, last){
        console.log("componentWillReceiveProps");
        console.log(next);
        if(next.items){
            this.setState({items:next.items});
        }
    }
    
    handleItemEdit(item, openModal) {
        console.log("handleItemEdit");
        if(item && openModal === true){
            this.setState({selected:[item]});
            this.setState({courseId: item._id});
            
            console.log("item: ", item);
            return this._openModal();
        }
    }

    //This method is disabled because standard user shouldn't be able to change anaything on the schedule
    handleCellSelection(item, openModal) {
        console.log("handleCellSelection");
        if(this.state.selected && this.state.selected[0] === item){
            return  this._openModal();
        }
        this.setState({selected:[item] });
    }
    
    //update course method will be added here 
    //This method is disabled because standard user shouldn't be able to change anaything on the schedule
    handleRangeSelection (selected) {
        console.log("handleRangeSelection");
        console.log(selected);
        this.setState({selected:selected , showCtrl:true});
        this._openModal();
    }
    
    _openModal(){
        this.setState({showModal:true});
    }
    _closeModal(e){
        if(e){
            e.stopPropagation();
            e.preventDefault();
        }
        this.setState({showModal:false});
    }
    
    handleItemChange(items , item){
        console.log("handleRangeSelection");
        console.log(items);
        this.setState({items:items});
    }
    
    //Update course method will be added here.
    handleItemSize(items , item){
        console.log("handleItemSize")
        this.setState({items:items});
    }
    
    removeEvent(items, item){
        this.deleteCourse(item._id);
        this.setState({items:items});
    }
    
    addNewEvent (items , newItems){
        console.log("addNewEvent");
        this.setState({showModal:false ,selected:[] , items:items});
        this._closeModal();
    }

    editEvent (items , item){
        console.log("editEvent");
        this.setState({showModal:false ,selected:[] , items:items});
        this._closeModal();
    }
    
    changeView (days , event ){
        this.setState({numberOfDays:days});
    }

    render() {
        var AgendaItem = function(props){
            console.log( ' item component props' , props);
            return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
        }
        return (
            <Page>
                <div style={scheduleStyle}>
                <div className="content-expanded">
                    <ReactAgenda
                    minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate()-30)}
                    maxDate={new Date(now.getFullYear(), now.getMonth(), now.getDate()+30)}
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    startAtTime={10}
                    cellHeight={this.state.cellHeight}
                    items={this.state.items}
                    numberOfDays={this.state.numberOfDays}
                    headFormat={"ddd DD MMM"}
                    rowsPerHour={this.state.rowsPerHour}
                    itemColors={colors}
                    autoScale={false}
                    fixedHeader={true}
                    onCellSelect={this.handleCellSelection}
                    onChangeEvent={this.handleItemChange.bind(this)}
                    onChangeDuration={this.handleItemSize.bind(this)}
                    onItemEdit={this.handleItemEdit.bind(this)}
                    onItemRemove={this.removeEvent.bind(this)}/>
                    {
                    this.state.showModal? <Modal clickOutside={this._closeModal} >
                    <div className="modal-content">
                        <AddReview courseId={this.state.courseId} onClick={(value)=>{this.setState({showModal:value})}}/>
                    </div>
                    </Modal>:''
                    }
                </div>
                </div>
            </Page>
        );
    }
}


export default withRouter(Schedule);
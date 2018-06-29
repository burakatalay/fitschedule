"use strict";

import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';
import ScheduleService from "../services/ScheduleService";
import UserService from  '../services/UserService';
import { scheduleStyle } from "../css/schedule.css";

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
            startDate: new Date()
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
                                const startTime = new Date(course.timeslot[i].start);
                                const endTime = new Date(course.timeslot[i].end);
                                
                                // var c = {
                                //     "_id": course._id,
                                //     "name": course.name,
                                //     "startDateTime" : new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate(),startTime.getHours()-2,startTime.getMinutes()),
                                //     "endDateTime"   : new Date(endTime.getFullYear(),endTime.getMonth(),endTime.getDate(),endTime.getHours()-2,endTime.getMinutes()),
                                //     "classes": "color-1"
                                // };
                                var c = {
                                    "_id": guid(),
                                    "courseId": course._id,
                                    "name": course.name,
                                    "startDateTime" : new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate(),startTime.getHours()-2,startTime.getMinutes()),
                                    "endDateTime"   : new Date(endTime.getFullYear(),endTime.getMonth(),endTime.getDate(),endTime.getHours()-2,endTime.getMinutes()),
                                    "classes": "color-1"
                                };
                                courses.push(c);
                                this.setState({items:courses});
                            }
                            
                        });
                });
            }).catch((e) => {
            console.error('[ScheduleComponent] Error getting course providers', e);
        });
    }

    updateCourse() {

    }

    deleteCourse() {
        ScheduleService.deleteCourse(this.state.items.id)
            .then(() => {
                console.log('[ScheduleComponent] Success deleting course from the schedule');
                
            }, (error) => {
                console.error('[ScheduleComponent] Error adding course to the schedule', error);
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
            return this._openModal();
        }
    }

    //This method is disabled because standard user shouldn't be able to change anaything on the schedule
    handleCellSelection(item, openModal) {
        console.log("handleCellSelection");
        console.log(startDate);
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
    
    removeEvent(items , item){
        console.log("RemoveEvent", this.state.items);
        console.log("Items: ", items);
        console.log("Item: ", item);
        const courses = this.state.items;
        for(var i=0;i<courses.length;i++) {
            //TODO Course idlerini cekip silmeceyi burda yap iy calismlr
        }
        //courses.pop(item);
        //this.deleteCourse(items)
        this.setState({ items:courses});
        console.log("after removeEvent Item: ", this.state.items);
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
                    minDate={new Date(now.getFullYear(), now.getMonth(), now.getDate()-10)}
                    maxDate={new Date(now.getFullYear(), now.getMonth(), now.getDate()+10)}
                    startDate={this.state.startDate}
                    startAtTime={10}
                    cellHeight={this.state.cellHeight}
                    items={this.state.items}
                    numberOfDays={this.state.numberOfDays}
                    headFormat={"ddd DD MMM"}
                    rowsPerHour={this.state.rowsPerHour}
                    itemColors={colors}
                    autoScale={false}
                    fixedHeader={true}
                    onChangeEvent={this.handleItemChange.bind(this)}
                    onChangeDuration={this.handleItemSize.bind(this)}
                    onItemEdit={this.handleItemEdit.bind(this)}
                    onItemRemove={this.removeEvent.bind(this)}/>
                    {
                    this.state.showModal? <Modal clickOutside={this._closeModal} >
                    <div className="modal-content">
                        <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />
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
"use strict";

import React from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom'
import Page from "./Page";
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda';

var now = new Date();

var colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
      "color-2":"rgba(242, 177, 52, 1)" ,
      "color-3":"rgba(235, 85, 59, 1)" ,
      "color-4":"rgba(70, 159, 213, 1)",
      "color-5":"rgba(170, 59, 123, 1)"
  }

var items = [
    {
        _id            :guid(),
         name          : 'Meeting , dev staff!',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
         classes       : 'color-1 color-4'
       },
       {
        _id            :guid(),
         name          : 'Working lunch , Holly',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
         classes       : 'color-2'
       },
       {
        _id            :guid(),
         name          : 'Conference , plaza',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11 , 0),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 14 ,30),
         classes       : 'color-4'
       },
       {
        _id            :'event-4',
         name          : 'Customers issues review',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 10, 0),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+2, 15, 0),
         classes       : 'color-3'
     
       },
       {
         _id           :'event-5',
         name          : 'Group activity',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 10, 0),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+3, 16, 30),
         classes       : 'color-4'
       },
       {
         _id           :'event-6',
         name          : 'Fun Day !',
         startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 9, 14),
         endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+7, 17),
         classes       : 'color-3'
       }
   
  ];


class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[],
            selected:[],
            cellHeight:30,
            showModal:false,
            rowsPerHour:2,
            numberOfDays:4,
            startDate: new Date()
          }

        this.handleRangeSelection = this.handleRangeSelection.bind(this)
        this.handleItemEdit = this.handleItemEdit.bind(this)
        this._openModal = this._openModal.bind(this)
        this._closeModal = this._closeModal.bind(this)
        this.addNewEvent = this.addNewEvent.bind(this)
        this.removeEvent = this.removeEvent.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.changeView = this.changeView.bind(this)
        this.handleCellSelection = this.handleCellSelection.bind(this)
    }

    componentDidMount(){
      this.setState({items:items})
    }
    
    componentWillReceiveProps(next, last){
        console.log("componentWillReceiveProps")
        console.log(next)
        if(next.items){
            this.setState({items:next.items})
        }
    }
    
    handleItemEdit(item, openModal) {
        if(item && openModal === true){
          this.setState({selected:[item] })
          return this._openModal();
        }
    }

    //This method is disabled because standard user shouldn't be able to change anaything on the schedule
    handleCellSelection(item, openModal) {
        console.log("handleCellSelection")
        console.log(startDate)
        if(this.state.selected && this.state.selected[0] === item){
          return  this._openModal();
        }
        this.setState({selected:[item] })
    
    }
    
    handleDateRangeChange (startDate, endDate) {
        this.setState({startDate:startDate })
    
    }
    
    //This method is disabled because standard user shouldn't be able to change anaything on the schedule
    handleRangeSelection (selected) {
        console.log("handleRangeSelection")
        console.log(selected)
        this.setState({selected:selected , showCtrl:true})
        this._openModal();
    }
    
    _openModal(){
        this.setState({showModal:true})
    }
    _closeModal(e){
      if(e){
        e.stopPropagation();
        e.preventDefault();
      }
        this.setState({showModal:false})
    }
    
    handleItemChange(items , item){
        this.setState({items:items})
    }
    
    handleItemSize(items , item){
        this.setState({items:items})
    }
    
    removeEvent(items , item){
        this.setState({ items:items});
    }
    
    addNewEvent (items , newItems){
        this.setState({showModal:false ,selected:[] , items:items});
        this._closeModal();
    }
    editEvent (items , item){
        this.setState({showModal:false ,selected:[] , items:items});
        this._closeModal();
    }
    
    changeView (days , event ){
        this.setState({numberOfDays:days})
    }

    render() {
        var AgendaItem = function(props){
            console.log( ' item component props' , props)
            return <div style={{display:'block', position:'absolute' , background:'#FFF'}}>{props.item.name} <button onClick={()=> props.edit(props.item)}>Edit </button></div>
        }
        return (
            <Page>
                <div className="content-expanded ">
                    <div className="control-buttons">
                    <button  className="button-control" onClick={this.changeView.bind(null , 7)}> {moment.duration(7, "days").humanize()}  </button>
                    <button  className="button-control" onClick={this.changeView.bind(null , 4)}> {moment.duration(4, "days").humanize()}  </button>
                    <button  className="button-control" onClick={this.changeView.bind(null , 3)}> {moment.duration(3, "days").humanize()}  </button>
                    <button  className="button-control" onClick={this.changeView.bind(null , 1)}> {moment.duration(1, "day").humanize()} </button>
                    </div>

                    <ReactAgenda
                    minDate={new Date(now.getFullYear(), now.getMonth()-3)}
                    maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
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
                    onItemRemove={this.removeEvent.bind(this)}
                    onDateRangeChange={this.handleDateRangeChange.bind(this)} />
                    {
                    this.state.showModal? <Modal clickOutside={this._closeModal} >
                    <div className="modal-content">
                        <ReactAgendaCtrl items={this.state.items} itemColors={colors} selectedCells={this.state.selected} Addnew={this.addNewEvent} edit={this.editEvent}  />
                    </div>
                    </Modal>:''
                    }
                </div>
            </Page>
        );
    }
}


export default withRouter(Schedule);
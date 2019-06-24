import React, { Component } from 'react';
import './DragList.scss';
import DragListContainer from './DraglistContainer'

class DragList extends Component {
    state={
        datalist:[{
            time:'2019-09-09',
            id:'1',
            content:[{
                text:'sjkvs',
            },{
                text:';jy'
            }],  
        },
        {
            time:'2019-09-07',
            id:'2',
            content:[{
                text:'sjkvs',
            },{
                text:';jy'
            }],  
        },
        {
            time:'2019-09-01',
            id:'3',
            content:[{
                text:'sjkvs',
            },{
                text:';jy'
            }],  
        }]
    }
    render() {
        return (
            <div className="drag-list">
                <DragListContainer datalist ={this.state.datalist}/>
            </div>
        );
    }
}

export default DragList;
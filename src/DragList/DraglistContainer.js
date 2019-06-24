import React, { Component } from 'react';
import './DragList.scss';
import DragListItem from './DragListItem';
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

class DraglistContainer extends Component {
    render() {
        const  datalist = this.props.datalist;
        return (
            <div className="list-container">
                {datalist.map((item) => (
                    <div>
                        <div className="list-title">{item.time}</div>
                        <DragListItem list={item.content}/>
                    </div>
                    
                ))}
                
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DraglistContainer);
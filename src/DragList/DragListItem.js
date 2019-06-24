import React, { Component } from 'react';
import {
    DragSource,
    DropTarget,
} from 'react-dnd';
const Types = {
    CARD: 'CARD'
};
const CardSource = {
    beginDrag(props,monitor,component){
        return {
            index:props.index
        }
    }
};
const CardTarget = {
    canDrop(props,monitor){ //组件可以被放置时触发的事件

    },
    hover(props,monitor,component){ //组件在target上方时触发的事件
        if(!component) return null;
        const dragIndex = monitor.getItem().index;//拖拽目标的Index
        const hoverIndex = props.index; //目标Index
        if(dragIndex === props.lastIndex || hoverIndex === props.lastIndex) return null;
        if(dragIndex === hoverIndex) {return null}//如果拖拽目标和目标ID相同不发生变化
        props.onDND(dragIndex,hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};
function collect1(connect,monitor) {
    return{
        connectDropTarget:connect.dropTarget(),
        isOver:monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    }
}
function collect(connect,monitor) {
    return{
        connectDragSource:connect.dragSource(),
        isDragging:monitor.isDragging()
    }
}
class DragListItem extends Component {
    render() {
        const list = this.props.list;
        return (
            <div>
                {
                    list.map((item) => (
                        <div className="list-item">{item.text}</div>
                    ))
                }
            </div>
        );
    }
}

let flow = require('lodash.flow');
export default flow(
    DragSource(Types.CARD,CardSource,collect),
    DropTarget(Types.CARD,CardTarget,collect1)
)(DragListItem)
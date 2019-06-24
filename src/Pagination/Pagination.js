import React, { Component } from 'react';
import './pagination.scss'
// 第一步:搭建简单页面
// 第二步:通过参数获取页数
// 第三步:使页码可点击
// 第四步:上一页下一页可点击 修复0,>总页数bug
// 第五步:显示部分页码 前3页+...+后3页
// 第六步:点击中间页数更新页码 比如点击7显示 1+....+6 7 8 9 10+...+后5页

class Pagination extends Component {
    state={
        currentPage:1,
        totalPage:this.props.config
    }
    componentDidMount(){

    }
    getPages(totalPage){
        var pages=[];
        const currentPage = this.state.currentPage
        if(totalPage<=10){
            for(let i = 1;i <= totalPage; i++){
                // onClick={()=>this.changeToActive(i)} 不可以直接写成onClick={this.changeToActive(i)} 报错
                pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
            }
        }else{
            if(currentPage<=3){
                for(let i = 1;i <= 3; i++){
                    // onClick={()=>this.changeToActive(i)} 不可以直接写成onClick={this.changeToActive(i)} 报错
                    pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                }
                pages.push(<li className = "ellipsis" key={ -1 }>···</li>)
                for(let i=totalPage-2;i<=totalPage;i++){
                    pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                }
            }else{
                // 当前页大于3
                let startPage = 1
                // 4
                if(currentPage%3!=0){  
                  startPage = currentPage-(currentPage%3)+1;
                }else{
                    //6 
                   startPage = currentPage-2;    
                }
                
                if(startPage+2<totalPage-2){
                    pages.push(<li key={1} onClick={()=>this.changeToActive(1)} className={currentPage === 1 ? "active":""}>{1}</li>)
                    pages.push(<li className = "ellipsis" key={ -1 }>···</li>)
                    for(let i = startPage;i < startPage+3; i++){
                        // onClick={()=>this.changeToActive(i)} 不可以直接写成onClick={this.changeToActive(i)} 报错
                        pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                    }
                    pages.push(<li className = "ellipsis" key={ -1 }>···</li>)
                    for(let i=totalPage-2;i<=totalPage;i++){
                        pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                    }
                }else{
                    for(let i = 1;i <= 3; i++){
                        // onClick={()=>this.changeToActive(i)} 不可以直接写成onClick={this.changeToActive(i)} 报错
                        pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                    }
                    pages.push(<li className = "ellipsis" key={ -1 }>···</li>)
                    for(let i = startPage;i <=totalPage; i++){
                        // onClick={()=>this.changeToActive(i)} 不可以直接写成onClick={this.changeToActive(i)} 报错
                        pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                    }
                }
                
            }
            
        }
        
        return pages;
    
    }
    changeToActive(i){
       this.setState({
           currentPage:i
       })
    }
    goPrev(){
        const currentPage = this.state.currentPage;
        if(currentPage-1===0){
            this.setState({
                currentPage:1
            })
        }else{
            this.setState({
                currentPage:currentPage-1
            })
        }
        
    }
    goNext(){
        const currentPage = this.state.currentPage;
        if(currentPage===this.state.totalPage){
            this.setState({
                currentPage:this.state.totalPage
            })
        }else{
            this.setState({
                currentPage:currentPage+1
            })
        }
    }
    render() {
        const totalPage = this.state.totalPage
        const currentPage = this.state.currentPage
        return (
            <div>
                <ul>
                    <li onClick={() => this.goPrev()} className={currentPage===1?"disabled":""}>上一页</li>
                    {this.getPages(totalPage)}
                    <li onClick={() => this.goNext()} className={currentPage===totalPage?"disabled":""}>下一页</li>
                </ul>
            </div>
        );
    }
}

export default Pagination;
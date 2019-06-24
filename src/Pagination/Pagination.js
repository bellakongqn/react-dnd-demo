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
        totalPage:this.props.config,
        groupCount:5,
    }
    componentDidMount(){

    }
    getPages(totalPage){
        var pages=[];
        const currentPage = this.state.currentPage
        const groupCount = this.state.groupCount
        if(totalPage<=10){
            for(let i = 1;i <= totalPage; i++){
                pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
            }
        }else{
            // 页码大于10 当前页小于5
            if(currentPage<=groupCount){
                for(let i =1 ;i<=groupCount;i++){
                    pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                }
                pages.push(<li key={-1} className="ellipsis">···</li>)
                pages.push(<li key={totalPage} onClick={()=>this.changeToActive(totalPage)} className={currentPage === totalPage ? "active":""}>{totalPage}</li>)
            }else{
                // 当前页大于5
                // 判断开始页码 6|11|16
                if(totalPage-currentPage>groupCount-2){

                    if(currentPage%groupCount!=0){
                        let startPage = (parseInt(currentPage/5))*5+1
                        pages.push(<li key={1} onClick={()=>this.changeToActive(1)} className={currentPage === 1 ? "active":""}>{1}</li>)
                        pages.push(<li key={-1} className="ellipsis">···</li>)
                        for(let i=startPage;i<startPage+groupCount;i++){
                            pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                        } 
                        pages.push(<li key={-1} className="ellipsis">···</li>)
                        pages.push(<li key={totalPage} onClick={()=>this.changeToActive(totalPage)} className={currentPage === totalPage ? "active":""}>{totalPage}</li>)                  
                    }else if(currentPage%groupCount===0){
                        //10 5 15
                        let startPage = currentPage-groupCount+1
                        pages.push(<li key={1} onClick={()=>this.changeToActive(1)} className={currentPage === 1 ? "active":""}>{1}</li>)
                        pages.push(<li key={-1} className="ellipsis">···</li>)
                        for(let i=startPage;i<startPage+groupCount;i++){
                            pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                        }
                        pages.push(<li key={-1} className="ellipsis">···</li>)
                        pages.push(<li key={totalPage} onClick={()=>this.changeToActive(totalPage)} className={currentPage === totalPage ? "active":""}>{totalPage}</li>)     
                    }

                } else if(currentPage%groupCount===0){
                    //10 5 15
                    let startPage = currentPage-groupCount+1
                    pages.push(<li key={1} onClick={()=>this.changeToActive(1)} className={currentPage === 1 ? "active":""}>{1}</li>)
                    pages.push(<li key={-1} className="ellipsis">···</li>)
                    for(let i=startPage;i<startPage+groupCount;i++){
                        pages.push(<li key={i} onClick={()=>this.changeToActive(i)} className={currentPage === i ? "active":""}>{i}</li>)
                    }
                    pages.push(<li key={-1} className="ellipsis">···</li>)
                    pages.push(<li key={totalPage} onClick={()=>this.changeToActive(totalPage)} className={currentPage === totalPage ? "active":""}>{totalPage}</li>)     
                }else{
                    let startPage = totalPage-groupCount+2
                    pages.push(<li key={1} onClick={()=>this.changeToActive(1)} className={currentPage === 1 ? "active":""}>{1}</li>)
                    pages.push(<li key={-1} className="ellipsis">···</li>)
                    for(let i=startPage;i<=totalPage;i++){
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
        if(this.state.currentPage-1===0){
            this.setState({
                currentPage:1
            })
        }else{
            this.setState({
                currentPage:this.state.currentPage-1
            })
        }
        
    }
    goNext(){
        if(this.state.currentPage===this.state.totalPage){
            this.setState({
                currentPage:this.state.totalPage
            })
        }else{
            this.setState({
                currentPage:this.state.currentPage+1
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
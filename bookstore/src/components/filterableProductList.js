import React from 'react';
import '../css/productList.css';
import {SearchBox} from "./searchBox";
import {Link} from 'react-router-dom';
import {getAllBooks} from "../services/bookService";

export class FilterableProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state={searchText:"",inStockOnly:false,page:1,maxPage:1,size:8};
        this.handleSearchTextChange=this.handleSearchTextChange.bind(this);
        this.handleInStockOnlyChange=this.handleInStockOnlyChange.bind(this);
        this.handleOnPageChange=this.handleOnPageChange.bind(this);
        this.updateMaxPage=this.updateMaxPage.bind(this);
    }

    handleSearchTextChange(newSearchText) {
        this.setState(()=>{
            return { searchText: newSearchText, page: 1}
        });
    }

    handleInStockOnlyChange(checked) {
        this.setState(()=>{
            return { inStockOnly: checked, page:1 }
        });
    }

    handleOnPageChange(toPage) {
        this.setState({page: toPage}, ()=>{this.render()});
    }

    updateMaxPage(max) {
        this.setState({maxPage: max}, ()=>{this.render()});
    }

    render() {
        return(
            <div>
                <SearchBox
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                    onSearchTextChange={this.handleSearchTextChange}
                    onInStockOnlyChange={this.handleInStockOnlyChange}
                />
                <ProductList
                    page={this.state.page}
                    pageSize={this.state.size}
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                    updateMaxPage={this.updateMaxPage}
                />
                <Pager
                    onPageChange={this.handleOnPageChange}
                    page={this.state.page}
                    maxPage={this.state.maxPage}
                />
            </div>
        );
    }
}

class ProductList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.updateMaxPage=this.updateMaxPage.bind(this);
        this.state = { productInfo: [] };
        this.getBooks();
    }

    updateMaxPage(max) {
        this.props.updateMaxPage(max);
    }


    getBooks = async () => {
        let books = await getAllBooks();
        this.setState({
            productInfo: books,
        })
    }

    render() {
        let itemShowList=[], i=0, j=0;
        let end=this.props.page*this.props.pageSize;
        let begin=end-this.props.pageSize;
        let productInfo = this.state.productInfo;
        for(i=0;i<productInfo.length;++i) {
            const item=productInfo[i];
            if(this.props.searchText==="" || item.title.indexOf(this.props.searchText)>=0) {
                if (!this.props.inStockOnly || item.stock) {
                    if(j>=begin && j<end) itemShowList.push(<Pditem key={j} product={item}/>);
                    ++j;
                }
            }
        }
        let newMaxPage=Math.ceil(j/this.props.pageSize);
        this.updateMaxPage(newMaxPage);
        return (
            <div className="pdlist">
                <ul className="inner" id="booklist">
                    {itemShowList}
                </ul>
            </div>
        );
    }
}

class Pditem extends React.Component {
    render() {
        return (
            <li className="pditem">
                <Link className="img" to={{pathname: '/bookView/'+ this.props.product.bookID }}>
                    <img src={this.props.product.image} width="132" height="132" />
                </Link>
                <div className="tit">
                    <b className="bookStyle"></b>《{this.props.product.title}》
                </div>
                <div className="info">
                    <span className="price">￥{this.props.product.price / 100}</span>
                </div>
                <div className="moreInfo">库存{this.props.product.stock}件<span><button
                    className="little_cart_button search__button--1">加入购物车</button></span></div>
            </li>
        );
    }
}

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangePage=this.handleChangePage.bind(this);
    }

    handleChangePage(e) {
        console.log("单击了");
        console.log(e.target.title);
        this.props.onPageChange(Number(e.target.title));
    }

    render() {
        let pageList=[];
        const page=this.props.page;
        const maxPage=this.props.maxPage;
        if(page>1) {
            let tmp=page-1;
            pageList.push(<a title={tmp} onClick={this.handleChangePage}>上一页</a>);
        }
        for(var i=1; i<=maxPage; ++i) {
            if(i!=page)
                pageList.push(<a title={i} onClick={this.handleChangePage}>{i}</a>);
            else pageList.push(<a title={i} style={{backgroundColor:"deepskyblue"}}>{i}</a>);
        }
        console.log("maxPage=" + maxPage);
        if(page<maxPage) {
            let tmp=page+1;
            pageList.push(<a title={tmp} onClick={this.handleChangePage}>下一页</a>);
        }
        return (
            <div class="pager">
                <form action='#'>{pageList}</form>
            </div>
        );
    }
}

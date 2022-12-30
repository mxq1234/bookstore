import React, { useState, useEffect } from 'react';
import "../css/bookView.css";
import {useParams} from "react-router-dom";
import Menu from '../components/menu';
import {Link} from 'react-router-dom';
import {getOneBook} from "../services/bookService";
import {joinCart} from "../services/cartService";

export default function BookView() {
    const bookId=useParams().id;
    const [product, setProduct] = useState([]);

    useEffect(async ()=>{
        let bookInfo = await getOneBook(bookId.toString());
        setProduct(bookInfo);
    }, [])

    return (
        <div>
            <Menu isAuthed={true} />
            <div className="view_pathbar">
                您现在的位置：<i>&gt;</i><Link to="/">首页</Link><i>&gt;</i> {product.title}
            </div>
            <div className="view_wraper">
                <div className="view_main_box">
                    <BookInfoView product={product} />
                    <BookDetails product={product} />
                </div>
            </div>
        </div>
    );
}



class BookInfoView extends React.Component {
    constructor(props) {
        super(props);
        this.joinCart = this.joinCart.bind(this);
    }

    joinCart() {
        console.log(this.props.product.bookID);
        const toDo = async () => {
            let data = await joinCart(this.props.product.bookID.toString());
            alert(data.message);
        }
        toDo();
    }

    render() {
        const product=this.props.product;
        return (
            <div className="view_pd-info">
                <div className="view_pd-pic">
                    <a className="view_detail_img">
                        <img src={product.image} className="view_detail_book_img" /></a>
                </div>
                <div className="view_col-left">
                    <h2 className="view_book_title">{product.title}</h2>
                    <div className="view_book_info_view">
                        <p>作者：{product.author}</p>
                        <p>ISBN编号：{product.isbn}</p>
                        <p>库存量：{product.stock}件</p>
                    </div>
                    <div className="view_price-info">
                        <span className="view_price">￥{product.price / 100}</span>
                    </div>
                    <div className="view_choose-amount">
                        <div className="view_wrap-input">
                            <input value="1" data-max="200" style={{width: "50px"}} />
                            <button className="view_incre-btn" data-disabled=" 1 ">-</button>
                            <button className="view_incre-btn" data-disabled="1">+</button>
                        </div>
                    </div>
                    <button className="view_big_cart_button search__button--1" onClick={this.joinCart}>加入购物车</button>
                    <button className="view_big_cart_button search__button--2">立即购买</button>
                </div>
            </div>
        );
    }
}

class BookDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state={editLine: -1}
        this.handleOnBlurSave=this.handleOnBlurSave.bind(this);
        this.handleOnDoubleClick=this.handleOnDoubleClick.bind(this);
    }

    handleOnBlurSave(editContent) {
        // product[this.props.index][detailsLineContent[this.state.editLine]]=editContent;
        this.setState(()=>{
            return { editLine: -1 }
        })
    }

    handleOnDoubleClick(editLineNum) {
        this.setState({editLine: editLineNum }, ()=>{this.render()});
    }

    render() {
        const product=this.props.product;
        return (
            <div className="view_pd-detail">
                <div className="view_tbar">商品详情</div>
                <DetailLine
                    product={product}
                    edit={this.state.editLine}
                    onBlurSave={this.handleOnBlurSave}
                    onDoubleClick={this.handleOnDoubleClick}
                />
            </div>
        );
    }
}

const detailsLineName=["图书名：","作者：","出版社：","定价：","ISBN：", "类型：", "简介："];
const detailsLineContent=["title","author","press","price","isbn", "type", "description"];

class DetailLine extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnblurSave=this.handleOnblurSave.bind(this);
        this.handleDoubleClick=this.handleDoubleClick.bind(this);
    }

    handleOnblurSave(e) {
        this.props.onBlurSave(e.target.value);
    }

    handleDoubleClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.onDoubleClick(e.target.id);
    }

    render() {
        return (
            <form action="#">
                <div className="view_content" deep="3"> {
                    detailsLineName.map((name, index)=>{
                        if(index===this.props.edit) {
                            return <p>{name}
                                <input
                                    defaultValue={this.props.product[detailsLineContent[index]]}
                                    onBlur={this.handleOnblurSave}
                                    autoFocus={true}
                                />
                            </p>
                        } else {
                            if(detailsLineContent[index] === "price") {
                                return <p onDoubleClick={this.handleDoubleClick} id={index}>
                                    {name}{this.props.product[detailsLineContent[index]] / 100}
                                </p>
                            }
                            return <p onDoubleClick={this.handleDoubleClick} id={index}>
                                {name}{this.props.product[detailsLineContent[index]]}
                            </p>
                        }
                    })
                }
                </div>
            </form>
        );
    }
}

import React from 'react';
import '../css/cart.css';
import { getCartItems } from "../services/cartService";
import {withNavigation} from "../utils/withNavigation";

class Cart extends React.Component {
    state = {
        cartItems: [],
        allPrices: 0,
    }

    constructor(props) {
        super(props);
        this.updateOpt = this.updateOpt.bind(this);
        this.goToCheckout = this.goToCheckout.bind(this);
        this.optMap = new Map();
    }

    componentDidMount() {
        const getData = async () => {
            let data = await getCartItems();
            let items = [];
            for(var i = 0; i < data.length; ++i) {
                let item = data[i];
                item["bookID"] = item.id.bookID;
                delete item.id;
                items.push(<CartItem product={item} key={item.bookID} updateOpt={this.updateOpt} />)
            }
            this.setState({cartItems: items});
            console.log(items);
        }
        getData();
    }

    updateOpt(product, number, checked) {
        console.log(product);
        console.log(number);
        console.log(checked);
        if(checked) {
            this.optMap.set(product, number);
        } else {
            this.optMap.delete(product);
        }
        let sum = 0;
        this.optMap.forEach((value, key)=>{
            sum = Number(sum) + Number(key.price * value);
        })
        this.setState({allPrices: sum});
    }

    goToCheckout() {
        if(this.optMap.size > 0) {
            console.log(this.optMap);
            this.props.navigate("/checkout", {state: {opts: this.optMap, sum: this.state.allPrices}});
        } else {
            alert("请选择商品");
        }
    }

    render() {
        return (
            <div>
                <CartTips />
                {
                    this.state.cartItems
                }
                <CartCheckout itemNum={this.optMap.size} sum={this.state.allPrices} onClick={this.goToCheckout} />
            </div>
        );
    }
}

class CartTips extends React.Component {
    render() {
        return (
            <div className="cart_warp_cart">
                <ul className="cart_tips">
                    <li>
                        <input type="checkbox" name="fav" id="all" onClick="checkTest1(this),checkTest2()"/>
                    </li>
                    <li>商品</li>
                    <li>库存</li>
                    <li>单价</li>
                    <li>数量</li>
                    <li>小计</li>
                    <li>操作</li>
                </ul>
            </div>
        );
    }
}

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleNumberChange = this.handleNumberChange.bind(this);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        this.state = {
            checked: false,
            number: 1,
        }
    }

    handleNumberChange(e) {
        this.setState({number: e.target.value});
        if(this.state.checked)  this.props.updateOpt(this.props.product, Number(e.target.value), this.state.checked);
    }

    onCheckBoxChange(e) {
        this.setState(()=>{return {checked: e.target.checked}});
        this.props.updateOpt(this.props.product, this.state.number, e.target.checked);
    }

    render() {
        return (
            <div className="cart_warp_cart">
                <ul className="cart_info_cart">
                    <li className="cart_info_1"><input type="checkbox" checked={this.state.checked} onClick={this.onCheckBoxChange}/></li>
                    <li className="cart_info_2"><img src={this.props.product.image} width="90px"/></li>
                    <li className="cart_info_3"><a>《{this.props.product.title}》</a></li>
                    <li className="cart_info_4"><a>{this.props.product.stock}</a></li>
                    <li className="cart_info_5">￥{this.props.product.price / 100}</li>
                    <li className="cart_info_6">
                        <input type="number" min="1" max="1000" step="1" width={150} value={this.state.number} onChange={this.handleNumberChange}/>
                    </li>
                    <li className="cart_info_7">￥{Number(this.props.product.price * Number(this.state.number)) / 100}</li>
                    <li className="cart_info_8">
                        <a href="javascript:viod(0)" onClick="checkTest4(this),checkTest2()">删除</a><br/>
                    </li>
                </ul>
            </div>
        );
    }
}

class CartCheckout extends React.Component {
    constructor(props) {
        super(props);
        this.goToCheckout = this.goToCheckout.bind(this);
    }

    goToCheckout(e) {
        this.props.onClick();
    }

    render() {
        return (
            <div className="cart_balance cart_warp_cart">
                <ul className="cart_balance_ul1">
                    <li>
                        <input type="checkbox" name="fav" id="" value=""
                               onClick="checkTest1(this),checkTest2()"/> 全选
                    </li>
                    <li><a>删除选中商品</a></li>
                </ul>
                <ul className="cart_balance_ul2">

                    <li>已经选择<span id="snum">{this.props.itemNum}</span>件商品</li>
                    <li>总价 <span id="zongz">￥{this.props.sum / 100}</span></li>
                    <li>
                        <button className="cart_butt" onClick={this.goToCheckout}>去结算</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withNavigation(Cart);

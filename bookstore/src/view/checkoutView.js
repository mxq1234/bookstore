import React from 'react';
import '../css/checkout.css';
import Menu from '../components/menu';
import {withNavigation} from "../utils/withNavigation";
import {checkout} from "../services/orderService";

class CheckoutView extends React.Component {
    constructor(props) {
        super(props);
        this.state={address: "上海市闵行区东川路800号上海交通大学闵行校区", phone: "18309092222", consignee: "李四", optArr: [], allPrices: 0 }
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleConsigneeChange = this.handleConsigneeChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleGoToPay = this.handleGoToPay.bind(this);
    }

    componentDidMount() {
        const opts=this.props.location.state.opts;
        let optArray = [], sum = this.props.location.state.sum;
        opts.forEach((value, key)=>{
            let tmp = key;
            tmp["number"] = Number(value);
            optArray.push(tmp);
        })
        this.setState({optArr: optArray, allPrices: sum});
    }

    handleAddressChange(addr) {
        this.setState({address: addr});
    }

    handlePhoneChange(phoneNum) {
        this.setState({phone:phoneNum});
    }

    handleConsigneeChange(con) {
        this.setState({consignee: con});
    }

    async handleGoToPay() {
        console.log(this.state.address);
        console.log(this.state.consignee);
        var obj = {};
        obj["address"] = this.state.address;
        obj["phone"] = this.state.phone;
        obj["consignee"] = this.state.consignee;
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
        var day = ("0" + (currentTime.getDate())).slice(-2);
        var hour = ("0" + currentTime.getHours()).slice(-2);
        var minute = ("0" + currentTime.getMinutes()).slice(-2);
        var second = ("0" + currentTime.getSeconds()).slice(-2);
        obj["time"] = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        var items = [];
        for(var i = 0; i < this.state.optArr.length; ++i) {
            var item = {};
            item["bookID"] = String(this.state.optArr[i]["bookID"]);
            item["price"] = String(this.state.optArr[i]["price"]);
            item["number"] = String(this.state.optArr[i]["number"]);
            item["stock"] = String(this.state.optArr[i]["stock"]);
            items.push(item);
        }
        obj["items"] = items;
        obj["payment"] = this.state.allPrices.toString();
        console.log(obj);

        let data = await checkout(obj);
        if(data.status > 0) {
            alert(data.message);
            this.props.navigate("/order", {replace: true});
        } else {
            alert(data.message);
        }
    }

    render() {
        return (
            <div>
                <Menu isAuthed={true}/>
                <ConfirmItemToBuy opts={this.state.optArr} />
                <ConfirmInfo
                    handleAddressChange={this.handleAddressChange}
                    handlePhoneChange={this.handlePhoneChange}
                    handleConsigneeChange={this.handleConsigneeChange}
                />
                <GoToPay itemNum={this.state.optArr.length} allPrices={this.state.allPrices} handleGoToPay={this.handleGoToPay}/>
            </div>
        );
    }
}

class ConfirmItemToBuy extends React.Component {
    render() {
        console.log(this.props.opts);
        return (
            <div>
                <div class="title_cart warp_cart">
                    <h3>确认订单</h3>
                </div>
                <div class="tips warp_cart">
                    <ul>
                        <li></li>
                        <li>商品</li>
                        <li>数量</li>
                        <li>单价</li>
                        <li>小计</li>
                    </ul>
                </div>

                {
                    this.props.opts.map((item, index)=>{
                        return <ToBuyItem product={item} key={index} />
                    })
                }
            </div>
        );
    }
}

class ToBuyItem extends React.Component {
    render() {
        const totalPrice = this.props.product.price * this.props.product.number;
        console.log(totalPrice);
        return (
            <div className="info_cart warp_cart">
                <ul>
                    <li className="info_1"><img src={this.props.product.image} width="90px"/></li>
                    <li className="info_2"><a>《{this.props.product.title}》</a></li>
                    <li className="info_3">{this.props.product.number}</li>
                    <li className="info_4"><a>￥{this.props.product.price / 100}</a></li>
                    <li className="info_5">￥{totalPrice / 100}</li>
                </ul>
            </div>
        );
    }
}

class ConfirmInfo extends React.Component {
    constructor(props) {
        super(props);
        this.onAddressBlur = this.onAddressBlur.bind(this);
        this.onPhoneBlur = this.onPhoneBlur.bind(this);
        this.onConsigneeBlur = this.onConsigneeBlur.bind(this);
    }

    onAddressBlur(e) {
        this.props.handleAddressChange(e.target.value);
    }

    onPhoneBlur(e) {
        this.props.handlePhoneChange(e.target.value);
    }

    onConsigneeBlur(e) {
        this.props.handleConsigneeChange(e.target.value);
    }

    render() {
        return (
            <div className="info_cart warp_cart" style={{backgroundColor: "#92b5bb", height: 240, paddingTop: 2}}>
                <div className="post_select">
                    <span><div className="post_question" style={{display: "inline"}}>配送到</div></span>
                    <select className="add_select">
                        <option>上海市</option>
                    </select>
                    <select className="add_select" defaultValue="闵行区">
                        <option>黄浦区</option>
                        <option>静安区</option>
                        <option>杨浦区</option>
                        <option>徐汇区</option>
                        <option>长宁区</option>
                        <option>普陀区</option>
                        <option>闵行区</option>
                        <option>虹口区</option>
                        <option>宝山区</option>
                        <option>浦东新区</option>
                        <option>嘉定区</option>
                        <option>青浦区</option>
                        <option>松江区</option>
                        <option>奉贤区</option>
                        <option>金山区</option>
                        <option>崇明区</option>
                    </select>
                </div>
                <div className="post_question">收货地址:</div>
                <input className="post_add" defaultValue="上海市闵行区东川路800号上海交通大学闵行校区" onBlur={this.onAddressBlur}></input>
                <div className="post_question" style={{display: "inline"}}>收货人:</div>
                <input className="post_add" defaultValue="李四" onBlur={this.onConsigneeBlur}></input>
                <div className="post_question" style={{display: "inline"}}>收货人电话:</div>
                <input className="post_add" defaultValue="18309092222" onBlur={this.onPhoneBlur}></input>
            </div>
        );
    }
}

class GoToPay extends React.Component {
    render() {
        return (
            <div className="balance warp_cart">
                <ul className="balance_ul2">
                    <li>共<span id="snum">{this.props.itemNum}</span>种商品</li>
                    <li>总价 <span id="zongz">￥{this.props.allPrices / 100}</span></li>
                    <li>
                        <button className="butt" onClick={this.props.handleGoToPay}>去支付</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default withNavigation(CheckoutView);

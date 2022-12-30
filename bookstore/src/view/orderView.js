import React from 'react';
import '../css/order.css';
import Menu from '../components/menu';
import {Order, OrderDelete} from "../components/order";
import {OrderSearchBox} from "../components/orderSearchBox";
import {getAllOrders, getOrders} from "../services/orderService";

var allOrders = []

class OrderView extends React.Component {
    state = {
        orders: [],
        searchText:"",
        isRecent:false
    }

    constructor(props) {
        super(props);
        this.handleSearchTextChange=this.handleSearchTextChange.bind(this);
        this.handleIsRecentChange=this.handleIsRecentChange.bind(this);
        this.isRecently=this.isRecently.bind(this);
    }

    handleSearchTextChange(newSearchText) {
        this.setState(()=>{
            return { searchText: newSearchText}
        });
        let ordersArr = [];
        for (let i = 0; i < allOrders.length; ++i) {
            if(this.state.isRecent && !this.isRecently(allOrders[i].time)) continue;
            let orderItems = allOrders[i].orderItems;
            for(let j = 0; j < orderItems.length; ++j) {
                if (newSearchText == "" || orderItems[j].title.indexOf(newSearchText) >= 0) {
                    ordersArr.push(<Order orderInfo={allOrders[i]}/>);
                    break;
                };
            }
        }
        this.setState({orders: ordersArr});
    }

    isRecently = (date)=>{
        console.log(date);
        let currentTime = new Date();
        let year = currentTime.getFullYear();
        let month = ("0" + (currentTime.getMonth())).slice(-2);
        let day = ("0" + (currentTime.getDate())).slice(-2);
        let hour = ("0" + currentTime.getHours()).slice(-2);
        let minute = ("0" + currentTime.getMinutes()).slice(-2);
        let second = ("0" + currentTime.getSeconds()).slice(-2);
        let limitTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        console.log(limitTime);
        return (date >= limitTime);
    }

    handleIsRecentChange(checked) {
        this.setState(()=>{
            return { isRecent: checked}
        });
        let ordersArr = [];
        for (let i = 0; i < allOrders.length; ++i) {
            console.log(allOrders[i]);
            if(checked && !this.isRecently(allOrders[i].time))  continue;
            let orderItems = allOrders[i].orderItems;
            for(let j = 0; j < orderItems.length; ++j) {
                if (this.state.searchText === "" || orderItems[j].title.indexOf(this.state.searchText) >= 0) {
                    ordersArr.push(<Order orderInfo={allOrders[i]}/>);
                    break;
                };
            }
        }
        this.setState({orders: ordersArr});
    }

    componentDidMount() {
        const getData = async () => {
            this.admin = (JSON.parse(localStorage.getItem("user")).userType > 0);
            if(!this.admin) {
                let data = await getOrders();
                console.log(data);
                data.reverse();
                allOrders = data;
                let ordersArr = [];
                for (var i = 0; i < data.length; ++i)
                    ordersArr.push(<Order orderInfo={data[i]}/>)
                this.setState({orders: ordersArr});
            } else {
                let data = await getAllOrders();
                console.log(data);
                data.reverse();
                allOrders = data;
                let ordersArr = [];
                for (var i = 0; i < data.length; ++i)
                    ordersArr.push(<Order orderInfo={data[i]}/>)
                this.setState({orders: ordersArr});
            }
        }
        getData();
    }

    render() {
        console.log(this.state.orders);
        return (
            <div>
                <Menu isAuthed={true}  isAdmin={this.admin}/>
                <OrderSearchBox
                    searchText={this.state.searchText}
                    inStockOnly={this.state.isRecent}
                    onSearchTextChange={this.handleSearchTextChange}
                    onInStockOnlyChange={this.handleIsRecentChange}
                />

                <div className="order_title_cart order_warp_cart">
                    <h3>全部订单</h3>
                </div>

                {
                    this.state.orders
                }

                <OrderDelete />
            </div>
        );
    }
}

export default OrderView;

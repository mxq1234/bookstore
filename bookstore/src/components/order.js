import React from 'react';

class Order extends React.Component {
    render() {
        const orderItems = this.props.orderInfo.orderItems;
        console.log(orderItems);
        return (
            <>
                <div className="account_info account_warp" style={{height: 60}}>
                    <span className="post_question">订单号: {this.props.orderInfo.orderID}</span>
                    <span className="post_question">时间：{this.props.orderInfo.time}</span>
                    <span className="post_question">电话:{this.props.orderInfo.phone}</span>
                    <span className="post_question">收货人:{this.props.orderInfo.consignee}</span>
                    <span className="post_question">付款：{this.props.orderInfo.payment / 100}</span>
                    <div className="post_question">地址:{this.props.orderInfo.address}</div>
                </div>
                <OrderTips />
                {
                    this.props.orderInfo.orderItems.map((item, index)=>{
                        return <OrderItem key={index} product={item}
                                          state={this.props.orderInfo.state}
                                          consignee={this.props.orderInfo.consignee}
                        />
                    })
                }
            </>
        );
    }
}

class OrderTips extends React.Component {
    render() {
        return (
            <div className="order_warp_cart">
                <ul className="order_tips">
                    <li>
                        <input type="checkbox" name="fav" id="all" onClick="checkTest1(this),checkTest2()"/>
                    </li>
                    <li>商品</li>
                    <li>数量</li>
                    <li>单价</li>
                    <li>总价</li>
                    <li>状态</li>
                    <li>操作</li>
                </ul>
            </div>
        );
    }
}

class OrderItem extends React.Component {
    render() {
        return (
            <div className="order_warp_cart">
                <ul className="order_info_cart">
                    <li className="order_info_1"><input type="checkbox" name="fav" onClick="checkTest2()"/></li>
                    <li className="order_info_2"><img src={this.props.product.image} width="90px"/></li>
                    <li className="order_info_3"><a>《{this.props.product.title}》</a></li>
                    <li className="order_info_4"><a>{this.props.product.quantity}</a></li>
                    <li className="order_info_5">￥{this.props.product.unitPrice / 100}</li>
                    <li className="order_info_6">
                        <a>￥{(Number(this.props.product.unitPrice / 100) * Number(this.props.product.quantity)).toFixed(2)}</a>
                    </li>
                    <li className="order_info_7">{this.props.state}</li>
                    <li className="order_info_8">
                        <a href="javascript:viod(0)" onClick="checkTest4(this),checkTest2()">删除订单</a><br/>
                        <a href="javascript:viod(0)" onClick="checkTest4(this),checkTest2()">申请退款</a><br/>
                        <a href="javascript:viod(0)" onClick="checkTest4(this),checkTest2()">商品评价</a><br/>
                    </li>
                </ul>
            </div>
        );
    }
}

class OrderDelete extends React.Component {
    render() {
        return (
            <div className="order_balance warp_cart">
                <ul className="order_balance_ul1">
                    <li>
                        <input type="checkbox" name="fav" id="" value="" onClick="checkTest1(this),checkTest2()"/> 全选
                    </li>
                </ul>
                <ul className="order_balance_ul2">
                    <li>已经选择<span id="snum">0</span>份订单</li>
                    <li>
                        <button className="order_butt" style={{float: "right"}}>删除订单</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export { Order, OrderDelete }

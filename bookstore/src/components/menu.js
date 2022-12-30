import React from 'react';
import '../css/menu.css';
import { Link } from 'react-router-dom';
import {userLogOut} from "../services/userService";
import {withNavigation} from "../utils/withNavigation";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut = (e) =>{
        userLogOut({}, this.props.navigate);
    }

    render() {
        var userName = "";
        if(this.props.isAuthed)
            userName = JSON.parse(localStorage.getItem('user')).userName;
        if(!this.props.isAdmin)
        return(
            <div className="menu">
                <div className="logo-icon">
                    <img src={require("../images/logo.png")} className="img-logo" />
                </div>
                {this.props.isAuthed ?
                    <ul className="menu-ul">
                        <li className="active"><Link to="/" className="home">首页</Link></li>
                        <li><Link to="/order" className="myOrder">我的订单</Link></li>
                        <li><Link to="/account" className="account">我的账户</Link></li>
                        <li><Link to="/cart" className="cart">购物车</Link></li>
                        <li><Link to="/census" className="checkout">统计</Link></li>
                        <li style={{float: "right"}} onClick={this.handleLogOut}>退出</li>
                        <li style={{float: "right", marginRight: "30px"}}>Hi!&nbsp;{userName}&nbsp;</li>
                    </ul> :
                    <ul className="menu-ul">
                        <li className="active"><Link to="/" className="home">首页</Link></li>
                        <li style={{float: "right"}}><Link to="/login" className="login">登录</Link></li>
                        <li style={{float: "right"}}><Link to="/register" className="register">注册</Link></li>
                    </ul>
                }
            </div>
        );
        else
        return(
            <div className="menu">
                <div className="logo-icon">
                    <img src={require("../images/logo.png")} className="img-logo" />
                </div>
                {this.props.isAuthed ?
                    <ul className="menu-ul">
                        <li className="active"><Link to="/" className="home">书籍管理</Link></li>
                        <li><Link to="/order" className="myOrder">订单管理</Link></li>
                        <li><Link to="/userAdmin" className="account">用户管理</Link></li>
                        <li><Link to="/census" className="checkout">统计</Link></li>
                        <li style={{float: "right"}} onClick={this.handleLogOut}>退出</li>
                        <li style={{float: "right", marginRight: "30px"}}>Hi!&nbsp;{userName}&nbsp;</li>
                    </ul> :
                    <ul className="menu-ul">
                        <li className="active"><Link to="/" className="home">首页</Link></li>
                        <li style={{float: "right"}}><Link to="/login" className="login">登录</Link></li>
                        <li style={{float: "right"}}><Link to="/register" className="register">注册</Link></li>
                    </ul>
                }
            </div>
        );
    }
}

export default withNavigation(Menu);

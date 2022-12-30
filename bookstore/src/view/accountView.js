import React from 'react';
import '../css/account.css';
import Menu from '../components/menu';

class AccountView extends React.Component {
    render() {
        return (
            <div>
                <Menu isAuthed={true} />

                <div className="account_info account_warp">
                    <div className="post_question">用户名: &nbsp; &nbsp;</div>
                    <input className="post_add" value="thunderboy"></input>
                    <br/>
                    <div className="post_question">身份：&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;用户</div>
                    <div className="post_question">常用电话:</div>
                    <input className="post_add" value="18309092222"></input>
                    <br/>
                    <div className="post_question">电子邮箱:</div>
                    <input className="post_add" value="thunderboy@sjtu.edu.cn" style={{width: "300px"}}></input>
                    <br/>
                    <div className="post_question">默认收货地址:</div>
                    <input className="post_add" value="上海市闵行区东川路800号上海交通大学闵行校区"></input>
                    <div className="post_question">修改登录密码:</div>
                    <input className="post_add" placeholder="请输入原密码"></input>
                    <input className="post_add" placeholder="请输入新密码"></input>
                    <input className="post_add" placeholder="请再次输入新密码"></input>
                </div>
                <div className="account_warp"><button className="account_butt">保存</button></div>
            </div>
        );
    }
}

export default AccountView;

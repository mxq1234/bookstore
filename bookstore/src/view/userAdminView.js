import React from 'react';
import '../css/account.css';
import Menu from '../components/menu';
import {postRequest} from "../utils/ajax";
import {userBan, userUnban} from "../services/userService";

class UserAdminView extends React.Component {
    state = {
        ban: "",
        unban: ""
    }

    constructor(props) {
        super(props);
        this.handleBanChange = this.handleBanChange.bind(this);
        this.handleUnBanChange = this.handleUnBanChange.bind(this);
        this.handleBan = this.handleBan.bind(this);
        this.handleUnBan = this.handleUnBan.bind(this);
    }

    handleBanChange(e) {
        this.setState({ban: e.target.value});
    }

    handleUnBanChange(e) {
        this.setState({unban: e.target.value});
    }

    handleBan() {
        let userID = this.state.ban;
        this.setState({ban: ""});
        const toDo = async () => {
            let data = await userBan(userID);
            if(data.status) {
                alert("已禁用用户" + userID);
            } else {
                alert("禁用失败，该用户可能已被禁用");
            }
        }
        toDo();
    }

    handleUnBan() {
        let userID = this.state.unban;
        this.setState({unban: ""});
        const toDo = async () => {
            let data = await userUnban(userID);
            if(data.status) {
                alert("已解禁用户" + userID);
            } else {
                alert("解禁失败，该用户可能未被禁用");
            }
        }
        toDo();
    }

    render() {
        const isAdmin = (JSON.parse(localStorage.getItem("user")).userType > 0);
        return (
            <div>
                <Menu isAuthed={true} isAdmin={isAdmin} />

                <div className="account_info2 account_warp">
                    <div className="post_question">用户ID: &nbsp; &nbsp;</div>
                    <input className="post_add" onChange={this.handleBanChange} value={this.state.ban}></input>
                    <br/>
                </div>
                <div className="account_warp"><button className="account_butt" onClick={this.handleBan}>禁用</button></div>

                <div className="account_info2 account_warp">
                    <div className="post_question">用户ID: &nbsp; &nbsp;</div>
                    <input className="post_add" onChange={this.handleUnBanChange} value={this.state.unban}></input>
                    <br/>
                </div>
                <div className="account_warp"><button className="account_butt" onClick={this.handleUnBan}>解禁</button></div>

            </div>
        );
    }
}

export default UserAdminView;

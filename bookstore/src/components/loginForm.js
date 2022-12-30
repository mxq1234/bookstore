import React, {Component} from 'react';
import {withNavigation} from '../utils/withNavigation';
import { Form, Button, Input, Checkbox } from 'antd';
import {userLogin} from '../services/userService';
import {Link} from "react-router-dom";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleFinish = this.handleFinish.bind(this);
    }

    handleFinish = (values)=>{
        let {userName, password} = values;
        console.log(userName);
        console.log(this.props);
        userLogin(values, this.props.navigate);
    }

    render() {
        return (
            <Form onFinish={this.handleFinish} className="login-form">

                <Form.Item name="userName" rules={[
                    { required: true, message: '用户名不能为空!' }
                ]}>
                    <div className="fm-field">
                        <div>
                            <label className="fm-label-icon">
                                <i className="icon-user iconfont" title="请输入用户名"></i>
                            </label>
                        </div>
                        <div>
                            <input
                                name="fm-login-id"
                                type="text"
                                className="fm-text"
                                placeholder="请输入用户名"
                            />
                        </div>
                    </div>
                </Form.Item>

                <Form.Item name="password" rules={[
                    { required: true, message: '密码不能为空!' }
                ]}>
                    <div className="fm-field">
                        <div>
                            <label className="fm-label-icon">
                                <i className="icon-pwd iconfont" title="请输入登录密码"></i>
                            </label>
                        </div>
                        <div>
                            <input
                                name="fm-login-password"
                                type="password"
                                className="fm-text"
                                aria-label="请输入登录密码"
                                placeholder="请输入登录密码"
                            />
                        </div>
                    </div>
                </Form.Item>

                <Form.Item>
                    <Link className="forgot-password" to="/login">
                        忘记密码
                    </Link>
                    <Link className="free-register" to="/register">
                        免费注册
                    </Link>
                    <button type="primary" htmlType="submit"  className="fm-button password-login">
                        登录
                    </button>
                </Form.Item>
            </Form>
        );
    }
}

export default withNavigation(LoginForm);

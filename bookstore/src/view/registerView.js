import React from 'react';
import '../css/register.css';
import Menu from '../components/menu';
import { Form } from 'antd';
import { register, validateUserName } from "../services/userService";
import {useNavigate} from "react-router-dom";

const RegisterView = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const handleRegister = async (info) => {
        let result = await register(info);
        if(result.status) {
            alert("注册成功");
            navigate("/login", { replace: true });
        } else {
            alert("注册失败，请稍后重试");
        }
    }

    return (
        <div>
            <Menu isAuthed={false} />

            <div className="register_info register_warp">
                <Form onFinish={handleRegister} form={form} layout={"vertical"}>
                    <Form.Item name="userName" label="用户名:" rules={[
                        { required: true, message: '用户名不能为空!' },
                        { validator: async (_, value) => {
                            let result = await validateUserName(value);
                            if(result === 1) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error("用户名重复") );
                            }
                        }}
                    ]} validateTrigger="onBlur">
                        <input className="post_add" placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item name="email" label="电子邮箱:" rules={[
                        {required: true, message: "电子邮箱不能为空"},
                        {type: 'email', message:"请输入正确的邮箱地址"}
                    ]}>
                        <input className="post_add" placeholder="请输入邮箱地址"/>
                    </Form.Item>
                    <Form.Item name="password" label='密码:' rules={[{required: true, message: '请输入密码'}]}>
                        <input className="post_add" placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item name="confirm" label='确认密码:' dependencies={['password']}  rules={[
                        {required: true, message: "请再次输入密码" },
                        {validator: (_, value) => {
                            if(value === form.getFieldValue("password")) {
                                return Promise.resolve();
                            } else {
                                return Promise.reject(new Error("两次输入的密码不一致"));
                            }
                        }}
                    ]} validateTrigger='onBlur'>
                        <input className="post_add" placeholder="请再次输入密码" />
                    </Form.Item>
                    <button className="register_butt" type='submit'>注册</button>
                </Form>
            </div>
        </div>
    );
}

export default RegisterView;

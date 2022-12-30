import React from 'react';
import '../css/login.css';
import Menu from '../components/menu';
import LoginForm from "../components/loginForm";

class LoginView extends React.Component {
    render() {
        return(
            <div>
                <Menu isAuthed={false} />

                <div className="login-bg">
                    <div className="content">
                        <div className="content-layout">
                            <div className="login-box-warp">
                                <div className="login-box">
                                    <div className="width-vertical login-label-icon login-view-password">
                                        <div className="login-content">
                                            <div className="blank"></div>
                                            <LoginForm />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;

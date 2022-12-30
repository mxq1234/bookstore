import React from 'react';
import {postRequest} from "./ajax";
import {Navigate} from "react-router-dom";
import {checkAuthed} from "../services/userService";

export default class RequireAuth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
            hasAuthed: false,
        };
        this.checkAuth = this.checkAuth.bind(this);
    }

    checkAuth = (data) => {
        console.log(data);
        if (data.status > 0) {
            this.setState({isAuthed: true, hasAuthed: true});
        } else {
            this.setState({isAuthed: false, hasAuthed: true});
        }
    };

    componentDidMount() {
        const toDo = async () => {
            let result = await checkAuthed();
            this.checkAuth(result);
        }
        toDo();
    }

    componentWillUnmount() {

    }

    render() {
        console.log(this.state.isAuthed);

        if (!this.state.hasAuthed) {
            return null;
        }

        return (this.state.isAuthed?  <Navigate to="/" replace/> : this.props.children);
    }
}

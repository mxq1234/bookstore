import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeView from "./view/homeView";
import LoginView from './view/loginView';
import {history} from "./utils/history";
import BookView from './view/bookView';
import CartView from "./view/cartView";
import RegisterView from "./view/registerView";
import OrderView from "./view/orderView";
import CheckoutView from "./view/checkoutView";
import AccountView from "./view/accountView";
import RequireAuth from "./utils/requireAuth";
import RequireUnAuth from "./utils/requireUnAuth";
import UserAdminView from "./view/userAdminView";
import CensusView from "./view/census";

class BasicRoute extends React.Component{

    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Routes>
                    <Route path="/" element={<RequireAuth><HomeView /></RequireAuth>} />
                    <Route path="/login" element={<RequireUnAuth><LoginView /></RequireUnAuth>} />
                    <Route path="/register" element={<RequireUnAuth><RegisterView /></RequireUnAuth>} />
                    <Route exact path="/bookView/:id" element={<RequireAuth><BookView /></RequireAuth>} />
                    <Route path="/cart" element={<RequireAuth><CartView /></RequireAuth>} />
                    <Route path="/order" element={<RequireAuth><OrderView /></RequireAuth>} />
                    <Route path="/checkout" element={<RequireAuth><CheckoutView /></RequireAuth>} />
                    <Route path="/account" element={<RequireAuth><AccountView /></RequireAuth>} />
                    <Route path="/userAdmin" element={<RequireAuth><UserAdminView /></RequireAuth>} />
                    <Route path="/census" element={<RequireAuth><CensusView /></RequireAuth>} />
                </Routes>

            </Router>
        )
    }
}

class Hello extends React.Component {
    render() {
        return (
            <div>
                Hello world! {this.props.title}
            </div>
        );
    }
}

export default BasicRoute;

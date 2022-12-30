import React from 'react';
import '../css/home.css';
import Menu from "../components/menu";
import {FilterableProductList} from "../components/filterableProductList";
import {AdminBookList} from "../components/adminBookList";

class HomeView extends React.Component {
    render() {
        if(JSON.parse(localStorage.getItem("user")).userType === 0)
            return(
                <div>
                    <Menu isAuthed={true} isAdmin={false} />
                    <FilterableProductList />
                </div>
            );
        else
            return(
                <div>
                    <Menu isAuthed={true} isAdmin={true} />
                    <AdminBookList />
                </div>
            );
    }
}

export default HomeView;

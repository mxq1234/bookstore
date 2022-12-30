import React from 'react';
import Menu from '../components/menu';
import { FilterBox } from "../components/filterBox";
import Cart from '../components/cart';

class CartView extends React.Component {
    render() {
        return (
            <div>
                <Menu isAuthed={true} />
                <FilterBox />
                <Cart />
            </div>
        );
    }
}

export default CartView;

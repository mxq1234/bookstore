import React from 'react';
import '../css/filterBox.css';

export class FilterBox extends React.Component {
    render() {
        return (
            <div className="filterBoxLine">
                <div className="filterBox">
                    <div className="search_div">
                        <input type="text" className="search_cart_text" placeholder="搜索购物车"/>
                        <select className="search_order_filter ">
                            <option data-display="All Orders ">
                                所有
                            </option>
                            <option value="1 ">
                                一周内
                            </option>
                            <option value="2 ">
                                一个月内
                            </option>
                            <option value="3 ">
                                一年内
                            </option>
                        </select>
                        <input type="button" value="搜索" className="search_cart_but"/>
                    </div>
                </div>
            </div>
        );
    }
}

import React from 'react';
import '../css/searchBox.css';

export class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.searchBoxHandlerSearchTextChange=this.searchBoxHandlerSearchTextChange.bind(this);
        this.searchBoxHandlerInStockOnlyChange=this.searchBoxHandlerInStockOnlyChange.bind(this);
    }

    searchBoxHandlerSearchTextChange(e) {
        this.props.onSearchTextChange(e.target.value);
    }

    searchBoxHandlerInStockOnlyChange(e) {
        this.props.onInStockOnlyChange(e.target.checked);
    }

    render() {
        return (
            <div className="search_box">
                <form action="#" className="search ">
                    <input
                        type="text "
                        className="search__input "
                        placeholder="搜索商品 "
                        value={this.props.searchText}
                        onChange={this.searchBoxHandlerSearchTextChange}
                    />
                    <select className="search__filter ">
                        <option data-display="All Categories ">
                            所有商品
                        </option>
                        <option value="1 ">
                            热销商品
                        </option>
                        <option value="2 ">
                            新货到店
                        </option>
                        <option value="3 ">
                            特价促销
                        </option>
                    </select>
                    <button className="search__button search__button--1 ">搜索</button>
                    <span className="stock_filter">
                        <input
                            type="checkbox"
                            checked={this.props.inStockOnly}
                            onChange={this.searchBoxHandlerInStockOnlyChange}
                        />
                        <span className="stock_only">仅显示有库存的商品</span>
                    </span>
                </form>
            </div>
        );
    }
}
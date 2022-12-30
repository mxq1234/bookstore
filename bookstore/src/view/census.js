import React from 'react';
import '../css/account.css';
import Menu from '../components/menu';
import {DatePicker, Button, Card, Table} from "antd";
import {adminCensus, userCensus} from "../services/censusService";

const salesColumn = [
    {
        title: '排名',
        dataIndex: 'rank'
    },
    {
        title: '书名',
        dataIndex: 'title'
    },
    {
        title: '作者',
        dataIndex: 'author'
    },
    {
        title: 'ISBN',
        dataIndex: 'isbn'
    },
    {
        title: '单价',
        dataIndex: 'price'
    },
    {
        title: '销量',
        dataIndex: 'sales'
    },
]

const consumesColumn = [
    {
        title: '排名',
        dataIndex: 'rank'
    },
    {
        title: '用户ID',
        dataIndex: 'userID'
    },
    {
        title: '用户名',
        dataIndex: 'userName'
    },
    {
        title: '消费金额',
        dataIndex: 'consumes'
    },
]

const privateColumn = [
    {
        title: '排名',
        dataIndex: 'rank'
    },
    {
        title: '书名',
        dataIndex: 'title'
    },
    {
        title: '作者',
        dataIndex: 'author'
    },
    {
        title: 'ISBN',
        dataIndex: 'isbn'
    },
    {
        title: '单价',
        dataIndex: 'price'
    },
    {
        title: '购买量',
        dataIndex: 'sales'
    },
    {
        title: '总价',
        dataIndex: 'total'
    },
]

class CensusView extends React.Component {
    state = {
        limitDate: "",
        salesTable: [],
        consumesTable: [],
        privateTable: [],
        totalNum: 0,
        totalPrice: 0,
    }

    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleCensus = this.handleCensus.bind(this);
        this.handleUserCensus = this.handleUserCensus.bind(this);
    }

    handleDateChange(e) {
        console.log(e);
        console.log(e.format('yyyy-MM-DD'));
        this.setState({limitDate: e.format('yyyy-MM-DD')});
    }

    handleCensus() {
        const getData = async () => {
            let limitDate = this.state.limitDate;
            let data = await adminCensus(limitDate);
            let sales = data.sales;
            let saleTable = [];
            for(var i = 0 ; i < sales.length; ++i) {
                let item = {};
                item["rank"] = sales[i].rank + 1;
                item["title"] = sales[i].book.title;
                item["author"] = sales[i].book.author;
                item["isbn"] = sales[i].book.isbn;
                item["price"] = (Number(sales[i].book.price) / 100).toFixed(2);
                item["sales"] = sales[i].sales;
                saleTable.push(item);
            }
            this.setState({salesTable: saleTable});

            let consumes = data.consume;
            let consumeTable = [];
            for(var i = 0 ; i < consumes.length; ++i) {
                let item = {};
                item["rank"] = consumes[i].rank + 1;
                item["userID"] = consumes[i].userID;
                item["userName"] = consumes[i].userName;
                item["consumes"] = (Number(consumes[i].consumes) / 100).toFixed(2);
                consumeTable.push(item);
            }
            this.setState({consumesTable: consumeTable});
        }
        getData();
    }

    handleUserCensus() {
        const getData = async () => {
            let limitDate = this.state.limitDate;
            let result = await userCensus(limitDate);
            let data = result.data;
            console.log(data);
            let privateTable = [];
            let totalPrice = 0, totalNum = 0;
            for(var i = 0 ; i < data.length; ++i) {
                let item = {};
                item["rank"] = data[i].rank + 1;
                item["title"] = data[i].book.title;
                item["author"] = data[i].book.author;
                item["isbn"] = data[i].book.isbn;
                item["price"] = (Number(data[i].book.price) / 100).toFixed(2);
                item["sales"] = data[i].sales;
                item["total"] = (Number(data[i].book.price) * Number(data[i].sales) / 100).toFixed(2);
                privateTable.push(item);
                totalNum = Number(Number(totalNum) + Number(item["sales"]));
                totalPrice = Number(Number(totalPrice) + Number(data[i].book.price) * Number(data[i].sales));
            }
            this.setState({totalPrice: (Number(totalPrice) / 100).toFixed(2)});
            this.setState({totalNum: totalNum})
            this.setState({privateTable: privateTable});
        }
        getData();
    }

    render() {
        const isAdmin = (JSON.parse(localStorage.getItem("user")).userType > 0);
        if(isAdmin) {
            return (
                <div>
                    <Menu isAuthed={true} isAdmin={isAdmin} />

                    <DatePicker onChange={this.handleDateChange} format={'yyyy-MM-DD'} style={{marginTop: 10, marginLeft: 30}} />

                    <Button onClick={this.handleCensus}>统计</Button>

                    <Card title='热销榜'>
                        <Table dataSource={this.state.salesTable} columns={salesColumn} bordered />
                    </Card>

                    <Card title='消费榜'>
                        <Table dataSource={this.state.consumesTable} columns={consumesColumn} bordered />
                    </Card>
                </div>
            );
        } else {
            return (
                <div>
                    <Menu isAuthed={true} isAdmin={isAdmin} />

                    <DatePicker onChange={this.handleDateChange} format={'yyyy-MM-DD'} style={{marginTop: 10, marginLeft: 30}} />

                    <Button onClick={this.handleUserCensus}>统计</Button>

                    <Card title='我的消费统计'>
                        <Table dataSource={this.state.privateTable} columns={privateColumn} bordered />
                    </Card>

                    <div style={{float: "right", fontSize: 18, marginRight: 60}}> 共购买<span style={{fontSize: 26, fontWeight: 'bold', color: '#c91623'}}>{this.state.totalNum}</span>本书, 共计消费<span style={{fontSize: 26, fontWeight: 'bold', color: '#c91623'}}>￥{this.state.totalPrice}</span> </div>

                </div>
            );
        }
    }
}

export default CensusView;

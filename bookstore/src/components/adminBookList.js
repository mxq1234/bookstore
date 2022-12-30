import React from 'react';
import '../css/productList.css';
import {SearchBox} from "./searchBox";
import {Link} from 'react-router-dom';
import {Button, Modal, Form, Input, Radio} from "antd";
import {addNewBook, modifyBook, deleteBook, getAllBooks} from "../services/bookService";
import 'antd/dist/antd.css'

export class AdminBookList extends React.Component {
    constructor(props) {
        super(props);
        this.state={searchText:"",inStockOnly:false,page:1,maxPage:1,size:8};
        this.handleSearchTextChange=this.handleSearchTextChange.bind(this);
        this.handleInStockOnlyChange=this.handleInStockOnlyChange.bind(this);
        this.handleOnPageChange=this.handleOnPageChange.bind(this);
        this.updateMaxPage=this.updateMaxPage.bind(this);
    }

    handleSearchTextChange(newSearchText) {
        this.setState(()=>{
            return { searchText: newSearchText, page: 1}
        });
    }

    handleInStockOnlyChange(checked) {
        this.setState(()=>{
            return { inStockOnly: checked, page:1 }
        });
    }

    handleOnPageChange(toPage) {
        this.setState({page: toPage}, ()=>{this.render()});
    }

    updateMaxPage(max) {
        this.setState({maxPage: max}, ()=>{this.render()});
    }

    render() {
        return(
            <div>
                <SearchBox
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                    onSearchTextChange={this.handleSearchTextChange}
                    onInStockOnlyChange={this.handleInStockOnlyChange}
                />
                <ProductList
                    page={this.state.page}
                    pageSize={this.state.size}
                    searchText={this.state.searchText}
                    inStockOnly={this.state.inStockOnly}
                    updateMaxPage={this.updateMaxPage}
                />
                <Pager
                    onPageChange={this.handleOnPageChange}
                    page={this.state.page}
                    maxPage={this.state.maxPage}
                />
            </div>
        );
    }
}

class ProductList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.updateMaxPage=this.updateMaxPage.bind(this);
        this.state = { productInfo: [] };
        this.getBooks();
    }

    state = {
        visible: false
    }

    updateMaxPage(max) {
        this.props.updateMaxPage(max);
    }

    getBooks = async () => {
        let books = await getAllBooks();
        this.setState({
            productInfo: books,
        })
    }

    render() {
        const callback = (data) => {
            console.log(data);
            // if(data.status > 0) {
                this.setState({productInfo: data});
            //     alert(data.message);
            // }
            // else{
            //     alert(data.message);
            // }
        };
        let itemShowList=[], i=0, j=0;
        let end=this.props.page*this.props.pageSize;
        let begin=end-this.props.pageSize;
        let productInfo = this.state.productInfo;
        for(i=0;i<productInfo.length;++i) {
            const item=productInfo[i];
            if(this.props.searchText==="" || item.title.indexOf(this.props.searchText)>=0) {
                if (!this.props.inStockOnly || item.stock) {
                    if(j>=begin && j<end) itemShowList.push(<AdminPditem key={j} product={item} callback={callback}/>);
                    ++j;
                }
            }
        }
        let newMaxPage=Math.ceil(j/this.props.pageSize);
        this.updateMaxPage(newMaxPage);
        const form = React.createRef();
        return (
            <div className="pdlist">
                <Modal
                    title="新增书籍"
                    visible={this.state.visible}
                    okText="确认"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({visible: false});
                    }}
                    onOk={() => {
                        form.current.validateFields().then((values) => {
                            const toDo = async (values) => {
                                form.current.resetFields();
                                values["price"] = Number(values["price"]) * 100;
                                let result = await addNewBook(values);
                                callback(result);
                                console.log("验证成功,收到的表单值: ", values);
                                this.setState({visible: false});
                            }
                            toDo(values);
                        }).catch((errInfo) => {
                            console.log("验证失败:", errInfo);
                        });
                    }}
                >
                    <Form
                        name="form_in_modal"
                        layout="vertical"
                        ref={form}
                        initialValues={{
                            modifier: "public",
                        }}
                    >
                        <Form.Item
                            label="书名"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入书籍名称",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="作者" name="author">
                            <Input />
                        </Form.Item>
                        <Form.Item label="封面url" name="url">
                            <Input />
                        </Form.Item>
                        <Form.Item label="ISBN编号" name="isbn">
                            <Input />
                        </Form.Item>
                        <Form.Item label="种类" name="type">
                            <Input />
                        </Form.Item>
                        <Form.Item label="库存量" name="stock">
                            <Input />
                        </Form.Item>
                        <Form.Item label="价格" name="price">
                            <Input />
                        </Form.Item>
                        <Form.Item label="出版社" name="press">
                            <Input />
                        </Form.Item>
                        <Form.Item label="详情" name="description">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            this.setState({visible: true});
                        }}
                    >
                        +
                    </Button>
                </div>
                <div>
                    <ul className="inner" id="booklist">
                        {itemShowList}
                    </ul>
                </div>
            </div>
        );
    }
}

class AdminPditem extends React.Component {
    state = {
        visible: false
    }
    render() {
        const form = React.createRef();
        return (
            <li className="pditem">
                <Link className="img" to={{pathname: '/bookView/'+ this.props.product.bookID }}>
                    <img src={this.props.product.image} width="132" height="132" />
                </Link>
                <div className="tit2" style={{overflow: 'hidden'}}>
                    <b className="bookStyle"></b>书名：《{this.props.product.title}》
                </div>
                <div className="tit2">
                    <b className="bookStyle"></b>作者：{this.props.product.author}
                </div>
                <div className="tit2">
                    <b className="bookStyle"></b>ISBN编号：{this.props.product.isbn}
                </div>
                <div className="tit2">
                    <b className="bookStyle"></b>库存：{this.props.product.stock}
                </div>
                <div className="moreInfo">
                    <span><Button
                        type="primary"
                        onClick={() => {
                            this.setState({visible: true});
                        }}
                        style={{height: 25, width: 60, marginLeft: 5}}
                    >修改</Button></span>
                    <span><Button
                        type="primary"
                        onClick={() => {
                            const toDo = async(bookID) => {
                                let result = await deleteBook(bookID);
                                this.props.callback(result);
                            }
                            toDo(this.props.product.bookID);
                        }}
                        style={{height: 25, width: 60}}
                    >删除</Button></span>
                </div>

                <Modal
                    title="修改书籍"
                    visible={this.state.visible}
                    okText="确认"
                    cancelText="取消"
                    onCancel={() => {
                        this.setState({visible: false});
                    }}
                    onOk={() => {
                        form.current.validateFields().then((values) => {
                            const id = this.props.product.bookID;
                            values["bookID"] = id;
                            console.log(values);
                            const toDo = async (values) => {
                                let result = await modifyBook(values);
                                this.props.callback(result);
                                console.log("验证成功,收到的表单值: ", values);
                                this.setState({visible: false});
                                form.current.setFieldsValue(values);
                            }
                            toDo(values);
                        }).catch((errInfo) => {
                            console.log("验证失败:", errInfo);
                        });
                    }}
                >
                    <Form
                        name="form_in_modal"
                        layout="vertical"
                        ref={form}
                        initialValues={{
                            modifier: "public",
                        }}
                    >
                        <Form.Item
                            label="书名"
                            name="title"
                            initialValue={this.props.product.title}
                            rules={[
                                {
                                    required: true,
                                    message: "请输入书籍名称",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="作者" name="author" initialValue={this.props.product.author}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="封面url" name="url" initialValue={this.props.product.image}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="ISBN编号" name="isbn" initialValue={this.props.product.isbn}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="库存量" name="stock" initialValue={this.props.product.stock}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </li>
        );
    }
}

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangePage=this.handleChangePage.bind(this);
    }

    handleChangePage(e) {
        console.log("单击了");
        console.log(e.target.title);
        this.props.onPageChange(Number(e.target.title));
    }

    render() {
        let pageList=[];
        const page=this.props.page;
        const maxPage=this.props.maxPage;
        if(page>1) {
            let tmp=page-1;
            pageList.push(<a title={tmp} onClick={this.handleChangePage}>上一页</a>);
        }
        for(var i=1; i<=maxPage; ++i) {
            if(i!=page)
                pageList.push(<a title={i} onClick={this.handleChangePage}>{i}</a>);
            else pageList.push(<a title={i} style={{backgroundColor:"deepskyblue"}}>{i}</a>);
        }
        console.log("maxPage=" + maxPage);
        if(page<maxPage) {
            let tmp=page+1;
            pageList.push(<a title={tmp} onClick={this.handleChangePage}>下一页</a>);
        }
        return (
            <div class="pager">
                <form action='#'>{pageList}</form>
            </div>
        );
    }
}

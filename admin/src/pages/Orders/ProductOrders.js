import React, { Component } from "react";
import API from "../../config";
import { Table, Row, Col, Card, CardBody, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import classnames from "classnames";
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";

const columns = [
{
    dataField: "id",
    text: "订单ID",
    sort: true
},
  {
    dataField: "sellerName",
    text: "卖家",
    sort: false
  },
{
    dataField: "userName",
    text: "买家",
    sort: false
},
{
  dataField: "createdDate",
  text: "购买时间",
  sort: true
},
{
    dataField: "orderDetail",
    text: "产品备注",
    sort: false
},
{
    dataField: "cvt",
    text: "CVT",
    sort: true
},
{
    dataField: "address",
    text: "地址",
    sort: true
},
  {
    dataField: "productOrderStatus",
    text: "订单状态",
    sort: true
  }
];
class ProductOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOders: [],
            modal_standard: false,
            modal_header: [],
            modal_data: [],
        };
        this.getOrders.bind(this);
        this.getAreaHistory.bind(this);
        this.tog_standard = this.tog_standard.bind(this);
    }

    componentDidMount(){
        this.getOrders();
    }

    tog_standard() {
        this.setState(prevState => ({
          modal_standard: !prevState.modal_standard
        }));
    }

    getOrders = () => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/Order/admin_product_order", config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({allOders : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    getAreaHistory = (id) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/AreaRecord/histories/"+id, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({modal_data : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    render() {
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.tog_standard();
                this.setState({modal_header : {user: row?.username, id: row?.id}});
                this.getAreaHistory(row?.id);
            }
        };
        const modalColumns = [
            {
                dataField: "orderId",
                text: "订单ID",
                sort: false
            },
            {
                dataField: "sourceAreaRecordId",
                text: "触发分红点位",
                sort: false
            },
            {
                dataField: "toAreaRecordId",
                text: "分红点位",
                sort: false
            },
            {
                dataField: "msg",
                text: "消息",
                sort: false
            },
            {
                dataField: "createdDate",
                text: "时间",
                sort: false
            },
            {
                dataField: "updateType",
                text: "奖励类型",
                sort: false
            },
            {
                dataField: "beforeValue",
                text: "奖励前金额",
                sort: false
            },
            {
                dataField: "changedValue",
                text: "+",
                sort: false
            },
            {
                dataField: "afterValue",
                text: "奖励后金额",
                sort: false
            }
        ];

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <h2>商城订单</h2>
                                        <p>点击订单可查看详情</p>
                                        <div className="table-responsive">
                                            <BootstrapTable
                                                keyField="id"
                                                data={this.state.allOders}
                                                columns={columns}
                                                // rowEvents={rowEvents}
                                                hover={true}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Modal
                            size="xl"
                          isOpen={this.state.modal_standard}
                          toggle={this.tog_standard}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_standard: false })}>
                              {this.state.modal_header.user + "的" + this.state.modal_header.id + "订单"}
                          </ModalHeader>
                          <ModalBody>
                            <BootstrapTable
                                keyField="id"
                                data={this.state.modal_data}
                                columns={modalColumns}
                                hover={true}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="button"
                              onClick={this.tog_standard}
                              color="light"
                              className="waves-effect"
                            >
                              关闭
                          </Button>
                          </ModalFooter>
                        </Modal>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default ProductOrders

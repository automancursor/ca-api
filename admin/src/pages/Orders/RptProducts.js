import React, { Component } from "react";
import API from "../../config";
import { Table, Row, Col, Card, CardBody, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import classnames from "classnames";
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const columns = [
  {
    dataField: "id",
    text: "ID",
    sort: false
  },
  {
    dataField: "userName",
    text: "用户",
    sort: false
  },
  {
    dataField: "companyName",
    text: "商家",
    sort: false
  },
  {
    dataField: "name",
    text: "产品",
    sort: false
  },
  {
    dataField: `category.name`,
    text: "类别",
    sort: false
  },
  {
    dataField: "price",
    text: "价格",
    sort: false
  },
  {
    dataField: "quantity",
    text: "数量",
    sort: false
  },
  {
    dataField: "createdDate",
    text: "创建日期",
    sort: false
  },
  {
    dataField: "productStatus",
    text: "状态",
    sort: false
  }
];
class RptProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOders: [],
            modal_standard: false,
            modal_header: [],
            modal_data: [],
          modal_pic: [],
        };
        this.getOrders.bind(this);
        this.getProductDetail.bind(this);
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
        axios.get(API+"/shop/rptProduct/all", config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({allOders : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    getProductDetail = (id) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/shop/rptProduct/"+id, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({modal_data : response.data.data});
              const images = response.data.data?.productImages.split("&&");
                this.setState({modal_pic : images});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    render() {
        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.tog_standard();
                this.setState({modal_header : {user: row?.userName, id: row?.name}});
                this.getProductDetail(row?.id);
            }
        };

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <h2>积分产品</h2>
                                        <p>点击产品可查看详情</p>
                                        <div className="table-responsive">
                                            <BootstrapTable
                                                keyField="id"
                                                data={this.state.allOders}
                                                columns={columns}
                                                rowEvents={rowEvents}
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
                              {this.state.modal_header.user + "的" + this.state.modal_header.id + "产品详情"}
                          </ModalHeader>
                          <ModalBody>
                            <Row>
                              <Col lg={12}>
                                {
                                  this.state.modal_pic ?
                                    <Carousel autoPlay>
                                      {this.state.modal_pic.map((n) => (
                                        <div>
                                          <img
                                            src={n}
                                            alt=""
                                            draggable={true}
                                            style={{ width: "100%" }}
                                          />
                                        </div>
                                      ))}
                                    </Carousel>
                                    : null
                                }

                                {
                                  "卖家: " + this.state.modal_data?.userName
                                }<br />
                                {
                                  "类别: " + this.state.modal_data?.category?.name
                                }<br />
                                {
                                  "名字: " + this.state.modal_data?.name
                                }<br />
                                {
                                  "详情: " + this.state.modal_data?.productDescription
                                }<br />
                                {
                                  "库存: " + this.state.modal_data?.quantity
                                }<br />
                                {
                                  "CVT: " + this.state.modal_data?.cvt
                                }<br />
                                {
                                  "CVT展示价格: " + this.state.modal_data?.cvtPrice
                                }<br />
                                {
                                  "地址: " + this.state.modal_data?.address
                                }<br />
                                {
                                  "日期: " + this.state.modal_data?.createdDate
                                }<br />
                                {
                                  "状态: " + this.state.modal_data?.productStatus
                                }<br />
                              </Col>
                            </Row>
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

export default RptProducts

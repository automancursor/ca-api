import React, { Component } from "react";
import API from "../../config";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  ModalHeader,
  ModalBody, ModalFooter, Modal
} from "reactstrap";
import axios from 'axios';

// Editable
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import {Link} from "react-router-dom";

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransaction: [],
      modal_standard: false,
      modal_header: "",
      modal_data: [],
    };
    this.tog_standard = this.tog_standard.bind(this);
    this.getTransation.bind(this);
    this.approveTransation.bind(this);
    this.getUserDetail.bind(this);
  }

  componentDidMount(){
    this.getTransation();
  }
  tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard
    }));
  }
  getTransation = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    axios.get(API+"/Transaction/all?TransactionType=WITHDRAW", config).then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      if(response.data.data){
        this.setState({allTransaction : response.data.data});
      }
    }).catch(err => {
      throw err[1];
    });
  }
  approveTransation = (id,name,) => {
    if (window.confirm("是否确认批准"+name+"的本次交易。")) {
      const user = JSON.parse(localStorage.getItem('authUser'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const body = {};
      axios.post(API+"/Transaction/approve/"+id, body, config).then(response => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        window.confirm("成功。")
        window.location.reload();
      }).catch(err => {
        throw err[1];
      });
    } else {

    }
  }
  getUserDetail = (id, type) => {
    this.setState({modal_header: `${type}`});
    const user = JSON.parse(localStorage.getItem('authUser'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    axios.get(API+"/UserProfile/admin_get/"+id, config).then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      if(response.data.data){
        this.setState({modal_data : response.data.data});
      }
    }).catch(err => {
      throw err[1];
    });
    this.tog_standard();
  }

  render() {
    function transactionTypeSwitch (type){
      switch (type){
        case "RECHARGE":
          return "充值";
        case "WITHDRAW":
          return "提现";
        case "TRANSEFER":
          return "互转";
      }
    }

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <h2>提现记录</h2>
                    <div className="table-responsive mt-3">
                      <Table className="table-centered datatable dt-responsive nowrap " style={{borderCollapse:"collapse", borderSpacing : 0, width:"100%"}}>
                        <thead className="thead-light">
                        <tr>
                          <th>订单ID</th>
                          <th>用户名</th>
                          <th>购买时间</th>
                          <th>货币类型</th>
                          <th>金额</th>
                          <th>操作类型</th>
                          <th>状态</th>
                          <th>提现方式</th>
                          <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.allTransaction ?
                            this.state.allTransaction.map((transactionData, key) =>
                              <tr key={key}>
                                <td>{transactionData?.id}</td>

                                <td>{transactionData?.userName}</td>
                                <td>{transactionData?.createdDate}</td>
                                <td>{transactionData?.transactionCoinType}</td>
                                <td>
                                  {transactionData?.amount}
                                </td>
                                <td>
                                  {transactionTypeSwitch(transactionData?.transactionType)}
                                </td>
                                <td>
                                  {transactionData?.transactionStatus === "IN_PROGRESS" ? "等待审核" : "成功"}
                                </td>
                                <td>
                                  <Link className="mr-3 text-success" onClick={()=>this.getUserDetail(transactionData?.userId, transactionData?.transactionMethod)}>{transactionData?.transactionMethod}</Link>
                                </td>
                                <td>
                                  {transactionData?.transactionStatus === "IN_PROGRESS" ? <Link className="mr-3 text-success" onClick={()=>this.approveTransation(transactionData?.id, transactionData?.userName)}>通过审核</Link> : null}
                                </td>
                              </tr>
                            ):null
                        }
                        </tbody>
                      </Table>
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
                {this.state.modal_header}
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Label className="col-md-2 col-form-label">微信</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    <Label className="col-md-2 col-form-label">{this.state.modal_data?.wechat ? this.state.modal_data?.wechat : "未绑定"}</Label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className="col-md-2 col-form-label">支付宝</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    <Label className="col-md-2 col-form-label">{this.state.modal_data?.aliPay ? this.state.modal_data?.aliPay : "未绑定"}</Label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className="col-md-2 col-form-label">中国银行</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    <Label className="col-md-2 col-form-label">{this.state.modal_data?.bankDetailCN ? this.state.modal_data?.bankDetailCN : "未绑定"}</Label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className="col-md-2 col-form-label">海外银行</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    <Label className="col-md-2 col-form-label">{this.state.modal_data?.overSeaBankDetail ? this.state.modal_data?.overSeaBankDetail : "未绑定"}</Label>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label className="col-md-2 col-form-label">区块链地址</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    <Label className="col-md-2 col-form-label">{this.state.modal_data?.blockChainWalletAddress ? this.state.modal_data?.blockChainWalletAddress : "未绑定"}</Label>
                  </Col>
                </FormGroup>
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

export default Withdraw;

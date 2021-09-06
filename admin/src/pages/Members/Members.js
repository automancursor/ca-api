import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Table, UncontrolledTooltip, Alert, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, TabContent, TabPane, Collapse, NavLink, NavItem, CardText, Nav, CardHeader } from "reactstrap";
import classnames from "classnames";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import API from "../../config";

import {bindActionCreators} from 'redux';
import { getAllUsers, getAllArea } from '../../store/actions';

import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from 'axios';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
class Members extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [],
            modal_add_user: false,
            modal_edit_user: false,
            add_user_password: "Cva@66666",
            add_user_paypassword: "",
            add_user_username: "",
            add_user_referrername:"",
            add_user_cva: 0,
            add_user_mobile: "",
            add_user_email: "",
        }
        this.tog_standard = this.tog_standard.bind(this);
        this.addUser.bind(this);
    }

    componentDidMount(){
        this.props.getAllUsers();
    }

    tog_standard() {
        this.setState(prevState => ({
          modal_add_user: !prevState.modal_add_user
        }));
    }

    addUser = () => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const body = {
            Password: this.state.add_user_password,
            PayPassword: this.state.add_user_paypassword,
            Username: this.state.add_user_username,
            ReferrerName: this.state.add_user_referrername,
            Cva: this.state.add_user_cva,
            Mobile: this.state.add_user_mobile,
            Email: this.state.add_user_email,
        };
        if (this.state.add_user_username) {
            axios.post(API+"/Authenticate/admin_add_user", body, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            window.location.reload();
        }).catch(err => {
            window.confirm("信息输入有误，请重新输入。")
            throw err[1];
        });
        } else {

        }
    }

    render() {
        function sortByIndex(data) {
            if (data) {
                const sorter = (a, b) => {
                    return a.userIndex - b.userIndex;
                }
                data.sort(sorter);
            }
            return data;
        }

        let usersList = sortByIndex(this.props.listData);

        return (
            <React.Fragment>
                <div  className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="会员管理" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <Link to="#" onClick={() => this.tog_standard()} className="btn btn-success mb-2"><i  className="mdi mdi-plus mr-2"></i> 新增会员</Link>
                                        </div>
                                        <div className="table-responsive mt-3">
                                            <Table className="table-centered datatable dt-responsive nowrap " style={{borderCollapse:"collapse", borderSpacing : 0, width:"100%"}}>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>用户名</th>
                                                        <th>邮箱</th>
                                                        <th>电话</th>
                                                        <th>注册日期</th>
                                                        <th>CVA余额</th>
                                                        <th>CVT</th>
                                                        <th>ABG</th>
                                                        <th>RPT</th>
                                                        <th>上级</th>
                                                        <th>邀请码</th>
                                                        <th>操作</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        usersList ?
                                                        usersList.map((customerData, key) =>
                                                            <tr key={key}>
                                                                <td>{customerData?.userIndex}</td>

                                                                <td><Link to={"/memberfile?id="+customerData?.id} className="text-primary">{customerData?.username}</Link></td>
                                                                <td>{customerData?.email ? customerData?.email : '未绑定'}</td>
                                                                <td>{customerData?.phoneNumber ? customerData?.phoneNumber : '未绑定'}</td>
                                                                <td>
                                                                   {customerData?.createdDate}
                                                                </td>
                                                                <td>
                                                                   {customerData?.wallet?.cva}
                                                                </td>
                                                                <td>
                                                                   {customerData?.wallet?.cvt}
                                                                </td>
                                                                <td>
                                                                   {customerData?.wallet?.abg}
                                                                </td>
                                                              <td>
                                                                {customerData?.wallet?.rpt}
                                                              </td>
                                                                <td>{customerData?.referrer?.username}</td>
                                                                <td>{customerData?.referCode}</td>
                                                                <td>
                                                                <Link to={"/memberfile?id="+customerData?.id} className="mr-3 text-primary">查看详情</Link>
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
                          isOpen={this.state.modal_add_user}
                          toggle={this.tog_standard}
                        >
                          <ModalHeader toggle={() => this.setState({ modal_add_user: false })}>
                              新增会员
                          </ModalHeader>
                          <ModalBody>
                            <FormGroup row>
                                <Label htmlFor="user-text-input" className="col-md-2 col-form-label">用户名</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="user-text-input" value={this.state.add_user_username} onChange={(event)=>this.setState({add_user_username: event.target.value})} />
                                </Col>
                                <Label htmlFor="referrername-text-input" className="col-md-2 col-form-label">推荐人用户名</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="referrername-text-input" value={this.state.add_user_referrername}  onChange={(event)=>this.setState({add_user_referrername: event.target.value})} />
                                </Col>
                                <Label htmlFor="password-text-input" className="col-md-2 col-form-label">登陆密码</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="password-text-input" value={this.state.add_user_password}  onChange={(event)=>this.setState({add_user_password: event.target.value})} />
                                </Col>
                                <Label htmlFor="paypassword-text-input" className="col-md-2 col-form-label">支付密码</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="paypassword-text-input" value={this.state.add_user_paypassword}  onChange={(event)=>this.setState({add_user_paypassword: event.target.value})} />
                                </Col>
                                <Label htmlFor="cva-text-input" className="col-md-2 col-form-label">初始CVA</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="cva-text-input" value={this.state.add_user_cva}  onChange={(event)=>this.setState({add_user_cva: event.target.value})} />
                                </Col>
                                <Label htmlFor="mobile-text-input" className="col-md-2 col-form-label">手机</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="mobile-text-input" value={this.state.add_user_mobile}  onChange={(event)=>this.setState({add_user_mobile: event.target.value})} />
                                </Col>
                                <Label htmlFor="email-text-input" className="col-md-2 col-form-label">电子邮箱</Label>
                                <Col md={10} style={{marginTop: "10px"}}>
                                    <Input className="form-control" type="text" id="email-text-input" value={this.state.add_user_email}  onChange={(event)=>this.setState({add_user_email: event.target.value})} />
                                </Col>
                            </FormGroup>
                          </ModalBody>
                          <ModalFooter>
                            <Link to="#" onClick={() => this.addUser()} className="btn btn-success mb-2"><i  className="mdi mdi-plus mr-2"></i> 新增会员</Link>
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

const mapStateToProps = state => {
    const listData = state.GetAllUsers.getAllUsersData;
    const { getAllUsersData } = state.GetAllUsers;
    // const allArea = state.GetAllArea;
    // console.log(state.GetAllArea);
    return { getAllUsersData, listData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers:bindActionCreators(getAllUsers,dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Members));

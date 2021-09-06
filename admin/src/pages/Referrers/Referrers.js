import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Table, UncontrolledTooltip, Alert, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, TabContent, TabPane, Collapse, NavLink, NavItem, CardText, Nav, CardHeader } from "reactstrap";
import classnames from "classnames";
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import API from "../../config";
import BootstrapTable from "react-bootstrap-table-next";

import {bindActionCreators} from 'redux';
import { getAllUsers } from '../../store/actions';

import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from 'axios';

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

const columns = [
    {
        dataField: "userIndex",
        text: "ID",
        sort: true
    },
    {
        dataField: "username",
        text: "用户",
        sort: false
    },
    {
        dataField: "createdDate",
        text: "时间",
        sort: false
    },
    {
        dataField: "referCode",
        text: "邀请码",
        sort: false
    },
    {
        dataField: "referrer.username",
        text: "邀请人",
        sort: false
    },
    {
        dataField: "phoneNuberConfirmed",
        text: "手机验证",
        sort: false
    },
    {
        dataField: "emailConfirmed",
        text: "邮箱验证",
        sort: false
    }
];

class Referrers extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [],
            modal_standard: false,
            referrersData: [],
        }
        this.tog_standard = this.tog_standard.bind(this);
        this.getReferrers.bind(this);
    }

    componentDidMount(){
        this.props.getAllUsers();
    }
    
    tog_standard() {
        this.setState(prevState => ({
          modal_standard: !prevState.modal_standard
        }));
    }

    getReferrers = (id) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/UserProfile/referees/"+id, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({referrersData : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
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

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.getReferrers(row?.id);
                this.tog_standard();
            }
        };
        return (
            <React.Fragment>
                <div  className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="推荐关系" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        {
                                            usersList ?
                                            <BootstrapTable
                                                keyField="userIndex"
                                                data={usersList}
                                                columns={columns}
                                                rowEvents={rowEvents}
                                                hover={true}
                                            />:null
                                        }
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
                              被推荐人列表
                          </ModalHeader>
                          <ModalBody>
                            {
                                this.state.referrersData !== undefined ?
                                <BootstrapTable
                                    keyField="userIndex"
                                    data={sortByIndex(this.state.referrersData)}
                                    columns={columns}
                                    hover={true}
                                />:null
                            }
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

const mapStateToProps = state => {
    const listData = state.GetAllUsers.getAllUsersData;
    const { getAllUsersData } = state.GetAllUsers;
    return { getAllUsersData, listData };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsers:bindActionCreators(getAllUsers,dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Referrers));

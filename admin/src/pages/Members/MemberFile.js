import React, { Component } from "react";
import API from "../../config";
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  Container,
  UncontrolledTooltip,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label, Input, FormGroup
} from "reactstrap";
import classnames from "classnames";
import * as QueryString from "query-string";
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom';
import BootstrapTable from "react-bootstrap-table-next";
import LightTab from "./LightTab";

let id;

const columns = [
{
    dataField: "id",
    text: "订单ID",
    sort: true
},
{
    dataField: "msg",
    text: "消息",
    sort: false
},
{
    dataField: "createdDate",
    text: "购买时间",
    sort: true
},
{
    dataField: "cva",
    text: "CVA滴水池",
    sort: true
},
{
    dataField: "cvt",
    text: "CVT通证",
    sort: true
},
{
    dataField: "abg",
    text: "ABG金豆",
    sort: true
}
];
class MemberFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userToken: null,
            userData: [],
            userAreaRecord: [],
            l1: [],
            l2: [],
            lA: [],
            lB: [],
            lC: [],
            lD: [],
            lE: [],
            lVIP: [],
            lF: [],
            lG: [],
            lH: [],
            lI: [],
            lK: [],
            activeTabJustify: "6",
            allOders: [],
            orderModal: false,
            orderModalHeader: [],
            orderModalData: [],
            walletModal: false,
            walletModalData: [],
            editModal: false,
            editModalData: [],
          editNewUsername: "",
          editNewCountry: "",
          editNewEmail: "",
          editNewPhone: "",
        };
        this.toggleCustomJustified = this.toggleCustomJustified.bind(this);
        this.getUserData.bind(this);
        this.addOrder.bind(this);
        this.blockSwitch.bind(this);
        this.getAreaRecord.bind(this);
        this.getOrders.bind(this);
        this.areaClaimData.bind(this);
        this.getAreaHistory.bind(this);
        this.orderModalTog = this.orderModalTog.bind(this);
        this.walletModalTog = this.walletModalTog.bind(this);
        this.editModalTog = this.editModalTog.bind(this);
        this.getWalletHistoris.bind(this);
        this.editUser.bind(this);
        this.addToWallet.bind(this);
        this.updateUser.bind(this);
        this.addToWalletType.bind(this);
        this.minusWallet.bind(this);
        this.minusWalletType.bind(this);
    }

    componentDidMount(){
        id = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const body = {
            AreaClaimId: 1,
            PayPassword: "123123"
        };
        axios.post(API+"/Authenticate/admin_login_user/"+id, body, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data){
                this.setState({userToken : response.data.token});
                this.getUserData(response.data.token);
                this.getAreaRecord(id);
            }
        }).catch(err => {
            throw err[1];
        });
    }

    orderModalTog() {
        this.setState(prevState => ({
          orderModal: !prevState.orderModal
        }));
    }
    walletModalTog() {
        this.setState(prevState => ({
            walletModal: !prevState.walletModal
        }));
    }
  editModalTog() {
    this.setState(prevState => ({
      editModal: !prevState.editModal
    }));
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
                this.setState({orderModalData : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    getUserData = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(API+"/UserProfile/"+id, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({userData : response.data.data});
            }
            this.getOrders(token);
        }).catch(err => {
            throw err[1];
        });
    }

    toggleCustomJustified(tab) {
		if (this.state.activeTabJustify !== tab) {
			this.setState({
				activeTabJustify: tab
			});
		}
    }

    editUser(){
      this.editModalTog();
    }

    getWalletHistoris = (walletType, walletId) => {
        this.walletModalTog();
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/UserProfile/walletHistories/"+walletType+"/"+walletId, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                let data = [];
                if (walletType === "cva") {
                    for(let key in response.data.data){
                        data.push({
                            ...response.data.data[key],
                            "changedValue" : (response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue) > 0 ? "+"+(response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue).toFixed(2):(response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue).toFixed(2),
                        })
                    }
                }else{
                    for(let key in response.data.data){
                        data.push({
                            ...response.data.data[key],
                            "changedValue" : (response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue) > 0 ? "+"+(response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue):(response.data.data[key]?.afterValue - response.data.data[key]?.beforeValue),
                        })
                    }
                }
                this.setState({walletModalData : data});
            }
        }).catch(err => {
            throw err[1];
        });
    }
    addToWalletType = (type, userId, newValue) => {
        let body;
        switch (type) {
            case "cva":
                body = {
                    TransactionCoinType: "Cva",
                    Amount: newValue,
                    FromId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                    ToId: userId,
                }
                return body;
            case "cvt":
                body = {
                    TransactionCoinType: "Cvt",
                    Amount: newValue,
                    FromId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                    ToId: userId,
                }
                return body;
            case "cvtCredit":
                body = {
                    TransactionCoinType: "CvtCredit",
                    Amount: newValue,
                    FromId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                    ToId: userId,
                }
                return body;
            case "abg":
                body = {
                    TransactionCoinType: "Abg",
                    Amount: newValue,
                    FromId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                    ToId: userId,
                }
                return body;
            case "rpt":
              body = {
                TransactionCoinType: "Rpt",
                Amount: newValue,
                FromId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                ToId: userId,
              }
              return body;
        }
    }
    addToWallet = (type, userId) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        let newValue = prompt(`"请输入加${type}金额"`);

        if (newValue != null) {
            axios.post(API+"/Transaction/admin_transefer", this.addToWalletType(type, userId, newValue), config).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                window.location.replace("/memberfile?id="+this.state.userData?.id);
            }).catch(err => {
                throw err[1];
            });
        } else {
            window.confirm("错误！");
        }
    }
    minusWalletType = (type, userId, newValue) => {
        let body;
        switch (type) {
            case "cva":
                body = {
                    TransactionCoinType: "Cva",
                    Amount: newValue,
                    FromId: userId,
                    ToId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                }
                return body;
            case "cvt":
                body = {
                    TransactionCoinType: "Cvt",
                    Amount: newValue,
                    FromId: userId,
                    ToId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                }
                return body;
            case "cvtCredit":
              body = {
                TransactionCoinType: "CvtCredit",
                Amount: newValue,
                FromId: userId,
                ToId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
              }
              return body;
            case "abg":
                body = {
                    TransactionCoinType: "Abg",
                    Amount: newValue,
                    FromId: userId,
                    ToId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
                }
                return body;
            case "rpt":
              body = {
                TransactionCoinType: "Rpt",
                Amount: newValue,
                FromId: userId,
                ToId: "B22698B8-42A2-4115-9631-1C2D1E2AC5F7",
              }
              return body;
        }
    }
    minusWallet = (type, userId) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        let newValue = prompt(`"请输入减${type}金额"`);

        if (newValue != null) {
            axios.post(API+"/Transaction/admin_transefer", this.minusWalletType(type, userId, newValue), config).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                window.location.replace("/memberfile?id="+this.state.userData?.id);
            }).catch(err => {
                throw err[1];
            });
        } else {
            window.confirm("错误！");
        }
    }

    getAreaRecord = (id) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/AreaRecord/records/"+id, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.areaClaimData(response.data.data);
                this.getUserData(this.state.userToken);
            }
        }).catch(err => {
            throw err[1];
        });
    }

    areaClaimData = (data) => {
        let l1 = [];
        let l2 = [];
        let lA = [];
        let lB = [];
        let lC = [];
        let lD = [];
        let lE = [];
        let lVIP = [];
        let lF = [];
        let lG = [];
        let lH = [];
        let lI = [];
        let lK = [];
        if (data) {
            for(let i=0; i<=data.length; i++){
                if (data[i]?.areaClaimId === 1) {
                    lA.push(data[i]);
                }else if (data[i]?.areaClaimId === 2) {
                    lB.push(data[i]);
                }else if (data[i]?.areaClaimId === 3) {
                    lC.push(data[i]);
                }else if (data[i]?.areaClaimId === 4) {
                    lD.push(data[i]);
                }else if (data[i]?.areaClaimId === 5) {
                    lE.push(data[i]);
                }else if (data[i]?.areaClaimId === 6) {
                    l1.push(data[i]);
                }else if (data[i]?.areaClaimId === 7) {
                    l2.push(data[i]);
                }else if (data[i]?.areaClaimId === 8) {
                  lVIP.push(data[i]);
                }else if (data[i]?.areaClaimId === 9) {
                  lF.push(data[i]);
                }else if (data[i]?.areaClaimId === 10) {
                  lG.push(data[i]);
                }else if (data[i]?.areaClaimId === 11) {
                  lH.push(data[i]);
                }else if (data[i]?.areaClaimId === 12) {
                  lI.push(data[i]);
                }else if (data[i]?.areaClaimId === 13) {
                  lK.push(data[i]);
                }
            }
        }
        this.setState({lA : lA});
        this.setState({lB : lB});
        this.setState({lC : lC});
        this.setState({lD : lD});
        this.setState({lE : lE});
        this.setState({l1 : l1});
        this.setState({l2 : l2});
        this.setState({lVIP : lVIP});
        this.setState({lF : lF});
        this.setState({lG : lG});
        this.setState({lH : lH});
        this.setState({lI : lI});
        this.setState({lK : lK});
    }

    blockSwitch = (block) => {
        switch(block){
            case 1:
                return "A";
            case 2:
                return "B";
            case 3:
                return "C";
            case 4:
                return "D";
            case 5:
                return "E";
            case 6:
                return "1";
            case 7:
                return "2";
          case 8:
            return "VIP";
          case 9:
            return "F";
          case 10:
            return "G";
          case 11:
            return "H";
          case 12:
            return "I";
          case 13:
            return "K";
        }
    }

    addOrder = (id, name, block) => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const body = {
            AreaClaimId: block,
            PayPassword: "123123"
        };
        if (window.confirm("是否给"+name+"购买"+this.blockSwitch(block)+"区")) {
            axios.post(API+"/Order/admin_order/"+id, body, config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            window.location.replace("/memberfile?id="+this.state.userData?.id);
            this.getAreaRecord(id);
        }).catch(err => {
            if(err?.response?.status === 400){
                alert("购买"+this.blockSwitch(block)+"区失败，"+"余额不足")
            }
            if(err?.response?.status === 500){
                alert("购买"+this.blockSwitch(block)+"区失败，"+"系统繁忙，请稍后再试")
            }
        });
        } else {

        }
    }

    updateUser = () => {
      const user = JSON.parse(localStorage.getItem('authUser'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const body = {
        userId: this.state.userData?.id,
        Username: this.state.editNewUsername ? this.state.editNewUsername : this.state.userData?.username,
        Email: this.state.editNewEmail ? this.state.editNewEmail : this.state.userData?.email,
        PhoneNumber: this.state.editNewPhone ? this.state.editNewPhone : this.state.userData?.phoneNumber,
        CountryCode: this.state.editNewCountry ? this.state.editNewCountry : this.state.userData?.countryCode,
      };
      axios.put(API+"/UserProfile/admin_update", body, config).then(response => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        window.location.replace("/members");
      }).catch(err => {
        if(err?.response?.status === 400){
          alert("未知错误")
        }
        if(err?.response?.status === 500){
          alert("未知错误")
        }
      });
    }

    getOrders = (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(API+"/Order", config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({allOders : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    render() {
        const buildRow = (row) => (
            <div>{row.map((item) =>
                <LightTab
                    data={item}
                />)}
            </div>
        );

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                this.orderModalTog();
                this.setState({orderModalHeader : {id: row?.id}});
                this.getAreaHistory(row?.id);
            }
        };
        const orderModalColumns = [
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
        const walletModalColumns = [
            {
                dataField: "id",
                text: "ID",
                sort: false
            },
            {
                dataField: "updateType",
                text: "货币类型",
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
                dataField: "beforeValue",
                text: "前",
                sort: false
            },
            {
                dataField: "changedValue",
                text: "+/-",
                sort: false
            },
            {
                dataField: "afterValue",
                text: "后",
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
                                      <Row style={{marginBottom: '20px', padding: '10px', alignItems: "center"}}>
                                        <h2>{this.state.userData.username}</h2>
                                        <Button
                                          type="button"
                                          onClick={() => this.editUser()}
                                          className="waves-effect"
                                          style={{margin: '20px', padding: '2px'}}
                                        >
                                          资料修改
                                        </Button>
                                      </Row>

                                        <Row>
                                            <Col sm={2}>
                                                <div>
                                                    <div className="mb-3">
                                                        <p className="text-muted text-truncate mb-2">
                                                            CVA余额
                                                            <Button
                                                                type="button"
                                                                onClick={() => this.getWalletHistoris("cva",this.state.userData?.wallet?.id)}
                                                                className="waves-effect"
                                                                style={{marginLeft: '10px', padding: '2px'}}
                                                            >
                                                                查看流水
                                                            </Button>
                                                        </p>
                                                        <h5>
                                                        {/* <Link className="text-primary" onClick={()=> this.updateWallet("cva", this.state.userData?.id)}>$ {this.state.userData?.wallet?.cva.toLocaleString()}</Link> */}
                                                        $ {this.state.userData?.wallet?.cva.toLocaleString()}
                                                        </h5>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.addToWallet("cva", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{padding: '2px'}}
                                                            color="success"
                                                        >
                                                            加(从BBW扣除)
                                                        </Button>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.minusWallet("cva", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{marginLeft: '10px', padding: '2px'}}
                                                            color="danger"
                                                        >
                                                            减(转入BBW)
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={2}>
                                                <div>
                                                    <div className="mb-3">
                                                        <p className="text-muted text-truncate mb-2">
                                                            已释放的CVT
                                                            <Button
                                                                type="button"
                                                                onClick={() => this.getWalletHistoris("cvt",this.state.userData?.wallet?.id)}
                                                                className="waves-effect"
                                                                style={{marginLeft: '10px', padding: '2px'}}
                                                            >
                                                                查看流水
                                                            </Button>
                                                        </p>
                                                        <h5>
                                                        {/* <Link className="text-primary" onClick={()=> this.updateWallet("cvt", this.state.userData?.id)}>{this.state.userData?.wallet?.cvt.toLocaleString()}</Link> */}
                                                        {this.state.userData?.wallet?.cvt.toLocaleString()}
                                                        </h5>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.addToWallet("cvt", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{padding: '2px'}}
                                                            color="success"
                                                        >
                                                            加(从BBW扣除)
                                                        </Button>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.minusWallet("cvt", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{marginLeft: '10px', padding: '2px'}}
                                                            color="danger"
                                                        >
                                                            减(转入BBW)
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={2}>
                                                <div>
                                                    <div className="mb-3">
                                                        <p className="text-muted text-truncate mb-2">
                                                            冻结的CVT
                                                            <Button
                                                                type="button"
                                                                onClick={() => this.getWalletHistoris("cvtCredit",this.state.userData?.wallet?.id)}
                                                                className="waves-effect"
                                                                style={{marginLeft: '10px', padding: '2px'}}
                                                            >
                                                                查看流水
                                                            </Button>
                                                        </p>
                                                        <h5>{this.state.userData?.wallet?.cvtCredit.toLocaleString()}</h5>
                                                      <Button
                                                        outline
                                                        type="button"
                                                        onClick={() => this.addToWallet("cvtCredit", this.state.userData?.id)}
                                                        className="waves-effect"
                                                        style={{padding: '2px'}}
                                                        color="success"
                                                      >
                                                        加(从BBW扣除)
                                                      </Button>
                                                      <Button
                                                        outline
                                                        type="button"
                                                        onClick={() => this.minusWallet("cvtCredit", this.state.userData?.id)}
                                                        className="waves-effect"
                                                        style={{marginLeft: '10px', padding: '2px'}}
                                                        color="danger"
                                                      >
                                                        减(转入BBW)
                                                      </Button>
                                                    </div>
                                                </div>
                                            </Col>

                                            <Col sm={2}>
                                                <div>
                                                    <div className="mb-3">
                                                        <p className="text-muted text-truncate mb-2">
                                                            ABG
                                                            <Button
                                                                type="button"
                                                                onClick={() => this.getWalletHistoris("abg",this.state.userData?.wallet?.id)}
                                                                className="waves-effect"
                                                                style={{marginLeft: '10px', padding: '2px'}}
                                                            >
                                                                查看流水
                                                            </Button>
                                                        </p>
                                                        <h5>
                                                        {/* <Link className="text-primary" onClick={()=> this.updateWallet("abg", this.state.userData?.id)}>{this.state.userData?.wallet?.abg.toLocaleString()}</Link> */}
                                                        {this.state.userData?.wallet?.abg.toLocaleString()}
                                                        </h5>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.addToWallet("abg", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{padding: '2px'}}
                                                            color="success"
                                                        >
                                                            加(从BBW扣除)
                                                        </Button>
                                                        <Button
                                                            outline
                                                            type="button"
                                                            onClick={() => this.minusWallet("abg", this.state.userData?.id)}
                                                            className="waves-effect"
                                                            style={{marginLeft: '10px', padding: '2px'}}
                                                            color="danger"
                                                        >
                                                            减(转入BBW)
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Col>

                                          <Col sm={2}>
                                            <div>
                                              <div className="mb-3">
                                                <p className="text-muted text-truncate mb-2">
                                                  RPT
                                                  <Button
                                                    type="button"
                                                    onClick={() => this.getWalletHistoris("rpt",this.state.userData?.wallet?.id)}
                                                    className="waves-effect"
                                                    style={{marginLeft: '10px', padding: '2px'}}
                                                  >
                                                    查看流水
                                                  </Button>
                                                </p>
                                                <h5>
                                                  {/* <Link className="text-primary" onClick={()=> this.updateWallet("abg", this.state.userData?.id)}>{this.state.userData?.wallet?.abg.toLocaleString()}</Link> */}
                                                  {this.state.userData?.wallet?.rpt.toLocaleString()}
                                                </h5>
                                                <Button
                                                  outline
                                                  type="button"
                                                  onClick={() => this.addToWallet("rpt", this.state.userData?.id)}
                                                  className="waves-effect"
                                                  style={{padding: '2px'}}
                                                  color="success"
                                                >
                                                  加(从BBW扣除)
                                                </Button>
                                                <Button
                                                  outline
                                                  type="button"
                                                  onClick={() => this.minusWallet("rpt", this.state.userData?.id)}
                                                  className="waves-effect"
                                                  style={{marginLeft: '10px', padding: '2px'}}
                                                  color="danger"
                                                >
                                                  减(转入BBW)
                                                </Button>
                                              </div>
                                            </div>
                                          </Col>
                                        </Row>

                                        <div style={{marginTop: '20px'}}>
                                            <h7>买区操作：</h7>
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,6)} className="mr-3 text-primary" id={"buyA"}>购买1区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,7)} className="mr-3 text-primary" id={"buyA"}>购买2区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,1)} className="mr-3 text-primary" id={"buyA"}>购买A区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,2)} className="mr-3 text-primary" id={"buyB"}>购买B区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,3)} className="mr-3 text-primary" id={"buyC"}>购买C区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,4)} className="mr-3 text-primary" id={"buyD"}>购买D区</Link>
                                            &nbsp;&nbsp;
                                            <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,5)} className="mr-3 text-primary" id={"buyE"}>购买E区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,8)} className="mr-3 text-primary" id={"buyE"}>购买VIP区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,9)} className="mr-3 text-primary" id={"buyE"}>购买F区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,10)} className="mr-3 text-primary" id={"buyE"}>购买G区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,11)} className="mr-3 text-primary" id={"buyE"}>购买H区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,12)} className="mr-3 text-primary" id={"buyE"}>购买I区</Link>
                                          <Link to="#" onClick={() => this.addOrder(id,this.state.userData.username,13)} className="mr-3 text-primary" id={"buyE"}>购买K区</Link>
                                        </div>

                                        <div style={{marginTop: '40px'}}>
                                            <Nav tabs className="nav-tabs-custom nav-justified">
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "6"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("6");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">1 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "7"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("7");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">2 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "1"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("1");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">A 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "2"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("2");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">B 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "3"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("3");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">C 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "4"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("4");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">D 区</span>
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        style={{ cursor: "pointer" }}
                                                        className={classnames({
                                                            active: this.state.activeTabJustify === "5"
                                                        })}
                                                        onClick={() => {
                                                            this.toggleCustomJustified("5");
                                                        }}
                                                    >
                                                        <span className="d-none d-sm-block">E 区</span>
                                                    </NavLink>
                                                </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "8"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("8");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">VIP 区</span>
                                                </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "9"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("9");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">F 区</span>
                                                </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "10"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("10");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">G 区</span>
                                                </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "11"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("11");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">H 区</span>
                                                </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "12"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("12");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">I 区</span>
                                                </NavLink>
                                              </NavItem>
                                              <NavItem>
                                                <NavLink
                                                  style={{ cursor: "pointer" }}
                                                  className={classnames({
                                                    active: this.state.activeTabJustify === "13"
                                                  })}
                                                  onClick={() => {
                                                    this.toggleCustomJustified("13");
                                                  }}
                                                >
                                                  <span className="d-none d-sm-block">K 区</span>
                                                </NavLink>
                                              </NavItem>
                                            </Nav>
                                        </div>
                                        <div>
                                            <TabContent activeTab={this.state.activeTabJustify}>
                                                <TabPane tabId="6" className="p-3">
                                                    {
                                                        this.state.l1 !== undefined ?
                                                        buildRow(this.state.l1)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="7" className="p-3">
                                                    {
                                                        this.state.l2 !== undefined ?
                                                        buildRow(this.state.l2)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="1" className="p-3">
                                                    {
                                                        this.state.lA !== undefined ?
                                                        buildRow(this.state.lA)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="2" className="p-3">
                                                    {
                                                        this.state.lB !== undefined ?
                                                        buildRow(this.state.lB)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="3" className="p-3">
                                                    {
                                                        this.state.lC !== undefined ?
                                                        buildRow(this.state.lC)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="4" className="p-3">
                                                    {
                                                        this.state.lD !== undefined ?
                                                        buildRow(this.state.lD)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                                <TabPane tabId="5" className="p-3">
                                                    {
                                                        this.state.lE !== undefined ?
                                                        buildRow(this.state.lE)
                                                        :
                                                        null
                                                    }
                                                </TabPane>
                                              <TabPane tabId="8" className="p-3">
                                                {
                                                  this.state.lVIP !== undefined ?
                                                    buildRow(this.state.lVIP)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                              <TabPane tabId="9" className="p-3">
                                                {
                                                  this.state.lF !== undefined ?
                                                    buildRow(this.state.lF)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                              <TabPane tabId="10" className="p-3">
                                                {
                                                  this.state.lG !== undefined ?
                                                    buildRow(this.state.lG)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                              <TabPane tabId="11" className="p-3">
                                                {
                                                  this.state.lH !== undefined ?
                                                    buildRow(this.state.lH)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                              <TabPane tabId="12" className="p-3">
                                                {
                                                  this.state.lI !== undefined ?
                                                    buildRow(this.state.lI)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                              <TabPane tabId="13" className="p-3">
                                                {
                                                  this.state.lK !== undefined ?
                                                    buildRow(this.state.lK)
                                                    :
                                                    null
                                                }
                                              </TabPane>
                                            </TabContent>
                                        </div>

                                        <h4 style={{marginTop: '20px'}}>{this.state.userData?.username} 的购买记录</h4>
                                        <p>点击订单可查看详情</p>
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

                        {/* 订单记录 */}
                        <Modal
                            size="xl"
                            isOpen={this.state.orderModal}
                            toggle={this.orderModalTog}
                        >
                          <ModalHeader toggle={() => this.setState({ orderModal: false })}>
                              {"订单" + this.state.orderModalHeader.id}
                          </ModalHeader>
                          <ModalBody>
                            <BootstrapTable
                                keyField="id"
                                data={this.state.orderModalData}
                                columns={orderModalColumns}
                                hover={true}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="button"
                              onClick={this.orderModalTog}
                              color="light"
                              className="waves-effect"
                            >
                              关闭
                            </Button>
                          </ModalFooter>
                        </Modal>
                        {/* 钱包记录 */}
                        <Modal
                            size="xl"
                            isOpen={this.state.walletModal}
                            toggle={this.walletModalTog}
                        >
                          <ModalHeader toggle={() => this.setState({ walletModal: false })}>
                              钱包流水
                          </ModalHeader>
                          <ModalBody>
                            <BootstrapTable
                                keyField="id"
                                data={this.state.walletModalData}
                                columns={walletModalColumns}
                                hover={true}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              type="button"
                              onClick={this.walletModalTog}
                              color="light"
                              className="waves-effect"
                            >
                              关闭
                            </Button>
                          </ModalFooter>
                        </Modal>

                      {/* 修改资料 */}
                      <Modal
                        size="xl"
                        isOpen={this.state.editModal}
                        toggle={this.editModalTog}
                      >
                        <ModalHeader toggle={() => this.setState({ editModal: false })}>
                          {this.state.userData.username} - 资料修改
                        </ModalHeader>
                        <ModalBody>
                          <FormGroup row>
                            <Label className="col-md-2 col-form-label">用户名</Label>
                            <Col md={4} style={{display: 'flex'}}>
                              <Label className="col-md-4 col-form-label">{this.state.userData?.username}</Label>
                            </Col>
                            <Col md={4} style={{display: 'flex'}}>
                              <Input className="form-control" type="text" value={this.state.editNewUsername} onChange={(event) =>
                                this.setState({editNewUsername : event.target.value})
                              } />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label className="col-md-2 col-form-label">国家</Label>
                            <Col md={4} style={{display: 'flex'}}>
                              <Label className="col-md-4 col-form-label">{this.state.userData?.countryCode}</Label>
                            </Col>
                            <Col md={4} style={{display: 'flex'}}>
                              <Input className="form-control" type="text" value={this.state.editNewCountry} onChange={(event) => this.setState({editNewCountry : event.target.value})} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label className="col-md-2 col-form-label">电子邮件</Label>
                            <Col md={4} style={{display: 'flex'}}>
                              <Label className="col-md-4 col-form-label">{this.state.userData?.email}</Label>
                            </Col>
                            <Col md={4} style={{display: 'flex'}}>
                              <Input className="form-control" type="text" value={this.state.editNewEmail} onChange={(event) => this.setState({editNewEmail : event.target.value})} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label className="col-md-2 col-form-label">电话</Label>
                            <Col md={4} style={{display: 'flex'}}>
                              <Label className="col-md-4 col-form-label">{this.state.userData?.phoneNumber}</Label>
                            </Col>
                            <Col md={4} style={{display: 'flex'}}>
                              <Input className="form-control" type="text" value={this.state.editNewPhone} onChange={(event) => this.setState({editNewPhone : event.target.value})} />
                            </Col>
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            type="button"
                            onClick={() => this.updateUser()}
                            className="waves-effect"
                          >
                            确认修改
                          </Button>
                          <Button
                            type="button"
                            onClick={this.editModalTog}
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

export default MemberFile;

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

class ShopCertification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUserVerification: [],
      modal_standard: false,
      modal_jujue: false,
      jujue_id: null,
      modal_header: '',
      modal_data: '',
      modal_data2: '',
    };
    this.tog_standard = this.tog_standard.bind(this);
    this.tog_jujue = this.tog_jujue.bind(this);
    this.getUserVerification.bind(this);
    this.approveUserVerification.bind(this);
    this.removeUserVerification.bind(this);
    this.rejectUserVerification.bind(this);
    this.viewAttachedFile.bind(this);
  }

  componentDidMount(){
    this.getUserVerification();
  }
  tog_standard() {
    this.setState(prevState => ({
      modal_standard: !prevState.modal_standard
    }));
  }
  tog_jujue() {
    this.setState(prevState => ({
      modal_jujue: !prevState.modal_jujue
    }));
  }
  getUserVerification = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    };
    axios.get(API+"/UserProfile/seller_verification/all", config).then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      if(response.data.data){
        this.setState({allUserVerification : response.data.data});
      }
    }).catch(err => {
      throw err[1];
    });
  }
  approveUserVerification = (id,name,) => {
    if (window.confirm("是否确认批准"+name+"的商户认证。")) {
      const user = JSON.parse(localStorage.getItem('authUser'));
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const body = {
        id: id,
        userVerificationStatus: "SUCCESS",
        AdminMessage: ""
      };
      axios.post(API+"/UserProfile/seller_verification/approve/"+id, body, config).then(response => {
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
  removeUserVerification = (id,name,) => {
    if (window.confirm("是否确认删除"+name+"的商户认证。")) {
      const user = JSON.parse(localStorage.getItem('authUser'));
      var axios = require('axios');
      var data = '';

      var config = {
        method: 'delete',
        url: API+'/UserProfile/seller_verification/'+id,
        headers: { Authorization: `Bearer ${user.token}` },
        data : data
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          window.confirm("成功。")
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {

    }
  }
  jujueChuangkou = (id) => {
    this.setState({jujue_id : id});
    this.tog_jujue();
  }
  rejectUserVerification = (msg) => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    var axios = require('axios');
    var data = JSON.stringify({
      "id": this.state.jujue_id,
      "userVerificationStatus": "REJECTED",
      "passport": null,
      "idCard": null,
      "AdminMessage": msg,
      "UserMessage": msg
    });

    var config = {
      method: 'put',
      url: API+'/UserProfile/user_verification/update',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        window.confirm("完成。")
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  viewAttachedFile = (name, value) => {
    if (value){
      this.setState({modal_header: `${name} - ${value.value}`});
      this.setState({modal_data: value.links.split('&&')});
      this.setState({modal_data2: value});
      this.tog_standard();
    }
  }



  render() {
    function typeSwitch (type){
      switch (type){
        case "IN_PROGRESS":
          return "审核中";
        case "REJECTED":
          return "拒绝";
        case "SUCCESS":
          return "成功";
      }
    }

    function onChangeRadioValue(event) {
      console.log(event.target.value);
      this.setState({jujue_msg : event.target.value});
    }

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>

            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <h2>商户认证</h2>
                    <div className="table-responsive mt-3">
                      <Table className="table-centered datatable dt-responsive nowrap " style={{borderCollapse:"collapse", borderSpacing : 0, width:"100%"}}>
                        <thead className="thead-light">
                        <tr>
                          <th>ID</th>
                          <th>消费商用户名</th>
                          <th>商家名</th>
                          <th>提交时间</th>
                          <th>证件</th>
                          <th>ABN</th>
                          <th>回佣比例</th>
                          <th>国家</th>
                          <th>商户电话</th>
                          <th>企业邮箱</th>
                          <th>地址</th>
                          <th>状态</th>
                          <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                          this.state.allUserVerification ?
                            this.state.allUserVerification.map((userVerificationData, key) =>
                              <tr key={key}>
                                <td>{userVerificationData?.id}</td>

                                <td>{userVerificationData?.userName}</td>
                                <td>{userVerificationData?.companyName}</td>
                                <td>{userVerificationData?.createdDate}</td>
                                <td>
                                  {
                                    userVerificationData?.registration ?
                                      <Link onClick={()=>this.viewAttachedFile(userVerificationData?.userName, userVerificationData?.registration)} className="mr-3 text-primary">查看附件</Link> : null
                                  }
                                </td>
                                <td>{userVerificationData?.abn}</td>
                                <td>{userVerificationData?.rptRate}</td>
                                <td>{userVerificationData?.country}</td>
                                <td>{userVerificationData?.mobile}</td>
                                <td>{userVerificationData?.email}</td>
                                <td>{userVerificationData?.companyAddress}</td>
                                <td>
                                  {typeSwitch(userVerificationData?.sellerVerificationStatus)}
                                </td>
                                <td>
                                  {userVerificationData?.sellerVerificationStatus === "IN_PROGRESS" ? <Link className="mr-3 text-success" onClick={()=>this.approveUserVerification(userVerificationData?.id, userVerificationData?.userName)}>通过审核</Link> : null}
                                  {/*{userVerificationData?.userVerificationStatus === "IN_PROGRESS" ? <Link className="mr-3 text-warning" onClick={()=>this.jujueChuangkou(userVerificationData?.id)}>拒绝</Link> : null}*/}
                                  <Link className="mr-3 text-danger" onClick={()=>this.removeUserVerification(userVerificationData?.id, userVerificationData?.userName)}>删除</Link>
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

                <p>证件号：{this.state.modal_data2.value}</p>
                <img src={this.state.modal_data[0]} style={{width: "600px"}} />
                <img src={this.state.modal_data[1]} style={{width: "600px"}} />
                <img src={this.state.modal_data[2]} style={{width: "600px"}} />
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

            <Modal
              size="m"
              isOpen={this.state.modal_jujue}
              toggle={this.tog_jujue}
            >
              <ModalHeader toggle={() => this.setState({ modal_jujue: false })}>
                拒绝理由
              </ModalHeader>
              <ModalBody>
                <Button
                  type="button"
                  onClick={()=>this.rejectUserVerification("图片不清晰，请重新上传")}
                  className="waves-effect"
                >
                  图片不清晰，请重新上传
                </Button>
                <br /><br />
                <Button
                  type="button"
                  onClick={()=>this.rejectUserVerification("您的信息与证件不符，请修改您的信息")}
                  className="waves-effect"
                >
                  您的信息与证件不符，请修改您的信息
                </Button>
                <br /><br />
                <Button
                  type="button"
                  onClick={()=>this.rejectUserVerification("其他原因，请联系管理员")}
                  className="waves-effect"
                >
                  其他原因，请联系管理员
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="button"
                  onClick={this.tog_jujue}
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

export default ShopCertification;

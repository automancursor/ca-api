import React, { Component } from "react";
import API from "../../config";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

// Editable
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import {Link} from "react-router-dom";
let bannerImages;
class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemConfig: [],
            bannerName: "",
            // bannerImages: null,
            bannerDescription: "",
        };
        this.getConfig.bind(this);
        this.onChangeHandler.bind(this);
    }

    componentDidMount(){
        this.getConfig();
    }

    onChangeHandler = (event) => {
      bannerImages = event.target.files[0]
    }

    getConfig = () => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/Config/media", config).then(response => {
            if (response.status === 400 || response.status === 500)
                throw response.data;
            if(response.data.data){
                this.setState({systemConfig : response.data.data});
            }
        }).catch(err => {
            throw err[1];
        });
    }

    render() {
      function addConfig(bannerName, bannerDescription){
        const user = JSON.parse(localStorage.getItem('authUser'));
        var axios = require('axios');
        var FormData = require('form-data');
        var fs = require('fs');
        var data = new FormData();
        data.append('Name', bannerName);
        data.append('Images', bannerImages);
        data.append('Description', bannerDescription);

        var config = {
          method: 'post',
          url: API+'/Config/media',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            // ...data.getHeaders()
          },
          data : data
        };

        axios(config)
          .then(function (response) {
            if (window.confirm("上传成功")){
              window.location.replace("/");
            }
          })
          .catch(function (error) {
            window.confirm("上传失败")
          });

      }

        function updateConfig(bannerName, bannerDescription){
          const user = JSON.parse(localStorage.getItem('authUser'));
          var axios = require('axios');
          var FormData = require('form-data');
          var fs = require('fs');
          var data = new FormData();
          data.append('Name', bannerName);
          data.append('Images', bannerImages);
          data.append('Description', bannerDescription);

          var config = {
            method: 'put',
            url: API+'/Config/media',
            headers: {
              'Authorization': `Bearer ${user.token}`,
              // ...data.getHeaders()
            },
            data : data
          };

          axios(config)
            .then(function (response) {
              if (window.confirm("上传成功")){
                window.location.replace("/");
              }
            })
            .catch(function (error) {
              window.confirm("上传失败")
            });

        }

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">新增轮播图</h4>
                                      <FormGroup row>
                                        <Label htmlFor="user-text-input" className="col-md-2 col-form-label">轮播图名</Label>
                                        <Input className="form-control" type="text" id="referrername-text-input" value={this.state.bannerName}  onChange={(event)=>this.setState({bannerName: event.target.value})} />
                                        <Label htmlFor="user-text-input" className="col-md-2 col-form-label">轮播图</Label>
                                        <Input className="form-control" type="file" id="referrername-text-input" value={this.state.bannerImages}  onChange={(event)=>this.onChangeHandler(event)} />
                                        <Label htmlFor="user-text-input" className="col-md-2 col-form-label">轮播图说明</Label>
                                        <Input className="form-control" type="text" id="referrername-text-input" value={this.state.bannerDescription}  onChange={(event)=>this.setState({bannerDescription: event.target.value})} />
                                      </FormGroup>

                                        <Link to="#" onClick={() => addConfig(this.state.bannerName, this.state.bannerDescription)} className="btn btn-success mb-2"><i  className="mdi mdi-plus mr-2"></i> 新增轮播图</Link>
                                    </CardBody>
                                </Card>

                              <Card>
                                <CardBody>
                                  <h4 className="card-title">轮播图</h4>

                                  {this.state.systemConfig.map(p => {
                                    return (
                                      <div>
                                        <FormGroup row>
                                          <Label htmlFor="user-text-input" className="col-md-2 col-form-label">{p?p?.name:null}</Label>
                                          <Label htmlFor="user-text-input" className="col-md-2 col-form-label">{p?p?.description:null}</Label>
                                          <img src={p?p?.value:null} style={{width: 200}}/>
                                          <Input className="form-control" type="file" id="referrername-text-input" value={this.state.bannerImages}  onChange={(event)=>this.onChangeHandler(event)} />
                                        </FormGroup>

                                        <Link to="#" onClick={() => updateConfig(p?.name, p?.description) } className="btn btn-success mb-2">更新{p?p?.name:null}</Link>
                                      </div>
                                    );
                                  })}

                                </CardBody>
                              </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Banner;

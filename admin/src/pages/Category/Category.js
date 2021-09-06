import React, { Component } from "react";
import API from "../../config";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

// Editable
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import {Link} from "react-router-dom";

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemConfig: [],
            categoryName: "",
            // categoryImage: null,
            categoryDescription: "",
        };
        this.getConfig.bind(this);
    }

    componentDidMount(){
        this.getConfig();
    }

    getConfig = () => {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        axios.get(API+"/shop/category", config).then(response => {
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
      function addConfig(categoryName, categoryDescription){
        const user = JSON.parse(localStorage.getItem('authUser'));
        var axios = require('axios');
        var FormData = require('form-data');
        var fs = require('fs');
        var data = new FormData();
        data.append('Name', categoryName);
        data.append('Description', categoryDescription);

        var config = {
          method: 'post',
          url: API+'/shop/category',
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
                                        <h4 className="card-title">新增产品类别</h4>
                                      <FormGroup row>
                                        <Label htmlFor="user-text-input" className="col-md-2 col-form-label">产品类别名</Label>
                                        <Input className="form-control" type="text" id="referrername-text-input" value={this.state.categoryName}  onChange={(event)=>this.setState({categoryName: event.target.value})} />
                                        <Label htmlFor="user-text-input" className="col-md-2 col-form-label">产品类别说明</Label>
                                        <Input className="form-control" type="text" id="referrername-text-input" value={this.state.categoryDescription}  onChange={(event)=>this.setState({categoryDescription: event.target.value})} />
                                      </FormGroup>

                                        <Link to="#" onClick={() => addConfig(this.state.categoryName, this.state.categoryDescription)} className="btn btn-success mb-2"><i  className="mdi mdi-plus mr-2"></i> 新增产品类别</Link>
                                    </CardBody>
                                </Card>

                              {/*<Card>*/}
                              {/*  <CardBody>*/}
                              {/*    <h4 className="card-title">轮播图</h4>*/}

                              {/*    {this.state.systemConfig.map(p => {*/}
                              {/*      return (*/}
                              {/*        <div>*/}
                              {/*          <FormGroup row>*/}
                              {/*            <Label htmlFor="user-text-input" className="col-md-2 col-form-label">{p?p?.name:null}</Label>*/}
                              {/*            <Label htmlFor="user-text-input" className="col-md-2 col-form-label">{p?p?.description:null}</Label>*/}
                              {/*            /!*<img src={p?p?.value:null} style={{width: 200}}/>*!/*/}
                              {/*            <Input className="form-control" type="text" id="referrername-text-input" value={this.state.categoryImage}  onChange={(event)=>this.onChangeHandler(event)} />*/}
                              {/*          </FormGroup>*/}

                              {/*          <Link to="#" onClick={() => updateConfig(p?.name, p?.description) } className="btn btn-success mb-2">更新{p?p?.name:null}</Link>*/}
                              {/*        </div>*/}
                              {/*      );*/}
                              {/*    })}*/}

                              {/*  </CardBody>*/}
                              {/*</Card>*/}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Category;

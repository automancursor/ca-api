import React, {Component} from "react";
import API from "../../config";
import {Card, CardBody, Col, Row, Container, FormGroup, Label, Input, Button} from "reactstrap";
import axios from 'axios';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaClaims: [],
      radio1: true,
      radio2: false,
    };
    this.getAreaClaims.bind(this);
  }

  componentDidMount() {
    this.getAreaClaims();
  }

  getAreaClaims = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const config = {
      headers: {Authorization: `Bearer ${user.token}`}
    };
    axios.get(API + "/AreaRecord/claims", config).then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      if (response.data.data) {
        this.setState({areaClaims: response.data.data});
      }
    }).catch(err => {
      throw err[1];
    });
  }

  render() {
    function updateAreaClaimsRound(id, round) {
      const user = JSON.parse(localStorage.getItem('authUser'));
      const config = {
        headers: {Authorization: `Bearer ${user.token}`}
      };
      const body = {
        ID: id,
        Round: round
      };
      if (window.confirm("是否确定更新")) {
        axios.put(API + "/AreaRecord/claims", body, config).then(response => {
          if (response.status === 400 || response.status === 500)
            throw response.data;
          window.location.reload();
        }).catch(err => {
          throw err[1];
        });
      } else {

      }
    }

    function updateAreaClaimsActive(id, active) {
      const user = JSON.parse(localStorage.getItem('authUser'));
      const config = {
        headers: {Authorization: `Bearer ${user.token}`}
      };
      const body = {
        ID: id,
        Active: active
      };
      axios.put(API + "/AreaRecord/claims", body, config).then(response => {
        if (response.status === 400 || response.status === 500)
          throw response.data;
        window.location.reload();
      }).catch(err => {
        throw err[1];
      });
    }

    const RoundKey = (id, name, round) => {
      let inputValue = null;
      return (
        <FormGroup row>
          <Label htmlFor={id} className="col-md-2 col-form-label">{name}</Label>
          <Col md={6} style={{display: 'flex'}}>
            <Label htmlFor={id} className="col-md-2 col-form-label">{round} 轮</Label>
            <Input className="form-control" type="text" value={inputValue}
                   onChange={(event) => inputValue = event.target.value} id={id}/>
          </Col>
          <Col md={4}>
            <Button
              type="button"
              onClick={() => updateAreaClaimsRound(id, inputValue)}
              className="waves-effect"
            >
              提交修改
            </Button>
          </Col>
        </FormGroup>
      );
    }

    const ActiveKey = (id, name, active) => {
      return (
        <FormGroup row>
          <Label htmlFor={id} className="col-md-1 col-form-label">{name}</Label>
          <Col md={4} style={{display: 'flex'}}>
            <Label htmlFor={id} className="col-md-2 col-form-label">{active ? "已打开" : "已关闭"}</Label>
            <div
              className="btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              <Label
                className=
                  {
                    active
                      ? "btn btn-light active"
                      : "btn btn-light"
                  }
              >
                <Input type="radio" name="options" id="option1" defaultChecked
                       onClick={() => updateAreaClaimsActive(id, true)
                       }
                /> 打开
              </Label>

              <Label
                className=
                  {
                    !active
                      ? "btn btn-light active"
                      : "btn btn-light"
                  }
              >
                <Input type="radio" name="options" id="option1"
                       onClick={() => updateAreaClaimsActive(id, false)
                       }
                /> 关闭
              </Label>
            </div>
          </Col>
        </FormGroup>
      );
    }


    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>

            <Row>
              <Col xs={12}>
                <Card>
                  <CardBody>
                    <h4 className="card-title">冻结衡量点开关</h4>
                    <p className="card-title-desc">通过下列开关冻结衡量点。</p>
                    {
                      this.state.areaClaims ?
                        this.state.areaClaims.map((item) => ActiveKey(item.id, item.name, item.active))
                        :
                        null
                    }
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <h4 className="card-title">区块轮数设置</h4>
                    <p className="card-title-desc">通过提交下列表格修改区块轮数参数。</p>
                    {
                      this.state.areaClaims ?
                        this.state.areaClaims.map((item) => RoundKey(item.id, item.name, item.round))
                        :
                        null
                    }
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

export default Block;

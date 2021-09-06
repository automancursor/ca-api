import React, { Component } from "react";
import API from "../../config";
import { Card, CardBody, Col, Row, Container, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios';

// Editable
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";

const columns = [
{
    dataField: "id",
    text: "区",
    sort: false
},
{
    dataField: "6",
    text: "1",
    sort: false
},
{
    dataField: "7",
    text: "2",
    sort: false
},
{
    dataField: "1",
    text: "A",
    sort: false
},
{
    dataField: "2",
    text: "B",
    sort: false
},
{
    dataField: "3",
    text: "C",
    sort: false
},
{
    dataField: "4",
    text: "D",
    sort: false
},
{
    dataField: "5",
    text: "E",
    sort: false
},
  {
    dataField: "8",
    text: "VIP",
    sort: false
  },
  {
    dataField: "9",
    text: "F",
    sort: false
  },
  {
    dataField: "10",
    text: "G",
    sort: false
  },
  {
    dataField: "11",
    text: "H",
    sort: false
  },
  {
    dataField: "12",
    text: "I",
    sort: false
  },
  {
    dataField: "13",
    text: "K",
    sort: false
  }
];

function toBlock(block){
    switch(block){
        case "1":
            return "A";
        case "2":
            return "B";
        case "3":
            return "C";
        case "4":
            return "D";
        case "5":
            return "E";
        case "6":
            return "1";
        case "7":
            return "2";
      case "8":
        return "VIP";
      case "9":
        return "F";
      case "10":
        return "G";
      case "11":
        return "H";
      case "12":
        return "I";
      case "13":
        return "K";
    }
}
function toKey(block){
    switch(block){
        case "A":
            return "1";
        case "B":
            return "2";
        case "C":
            return "3";
        case "D":
            return "4";
        case "E":
            return "5";
        case "1":
            return "6";
        case "2":
            return "7";
      case "VIP":
        return "8";
      case "F":
        return "9";
      case "G":
        return "10";
      case "H":
        return "11";
      case "I":
        return "12";
      case "K":
        return "13";
    }
}

const convertConfigToArray = (data)=>{
    let result = [];
    for(let key in data){
        result.push({
            id: toBlock(key),
            ...data[key]
        })
    }
    return  result
}

const convertConfigToObject = (data)=>{
    let result = {};
    for(let i in data){
        let key = toKey(data[i].id.toString());
        delete  data[i].id;
        for(let j in data[i]){
            if(!data[i][j]){
                delete data[i][j];
            }
        }
        result[key] = {
            ...data[i]
        }
    }
    return  result

}

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemConfig: [],
            bonusLogic: [],
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
        axios.get(API+"/config", config).then(response => {
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
        function updateConfig(name, newValue, description){
            const user = JSON.parse(localStorage.getItem('authUser'));
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };
            const body = {
                name: name,
                value: newValue,
                description: description
            };
            if (window.confirm("是否确定更新"+description)) {
                axios.put(API+"/Config", body, config).then(response => {
                    if (response.status === 400 || response.status === 500)
                        throw response.data;
                    window.location.reload();
                }).catch(err => {
                    throw err[1];
                });
            } else {

            }
        }
        const FormKey = (keyName, value, description) => {
            let inputValue = null;
            return(
                keyName !== "BONUS_LOGIC" ?
                <FormGroup row>
                    <Label htmlFor={keyName} className="col-md-2 col-form-label">{description}</Label>
                    <Col md={6} style={{display: 'flex'}}>
                        <Label htmlFor={keyName} className="col-md-2 col-form-label">{value}</Label>
                        <Input className="form-control" type="text" value={inputValue} onChange={(event) => inputValue = event.target.value} id={keyName} />
                    </Col>
                    <Col md={4}>
                        <Button
                            type="button"
                            onClick={() => updateConfig(keyName, inputValue, description)}
                            className="waves-effect"
                        >
                            提交修改
                        </Button>
                    </Col>
                </FormGroup>
                :null
            );
        }
        const BonusLogic = (keyName, value, description) => {
          if (keyName === "BONUS_LOGIC"){
            let tb = convertConfigToArray(JSON.parse(value));
            return(
              keyName === "BONUS_LOGIC" ?
                <FormGroup row>
                  <Label htmlFor={keyName} className="col-md-2 col-form-label">{description}</Label>
                  <Col md={6} style={{display: 'flex'}}>
                    {/* <Label htmlFor={keyName} className="col-form-label">{value}</Label> */}
                    {/* <Input className="form-control" type="text" value={inputValue} onChange={(event) => inputValue = event.target.value} id={keyName} /> */}
                    <div className="table-responsive">
                      <BootstrapTable
                        keyField="id"
                        data={tb}
                        columns={columns}
                        cellEdit={cellEditFactory({
                          mode: "click",
                          beforeSaveCell(oldValue, newValue, row, column, done) {
                            setTimeout(() => {
                              if (window.confirm('是否更改？')) {
                                done(); // contine to save the changes
                                updateConfig(keyName, JSON.stringify(convertConfigToObject(tb)), description);
                              } else {
                                done(false); // reject the changes
                              }
                            }, 0);
                            return { async: true };
                          }
                        })}
                      />
                    </div>
                  </Col>
                </FormGroup>
                :null
            );
          }

        }

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">系统设置</h4>
                                        <p className="card-title-desc">通过提交下列表格修改系统参数。</p>
                                        {
                                            this.state.systemConfig ?
                                            this.state.systemConfig.map((item) => FormKey(item.name, item.value, item.description))
                                            :
                                            null
                                        }
                                        <p className="card-title-desc">通过提交下列表格修改衡量点产生逻辑。</p>
                                        <p className="card-title-desc">点击表格里面的参数，选中之后会出现输入框，输入对应的数值之后，按下回车键“enter”确认。</p>
                                        {
                                            this.state.systemConfig ?
                                            this.state.systemConfig.map((item) => BonusLogic(item.name, item.value, item.description))
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

export default Settings;

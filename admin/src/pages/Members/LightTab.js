import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Col, CardText, UncontrolledTooltip, Input, Button } from "reactstrap";
import API from "../../config";
import axios from 'axios';

class LightTab extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    };

    lightHandler(rs) {
        const light = []
        for (let i = 0; i <= 12; i++) {
            light.push({
                "0": {type: i},
                "1": rs?.[0]?.[i]?.type ? {type: rs[0][i]?.type, sourceAreaId: rs[0][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "2": rs?.[1]?.[i]?.type ? {type: rs[1][i]?.type, sourceAreaId: rs[1][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "3": rs?.[2]?.[i]?.type ? {type: rs[2][i]?.type, sourceAreaId: rs[2][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "4": rs?.[3]?.[i]?.type ? {type: rs[3][i]?.type, sourceAreaId: rs[3][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "5": rs?.[4]?.[i]?.type ? {type: rs[4][i]?.type, sourceAreaId: rs[4][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "6": rs?.[5]?.[i]?.type ? {type: rs[5][i]?.type, sourceAreaId: rs[5][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "7": rs?.[6]?.[i]?.type ? {type: rs[6][i]?.type, sourceAreaId: rs[6][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "8": rs?.[7]?.[i]?.type ? {type: rs[7][i]?.type, sourceAreaId: rs[7][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "9": rs?.[8]?.[i]?.type ? {type: rs[8][i]?.type, sourceAreaId: rs[8][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "10": rs?.[9]?.[i]?.type ? {type: rs[9][i]?.type, sourceAreaId: rs[9][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "11": rs?.[10]?.[i]?.type ? {type: rs[10][i]?.type, sourceAreaId: rs[10][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "12": rs?.[11]?.[i]?.type ? {type: rs[11][i]?.type, sourceAreaId: rs[11][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "13": rs?.[12]?.[i]?.type ? {type: rs[12][i]?.type, sourceAreaId: rs[12][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "14": rs?.[13]?.[i]?.type ? {type: rs[13][i]?.type, sourceAreaId: rs[13][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "15": rs?.[14]?.[i]?.type ? {type: rs[14][i]?.type, sourceAreaId: rs[14][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "16": rs?.[15]?.[i]?.type ? {type: rs[15][i]?.type, sourceAreaId: rs[15][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "17": rs?.[16]?.[i]?.type ? {type: rs[16][i]?.type, sourceAreaId: rs[16][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "18": rs?.[17]?.[i]?.type ? {type: rs[17][i]?.type, sourceAreaId: rs[17][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "19": rs?.[18]?.[i]?.type ? {type: rs[18][i]?.type, sourceAreaId: rs[18][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "20": rs?.[19]?.[i]?.type ? {type: rs[19][i]?.type, sourceAreaId: rs[19][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "21": rs?.[20]?.[i]?.type ? {type: rs[20][i]?.type, sourceAreaId: rs[20][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "22": rs?.[21]?.[i]?.type ? {type: rs[21][i]?.type, sourceAreaId: rs[21][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "23": rs?.[22]?.[i]?.type ? {type: rs[22][i]?.type, sourceAreaId: rs[22][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "24": rs?.[23]?.[i]?.type ? {type: rs[23][i]?.type, sourceAreaId: rs[23][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "25": rs?.[24]?.[i]?.type ? {type: rs[24][i]?.type, sourceAreaId: rs[24][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "26": rs?.[25]?.[i]?.type ? {type: rs[25][i]?.type, sourceAreaId: rs[25][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "27": rs?.[26]?.[i]?.type ? {type: rs[26][i]?.type, sourceAreaId: rs[26][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "28": rs?.[27]?.[i]?.type ? {type: rs[27][i]?.type, sourceAreaId: rs[27][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "29": rs?.[28]?.[i]?.type ? {type: rs[28][i]?.type, sourceAreaId: rs[28][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
                "30": rs?.[29]?.[i]?.type ? {type: rs[29][i]?.type, sourceAreaId: rs[29][i]?.sourceAreaId} : {type: "NULL", sourceAreaId: null},
            });
        }
        return light;
    }

    lightController(light,x,y) {
        switch(light){
            case "GREEN":
                return (
                    <div>
                        <UncontrolledTooltip target={"green_team"+x+y} placement="top">
                            {y}
                        </UncontrolledTooltip>
                        <span className="green_team" id={"green_team"+x+y} style={{display: 'inline-block', margin: '0 5px'}}></span>
                    </div>
                )
            case "RED":
                return (
                    <div>
                        <UncontrolledTooltip target={"red_team"+x+y} placement="top">
                            {y}
                        </UncontrolledTooltip>
                        <span className="red_team" id={"red_team"+x+y} style={{display: 'inline-block', margin: '0 5px'}}></span>
                    </div>
                )
            case "YELLOW":
                return (<span className="yellow_team" style={{display: 'inline-block', margin: '0 5px'}}></span>)
            case "NULL":
                return (<span className="null_color" style={{display: 'inline-block', margin: '0 5px'}}></span>)
            default:
                return light
        }
    }

    updateAreaRecords(id, value) {
        const user = JSON.parse(localStorage.getItem('authUser'));
        const config = {
            headers: { Authorization: `Bearer ${user.token}` }
        };
        const body = {
            ID: id,
            Live: value
        };
        if (window.confirm("是否确定更新")) {
            axios.put(API+"/AreaRecord/records", body, config).then(response => {
                if (response.status === 400 || response.status === 500)
                    throw response.data;
                window.location.reload();
            }).catch(err => {
                throw err[1];
            });
        } else {
            
        }
    }
    
    
    render() {
        
        const lightKeys = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        const lightKeysFooter = ['',1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
        const buildRow = (x, y) => (
            y.map(
                (yitem) => 
                <tr>
                    {
                        x.map(
                            (xitem) => 
                            <td>
                                {this.lightController(yitem[xitem]?.type,xitem,yitem[xitem]?.sourceAreaId)}
                            </td>
                        )
                    }
                </tr>
            )
        );
        
        function lightTitle(type, recordIndex, orderId){
            switch(type){
                case "a": 
                    return "新订单";
                case "b":
                    return "多次购买";
                case "c":
                    return `衡量点${recordIndex} - 订单ID: ${orderId}`;
                case "d":
                    return "重生";
            }
        }

        let inputValue = null;
        return (
            <Row style={{border: '2px solid #5664d2'}}>
                <Col sm="12">
                    <CardText>
                        <h5>
                            {lightTitle(this.props.data?.type, this.props.data?.recordIndex, this.props.data?.orderId)}
                        </h5>
                        <Table 
                            className="mb-0"
                            bordered={true}
                            style={{display: 'flow-root'}}
                        >
                            <tbody style={{textAlign: 'center'}}>
                                {
                                    this.props.data !== [] ? 
                                    buildRow(lightKeys, this.lightHandler(this.props.data?.lights).reverse())
                                    :
                                    null
                                }
                            </tbody>
                            <tfoot style={{textAlign: 'center'}}>
                                {
                                    lightKeysFooter.map((item) => <td>{item}</td>)
                                }
                            </tfoot>
                        </Table>
                        <Row>
                            <Col sm={1}>
                                <div>
                                    <div className="mb-3">
                                        <p className="text-muted text-truncate mb-2">总轮数</p>
                                        <h5>{this.props.data?.live}</h5>
                                    </div>
                                </div>
                            </Col>

                            <Col sm={1}>
                                <div>
                                    <div className="mb-3">
                                        <p className="text-muted text-truncate mb-2">当前轮数</p>
                                        <h5>{this.props.data?.roundNum}</h5>
                                    </div>
                                </div>
                            </Col>

                            <Col sm={2}>
                                <div>
                                    <div className="mb-3">
                                        <p className="text-muted text-truncate mb-2">修改总轮数</p>
                                        <Row>
                                            <Input className="col-md-4 form-control" type="text" value={inputValue} onChange={(event) => inputValue = event.target.value} id={this.props.data?.id} />
                                            <Button
                                                type="button"
                                                onClick={() => this.updateAreaRecords(this.props.data?.id, inputValue)}
                                                className="waves-effect"
                                            >
                                                提交修改
                                            </Button>
                                        </Row>
                                        
                                    </div>
                                </div>
                            </Col>

                            <Col sm={1}>
                                <div>
                                    <div className="mb-3">
                                        <p className="text-muted text-truncate mb-2">区域序号</p>
                                        <h5>{this.props.data?.blockNum}</h5>
                                    </div>
                                </div>
                            </Col>

                            <Col sm={1}>
                                <div>
                                    <div className="mb-3">
                                        <p className="text-muted text-truncate mb-2">历史区域序号</p>
                                        <h5>{this.props.data?.historyRecords.map(n=>n?.blockNum).toString()}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardText>
                </Col>
            </Row>
        );
    }
}

export default LightTab;

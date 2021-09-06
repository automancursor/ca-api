import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Row, Col, CardText } from "reactstrap";
import * as styles from "./star.module.scss";

class LightTab extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  // light handler
  lightHandler(rs) {
    const light = [];
    for (let i = 0; i <= 20; i++) {
      light.push({
        "0": i,
        "1": rs?.[0]?.[i]?.type ? rs[0][i]?.type : "NULL",
        "2": rs?.[1]?.[i]?.type ? rs[1][i]?.type : "NULL",
        "3": rs?.[2]?.[i]?.type ? rs[2][i]?.type : "NULL",
        "4": rs?.[3]?.[i]?.type ? rs[3][i]?.type : "NULL",
        "5": rs?.[4]?.[i]?.type ? rs[4][i]?.type : "NULL",
        "6": rs?.[5]?.[i]?.type ? rs[5][i]?.type : "NULL",
        "7": rs?.[6]?.[i]?.type ? rs[6][i]?.type : "NULL",
        "8": rs?.[7]?.[i]?.type ? rs[7][i]?.type : "NULL",
        "9": rs?.[8]?.[i]?.type ? rs[8][i]?.type : "NULL",
        "10": rs?.[9]?.[i]?.type ? rs[9][i]?.type : "NULL",
        "11": rs?.[10]?.[i]?.type ? rs[10][i]?.type : "NULL",
        "12": rs?.[11]?.[i]?.type ? rs[11][i]?.type : "NULL",
        "13": rs?.[12]?.[i]?.type ? rs[12][i]?.type : "NULL",
        "14": rs?.[13]?.[i]?.type ? rs[13][i]?.type : "NULL",
        "15": rs?.[14]?.[i]?.type ? rs[14][i]?.type : "NULL",
        "16": rs?.[15]?.[i]?.type ? rs[15][i]?.type : "NULL",
        "17": rs?.[16]?.[i]?.type ? rs[16][i]?.type : "NULL",
        "18": rs?.[17]?.[i]?.type ? rs[17][i]?.type : "NULL",
        "19": rs?.[18]?.[i]?.type ? rs[18][i]?.type : "NULL",
        "20": rs?.[19]?.[i]?.type ? rs[19][i]?.type : "NULL",
        "21": rs?.[20]?.[i]?.type ? rs[20][i]?.type : "NULL",
        "22": rs?.[21]?.[i]?.type ? rs[21][i]?.type : "NULL",
        "23": rs?.[22]?.[i]?.type ? rs[22][i]?.type : "NULL",
        "24": rs?.[23]?.[i]?.type ? rs[23][i]?.type : "NULL",
        "25": rs?.[24]?.[i]?.type ? rs[24][i]?.type : "NULL",
        "26": rs?.[25]?.[i]?.type ? rs[25][i]?.type : "NULL",
        "27": rs?.[26]?.[i]?.type ? rs[26][i]?.type : "NULL",
        "28": rs?.[27]?.[i]?.type ? rs[27][i]?.type : "NULL",
        "29": rs?.[28]?.[i]?.type ? rs[28][i]?.type : "NULL",
        "30": rs?.[29]?.[i]?.type ? rs[29][i]?.type : "NULL",
      });
    }
    return light;
  }
  // light color controller
  lightController(light) {
    switch (light) {
      case "GREEN":
        return (
          <span
            className={styles["green_team"]}
            style={{ display: "inline-block", margin: "0" }}
          ></span>
        );
      case "RED":
        return (
          <span
            className={styles["red_team"]}
            style={{ display: "inline-block", margin: "0" }}
          ></span>
        );
      case "YELLOW":
        return (
          <span
            className={styles["yellow_team"]}
            style={{ display: "inline-block", margin: "0" }}
          ></span>
        );
      case "NULL":
        return (
          <span
            className={styles["null_color"]}
            style={{ display: "inline-block", margin: "0" }}
          ></span>
        );
      default:
        return light;
    }
  }

  render() {
    const fifteenKeys = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
    ];
    const fifteenKeysFooter = [
      "",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
    ];
    const buildRow = (x, y) =>
      y.map((yitem) => (
        <tr>
          {x.map((xitem) => (
            <td
              style={{
                padding: "3px 0",
                borderLeft: "3px solid #fff",
                borderRight: "3px solid #fff",
                color: "#fff",
              }}
            >
              {this.lightController(yitem[xitem])}
            </td>
          ))}
        </tr>
      ));

    return (
      <Row style={{ paddingBottom: "40px" }}>
        <Col sm="12">
          <CardText>
            <h5 style={{ fontSize: "16px", textAlign: "center" }}>
              {this.props.data?.type === "c"
                ? `衡量点 ${this.props.data?.blockNum}`
                : null}
              {this.props.data?.type === "d"
                ? `重生 ${this.props.data?.blockNum}`
                : null}
            </h5>
            <Table className="mb-0" borderless={true}>
              <tbody style={{ textAlign: "center", backgroundColor: "#000" }}>
                {this.props.data !== []
                  ? buildRow(
                      fifteenKeys,
                      this.lightHandler(this.props.data?.lights).reverse()
                    )
                  : null}
              </tbody>
              <tfoot style={{ textAlign: "center" }}>
                {fifteenKeysFooter.map((item) => (
                  <td>{item}</td>
                ))}
              </tfoot>
            </Table>
            <Row style={{ flexWrap: "inherit" }}>
              <Col sm={1}>
                <div style={{ fontSize: "16px", marginLeft: "20px" }}>
                  <div className="mb-3">
                    <p className="text-muted text-truncate mb-2">总轮数</p>
                    <h3>{this.props.data?.live}</h3>
                  </div>
                </div>
              </Col>

              <Col sm={1}>
                <div style={{ fontSize: "16px" }}>
                  <div className="mb-3">
                    <p className="text-muted text-truncate mb-2">当前轮数</p>
                    <h3>{this.props.data?.roundNum}</h3>
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

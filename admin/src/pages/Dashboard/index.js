import React, {Component} from "react";
import {Container, Row, Col, Form, Card} from "reactstrap";
import axios from 'axios';
import API from "../../config";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

//Import Components
// import MiniWidgets from "./MiniWidgets";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [],
      walletStatistics: [],
      areaClaims: [],
    }
    this.getWalletStatistics.bind(this);
    this.getAreaClaims.bind(this);
  }

  componentDidMount() {
    this.getWalletStatistics();
    this.getAreaClaims();
  }

  getWalletStatistics = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const config = {
      headers: {Authorization: `Bearer ${user.token}`}
    };
    axios.get(API + "/UserProfile/walletStatistics", config).then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      if (response.data.data) {
        this.setState({walletStatistics: response.data.data});
      }
    }).catch(err => {
      throw err[1];
    });
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
    let walletStatisticsReports = [
      {icon: "ri-store-2-line", title: "CVA 总额", value: `$ ${this.state.walletStatistics?.cva?.toFixed(2)}`},
      {icon: "ri-stack-line", title: "CVT 总额", value: `${this.state.walletStatistics?.cvt}`},
    ];
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>

            <Breadcrumbs title="仪表盘" breadcrumbItems={this.state.breadcrumbItems}/>
            <Row>
              {/*<MiniWidgets reports={walletStatisticsReports}/>*/}
            </Row>

            <Row>
              <Card>
                <Col>
                  <h6>上一次顺排点位数: </h6>
                  <p>
                    1区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[5]?.lastRewardedBlockNum}</strong>),
                    2区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[6]?.lastRewardedBlockNum}</strong>),
                    A区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[0]?.lastRewardedBlockNum}</strong>),
                    B区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[1]?.lastRewardedBlockNum}</strong>),
                    C区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[2]?.lastRewardedBlockNum}</strong>),
                    D区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[3]?.lastRewardedBlockNum}</strong>),
                    E区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[4]?.lastRewardedBlockNum}</strong>),
                    VIP区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[7]?.lastRewardedBlockNum}</strong>),
                    F区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[8]?.lastRewardedBlockNum}</strong>),
                    G区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[9]?.lastRewardedBlockNum}</strong>),
                    H区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[10]?.lastRewardedBlockNum}</strong>),
                    I区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[11]?.lastRewardedBlockNum}</strong>),
                    K区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[12]?.lastRewardedBlockNum}</strong>)
                  </p>
                </Col>
              </Card>



              {/* <RecentlyActivity/>
                            <LatestTransactions/> */}


            </Row>


            <Row>
              <Card>
                <Col>
                  <h6>衡量点滴水池: </h6>
                  <p>
                    1区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[5]?.accumulatedBonus}</strong>),
                    2区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[6]?.accumulatedBonus}</strong>),
                    A区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[0]?.accumulatedBonus}</strong>),
                    B区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[1]?.accumulatedBonus}</strong>),
                    C区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[2]?.accumulatedBonus}</strong>),
                    D区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[3]?.accumulatedBonus}</strong>),
                    E区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[4]?.accumulatedBonus}</strong>),
                    VIP区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[7]?.accumulatedBonus}</strong>),
                    F区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[8]?.accumulatedBonus}</strong>),
                    G区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[9]?.accumulatedBonus}</strong>),
                    H区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[10]?.accumulatedBonus}</strong>),
                    I区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[11]?.accumulatedBonus}</strong>),
                    K区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[12]?.accumulatedBonus}</strong>)
                  </p>
                </Col>

              </Card>
              {/* <Col xl={8}>
                                <RevenueAnalytics/>
                            </Col>
                            <Col xl={4}>


                                <EarningReports/>

                            </Col> */}


            </Row>

            <Row>
              <Card>
                <Col>
                  <h6>衡量点冻结滴水池: </h6>
                  <p>
                    1区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[5]?.accumulatedBonusCredit}</strong>),
                    2区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[6]?.accumulatedBonusCredit}</strong>),
                    A区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[0]?.accumulatedBonusCredit}</strong>),
                    B区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[1]?.accumulatedBonusCredit}</strong>),
                    C区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[2]?.accumulatedBonusCredit}</strong>),
                    D区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[3]?.accumulatedBonusCredit}</strong>),
                    E区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[4]?.accumulatedBonusCredit}</strong>),
                    VIP区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[7]?.accumulatedBonusCredit}</strong>),
                    F区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[8]?.accumulatedBonusCredit}</strong>),
                    G区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[9]?.accumulatedBonusCredit}</strong>),
                    H区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[10]?.accumulatedBonusCredit}</strong>),
                    I区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[11]?.accumulatedBonusCredit}</strong>),
                    K区(<strong style={{color: 'red'}}>{this.state.areaClaims?.[12]?.accumulatedBonusCredit}</strong>)
                  </p>
                </Col>

              </Card>
              {/* <ChatBox/>
                            <SalesAnalytics/>
                            <Sources/>
                            <RevenueByLocations/> */}
            </Row>


          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;

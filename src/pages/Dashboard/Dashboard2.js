import React, { Component } from 'react';
import styles from './Dashboard2.less';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import {
  ChartCard,
  Field,
  MiniArea,
  MiniBar,
  MiniProgress,
  TimelineChart,
} from '@/components/Charts';
import Trend from '../../components/Trend';
import { Row, Col, Icon, Tooltip } from 'antd';
import moment from 'moment';
import httpConfig from '../../httpConfig';
const getHomePageUrl = httpConfig.host + '/getHomepage';

class Dashboard2 extends Component {
  state = {
    record: {
      allCount: 0,
      host: 0,
      isSolved: 0,
      urgent: 0,
      notSolved: 0,
      sql: 0,
    },
    loadavgArr: [],
    loadAverage: 0,
    loadMax: 0,
    onlineRate: '0',
    connection: 0,
    maxConnection: 1,
    memTotal: 5,
    memUsed: 2.5,
  };

  componentWillMount() {
    const loadavg = [];
    for (let i = 0; i < 20; i += 1) {
      loadavg.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 1.5,
      });

      this.setState({
        loadavgArr: loadavg,
      });
    }
  }

  componentDidMount() {
    this.getData();
    // this.timer = setInterval(() => {
    //   this.getData();
    // }, 10000);
  }

  componentWillUnmount() {
    // this.timer && clearInterval(this.timer);
  }

  getData() {
    let _this = this;
    fetch(getHomePageUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let tmp = [];
        for (let i = 0; i < res.loadavgArr.length; i++) {
          tmp.push({
            x: new Date().getTime() - 1000 * 60 * 1 * i,
            y1: res.loadavgArr[i].loadavg,
          });
        }
        _this.setState({
          record: res.record,
          loadavgArr: tmp,
          loadAverage: res.loadAverage,
          loadMax: res.loadMax,
          onlineRate: res.onlineRate,
          connection: res.connection,
          maxConnection: res.maxConnection,
          memTotal: res.memTotal,
          memUsed: res.memUsed,
        });
      });
  }

  render() {
    const visitData = [];
    const beginDay = new Date().getTime();
    for (let i = -20; i < 0; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.round(100 * Math.random() * 1) / 100,
      });
    }

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    const {
      record,
      loadavgArr,
      loadAverage,
      loadMax,
      onlineRate,
      connection,
      maxConnection,
      memTotal,
      memUsed,
    } = this.state;
    return (
      <AsyncLoadBizCharts>
        <div>
          <Row gutter={24}>
            <Col xl={6} lg={12} md={12} sm={24} xs={24}>
              <ChartCard
                title="集群在线率"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={onlineRate + '%'}
                footer={<Field label="平均在线率" value={'67%'} />}
                contentHeight={46}
              >
                <span>
                  周同比
                  <Trend flag="up" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                    12%
                  </Trend>
                </span>
                <div>
                  日环比
                  <Trend flag="down" style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
                    11%
                  </Trend>
                </div>
              </ChartCard>
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24}>
              <ChartCard
                title="数据库总连接数"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={connection}
                footer={<Field label="今日最大连接数" value={maxConnection} />}
                contentHeight={46}
              >
                <MiniArea line height={46} data={visitData} />
              </ChartCard>
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24}>
              <ChartCard
                title="集群总负载"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={loadAverage}
                footer={<Field label="集群节点最高负载" value={loadMax} />}
                contentHeight={46}
              >
                <MiniBar height={46} data={visitData} />
              </ChartCard>
            </Col>

            <Col xl={6} lg={12} md={12} sm={24} xs={24}>
              <ChartCard
                title="集群内存总量"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={memUsed + 'G/' + memTotal + 'G'}
                footer={
                  <Field
                    label="总内存使用率"
                    value={Math.round((100 * memUsed) / memTotal) + '%'}
                  />
                }
                contentHeight={46}
              >
                <MiniProgress
                  percent={Math.round((100 * memUsed) / memTotal)}
                  strokeWidth={8}
                  target={Math.round((100 * memUsed) / memTotal)}
                />
              </ChartCard>
            </Col>
          </Row>

          <div className={styles.alarmbkg}>
            <Row gutter={24} className={styles.dataContainer}>
              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Row>
                  <Col>
                    <h3>告警统计</h3>
                  </Col>
                </Row>
                <Row
                  type="flex"
                  justify="space-between"
                  className={styles.alarmGroup}
                  style={{ marginLeft: 0, marginRight: 0 }}
                >
                  <Col className={styles.alarm} span={8}>
                    <h2>{record.urgent}</h2>
                    <p>紧急告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#FAAD14' }} span={8}>
                    <h2>{record.notSolved}</h2>
                    <p>未解决告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#52c41a' }} span={8}>
                    <h2>{record.isSolved}</h2>
                    <p>已解决告警</p>
                  </Col>
                </Row>
                <Row
                  type="flex"
                  justify="space-between"
                  className={styles.alarmGroup}
                  style={{ marginLeft: 0, marginRight: 0 }}
                >
                  <Col className={styles.alarm} style={{ backgroundColor: '#108ee9' }} span={8}>
                    <h2>{record.host}</h2>
                    <p>服务器告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#13c2c2' }} span={8}>
                    <h2>{record.sql}</h2>
                    <p>数据库告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#2db7f5' }} span={8}>
                    <h2>{record.allCount}</h2>
                    <p>告警总数</p>
                  </Col>
                </Row>
              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                <Row>
                  <Col>
                    <h3>服务器平均负载</h3>
                  </Col>
                </Row>
                <Row>
                  <TimelineChart height={250} data={loadavgArr} titleMap={{ y1: '平均负载' }} />
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </AsyncLoadBizCharts>
    );
  }
}

export default Dashboard2;

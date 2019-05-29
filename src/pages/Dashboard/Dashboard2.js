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
import { Card, Row, Col, Icon, Tooltip } from 'antd';
import moment from 'moment';

class Dashboard2 extends Component {
  state = {};

  render() {
    const visitData = [];
    const visitData2 = [];
    const beginDay = new Date().getTime();
    for (let i = 0; i < 20; i += 1) {
      visitData.push({
        x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
        y: Math.floor(Math.random() * 100) + 10,
      });
      visitData2.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 10) + 2,
      });
    }

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
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
                total={'80%'}
                footer={<Field label="平均在线率" value={'60%'} />}
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
                title="访问量"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total={12348}
                footer={<Field label="最高访问量" value={8964} />}
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
                total={8.9}
                footer={<Field label="集群节点最高负载" value={9.9} />}
                contentHeight={46}
              >
                <MiniBar height={46} data={visitData} />
              </ChartCard>
            </Col>
            <Col xl={6} lg={12} md={12} sm={24} xs={24}>
              <ChartCard
                title="集群总数据量"
                action={
                  <Tooltip title="指标说明">
                    <Icon type="info-circle-o" />
                  </Tooltip>
                }
                total="100G/200G"
                footer={<Field label="总数据量使用率" value={'50%'} />}
                contentHeight={46}
              >
                <MiniProgress percent={50} strokeWidth={8} target={50} />
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
                    <h2>20</h2>
                    <p>告警总数</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#FAAD14' }} span={8}>
                    <h2>5</h2>
                    <p>未解决告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#52c41a' }} span={8}>
                    <h2>15</h2>
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
                    <h2>12</h2>
                    <p>服务器告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#13c2c2' }} span={8}>
                    <h2>6</h2>
                    <p>数据库告警</p>
                  </Col>
                  <Col className={styles.alarm} style={{ backgroundColor: '#2db7f5' }} span={8}>
                    <h2>2</h2>
                    <p>操作告警</p>
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
                  <TimelineChart height={250} data={visitData2} titleMap={{ y1: '平均负载' }} />
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

import React, { Component } from 'react';
import styles from './Dashboard2.less';
import { Card, Col, Row } from 'antd/lib/index';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';

class Dashboard2 extends Component {
  state = {};

  render() {
    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );
    return (
      <AsyncLoadBizCharts>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="报警数" value="1" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="在线率" value="80%" bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="集群负载" value="40%" />
              </Col>
            </Row>
          </Card>
        </div>
      </AsyncLoadBizCharts>
    );
  }
}

export default Dashboard2;

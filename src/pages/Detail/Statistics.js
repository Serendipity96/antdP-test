import React, { Component } from 'react';
import { Col, Row, Badge } from 'antd';
import styles from './AlarmRecord.less';

class Statistics extends Component {
  render() {
    return (
      <div>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#FFF7E2', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            服务器IP
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            连接
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            运行时间
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            网络接收
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            网络发送
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            每秒查询
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            每秒事务
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            图表
          </Col>
        </Row>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            10.64.7.23
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            <Badge count={'成功'} style={{ backgroundColor: '#52c41a' }} />
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            23天
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            32KB
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            0KB
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            9
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            1
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            <a>详情</a>
          </Col>
        </Row>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            10.35.7.114
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            <Badge count={'成功'} style={{ backgroundColor: '#52c41a' }} />
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            18天
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            9KB
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            45KB
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            22
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            3
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            <a>详情</a>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Statistics;

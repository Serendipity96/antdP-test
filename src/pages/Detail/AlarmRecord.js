import React, { Component } from 'react';
import { Col, Row, Badge } from 'antd';
import styles from './AlarmRecord.less';

class AlarmRecord extends Component {
  render() {
    return (
      <div>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#FFF7E2', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            服务器IP
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            级别
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            告警原因
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            当前值
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            监控时间
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            是否解决
          </Col>
        </Row>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            10.64.7.24
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            <Badge count={'紧急'} />
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            cpu > 70%
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            93%
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            2019-03-12
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            已解决
          </Col>
        </Row>
        <Row
          gutter={24}
          className={styles.rowDec}
          style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
        >
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            10.64.8.119
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            <Badge count={'警告'} style={{ backgroundColor: '#FAAD14' }} />
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            内存 > 60%
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            81%
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            2019-03-12
          </Col>
          <Col xl={4} lg={24} md={24} sm={24} xs={24}>
            已解决
          </Col>
        </Row>
      </div>
    );
  }
}

export default AlarmRecord;

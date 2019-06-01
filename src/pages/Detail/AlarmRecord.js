import React, { Component } from 'react';
import { Col, Row, Badge, Switch } from 'antd';
import styles from './AlarmRecord.less';

const alarmRecordListUrl = 'http://127.0.0.1:8081/getAlarmRecordList';

class AlarmRecord extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.getAlarmRecordList();
  }

  getAlarmRecordList() {
    let _this = this;
    fetch(alarmRecordListUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        _this.setState({ list: res });
      });
  }

  render() {
    const { list } = this.state;
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
        {list.map(item => {
          return (
            <Row
              gutter={24}
              className={styles.rowDec}
              style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
              key={item.id}
            >
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                {item.ip_address}
              </Col>
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                <Badge count={item.level} />
              </Col>
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                {item.rule}
              </Col>
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                {item.value}
              </Col>
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                {item.timestamp}
              </Col>
              <Col xl={4} lg={24} md={24} sm={24} xs={24}>
                {item.is_solved}
                <Switch checkedChildren="否" unCheckedChildren="是" />
              </Col>
            </Row>
          );
        })}

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

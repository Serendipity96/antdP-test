import React, { Component } from 'react';
import { Col, Row, Badge, Checkbox } from 'antd';
import styles from './AlarmRecord.less';

const alarmRecordListUrl = 'http://127.0.0.1:8081/getAlarmRecordList';
const changeSolvedUrl = 'http://127.0.0.1:8081/changeSolved';

class AlarmRecord extends Component {
  state = {
    list: [],
    map: null,
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
        let map = new Map();
        for (let i = 0; i < res.length; i++) {
          map.set(res[i].id, res[i].is_solved);
        }
        _this.setState({ list: res, map: map });
      });
  }

  changeSolved(e) {
    let { map } = this.state;
    let id = e.target['data-id'];
    let isSolved = e.target.checked;
    map.set(id, isSolved);
    this.setState({ map: map });
    fetch(changeSolvedUrl, {
      method: 'POST',
      body: JSON.stringify({ id, isSolved }),
    });
  }

  render() {
    const { list, map } = this.state;
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
                <Checkbox
                  checked={map.get(item.id)}
                  onChange={this.changeSolved.bind(this)}
                  data-id={item.id}
                >
                  {`${map.get(item.id) ? '已解决' : '未解决'}`}
                </Checkbox>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default AlarmRecord;

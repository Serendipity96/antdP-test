import React, { Component } from 'react';
import { Col, Row, Badge } from 'antd';
import styles from './AlarmRecord.less';
import httpConfig from '../../httpConfig';

const tableUrl = httpConfig.host + '/getTableList';

class Statistics extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    this.getList();
    this.timer = setInterval(() => {
      this.getList();
    }, 60000);
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  getList() {
    let _this = this;
    fetch(tableUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        _this.setState({ list: res });
        console.log(res);
      });
  }

  render() {
    const { list } = this.state;
    console.log(list);
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
            数据库连接数
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            每秒事务
          </Col>
          <Col xl={3} lg={24} md={24} sm={24} xs={24}>
            图表
          </Col>
        </Row>

        {list.map(item => {
          return (
            <Row
              key={item.id}
              gutter={24}
              className={styles.rowDec}
              style={{ background: '#ffffff', marginRight: 0, marginLeft: 0 }}
            >
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.ip_address}
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                <Badge
                  count={item.connectionFlag}
                  style={{
                    backgroundColor: item.connectionFlag === '成功' ? '#52c41a' : '#bfbfbf',
                  }}
                />
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.runtime}天
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.netReceive}KB
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.netSend}KB
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.connections}
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                {item.tps}
              </Col>
              <Col xl={3} lg={24} md={24} sm={24} xs={24}>
                <a href={'/detail/chart/?id=' + item.id}>详情</a>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Statistics;

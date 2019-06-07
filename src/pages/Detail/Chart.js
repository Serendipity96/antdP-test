import React, { Component } from 'react';
import { Select, Row, Col, DatePicker, Button } from 'antd';
import { TimelineChart, WaterWave } from '@/components/Charts';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import moment from 'moment';
import httpConfig from '../../httpConfig';

const { Option } = Select;
const getDetailUrl = httpConfig.host + '/getHostParam';
const getMachineListUrl = httpConfig.host + '/getMachineList';

class Chart extends Component {
  state = {
    cpuChart: [],
    memChart: [],
    ioChart: [],
    netChart: [],
    connectionsChart: [],
    tpsChart: [],
    keyBufferReadChart: [],
    keyBufferWriteChart: [],
    tableLocksChart: [],
    threadCacheHitChart: [],
    machineList: [{ id: '0', ip_address: '0.0.0.0' }],
    id: 1,
    timestamp: 1559465597,
  };

  componentWillMount() {
    const cpu = [];
    const mem = [];
    const io = [];
    const net = [];
    const connections = [];
    const tps = [];
    const keyBufferRead = [];
    const keyBufferWrite = [];
    const tableLocks = [];
    const threadCacheHit = [];
    for (let i = 0; i < 20; i += 1) {
      cpu.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 1.5,
      });
      mem.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 1.2,
      });
      io.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 2.3,
        y2: 4.5,
      });
      net.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
        y2: 3.2,
      });
      connections.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 3.2,
      });
      tps.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
      });
      keyBufferRead.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
      });
      keyBufferWrite.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
      });
      tableLocks.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
      });
      threadCacheHit.push({
        x: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: 0.8,
      });
      // 如果是报表详情点进来的，有id
      let id = this.props.location.query['id'];
      if (id) {
        this.setState({ id: Number(id) });
      }
    }
    this.setState({
      cpuChart: cpu,
      memChart: mem,
      ioChart: io,
      netChart: net,
      connectionsChart: connections,
      tpsChart: tps,
      keyBufferReadChart: keyBufferRead,
      keyBufferWriteChart: keyBufferWrite,
      tableLocksChart: tableLocks,
      threadCacheHitChart: threadCacheHit,
    });
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getData();
    }, 60000);

    this.getMachineList();
    this.showResult();
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }

  getMachineList() {
    let _this = this;
    fetch(getMachineListUrl, {
      method: 'GET',
    })
      .then(res => res.text())
      .then(res => {
        _this.setState({ machineList: JSON.parse(res) });
      });
  }

  showResult() {
    const id = this.state.id;
    const timeEnd = this.state.timestamp;
    console.log(id);
    console.log(timeEnd);
    const timeStart = timeEnd - 86400;
    const timeGran = 1;
    const str = {
      timeEnd: timeEnd,
      timeStart: timeStart,
      timeGran: timeGran,
      hostId: id,
    };

    fetch(getDetailUrl, {
      method: 'POST',
      body: JSON.stringify(str),
    })
      .then(res => res.text())
      .then(data => {
        const d = JSON.parse(data);
        const d1 = d.data;
        console.log('fetch data');
        console.log(d1);
        const d2 = d1[id];
        const cpu = [];
        const mem = [];
        const io = [];
        const net = [];
        const connections = [];
        const tps = [];
        const keyBufferRead = [];
        const keyBufferWrite = [];
        const tableLocks = [];
        const threadCacheHit = [];

        for (let i = 0; i < d2.cpu.length; i += 1) {
          cpu.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.cpu[i],
          });
          mem.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.memory[i],
          });
          io.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.ioRead[i],
            y2: d2.ioWrite[i],
          });
          net.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.netSend[i],
            y2: d2.netReceive[i],
          });
          connections.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.sqlConnections[i],
          });
          tps.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.sqlTPS[i],
          });
          keyBufferRead.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.keyBufferRead[i],
          });
          keyBufferWrite.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.keyBufferWrite[i],
          });
          tableLocks.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.tableLocks[i],
          });
          threadCacheHit.push({
            x: new Date().getTime() - 1000 * 60 * 30 * i,
            y1: d2.threadCacheHit[i],
          });
        }
        this.setState({
          cpuChart: cpu,
          memChart: mem,
          ioChart: io,
          netChart: net,
          connectionsChart: connections,
          tpsChart: tps,
          keyBufferReadChart: keyBufferRead,
          keyBufferWriteChart: keyBufferWrite,
          tableLocksChart: tableLocks,
          threadCacheHitChart: threadCacheHit,
        });
      });
  }

  chooseMachine(value) {
    this.setState({ id: value });
  }

  changeDate(date, dateString) {
    this.setState({ timestamp: Date.parse(dateString) / 1000 });
  }

  disabledEndDate(current) {
    return current > moment();
  }

  render() {
    const {
      id,
      machineList,
      cpuChart,
      memChart,
      ioChart,
      netChart,
      connectionsChart,
      tpsChart,
      keyBufferReadChart,
      keyBufferWriteChart,
      tableLocksChart,
      threadCacheHitChart,
    } = this.state;

    return (
      <AsyncLoadBizCharts>
        <div>
          <Select
            defaultValue={id}
            placeholder="请选择机器"
            style={{ width: '30%', marginBottom: 15, marginRight: 10 }}
            onChange={this.chooseMachine.bind(this)}
          >
            {machineList.map(item => {
              return (
                <Option value={item.id} key={item.id}>
                  {item.ip_address}
                </Option>
              );
            })}
          </Select>
          <DatePicker
            defaultValue={moment()}
            onChange={this.changeDate.bind(this)}
            disabledDate={this.disabledEndDate.bind(this)}
          />
          <Button type="primary" onClick={this.showResult.bind(this)} style={{ marginLeft: 10 }}>
            查询
          </Button>

          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart height={300} data={cpuChart} titleMap={{ y1: 'cpu使用率' }} />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart height={300} data={memChart} titleMap={{ y1: '内存使用率' }} />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart height={300} data={ioChart} titleMap={{ y1: 'io读', y2: 'io写' }} />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart
                height={300}
                data={netChart}
                titleMap={{ y1: '网络上传', y2: '网络下载' }}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart
                height={300}
                data={connectionsChart}
                titleMap={{ y1: '数据库连接数' }}
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart height={300} data={tpsChart} titleMap={{ y1: 'TPS' }} />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart
                height={300}
                data={keyBufferReadChart}
                titleMap={{ y1: ' Key Buffer读穿透率' }}
              />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart
                height={300}
                data={keyBufferWriteChart}
                titleMap={{ y1: ' Key Buffer写穿透率' }}
              />
            </Col>
          </Row>
          <Row gutter={24}>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart height={300} data={tableLocksChart} titleMap={{ y1: '锁阻塞率' }} />
            </Col>
            <Col xl={12} lg={12} md={12} sm={24} xs={24}>
              <TimelineChart
                height={300}
                data={threadCacheHitChart}
                titleMap={{ y1: ' 线程缓存命中率' }}
              />
            </Col>
          </Row>
        </div>
      </AsyncLoadBizCharts>
    );
  }
}

export default Chart;

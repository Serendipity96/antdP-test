import React, { Component } from 'react';
import { Select } from 'antd';
import TimelineChart from '@/components/Charts/TimelineChart';

const { Option } = Select;

class Detail extends Component {
  state = {
    cpuChart: [],
    memChart: [],
    ioChart: [],
    netChart: [],
    connectionsChart: [],
    tpsChart: [],
  };

  componentWillMount() {
    const cpu = [];
    const mem = [];
    const io = [];
    const net = [];
    const connections = [];
    const tps = [];
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
    }
    this.setState({
      cpuChart: cpu,
      memChart: mem,
      ioChart: io,
      netChart: net,
      connectionsChart: connections,
      tpsChart: tps,
    });
    this.getData(1);
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //   this.getData();
    // }, 1000);
  }

  componentWillUnmount() {
    // this.timer && clearInterval(this.timer); // eslint-disable-line
  }

  getData(id) {
    const timeEnd = Math.round(new Date().getTime() / 1000);
    // const timeStart = timeEnd - 86400;
    const timeStart = 1557386915;
    const timeGran = 1;
    const str = {
      /* eslint-disable */
      timeEnd: timeEnd,
      timeStart: timeStart,
      timeGran: timeGran,
      hostId: id,
      /* eslint-disable */
    };

    fetch(`http://127.0.0.1:8081/getHostParam`, {
      method: 'POST',
      // headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify(str),
    })
      .then(res => res.text())
      .then(data => {
        const d = JSON.parse(data);
        const d1 = d.data;
        console.log('d1');
        console.log(d1);
        const d2 = d1[id];

        const cpu = [];
        const mem = [];
        const io = [];
        const net = [];
        const connections = [];
        const tps = [];
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
        }
        this.setState({
          cpuChart: cpu,
          memChart: mem,
          ioChart: io,
          netChart: net,
          connectionsChart: connections,
          tpsChart: tps,
        });
      });
  }

  handleChangeOption(id) {
    this.getData(id);
  }

  render() {
    const { cpuChart, memChart, ioChart, netChart, connectionsChart, tpsChart } = this.state;

    return (
      <div>
        <Select
          defaultValue="1"
          placeholder="请选择机器"
          style={{ width: '30%', marginBottom: 15 }}
          onChange={this.handleChangeOption.bind(this)}
        >
          <Option value="1">机器一</Option>
          <Option value="2">机器二</Option>
          <Option value="3">机器三</Option>
        </Select>

        <TimelineChart height={300} data={cpuChart} titleMap={{ y1: 'cpu使用率' }} />
        <TimelineChart height={300} data={memChart} titleMap={{ y1: '内存使用率' }} />
        <TimelineChart height={300} data={ioChart} titleMap={{ y1: 'io读', y2: 'io写' }} />
        <TimelineChart height={300} data={netChart} titleMap={{ y1: '网络上传', y2: '网络下载' }} />
        <TimelineChart height={300} data={connectionsChart} titleMap={{ y1: '数据库连接数' }} />
        <TimelineChart height={300} data={tpsChart} titleMap={{ y1: 'TPS' }} />
      </div>
    );
  }
}
export default Detail;

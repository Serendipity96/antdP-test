import React, { Component } from 'react';
import { Select } from 'antd';
import TimelineChart from '@/components/Charts/TimelineChart';

const { Option } = Select;

class Detail extends Component {
  state = {
    chartData: [],
    cpuData: [],
  };

  componentWillMount() {
    this.getData();

    const tmp = [];
    for (let i = 0; i < 20; i += 1) {
      tmp.push({
        x: i,
        y2: 1.5,
      });
    }
    this.setState({
      chartData: tmp,
    });
  }

  getData() {
    fetch(`http://127.0.0.1:8081/getHostParam`, {
      method: 'GET',
    })
      .then(res => res.text())
      .then(data => {
        const d = JSON.parse(data);
        const d1 = d.data;
        const d2 = d1['1'];
        const d3 = d2.cpu;
        this.setState({ cpuData: d3 });
      });
  }

  handleChange(value) {
    const { cpuData } = this.state;
    const tmp = [];
    if (value === '0') {
      for (let i = 0; i < cpuData.length; i += 1) {
        tmp.push({
          x: new Date().getTime() + 1000 * 60 * 30 * i,
          y1: cpuData[i],
        });
      }
      this.setState({ chartData: tmp });
    }
  }

  render() {
    const { chartData } = this.state;
    return (
      <div>
        <Select
          placeholder="请选择机器"
          style={{ width: '30%' }}
          // eslint-disable-next-line
          onChange={this.handleChange.bind(this)}
        >
          <Option value="0">机器一</Option>
        </Select>
        <TimelineChart height={300} data={chartData} titleMap={{ y1: 'cpu使用率' }} />
      </div>
    );
  }
}

export default Detail;

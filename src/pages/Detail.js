import React, { Component } from 'react';
import { Select, Row, Col } from 'antd';
import TimelineChart from '@/components/Charts/TimelineChart';

const { Option } = Select;

class Detail extends Component {
  state = {
    chartData1: [],
    chartData2: [],
  };

  componentWillMount() {
    const { chartData1, chartData2 } = this.state;
    for (let i = 0; i < 20; i += 1) {
      chartData1.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y1: Math.floor(Math.random() * 100) + 10,
      });
      chartData2.push({
        x: (new Date().getTime()) + (1000 * 60 * 30 * i),
        y2: Math.floor(Math.random() * 100) + 100,
      });
    }
    this.setState({
      chartData1, chartData2,
    });
  }

  handleChange(value) {
    const data1 = [];
    const data2 = [];
    if (value === '1') {
      for (let i = 0; i < 20; i += 1) {
        data2.push({
          x: (new Date().getTime()) + (1000 * 60 * 30 * i),
          y2: 1000,
        });
      }
      this.setState({ chartData2: data2 });
    } else if (value === '0') {
      for (let i = 0; i < 20; i += 1) {
        data1.push({
          x: (new Date().getTime()) + (1000 * 60 * 30 * i),
          y1: 10,
        });

      }
      this.setState({ chartData1: data1 });

    }
  }

  render() {
    const { chartData1, chartData2 } = this.state;
    return (
      <div>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <Select placeholder="请选择机器" style={{ width: '100%' }} onChange={this.handleChange.bind(this)}>
              <Option value="0">机器一</Option>
              <Option value="1">机器二</Option>
            </Select>
          </Col>
        </Row>
        <TimelineChart
          height={400}
          data={chartData1}
          titleMap={{ y1: 'CPU使用率' }}
        />
        <TimelineChart
          height={300}
          data={chartData2}
          titleMap={{ y2: '内存占用率' }}
        />
      </div>
    );
  }

}

export default Detail;


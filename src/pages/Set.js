import React, { Component } from 'react';
import { Tabs, Select, InputNumber } from 'antd';

const TabPane = Tabs.TabPane;
const { Option } = Select;

class Set extends Component {
  state = {};

  med(key) {
    console.log(key);
  }

  handleChange(value) {
    console.log(value);
  }

  changeNumber(value) {
    console.log('changed', value);
  }

  render() {

    return (
      <div style={{ background: '#ffffff', height: '100%' }}>
        <Tabs defaultActiveKey="1" onChange={this.med.bind(this)} style={{ padding: '24px' }}>
          <TabPane tab="报警规则" key="1">
            <div>
              <Select placeholder="CPU率" style={{ width: '20%' }} onChange={this.handleChange.bind(this)}>
                <Option value="0">xxx</Option>
                <Option value="1">yyy</Option>
              </Select>
              <Select placeholder="大于" style={{ width: '20%' }} onChange={this.handleChange.bind(this)}>
                <Option value="0">小于</Option>
                <Option value="1">等于</Option>
              </Select>
              <InputNumber min={0} max={100} defaultValue={90} onChange={this.changeNumber.bind(this)}/>
            </div>
            <div>
              <Select placeholder="逻辑操作" style={{ width: '20%' }} onChange={this.handleChange.bind(this)}>
                <Option value="0">&</Option>
                <Option value="1">||</Option>
              </Select>
            </div>
            <div>
              <Select placeholder="内存" style={{ width: '20%' }} onChange={this.handleChange.bind(this)}>
                <Option value="0">xxx</Option>
                <Option value="1">yyy</Option>
              </Select>
              <Select placeholder="大于" style={{ width: '20%' }} onChange={this.handleChange.bind(this)}>
                <Option value="0">小于</Option>
                <Option value="1">等于</Option>
              </Select>
              <InputNumber min={0} max={100} defaultValue={90} onChange={this.changeNumber.bind(this)}/>
            </div>
          </TabPane>
          <TabPane tab="管理操作" key="2">管理操作</TabPane>
          <TabPane tab="通知方式" key="3">通知方式</TabPane>
        </Tabs>
      </div>
    );
  }

}

export default Set;


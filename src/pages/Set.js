import React, { Component } from 'react';
import { Tabs, InputNumber, Button, Modal, Checkbox, Radio, Col, Row } from 'antd';
import styles from './Set.less';

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

class Set extends Component {
  state = {
    visible: false,
    cpuIsChecked: false,
    memIsChecked: false,
    cpuNum: 70,
    memNum: 60,
    cpuRule: '0',
    memRule: '0',
    rulesCount: 1,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.postRules();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  med(key) {
    console.log(key);
  }

  changeMachine(checkedValues) {
    this.setState({
      machines: checkedValues,
    });
  }

  changeCpuRule(e) {
    this.setState({ cpuRule: e.target.value });
  }

  changeMemRule(e) {
    this.setState({ memRule: e.target.value });
  }

  changeCpuNum(value) {
    this.setState({ cpuNum: value });
  }

  changeMemNum(value) {
    this.setState({ memNum: value });
  }

  togglecpuDisabled() {
    this.setState({
      cpuIsChecked: !this.state.cpuIsChecked,
    });
  }

  togglememIsChecked() {
    this.setState({
      memIsChecked: !this.state.memIsChecked,
    });
  }

  postRules() {
    const {
      machines,
      cpuIsChecked,
      memIsChecked,
      cpuRule,
      cpuNum,
      memRule,
      memNum,
      rulesCount,
    } = this.state;
    if (!machines) {
      console.log('请选择机器');
      return;
    }
    let rulesList = [];
    rulesList.push({ machines: machines });
    if (cpuIsChecked === false && memIsChecked === false) {
      console.log('请为机器选择一条约束');
      return;
    }

    if (cpuIsChecked) {
      let tmp = [0, cpuRule, cpuNum];
      rulesList.push({ cpuRules: tmp });
    }
    if (memIsChecked) {
      let tmp = [1, memRule, memNum];
      rulesList.push({ memRules: tmp });
    }
    console.log(rulesList);
    this.setState({ rulesCount: rulesCount + 1 });
  }

  renderRulesList() {
    const rulesCount = this.state.rulesCount;

    if (rulesCount > 0) {
      return (
        <div>
          <Row
            gutter={24}
            className={styles.rowDec}
            style={{ background: '#eeeeee', marginRight: 0, marginLeft: 0 }}
          >
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              机器
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              规则
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              操作
            </Col>
          </Row>
          <Row gutter={24} className={styles.rowDec} style={{ marginRight: 0, marginLeft: 0 }}>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              机器一
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              cpu>80%
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              删除
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    const options = [
      { label: '机器一', value: '1' },
      { label: '机器二', value: '2' },
      { label: '机器三', value: '3' },
    ];

    return (
      <div style={{ background: '#ffffff', height: '100%' }}>
        <Tabs defaultActiveKey="1" onChange={this.med} style={{ padding: '24px' }}>
          <TabPane tab="报警规则" key="1">
            <Button type="primary" onClick={this.showModal} style={{ marginBottom: 10 }}>
              添加
            </Button>
            {this.renderRulesList()}
            <Modal
              title="报警规则"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <CheckboxGroup
                options={options}
                onChange={this.changeMachine.bind(this)}
                style={{ marginBottom: 10 }}
              />
              <br />

              <Checkbox onChange={this.togglecpuDisabled.bind(this)}>CPU使用率</Checkbox>
              <RadioGroup
                onChange={this.changeCpuRule.bind(this)}
                defaultValue="0"
                disabled={!this.state.cpuIsChecked}
                style={{ margin: '0 20px' }}
              >
                <Radio value="0">大于</Radio>
                <Radio value="1">等于</Radio>
                <Radio value="2">小于</Radio>
              </RadioGroup>
              <InputNumber
                min={1}
                max={100}
                defaultValue={70}
                onChange={this.changeCpuNum.bind(this)}
                size={'small'}
                disabled={!this.state.cpuIsChecked}
              />
              <br />

              <Checkbox onChange={this.togglememIsChecked.bind(this)} style={{ marginRight: 1 }}>
                内存使用率
              </Checkbox>
              <RadioGroup
                onChange={this.changeMemRule.bind(this)}
                defaultValue="0"
                disabled={!this.state.memIsChecked}
                style={{ margin: '5px 20px' }}
              >
                <Radio value="0">大于</Radio>
                <Radio value="1">等于</Radio>
                <Radio value="2">小于</Radio>
              </RadioGroup>
              <InputNumber
                min={1}
                max={100}
                defaultValue={60}
                onChange={this.changeMemNum.bind(this)}
                size={'small'}
                disabled={!this.state.memIsChecked}
              />
              <br />
            </Modal>
          </TabPane>
          <TabPane tab="管理操作" key="2">
            管理操作
          </TabPane>
          <TabPane tab="通知方式" key="3">
            通知方式
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Set;

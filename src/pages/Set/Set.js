import React, { Component } from 'react';
import { Tabs, InputNumber, Button, Modal, Checkbox, Radio, Col, Row, Select } from 'antd';
import styles from './Set.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const postRulesUrl = 'http://127.0.0.1:8081/postRules';
const getRulesListUrl = 'http://127.0.0.1:8081/getRulesList';
const deleteRuleUrl = 'http://127.0.0.1:8081/deleteRule';
const getMachineListUrl = 'http://127.0.0.1:8081/getMachineList';

class Set extends Component {
  state = {
    modalVisible: false,
    noticeVisible: false,
    cpuIsChecked: false,
    memIsChecked: false,
    cpuNum: 70,
    memNum: 60,
    cpuRule: '>',
    memRule: '>',
    notices: [
      { id: 1, time: '任何时间', level: '紧急', way: '邮件通知' },
      { id: 2, time: '任何时间', level: '任何告警', way: '邮件通知' },
    ],
    machineList: [{ id: '0', ip_address: '0.0.0.0' }],
    rules: [],
  };

  componentDidMount() {
    this.getRulesList();
    this.getMachineList();
  }

  getRulesList() {
    let _this = this;
    fetch(getRulesListUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log('getRulesList');
        console.log(res);
        _this.setState({ rules: res });
      });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      modalVisible: false,
    });
    this.postRules();
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  showNoticeModal = () => {
    this.setState({
      noticeVisible: true,
    });
  };
  addNotices = () => {
    this.setState({
      noticeVisible: false,
    });
  };
  cancelAddNotice = () => {
    this.setState({
      noticeVisible: false,
    });
  };

  med(key) {
    console.log(key);
  }

  chooseMachine(value) {
    this.setState({
      machine: Number(value),
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

  togglecpuIsChecked() {
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
    const _this = this;
    const { machine, cpuIsChecked, memIsChecked, cpuRule, cpuNum, memRule, memNum } = this.state;
    let rules = [];
    if (cpuIsChecked) {
      rules.push({ typ: 'cpu', op: cpuRule, value: cpuNum });
    }
    if (memIsChecked) {
      rules.push({ typ: 'mem', op: memRule, value: memNum });
    }
    fetch(postRulesUrl, {
      method: 'POST',
      body: JSON.stringify({
        id: machine,
        rules: rules,
      }),
    }).then(() => {
      _this.getRulesList();
    });
  }

  deleteRule(item) {
    let _this = this;
    fetch(deleteRuleUrl, {
      method: 'POST',
      body: item.rule_id,
    })
      .then(res => res.text())
      .then(res => {
        console.log(res);
        console.log('deleteRule getRulesList');
        _this.getRulesList();
      });
  }

  getMachineList() {
    let _this = this;
    fetch(getMachineListUrl, {
      method: 'GET',
    })
      .then(res => res.text())
      .then(res => {
        let a = JSON.parse(res);
        console.log(a);
        _this.setState({ machineList: a });
      });
  }

  renderRulesList(rules) {
    if (rules.length > 0) {
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
          {rules.map(item => {
            return (
              <Row
                gutter={24}
                className={styles.rowDec}
                style={{ marginRight: 0, marginLeft: 0 }}
                key={item.rule_id}
              >
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.machine_id}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.rule}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  <a onClick={this.deleteRule.bind(this, item)}>删除</a>
                </Col>
              </Row>
            );
          })}
        </div>
      );
    }
    if (rules.length === 0) {
      return <div>暂无报警规则</div>;
    }
  }

  renderNotice(notices) {
    if (notices.length === 0) {
      return <div>暂无通知策略</div>;
    }
    if (notices.length > 0) {
      return (
        <div>
          <Row
            gutter={24}
            className={styles.rowDec}
            style={{ background: '#eeeeee', marginRight: 0, marginLeft: 0 }}
          >
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              时间
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              告警级别
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              通知方式
            </Col>
          </Row>
          {notices.map(item => {
            return (
              <Row
                gutter={24}
                className={styles.rowDec}
                style={{ marginRight: 0, marginLeft: 0 }}
                key={item.id}
              >
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.time}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.level}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.way}
                </Col>
              </Row>
            );
          })}
        </div>
      );
    }
  }

  render() {
    const { rules, notices, machineList } = this.state;
    return (
      <div className={styles.container} style={{ background: '#ffffff', height: '100%' }}>
        <Tabs defaultActiveKey="1" onChange={this.med} style={{ padding: '24px' }}>
          <TabPane tab="报警规则" key="1">
            <Button type="primary" onClick={this.showModal} style={{ marginBottom: 10 }}>
              添加
            </Button>
            {this.renderRulesList(rules)}
            <Modal
              title="报警规则"
              visible={this.state.modalVisible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Select
                placeholder="请选择机器"
                style={{ width: 120, marginBottom: 10 }}
                size={'small'}
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

              <br />

              <Checkbox onChange={this.togglecpuIsChecked.bind(this)}>CPU使用率</Checkbox>
              <RadioGroup
                onChange={this.changeCpuRule.bind(this)}
                defaultValue="&gt;"
                disabled={!this.state.cpuIsChecked}
                style={{ margin: '0 20px' }}
              >
                <Radio value=">">&gt;</Radio>
                <Radio value="=">=</Radio>
                <Radio value="<">&lt;</Radio>
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
                defaultValue="&gt;"
                disabled={!this.state.memIsChecked}
                style={{ margin: '5px 20px' }}
              >
                <Radio value=">">&gt;</Radio>
                <Radio value="=">=</Radio>
                <Radio value="<">&lt;</Radio>
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

          <TabPane tab="通知策略" key="2">
            <Button type="primary" onClick={this.showNoticeModal} style={{ marginBottom: 10 }}>
              添加
            </Button>
            {this.renderNotice(notices)}

            <Modal
              title="通知策略"
              visible={this.state.noticeVisible}
              onOk={this.addNotices}
              onCancel={this.cancelAddNotice}
            >
              <Select defaultValue="anytime" style={{ width: 120, marginRight: 10 }}>
                <Option value="anytime">任何时间</Option>
                <Option value="workTime">工作时间</Option>
              </Select>
              <Select defaultValue="anyAlarm" style={{ width: 120, marginRight: 10 }}>
                <Option value="anyAlarm">任何告警</Option>
                <Option value="urgent">紧急级别</Option>
                <Option value="warning">警告级别</Option>
              </Select>
              <Select defaultValue="email" style={{ width: 120 }}>
                <Option value="email">邮件通知</Option>
                <Option value="message">短信通知</Option>
              </Select>
            </Modal>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Set;

import React, { Component } from 'react';
import { Tabs, InputNumber, Button, Modal, Checkbox, Radio, Col, Row, Select, Input } from 'antd';
import styles from './Set.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import httpConfig from '../../httpConfig';

const postRulesUrl = httpConfig.host + '/postRules';
const getRulesListUrl = httpConfig.host + '/getRulesList';
const deleteRuleUrl = httpConfig.host + '/deleteRule';
const getMachineListUrl = httpConfig.host + '/getMachineList';
const postEmailReceiver = httpConfig.host + '/postEmailReceiver';
const getNoticeListUrl = httpConfig.host + '/getNoticeList';
const deleteEmailReceiveUrl = httpConfig.host + '/deleteEmailReceive';

class Set extends Component {
  state = {
    modalVisible: false,
    noticeVisible: false,
    cpuIsChecked: false,
    memIsChecked: false,
    loadavgIsChecked: false,
    tableLocksIsChecked: false,
    cacheHitIsChecked: false,
    cpuNum: 70,
    memNum: 70,
    loadavgNum: 70,
    tableLocksNum: 70,
    cacheHitNum: 30,
    cpuRule: '>',
    memRule: '>',
    loadavgRule: '>',
    tableLocksRule: '>',
    cacheHitRule: '>',
    cpuLevel: 'normal',
    memLevel: 'normal',
    loadavgLevel: 'normal',
    tableLocksLevel: 'normal',
    cacheHitLevel: 'normal',
    noticeList: [
      { id: 1, level: '紧急', email_receiver: 'xxx@outlook.com' },
      { id: 2, level: '普通', email_receiver: 'yyyy@qq.com' },
    ],
    machineList: [{ id: '0', ip_address: '0.0.0.0' }],
    rules: [],
    emailReceiver: '',
    alarmLevel: 'urgent',
  };

  componentDidMount() {
    this.getRulesList();
    this.getMachineList();
    this.getNoticeList();
  }

  getRulesList() {
    let _this = this;
    fetch(getRulesListUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
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
    const emailReceiver = this.state.emailReceiver;
    const alarmLevel = this.state.alarmLevel;
    this.setState({
      noticeVisible: false,
    });
    const _this = this;
    fetch(postEmailReceiver, {
      method: 'POST',
      body: JSON.stringify({ alarmLevel: alarmLevel, emailReceiver: emailReceiver }),
    }).then(() => {
      _this.getNoticeList();
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

  changeLoadavgRule(e) {
    this.setState({ loadavgRule: e.target.value });
  }

  changeTableLocksRule(e) {
    this.setState({ tableLocksRule: e.target.value });
  }

  changecacheHitRule(e) {
    this.setState({ cacheHitRule: e.target.value });
  }

  changeCpuNum(value) {
    this.setState({ cpuNum: value });
  }

  changeMemNum(value) {
    this.setState({ memNum: value });
  }

  changeTableLocksNum(value) {
    this.setState({ tableLocksNum: value });
  }

  changeLoadavgNum(value) {
    this.setState({ loadavgNum: value });
  }

  changecacheHitNum(value) {
    this.setState({ cacheHitNum: value });
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

  toggleLoadavgIsChecked() {
    this.setState({
      loadavgIsChecked: !this.state.loadavgIsChecked,
    });
  }

  toggleTableLocksIsChecked() {
    this.setState({
      tableLocksIsChecked: !this.state.tableLocksIsChecked,
    });
  }

  togglecacheHitIsChecked() {
    this.setState({
      cacheHitIsChecked: !this.state.cacheHitIsChecked,
    });
  }

  cpuLevel(value) {
    this.setState({ cpuLevel: value });
  }

  memLevel(value) {
    this.setState({ memLevel: value });
  }

  loadavgLevel(value) {
    this.setState({ loadavgLevel: value });
  }

  tableLocksLevel(value) {
    this.setState({ tableLocksLevel: value });
  }

  cacheHitLevel(value) {
    this.setState({ cacheHitLevel: value });
  }

  postRules() {
    const _this = this;
    const {
      machine,
      cpuIsChecked,
      memIsChecked,
      loadavgIsChecked,
      cacheHitIsChecked,
      tableLocksIsChecked,
      cpuRule,
      memRule,
      loadavgRule,
      cacheHitRule,
      tableLocksRule,
      cpuNum,
      memNum,
      loadavgNum,
      cacheHitNum,
      tableLocksNum,
      cpuLevel,
      memLevel,
      loadavgLevel,
      cacheHitLevel,
      tableLocksLevel,
    } = this.state;
    let rules = [];
    let levels = [];
    let ruleTypes = [];
    if (cpuIsChecked) {
      levels.push(cpuLevel);
      rules.push({ typ: 'cpu', op: cpuRule, value: cpuNum });
      ruleTypes.push(0);
    }
    if (memIsChecked) {
      levels.push(memLevel);
      rules.push({ typ: 'mem', op: memRule, value: memNum });
      ruleTypes.push(0);
    }
    if (loadavgIsChecked) {
      levels.push(loadavgLevel);
      rules.push({ typ: 'loadavg', op: loadavgRule, value: loadavgNum });
      ruleTypes.push(0);
    }
    if (tableLocksIsChecked) {
      levels.push(tableLocksLevel);
      rules.push({ typ: 'tableLocks', op: tableLocksRule, value: tableLocksNum });
      ruleTypes.push(1);
    }
    if (cacheHitIsChecked) {
      levels.push(cacheHitLevel);
      rules.push({ typ: 'cacheHit', op: cacheHitRule, value: cacheHitNum });
      ruleTypes.push(1);
    }
    fetch(postRulesUrl, {
      method: 'POST',
      body: JSON.stringify({
        id: machine,
        levels: levels,
        rules: rules,
        ruleTypes: ruleTypes,
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
    }).then(() => {
      _this.getRulesList();
    });
  }

  deleteEmailReceive(item) {
    let _this = this;
    fetch(deleteEmailReceiveUrl, {
      method: 'POST',
      body: item.id,
    }).then(() => {
      _this.getNoticeList();
    });
  }

  getNoticeList() {
    let _this = this;
    fetch(getNoticeListUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].level = this.formatLevel(res[i].level);
        }
        _this.setState({ noticeList: res });
      });
  }

  formatLevel(str) {
    switch (str) {
      case 'urgent':
        return '紧急';
      case 'normal':
        return '普通';
    }
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

  changeAlarmLevel(value) {
    this.setState({ alarmLevel: value });
  }

  emailReceiver(e) {
    this.setState({ emailReceiver: e.target.value });
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
                  {item.ip}
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

  renderNotice(noticeList) {
    if (noticeList.length === 0) {
      return <div>暂无通知策略</div>;
    }
    if (noticeList.length > 0) {
      return (
        <div>
          <Row
            gutter={24}
            className={styles.rowDec}
            style={{ background: '#eeeeee', marginRight: 0, marginLeft: 0 }}
          >
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              告警级别
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              邮件通知人
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              操作
            </Col>
          </Row>
          {noticeList.map(item => {
            return (
              <Row
                gutter={24}
                className={styles.rowDec}
                style={{ marginRight: 0, marginLeft: 0 }}
                key={item.id}
              >
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.level}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.email_receiver}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  <a onClick={this.deleteEmailReceive.bind(this, item)}>删除</a>
                </Col>
              </Row>
            );
          })}
        </div>
      );
    }
  }

  render() {
    const { rules, noticeList, machineList } = this.state;
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
              width={700}
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
              <Row gutter={24}>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Checkbox onChange={this.togglecpuIsChecked.bind(this)}>CPU使用率</Checkbox>
                </Col>
                <Col
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <RadioGroup
                    onChange={this.changeCpuRule.bind(this)}
                    defaultValue="&gt;"
                    disabled={!this.state.cpuIsChecked}
                  >
                    <Radio value=">">&gt;</Radio>
                    <Radio value="=">=</Radio>
                    <Radio value="<">&lt;</Radio>
                  </RadioGroup>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={70}
                    onChange={this.changeCpuNum.bind(this)}
                    size={'small'}
                    disabled={!this.state.cpuIsChecked}
                  />
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Select
                    placeholder="告警级别"
                    style={{ width: 80, marginBottom: 10, marginLeft: 10 }}
                    size={'small'}
                    onChange={this.cpuLevel.bind(this)}
                    disabled={!this.state.cpuIsChecked}
                  >
                    <Option value="urgent">紧急</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Checkbox onChange={this.togglememIsChecked.bind(this)}>内存使用率</Checkbox>
                </Col>
                <Col
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <RadioGroup
                    onChange={this.changeMemRule.bind(this)}
                    defaultValue="&gt;"
                    disabled={!this.state.memIsChecked}
                  >
                    <Radio value=">">&gt;</Radio>
                    <Radio value="=">=</Radio>
                    <Radio value="<">&lt;</Radio>
                  </RadioGroup>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <InputNumber
                    min={1}
                    max={100}
                    defaultValue={70}
                    onChange={this.changeMemNum.bind(this)}
                    size={'small'}
                    disabled={!this.state.memIsChecked}
                  />
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Select
                    placeholder="告警级别"
                    style={{ width: 80, marginBottom: 10, marginLeft: 10 }}
                    size={'small'}
                    onChange={this.memLevel.bind(this)}
                    disabled={!this.state.memIsChecked}
                  >
                    <Option value="urgent">紧急</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Checkbox onChange={this.toggleLoadavgIsChecked.bind(this)}>服务器负载</Checkbox>
                </Col>
                <Col
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <RadioGroup
                    onChange={this.changeLoadavgRule.bind(this)}
                    defaultValue="&gt;"
                    disabled={!this.state.loadavgIsChecked}
                  >
                    <Radio value=">">&gt;</Radio>
                    <Radio value="=">=</Radio>
                    <Radio value="<">&lt;</Radio>
                  </RadioGroup>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <InputNumber
                    min={1}
                    max={200}
                    defaultValue={70}
                    onChange={this.changeLoadavgNum.bind(this)}
                    size={'small'}
                    disabled={!this.state.loadavgIsChecked}
                  />
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Select
                    placeholder="告警级别"
                    style={{ width: 80, marginBottom: 10, marginLeft: 10 }}
                    size={'small'}
                    onChange={this.loadavgLevel.bind(this)}
                    disabled={!this.state.loadavgIsChecked}
                  >
                    <Option value="urgent">紧急</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Checkbox onChange={this.toggleTableLocksIsChecked.bind(this)}>
                    数据库锁阻塞率
                  </Checkbox>
                </Col>
                <Col
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <RadioGroup
                    onChange={this.changeTableLocksRule.bind(this)}
                    defaultValue="&gt;"
                    disabled={!this.state.tableLocksIsChecked}
                  >
                    <Radio value=">">&gt;</Radio>
                    <Radio value="=">=</Radio>
                    <Radio value="<">&lt;</Radio>
                  </RadioGroup>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={70}
                    onChange={this.changeTableLocksNum.bind(this)}
                    size={'small'}
                    disabled={!this.state.tableLocksIsChecked}
                  />
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Select
                    placeholder="告警级别"
                    style={{ width: 80, marginBottom: 10, marginLeft: 10 }}
                    size={'small'}
                    onChange={this.tableLocksLevel.bind(this)}
                    disabled={!this.state.tableLocksIsChecked}
                  >
                    <Option value="urgent">紧急</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Checkbox onChange={this.togglecacheHitIsChecked.bind(this)}>
                    数据库缓存命中率
                  </Checkbox>
                </Col>
                <Col
                  xl={6}
                  lg={24}
                  md={24}
                  sm={24}
                  xs={24}
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                >
                  <RadioGroup
                    onChange={this.changecacheHitRule.bind(this)}
                    defaultValue="&gt;"
                    disabled={!this.state.cacheHitIsChecked}
                  >
                    <Radio value=">">&gt;</Radio>
                    <Radio value="=">=</Radio>
                    <Radio value="<">&lt;</Radio>
                  </RadioGroup>
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <InputNumber
                    min={0}
                    max={100}
                    defaultValue={30}
                    onChange={this.changecacheHitNum.bind(this)}
                    size={'small'}
                    disabled={!this.state.cacheHitIsChecked}
                  />
                </Col>
                <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                  <Select
                    placeholder="告警级别"
                    style={{ width: 80, marginBottom: 10, marginLeft: 10 }}
                    size={'small'}
                    onChange={this.cacheHitLevel.bind(this)}
                    disabled={!this.state.cacheHitIsChecked}
                  >
                    <Option value="urgent">紧急</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </Col>
              </Row>
            </Modal>
          </TabPane>

          <TabPane tab="通知策略" key="2">
            <Button type="primary" onClick={this.showNoticeModal} style={{ marginBottom: 10 }}>
              添加
            </Button>
            {this.renderNotice(noticeList)}

            <Modal
              title="通知策略"
              visible={this.state.noticeVisible}
              onOk={this.addNotices}
              onCancel={this.cancelAddNotice}
            >
              <Select
                placeholder="告警级别"
                onChange={this.changeAlarmLevel.bind(this)}
                style={{ width: 120, marginRight: 10 }}
              >
                <Option value="urgent">紧急</Option>
                <Option value="normal">普通</Option>
              </Select>
              <Input
                placeholder="邮件接收者"
                onChange={this.emailReceiver.bind(this)}
                style={{ width: '200px' }}
              />
            </Modal>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Set;

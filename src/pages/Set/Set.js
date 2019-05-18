import React, { Component } from 'react';
import { Tabs, InputNumber, Button, Modal, Checkbox, Radio, Col, Row, Select } from 'antd';
import styles from './Set.less';

const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const postRulesUrl = 'http://127.0.0.1:8081/postRules';
const getRulesListUrl = 'http://127.0.0.1:8081/getRulesList';
const deletRuleUrl = 'http://127.0.0.1:8081/deletRule';

class Set extends Component {
  state = {
    visible: false,
    noticeVisible: false,
    cpuIsChecked: false,
    memIsChecked: false,
    machine: 1,
    cpuNum: 70,
    memNum: 60,
    cpuRule: '0',
    cpuRuleName: '>',
    memRule: '0',
    memRuleName: '>',
    mockId: -100,
    rules: [{ ruleId: -1, rulesListNames: ['机器一', ['cpu使用率', '>', 70]] }],
    notices: [{ id: 1, time: '任何时间', level: '紧急', way: '邮件通知' }],
  };

  componentDidMount() {
    this.getRulesList();
  }

  getRulesList() {
    let _this = this;
    fetch(getRulesListUrl, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        let ch = [];
        let machineName = '';
        for (let i = 0; i < res.length; i++) {
          const machineId = res[i].machine_id;
          if (machineId === 1) {
            machineName = '机器一';
          }
          if (machineId === 2) {
            machineName = '机器二';
          }
          if (machineId === 3) {
            machineName = '机器三';
          }
          let r = JSON.parse(res[i].rule);
          let rules = [];
          let rulesListNames = [];
          rulesListNames.push(machineName);
          for (let j = 0; j < r.length; j++) {
            let rr = r[j];
            if (rr[0] === 0) {
              rules.push('cpu使用率');
              if (rr[1] === 0) {
                rules.push('>');
              } else if (rr[1] === 1) {
                rules.push('=');
              } else if (rr[1] === 2) {
                rules.push('<');
              }
            }
            if (rr[0] === 1) {
              rules.push('内存使用率');
              if (rr[1] === 0) {
                rules.push('>');
              } else if (rr[1] === 1) {
                rules.push('=');
              } else if (rr[1] === 2) {
                rules.push('<');
              }
            }
            rules.push(rr[2]);
            rulesListNames.push(rules);
            rules = [];
          }

          ch.push({ ruleId: res[i].rule_id, rulesListNames: rulesListNames });
        }
        _this.setState({ rules: ch });
      });
  }

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
    this.setState({ cpuRule: e.target.value, cpuRuleName: e.target.data_rule });
  }

  changeMemRule(e) {
    this.setState({ memRule: e.target.value, memRuleName: e.target.data_rule });
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
    const {
      machine,
      cpuIsChecked,
      memIsChecked,
      cpuRule,
      cpuRuleName,
      cpuNum,
      memRule,
      memRuleName,
      memNum,
      rules,
      mockId,
    } = this.state;

    const rulesList = [];
    const rulesListNames = [];
    let machineName = '';

    if (machine === 1) {
      machineName = '机器一';
    }
    if (machine === 2) {
      machineName = '机器二';
    }
    if (machine === 3) {
      machineName = '机器三';
    }
    rulesList.push(machine);
    rulesListNames.push(machineName);
    if (cpuIsChecked === false && memIsChecked === false) {
      console.log('请为机器选择一条约束');
      return;
    }

    if (cpuIsChecked) {
      rulesList.push([0, Number(cpuRule), cpuNum]);
      rulesListNames.push(['cpu使用率', cpuRuleName, cpuNum]);
    }
    if (memIsChecked) {
      rulesList.push([1, Number(memRule), memNum]);
      rulesListNames.push(['内存使用率', memRuleName, memNum]);
    }
    this.setState({ rules: rules.concat({ ruleId: mockId + 1, rulesListNames: rulesListNames }) });
    this.setState({ mockId: mockId + 1 });
    fetch(postRulesUrl, {
      method: 'POST',
      body: JSON.stringify(rulesList),
    }).then(res => res.text());
  }

  deleteRule(item) {
    let _this = this;
    fetch(deletRuleUrl, {
      method: 'POST',
      body: item.id,
    })
      .then(res => res.text())
      .then(res => {
        console.log(res);
        _this.getRulesList();
        const { rules } = _this.state;
        _this.renderRulesList(rules);
      });
  }

  renderRulesList(rules) {
    console.log('rules');
    console.log(rules);
    let children = [];
    if (rules.length > 0) {
      for (let i = 0; i < rules.length; i += 1) {
        const r = rules[i].rulesListNames;
        const rId = rules[i].ruleId;
        let ruleL = [];
        for (let k = 1; k < r.length; k += 1) {
          let rule = r[k];
          let str = rule[0] + ' ' + rule[1] + ' ' + rule[2] + ' ; ';
          ruleL.push(str);
        }
        const obj = { id: rId, name: r[0], rule: ruleL };
        children.push(obj);
      }
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
          {children.map(item => {
            return (
              <Row
                gutter={24}
                className={styles.rowDec}
                style={{ marginRight: 0, marginLeft: 0 }}
                key={item.id}
              >
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.name}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  {item.rule.map(itm => {
                    return itm;
                  })}
                </Col>
                <Col xl={8} lg={24} md={24} sm={24} xs={24}>
                  <a onClick={this.deleteRule.bind(this, item)}>详情</a>
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
    const { rules, notices } = this.state;
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
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Select
                defaultValue="1"
                style={{ width: 80, marginBottom: 10 }}
                size={'small'}
                onChange={this.chooseMachine.bind(this)}
              >
                <Option value="1">机器一</Option>
                <Option value="2">机器二</Option>
              </Select>

              <br />

              <Checkbox onChange={this.togglecpuIsChecked.bind(this)}>CPU使用率</Checkbox>
              <RadioGroup
                onChange={this.changeCpuRule.bind(this)}
                defaultValue="0"
                disabled={!this.state.cpuIsChecked}
                style={{ margin: '0 20px' }}
              >
                <Radio value="0" data_rule=">">
                  大于
                </Radio>
                <Radio value="1" data_rule="=">
                  等于
                </Radio>
                <Radio value="2" data_rule="<">
                  小于
                </Radio>
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
                <Radio value="0" data_rule=">">
                  大于
                </Radio>
                <Radio value="1" data_rule="=">
                  等于
                </Radio>
                <Radio value="2" data_rule="<">
                  小于
                </Radio>
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

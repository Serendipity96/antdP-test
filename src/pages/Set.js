import React, { Component } from 'react';
import { Tabs, InputNumber, Button, Modal, Checkbox, Radio, Col, Row } from 'antd';
import styles from './Set.less';

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const postRulesUrl = 'http://127.0.0.1:8081/postRules';

class Set extends Component {
  state = {
    visible: false,
    cpuIsChecked: false,
    memIsChecked: false,
    cpuNum: 70,
    memNum: 60,
    cpuRule: '0',
    cpuRuleName: '>',
    memRule: '0',
    memRuleName: '>',
    rules: [],
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
      machines,
      cpuIsChecked,
      memIsChecked,
      cpuRule,
      cpuRuleName,
      cpuNum,
      memRule,
      memRuleName,
      memNum,
      rules,
    } = this.state;
    if (!machines) {
      console.log('请选择机器');
      return;
    }
    const rulesList = [];
    const rulesListNames = [];
    const machineInt = [];
    const machineNames = [];

    for (let i = 0; i < machines.length; i += 1) {
      if (machines[i] === '1') {
        machineInt.push(1);
        machineNames.push('机器一');
      }
      if (machines[i] === '2') {
        machineInt.push(2);
        machineNames.push('机器二');
      }
      if (machines[i] === '3') {
        machineInt.push(3);
        machineNames.push('机器三');
      }
    }
    rulesList.push(machineInt);
    rulesListNames.push(machineNames);
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
    this.setState({ rules: rules.concat({ rulesListNames }) });
    console.log(rulesList);
    console.log(rulesListNames);
    fetch(postRulesUrl, {
      method: 'POST',
      body: JSON.stringify(rulesList),
    }).then(res => res.text());
  }

  renderRulesList(rules) {
    let children = [];
    if (rules.length > 0) {
      for (let i = 0; i < rules.length; i += 1) {
        const r = rules[i].rulesListNames;
        const nameTmp = r[0];
        let nameStr = '';
        for (let j = 0; j < nameTmp.length; j += 1) {
          nameStr += nameTmp[j] + ' ';
        }
        let ruleL = [];
        for (let k = 1; k < r.length; k += 1) {
          let rule = r[k];
          let str = rule[0] + ' ' + rule[1] + ' ' + rule[2] + ' ; ';
          ruleL.push(str);
        }
        const obj = { name: nameStr, rule: ruleL };
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
          {children.map((item, index) => {
            return (
              <Row
                gutter={24}
                className={styles.rowDec}
                style={{ marginRight: 0, marginLeft: 0 }}
                key={index}
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
                  <a>删除</a>
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

  render() {
    const options = [
      { label: '机器一', value: '1' },
      { label: '机器二', value: '2' },
      { label: '机器三', value: '3' },
    ];
    const { rules } = this.state;
    return (
      <div style={{ background: '#ffffff', height: '100%' }}>
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
              <CheckboxGroup
                options={options}
                onChange={this.changeMachine.bind(this)}
                style={{ marginBottom: 10 }}
              />
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

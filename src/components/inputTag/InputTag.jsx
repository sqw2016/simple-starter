import React from 'react';
import { Text, Picker } from 'antd-mobile';

import rightBraces from '../../assets/more@2x.png';
import styles from './InputTag.less';

export default class InputTag extends React.Component {
  render () {
    const {
      children,
      onChange,
      value,
      placeholder,
      className,
      type,
      onClick,
      label,
      mainStyle,
      valueShow,
      disabled,
      pickerData,
      pickerTitle,
      noBorder,
    } = this.props;
    const leftLabel = <Text className={styles.order_input_label}>{label}</Text>;
    let rightItem;
    let showItem = [];
    const borderStyle = noBorder ? {} : {borderBottom: '1px solid #E6E6E6'};
    switch (type) {
      case 'text': // 输入框
        rightItem = (
          <input
            onChange={onChange}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={`${styles.order_input_text} ${className}`}
            type="text"
          />
        );
      showItem = [leftLabel, rightItem];
        break;
      case 'picker': // picker控件
        rightItem = (
          <Picker
            title={pickerTitle}
            extra={value ? value : placeholder}
            cols={1}
            value={value}
            onOk={onChange}
            data={pickerData}
          >
            <Text onClick={onClick} className={`${styles.order_input_select} ${className}`}>
              {valueShow ? valueShow : placeholder}
              &nbsp;&nbsp;
              <img src={rightBraces} style={{width: 5, height: 10}} alt="" />
            </Text>
          </Picker>

        );
        showItem = [rightItem, leftLabel];
        break;
      case 'select': // 选择控件
        rightItem = (
          <Text onClick={onClick} className={`${styles.order_input_select} ${className}`}>
            {value ? value : placeholder}
            &nbsp;&nbsp;
            <img src={rightBraces} style={{width: 5, height: 10}} alt="" />
          </Text>
        );
        showItem = [leftLabel, rightItem];
        break;
      default:
        rightItem = (
          <Text className={`${styles.order_input_select} ${className}`}>
            {value ? value : placeholder}
          </Text>
        );
        showItem = [leftLabel, rightItem];
        break;
    }
    return (
      <div style={borderStyle} className={styles.order_input_main}>
        <div style={mainStyle} className={styles.order_input_container}>
          {showItem}
        </div>
        {children}
      </div>
    )
  }
}

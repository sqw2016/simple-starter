import React from 'react';
import {
  Text
} from 'antd-mobile';
import styles from './editableSelect.less';

export default class EditSelect extends React.Component{
  state = {
    selectShow: false,
    height: 20,
    value: '',
    label: '',
  };
  show = () => {
    const _ = this;
    this.setState({
      selectShow: true,
    });
    const len = this.props.dataSource ? this.props.dataSource.length : 0;
    let height = 0.62;
    if (len > 1 && len < 5) {
      height = 0.62*len;
    } else if (len > 5) {
      height = 3
    }
    setTimeout(() => {
      _.refs.selectDom.style.height = `${height}rem`;
      _.refs.selectDom.style.opacity = 1;
    }, 0);
  };
  onFocus = () => {
    this.show();
    this.props.onFocus && this.props.onFocus();
  };
  hide = () => {
    const _ = this;
    this.refs.selectDom.style.height = '0.4rem';
    _.refs.selectDom.style.opacity = 0.1;
    setTimeout(() => {
      _.setState({
        selectShow: false,
      });
    }, 200);
  };
  onBlur = () => {
    this.hide();
    this.props.onBlur && this.props.onBlur();
  };
  onChange = (e) => {
    const { onChange } = this.props;
    this.setState({
      value: '',
      label: e.target.value,
    });
    onChange && onChange(e.target.value);
  };
  onSelect = (item) => {
    const {
      labelIndex, // key对应的字段
      valueIndex,
      onSelect,
    } = this.props;
    this.setState({
      value: item[valueIndex],
      label: item[labelIndex]
    });
    onSelect && onSelect(item);
  };
  render() {
    const {
      label,
      noBorder,
      mainStyle,
      disabled,
      className,
      value,
      placeholder,
      showDirection, // 显示方向，up 向上， down 向下
      labelIndex, // key对应的字段
      valueIndex, // 值对应的字段
    } = this.props;
    let {
      searchable, // 是否可搜索
      dataSource, // 数据源
    } = this.props;
    searchable = (searchable === undefined) || searchable;
    const len = dataSource ? dataSource.length : 0;
    let height = 0.62;
    if (len > 1 && len < 5) {
      height = 0.62*len;
    } else if (len >= 5) {
      height = 3
    }
    const borderStyle = noBorder ? {} : {borderBottom: '1px solid #E6E6E6'};
    const selectContainerStyle = {
      top: showDirection === 'up' ? `-${height - 0.2}rem` : '0.8rem',
      height: this.state.height,
    };
    const sv = value ? ((typeof value === 'object') ? value[labelIndex] : value) : this.state.label;
    if (searchable && dataSource.length && !this.state.value) {
      dataSource = dataSource.filter((item) => {
        return item[labelIndex].indexOf(this.state.label) > -1;
      });
    }
    return (
      <div style={borderStyle} className={styles.order_input_main}>
        <div style={mainStyle} className={styles.order_input_container}>
          <Text className={styles.order_input_label}>{label}</Text>
          <input
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={sv}
            disabled={disabled}
            placeholder={placeholder}
            className={`${styles.order_input_text} ${className}`}
            type="text"
          />
          <div ref="selectDom" style={{display: this.state.selectShow ? 'block' : 'none', ...selectContainerStyle}} className={styles.select_component}>
            <ul className={styles.select_detail_container}>
              {
                (() => {
                  if(dataSource) {
                    return dataSource.map((item) => {
                      const activeClass = item[valueIndex] === this.state.value ? styles.select_detail_active : styles.select_detail;
                      return <li key={item[valueIndex]} onClick={this.onSelect.bind(null, item)} className={activeClass}>{item[labelIndex]}</li>
                    })
                  }
                })()
              }
              {
                dataSource && dataSource.length ? '' : (<li className={styles.select_detail}>没有找到数据</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import styles from './errorBox.less';

class ErrorBox extends React.Component{
  constructor(props) {
    super(props);
    const {error} = props;
    this.state = {
      show: error ? error.show : false,
      errorMsg: error ? error.errorMsg : ''
    };
    this.hideErrorBox = this.hideErrorBox.bind(this);
  }
  hideErrorBox(callback) {
    const me = this;
    window.setTimeout(() => {
      me.setState({show: false, errorMsg: ''});
      callback('');
    }, 1000);
  }
  componentWillReceiveProps(props) {
    const {show, errorMsg, showErrorMsg} = props;
    this.setState({show, errorMsg});
    if (show) {
      this.hideErrorBox(showErrorMsg);
    }
  }
  render() {
    const {show, errorMsg} = this.state;
    return (
      <div style={{display: show ? 'block' : 'none'}} className={styles.errorBox_container}>
        {errorMsg}
      </div>
    );
  }
}

export default ErrorBox;

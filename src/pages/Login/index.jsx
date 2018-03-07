import {
  connect
} from 'dva';
import React from 'react';
import Login from './view.jsx';

function LoginContainer({dispatch, loginPage}) {

  function sendCode() {
    const code = `${Math.floor((Math.random() * 9) + 1)}${Math.floor((Math.random() * 9) + 1)}${Math.floor((Math.random() * 9) + 1)}${Math.floor((Math.random() * 9) + 1)}`;
    dispatch({
      type: 'login/sendCode',
      payload: code
    });
  }

  function submit({phone}) {
    dispatch({
      type: 'login/submit',
      payload: {phone}
    });
  }



  return (<Login loginPage={loginPage}
                 sendCode={sendCode}
                 submit={submit}
                 dispatch={dispatch}

    />
  );
}

function mapStateToProps(state) {
  const {loginPage} = state;
  console.log(loginPage);
  return {loginPage};
}

export default connect(mapStateToProps)(LoginContainer);


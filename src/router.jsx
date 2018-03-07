import React from 'react';
import PropTypes from 'prop-types';
import {
  Router, Switch, Route
} from 'dva/router';
import Dynamic from 'dva/dynamic';

function RouterConfig({
  history, app
}) {
  const Index = Dynamic({
    app,
    // models: () => [
    //   import('./models/index')
    // ],
    component: () => import('./routes/index')
  });
  const Page01 = Dynamic({
    app,
    component: () => import('./routes/page01')
  });
  const Page02 = Dynamic({
    app,
    component: () => import('./routes/page02')
  });
  const Page03 = Dynamic({
    app,
    component: () => import('./routes/page03')
  });
  //管理系统

  //登录
  const Login = Dynamic({
    app,
    component: () => import ('./pages/Login')
});
  //功能管理
  const FunManagement = Dynamic({
    app,
    component: () => import ('./pages/FunManagement')
});
  //二维码管理
  const CodeManagement = Dynamic({
    app,
    component: () => import ('./pages/CodeManagement')
});
  //商品列表
  const GoodsList = Dynamic({
    app,
    component: () => import ('./pages/GoodsList')
});
  //添加二维码
  const AddCode = Dynamic({
    app,
    component: () => import ('./pages/AddCode')
});
  //没有触点错误提示页
  const ErrorShow = Dynamic({
    app,
    component: () => import ('./pages/ErrorShow')
});
  //没有触点错误提示页
  const ChoosePoint = Dynamic({
    app,
    component: () => import ('./pages/ChoosePoint')
});
  //配置二级码
  const SecondCode = Dynamic({
    app,
    component: () => import ('./pages/SecondCode')
});

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/funManagement" component={FunManagement} />
        <Route exact path="/codeManagement" component={CodeManagement} />
        <Route exact path="/goodsList" component={GoodsList} />
        <Route exact path="/addCode" component={AddCode} />
        <Route exact path="/errorShow" component={ErrorShow} />
        <Route exact path="/choosePoint" component={ChoosePoint} />
        <Route exact path="/secondCode" component={SecondCode} />
      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object.isRequired
};

export default RouterConfig;

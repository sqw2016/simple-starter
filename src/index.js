import 'babel-polyfill';
import dva from 'dva';

import './index.less';

// 1. Initialize
const app = dva({
  onError(err, dispatch) {
    if (err.resp) {
      console.error(err.resp.msg);
    } else if (err.srv) {
      console.error(err.srv.msg);
    } else {
      console.error(err);
    }
  }
});

// 2. Plugins
// app.use();

// 3. Model
// Moved to router.js
app.model(require('./models/loginPage'));
app.model(require('./models/funManagement'));
app.model(require('./models/codeManagement'));
app.model(require('./models/goodsList'));
app.model(require('./models/addCode'));
app.model(require('./models/choosePoint'));
app.model(require('./models/secondCode'));

// 4. Router
app.router(require('./router.jsx'));

// 5. Start
app.start('#root');

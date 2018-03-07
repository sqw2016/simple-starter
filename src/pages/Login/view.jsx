import React from 'react';
import {Flex, Button, InputItem, WhiteSpace, TextareaItem} from 'antd-mobile';
import {createForm} from 'rc-form';
import {routerRedux} from 'dva/router';
import style from './view.less';

import liwu from '../../assets/A4A883E3-8793-40F3-8F91-4FC470D8D379@2x.png';
import iconIn from '../../assets/962AD72A-04CA-47EE-BE71-2F5FDD56E991@2x.png';
import iconOut from '../../assets/9F623A46-B556-4555-A111-B1A7323A6037@2x.png';

import loading from '../../assets/loading.gif';

import CheckCode from '../../components/checkCode/checkCode';
import ErrorMsg from '../../components/errorBox/errorBox';

function bind({loginPage, form, dispatch}) {

  const {getFieldProps} = form;
  const {checkCodeRun, curCount, user, error, showLoading, checkuser} = loginPage;
  const PHONEREG = /^[1][0-9][0-9]{9}$/;
  let phone = '';
  let number = '';

  document.title = '登录';

  //提交校验
  const checkSubmit = () => {
    dispatch({
      type: 'loginPage/saveCheckToCheck',
      payload: {
        phone: true, // 联系电话
        verificationCode: true, // 验证码
      }
    });



    form.validateFields((error, value) => {
      if (value.phone) {
        phone = value.phone.replace(/\s+/g, "");
      }
      number = value.number;
      // dispatch({
      //   type: 'loginPage/saveUserToUser',
      //   payload: {
      //     phone: phone,
      //     verificationCode:number
      //   }
      // });
    });

    if (!(PHONEREG.test(phone))) {
      dispatch({
        type: 'loginPage/saveCheckToCheck',
        payload: {
          phone: false
        }
      });
      showErrorMsg('手机号码格式错误');
      return;
    }else if(!number){
      dispatch({
        type: 'loginPage/saveCheckToCheck',
        payload: {
          verificationCode: false
        }
      });
      showErrorMsg('验证码有误');
      return;
    }
    return true;
  };

  //登录
  const submitData = () => {

    if (window.isRunning) {
      return ;
    }
    window.isRunning = true;
    let checkResault = false;

    checkResault = checkSubmit();

    // 验证通过 提交订单
    if (checkResault) {
      clickOther({showLoading: true});

      dispatch({
        type: 'loginPage/submitOrder',
        payload: {
          param: {
            "phone": phone,
            "validatcode": number,
          },
          callback: (result) => {
            clickOther({showLoading: false});
            window.isRunning = false;
            let touchPoint = result.data.data;
            let empId = result.data.empId;
            showErrorMsg(result.msg);
            dispatch({
              type: 'loginPage/saveSourceToState',
              payload: {
                empId:empId
              }
            });
            if(touchPoint.length){
              //选择一个触点
              dispatch({
                type: 'choosePoint/saveSourceToState',
                payload: {
                  list:touchPoint
                }
              });
              dispatch(routerRedux.push('/choosePoint'));
            }
              // else if(touchPoint.length == 1){
            //   //直接进入二维码管理页
            //   dispatch({
            //     type: 'codeManagement/saveSourceToState',
            //     payload: {
            //       touchPoint:touchPoint.id
            //     }
            //   });
            //   dispatch({
            //     type: 'codeManagement/fetchCreate',
            //     payload: {
            //       employeesId:empId,
            //       referenceId:touchPoint.id
            //     }
            //   });
            //   dispatch({
            //     type: 'codeManagement/fetchLose',
            //     payload: {
            //       employeesId:empId,
            //       referenceId:touchPoint.id
            //     }
            //   });
            //   dispatch(routerRedux.push('/codeManagement'));
            // }
              else {
              //没有触点
              dispatch(routerRedux.push('/errorShow'));
            }

          },
          // sessionTimeOut: () => {
          //   dispatch({
          //     type: 'waitCode/saveToState',
          //     payload: {
          //       data: {},
          //       code: '',
          //       msg: ''
          //     }
          //   });
          //   clickOther({showLoading: false});
          //   window.isRunning = false;
          //   dispatch(routerRedux.push('/waitCode?'+ param));
          // },
          errorCallBack: (msg) => {
            clickOther({showLoading: false});
            window.isRunning = false;
            showErrorMsg(msg);
          }
        }
      });
    } else {
      window.isRunning = false;
    }

  };

  //停止跑秒
  const runTimer = (run) => {
    dispatch({
      type: 'loginPage/saveSourceToState',
      payload: {
        checkCodeRun: run,
      }
    });
  };

  // 显示消息框
  const showErrorMsg = (msg) => {
    dispatch({
      type: 'loginPage/saveSourceToState',
      payload: {
        error: {
          show: !!msg,
          errorMsg: msg
        }
      }
    });
  };

  // 验证码定时发送
  const checkCode = () => {

    if (!curCount) { // curCount为0才发送请求,发送验证码
      // 先校验输入的手机号是否合法
      let phone = '';

      form.validateFields((error, value) => {
        if (value.phone) {
          phone = value.phone.replace(/\s+/g, "");
        }
      });

      if (!phone || !PHONEREG.test(phone)) {
        dispatch({
          type: 'loginPage/saveCheckToCheck',
          payload: {
            phone: false
          }
        });
        runTimer(false);
        return;
      } else {
        dispatch({
          type: 'loginPage/saveCheckToCheck',
          payload: {
            phone: true,
          }
        });
        runTimer(true);
      }
      dispatch({
        type: 'loginPage/sendCheckCode',
        payload: {
          phone: phone,
          callback: runTimer,
          errorCallBack: (msg) => {
            showErrorMsg(msg);
          }
        }
      });
    }
  };

  const clickOther = (other) => {
    dispatch({type: 'loginPage/saveSourceToState', payload: other});
  };

  return (
    <div>
      <Flex direction="column">
        <div id={style.top}>
          <Flex direction="column">
            <div className={style.container}>
              <img alt="" id={style.liwu} src={liwu}/>
              <div className={style.icon_all}>
                <img alt="" className={style.iconOut} src={iconOut}/>
                <div className={style.icon_container}>
                  <img alt="" className={style.iconIn} src={iconIn}/>
                </div>
              </div>
            </div>
          </Flex>
        </div>
        <div id={style.form}>
          <Flex direction="column">
            <div className={style.form_container}>
              <InputItem
                {...getFieldProps('phone')}
                type="phone"
                placeholder="手机号:"
              />
              <div className={style.errorShow} style={{display: checkuser.phone ? 'none' : 'block'}}>您输入的手机号有误，请重新输入!</div>
              <div style={{position: 'relative'}}>
                <InputItem
                  {...getFieldProps('number')}
                  type="number"
                  placeholder="验证码:"
                />
                <CheckCode sendCheckCode={checkCode} run={checkCodeRun}/>
              </div>
              <div className={style.errorShow} style={{display: checkuser.verificationCode ? 'none' : 'block'}}>您输入的验证码有误，请重新输入!</div>
            </div>
            <Button onClick={submitData} className={style.btn} type="primary">登录</Button>
          </Flex>
        </div>
      </Flex>
      <ErrorMsg show={error.show} showErrorMsg={showErrorMsg} errorMsg={error.errorMsg}/>
      <div style={{display: showLoading ? 'block' : 'none'}} className={style.show_loading}>
        <img src={loading} alt="" className={style.loading_img}/>
      </div>
    </div>
  );
}
export default createForm()(bind);

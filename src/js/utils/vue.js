import Vue from 'vue';
// 自定义弹出框
Vue.prototype.confirm = function (obj = {}) {
  let dialog;
  if (document.getElementsByClassName('dialog').length !== 0) {
    dialog = document.getElementsByClassName('dialog')[0];
  } else {
    dialog = document.createElement('div');
    dialog.classList.add('dialog');
  }
  dialog.innerHTML = `
    <div class="dialogCon">
      <div class="dialogBox border">
        <div class="title line">${obj.title||'提示'}</div>
        <div id="trueDialogCon" class="con line">
          ${obj.content||'登录已过期，请重新登录'}
        </div>
        <div class="footer">
          <button id="btnCancel" class="default border">${obj.cancelText||'关闭'}</button>
          ${obj.confirmText ? '<button id="btnConfirm" class="default border">'+obj.confirmText+'</button>' : ''}
        </div>
      </div>
    </div>`;
  // dialog.style.opacity = 0;
  document.body.appendChild(dialog);
  // fadeIn(dialog, 200);
  let btnCancel = document.getElementById("btnCancel");
  btnCancel.onclick = () => {
    // fadeOut(dialog, 200).then(() => {
    document.body.removeChild(dialog);
    obj.cancel ? obj.cancel() : "";
    // })
  }
  let btnConfirm = document.getElementById("btnConfirm");
  if (btnConfirm) {
    btnConfirm.onclick = () => {
      // fadeOut(dialog, 200).then(() => {
      document.body.removeChild(dialog);
      obj.confirm ? obj.confirm() : "";
      // })
    }
  }
}

function fadeOut(ele, speed) {
  return new Promise((resolve) => {
    let opacitynum = ele.style.opacity || 1;
    let trueSpeed = (speed / 100) || 10;

    function opacityOff() {
      if (opacitynum > 0) {
        ele.style.opacity = opacitynum = (opacitynum - 0.01).toFixed(2);
      } else {
        clearInterval(opacityt);
        resolve();
      }
    }
    let opacityt = setInterval(opacityOff, trueSpeed);
  })

}

function fadeIn(ele, speed) {
  return new Promise(resolve => {
    let opacitynum = ele.style.opacity || 0;
    let trueSpeed = (speed / 100) || 10;

    function opacityAdd() {
      if (opacitynum < 1) {
        ele.style.opacity = opacitynum = (parseFloat(opacitynum) + 0.01).toFixed(2);
      } else {
        clearInterval(opacityt);
        resolve();
      }
    }
    let opacityt = setInterval(opacityAdd, trueSpeed);
  })

}
export default Vue;
// ==UserScript==
// @name         MyCOS 自动评教
// @namespace    https://github.com/lcandy2
// @version      1.1
// @description  自动完成评教，适用于所有采用 MyCOS / 麦可思 （评教系统左上角有MyCOS或M标识）系统的高校或其他单位。
// @match        *://*/*
// @homepage     https://github.com/lcandy2/MyCOS
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  let comment = "我对本课程非常满意。"; // 评价内容
  let radioSelection = [0, 1]; // 0: 非常同意，1: 同意，2: 一般，3: 不同意，4: 非常不同意
  let checkboxSelection = 1; // 要全选所有多选题，请将此值改为1，否则请将此值改为0
  let autoSubmission = 1; // 要自动提交，请将此值改为1，否则请将此值改为0
  let fillComment = 1; // 要填写评价，请将此值改为1，否则请将此值改为0

  // 以下代码请勿修改
  fetch('/config.js')
    .then(response => response.text())
    .then(data => {
      if (data.toLowerCase().includes('mycos')) {
        // 如果config.js中包含'mycos'（忽略大小写），则执行脚本
        appendLogWindow();
        appendLog('准备开始评教，等待2秒...', 'salmon');
        setTimeout(() => {
          executeMyCOS();
        }, 1200);
        console.log('Found mycos in /config.js. Running script...');
      } else {
        console.log('No mycos found in /config.js.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  //函数getRnd，用于生成给定范围内的随机数
  const getRnd = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  //函数seleRadio，用于点击指定的单选按钮
  const seleRadio = (fixedTexts = ["非常", "", "一般", "不", "非常不"]) => {
    // fixedTexts = ["非常不", "不", "一般", "", "非常"]
    let positions = new Array(5).fill(-1);// 初始化五个选项的位置数组

    $('.ant-radio-group').each(function () {
      let options = $(this).find('.ant-radio-wrapper');
      options.each(function (index) {
        let text = $(this).text().trim();

        // 非常同意
        // * 如果文本以"非常"开头，但不以"非常不"开头，则记录最好评价选项的位置
        if (text.includes(fixedTexts[0]) && !text.includes(fixedTexts[4])) {
          positions[0] = index;
        }

        // 非常不同意
        // * 如果文本以"非常不"开头，则记录最差评价选项的位置
        if (text.includes(fixedTexts[4])) {
          positions[4] = index;
        }

        // 不同意
        // * 如果文本以"不"开头，则记录较差评价选项的位置
        if (text.includes(fixedTexts[3]) && !text.includes(fixedTexts[4])) {
          positions[3] = index;
        }

        // 一般
        // * 检测中立评价选项，如果文本包含"一般"，则记录中立评价选项的位置
        if (text.includes(fixedTexts[2])) {
          positions[2] = index;
        } else if (index > 0 && index < 4) { // 如果文本不包含"中立"，通过前后选项确定中立选项的位置
          let prevText = options.eq(index - 1).text().trim();
          let nextText = options.eq(index + 1).text().trim();
          let character1Prev = prevText.replace(fixedTexts[0], "").replace(fixedTexts[3], ""); // 获取前一个选项的字符
          let character1Next = nextText.replace(fixedTexts[0], "").replace(fixedTexts[3], ""); // 获取后一个选项的字符
          let character1Current = text.replace(fixedTexts[0], "").replace(fixedTexts[3], ""); // 获取当前选项的字符
          // 如果当前选项的字符与前一个和后一个选项的字符都不相同，则记录中立评价选项的位置
          if (character1Current !== character1Prev && character1Current !== character1Next) {
            positions[2] = index;
          }
        }

        // 同意
        // * 如果文本不以"非常"和"不"开头，并且未被标记为中立评价选项，则记录较好评价选项的位置
        if (!fixedTexts[1] == "") {
          if (text.startWith(fixedTexts[1])) {
            positions[1] = index;
          }
        }
        if (!text.includes(fixedTexts[0]) && !text.includes(fixedTexts[3]) && positions[2] !== index && positions[1] == -1) {
          positions[1] = index;
        }
      });

      radioSelection.sort();
      let randomIndex = getRnd(radioSelection[0], radioSelection[radioSelection.length - 1]);
      // console.log(randomIndex);
      // console.log(positions);
      if (positions[randomIndex] !== -1) {
        options.eq(positions[randomIndex]).click();
        // 初始化 positions
        positions = Array(5).fill(-1);
      }
      // console.log(positions);
    });
    // return positions
  }

  //获取所有多选按钮组，并遍历每个多选按钮组
  const seleCheckbox = () => {
    let checkbox_list = $(".ant-checkbox-group");
    for (let i = 0; i < checkbox_list.length; i++) {
      let lists = checkbox_list[i].children;
      for (let j = 0; j < lists.length; j++) {
        let btn = $(checkbox_list[i]).find(".ant-checkbox-input")[j];
        $(btn).trigger("click"); //点击每个多选按钮组的所有选项
      }
    }
  }

  //获取所有文本输入框，并遍历每个文本输入框
  const fillInput = () => {
    let textbox_list = $(".ant-input");
    for (let i = 0; i < textbox_list.length; i++) {
      let textArea = textbox_list[i];
      // 获取到原生的输入值设置器
      let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      // 创建一个新的事件
      let inputEvent = new Event('input', { bubbles: true });
      // 设置textarea的值
      nativeInputValueSetter.call(textArea, comment);
      // 触发`input`事件
      textArea.dispatchEvent(inputEvent);
    }
  };

  const submitTask = () => {
    setTimeout(() => {
      $('.ant-btn-primary').click();
    }, 1000);
  }

  const nextTeacher = () => {
    let nextTeacherButton = Array.from(document.querySelectorAll('button')).find(el => el.textContent === '下一位教师' || el.textContent === '下一门课程');
    if (!nextTeacherButton) {
      let modalElement = document.querySelector('div.ant-modal');
      if (!modalElement) {
        console.warn('警告：未找到 ant-modal，将使用按钮 ant-btn-primary 寻找。');
      } else {
        nextTeacherButton = modalElement.querySelector('ant-btn-primary');
      }
    }
    if (nextTeacherButton) {
      nextTeacherButton.click();
      appendLog('已自动切换下一课程/教师');
    } else {
      appendLog('未找到切换按钮，请手动点击切换', 'firebrick');
    }
  }

  const executeMyCOS = () => {
    if (radioSelection.length > 0) {
      seleRadio();
      appendLog('已完成单选题！');
    } else { appendLog('单选题选择功能已由用户关闭。', 'grey'); }
    if (checkboxSelection == 1) {
      seleCheckbox();
      appendLog('已完成多选题！');
    } else { appendLog('多选题全选功能已由用户关闭。', 'grey'); }
    if (fillComment == 1) {
      fillInput();
      appendLog('已填写文本题目：' + comment);
    } else { appendLog('文本题目填写功能已由用户关闭。', 'grey'); }
    if (autoSubmission == 1) {
      appendLog('自动提交已开启，等待1秒准备提交...', 'salmon');
      submitTask();
      appendLog('准备切换下一位教师，等待2秒...', 'salmon');
      setTimeout(() => {
        nextTeacher();
      }, 2000);
    } else { appendLog('自动提交功能已由用户关闭。', 'grey'); }
    appendLog('已完成《' + $("h1").text() + '》！\n', 'green');
  }

  let logWindow = document.createElement('div');
  const logContent = document.createElement('div');
  const appendLogWindow = () => {
    // Create log window title
    const logWindowTitle = document.createElement('div');
    logWindowTitle.innerHTML = 'MyCOS自动评教<br> - <a href="https://support.microsoft.com/zh-cn/microsoft-edge/%E5%9C%A8-microsoft-edge-%E4%B8%AD%E6%B7%BB%E5%8A%A0-%E5%85%B3%E9%97%AD%E6%88%96%E5%88%A0%E9%99%A4%E6%89%A9%E5%B1%95-9c0ec68c-2fbc-2f2c-9ff0-bdc76f46b026" target="_blank">了解如何禁用扩展程序？</a>';
    logWindowTitle.style.backgroundColor = '#d3d3d3';
    logWindowTitle.style.color = '#000000';
    logWindowTitle.style.padding = '5px';
    logWindowTitle.style.fontWeight = 'bold';
    logWindowTitle.style.borderRadius = '10px 10px 0 0';

    // Log window styles
    logWindow.id = 'log-window';
    logWindow.style.position = 'fixed';
    logWindow.style.zIndex = '10000';
    logWindow.style.backgroundColor = '#f3f3f3';
    logWindow.style.borderRadius = '10px';
    logWindow.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    logWindow.style.width = '300px';
    logWindow.style.height = '400px';
    logWindow.style.overflowY = 'scroll';
    logWindow.style.bottom = '10px';
    logWindow.style.left = '10px';
    logWindow.style.cursor = 'move';

    // Append title to log window
    logWindow.appendChild(logWindowTitle);

    // Create log content div and style it
    logContent.style.padding = '10px';
    logWindow.appendChild(logContent);

    // 使其可拖动
    logWindow.onmousedown = function (event) {
      logWindow.style.position = 'absolute';
      logWindow.style.zIndex = 1000;

      function moveAt(e) {
        logWindow.style.left = e.pageX - logWindow.offsetWidth / 2 + 'px';
        logWindow.style.top = e.pageY - logWindow.offsetHeight / 2 + 'px';
      }

      // 在鼠标移动时移动窗口
      document.addEventListener('mousemove', moveAt);

      // 在鼠标松开时停止移动窗口
      logWindow.onmouseup = function () {
        document.removeEventListener('mousemove', moveAt);
        logWindow.onmouseup = null;
      };
    };

    // 禁止浏览器选择
    logWindow.ondragstart = function () {
      return false;
    };

    // 添加到页面
    document.body.appendChild(logWindow);
  }

  const appendLog = (message, color = 'black') => {
    console.log(message);
    let timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    logContent.innerHTML += `<div style="color:${color};">${timestamp} - ${message}</div>`;
    logWindow.scrollTop = logWindow.scrollHeight;
  };

})();

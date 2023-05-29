import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { green, lightBlue, orange, red } from '@mui/material/colors';
import chrome from 'webextension-polyfill';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';



function Popup() {
  const MyCOSRef = useRef(null);

  const updateStorage = (field, value) => {
    if (MyCOSRef.current) {
      chrome.storage.local.set({
        'MyCOS': {
          ...MyCOSRef.current,
          [field]: value
        }
      });
    }
  };

  const [rate, setRate] = useState([]);
  const [fillComment, setFillComment] = React.useState(false);
  const [comment, setComment] = useState("");
  const [checkboxSelection, setCheckboxSelection] = React.useState(false);
  const [autoSubmission, setAutoSubmission] = React.useState(false);
  const [extensionName, setExtensionName] = useState("");

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      MyCOSRef.current = data?.MyCOS || {};

      const storedSelection = MyCOSRef.current.radioSelection || [];
      const storedComment = MyCOSRef.current.comment || "";
      const storedCheckboxSelection = MyCOSRef.current.checkboxSelection || 0;
      const storedAutoSubmission = MyCOSRef.current.autoSubmission || 0;
      const storedFillComment = MyCOSRef.current.fillComment || 0;

      const manifestData = chrome.runtime.getManifest();
      setExtensionName(manifestData.name);

      const rateFromStorage = storedSelection.map(index => {
        switch (index) {
          case 0:
            return 'superLike';
          case 1:
            return 'like';
          case 2:
            return 'neutral';
          case 3:
            return 'dislike';
          case 4:
            return 'veryDislike';
          default:
            return null;
        }
      });

      setRate(rateFromStorage);
      setComment(storedComment);
      setCheckboxSelection(storedCheckboxSelection === 1 ? true : false);
      setAutoSubmission(storedAutoSubmission === 1 ? true : false);
      setFillComment(storedFillComment === 1 ? true : false);
    });
  }, []);

  const handleRateChange = (event, newRate) => {
    const indexes = newRate.map(value => {
      switch (value) {
        case 'superLike':
          return 0;
        case 'like':
          return 1;
        case 'neutral':
          return 2;
        case 'dislike':
          return 3;
        case 'veryDislike':
          return 4;
        default:
          return null;
      }
    });

    updateStorage('radioSelection', indexes);
    setRate(newRate);
  };

  const handleCommentChange = (event) => {
    const newComment = event.target.value;
    setComment(newComment);

    updateStorage('comment', newComment);
  };

  const handleFillCommentChange = (event) => {
    setFillComment(event.target.checked);

    const isChecked = event.target.checked ? 1 : 0;
    updateStorage('fillComment', isChecked);
    setFillComment(isChecked === 1);
  };

  const handleCheckboxSelectionChange = (event) => {
    setCheckboxSelection(event.target.checked);

    const isChecked = event.target.checked ? 1 : 0;
    updateStorage('checkboxSelection', isChecked);
    setCheckboxSelection(isChecked === 1);
  };

  const handleAutoSubmissionChange = (event) => {
    setAutoSubmission(event.target.checked);

    const isChecked = event.target.checked ? 1 : 0;
    updateStorage('autoSubmission', isChecked);
    setAutoSubmission(isChecked === 1);
  };

  return (

    <React.StrictMode>
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">{extensionName}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">单选评价区间：</Typography>
          <Typography variant='body2' color="textSecondary">从选择中随机选择，单选只选一个</Typography>
          <ToggleButtonGroup
            orientation="horizontal"
            value={rate}
            onChange={handleRateChange}
            sx={{ mt: 2, mb: 3 }}
          >
            <Tooltip title="非常满意" disableInteractive enterDelay={100}>
              <ToggleButton value="superLike" style={rate.includes("superLike") ? { backgroundColor: green[100] } : {}}>
                <ThumbUpIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="满意" disableInteractive enterDelay={100}>
              <ToggleButton value="like" style={rate.includes("like") ? { backgroundColor: green[50] } : {}}>
                <ThumbUpOffAltIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="一般" disableInteractive enterDelay={100}>
              <ToggleButton value="neutral" style={rate.includes("neutral") ? { backgroundColor: lightBlue[50] } : {}}>
                <ThumbsUpDownIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="不满意" disableInteractive enterDelay={100}>
              <ToggleButton value="dislike" style={rate.includes("dislike") ? { backgroundColor: red[50] } : {}}>
                <ThumbDownOffAltIcon />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="非常不满意" disableInteractive enterDelay={100}>
              <ToggleButton value="veryDislike" style={rate.includes("veryDislike") ? { backgroundColor: red[100] } : {}}>
                <ThumbDownIcon />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 1 }}>
            <Tooltip title="启用此项将自动在文本输入框中填写以下文本（如有）" disableInteractive enterDelay={100}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fillComment}
                    onChange={handleFillCommentChange}
                  />
                }
                label="填写文本评价"
              />
            </Tooltip>
          </Box>
          <Tooltip
            title="“填写文本评价”功能已关闭"
            placement="bottom"
            disableHoverListener={fillComment}
            followCursor
            disableInteractive
            enterDelay={100}
          >
            <TextField
              label="评价文本"
              value={comment}
              onChange={handleCommentChange}
              multiline
              maxRows={4}
              fullWidth
              disabled={!fillComment}
            />
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="启用此项则全选所有多选题选项（如有）" disableInteractive enterDelay={100}>
            <FormControlLabel
              control={
                <Switch
                  checked={checkboxSelection}
                  onChange={handleCheckboxSelectionChange}
                />
              }
              label="多选项选择"
            />
          </Tooltip>

          <Tooltip title="启用此项则在填写完成后自动提交，并自动切换至下一问卷" disableInteractive enterDelay={100}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoSubmission}
                  onChange={handleAutoSubmissionChange}
                  color="warning"
                />
              }
              label="自动提交"
            />
          </Tooltip>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" color="textSecondary" align="center">
            扩展在 MyCOS 评教页面自动启用<br />设定自动保存，刷新页面使改动生效<br />使用完成后请禁用本扩展
          </Typography>
        </Box>
      </Box>
    </React.StrictMode>
  );
}

ReactDOM.render(<Popup />, document.getElementById('root'));

window.onload = function () {
  chrome.runtime.sendMessage({ actionButtonClicked: true });
};

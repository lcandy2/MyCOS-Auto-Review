# MyCOS / 麦可思 自动评教脚本

<p align="center"><a href="https://github.com/lcandy2/MyCOS/tree/main/MyCOS"><strong>User Script 油猴脚本版</strong></a></p>

这是一个能够自动进行 MyCOS / 麦可思 课程评教的插件。通过该插件，您可以自动完成课程评价、选择单选题答案、勾选多选题选项，并填写文本题答案。同时，您还可以根据个人喜好自定义评教内容。

## 功能特点

- 自动评教：无需手动逐一评价课程，节省时间和精力。
- 自定义设置：可以根据个人偏好设置单选题答案、多选题选项和文本题答案。
- 自动提交：可选择开启自动提交功能，评教完成后自动进入下一门课程/教师评教页面。
- 简单易用：只需安装浏览器插件，即可自动执行评教任务。

## 安装

1. 通过浏览器拓展商店安装：
[![在Chrome网上应用商店获取](https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/UV4C4ybeBTsZt43U4xis.png)](https://chrome.google.com/webstore/detail/milknmmfmlfhifcmbpbgbeoccogaaogk?hl=zh-CN)
[<img src='https://user-images.githubusercontent.com/72879799/229780441-610f727a-edb4-41e0-a1fb-6593af3d4485.svg' alt='从 Microsoft 外接程序获取' style='height: 58px;'/>](https://microsoftedge.microsoft.com/addons/detail/	gfpggjainpageinfcghkchajpljlpgaj?hl=zh-CN)
[<img src='https://ffp4g1ylyit3jdyti1hqcvtb-wpengine.netdna-ssl.com/addons/files/2015/11/get-the-addon.png' alt='Get the add-on' style='height: 59px;'/>](https://addons.mozilla.org/firefox/addon/select-like-a-boss/)

2. 手动安装，从[release](https://github.com/lcandy2/MyCOS/releases)中下载crx或zip文件，解压后，打开浏览器的拓展程序页面，将解压后的文件夹拖入浏览器中即可。

## 使用说明

1. 打开课程评教页面：在浏览器中访问采用 MyCOS / 麦可思 系统（左上角有“MyCOS”或“M”标识）的课程评教页面。

2. 插件自动执行：插件会自动加载并执行评教任务。您无需手动点击按钮或进行其他操作。

3. 自定义评教设置（可选）：如果您想自定义评教设置，可以通过点击插件图标，在插件的主窗口来修改评教设置。您可以根据个人喜好设置单选题答案、多选题选项和文本题答案。

4. 查看评教日志：在浏览器窗口的底部左侧，您会看到一个名为“MyCOS自动评教”的浮动窗口。该窗口会显示脚本的运行日志。您可以在该窗口中查看评教过程中的日志信息，包括评教进度、选择的答案和其他相关信息。

5. 完成评教：评教完成后，您可以在页面上确认评教是否成功。如果开启了自动提交功能，脚本会自动进入下一门课程/教师评教页面。

6. 禁用插件：为避免与其他网站冲突出错，请在使用完成后及时禁用插件。

## 默认配置

扩展的默认配置如下，您可以根据个人需求对其进行修改。

- 单选评价区间：默认为`非常同意`与`同意`
- 填写文本评价：默认开启，默认填写文本内容为：`我对本课程非常满意。课程内容的深度、教师的专业知识和教学方法的实用性，都使我对这门课程感到满意。希望更多的人能参与到这样优秀的课程中来。`
- 多选题全选：默认开启
- 自动提交（并自动切换至下一项）：默认开启

## 注意事项

- 该扩展仅适用于 MyCOS / 麦可思 系统的课程评教页面，对于其他页面可能无效。
- 自定义评教设置可根据个人需求进行调整，在修改配置时，请确保遵循代码语法和结构。
- 脚本的运行结果可能受到 MyCOS / 麦可思 系统更新和页面结构变化的影响，如果脚本在使用过程中出现问题，请及时反馈给开发者。
- 如果您在修改配置时遇到任何问题，可以随时与脚本作者或相关社区寻求帮助。提供详细的问题描述和相关代码部分，以便他人更好地帮助您。
- 请注意，根据您所在的学校或机构的规定，可能存在限制或规范评教的要求。在使用脚本进行评教时，请确保遵守相关规定，并尊重学校和教师的权益。

## 开发和构建

我们使用Webpack进行项目构建。在开始开发之前，首先运行`npm install`来安装依赖。然后，您可以运行以下命令：
- `npm run build`：构建项目，生成的文件将在`dist`目录中。
- `npm run watch`：启动开发服务器，保存文件时会自动重新构建项目。
在开始开发和构建前，请确保你已经安装了Node.js和npm。

## 免责声明

该脚本仅用于辅助自动化评教流程，使用者对评教结果和相关后果负有责任。请在使用脚本时遵守相关法律法规和学校规定，不得滥用脚本功能。


**祝您使用插件愉快，顺利完成评教任务！**
const config = {
    // 是否自动提交 true: 自动提交, false: 不自动提交
    autoSubmit: false,

    // 评价内容
    // 单选范围 0: 非常同意，1: 同意，2: 一般，3: 不同意，4: 非常不同意
    radio: [0, 1],
    // 多选题评价 true: 全部选中, false: 全部不选中
    checkbox: true,
    // 文本评价 任意文本: 自动填充文本, 留空: 不填充
    comment: "我对本课程非常满意。",

    // Dev Only
    // 评价页面的 href，无特殊情况不需要修改
    reviewHref: "answer",
    // 评价页面的父元素，无特殊情况不需要修改
    reviewParentElement: "div.ant-tabs div.ant-tabs-bar div.ant-tabs-nav-container div.ant-tabs-nav-wrap div.ant-tabs-nav-scroll",
    // 评价页面的单选框选项，无特殊情况不需要修改（由好到不好）
    reviewRadioField: ["非常", "", "一般", "不", "非常不"],
    // 提交评价按钮，无特殊情况不需要修改
    reviewSubmitElement: ".ant-btn.ant-btn-primary:not(.--lcandy2-mycos-auto-review)",
    // 评价弹窗，无特殊情况不需要修改
    reviewModalElement: "div.ant-modal-body",
}
export default config;
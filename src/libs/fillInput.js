const fillInput = (element, value) => {
    // 获取到原生的输入值设置器
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    // 创建一个新的事件
    const inputEvent = new Event('input', { bubbles: true });
    // 设置textarea的值
    nativeInputValueSetter.call(element, value);
    // 触发`input`事件
    element.dispatchEvent(inputEvent);
}
export default fillInput;

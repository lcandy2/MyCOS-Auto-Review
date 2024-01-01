const watchUrlChange = (onChange) => {
    // 重写 history.pushState 方法
    const originalPushState = history.pushState;
    history.pushState = function(state, title, url) {
        originalPushState.apply(this, arguments);
        onChange(url);
    };

    // 重写 history.replaceState 方法
    const originalReplaceState = history.replaceState;
    history.replaceState = function(state, title, url) {
        originalReplaceState.apply(this, arguments);
        onChange(url);
    };

    // 监听 popstate 事件
    window.addEventListener('popstate', () => {
        onChange(document.location.href);
    });
}

export default watchUrlChange;
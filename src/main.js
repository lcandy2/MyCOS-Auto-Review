import Review from "./Review";
import addReviewButton from "./libs/addReviewButton";
import config from "./config";
import mycosTest from "./libs/mycosTest";
import watchUrlChange from "./libs/watchUrlChange";
import submitReview from "./libs/submitReview";
import removeModal from "./libs/removeModal";

const executeReview = async () => {
    Review();
    const $submitButton = $(config.reviewSubmitElement)
    $submitButton.children().text("评价完成，点击提交");
    if (config.autoSubmit) {
        submitReview();
        alert("评价完成，已自动提交。");
    }
};

const main = () => {
    addReviewButton(executeReview);
};

const observer = (func, func2) => {
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                const $topContent = $(config.reviewParentElement);
                const href = window.location.href;
                const hrefTest = href.includes(config.reviewHref);
                if ($topContent.length && hrefTest) {
                    if (import.meta.env.MODE === 'development') console.log('[mycos-auto-review] ', $topContent, ' on ', href, ' found!');
                    observer.disconnect();
                    func();
                    break; // 找到目标元素后立即跳出循环
                }
                const $modalBody = $(config.reviewModalElement);
                const $button = $modalBody.find('button.ant-btn-primary');
                if ($modalBody.length && $button.length) {
                    if (import.meta.env.MODE === 'development') console.log('[mycos-auto-review] ', $modalBody, $button, ' found!');
                    observer.disconnect();
                    func2($button);
                    console.log('已移除评价弹窗');
                    break; // 找到目标元素后立即跳出循环
                }
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

$(async () => {
    if (!mycosTest()) return;
    observer(main, removeModal);
    watchUrlChange((newUrl) => {
        if (import.meta.env.MODE === 'development') console.log('URL 变化了:', newUrl);
        // 重新执行 main 函数
        observer(main, removeModal);
    });
});

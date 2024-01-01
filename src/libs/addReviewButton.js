import config from "../config";

const addReviewButton = (listener) => {
    if ($('button.--lcandy2-mycos-auto-review').length) return; // 防止重复添加

    const $parentElement = $(config.reviewParentElement);

    if (import.meta.env.MODE === 'development') console.log('parentElement', $parentElement);

    // const $topContent_item = $topContent.children().eq(1);
    const $reviewButton = $(`<button type="button" class="ant-btn ant-btn-default --lcandy2-mycos-auto-review">一 键 评 教</button>`);
    $reviewButton.on('click', () => {
        config.autoSubmit = false;
        listener();
    });
    const $reviewAndSubmitButton = $(`<button type="button" class="ant-btn ant-btn-primary --lcandy2-mycos-auto-review">评 教 并 <b>提 交</b></button>`);
    $reviewAndSubmitButton.on('click', () => {
        config.autoSubmit = true;
        listener();
    });
    $parentElement.append($reviewButton);
    $parentElement.append($reviewAndSubmitButton);
    console.log('Add Review Button', $reviewButton, $reviewAndSubmitButton);
}

export default addReviewButton;
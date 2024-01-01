import config from "./config"
import { seleRadio, seleCheckbox, fillComments } from "./libs/applyReview";

const Review = () => {
    // 单选
    const seleRadioResult = seleRadio(config.radio);
    console.log(seleRadioResult ? '[单选题] 评价完成' : '[单选题] 未找到单选题');

    // 多选
    if (config.checkbox) {
        const seleCheckboxResult = seleCheckbox();
        console.log(seleCheckboxResult ? '[多选题] 评价完成' : '[多选题] 未找到多选题');
    } else {
        console.log('[多选题] 未开启');
    }

    // 文本评价
    if (config.comment !== "") {
        const fillCommentsResult = fillComments(config.comment);
        console.log(fillCommentsResult ? '[文本评价] 评价完成' : '[文本评价] 未找到文本评价');
    } else {
        console.log('[文本评价] 未开启');
    }

    console.log('[自动评教] 全部评教完成');
}

export default Review;
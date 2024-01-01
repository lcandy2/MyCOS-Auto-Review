import fillInput from "./fillInput";
import getRnd from "./getRnd";

// 函数seleRadio，用于点击指定的单选按钮
export const seleRadio = (selection, fixedTexts = ["非常", "", "一般", "不", "非常不"]) => {
    // fixedTexts = ["非常不", "不", "一般", "", "非常"]
    let positions = new Array(5).fill(-1);// 初始化五个选项的位置数组
    let result = false;

    let radioSelection = selection;

    $('.ant-radio-group').each((index, element) => {
        let options = $(element).find('.ant-radio-wrapper');
        options.each((index, element) => {
            let text = $(element).text().trim();

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

        if (import.meta.env.MODE === 'development') console.log(`radioSelection: ${radioSelection}`);

        radioSelection.sort()
        let randomIndex = getRnd(radioSelection[0], radioSelection[radioSelection.length - 1]);
        console.log('[单选题] 第 ' + (index + 1) + ' 题，随机选择第 ' + (randomIndex + 1) + ' 个选项：' + fixedTexts[randomIndex] + '同意。');
        if (import.meta.env.MODE === 'development') console.log(`radio ${index + 1} randomIndex: ${randomIndex}`);
        if (positions[randomIndex] !== -1) {
            options.eq(positions[randomIndex]).trigger('click');
            if (import.meta.env.MODE === 'development') console.log(`radio ${index + 1} elementOptionsClicked: `, options.eq(positions[randomIndex]));
            result = true;
            // 初始化 positions
            positions = Array(5).fill(-1);
        }
        // console.log(positions);
    });
    return result;
}

// 获取所有多选按钮组，并遍历每个多选按钮组
export const seleCheckbox = () => {
    let checkbox_list = $(".ant-checkbox-group");
    for (let i = 0; i < checkbox_list.length; i++) {
        let lists = checkbox_list[i].children;
        for (let j = 0; j < lists.length; j++) {
            let btn = $(checkbox_list[i]).find(".ant-checkbox-input")[j];
            $(btn).trigger("click"); //点击每个多选按钮组的所有选项
        }
    }
}

// 获取所有文本输入框，并遍历每个文本输入框
export const fillComments = (comment) => {
    const textbox_list = $(".ant-input");
    for (let i = 0; i < textbox_list.length; i++) {
        const textArea = textbox_list[i];
        fillInput(textArea, comment);
    }
};
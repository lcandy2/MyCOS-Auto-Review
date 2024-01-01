//函数getRnd，用于生成给定范围内的随机数
const getRnd = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
export default getRnd;
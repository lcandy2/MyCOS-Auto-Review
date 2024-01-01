import config from "../config";

const submitReview = () => {
    setTimeout(() => {
        $(config.reviewSubmitElement).trigger('click');
    }, 500);
}
export default submitReview;
const mycosTest = async () => {
    const configJs = $('script').filter((index, element) => {
        const src = $(element).attr('src');
        return src && src.includes('config.js');
    });

    if (import.meta.env.MODE === 'development') console.log('configJs', configJs, configJs.length);

    if (!configJs.length) {
        return false;
    }

    if (import.meta.env.MODE === 'development') console.log ('configJs', configJs.attr('src'));

    const response = await fetch(configJs.attr('src'));
    const responseText = await response.text();

    const test = responseText.includes('mycos');

    if (import.meta.env.MODE === 'development') console.log('mycosTest', test)

    return test;
};
export default mycosTest;
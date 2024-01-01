const removeModal = ($button) => {
    // const $modal = $(config.reviewModalElement)
    // if (import.meta.env.MODE === 'development') console.log('[mycos-auto-review] modal ', $modal, ' found!');
    // const $button = $modal.find('button.ant-btn-primary');
    // if (import.meta.env.MODE === 'development') console.log('[mycos-auto-review] button ', $button, ' found!');
    $button.prop('disabled', false);
    $button.trigger('click');
}

export default removeModal;
$.confirm = function(options) {
    return new Promise((resolve, reject) => {
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose() {
                modal.destroy();
            },
            footerButtons:[        
                {text: 'Отмена', type: 'secondary', handler() {
                    modal.close();
                    modal.onClose();
                    reject();
                }},
                {text: 'Удалить', type: 'danger', handler() {
                    modal.close();
                    resolve();
                }}        
            ]
        })

        setTimeout(() => {
            modal.open();
        }, 100);
    })
}
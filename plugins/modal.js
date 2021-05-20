function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');
    buttons.forEach(btn => {
        const btnF = document.createElement('button');
        btnF.innerHTML = `${btn.text}`;
        btnF.classList.add('btn');
        btnF.classList.add(`btn-${btn.type}`);
        btnF.addEventListener('click', (e) => {
            e.preventDefault();
            try{
                btn.handler();
            } catch(e) {};
        })
        wrap.appendChild(btnF);
    })
    return wrap;
}


function _createModal(options) {
    const modal = document.createElement('div');

    modal.classList.add('rmodal');
    modal.insertAdjacentHTML("afterbegin",
        `
        <div class="modal-overlay">
            <div class="modal-window" style='width:${options.width || '600px'}'>
                <div class="modal-header">
                    <span>${options.title || 'Окно'}</span>
                    <div class="close">${options.closable ? '&times' : ''}</div>
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
            </div>
        </div>    
        `  
    );
    const footer = _createModalFooter(options.footerButtons);
    insertAfter(footer, modal.querySelector('[data-content'));
    document.body.appendChild(modal);
    return modal;
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200;
    const callWindow = _createModal(options);
    let closing = false;
    let destroyed = false;
    const close = document.querySelector('.close');
    close.addEventListener('click', () => {
        modal.close();
    });

    const modal = {
        open() {
            callWindow.classList.add('open');
            if(destroyed) {
                return console.log('Modal is destroyed');
            }
        },
        close() {
            closing = true;
            callWindow.classList.remove('open');
            callWindow.classList.add('hide');
            setTimeout(() => {
                callWindow.classList.remove('hide');
                closing = false;
                if (typeof(options.onClose === 'function')) {
                    try{
                        options.onClose();
                    } catch(e) {}
                }
            }, ANIMATION_SPEED);
        }
    }

    const listener = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            modal.close();
        }
    }
    document.querySelector('.modal-overlay').addEventListener('click', listener);

    return Object.assign(modal, {
        destroy() {
            document.querySelector('.modal-overlay').removeEventListener('click', listener);
            callWindow.parentNode.removeChild(callWindow);
            destroyed = true;
        },
        setContent(html) {
            callWindow.querySelector('[data-content]').innerHTML = html;
        },
        onClose() {
            document.querySelectorAll('.rmodal').forEach(item => {
                item.remove();
            })
        }
    });
}
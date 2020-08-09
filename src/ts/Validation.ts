interface Config {
    /**
    * Целевой элемент
    */
    target?: HTMLElement | JQuery | string
    /**
     * Сообщение пустого поля
     */
    emptyMsg?: string
    /**
     * Классы по умолчанию
     */
    defaultClass?: Classes
    /**
      * Кастомные типы инпутов или переопределение стандартных
      */
    types?: Types

}

interface Classes {
    /**
     * Префикс классов
     */
    prefix?: string
    /**
     * класс ошибки
     */
    errorClass?: string
    /**
     * класс валидности
     */
    validClass?: string
    /**
     * класс инпутов у которых был event focus
     */
    dirtyClass?: string

}

interface Types {
    [name: string]: {
        messages?: {
            /**
             * сообщение ошибки
             */
            errorMsg: string
        }
        /**
         * Классы ошибок 
         */
        classes?: Classes
        /**
         * Функция валидирующая значение input
         */
        handler?: (val:  HTMLInputElement | HTMLTextAreaElement) => boolean
    }

}



export default class Validate {

    private config: Config = {
        target: 'form .btn-submit',
        defaultClass: {
            prefix: 'cst-',
            errorClass: 'error',
            validClass: 'valid',
            dirtyClass: 'dirty'
        },
        emptyMsg: 'Пожалуйста, заполните это поле',
        types: {
            tel: {
                messages: {
                    errorMsg: 'Введите корректный номер'
                },
                handler(el) {
                    let tel = el.value;
                    var pattern = /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/i;
                    return pattern.test(tel);
                }
            },
            email: {
                messages: {
                    errorMsg: 'Введите корректный email'
                },
                handler(el) {
                    let emailAddress = el.value
                    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
                    return pattern.test(emailAddress);
                }
            },
            password: {
                messages: {
                    errorMsg: 'Пароли не совпадают'
                },
                handler(el) {
                    console.log
                    let bindEls = $(el).closest('form').find(`[data-bind="${el.dataset.bind}"]`)
                    let bindEl = $(el).closest('form').find(`input[type="password"][data-type="retryPassword"]`)
                    bindEl.trigger('blur')
                    return true
                }
            },
            retryPassword: {
                messages: {
                    errorMsg: 'Пароли не совпадают'
                },
                handler(el) {
                    let bindEls = $(el).closest('form').find(`[data-bind="${el.dataset.bind}"]`)
                    let bindEl = $(el).closest('form').find(`input[type="password"]:not([data-type="retryPassword"])`)
                    let res = bindEls.toArray().every((el: HTMLInputElement) => el.value === (bindEls[0] as HTMLInputElement).value)
                    return bindEls.toArray().every((el: HTMLInputElement) => el.value === (bindEls[0] as HTMLInputElement).value)
                }
            }
        }
    }
    constructor(params?: Config) {
        if (params) mergeDeep(this.config, params)
        if (this.config.target) {
            let target = $(this.config.target as any);
            if (target.prop("tagName") === 'FORM') {
                target.submit((e: any) => this.checkFormStatus(e))
            }
            else target.click((e: any) => this.checkFormStatus(e))
            target.closest("form").find("input:required, textarea:required")
                .blur((e) => this.checker(e.currentTarget as HTMLInputElement | HTMLTextAreaElement))
                .each((ind: number, val: HTMLInputElement) => {
                    val.setCustomValidity(this.config.emptyMsg)
                })
            target.closest("form").find("input, textarea").blur((e) => e.currentTarget.classList.add(this.getStatusClass((e.currentTarget as HTMLInputElement), 'dirtyClass')))
        } else {
            throw new Error("can't set target options")
        }
    }
    checker(el: HTMLInputElement | HTMLTextAreaElement) {
        if (el.required && el.value && this.config.types[this.getType(el)] && this.config.types[this.getType(el)].handler) {
            this.config.types[this.getType(el)].handler(el) ? this.validAct(el) : this.errorAct(el)
        } else if (el.required) {
            el.value ? this.validAct(el) : this.errorAct(el);
        }
    }
    checkFormStatus(e: any) {
        var form = $(e.currentTarget).closest("form");
        form.find("input, textarea").each((ind: number, el: HTMLInputElement | HTMLTextAreaElement) => {
            this.checker(el)

        })
        if (form.find(".has-error").length) return false;
    }
    validAct(el: HTMLInputElement | HTMLTextAreaElement) {
        el.classList.remove(this.getStatusClass(el, 'errorClass'));
        el.classList.add(this.getStatusClass(el, 'validClass'));
        el.setCustomValidity("");
        (el as any).onkeyup = "";
    }
    errorAct(el: HTMLInputElement | HTMLTextAreaElement) {
        el.classList.remove(this.getStatusClass(el, 'validClass'));
        if (!el.classList.contains(this.getStatusClass(el, 'errorClass'))) {
            el.classList.add(this.getStatusClass(el, 'errorClass'));


            (el as any).onkeyup = (e: any) => this.checker(e.currentTarget as HTMLInputElement | HTMLTextAreaElement);
        } else if (el.validationMessage !== (el.value ? this.getErrMsg(el) : this.config.emptyMsg)) {
            el.setCustomValidity(el.value ? this.getErrMsg(el) : this.config.emptyMsg);
            console.log(el.value ? this.getErrMsg(el) : this.config.emptyMsg);
        }
    }
    getErrMsg(el: HTMLInputElement | HTMLTextAreaElement) {
        return el.dataset.errorMsg ? el.dataset.errorMsg : this.config.types[this.getType(el)] && this.config.types[this.getType(el)].messages && this.config.types[this.getType(el)].messages.errorMsg ? this.config.types[this.getType(el)].messages.errorMsg : this.config.emptyMsg
    }
    getStatusClass(el: HTMLInputElement | HTMLTextAreaElement, className: 'errorClass' | 'validClass' | 'dirtyClass') {
        return this.getPrefix(el) + (el.dataset[className] ? el.dataset[className] : this.config.types[this.getType(el)] && this.config.types[this.getType(el)].classes && this.config.types[this.getType(el)].classes[className] ? this.config.types[this.getType(el)].classes[className] : this.config.defaultClass[className])
    }
    getPrefix(el: HTMLInputElement | HTMLTextAreaElement) {
        return el.dataset.prefix ? el.dataset.prefix : this.config.types[this.getType(el)] && this.config.types[this.getType(el)].classes && this.config.types[this.getType(el)].classes.prefix ? this.config.types[this.getType(el)].classes.prefix : this.config.defaultClass.prefix ? this.config.defaultClass.prefix : ''
    }
    getType(el: HTMLInputElement | HTMLTextAreaElement) {
        return el.dataset.type ? el.dataset.type : el.type
    }
}

function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target: Object, ...sources: Object[]) {
    if (!sources.length) return false;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return true
}
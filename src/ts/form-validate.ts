/** form control */
declare let $: any;
import Validation from './Validation'
export namespace FormValidation {
    export function init() {
        //$('*[type=tel]').inputmask("+7 (999) 999-99-99");

        // $('*[data-inputmask]').each((ind: number, val: any) => {
        //     $(val).inputmask(val.dataset.inputmask);
        // })
        // $("input:required").each((ind: number, val: HTMLInputElement) => {
        //     val.setCustomValidity("Пожалуйста, заполните это поле")
        // })
        // $("form input,form textarea").blur(checker);
        // $("form .btn").click(checkFormStatus)

        var validator = new Validation();
    }
    // function checker() {
    //     if (!this.required && !this.value) {
    //         return true;
    //     } else {
    //         switch (this.type) {
    //             case "tel":
    //                 isValidTel(this.value) ? validAct(this) : errorAct(this);
    //                 break;
    //             case "email":
    //                 isValidEmail(this.value) ? validAct(this) : errorAct(this);
    //                 break;
    //             case "password":
    //                 if (this.dataset.required === 'only-empty') this.value ? validAct(this) : errorAct(this);
    //                 else if (this.dataset.mask)
    //                     isValidPass(this.value) ? validAct(this) : errorAct(this);
    //                 else if (this.dataset.required === 'retry') {
    //                     isValidRetry(this) ? validAct($(this.dataset.src)[0]) : errorAct($(this.dataset.src)[0]);
    //                     this.value ? validAct(this) : errorAct(this);
    //                 } else if (this.dataset.required === 'confirm') {
    //                     isValidRetry($(this.dataset.src)[0]) ? validAct(this) : errorAct(this);
    //                 }
    //                 break;
    //             default:
    //                 this.value ? validAct(this) : errorAct(this);
    //         }
    //         if (this.dataset.subType) {
    //             switch (this.dataset.subType) {
    //                 case "math-verify":
    //                     isValidMathOp(this) ? validAct(this) : errorAct(this);
    //             }
    //         }
    //     }

    // }
    // function checkFormStatus() {
    //     var form = $(this).closest("form");
    //     form.find("input, textarea").each(function (ind: number, el: HTMLInputElement) {
    //         checker.call(el);
    //     })
    //     //if (form.find(".has-error").length) return false;
    // }
    // function validAct(el: HTMLInputElement) {
    //     el.classList.remove("has-error");
    //     el.classList.add("valid");
    //     el.setCustomValidity("");
    //     (el as any).onkeyup = "";
    // }
    // function errorAct(el: HTMLInputElement) {
    //     el.classList.remove("valid");
    //     if (!el.classList.contains("has-error")) {
    //         el.classList.add("has-error");
    //         el.setCustomValidity("Пожалуйста, заполните это поле");
    //         (el as any).onkeyup = checker;
    //     }
    // }
    // function isValidTel(tel: string) {
    //     var pattern = /\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}/i;
    //     return pattern.test(tel);
    // }
    // function isValidEmail(emailAddress: string) {
    //     var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    //     return pattern.test(emailAddress);
    // }
    // function isValidMathOp(el: HTMLInputElement) {
    //     var valOp = eval(el.dataset.mathOp);
    //     var val = +el.value;
    //     return valOp === val;
    // }
    // function isValidPass(pass: string) {
    //     var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
    //     return pattern.test(pass);
    // }
    // function isValidRetry(inp: any) {
    //     var retryInp = $(inp.dataset.src)[0];
    //     return inp.value === retryInp.value;
    // }
}
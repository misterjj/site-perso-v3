import '../videos/home.mp4'
import "@fortawesome/fontawesome-free/js/all";
import * as _ from 'lodash';
import * as React from 'react'
import { render } from 'react-dom'
import Skills from "./components/Skills";
const axios = require('axios');
const Toast = require('bootstrap/js/dist/toast');

render(
    <Skills/>,
    document.getElementById('app-skills')
)

// aninmation navbar
const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY + "";
}
document.addEventListener('scroll', _.throttle(storeScroll, 150), { passive: true });
storeScroll();

// mail
const toastContactSuccess = new Toast(document.getElementById("toastContactSuccess"))
const toastContactError = new Toast(document.getElementById("toastContactError"))

const toastContact = document.getElementById("toastContact")
let toastList:typeof Toast = []
function popToast(
    title: string,
    message: string,
    type: string,
) {
    let id = 'toast-' + Date.now()
    toastContact.innerHTML = toastContact.innerHTML + `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" id="` + id + `">
            <div class="toast-header bg-` + type + ` text-light">
                <strong class="me-auto">` + title + `</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ` + message + `
            </div>
        </div>`.trim()

    toastList[id] = new Toast(document.getElementById(id))
    toastList[id]._element.addEventListener('hidden.bs.toast', () => {
        console.log('ici')
        console.log(toastList[id])
        toastList[id].dispose();
    })
    toastList[id].show()
}

const form = document.getElementById('form-contact')  as HTMLFormElement
if (form !== undefined) {
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        axios.post(
            'http://www.jonathanjorand.fr/mail.php',
            new FormData(form)
        ).then(() => {
            popToast('Félicitation', 'Votre message a bien été envoyé', 'success');
        }).catch(() => {
            popToast('Erreur', 'Echec lors de l\'envoi, veuillez réessayer ultérieurement', 'danger');
        })
    })
}
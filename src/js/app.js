//Declaracion de variables globales
let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt

//Funciones
const showPostModal=()=>{
    console.log("click modal abierto")
    MAIN.style.display = 'none';
    MODAL_POST.style.display='block'
    setTimeout(()=>{
        MODAL_POST.style.transform = 'translateY(0)'
    },1)
}

const closePostModal=()=>{
    MAIN.style.display='block'
    setTimeout(()=>{
        MODAL_POST.style.transform = 'translateY(100vh)'
    },1)
}


window.addEventListener("beforeinstallprompt",(e)=>{
    console.log("Evento de install prevenido")
    e.preventDefault();
    deferredPrompt =e;
})

window.addEventListener("load",async ()=>{
    MAIN = document.querySelector('#main');
    MODAL_POST = document.querySelector('#modal-post-section');
    BTN_SHOW_POST = document.querySelector('#btn-show-modal');
    BTN_SHOW_POST.addEventListener('click', showPostModal);
    BTN_CANCEL_POST = document.querySelector('#btn-post-cancel');
    BTN_CANCEL_POST.addEventListener('click', closePostModal);
    if(navigator.serviceWorker){
        const res= await navigator.serviceWorker.register("/sw.js")
        if(res){
            console.log("Service Worker registrado correctamente")
        }else{
            console.log("Ocurrio un error en el registro del service worker")
        }
    }
});

window.addEventListener('load', async () =>{
    const bannerInstall = document.querySelector("#banner-install")
    bannerInstall.addEventListener('click', async ()=>{
        if(deferredPrompt){
            deferredPrompt.prompt();
            const res = await deferredPrompt.userChoice;
            if(res.outcome =='accepted'){
                console.log("Usuario acepto la instalacion del promt")
            }else{
                console.log('Rechazo la instalacion')
            }
        }
    })
})


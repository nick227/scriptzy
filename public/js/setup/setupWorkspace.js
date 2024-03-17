
function setupWorkspace(demoHtml) {
    const demoPreloaderElm = document.querySelector('#demo-preloader');
    const demoPreloaderInterval = setInterval(() => {
        demoPreloaderElm.classList.toggle('hidden');
    }, 1000);
    


    const demoElm = document.querySelector('#stage');
    clearInterval(demoPreloaderInterval);
    demoElm.innerHTML = demoHtml;
}

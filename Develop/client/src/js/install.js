const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    console.log('👍', 'beforeinstallprompt', event);
    butInstall.hidden = false;
    window.deferredPrompt = event;
});
// TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async (event) => {
    console.log('👍', 'butInstall-clicked');
    butInstall.style.display = 'none';
    deferredPrompt = window.deferredPrompt;
    deferredPrompt.prompt();
    const { outcome } = await promptEvent.userChoice;
    if (!outcome) {
        // The deferred prompt isn't available.
        return;
    }
    console.log(`User response to the install prompt: ${outcome}`);
    window.deferredPrompt = null;
   
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    butInstall.style.display = 'none';
    console.log('👍', 'appinstalled', event);
});
// Example functionality: Displaying a simple message when the page loads
window.addEventListener('load', () => {
    console.log("Welcome to the 2025 National Clogging Convention!");

    // Declare variables for the install prompt and banner
    let deferredPrompt;
    const installBanner = document.getElementById('install-banner');
    const installBtn = document.getElementById('install-btn');

    // Listen for the beforeinstallprompt event to capture the install prompt
    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent the default behavior (the mini-infobar)
        event.preventDefault();
        
        // Save the event so it can be triggered later
        deferredPrompt = event;
        
        // Show the "Add to Home Screen" banner
        installBanner.style.display = 'block';

        // When the install button is clicked, trigger the install prompt
        installBtn.addEventListener('click', () => {
            installBanner.style.display = 'none'; // Hide the banner
            deferredPrompt.prompt(); // Show the install prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                console.log(choiceResult.outcome);
                deferredPrompt = null; // Reset the deferred prompt
            });
        });
    });

    // Hide the banner if the user dismisses it
    installBanner.querySelector('button').addEventListener('click', () => {
        installBanner.style.display = 'none';
    });
});


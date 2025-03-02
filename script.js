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

    // Add Firebase token retrieval logic
    initializeFirebaseMessaging();
});

// Function to initialize Firebase Messaging and get FCM token
function initializeFirebaseMessaging() {
    // Make sure Firebase is loaded and messaging is available
    if (firebase && firebase.messaging) {
        const messaging = firebase.messaging();

        // Request permission to send notifications
        messaging.requestPermission()
            .then(() => {
                console.log("Notification permission granted.");
                return messaging.getToken(); // Retrieve the FCM token
            })
            .then((token) => {
                console.log("FCM Token retrieved:", token);
                // Here, you would typically send the token to your server for storage
                // For example, save it in your backend database so you can send messages
                saveTokenToServer(token);
            })
            .catch((error) => {
                console.error("Error while getting permission or token:", error);
            });
    } else {
        console.error("Firebase Messaging is not available.");
    }
}

// Example function to save the token to your server
function saveTokenToServer(token) {
    // Send the token to your server (replace with your server API)
    fetch('/save-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    })
    .then(response => response.json())
    .then(data => {
        console.log("Token saved to server:", data);
    })
    .catch(error => {
        console.error("Error saving token:", error);
    });
}



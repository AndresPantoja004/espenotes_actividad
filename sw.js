self.addEventListener('install', (event) => {
    console.info('Service Worker installing...');
});

self.addEventListener('activate', (event) => {
    console.info('Service Worker activating...');
});

self.addEventListener("fetch", (event)=>{
    console.info("Service fetch activate")
})
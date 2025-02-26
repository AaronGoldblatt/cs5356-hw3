async function fetchKanyeQuote() {
    try {
        const response = await fetch('https://api.kanye.rest/');
        const data = await response.json();
        const speechBubble = document.querySelector('.kanye-speech-bubble');
        speechBubble.textContent = data.quote;
    } catch (error) {
        console.error('Error fetching Kanye quote:', error);
        speechBubble.textContent = 'The wisdom of Kanye West is not available at this time (he is probably busy being a billionaire). Please try again later.';
    }
}

document.querySelector('.kanye-speech-bubble').addEventListener('click', fetchKanyeQuote);

const kanyeContainer = document.querySelector('.kanye-image');
const kanyeImg = kanyeContainer.querySelector('img');
let holdTimer;
let originalKanyeWestPicture;

function createKanyeWestYouTubeEmbed() {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = '60%';
    container.style.paddingBottom = '33.75%';
    container.style.display = 'flex';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';

    // Create the iframe with minimal controls to replace the original image and autoplay
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube.com/embed/sCUs_-PjC-E?" + 
        "autoplay=1" +          
        "&controls=0" +         
        "&disablekb=1" +       
        "&fs=0" +              
        "&modestbranding=1" +   
        "&rel=0" +             
        "&iv_load_policy=3" +  
        "&playsinline=1" + 
        "&mute=0";  
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.transition = 'all 0.3s ease';
    
    // Create a clickable overlay to go with the iframe to terminate the replacement and revert to the original image, with the listener attached to it
    const clickOverlay = document.createElement('div');
    clickOverlay.style.position = 'absolute';
    clickOverlay.style.top = '0';
    clickOverlay.style.left = '0';
    clickOverlay.style.width = '100%';
    clickOverlay.style.height = '100%';
    clickOverlay.style.cursor = 'pointer';
    
    container.appendChild(iframe);
    container.appendChild(clickOverlay);
    
    // When the click overlay is clicked, replace the container with the original image and attach the hold listener to it
    clickOverlay.addEventListener('click', () => {
        kanyeContainer.replaceChild(originalKanyeWestPicture, container);
        attachHoldListener(originalKanyeWestPicture);
    });

    return container;
}

function attachHoldListener(imageElement) {
    imageElement.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    imageElement.addEventListener('mousedown', () => {
        originalKanyeWestPicture = imageElement.cloneNode(true);
        
        // When the image is held down for 3 seconds, replace the image with the iframe
        holdTimer = setTimeout(() => {
            const kanyeWestYouTubeEmbed = createKanyeWestYouTubeEmbed();
            kanyeContainer.replaceChild(kanyeWestYouTubeEmbed, imageElement);
        }, 3000);
    });

    imageElement.addEventListener('mouseup', cancelHold);
    imageElement.addEventListener('mouseleave', cancelHold);
}

function cancelHold() {
    clearTimeout(holdTimer);
}

attachHoldListener(kanyeImg);
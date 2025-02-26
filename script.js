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
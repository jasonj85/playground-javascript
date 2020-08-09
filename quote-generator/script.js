const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiRetry = 0;

// show loader icon
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading icon
function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from api
async function getQuote() {
    showLoadingSpinner();

    // personal cors proxy
    const proxy = 'https://murmuring-caverns-60366.herokuapp.com/';

    const url = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxy + url);
        const data = await response.json();

        authorText.innerText = data.quoteAuthor === '' ? 'Unknown' : data.quoteAuthor;

        // reduce font for long quotes
        if (data.quoteText.length > 80 ) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;

        hideLoadingSpinner();
        apiRetry = 0;
        
    } catch (error) {
        console.log(error);
        apiRetry++;
        if (apiRetry < 5) getQuote();
        else throw alert('Unable to load quotes please try again later...');
    }
}

// send quote to new twitter post
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(url, '_blank');
}

// event listeners
newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);
    
// on page load
getQuote();
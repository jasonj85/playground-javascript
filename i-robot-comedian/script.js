
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// toggle button disabled
function toggleButton() {
    button.disabled = !button.disabled;
}

// passing joke to Voice API
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'xxx',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// get jokes from API
async function getJokes() {
    let joke = '';
    const apiUrl= "https://sv443.net/jokeapi/v2/joke/programming";

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.setup) {
            // two part joke
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            // one part joke
            joke = data.joke;
        }

        tellMe(joke);

        // disable button
        toggleButton();

    } catch (error) {
        console.log(error);
    }
}

// event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
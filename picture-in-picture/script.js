const videoEl = document.getElementById('video');
const btn = document.getElementById('button');

// prompt to choose the media stream 
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoEl.srcObject = mediaStream;
        videoEl.onloadeddata = () => {
            videoEl.play();
        }
        
    } catch (error) {
       console.log(error); 
    }
}

button.addEventListener('click', async () => {
    button.disabled = true;
    await videoEl.requestPictureInPicture();
    button.disabled = false;
});

// on load
selectMediaStream();
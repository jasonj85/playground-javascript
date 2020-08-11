const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'cuqEyZrA2-roD-WZ9a4kaHYGi2tPFthqDfWRbY0TBE0';
const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;

// check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// helper function
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// create elements for links and photos
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;

    photosArray.forEach((photo) => {
        // create link
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        // create img
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        // event listener. check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // set elements
        item.appendChild(img);
        imageContainer.appendChild(item);
    });

    console.log('images were loaded...');
}

// get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {

    }
}

// check if scroll is near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos();
    }
});

// on load
getPhotos();
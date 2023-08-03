

// Our Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggleButton = player.querySelector('.toggle');
const volumeSlider = player.querySelector('input[name="volume"]');
const playbackRateSlider = player.querySelector('input[name="playbackRate"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Functions

// Toggle between play and pause when the play button or the video itself is clicked
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

// Update the play button icon to reflect the current video state (play or pause)
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggleButton.textContent = icon;
}

// Handle changes in volume and playback rate using the input sliders
function handleSliderChange() {
    // 'this' refers to the slider element, and 'this.name' refers to its 'name' attribute (volume or playbackRate)
    // Update the corresponding property of the video (volume or playbackRate) with the slider value
    video[this.name] = this.value;
    console.log(this.name);
    console.log(this.value);
}

// Skip the video forward or backward by the specified amount (data-skip attribute)
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

// Update the progress bar to reflect the current progress of the video
function updateProgressBar() {
    const progressPercentage = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progressPercentage}%`;
}

// Scrub through the video when clicking and dragging on the progress bar
function scrub(e) {
    // Calculate the time to skip to based on the click position relative to the progress bar width
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

// Hook up event listeners

// Toggle play/pause when the video or the play button is clicked
video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);

// Update the play button icon based on video playback state
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Update the progress bar as the video plays
video.addEventListener('timeupdate', updateProgressBar);

// Handle changes in volume and playback rate using sliders
volumeSlider.addEventListener('input', handleSliderChange);
playbackRateSlider.addEventListener('input', handleSliderChange);

// Skip the video forward or backward by the specified amount (data-skip attribute)
skipButtons.forEach(button => button.addEventListener('click', skip));

// Set up the scrubbing functionality for the progress bar
let mousedown = false; // A flag to track if the mouse button is currently pressed
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); // Only scrub when mousedown is true (click and drag)
progress.addEventListener('mousedown', () => mousedown = true); // Set mousedown to true when the mouse is pressed down
progress.addEventListener('mouseup', () => mousedown = false); // Set mousedown to false when the mouse is released

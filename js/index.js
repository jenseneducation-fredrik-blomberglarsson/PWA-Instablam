let imgUrl = new Image();
let oldValue = 0;

let brightnessSlider = document.getElementById('brightness-slider');
let brightnessOutput = document.getElementById('brightness-value');
brightnessOutput.innerHTML = brightnessSlider.value;

let vibranceSlider = document.getElementById('vibrance-slider');
let vibranceOutput = document.getElementById('vibrance-value');
vibranceOutput.innerHTML = vibranceSlider.value;

let contrastSlider = document.getElementById('contrast-slider');
let contrastOutput = document.getElementById('contrast-value');
contrastOutput.innerHTML = contrastSlider.value;

let saturationSlider = document.getElementById('saturation-slider');
let saturationOutput = document.getElementById('saturation-value');
saturationOutput.innerHTML = saturationSlider.value;

let sharpenSlider = document.getElementById('sharpen-slider');
let sharpenOutput = document.getElementById('sharpen-value');
sharpenOutput.innerHTML = sharpenSlider.value;

let noiseSlider = document.getElementById('noise-slider');
let noiseOutput = document.getElementById('noise-value');
noiseOutput.innerHTML = noiseSlider.value;

//Brightness
brightnessSlider.oninput = function () {
  brightnessOutput.innerHTML = this.value;
  changeBrightness(this.value);
}

function changeBrightness(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.brightness(value - oldValue);
    oldValue = value;
    this.render();
  });
}

//Vibrance
vibranceSlider.oninput = function () {
  vibranceOutput.innerHTML = this.value;
  changeVibrance(this.value);
}

function changeVibrance(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.vibrance(value - oldValue);
    oldValue = value;
    this.render();
  });
}

//Contrast
contrastSlider.oninput = function () {
  contrastOutput.innerHTML = this.value;
  changeContrast(this.value);
}

function changeContrast(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.contrast(value - oldValue);
    oldValue = value;
    this.render();
  });
}

//Saturation
saturationSlider.oninput = function () {
  saturationOutput.innerHTML = this.value;
  changeSaturation(this.value);
}

function changeSaturation(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.saturation(value - oldValue);
    oldValue = value;
    this.render();
  });
}

//Sharpen
sharpenSlider.oninput = function () {
  sharpenOutput.innerHTML = this.value;
  changeSharpen(this.value);
}

function changeSharpen(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.sharpen(value - oldValue);
    oldValue = value;
    this.render();
  });
}

//Noise
noiseSlider.oninput = function () {
  noiseOutput.innerHTML = this.value;
  changeNoise(this.value);
}

function changeNoise(value) {
  Caman('#photo', imgUrl, function () {
    if (value == 0) {
      this.revert();
    }
    console.log(value - oldValue);
    this.noise(value - oldValue);
    oldValue = value;
    this.render();
  });
}





async function captureImage(stream) {
  const mediaTrack = stream.getVideoTracks()[0];
  console.log(mediaTrack);
  const captureImg = new ImageCapture(mediaTrack);
  const photo = await captureImg.takePhoto()
  console.log(photo)
  const imgUrl = URL.createObjectURL(photo);
  console.log(imgUrl);
  document.querySelector('#photo').src = imgUrl;
  if (document.querySelector('canvas') !== null) {
    document.querySelector('#photo').removeAttribute('data-caman-id');
    const switch_img = imgUrl
    renderCanvas('#photo', switch_img);
  }
}

function renderCanvas(DOMid, src) {
  Caman(DOMid, src, function () {
    this.render();
  })
}

async function getMedia() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const videoElem = document.querySelector('#me');
    videoElem.srcObject = stream;
    videoElem.addEventListener('loadedmetadata', () => {
      videoElem.play();
    })
    console.log(stream);
  } catch (error) {
    console.log(error);
  }
}

getMedia();

document.querySelector('#addImage').addEventListener('click', event => {
  captureImage(stream);
})



function registrateServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js')
      .then((registration) => console.log('Registered service worker'))
      .catch(error => console.log('Error with register service worker'));
  }
}

registrateServiceWorker();
let constraints = {
    video: {width: 500, height: 500},
    audio: false
};

let video = document.getElementById("video");
let getUserMedia;
function getMedia() {            

    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
  
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
    
            getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
            if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
            }
        
            return new Promise(function(resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        }
    }
  
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        getUserMedia = stream
        if ("srcObject" in video) {
            video.srcObject = getUserMedia;
        } else {
            video.src = window.URL.createObjectURL(getUserMedia);
        }
            video.onloadedmetadata = function(e) {
            video.play();
        };
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
}
function closeMedia() {
    if (getUserMedia) {
        const tracks = getUserMedia.getTracks()
        tracks[1].stop()
        getUserMedia = null
    }
}

function takePhoto() {
    let canvas = document.getElementById("canvas");      
    let ctx = canvas.getContext('2d');      
    ctx.drawImage(video, 0, 0, 500, 500);      
}
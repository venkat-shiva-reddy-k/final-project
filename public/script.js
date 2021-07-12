var inputs = document.querySelectorAll('.inputfile');

var file_name = document.getElementById('file_name');

const userImg = document.getElementById('img');

Array.prototype.forEach.call(inputs, function (input) {
    input.addEventListener('change', function (e) {
        var fileName = e.target.value.split('\\').pop();
        if (fileName) {
            file_name.innerHTML = fileName;
        }
        else {
            file_name.innerHTML = 'No Name Image';
        }

    });
});

function uploadImage(file) {
    let url = 'http://localhost:3000/uploadImage';
    fetch(url, {
        method: 'POST',
        body: file
    }).then((response) => {
        response.json().then((data) => {
            if (data['status'] === 'success') {
                var message = document.getElementById("response-msg");
                message.innerHTML = 'Image Uploaded!';
                message.classList.remove('msg-err');
                message.classList.add('msg');
            }
            else {
                var message = document.getElementById("response-msg");
                message.innerHTML = data['error'];
                message.classList.remove('msg');
                message.classList.add('msg-err');
            }
        })
    });
}

function upload() {
   convertToBase64();
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function convertToBase64() {
    const result = await toBase64(userImg.files[0]).catch(e => Error(e));
    if (result instanceof Error) {
        console.log('Error: ', result.message);
        return;
    }

    var block = result.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    var blob = b64toBlob(realData, contentType);
    var data = new FormData()
    data.append('image', blob)
    uploadImage(data);
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function getImages() {
    let url = 'http://localhost:3000/userImages';
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        response.json().then((data) => {
            if (data['status'] === 'success') {
                for (let i in data['result']) {

                    var img = document.createElement('img');
                    img.src = 'data:'+data['result'][i]['img_type']+';base64,'+data['result'][i]['img_data'];
                    document.getElementById('userImagesDiv').appendChild(img);

                }
            }
        })
    });
}

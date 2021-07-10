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
   
}

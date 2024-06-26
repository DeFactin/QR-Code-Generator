const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

function onGenerateSubmit (e){
    e.preventDefault();
    clearUI();
    const url =document.getElementById('url').value;
    const size =document.getElementById('size').value;

    if(url ===''){
        alert('Please enter a url');
    }
    else{
        showSpinner();

        setTimeout(function() {
            hideSpinner();
            generateQRCode(url, size);
            setTimeout(function(){
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            },50);
        }, 1000);
    }
};

function generateQRCode(url,size){
    const qrcode = new QRCode("qrcode",{
        text:url,
        width:size,
        height:size
    });
}

function showSpinner(){
    document.getElementById('spinner').style.display='block';
}
function hideSpinner(){
    document.getElementById('spinner').style.display='none';
}


function clearUI(){
    qr.innerHTML='';
    const saveBtn = document.getElementById('save-link');
    if(saveBtn)
        saveBtn.remove();
}

function createSaveBtn(saveUrl){
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded width-1/3 m-a my-5';
    link.href = saveUrl;
    link.download='qrcode';
    link.innerHTML='Save image';
    document.getElementById('generated').appendChild(link);
}

hideSpinner();

form.addEventListener('submit',onGenerateSubmit);
let Images = new Array();
let deleteImage;
let insert = document.getElementById("Images");
let i = 0;
let preBuffer = new Array();
let whichImage;
let point = 0;

Images[0] = 'Images/Quiz%20Images/Tomato.jpg';
Images[1] = 'Images/Quiz%20Images/Cucumber.jpg';
Images[2] = 'Images/Quiz%20Images/Lettuce.jpg';

let maxpoint = Images.length;
function GetImage(){
    for (let i = 0; i < Images.length; i++){
        preBuffer[i] = new Image();
        preBuffer[i].src = Images[i];
    }
    whichImage = Math.round(Math.random() * (Images.length - 1));
    showImage();
}

$(document).on("keypress", function (e){
    if(e.which == 13){
        Done();
    }
})

function Score(){
    let score = document.getElementById("Score");
    score.innerText = point + "/" + maxpoint;
    score.setAttribute("style", "font-family: Calibri, sans-serif; color: gray")
}

function showImage(){
    console.log(Images.length);
    if(Images.length < 1){
        document.getElementById("GreatJob").removeAttribute("style");
        document.getElementById("TheImage").setAttribute("style", "display: none");
        document.getElementById("NextBtn").disabled = true;
        document.getElementById("DoneBtn").disabled = true;
    }
    else{
        insert.innerHTML += "<img id='TheImage' class='QuizImage' src='"+ Images[whichImage] + "' alt='No Image Found'>"
        console.log("Yes");
        deleteImage = Images[whichImage];
    }
}

window.onload = function (){
    GetImage();
    Score();
}

function Done(){
    let value = document.getElementById("Answer").value;
    let TheImage = document.getElementById("TheImage").src;
    let ImageName = TheImage.replace(/^.*[\\\/]/, '');
    let Image = ImageName.replace(/\.[^/.]+$/, "");
    let button = document.getElementById("DoneBtn");
    let answer = document.getElementById("Answer");
    let NextBtn = document.getElementById("NextBtn");
    if(value == Image){
        answer.value = "Great Job!" ;
        answer.disabled = true;
        button.disabled = true;
        button.setAttribute("style", "background-color: #4CAF50");
        NextBtn.innerText = "Next";
        NextBtn.removeAttribute("style");
        NextBtn.setAttribute("onclick", "Next()");
        point++;
        Score();
    }
    else{
        answer.value = "Wrong!" + '\t' + "The answer was: ";
        let correct = document.getElementById("CorrectAnswer");
        correct.innerHTML = "<p style='font-family: Calibri, sans-serif'>"+ Image +"</p>"
        answer.disabled = true;
        button.disabled = true;
        button.setAttribute("style", "background-color: firebrick");
        NextBtn.innerText = "Retry";
        NextBtn.removeAttribute("style");
        NextBtn.setAttribute("onclick", "Retry()");
    }
}

function Retry(){
    location.reload();
}


function Next(){
    let image = document.getElementById("TheImage");
    document.getElementById("Images").removeChild(image);
    Images.splice($.inArray(deleteImage, Images), 1);
    GetImage();
    NextGuess();
    /*delete Images[deleteImage];
    Images.length -= 1;
    if(Images.length == 0){
        document.getElementById("GreatJob").removeAttribute("style");
        document.getElementById("TheImage").setAttribute("style", "display: none");

    }
    else{
        i = 0;
        let preBuffer = new Array();
        for (let i = 0; i < Images.length; i++){
            preBuffer[i] = new Image();
            preBuffer[i].src = Images[i];
        }
        whichImage = Math.round(Math.random() * (Images.length - 1));
        document.getElementById("TheImage").src = Images[whichImage];
        NextGuess();
    }*/
}

function NextGuess(){
    document.getElementById("Answer").value = null;
    document.getElementById("Answer").disabled = false;
    document.getElementById("DoneBtn").disabled = false;
    document.getElementById("NextBtn").setAttribute("style", "display: none");
}

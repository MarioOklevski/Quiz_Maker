let Images = new Array();
let deleteImage;
let insert = document.getElementById("Images");
let preBuffer = new Array();
let whichImage;
let point = 0;
let i = 0;
let flag = 0;
let start = 0;
let TheRetry = new Array();
let maxpoint
function First(){
    if(start == 0){
        Images[0] = 'Images/Quiz%20Images/Tomato.jpg';
        Images[1] = 'Images/Quiz%20Images/Cucumber.jpg';
        Images[2] = 'Images/Quiz%20Images/Lettuce.jpg';
        TheRetry[0] = 'Images/Quiz%20Images/Tomato.jpg';
        TheRetry[1] = 'Images/Quiz%20Images/Cucumber.jpg';
        TheRetry[2] = 'Images/Quiz%20Images/Lettuce.jpg';
        maxpoint = Images.length;
    }
}

window.onload = function (){
    First();
    GetImage();
    Score();
    $("#NextBtn").hide();
    $("#TheMaker").hide();
}

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
    score.setAttribute("style", "font-family: Calibri, sans-serif; color: gray");
}

function showImage(){
    insert.innerHTML = null;
    insert.innerHTML += "<img id='TheImage' class='QuizImage' src='"+ Images[whichImage] + "' alt='No Image Found'>"
    console.log("Yes");
    deleteImage = Images[whichImage];
}

let TheAnswer;
let YesImage
let TheImage;
let ImageName;
function Try(){
    if(start == 0){
        TheImage = document.getElementById("TheImage").src;
    }
    else{
        TheImage = TheAnswer;
    }
    ImageName = TheImage.replace(/^.*[\\\/]/, '');
    YesImage = ImageName.replace(/\.[^/.]+$/, "");

}

function Done(){
    let value = document.getElementById("Answer").value;
    let answer = document.getElementById("Answer");
    let button = document.getElementById("DoneBtn");
    let NextBtn = document.getElementById("NextBtn");
    Try();
    if(value == YesImage){
        answer.value = "Great Job!" ;
        answer.disabled = true;
        button.disabled = true;
        button.setAttribute("style", "background-color: #4CAF50");
        NextBtn.innerText = "›";
        $("#NextBtn").show();
        NextBtn.setAttribute("onclick", "Next()");
        point++;
        Score();
        if(point == maxpoint){
            $("#NextBtn").hide();
            $("#TheImage").hide();
            document.getElementById("Images").innerHTML = "<img id='GreatJob' src='Images/Quiz%20Images/fireworks-well-done.gif' alt='No image found'>";
            document.getElementById("NextBtn").disabled = true;
            document.getElementById("DoneBtn").disabled = true;
        }
    }
    else{
        answer.value = "Wrong! You answered: "+ value;
        let correct = document.getElementById("CorrectAnswer");
        correct.innerHTML = "<p style='font-family: Calibri, sans-serif'>The correct answer was:<br>"+ YesImage +"</p>"
        answer.disabled = true;
        button.disabled = true;
        button.setAttribute("style", "background-color: firebrick");
        NextBtn.innerText = "⟳";
        $("#NextBtn").show();
        NextBtn.setAttribute("onclick", "Retry()");
    }
}

function Retry(){
    alert(TheRetry.length)
    Images = TheRetry;
    alert(Images.length);
    point = 0;
    Score();
    GetImage();
    document.getElementById("DoneBtn").removeAttribute("style");
    document.getElementById("CorrectAnswer").innerHTML = null;
    NextGuess();
}


function Next(){
    document.getElementById("Images").innerHTML = null;
    Images.splice($.inArray(deleteImage, Images), 1);
    GetImage();
    NextGuess();
}

function NextGuess(){
    document.getElementById("Answer").value = null;
    document.getElementById("Answer").disabled = false;
    document.getElementById("DoneBtn").disabled = false;
    $("#NextBtn").hide();
}

$(document).ready(function (){
    $("#Maker").on("click", function (){
        document.getElementById("Answer").value = null;
        document.getElementById("Answer").disabled = false;
        document.getElementById("DoneBtn").disabled = false;
        $("#NextBtn").hide();
        $("#TheQuiz").hide();
        $("#TheMaker").show();
        Images = [];
    })

    $("body").on("change", ".f1", function (){
        $("#imgContainer").html = "";
        let fileInput = $(this)[0];
        let file = fileInput.files[0];
        let reader = new FileReader();
        reader.onload = function (e){
            let img = "<img class='SelectedImages' src='"+ reader.result +"' alt='No Image Found'>";
            localStorage.theImage = reader.result;
            document.getElementById("imgContainer").innerHTML += img;
        }
        reader.readAsDataURL(file);
        TheAnswer = document.getElementById("fileContainer").value;
        flag = 1;
        Images[i] = TheAnswer;
        i++;
    });

    /*$('input#fileContainer').on('change', function (){
        var reader = new FileReader();
        reader.onload = function (e) {
            var thisImage = reader.result;
            localStorage.setItem("imgData", thisImage);
        };
        reader.readAsDataURL(this.files[0]);
        if(flag){
            document.getElementById("Confirmation").remove();
            flag = 0;
        }

        $("#Preview").prop("src", localStorage.getItem("imgData"));
        document.getElementById("Preview").removeAttribute("style");

        $(this).attr("value", "");

    });*/

    $("#Start").on("click", function (){
        document.getElementById("imgContainer").innerHTML = "";
        document.getElementById("fileContainer").value = null;
        i = 0;
        TheRetry = [];
        for(let j = 0; j < Images.length; j++){
            TheRetry[j] = Images[j];
        }
        alert(TheRetry.length);
        start = 1;
        maxpoint = Images.length;
        point = 0;
        localStorage.clear();
        GetImage();
        Score();
        $("#TheMaker").hide();
        $("#TheQuiz").show();
    });
})
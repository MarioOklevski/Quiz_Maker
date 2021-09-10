let i = 0;
$(document).ready(function (){
    $("#DoneBtn").hide();
    $('input#fileContainer').on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            var thisImage = reader.result;
            localStorage.setItem("imgData", thisImage);
        };
        reader.readAsDataURL(this.files[0]);
        $("#DoneBtn").show();
    });

    $("#DoneBtn").on("click", function (){
        var dataImage = localStorage.getItem('imgData');
        Images = new Array();
        Images[i] = dataImage;
        //var imgCtr = $('<img/>').prop('src', Images[i]);
        //$('div#imgContainer').append(imgCtr);
        i++;
        $("#DoneBtn").hide();
    });
    $("#Start").on("click", function (){
        i = 0;
        $("body").load("Quiz.html");
    });
});
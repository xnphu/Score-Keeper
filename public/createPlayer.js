const params = new URL(window.location.href).pathname.split("/");
const scoreId = params[params.length - 1];
var count =1;

$.ajax({
    type: "GET",
    url: "/scoredetail/" + scoreId,
    success: function (response) {
        if (response) {
            score = response.scoreFound;
            $("#playerName1").text(score.playerName1);
            $("#playerName2").text(score.playerName2);
            $("#playerName3").text(score.playerName3);
            $("#playerName4").text(score.playerName4);

            $("#score1").text(score.score1);
            $("#score2").text(score.score2);
            $("#score3").text(score.score3);
            $("#score4").text(score.score4);
        }
    },
    error: function (error) {
        console.log(error);
    }
});



$(document).ready(function(){
    $("#add-row").click(function(){
        count++;
        var round = $("#round").val()+ "Round " +count;
        var score1 = $("#score1").val();
        var score2 = $("#score2").val();
        var score3 = $("#score3").val();
        var score4 = $("#score4").val();
        var markup = "<tr><td>" + round + "</td><td><input class='col1' type='number'" + score1 + "/></td><td><input class='col2' type='number'" + score2 + "/></td><td><input class='col3' type='number'" + score3 + "/></td><td><input class='col4' type='number'" + score4 + "/></td></tr>";
        $("table tbody").append(markup);
    });
})
;   

// $.ajax({
//     url: "http://localhost:3001/updateScore",
//     type: "POST",
//     data: $(".ip"),
//     success: function(response) {
//         if(response.success) {
        
//         }
//     },
//     error: function(err) {
//         console.log(err);
//     }
// });
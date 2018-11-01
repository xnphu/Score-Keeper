const params = new URL(window.location.href).pathname.split("/");
const tableId = params[params.length - 1];

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/tabledetail/" + tableId,
        success: function (response) {
            if (response) {
                table = response.tableFound;
                console.log(table)
                console.log(table.round.length)
                $("#playerName1").text(table.playerName1);
                $("#playerName2").text(table.playerName2);
                $("#playerName3").text(table.playerName3);
                $("#playerName4").text(table.playerName4);
                loadOldRound(table);
                updateSum();
            }
        },
        error: function (error) {
            console.log(error);
        }
    });
});

$("#add-round").click(function () {
    $.ajax({
        type: "POST",
        url: "/addRound/" + tableId,
        success: function () {
            addNewRound();
            updateSum();
        },
        error: function (err) {
            console.log(err);
        }
    });
});

$(document).on("input", ".form-control", function () {
    let row = $(this).data("row");
    let col = $(this).data("col");
    let val = $(this).val();
    $.ajax({
        type: "POST",
        url: "/updateScore/" + tableId,
        data: { row: row, col: col, val: val },
        success: function (response) {
            if (response) {
                updateSum();
            }
        },
        error: function (err) {
            console.log(err);
        }
    });
});

function addNewRound() {
    var roundIndex = $(".table tbody tr").length;
    var newRound = `
        <tr>
            <td>  Round ${roundIndex} </td>
            <td>
                <input type="number" class="form-control" data-row=${roundIndex} data-col="1" value="0"/>
            </td>
            <td>
                <input type="number" class="form-control" data-row=${roundIndex} data-col="2" value="0"/>
            </td>
            <td>
                <input type="number" class="form-control" data-row=${roundIndex} data-col="3" value="0"/>
            </td>
            <td>
                <input type="number" class="form-control" data-row=${roundIndex} data-col="4" value="0"/>
            </td>
        </tr>
        `;
    $("table tbody").append(newRound);
}

function loadOldRound(response) {
    for (let roundIndex = 1; roundIndex < response.round.length; roundIndex++) {
        var oldRound = `
            <tr>
                <td scope="row">  Round ${roundIndex} </td>
                <td>
                    <input type="number" class="form-control" data-row=${roundIndex} data-col="1" value="${response.round[roundIndex][0]}"/>
                </td>
                <td>
                    <input type="number" class="form-control" data-row=${roundIndex} data-col="2" value="${response.round[roundIndex][1]}"/>
                </td>
                <td>
                    <input type="number" class="form-control" data-row=${roundIndex} data-col="3" value="${response.round[roundIndex][2]}"/>
                </td>
                <td>
                    <input type="number" class="form-control" data-row=${roundIndex} data-col="4" value="${response.round[roundIndex][3]}"/>
                </td>
            </tr>
            `;
        $("table tbody").append(oldRound);
    }
}

function updateSum() {
    $.ajax({
        type: "GET",
        url: "/tabledetail/" + tableId,
        success: function (response) {
            if (response) {
                table = response.tableFound;
                var sum1 = 0;
                var sum2 = 0;
                var sum3 = 0;
                var sum4 = 0;
                for (var i = 1; i < table.round.length; i++) {
                    sum1 += table.round[i][0];
                    sum2 += table.round[i][1];
                    sum3 += table.round[i][2];
                    sum4 += table.round[i][3];
                }
                $("#sumScore1").text(sum1);
                $("#sumScore2").text(sum2);
                $("#sumScore3").text(sum3);
                $("#sumScore4").text(sum4);
            }
        }
    });
}


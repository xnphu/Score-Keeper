const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const TableModel = require('./models/tableModel')

mongoose.connect("mongodb://localhost/scorekeeper", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success");
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/createTable', (req, res) => {
    TableModel.create(
        {
            playerName1: req.body.playerName1,
            playerName2: req.body.playerName2,
            playerName3: req.body.playerName3,
            playerName4: req.body.playerName4,
            round: [[0, 0, 0, 0]]
        },
        (err, tableCreated) => {
            if (err) console.log(err);
            else res.redirect('/games/' + tableCreated._id);
        });
});

app.get('/tabledetail/:tableId', (req, res) => {
    let tableId = req.params.tableId;

    TableModel.findById(tableId, (err, tableFound) => {
        if (err) console.log(err)
        else if (!tableFound) console.log("Not Found")
        else {
            res.send({ success: 1, tableFound: tableFound });
        }
    });
});

app.get('/games/:tableId', (req, res) => {
    res.sendFile(__dirname + '/public/score.html');
});

app.post('/addRound/:tableId', (req, res) => {
    let tableId = req.params.tableId;

    TableModel.findById(tableId , (err, tableFound) => {
        if (err) console.log(err)
        else if (!tableFound) console.log("Not Found")
        else {
            tableFound.round.push([0, 0, 0, 0]);
            tableFound.markModified("round");
            tableFound.save((err) => {
                if (err) console.log(err)
                else res.send({ success: 1 });
            });
        }
    });
});

app.post('/updateScore/:tableId', (req, res) => {
    let tableId = req.params.tableId;
    const { row, col, val } = req.body;

    TableModel.findById(tableId, (err, tableFound) => {
        if (err) console.log(err)
        else if (!tableFound) console.log("Not Found")
        else {
            tableFound.round[row][col-1] = val;
            tableFound.markModified("round");
            tableFound.save((err) => {
                if (err) console.log(err)
                else res.send({ success: 1});
            });
        }
    });
});


app.use(express.static('public'));

app.listen(1808, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1808');
});
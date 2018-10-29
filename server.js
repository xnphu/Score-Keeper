const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const ScoreModel = require('./models/scoreModel')

mongoose.connect("mongodb://localhost/scorekeeper", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success");
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/createScoreName', (req, res) => {
    ScoreModel.create(
        {
            playerName1: req.body.playerName1,
            playerName2: req.body.playerName2,
            playerName3: req.body.playerName3,
            playerName4: req.body.playerName4
        },
        (err, scoreCreated) => {
            if (err) console.log(err);
            else res.redirect('/games/' + scoreCreated._id);
        });
});

// app.get('/games/:scoreId', (req, res) => {
//     ScoreName = req.body.ScoreName;
//     console.log(ScoreName);
//     res.send('<h1>' + ScoreName + '<h1>');
// });

app.get('/scoredetail/:scoreId', (req, res) => {
	let scoreId = req.params.scoreId;

	ScoreModel.findById(scoreId)
	ScoreModel.findOne({ "_id": scoreId }, (err, scoreFound) => {
		if(err) console.log(err)
		else if(!scoreFound) console.log("Not Found")
		else {
            res.send({ success: 1 , scoreFound: scoreFound });
		}
	});
});

app.get('/games/:scoreId', (req, res) => {
    res.sendFile(__dirname + '/public/score.html');
});

// app.post('/updateScore', (req, res) => {
// 	const { Scoreid, score } = req.body;
// 	ScoreModel.findById(Scoreid, (err, ScoreFound) => {
// 		if(err) console.log(err)
// 		else if(!ScoreFound) console.log("Not found!")
// 		else {
// 			//edit here
// 			ScoreFound[score] += 10;
// 			ScoreFound.save((err, ScoreUpdated) => {
// 				if(err) console.log(err)
// 				else res.send({ success: 1 });
// 			});
// 		}
// 	});
// });


app.use(express.static('public'));

app.listen(1808, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 1808');
});
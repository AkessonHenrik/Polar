var config = require("./config/config");

var mongoose = require('mongoose');
mongoose.connect(config.db_url);

var User = require("./models/user").model("User");
var Poll = require("./models/poll").model("Poll");
var Question = require("./models/question").model("Question");
var Participation = require("./models/Participation").model("Participation");
var context = {};

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    db.dropDatabase();

    // Saving User
    var user = new User({
        name: 'testName',
        email: 'test@email.com',
        password: 'testPassword'
    });
    save(user);

    // Saving Question
    var questions = [
        new Question({
            title: "Quelle est la capitale de la Suisse?",
            answers: ["Bern", "Berlin", "Geneve", "Zurich"]
        }),
        new Question({
            title: "Quelles sont les dates de la deuxième guerre mondiale?",
            answers: ["1940 - 1945", "1939 - 1945", "1939 - 1944"]
        })
    ];
    questions.forEach(question => {
        save(question);
    });


    // Saving Poll
    var poll = new Poll({
        title: 'Quiz',
        submitter: user,
        questions: questions,
        keywords: ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5"],
        ongoing: false
    });
    save(poll);


    // Save new participation by user on poll
    var participation = new Participation({
        poll: poll._id,
        user: user._id,
        answer_ids: [2, 2, 2]
    });
    save(participation);

    // Update user history and save
    user.history.push(participation);
    save(user);

});

function save(objectToSave) {
    objectToSave.save((err, result) => {
        if (err) {
            console.log("ERROR: ");
            console.error(err);
        } else {
            console.log(result);
        }
    })
}
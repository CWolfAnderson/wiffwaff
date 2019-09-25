const admin = require('firebase-admin');
const functions = require('firebase-functions');

const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addOneVOneMatch = functions.https.onRequest(async (req, res) => {

  // grab the query parameters
  const player1Name = req.query.player1Name;
  const player1Score = req.query.player1Score;
  const player2Name = req.query.player2Name;
  const player2Score = req.query.player2Score;

  let docRef = db.collection('oneVOneMatches').doc();

  return cors(req, res, () => {
    let match = docRef.set({
      player1Name,
      player1Score,
      player2Name,
      player2Score,
    }).then((match) => {
      console.log('Added match', match);
      res.send('Added match ' + match);
      // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
      // res.redirect(303, match.toString());
      return match;
    });

  });
});

exports.getOneVOneMatches = functions.https.onRequest(async (req, res) => {

  return cors(req, res, () => {

    let oneVOneMatches = db.collection('oneVOneMatches').get()
      .then((snapshot) => {

        // format the snapshot based on players

        const players = {};

        snapshot.forEach((doc) => {
          const match = doc.data();

          const { player1Name, player2Name, player1Score, player2Score } = match;

          // get the winner
          const winnerName = (player1Score > player2Score) ? player1Name : player2Name;
        
          // increment score or set score to 1
          if (players[winnerName]) {
            players[winnerName].oneVOneWins += 1;
          } else {
            players[winnerName] = {
              name: winnerName,
              oneVOneWins: 1,
            };
          }

        });

        res.send(Object.values(players));
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        // res.redirect(303, match.toString());
        console.log('snapshot', snapshot);
        console.log('data', data);
        return true;
      });

  });
});
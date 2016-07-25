var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs-prebuilt')
var binPath = phantomjs.path


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8084;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/template', function (req, res) {
  res.sendFile(__dirname + '/canvas.html');
});
router.get('/umlviewer', function (req, res) {
  res.sendFile(__dirname + '/umlviewer.html');
});
router.get('/main.js', function (req, res) {
  res.sendFile(__dirname + '/main.js');
});
router.get('/umlClass.js', function (req, res) {
  res.sendFile(__dirname + '/umlClass.js');
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/phantom', function(req, res) {
  var childArgs = [
    path.join(__dirname, 'hello.js'),
    ''
  ]
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    // handle results
    console.log("Output of phantom:" + stdout);
    res.json({ message: "Output of phantom:" + stdout });
  })
});
router.get('/copy', function(req, res) {
  var childArgs = [
    path.join(__dirname, 'copy.js'),
    ''
  ]
  childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    // handle results
    // console.log("Output of phantom:" + stdout);
    // res.json({ message: "Output of phantom:" + stdout });
    res.sendFile(__dirname + '/tmp/image.' + 'png');
  })
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

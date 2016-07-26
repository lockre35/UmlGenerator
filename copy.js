var page = require('webpage').create();

page.open('http://localhost:8084/api/umlViewer', function () {
  // page.render(__dirname + '/tmp/image.' + 'png', {format: 'png', quality: '100'}, function () {
  //   //res.sendFile(__dirname + '/tmp/image.' + format);
  // });
  var ua = page.evaluate(function () {
      return document.getElementById('svgText').innerHTML;
  });
  console.log(ua);
  //page.render('tmp/image.png', {format: 'png', quality: '100'});
  phantom.exit();
});

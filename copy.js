var page = require('webpage').create();

page.open('http://localhost:8084/api/template', function () {
  // page.render(__dirname + '/tmp/image.' + 'png', {format: 'png', quality: '100'}, function () {
  //   //res.sendFile(__dirname + '/tmp/image.' + format);
  // });
  page.render('tmp/image.png', {format: 'png', quality: '100'});
  phantom.exit();
});

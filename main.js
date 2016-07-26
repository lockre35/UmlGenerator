function UmlClass (name){
  // private instance variables
  this._attributes = [];
  this._operations = [];

  this.isActive = new Boolean(false);
  var text = new PointText(new Point(200, 50));
  text.justification = 'center';
  text.fillColor = 'black';
  text.content = name;

  var rectangle = new Rectangle();
  rectangle.size = new Size(text.bounds.width + 20, text.bounds.height + 20);
  rectangle.center = text.bounds.center;
  var path = new Path.Rectangle(rectangle);
  path.strokeWidth = 2;
  path.strokeColor = 'black';

  //Attributes box
  path.insert(4, new Point(path.segments[0].point));
  path.insert(5, new Point(path.segments[0].point));
  path.insert(6, new Point(path.segments[3].point));
  path.insert(7, new Point(path.segments[3].point));
  //Operations box
  path.insert(8, new Point(path.segments[3].point));
  path.insert(9, new Point(path.segments[0].point));
  path.insert(10, new Point(path.segments[0].point));

  this._group = new Group(path, text);

  this.centerTitle = function() {
    var point1 = this._group.children[0].segments[1].point;
    var point2 = this._group.children[0].segments[2].point;
    var middle = point1.x + ((point2.x - point1.x) / 2);
    this._group.children[1].bounds.center.x = middle;
  }

  this.shiftSegmentHeights = function(amount, indexes) {
    var path = this._group.children[0];
    var i;
    var pointsToMove = indexes;
    for (i in pointsToMove) {
      var index = pointsToMove[i];
      path.segments[index].point.y = path.segments[index].point.y + amount;
    }
  }

  this.shiftSegmentWidths = function(amount, indexes) {
    var path = this._group.children[0];
    var i;
    var pointsToMove = indexes;
    for (i in pointsToMove) {
      var index = pointsToMove[i];
      path.segments[index].point.x = path.segments[index].point.x + amount;
    }
  }
}

UmlClass.prototype = {
  constructor: UmlClass,

  onResize: function(event) {
    this._group.position = view.center;
  },

  addAttribute: function(name, type) {
    this._attributes.push(this._group.children.length);
    var path = this._group.children[0];
    var newText = new PointText(new Point(200, 50));
    newText.justification = 'left';
    newText.fillColor = 'black';
    newText.content = name + ' : ' + type;

    if(this._attributes.length == 1) {
      newText.position = new Point(path.segments[0].point.x, path.segments[5].point.y + (newText.bounds.height / 2) + 10);
      this.shiftSegmentHeights(newText.bounds.height + 20, [5,6,8,9]);
    }
    else {
      newText.position = new Point(path.segments[0].point.x, path.segments[5].point.y - 5 + (newText.bounds.height / 2));
      this.shiftSegmentHeights(newText.bounds.height + 5, [5,6,8,9]);
    }

    newText.bounds.x = path.segments[0].point.x + 10;

    var newTextWidth = newText.bounds.width + 20;
    var currentWidth = path.bounds.width;
    if(newTextWidth > currentWidth)
      this.shiftSegmentWidths(newTextWidth - currentWidth, [2,3,6,7,8]);

    var i;
    for(i = 0; i < this._operations.length; i++) {
      this._group.children[this._operations[i]].bounds.y += newText.bounds.height + 5;
    }

    this.centerTitle();
    this._group.addChild(newText);
  },

  addOperation: function(name, parameters, returnType) {
    this._operations.push(this._group.children.length);
    var path = this._group.children[0];
    var newText = new PointText(new Point(200, 50));
    newText.justification = 'left';
    newText.fillColor = 'black';
    newText.content = name + '(' + parameters + ') : ' + returnType;

    if(this._operations.length == 1) {
      newText.position = new Point(path.segments[0].point.x, path.segments[9].point.y + (newText.bounds.height / 2) + 10);
      this.shiftSegmentHeights(newText.bounds.height + 20, [8,9]);
    }
    else {
      newText.position = new Point(path.segments[0].point.x, path.segments[9].point.y - 5 + (newText.bounds.height / 2));
      this.shiftSegmentHeights(newText.bounds.height + 5, [8,9]);
    }

    newText.bounds.x = path.segments[0].point.x + 10;

    var newTextWidth = newText.bounds.width + 20;
    var currentWidth = path.bounds.width;
    if(newTextWidth > currentWidth)
      this.shiftSegmentWidths(newTextWidth - currentWidth, [2,3,6,7,8]);

    this.centerTitle();
    this._group.addChild(newText);
  },

  moveToOrigin: function() {
    var group = this._group;
    group.position.x = group.bounds.width / 2;
    group.position.y = group.bounds.height / 2;
  },

  getSvgString: function() {
    var svg = umlClass._group.exportSVG({asString: true});
    var svgText = "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" "
      + "height=\"" + this._group.bounds.height + "\" "
      + "width=\"" + this._group.bounds.width + "\">"
      + svg + "</svg>";
    return svgText;
  },

  onKeyDown: function(event) {
    this._group.position = view.center;
  }
}

console.log('loaded');

var umlClass = new UmlClass('test');
// var rectangle2 = new Rectangle();
// rectangle2.size = new Size(text.bounds.width + 20, 0);
// rectangle2.center = text.bounds.center;
// rectangle2.center.y = rectangle.center.y + rectangle.height / 2;
// var path2 = new Path.Rectangle(rectangle2);
// path2.strokeWidth = 3;
// path2.strokeColor = 'black';
//
// var myPath = new Path();
// myPath.strokeColor = 'black';
// myPath.add(new Point(0, 0));
// myPath.add(new Point(30, 0));
// myPath.add(new Point(0, 30));
// myPath.add(new Point(15, 15));
// myPath.add(new Point(50, 50));
umlClass.addAttribute('Id', 'int');
umlClass.addOperation('GetId', '', 'int');
umlClass.moveToOrigin();

var svgDiv = document.createElement("div");
svgDiv.id = 'svgText';
svgDiv.innerHTML = umlClass.getSvgString();
console.log(svgDiv.innerHTML);
document.getElementsByTagName('body')[0].appendChild(svgDiv);

function onKeyDown(event) {
  //umlClass.onKeyDown(event);
  //console.log(text + rectangle + rectangle2);
  // group.position = view.center;
  // addText();
  // group.width = group.with + 10;
  umlClass.moveToOrigin();
}

function onResize(event) {
  // Whenever the window is resized, recenter the path:
  //group.position = view.center;
  //umlClass.onResize(event);
}

function addText() {
  // path2.segments[0].point.y = path2.segments[0].point.y + text.bounds.height + 20;
  // path2.segments[3].point.y = path2.segments[3].point.y + text.bounds.height + 20;
  // var newText = new PointText(new Point(200, 50));
  // newText.justification = 'left';
  // newText.fillColor = 'black';
  // newText.content = 'Id : int';
  // newText.position = new Point(path2.segments[0].point.x, path2.segments[0].point.y - text.bounds.height)
  // newText.bounds.x = path2.segments[0].point.x + 10
  // group.addChild(newText);
}



// class UmlClass {
//   constructor(name) {
//     this._attributes = [];
//     this._operations = [];
//
//     var text = new PointText(new Point(200, 50));
//     text.justification = 'center';
//     text.fillColor = 'black';
//     text.content = 'Class Name';
//
//     var rectangle = new Rectangle();
//     rectangle.size = new Size(text.bounds.width + 20, text.bounds.height + 20);
//     rectangle.center = text.bounds.center;
//     var path = new Path.Rectangle(rectangle);
//     path.strokeWidth = 3;
//     path.strokeColor = 'black';
//
//     this._group = new Group(path, text);
//     this._group.addChild(path2);
//   }
//
//   onResize(event) {
//     this._group.position = view.center;
//   }
//
//   addAttribute(attribute) {
//
//   }
//
//   onKeyDown(event) {
//     this._group.position = view.center;
//     this._group.width = this._group.with + 10;
//   }
// }

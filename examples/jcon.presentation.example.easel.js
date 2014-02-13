console.log('Here');
jQuery(document).ready(function(){

	var stage;
	var canvas;
	var preload;

	function init() {
				
		canvas = document.getElementById("easelJS");
		stage = new createjs.Stage(canvas);

		stage.update();

		// enable hover events
		stage.enableMouseOver();
		
		var g = new createjs.Graphics();
			g.setStrokeStyle(1);
			g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		    g.drawCircle(50,50,50);

		    var s = new createjs.Shape(g);
		    s.x = 75;
		    s.y = 50;

		    stage.addChild(s);
		    stage.update();		
		}
	

	init();
});
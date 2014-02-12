console.log('Here');
jQuery(document).ready(function(){

	var stage;
	var canvas;
	var preload;

	function init() {
		
		canvas = document.getElementById("soundJS");
		stage = new createjs.Stage(canvas);

		console.log(stage);
		// enable hover events
		stage.enableMouseOver();
		
		createjs.Ticker.addEventListener("tick", stage);

		createjs.Sound.registerSound({id:"tick-sound", src:"assets/sounds/tap-play-6.wav"});

		var g = new createjs.Graphics();
			g.setStrokeStyle(1);
		    
		    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		    g.drawCircle(100,100,100);

		    var s = new createjs.Shape(g);
		    s.x = 100;
		    s.y = 100;

		    stage.addChild(s);

		    s.addEventListener('click', handleClick);

		console.log('Sound');
	}

	function handleClick(){
		console.log('Shape Clicked');
		createjs.Sound.play("tick-sound");
	}

	init();
});
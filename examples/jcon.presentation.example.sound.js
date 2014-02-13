console.log('Here');

// Get the Sound Ready
createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.FlashPlugin]);
	createjs.Sound.addEventListener("fileload", createjs.proxy(this.loadHandler, (this)));
	createjs.Sound.registerSound("assets/sounds/tl-map-1.wav", "sound");
	function loadHandler(event) {
	 // This is fired for each sound that is registered.
	 var instance = createjs.Sound.play("sound");  // play using id.  Could also use full source path or event.src.
	 instance.addEventListener("complete", createjs.proxy(this.handleComplete, this));
	 instance.volume = 0.5;
	}


// Build the Object
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

		var g = new createjs.Graphics();
			g.setStrokeStyle(1);
		    
		    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		    g.drawCircle(50,50,50);

		    var s = new createjs.Shape(g);
		    s.x = 75;
		    s.y = 50;

		    stage.update();

		    stage.addChild(s);

		    s.addEventListener('click', handleClick);

		console.log('Sound');
	}

	function handleClick(){
		console.log('Shape Clicked');
		createjs.Sound.play("sound");
	}

	init();
});
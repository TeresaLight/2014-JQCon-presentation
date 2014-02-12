console.log('Here');
jQuery(document).ready(function(){

	var stage;
	var canvas;
	var preload;

	function init() {
				
		canvas = document.getElementById("tweenJS");
		stage = new createjs.Stage(canvas);

		// enable hover events
		stage.enableMouseOver();
		
		createjs.Ticker.addEventListener("tick", stage);

		var g = new createjs.Graphics();
			g.setStrokeStyle(1);
		    
		    g.beginStroke(createjs.Graphics.getRGB(0,0,0));
		    g.beginFill(createjs.Graphics.getRGB(255,0,0));
		    g.drawCircle(100,100,100);

		    var s = new createjs.Shape(g);
		    s.x = 100;
		    s.y = 100;

		    stage.addChild(s);
		    stage.update();

		    s.alpha = 1;
		    createjs.Tween.get(s)
		         .wait(500)
		         .to({x:300}, 1000)
		         .call(function(){
		         	fadeOn(s);
		         });
		  
		
		    stage.update();		
		}

	function fadeOn(s){
		
	    createjs.Tween.get(s)
	         .wait(500)
	         .to({x:300}, 1000)
	         .call(function(){
	         	fadeOut(s);
	         });
	}

	function fadeOut(s){
		s.alpha = 1;
	    createjs.Tween.get(s)
	         .wait(500)
	         .to({x:100}, 1000)
	         .call(function(){
	         	fadeOn(s);
	         });
	}
	

	init();
});
jQuery(document).ready(function(){

	var stage;  						// The Actual Stage
	var loadingBarContainer;			// The Preloader
	
		var background = 
		[
			// Background Goes Here
		];

	var states = 
		[	

			// States go Here
		];

		

	function init() {
		//initialize the stage
		function isCanvasSupported(){
		  var elem = document.createElement("canvas");
		  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
		}
		if(isCanvasSupported()){
			canvas = document.getElementById("stateMap");
			stage = new createjs.Stage(canvas);

			//enable hover events
			stage.enableMouseOver();

			//creating the progress label
			loadProgressLabel = new createjs.Text("","18px Verdana","black");
			loadProgressLabel.lineWidth = 200;
			loadProgressLabel.textAlign = "center";
			loadProgressLabel.x = canvas.width/2;
			loadProgressLabel.y = 50;
			stage.addChild(loadProgressLabel);

			//container that holds all the elements of the loading bar
			loadingBarContainer = new createjs.Container();

			//the height width and color of the loading bar
		    loadingBarHeight = 9;
		    loadingBarWidth = 307;
		    LoadingBarColor = createjs.Graphics.getRGB(0,126,205);

			//creating the loading bar   
		    loadingBar = new createjs.Shape();
		    loadingBar.graphics.beginFill(LoadingBarColor).drawRect(0, 0, 1, loadingBarHeight).endFill();

		    //creating the frame around the loading bar
		    frame = new createjs.Shape();
		    padding = 3;
		    frame.graphics.setStrokeStyle(1).beginStroke(LoadingBarColor).drawRect(-padding/2, -padding/2, loadingBarWidth+padding, loadingBarHeight+padding).endStroke();

		    //adding the loading bar and the frame to our container and placing it on the desired position on the canvas
		    loadingBarContainer.addChild(loadingBar, frame);
		    loadingBarContainer.x = Math.round(canvas.width/2 - loadingBarWidth/2);
		    loadingBarContainer.y = 252;

			//adding the container with the elements to our stage
		    stage.addChild(loadingBarContainer);

		    //creating the loading queue and the events for progress and completion
			preload = new createjs.LoadQueue(false);
			preload.addEventListener("complete", handleLoadComplete);
			preload.addEventListener("progress", handleLoadProgress);

			// Concatanate all the assets arrays

			// Preload them
			preload.loadManifest(assets);

			stage.update();	

		}
	}
	
	function handleLoadProgress(e){

		
		loadingBar.scaleX = preload.progress * loadingBarWidth;
		
		stage.update();
	}

	function handleLoadComplete() {

		stage.removeChild(loadProgressLabel, loadingBarContainer);

		stage.update();

		//on click we call our start(); function
		start();

	}

	
	function start() {

		stage.update();

	}


	
	function handleStateMouseOut(e){


		stage.update();
	}

		
	
	function handleStateMouseIn(e){

		
		stage.update();
	}

	
	function handleStateClick(e){

		stage.update();

	};

	//Do what you love...Love what you do!
	jQuery(document).ready(function($) {
//		init();
console.log ('teresa was here');
	});
})
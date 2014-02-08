jQuery(document).ready(function(){

	// This is going to store our references to the canvas that we define as the stage
	var stage;
	var canvas;

	// The preloader
	var loadingBarContainer;
	var loadingBar;

	// Base path to the relative assets
	var path = '';
	
	/***********************************
	 * Define all arrays for the assets
	 *********/

	// array for the images of the backgrounds
	var backgrounds = 
	[
		{	id: "background-borders",			src: path + "assets/backgrounds/mapBorders.png",  		data: "0,0"	 },
		{	id: "background-borders-names",     src: path + "assets/backgrounds/mapBordersNames.png",  	data: "0,0"	 },
		{	id: "background-full",   			src: path + "assets/backgrounds/mapFull.png", 			data: "0,0"	 },
		{	id: "background-names",   			src: path + "assets/backgrounds/mapNames.png",  		data: "0,0"	 },
		{	id: "background-shapes-borders",   	src: path + "assets/backgrounds/mapShapesBorders.png",  data: "0,0"	 },
	];

	// Define array for the images of the shapes
	var shapes = 
	[	

	];

	// Define array for the images of the overlays
	var overlays = 
	[	

	];

	// Define array for the images of the names of the shapes
	var names = 
	[	

	];

	// This is the array that holds the names of the shapes and assigns a number to them
	var shapesNum = 
	[	

	];
	

	/********************************
	 * This initializes everything 
	 * after document ready.
	 *********/
	function init() {

		// initialize the stage
		
		// see of the broswer supports Canvas
		function isCanvasSupported(){
		  var elem = document.createElement("canvas");
		  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
		}

		// if Canvas is supported, go to work
		if(isCanvasSupported()){

			canvas = document.getElementById("shapeMap");
			stage = new createjs.Stage(canvas);

			stage.update();

			// enable hover events
			stage.enableMouseOver();

			// preload everything by calling the function
			preLoadAssets();  
			
		}
	}

	/********************************
	 * Handle all the preloading of 
	 * assets and communicate progress
 	 ********************/
	function preLoadAssets() {
		
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
		stage.update();
	    //creating the loading queue and the events for progress and completion
		preload = new createjs.LoadQueue(false);

		//calls the js functions below
		preload.addEventListener("progress", handleLoadProgress);
		preload.addEventListener("complete", handleLoadComplete); 

		// Concatanate all the assets arrays

		// Preload them
		preload.loadManifest(backgrounds);
		
	}
	
	/********************************
	 * Event handler function to 
	 * indicate progress
 	 ********************/	
	function handleLoadProgress(e){

		
		loadingBar.scaleX = preload.progress * loadingBarWidth;

		stage.update();
	}

	/********************************
	 * Event handler function to 
	 * indicate complete
 	 ********************/	
	function handleLoadComplete() {

		//remove progress bar
		stage.removeChild(loadProgressLabel, loadingBarContainer);
 
		//update stage
		stage.update();

		//Put everything together
		start();

	}

	/********************************
	 * Function to put everything 
	 * on the stage
 	 ********************/
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
		init();

	});
})

// In each function, update the stage. 
//	console.log ('Teresa was here'); 
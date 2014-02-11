jQuery(document).ready(function(){

	// This is going to store our references to the canvas that we define as the stage
	var stage;
	var canvas;
	var preload;
	var hoveredElements = new Array ();  //creating an array of elements that are currently hovered on

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
		{	id: "background-shapes-borders",   	src: path + "assets/backgrounds/blank.png",  data: "0,0"	 },
	//	{	id: "background-borders",			src: path + "assets/backgrounds/mapBorders.png",  		data: "0,0"	 },
	//	{	id: "background-borders-names",     src: path + "assets/backgrounds/mapBordersNames.png",  	data: "0,0"	 },
	//	{	id: "background-shapes-borders",   	src: path + "assets/backgrounds/mapShapesBorders.png",  data: "0,0"	 },
	];

	// Define array for the images of the shapes
	var shapes = 
	[	
		{	id: "alabama-shape", 			src: path + "assets/shapes/alabama-s.png", 			data: "582,272" },																																						
		{	id: "alaska-shape", 			src: path + "assets/shapes/alaska-s.png", 			data: "14,344"  },																																								
		{	id: "arizona-shape", 			src: path + "assets/shapes/arizona-s.png", 			data: "249,225" },																																							
		{	id: "arkansas-shape", 			src: path + "assets/shapes/arkansas-s.png", 		data: "503,254" },
		{	id: "california-shape", 		src: path + "assets/shapes/california-s.png", 		data: "168,122" },																				
		{	id: "colorado-shape", 			src: path + "assets/shapes/colorado-s.png", 		data: "330,175" },																				
		{	id: "conneticut-shape", 		src: path + "assets/shapes/connecticut-s.png", 		data: "738,139" },																				
		{	id: "delaware-shape", 			src: path + "assets/shapes/delaware-s.png", 		data: "720,182" },																			
		{	id: "florida-shape", 			src: path + "assets/shapes/florida-s.png", 			data: "595,330" },																			
		{	id: "georgia-shape", 			src: path + "assets/shapes/georgia-s.png", 			data: "614,269" },																			
		{	id: "hawaii-shape", 			src: path + "assets/shapes/hawaii-s.png", 			data: "241,430" },																			
		{	id: "idaho-shape", 				src: path + "assets/shapes/idaho-s.png", 			data: "254,40"  },																				
		{	id: "illinois-shape", 			src: path + "assets/shapes/illinois-s.png", 		data: "538,162" },																			
		{	id: "indiana-shape", 			src: path + "assets/shapes/indiana-s.png", 			data: "580,169" },																				
		{	id: "iowa-shape", 				src: path + "assets/shapes/iowa-s.png", 			data: "480,148" },																			
		{	id: "kansas-shape", 			src: path + "assets/shapes/kansas-s.png", 			data: "414,198" },	
		{	id: "kentucky-shape", 			src: path + "assets/shapes/kentucky-s.png", 		data: "566,209" },																			
		{	id: "louisiana-shape", 			src: path + "assets/shapes/louisiana-s.png", 		data: "510,308" },																			
		{	id: "maine-shape", 				src: path + "assets/shapes/maine-s.png", 			data: "752,52"  },																			
		{	id: "maryland-shape", 			src: path + "assets/shapes/maryland-s.png", 		data: "677,184" },																				
		{	id: "massachusetts-shape", 		src: path + "assets/shapes/massachusetts-s.png", 	data: "738,125" },																				
		{	id: "michigan-shape", 			src: path + "assets/shapes/michigan-s.png", 		data: "547,86"  },																				
		{	id: "minnesota-shape", 			src: path + "assets/shapes/minnesota-s.png", 		data: "476,60"  },																				
		{	id: "mississippi-shape", 		src: path + "assets/shapes/mississippi-s.png", 		data: "542,275" },																				
		{	id: "missouri-shape", 			src: path + "assets/shapes/missouri-s.png", 		data: "489,192" },																				
		{	id: "montana-shape", 			src: path + "assets/shapes/montana-s.png", 			data: "284,42"  },																				
		{	id: "nebraska-shape", 			src: path + "assets/shapes/nebraska-s.png", 		data: "396,152" },																				
		{	id: "nevada-shape", 			src: path + "assets/shapes/nevada-s.png", 			data: "209,135" },																				
		{	id: "newhampshire-shape", 		src: path + "assets/shapes/newhampshire-s.png", 	data: "744,90"  },																				
		{	id: "newjersey-shape", 			src: path + "assets/shapes/newjersey-s.png", 		data: "722,157" },																				
		{	id: "newmexico-shape", 			src: path + "assets/shapes/newmexico-s.png", 		data: "317,236" },
		{	id: "newyork-shape", 			src: path + "assets/shapes/newyork-s.png", 			data: "668,100" },																				
		{	id: "northcarolina-shape", 		src: path + "assets/shapes/northcarolina-s.png", 	data: "630,230" },																				
		{	id: "northdakota-shape", 		src: path + "assets/shapes/northdakota-s.png", 		data: "403,62"  },																				
		{	id: "oaklahoma-shape", 			src: path + "assets/shapes/oklahoma-s.png", 		data: "402,244" },																				
		{	id: "ohio-shape", 				src: path + "assets/shapes/ohio-s.png", 			data: "613,159" },																				
		{	id: "oregon-shape", 			src: path + "assets/shapes/oregon-s.png", 			data: "177,62"  },																			
		{	id: "pennsylvania-shape", 		src: path + "assets/shapes/pennsylvania-s.png", 	data: "661,149" },																			
		{	id: "rhodeisland-shape", 		src: path + "assets/shapes/rhodeisland-s.png", 		data: "756,139" },																			
		{	id: "southcarolina-shape", 		src: path + "assets/shapes/southcarolina-s.png", 	data: "643,264" },																				
		{	id: "southdakota-shape", 		src: path + "assets/shapes/southdakota-s.png", 		data: "398,107" },																			
		{	id: "tennessee-shape", 			src: path + "assets/shapes/tennessee-s.png", 		data: "556,241" },																			
		{	id: "texas-shape", 				src: path + "assets/shapes/texas-s.png", 			data: "349,251" },
		{	id: "utah-shape", 				src: path + "assets/shapes/utah-s.png", 			data: "271,150" },																			
		{	id: "vermont-shape", 			src: path + "assets/shapes/vermont-s.png", 			data: "729,96"  },																				
		{	id: "virginia-shape", 			src: path + "assets/shapes/virginia-s.png", 		data: "635,193" },																			
		{	id: "washington-shape", 		src: path + "assets/shapes/washington-s.png", 		data: "199,25"  },																			
		{	id: "westvirginia-shape", 		src: path + "assets/shapes/westvirginia-s.png", 	data: "644,180" },																			
		{	id: "wisconsin-shape", 			src: path + "assets/shapes/wisconsin-s.png", 		data: "521,96"  },																			
		{	id: "wyoming-shape", 			src: path + "assets/shapes/wyoming-s.png", 			data: "316,111" },																																																																																																										 
	];

	// Define array for the images of the overlays
	var overlays = 
	[	
		{	id: "alabama-overlay", 			src: path + "assets/overlays/alabama-o.png", 		data: "582,272" },																																					
		{	id: "alaska-overlay", 			src: path + "assets/overlays/alaska-o.png", 		data: "14,344"  },																																								
		{	id: "arizona-overlay", 			src: path + "assets/overlays/arizona-o.png", 		data: "249,225" },																																							
		{	id: "arkansas-overlay", 		src: path + "assets/overlays/arkansas-o.png", 		data: "503,254" },																																						
		{	id: "california-overlay", 		src: path + "assets/overlays/california-o.png", 	data: "168,122" },																				
		{	id: "colorado-overlay", 		src: path + "assets/overlays/colorado-o.png", 		data: "330,175" },																				
		{	id: "conneticut-overlay", 		src: path + "assets/overlays/connecticut-o.png", 	data: "738,139" },																				
		{	id: "delaware-overlay", 		src: path + "assets/overlays/delaware-o.png", 		data: "720,182" },																			
		{	id: "florida-overlay", 			src: path + "assets/overlays/florida-o.png", 		data: "595,330" },																			
		{	id: "georgia-overlay", 			src: path + "assets/overlays/georgia-o.png", 		data: "614,269" },																			
		{	id: "hawaii-overlay", 			src: path + "assets/overlays/hawaii-o.png", 		data: "241,430" },																			
		{	id: "idaho-overlay", 			src: path + "assets/overlays/idaho-o.png", 			data: "254,40"  },																				
		{	id: "illinois-overlay", 		src: path + "assets/overlays/illinois-o.png", 		data: "538,162" },																			
		{	id: "indiana-overlay", 			src: path + "assets/overlays/indiana-o.png", 		data: "580,169" },																				
		{	id: "iowa-overlay", 			src: path + "assets/overlays/iowa-o.png", 			data: "480,148" },																			
		{	id: "kansas-overlay", 			src: path + "assets/overlays/kansas-o.png", 		data: "414,198" },																			
		{	id: "kentucky-overlay", 		src: path + "assets/overlays/kentucky-o.png", 		data: "566,209" },																			
		{	id: "louisiana-overlay", 		src: path + "assets/overlays/louisiana-o.png", 		data: "510,308" },																			
		{	id: "maine-overlay", 			src: path + "assets/overlays/maine-o.png", 			data: "752,52"  },																			
		{	id: "maryland-overlay", 		src: path + "assets/overlays/maryland-o.png", 		data: "677,184" },																				
		{	id: "massachusettes-overlay",	src: path + "assets/overlays/massachusetts-o.png", 	data: "738,125" },																				
		{	id: "michigan-overlay", 		src: path + "assets/overlays/michigan-o.png", 		data: "547,86"  },																				
		{	id: "minnesota-overlay", 		src: path + "assets/overlays/minnesota-o.png", 		data: "476,60"  },																				
		{	id: "mississippi-overlay", 		src: path + "assets/overlays/mississippi-o.png", 	data: "542,275" },																				
		{	id: "missouri-overlay", 		src: path + "assets/overlays/missouri-o.png", 		data: "489,192" },																				
		{	id: "montana-overlay", 			src: path + "assets/overlays/montana-o.png", 		data: "284,42"  },																				
		{	id: "nebraska-overlay", 		src: path + "assets/overlays/nebraska-o.png", 		data: "396,152" },																				
		{	id: "nevada-overlay", 			src: path + "assets/overlays/nevada-o.png", 		data: "209,135" },																				
		{	id: "newhampshire-overlay", 	src: path + "assets/overlays/newhampshire-o.png", 	data: "744,90"  },																				
		{	id: "newjersey-overlay", 		src: path + "assets/overlays/newjersey-o.png", 		data: "722,157" },																				
		{	id: "newmexico-overlay", 		src: path + "assets/overlays/newmexico-o.png", 		data: "317,236" },																				
		{	id: "newyork-overlay", 			src: path + "assets/overlays/newyork-o.png", 		data: "668,100" },																				
		{	id: "northcarolina-overlay", 	src: path + "assets/overlays/northcarolina-o.png", 	data: "630,230" },																				
		{	id: "northdakota-overlay", 		src: path + "assets/overlays/northdakota-o.png", 	data: "403,62"  },																				
		{	id: "oaklahoma-overlay", 		src: path + "assets/overlays/oklahoma-o.png", 		data: "402,244" },																				
		{	id: "ohio-overlay", 			src: path + "assets/overlays/ohio-o.png", 			data: "613,159" },																				
		{	id: "oregon-overlay", 			src: path + "assets/overlays/oregon-o.png", 		data: "177,62"  },																			
		{	id: "pennsylvania-overlay", 	src: path + "assets/overlays/pennsylvania-o.png", 	data: "661,149" },																			
		{	id: "rhodeisland-overlay", 		src: path + "assets/overlays/rhodeisland-o.png", 	data: "756,139" },																			
		{	id: "southcarolina-overlay", 	src: path + "assets/overlays/southcarolina-o.png", 	data: "643,264" },																				
		{	id: "southdakota-overlay", 		src: path + "assets/overlays/southdakota-o.png", 	data: "398,107" },																			
		{	id: "tennessee-overlay", 		src: path + "assets/overlays/tennessee-o.png", 		data: "556,241" },																			
		{	id: "texas-overlay", 			src: path + "assets/overlays/texas-o.png", 			data: "349,251" },																			
		{	id: "utah-overlay", 			src: path + "assets/overlays/utah-o.png", 			data: "271,150" },																			
		{	id: "vermont-overlay", 			src: path + "assets/overlays/vermont-o.png", 		data: "729,96"  },																				
		{	id: "virginia-overlay", 		src: path + "assets/overlays/virginia-o.png", 		data: "635,193" },																			
		{	id: "washington-overlay", 		src: path + "assets/overlays/washington-o.png", 	data: "199,25"  },																			
		{	id: "westvirginia-overlay", 	src: path + "assets/overlays/westvirginia-o.png", 	data: "644,180" },																			
		{	id: "wisconsin-overlay", 		src: path + "assets/overlays/wisconsin-o.png", 		data: "521,96"  },																			
		{	id: "wyoming-overlay", 			src: path + "assets/overlays/wyoming-o.png", 		data: "316,111" },																																						
	];

	// Define array for the images of the names of the shapes
	var names =
	[	
		{	id: "alabama-name", 			src: path + "assets/names/alabama-n.png", 			data: "588,306" },																																						
		{	id: "alaska-name", 				src: path + "assets/names/alaska-n.png", 			data: "160,400" },																																								
		{	id: "arizona-name", 			src: path + "assets/names/arizona-n.png", 			data: "276,268" },																																							
		{	id: "arkansas-name", 			src: path + "assets/names/arkansas-n.png", 			data: "510,270" },																																						
		{	id: "california-name", 			src: path + "assets/names/california-n.png", 		data: "190,220" },																				
		{	id: "colorado-name", 			src: path + "assets/names/colorado-n.png", 			data: "360,200" },																				
		{	id: "conneticut-name", 			src: path + "assets/names/connecticut-n.png", 		data: "640,315" },																				
		{	id: "delaware-name", 			src: path + "assets/names/delaware-n.png", 			data: "735,190" },																			
		{	id: "florida-name", 			src: path + "assets/names/florida-n.png", 			data: "665,366" },																			
		{	id: "georgia-name", 			src: path + "assets/names/georgia-n.png", 			data: "635,310" },																			
		{	id: "hawaii-name", 				src: path + "assets/names/hawaii-n.png", 			data: "320,460" },																			
		{	id: "idaho-name", 				src: path + "assets/names/idaho-n.png", 			data: "270,120" },																				
		{	id: "illinois-name", 			src: path + "assets/names/illinois-n.png", 			data: "550,190" },																			
		{	id: "indiana-name", 			src: path + "assets/names/indiana-n.png", 			data: "600,190" },																				
		{	id: "iowa-name", 				src: path + "assets/names/iowa-n.png", 				data: "500,160" },																			
		{	id: "kansas-name", 				src: path + "assets/names/kansas-n.png", 			data: "440,220" },																			
		{	id: "kentucky-name", 			src: path + "assets/names/kentucky-n.png", 			data: "600,230" },																			
		{	id: "louisiana-name", 			src: path + "assets/names/louisiana-n.png", 		data: "520,339" },																			
		{	id: "maine-name", 				src: path + "assets/names/maine-n.png", 			data: "760,82"  },																			
		{	id: "maryland-name", 			src: path + "assets/names/maryland-n.png", 			data: "734,200" },																				
		{	id: "massachusettes-name",		src: path + "assets/names/massachusetts-n.png", 	data: "768,130" },																				
		{	id: "michigan-name", 			src: path + "assets/names/michigan-n.png", 			data: "597,145" },																				
		{	id: "minnesota-name", 			src: path + "assets/names/minnesota-n.png", 		data: "482,98"  },																				
		{	id: "mississippi-name", 		src: path + "assets/names/mississippi-n.png", 		data: "548,326" },																				
		{	id: "missouri-name", 			src: path + "assets/names/missouri-n.png", 			data: "509,200" },																				
		{	id: "montana-name", 			src: path + "assets/names/montana-n.png", 			data: "336,80"  },																				
		{	id: "nebraska-name", 			src: path + "assets/names/nebraska-n.png", 			data: "430,170" },																				
		{	id: "nevada-name", 				src: path + "assets/names/nevada-n.png", 			data: "230,180" },																				
		{	id: "newhampshire-name", 		src: path + "assets/names/newhampshire-n.png", 		data: "768,115" },																				
		{	id: "newjersey-name", 			src: path + "assets/names/newjersey-n.png", 		data: "740,140" },																				
		{	id: "newmexico-name", 			src: path + "assets/names/newmexico-n.png", 		data: "340,275" },																				
		{	id: "newyork-name", 			src: path + "assets/names/newyork-n.png", 			data: "690,138" },																				
		{	id: "northcarolina-name", 		src: path + "assets/names/northcarolina-n.png", 	data: "660,249" },																				
		{	id: "northdakota-name", 		src: path + "assets/names/northdakota-n.png", 		data: "415,80"  },																				
		{	id: "oaklahoma-name", 			src: path + "assets/names/oklahoma-n.png", 			data: "450,264" },																				
		{	id: "ohio-name", 				src: path + "assets/names/ohio-n.png", 				data: "629,186" },																				
		{	id: "oregon-name", 				src: path + "assets/names/oregon-n.png", 			data: "210,98"  },																			
		{	id: "pennsylvania-name", 		src: path + "assets/names/pennsylvania-n.png", 		data: "665,167" },																			
		{	id: "rhodeisland-name", 		src: path + "assets/names/rhodeisland-n.png", 		data: "780,140" },																			
		{	id: "southcarolina-name", 		src: path + "assets/names/southcarolina-n.png", 	data: "663,280" },																				
		{	id: "southdakota-name", 		src: path + "assets/names/southdakota-n.png", 		data: "414,128" },																			
		{	id: "tennessee-name", 			src: path + "assets/names/tennessee-n.png", 		data: "581,258" },																			
		{	id: "texas-name", 				src: path + "assets/names/texas-n.png", 			data: "440,325" },																			
		{	id: "utah-name", 				src: path + "assets/names/utah-n.png", 				data: "296,190" },																			
		{	id: "vermont-name", 			src: path + "assets/names/vermont-n.png", 			data: "733,101" },																				
		{	id: "virginia-name", 			src: path + "assets/names/virginia-n.png", 			data: "686,222" },																			
		{	id: "washington-name", 			src: path + "assets/names/washington-n.png", 		data: "214,54"  },																			
		{	id: "westvirginia-name", 		src: path + "assets/names/westvirginia-n.png", 		data: "658,201" },																			
		{	id: "wisconsin-name", 			src: path + "assets/names/wisconsin-n.png", 		data: "531,128" },																			
		{	id: "wyoming-name", 			src: path + "assets/names/wyoming-n.png", 			data: "342,143" },	
	];

	// This is the array that holds the names of the shapes
	var nameArray = 
	[	'alabama','alaska','arizona','arkansas','california','colorado','connecticut','delaware','florida','georgia',
		'hawaii','idaho','illinois','indiana','iowa','kansas','kentucky','louisiana','maine','massachusettes','maryland',																		
		'michigan','minnesota','mississippi','missouri','montana','nebraska','nevada','newhampshire','newjersey','newmexico',																			
		'newyork','northcarolina','northdakota','oaklahoma','ohio','oregon','pennsylvania','rhodeisland','southcarolina','southdakota',
		'tennessee','texas','utah','vermont','virginia','washington','westvirginia','wisconsin','wyoming',		 
	];

	/********************************
	 * This initializes everything 
	 * after document ready.
	 *********/
	function init() {
		//console.log ("Names Array: ", nameArray);
		// initialize the stage
		
		// see of the broswer supports Canvas
		function isCanvasSupported(){
		  var elem = document.createElement("canvas");
		  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
		}

		//Concatonate all the arrays
//		var assets = backgrounds.concat(shapes).concat(overlays).concat(names);
		var assets = backgrounds.concat(shapes).concat(overlays);
//		console.log ('All Arrays Concatonated', assets); //See how we are building the array

		// if Canvas is supported, go to work
		if(isCanvasSupported()){

			canvas = document.getElementById("shapeMap");
			stage = new createjs.Stage(canvas);

			stage.update();

			// enable hover events
			stage.enableMouseOver();

			// preload everything by calling the function
			preLoadAssets(assets);  
			
		}
	}

	/********************************
	 * Handle all the preloading of 
	 * assets and communicate progress
 	 ********************/
	function preLoadAssets(assets) {
		
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
		preload.loadManifest(assets);
		
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

		var container = new createjs.Container(); 


		//Put the background images on the stage
		for (var counter = 0; counter < backgrounds.length; counter ++){

			//go through the array to find the object in memory that matches the id
			var preloadedImage = preload.getResult(backgrounds[counter].id);

			//pass the reference in memory to the function to return a bit map object
			var bitMapImage = new createjs.Bitmap(preloadedImage);

			// Get the string that is in data and turn it into an array.
			// Whereever there is comma that starts a new index of the array.
			var coordinates = backgrounds[counter].data.split(',');

			bitMapImage.x = coordinates[0];
			bitMapImage.y = coordinates[1];

			stage.addChild(bitMapImage);
		}

		stage.update();

		//put the overlays array objects on the stage

		for (var counter = 0; counter < overlays.length; counter ++){

			//go through the array to find the object in memory that matches the id
			var preloadedImage = preload.getResult(overlays[counter].id);

			//pass the reference in memory to the function to return a bit map object
			var bitMapImage = new createjs.Bitmap(preloadedImage);

			// Get the string that is in data and turn it into an array.
			var coordinates = overlays[counter].data.split(',');

			bitMapImage.x = coordinates[0];
			bitMapImage.y = coordinates[1];
			bitMapImage.addEventListener('mouseout',handleShapeMouseOut);
			bitMapImage.addEventListener('click', handleShapeClick);
			stage.addChild(bitMapImage);
		}

		stage.update();

		//put the shapes array on the Stage -- they are on top and will fade down on mouse in

		for (var counter = 0; counter < shapes.length; counter ++){

			//go through the array to find the object in memory that matches the id
			var preloadedImage = preload.getResult(shapes[counter].id);

			//pass the reference in memory to the function to return a bit map object
			var bitMapImage = new createjs.Bitmap(preloadedImage);

			// Get the string that is in data and turn it into an array.
			var coordinates = shapes[counter].data.split(',');

			bitMapImage.x = coordinates[0];
			bitMapImage.y = coordinates[1];

			// Add the Event Listeners
			bitMapImage.addEventListener('mouseover', handleShapeMouseIn);
			stage.addChild(bitMapImage);
		}

		stage.update();

/*		//put the names array objects on the stage
		for (var counter = 0; counter < names.length; counter ++){

			//go through the array to find the object in memory that matches the id
			var preloadedImage = preload.getResult(names[counter].id);

			//pass the reference in memory to the function to return a bit map object
			var bitMapImage = new createjs.Bitmap(preloadedImage);

			// Get the string that is in data and turn it into an array.
			var coordinates = shapes[counter].data.split(',');

			bitMapImage.x = coordinates[0];
			bitMapImage.y = coordinates[1];

			stage.addChild(bitMapImage);
		}
		stage.update();
*/
	}


	
	function handleShapeMouseOut(e){

		// Do a for loop on hoveredElements array
		// On each iteration of the loop, add the element to the stage
		// At the end of the loop, reset the array
	
		for (var counter = 0; counter < hoveredElements.length; counter ++){
			stage.addChild(hoveredElements[counter]);
		}

		hoveredElements = new Array(); 

		stage.update();
	}

		
	
	function handleShapeMouseIn(e){
		
		hoveredElements.push(e.target);

		//console.log ('All Arrays Concatonated', hoveredElements); //See how we are building the array
		stage.removeChild(e.target);
		stage.update();
	}

	
	function handleShapeClick(e){
		 
		console.log ('Teresa was in Click');
		clickedElements.push(e.target);

		var shapeLink = '';

		for(var i=0; i < shapes.length; i++)
		{		
			if (shapes[i].bitmapID == e.target.id){
				shapeLink = ((shapes[i].id).split('-over'))[0];
			}
		}

		alert("clicked");
		stage.removeChild(e.target);
		stage.update();  

	}

	//Do what you love...Love what you do...Pixel Heart Apps.

	jQuery(document).ready(function($) {
		init();

	});
})

// In each function, update the stage. 
//	console.log ('Teresa was here'); 
// I am manually telling it when to update the stage.  
//I can set an event to update the stage every event or computer tick.  
//This would be for a game and not this app.

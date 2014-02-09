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
		{	id: "alabama-shape", 			src: path + "assets/shapes/alabama-s.png", 			data: "704.678,330.104"  },																																						
		{	id: "alaska-shape", 			src: path + "assets/shapes/alaska-s.png", 			data: "18.529,416.641"   },																																								
		{	id: "arizona-shape", 			src: path + "assets/shapes/arizona-s.png", 			data: "301.455,272.605"  },																																							
		{	id: "arkansas-shape", 			src: path + "assets/shapes/arkansas-s.png", 		data: "608.949,307.643"  },
		{	id: "california-shape", 		src: path + "assets/shapes/california-s.png", 		data: "204.071,148.278"  },																				
		{	id: "colorado-shape", 			src: path + "assets/shapes/colorado-s.png", 		data: "399.892,212.478"  },																				
		{	id: "conneticut-shape", 		src: path + "assets/shapes/connecticut-s.png", 		data: "892.382,169.49"   },																				
		{	id: "delaware-shape", 			src: path + "assets/shapes/delaware-s.png", 		data: "870.169,219.873"  },																			
		{	id: "florida-shape", 			src: path + "assets/shapes/florida-s.png", 			data: "719.041	399.933" },																			
		{	id: "georgia-shape", 			src: path + "assets/shapes/georgia-s.png", 			data: "742.809,325.883"  },																			
		{	id: "hawaii-shape", 			src: path + "assets/shapes/hawaii-s.png", 			data: "292.984,520.42"   },																			
		{	id: "idaho-shape", 				src: path + "assets/shapes/idaho-s.png", 			data: "307.439,49.907"   },																				
		{	id: "illinois-shape", 			src: path + "assets/shapes/illinois-s.png", 		data: "651.729,196.073"  },																			
		{	id: "indiana-shape", 			src: path + "assets/shapes/indiana-s.png", 			data: "702.065,205.31"   },																				
		{	id: "iowa-shape", 				src: path + "assets/shapes/iowa-s.png", 			data: "581.242,179.749"  },																			
		{	id: "kansas-shape", 			src: path + "assets/shapes/kansas-s.png", 			data: "501.356,240.946"  },	
		{	id: "kentucky-shape", 			src: path + "assets/shapes/kentucky-s.png", 		data: "684.337,253.214"  },																			
		{	id: "louisiana-shape", 			src: path + "assets/shapes/louisiana-s.png", 		data: "617.849,372.586"  },																			
		{	id: "maine-shape", 				src: path + "assets/shapes/maine-s.png", 			data: "909.128,63.723"   },																			
		{	id: "maryland-shape", 			src: path + "assets/shapes/maryland-s.png", 		data: "819.403,222.965"  },																				
		{	id: "massachusettes-shape", 	src: path + "assets/shapes/massachusetts-s.png", 	data: "891.723,150.956"  },																				
		{	id: "michigan-shape", 			src: path + "assets/shapes/michigan-s.png", 		data: "661.354,104.954"  },																				
		{	id: "minnesota-shape", 			src: path + "assets/shapes/minnesota-s.png", 		data: "575.956,73.311"   },																				
		{	id: "mississippi-shape", 		src: path + "assets/shapes/mississippi-s.png", 		data: "655.614,333.363"  },																				
		{	id: "missouri-shape", 			src: path + "assets/shapes/missouri-s.png", 		data: "592.664,233.343"  },																				
		{	id: "montana-shape", 			src: path + "assets/shapes/montana-s.png", 			data: "344.316,52.563"   },																				
		{	id: "nebraska-shape", 			src: path + "assets/shapes/nebraska-s.png", 		data: "479.325,184.098"  },																				
		{	id: "nevada-shape", 			src: path + "assets/shapes/nevada-s.png", 			data: "253.835,163.923"  },																				
		{	id: "newhampshire-shape", 		src: path + "assets/shapes/newhampshire-s.png", 	data: "899.869,109.317"  },																				
		{	id: "newjersey-shape", 			src: path + "assets/shapes/newjersey-s.png", 		data: "873.656,190.124"  },																				
		{	id: "newmexico-shape", 			src: path + "assets/shapes/newmexico-s.png", 		data: "384.545,285.188"  },
		{	id: "newyork-shape", 			src: path + "assets/shapes/newyork-s.png", 			data: "808.187,121.822"  },																				
		{	id: "northcarolina-shape", 		src: path + "assets/shapes/northcarolina-s.png", 	data: "762.12,278.268"   },																				
		{	id: "northdakota-shape", 		src: path + "assets/shapes/northdakota-s.png", 		data: "487.926,75.911"   },																				
		{	id: "oaklahoma-shape", 			src: path + "assets/shapes/oklahoma-s.png", 		data: "486.325,295.367"  },																				
		{	id: "ohio-shape", 				src: path + "assets/shapes/ohio-s.png", 			data: "741.73,193.881"   },																				
		{	id: "oregon-shape", 			src: path + "assets/shapes/oregon-s.png", 			data: "214.805,76.626"   },																			
		{	id: "pennsylvania-shape", 		src: path + "assets/shapes/pennsylvania-s.png", 	data: "798.892,181.022"  },																			
		{	id: "rhodeisland-shape", 		src: path + "assets/shapes/rhodeisland-s.png", 		data: "914.256,167.848"  },																			
		{	id: "southcarolina-shape", 		src: path + "assets/shapes/southcarolina-s.png", 	data: "777.109,319.271"  },																				
		{	id: "southdakota-shape", 		src: path + "assets/shapes/southdakota-s.png", 		data: "482.825,130.611"  },																			
		{	id: "tennessee-shape", 			src: path + "assets/shapes/tennessee-s.png", 		data: "673.132,292.739"  },																			
		{	id: "texas-shape", 				src: path + "assets/shapes/texas-s.png", 			data: "661.354,104.954"  },
		{	id: "utah-shape", 				src: path + "assets/shapes/utah-s.png", 			data: "328.47,182.492"   },																			
		{	id: "vermont-shape", 			src: path + "assets/shapes/vermont-s.png", 			data: "881.803,116.271"  },																				
		{	id: "virginia-shape", 			src: path + "assets/shapes/virginia-s.png", 		data: "767.999,234.685"  },																			
		{	id: "washington-shape", 		src: path + "assets/shapes/washington-s.png", 		data: "241.304,31.857"   },																			
		{	id: "westvirginia-shape", 		src: path + "assets/shapes/westvirginia-s.png", 	data: "779.518,218.057"  },																			
		{	id: "wisconsin-shape", 			src: path + "assets/shapes/wisconsin-s.png", 		data: "630.297,117.085"  },																			
		{	id: "wyoming-shape", 			src: path + "assets/shapes/wyoming-s.png", 			data: "383.601,135.683"  },																																																																																																										 
	];

	// Define array for the images of the overlays
	var overlays = 
	[	
		{	id: "alabama-overlay", 			src: path + "assets/overlays/alabama-o.png", 		data: "704.678,330.104"  },																																						
		{	id: "alaska-overlay", 			src: path + "assets/overlays/alaska-o.png", 		data: "18.529,416.641"   },																																								
		{	id: "arizona-overlay", 			src: path + "assets/overlays/arizona-o.png", 		data: "301.455,272.605"  },																																							
		{	id: "arkansas-overlay", 		src: path + "assets/overlays/arkansas-o.png", 		data: "608.949,307.643"  },																																						
		{	id: "california-overlay", 		src: path + "assets/overlays/california-o.png", 	data: "204.071,148.278"  },																				
		{	id: "colorado-overlay", 		src: path + "assets/overlays/colorado-o.png", 		data: "399.892,212.478"  },																				
		{	id: "conneticut-overlay", 		src: path + "assets/overlays/connecticut-o.png", 	data: "892.382,169.49"   },																				
		{	id: "delaware-overlay", 		src: path + "assets/overlays/delaware-o.png", 		data: "870.169,219.873"  },																			
		{	id: "florida-overlay", 			src: path + "assets/overlays/florida-o.png", 		data: "719.041	399.933" },																			
		{	id: "georgia-overlay", 			src: path + "assets/overlays/georgia-o.png", 		data: "742.809,325.883"  },																			
		{	id: "hawaii-overlay", 			src: path + "assets/overlays/hawaii-o.png", 		data: "292.984,520.42"   },																			
		{	id: "idaho-overlay", 			src: path + "assets/overlays/idaho-o.png", 			data: "307.439,49.907"   },																				
		{	id: "illinois-overlay", 		src: path + "assets/overlays/illinois-o.png", 		data: "651.729,196.073"  },																			
		{	id: "indiana-overlay", 			src: path + "assets/overlays/indiana-o.png", 		data: "702.065,205.31"   },																				
		{	id: "iowa-overlay", 			src: path + "assets/overlays/iowa-o.png", 			data: "581.242,179.749"  },																			
		{	id: "kansas-overlay", 			src: path + "assets/overlays/kansas-o.png", 		data: "501.356,240.946"  },																			
		{	id: "kentucky-overlay", 		src: path + "assets/overlays/kentucky-o.png", 		data: "684.337,253.214"  },																			
		{	id: "louisiana-overlay", 		src: path + "assets/overlays/louisiana-o.png", 		data: "617.849,372.586"  },																			
		{	id: "maine-overlay", 			src: path + "assets/overlays/maine-o.png", 			data: "909.128,63.723"   },																			
		{	id: "maryland-overlay", 		src: path + "assets/overlays/maryland-o.png", 		data: "819.403,222.965"  },																				
		{	id: "massachusettes-overlay",	src: path + "assets/overlays/massachusetts-o.png", 	data: "891.723,150.956"  },																				
		{	id: "michigan-overlay", 		src: path + "assets/overlays/michigan-o.png", 		data: "661.354,104.954"  },																				
		{	id: "minnesota-overlay", 		src: path + "assets/overlays/minnesota-o.png", 		data: "575.956,73.311"   },																				
		{	id: "mississippi-overlay", 		src: path + "assets/overlays/mississippi-o.png", 	data: "655.614,333.363"  },																				
		{	id: "missouri-overlay", 		src: path + "assets/overlays/missouri-o.png", 		data: "592.664,233.343"  },																				
		{	id: "montana-overlay", 			src: path + "assets/overlays/montana-o.png", 		data: "344.316,52.563"   },																				
		{	id: "nebraska-overlay", 		src: path + "assets/overlays/nebraska-o.png", 		data: "479.325,184.098"  },																				
		{	id: "nevada-overlay", 			src: path + "assets/overlays/nevada-o.png", 		data: "253.835,163.923"  },																				
		{	id: "newhampshire-overlay", 	src: path + "assets/overlays/newhampshire-o.png", 	data: "899.869,109.317"  },																				
		{	id: "newjersey-overlay", 		src: path + "assets/overlays/newjersey-o.png", 		data: "873.656,190.124"  },																				
		{	id: "newmexico-overlay", 		src: path + "assets/overlays/newmexico-o.png", 		data: "384.545,285.188"  },																				
		{	id: "newyork-overlay", 			src: path + "assets/overlays/newyork-o.png", 		data: "808.187,121.822"  },																				
		{	id: "northcarolina-overlay", 	src: path + "assets/overlays/northcarolina-o.png", 	data: "762.12,278.268"   },																				
		{	id: "northdakota-overlay", 		src: path + "assets/overlays/northdakota-o.png", 	data: "487.926,75.911"   },																				
		{	id: "oaklahoma-overlay", 		src: path + "assets/overlays/oklahoma-o.png", 		data: "486.325,295.367"  },																				
		{	id: "ohio-overlay", 			src: path + "assets/overlays/ohio-o.png", 			data: "741.73,193.881"   },																				
		{	id: "oregon-overlay", 			src: path + "assets/overlays/oregon-o.png", 		data: "214.805,76.626"   },																			
		{	id: "pennsylvania-overlay", 	src: path + "assets/overlays/pennsylvania-o.png", 	data: "798.892,181.022"  },																			
		{	id: "rhodeisland-overlay", 		src: path + "assets/overlays/rhodeisland-o.png", 	data: "914.256,167.848"  },																			
		{	id: "southcarolina-overlay", 	src: path + "assets/overlays/southcarolina-o.png", 	data: "777.109,319.271"  },																				
		{	id: "southdakota-overlay", 		src: path + "assets/overlays/southdakota-o.png", 	data: "482.825,130.611"  },																			
		{	id: "tennessee-overlay", 		src: path + "assets/overlays/tennessee-o.png", 		data: "673.132,292.739"  },																			
		{	id: "texas-overlay", 			src: path + "assets/overlays/texas-o.png", 			data: "661.354,104.954"  },																			
		{	id: "utah-overlay", 			src: path + "assets/overlays/utah-o.png", 			data: "328.47,182.492"   },																			
		{	id: "vermont-overlay", 			src: path + "assets/overlays/vermont-o.png", 		data: "881.803,116.271"  },																				
		{	id: "virginia-overlay", 		src: path + "assets/overlays/virginia-o.png", 		data: "767.999,234.685"  },																			
		{	id: "washington-overlay", 		src: path + "assets/overlays/washington-o.png", 	data: "241.304,31.857"   },																			
		{	id: "westvirginia-overlay", 	src: path + "assets/overlays/westvirginia-o.png", 	data: "779.518,218.057"  },																			
		{	id: "wisconsin-overlay", 		src: path + "assets/overlays/wisconsin-o.png", 		data: "630.297,117.085"  },																			
		{	id: "wyoming-overlay", 			src: path + "assets/overlays/wyoming-o.png", 		data: "383.601,135.683"  },																																						
	];

	// Define array for the images of the names of the shapes
	var names = 
	[	
		{	id: "alabama-name", 			src: path + "assets/names/alabama-n.png", 			data: "704.678,330.104"  },																																						
		{	id: "alaska-name", 				src: path + "assets/names/alaska-n.png", 			data: "18.529,416.641"   },																																								
		{	id: "arizona-name", 			src: path + "assets/names/arizona-n.png", 			data: "301.455,272.605"  },																																							
		{	id: "arkansas-name", 			src: path + "assets/names/arkansas-n.png", 			data: "608.949,307.643"  },																																						
		{	id: "california-name", 			src: path + "assets/names/california-n.png", 		data: "204.071,148.278"  },																				
		{	id: "colorado-name", 			src: path + "assets/names/colorado-n.png", 			data: "399.892,212.478"  },																				
		{	id: "conneticut-name", 			src: path + "assets/names/connecticut-n.png", 		data: "892.382,169.49"   },																				
		{	id: "delaware-name", 			src: path + "assets/names/delaware-n.png", 			data: "870.169,219.873"  },																			
		{	id: "florida-name", 			src: path + "assets/names/florida-n.png", 			data: "719.041	399.933" },																			
		{	id: "georgia-name", 			src: path + "assets/names/georgia-n.png", 			data: "742.809,325.883"  },																			
		{	id: "hawaii-name", 				src: path + "assets/names/hawaii-n.png", 			data: "292.984,520.42"   },																			
		{	id: "idaho-name", 				src: path + "assets/names/idaho-n.png", 			data: "307.439,49.907"   },																				
		{	id: "illinois-name", 			src: path + "assets/names/illinois-n.png", 			data: "651.729,196.073"  },																			
		{	id: "indiana-name", 			src: path + "assets/names/indiana-n.png", 			data: "702.065,205.31"   },																				
		{	id: "iowa-name", 				src: path + "assets/names/iowa-n.png", 				data: "581.242,179.749"  },																			
		{	id: "kansas-name", 				src: path + "assets/names/kansas-n.png", 			data: "501.356,240.946"  },																			
		{	id: "kentucky-name", 			src: path + "assets/names/kentucky-n.png", 			data: "684.337,253.214"  },																			
		{	id: "louisiana-name", 			src: path + "assets/names/louisiana-n.png", 		data: "617.849,372.586"  },																			
		{	id: "maine-name", 				src: path + "assets/names/maine-n.png", 			data: "909.128,63.723"   },																			
		{	id: "maryland-name", 			src: path + "assets/names/maryland-n.png", 			data: "819.403,222.965"  },																				
		{	id: "massachusettes-name",		src: path + "assets/names/massachusetts-n.png", 	data: "891.723,150.956"  },																				
		{	id: "michigan-name", 			src: path + "assets/names/michigan-n.png", 			data: "661.354,104.954"  },																				
		{	id: "minnesota-name", 			src: path + "assets/names/minnesota-n.png", 		data: "575.956,73.311"   },																				
		{	id: "mississippi-name", 		src: path + "assets/names/mississippi-n.png", 		data: "655.614,333.363"  },																				
		{	id: "missouri-name", 			src: path + "assets/names/missouri-n.png", 			data: "592.664,233.343"  },																				
		{	id: "montana-name", 			src: path + "assets/names/montana-n.png", 			data: "344.316,52.563"   },																				
		{	id: "nebraska-name", 			src: path + "assets/names/nebraska-n.png", 			data: "479.325,184.098"  },																				
		{	id: "nevada-name", 				src: path + "assets/names/nevada-n.png", 			data: "253.835,163.923"  },																				
		{	id: "newhampshire-name", 		src: path + "assets/names/newhampshire-n.png", 		data: "899.869,109.317"  },																				
		{	id: "newjersey-name", 			src: path + "assets/names/newjersey-n.png", 		data: "873.656,190.124"  },																				
		{	id: "newmexico-name", 			src: path + "assets/names/newmexico-n.png", 		data: "384.545,285.188"  },																				
		{	id: "newyork-name", 			src: path + "assets/names/newyork-n.png", 			data: "808.187,121.822"  },																				
		{	id: "northcarolina-name", 		src: path + "assets/names/northcarolina-n.png", 	data: "762.12,278.268"   },																				
		{	id: "northdakota-name", 		src: path + "assets/names/northdakota-n.png", 		data: "487.926,75.911"   },																				
		{	id: "oaklahoma-name", 			src: path + "assets/names/oklahoma-n.png", 			data: "486.325,295.367"  },																				
		{	id: "ohio-name", 				src: path + "assets/names/ohio-n.png", 				data: "741.73,193.881"   },																				
		{	id: "oregon-name", 				src: path + "assets/names/oregon-n.png", 			data: "214.805,76.626"   },																			
		{	id: "pennsylvania-name", 		src: path + "assets/names/pennsylvania-n.png", 		data: "798.892,181.022"  },																			
		{	id: "rhodeisland-name", 		src: path + "assets/names/rhodeisland-n.png", 		data: "914.256,167.848"  },																			
		{	id: "southcarolina-name", 		src: path + "assets/names/southcarolina-n.png", 	data: "777.109,319.271"  },																				
		{	id: "southdakota-name", 		src: path + "assets/names/southdakota-n.png", 		data: "482.825,130.611"  },																			
		{	id: "tennessee-name", 			src: path + "assets/names/tennessee-n.png", 		data: "673.132,292.739"  },																			
		{	id: "texas-name", 				src: path + "assets/names/texas-n.png", 			data: "661.354,104.954"  },																			
		{	id: "utah-name", 				src: path + "assets/names/utah-n.png", 				data: "328.47,182.492"   },																			
		{	id: "vermont-name", 			src: path + "assets/names/vermont-n.png", 			data: "881.803,116.271"  },																				
		{	id: "virginia-name", 			src: path + "assets/names/virginia-n.png", 			data: "767.999,234.685"  },																			
		{	id: "washington-name", 			src: path + "assets/names/washington-n.png", 		data: "241.304,31.857"   },																			
		{	id: "westvirginia-name", 		src: path + "assets/names/westvirginia-n.png", 		data: "779.518,218.057"  },																			
		{	id: "wisconsin-name", 			src: path + "assets/names/wisconsin-n.png", 		data: "630.297,117.085"  },																			
		{	id: "wyoming-name", 			src: path + "assets/names/wyoming-n.png", 			data: "383.601,135.683"  },	
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
		console.log ("Names Array: ", nameArray);
		// initialize the stage
		
		// see of the broswer supports Canvas
		function isCanvasSupported(){
		  var elem = document.createElement("canvas");
		  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
		}

		//Concatonate all the arrays
		var assets = backgrounds.concat(shapes).concat(overlays).concat(names);
		console.log ('All Arrays Concatonated', assets); 

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
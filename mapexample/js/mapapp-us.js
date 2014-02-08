jQuery(document).ready(function(){

	/** This program was co-developed by Joshua Smith and Teresa Light for to provide an example of CreateJS
		for our conference session in 2014.

		It is also a platform for another project so it will contain some extra code for the purposes of that project.

		The software displays a map.  When the user hovers over it, the an overlay appears over the object.  When clicked,
		the name of the object appears and stays.  

		There are two buttons below - one resets the map to the starting position.  The other displays the full map.
 **/

	var stage;  						// The Actual Stage
	var loadingBarContainer;			// The Preloader
	var instructionsImage;
	var shapeHovered = new Array();		// Array to hold elements currently hidden

	var path = '';
	var siteURL = jQuery('#siteURL').val();

	//Sets up the data 
	var backgrounds = 
		[
			{	id: "background-borders",	src: path + "assets/backgrounds/usMap-borders.png",  data: "0,0"	 },
			{	id: "background-borders-names",      src: path + "assets/backgrounds/usMap-borders-names.png",  data: "0,0"	 },
			{	id: "background-full",   src: path + "assets/backgrounds/usMap-full.png",  data: "0,0"	 },
			{	id: "background-names",   src: path + "assets/backgrounds/usMap-names.png",  data: "0,0"	 },
			{	id: "background-shapes-borders",   src: path + "assets/backgrounds/usMap-shapes-borders.png",  data: "0,0"	 },
		];

	
	var shapes = 
		[	
			{	id: "0-name", 				src: path + "assets/names/alabama-n.png", 			data: "704.678,330.104"  },
			{	id: "0-shape", 				src: path + "assets/shapes/alabama-s.png", 			data: "704.678,330.104"  },																				
			{	id: "0-overlay", 			src: path + "assets/overlays/alabama-o.png", 		data: "704.678,330.104"  },																				
//
			{	id: "alaska-name", 			src: path + "assets/names/alaska-n.png", 			data: "18.529,416.641"  },
			{	id: "alaska-shape", 		src: path + "assets/shapes/alaska-s.png", 			data: "18.529,416.641"  },																				
			{	id: "alaska-overlay", 		src: path + "assets/overlays/alaska-o.png", 		data: "18.529,416.641"  },																				
//
			{	id: "arizona-name", 		src: path + "assets/names/arizona-n.png", 			data: "301.455,272.605"  },
			{	id: "arizona-shape", 		src: path + "assets/shapes/arizona-s.png", 			data: "301.455,272.605"  },																				
			{	id: "arizona-overlay", 		src: path + "assets/overlays/arizona-o.png", 		data: "301.455,272.605"  },																				
//
			{	id: "arkansas-name", 		src: path + "assets/names/arkansas-n.png", 			data: "608.949,307.643"  },
			{	id: "arkansas-shape", 		src: path + "assets/shapes/arkansas-s.png", 		data: "608.949,307.643"  },																				
			{	id: "arkansas-overlay", 	src: path + "assets/overlays/arkansas-o.png", 		data: "608.949,307.643"  },																				
//
			{	id: "california-name", 		src: path + "assets/names/california-n.png", 		data: "204.071,148.278"  },
			{	id: "california-shape", 	src: path + "assets/shapes/california-s.png", 		data: "204.071,148.278"  },																				
			{	id: "california-overlay", 	src: path + "assets/overlays/california-o.png", 	data: "204.071,148.278"  },																				
//
			{	id: "colorado-name", 		src: path + "assets/names/colorado-n.png", 			data: "399.892,212.478"  },
			{	id: "colorado-shape", 		src: path + "assets/shapes/colorado-s.png", 		data: "399.892,212.478"  },																				
			{	id: "colorado-overlay", 	src: path + "assets/overlays/colorado-o.png", 		data: "399.892,212.478"  },																				

			{	id: "conneticut-name", 		src: path + "assets/names/connecticut-n.png", 		data: "892.382,169.49"  },
			{	id: "conneticut-shape", 	src: path + "assets/shapes/connecticut-s.png", 		data: "892.382,169.49"  },																				
			{	id: "conneticut-overlay", 	src: path + "assets/overlays/connecticut-o.png", 	data: "892.382,169.49"  },																				

			{	id: "deleware-name", 		src: path + "assets/names/delaware-n.png", 			data: "870.169,219.873"  },
			{	id: "deleware-shape", 		src: path + "assets/shapes/delaware-s.png", 		data: "870.169,219.873"  },																			
			{	id: "deleware-overlay", 	src: path + "assets/overlays/delaware-o.png", 		data: "870.169,219.873"  },																			
//
			{	id: "florida-name", 		src: path + "assets/names/florida-n.png", 			data: "719.041	399.933"  },
			{	id: "florida-shape", 		src: path + "assets/shapes/florida-s.png", 			data: "719.041	399.933"  },																			
			{	id: "florida-overlay", 		src: path + "assets/overlays/florida-o.png", 		data: "719.041	399.933"  },																			
//
			{	id: "georgia-name", 		src: path + "assets/names/georgia-n.png", 			data: "742.809,325.883"  },
			{	id: "georgia-shape", 		src: path + "assets/shapes/georgia-s.png", 			data: "742.809,325.883"  },																			
			{	id: "georgia-overlay", 		src: path + "assets/overlays/georgia-o.png", 		data: "742.809,325.883"  },																																							
//
			{	id: "hawaii-name", 			src: path + "assets/names/hawaii-n.png", 			data: "292.984,520.42"  },
			{	id: "hawaii-shape", 		src: path + "assets/shapes/hawaii-s.png", 			data: "292.984,520.42"  },																			
			{	id: "hawaii-overlay", 		src: path + "assets/overlays/hawaii-o.png", 		data: "292.984,520.42"  },																				
//
			{	id: "idaho-name", 			src: path + "assets/names/idaho-n.png", 			data: "307.439,49.907"  },
			{	id: "idaho-shape", 			src: path + "assets/shapes/idaho-s.png", 			data: "307.439,49.907"  },																				
			{	id: "idaho-overlay", 		src: path + "assets/overlays/idaho-o.png", 			data: "307.439,49.907"  },																				
//
			{	id: "illinois-name", 		src: path + "assets/names/illinois-n.png", 			data: "651.729,196.073"  },
			{	id: "illinois-shape", 		src: path + "assets/shapes/illinois-s.png", 		data: "651.729,196.073"  },																			
			{	id: "illinois-overlay", 	src: path + "assets/overlays/illinois-o.png", 		data: "651.729,196.073"  },																			
//
			{	id: "indiana-name", 		src: path + "assets/names/indiana-n.png", 			data: "702.065,205.31"  },
			{	id: "indiana-shape", 		src: path + "assets/shapes/indiana-s.png", 			data: "702.065,205.31"  },																				
			{	id: "indiana-overlay", 		src: path + "assets/overlays/indiana-o.png", 		data: "702.065,205.31"  },																		
//
			{	id: "iowa-name", 			src: path + "assets/names/iowa-n.png", 				data: "581.242,179.749"  },
			{	id: "iowa-shape", 			src: path + "assets/shapes/iowa-s.png", 			data: "581.242,179.749"  },																			
			{	id: "iowa-overlay", 		src: path + "assets/overlays/iowa-o.png", 			data: "581.242,179.749"  },																				
//
			{	id: "kansas-name", 			src: path + "assets/names/kansas-n.png", 			data: "501.356,240.946"  },
			{	id: "kansas-shape", 		src: path + "assets/shapes/kansas-s.png", 			data: "501.356,240.946"  },																			
			{	id: "kansas-overlay", 		src: path + "assets/overlays/kansas-o.png", 		data: "501.356,240.946"  },																			
//
			{	id: "kentucky-name", 		src: path + "assets/names/kentucky-n.png", 			data: "684.337,253.214"  },
			{	id: "kentucky-shape", 		src: path + "assets/shapes/kentucky-s.png", 		data: "684.337,253.214"  },																			
			{	id: "kentucky-overlay", 	src: path + "assets/overlays/kentucky-o.png", 		data: "684.337,253.214"  },																			
//
			{	id: "louisiana-name", 		src: path + "assets/names/louisiana-n.png", 		data: "617.849,372.586"  },
			{	id: "louisiana-shape", 		src: path + "assets/shapes/louisiana-s.png", 		data: "617.849,372.586"  },																			
			{	id: "louisiana-overlay", 	src: path + "assets/overlays/louisiana-o.png", 		data: "617.849,372.586"  },																			
//
			{	id: "maine-name", 			src: path + "assets/names/maine-n.png", 			data: "909.128,63.723"  },
			{	id: "maine-shape", 			src: path + "assets/shapes/maine-s.png", 			data: "909.128,63.723"  },,																				
			{	id: "maine-overlay", 		src: path + "assets/overlays/maine-o.png", 			data: "909.128,63.723"  },																				
//
			{	id: "maine-name", 			src: path + "assets/names/maryland-n.png", 			data: "819.403,222.965"  },
			{	id: "maine-shape", 			src: path + "assets/shapes/maryland-s.png", 		data: "819.403,222.965"  },																				
			{	id: "maine-overlay", 		src: path + "assets/overlays/maryland-o.png", 		data: "819.403,222.965"  },																				
//
			{	id: "massachusettes-name", 			src: path + "assets/names/massachusetts-n.png", 	data: "891.723,150.956"  },
			{	id: "massachusettes-shape", 		src: path + "assets/shapes/massachusetts-s.png", 	data: "891.723,150.956"  },																				
			{	id: "massachusettes-overlay", 		src: path + "assets/overlays/massachusetts-o.png", 	data: "891.723,150.956"  },																				
//
			{	id: "michigan-name", 		src: path + "assets/names/michigan-n.png", 				data: "661.354,104.954"  },
			{	id: "michigan-shape", 		src: path + "assets/shapes/michigan-s.png", 			data: "661.354,104.954"  },																				
			{	id: "michigan-overlay", 	src: path + "assets/overlays/michigan-o.png", 			data: "661.354,104.954"  },																				
//
			{	id: "minnesota-name", 		src: path + "assets/names/minnesota-n.png", 			data: "575.956,73.311"  },
			{	id: "minnesota-shape", 		src: path + "assets/shapes/minnesota-s.png", 			data: "575.956,73.311"  },																				
			{	id: "minnesota-overlay", 	src: path + "assets/overlays/minnesota-o.png", 			data: "575.956,73.311"  },																				
//
			{	id: "mississippi-name", 	src: path + "assets/names/mississippi-n.png", 			data: "655.614,333.363"  },
			{	id: "mississippi-shape", 	src: path + "assets/shapes/mississippi-s.png", 			data: "655.614,333.363"  },																				
			{	id: "mississippi-overlay", 	src: path + "assets/overlays/mississippi-o.png", 		data: "655.614,333.363"  },																				
//
			{	id: "missouri-name", 		src: path + "assets/names/missouri-n.png", 				data: "592.664,233.343"  },
			{	id: "missouri-shape", 		src: path + "assets/shapes/missouri-s.png", 			data: "592.664,233.343"  },																				
			{	id: "missouri-overlay", 	src: path + "assets/overlays/missouri-o.png", 			data: "592.664,233.343"  },																				
//
			{	id: "montana-name", 		src: path + "assets/names/montana-n.png", 				data: "344.316,52.563"  },
			{	id: "montana-shape", 		src: path + "assets/shapes/montana-s.png", 				data: "344.316,52.563"  },																				
			{	id: "montana-overlay", 		src: path + "assets/overlays/montana-o.png", 			data: "344.316,52.563"  },																				
//
			{	id: "nebraska-name", 		src: path + "assets/names/nebraska-n.png", 				data: "479.325,184.098"  },
			{	id: "nebraska-shape", 		src: path + "assets/shapes/nebraska-s.png", 			data: "479.325,184.098"  },																				
			{	id: "nebraska-overlay", 	src: path + "assets/overlays/nebraska-o.png", 			data: "479.325,184.098"  },																				
//
			{	id: "nevada-name", 			src: path + "assets/names/nevada-n.png", 				data: "253.835,163.923"  },
			{	id: "nevada-shape", 		src: path + "assets/shapes/nevada-s.png", 				data: "253.835,163.923"  },																				
			{	id: "nevada-overlay", 		src: path + "assets/overlays/nevada-o.png", 			data: "253.835,163.923"  },																				
//
			{	id: "newhampshire-name", 	src: path + "assets/names/newhampshire-n.png", 			data: "899.869,109.317"  },
			{	id: "newhampshire-shape", 	src: path + "assets/shapes/newhampshire-s.png", 		data: "899.869,109.317"  },																				
			{	id: "newhampshire-overlay", src: path + "assets/overlays/newhampshire-o.png", 		data: "899.869,109.317"  },																				
//
			{	id: "newjersey-name", 		src: path + "assets/names/newjersey-n.png", 			data: "873.656,190.124"  },
			{	id: "newjersey-shape", 		src: path + "assets/shapes/newjersey-s.png", 			data: "873.656,190.124"  },																				
			{	id: "newjersey-overlay", 	src: path + "assets/overlays/newjersey-o.png", 			data: "873.656,190.124"  },																				
//
			{	id: "newmexico-name", 		src: path + "assets/names/newmexico-n.png", 			data: "384.545,285.188"  },
			{	id: "newmexico-shape", 		src: path + "assets/shapes/newmexico-s.png", 			data: "384.545,285.188"  },																				
			{	id: "newmexico-overlay", 	src: path + "assets/overlays/newmexico-o.png", 			data: "384.545,285.188"  },																				
//
			{	id: "newyork-name", 		src: path + "assets/names/newyork-n.png", 				data: "808.187,121.822"  },
			{	id: "newyork-shape", 		src: path + "assets/shapes/newyork-s.png", 				data: "808.187,121.822"  },																				
			{	id: "newyork-overlay", 		src: path + "assets/overlays/newyork-o.png", 			data: "808.187,121.822"  },																				
//
			{	id: "northcarolina-name", 		src: path + "assets/names/northcarolina-n.png", 	data: "762.12,278.268"  },
			{	id: "northcarolina-shape", 		src: path + "assets/shapes/northcarolina-s.png", 	data: "762.12,278.268"  },																				
			{	id: "northcarolina-overlay",	src: path + "assets/overlays/northcarolina-o.png", 	data: "762.12,278.268"  },																				
//
			{	id: "northdakota-name", 	src: path + "assets/names/northdakota-n.png", 			data: "487.926,75.911"  },
			{	id: "northdakota-shape", 	src: path + "assets/shapes/northdakota-s.png", 			data: "487.926,75.911"  },																				
			{	id: "northdakota-overlay", 	src: path + "assets/overlays/northdakota-o.png", 		data: "487.926,75.911"  },																				
//
			{	id: "oaklahoma-name", 		src: path + "assets/names/oklahoma-n.png", 				data: "486.325,295.367"  },
			{	id: "oaklahoma-shape", 		src: path + "assets/shapes/oklahoma-s.png", 			data: "486.325,295.367"  },																				
			{	id: "oaklahoma-overlay", 	src: path + "assets/overlays/oklahoma-o.png", 			data: "486.325,295.367"  },																			
//
			{	id: "ohio-name", 			src: path + "assets/names/ohio-n.png", 					data: "741.73,193.881"  },
			{	id: "ohio-shape", 			src: path + "assets/shapes/ohio-s.png", 				data: "741.73,193.881"  },																				
			{	id: "ohio-overlay", 		src: path + "assets/overlays/ohio-o.png", 				data: "741.73,193.881"  },																				
//
			{	id: "oregon-name", 			src: path + "assets/names/oregon-n.png", 				data: "214.805,76.626"  },
			{	id: "oregon-shape", 		src: path + "assets/shapes/oregon-s.png", 				data: "214.805,76.626"  },																			
			{	id: "oregon-overlay", 		src: path + "assets/overlays/oregon-o.png", 			data: "214.805,76.626"  },																				
//
			{	id: "pennsylvania-name", 		src: path + "assets/names/pennsylvania-n.png", 		data: "798.892,181.022"  },
			{	id: "pennsylvania-shape", 		src: path + "assets/shapes/pennsylvania-s.png", 	data: "798.892,181.022"  },																			
			{	id: "pennsylvania-overlay", 	src: path + "assets/overlays/pennsylvania-o.png", 	data: "798.892,181.022"  },																				
//
			{	id: "rhodeisland-name", 	src: path + "assets/names/rhodeisland-n.png", 			data: "914.256,167.848"  },
			{	id: "rhodeisland-shape", 	src: path + "assets/shapes/rhodeisland-s.png", 			data: "914.256,167.848"  },																			
			{	id: "rhodeisland-overlay", 	src: path + "assets/overlays/rhodeisland-o.png", 		data: "914.256,167.848"  },																			
//
			{	id: "southcarolina-name", 		src: path + "assets/names/southcarolina-n.png", 	data: "777.109,319.271"  },
			{	id: "southcarolina-shape", 		src: path + "assets/shapes/southcarolina-s.png", 	data: "777.109,319.271"  },																				
			{	id: "southcarolina-overlay", 	src: path + "assets/overlays/southcarolina-o.png", 	data: "777.109,319.271"  },																				
//
			{	id: "southdakota-name", 	src: path + "assets/names/southdakota-n.png", 			data: "482.825,130.611"  },
			{	id: "southdakota-shape", 	src: path + "assets/shapes/southdakota-s.png", 			data: "482.825,130.611"  },																			
			{	id: "southdakota-overlay", 	src: path + "assets/overlays/southdakota-o.png", 		data: "482.825,130.611"  },																				
//
			{	id: "tennessee-name", 		src: path + "assets/names/tennessee-n.png", 			data: "673.132,292.739"  },
			{	id: "tennessee-shape", 		src: path + "assets/shapes/tennessee-s.png", 			data: "673.132,292.739"  },																			
			{	id: "tennessee-overlay", 	src: path + "assets/overlays/tennessee-o.png", 			data: "673.132,292.739"  },																				
//
			{	id: "texas-name", 			src: path + "assets/names/texas-n.png", 				data: "661.354,104.954"  },
			{	id: "texas-shape", 			src: path + "assets/shapes/texas-s.png", 				data: "661.354,104.954"  },																			
			{	id: "texas-overlay", 		src: path + "assets/overlays/texas-o.png", 				data: "661.354,104.954"  },																			
//
			{	id: "utah-name", 			src: path + "assets/names/utah-n.png", 					data: "328.47,182.492"  },
			{	id: "utah-shape", 			src: path + "assets/shapes/utah-s.png", 				data: "328.47,182.492"  },																			
			{	id: "utah-overlay", 		src: path + "assets/overlays/utah-o.png", 				data: "328.47,182.492"  },																				
//
			{	id: "vermont-name", 		src: path + "assets/names/vermont-n.png", 				data: "881.803,116.271"  },
			{	id: "vermont-shape", 		src: path + "assets/shapes/vermont-s.png", 				data: "881.803,116.271"  },																				
			{	id: "vermont-overlay", 		src: path + "assets/overlays/vermont-o.png", 			data: "881.803,116.271"  },																				
//
			{	id: "virginia-name", 		src: path + "assets/names/virginia-n.png", 				data: "767.999,234.685"  },
			{	id: "virginia-shape", 		src: path + "assets/shapes/virginia-s.png", 			data: "767.999,234.685"  },																			
			{	id: "virginia-overlay", 	src: path + "assets/overlays/virginia-o.png", 			ddata: "767.999,234.685"  },																				
//
			{	id: "washington-name", 		src: path + "assets/names/washington-n.png", 			data: "241.304,31.857"  },
			{	id: "washington-shape", 	src: path + "assets/shapes/washington-s.png", 			data: "241.304,31.857"  },																			
			{	id: "washington-overlay", 	src: path + "assets/overlays/washington-o.png", 		data: "241.304,31.857"  },																				
//
			{	id: "westvirginia-name", 		src: path + "assets/names/westvirginia-n.png", 		data: "779.518,218.057"  },
			{	id: "westvirginia-shape", 		src: path + "assets/shapes/westvirginia-s.png", 	data: "779.518,218.057"  },																			
			{	id: "westvirginia-overlay", 	src: path + "assets/overlays/westvirginia-o.png", 	data: "779.518,218.057"  },																				
//
			{	id: "wisconsin-name", 		src: path + "assets/names/wisconsin-n.png", 			data: "630.297,117.085"  },
			{	id: "wisconsin-shape", 		src: path + "assets/shapes/wisconsin-s.png", 			data: "630.297,117.085"  },																			
			{	id: "wisconsin-overlay", 	src: path + "assets/overlays/wisconsin-o.png", 			data: "630.297,117.085"  },																				
//
			{	id: "wyoming-name", 		src: path + "assets/names/wyoming-n.png", 				data: "383.601,135.683"  },
			{	id: "wyoming-shape", 		src: path + "assets/shapes/wyoming-s.png", 				data: "383.601,135.683"  },																				
			{	id: "wyoming-overlay", 		src: path + "assets/overlays/wyoming-o.png", 			data: "383.601,135.683"  },																				
		];

	/** Init *********************
	*   Setup the Canvas element
	*   enable needed CreateJS elements
	*   Setup preloading bar
	*   JPS 2014
	*********************************/
	function init() {
		//initialize the stage
		function isCanvasSupported(){
		  var elem = document.createElement("canvas");
		  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
		}
		if(isCanvasSupported()){
			canvas = document.getElementById("shapeMap");
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
			preload.addEventListener("complete", handleComplete);
			preload.addEventListener("progress", handleProgress);
			
			//adding our files to the queue
			//preload.loadFile({id: "backgrounds", src:"images/background.jpg"});

			var assets = backgrounds.concat(shapes);
//			var assets = assets.concat(circles); // commented this out - Teresa Light 2014 02, not using this

			preload.loadManifest(assets);
//			preload.loadFile({id: "instructions", src: path + "assets/instructions.png"});
			
			stage.update();
		}else{
			jQuery('#shapeSelect,#regionSelect').show();
			jQuery('.picme').css('height','21px');
			jQuery('#shapeSelect').css('top','209px');
			jQuery('#shapeSelect').css('left','110px');
			jQuery('#shapeSelect select').css('width','167px');
			jQuery('#shapeSelect select').css('height','21px');
			jQuery('#regionSelect').css('top','209');
			jQuery('#regionSelect').css('left','327');
			jQuery('#regionSelect select').css('width','167px');
			jQuery('#regionSelect select').css('height','21px');
			jQuery('#shapeMap').css('display','none');
			jQuery('#shapeMap').css('width','0');
			jQuery('#shapeMap').css('height','0');
		}

	}


	/** handleProgress *********************
	*   Controlls the Loading bar 
	*	animation, this function is called 
	*   every time the progress of our loading changes
	*   JPS 07/15/2013
	*********************************/

	function handleProgress(e){
		
		//changing the length of our loading bar accordingly
		loadingBar.scaleX = preload.progress * loadingBarWidth;
		//and the precentage in the loading label
		//progresPrecentage = Math.round(preload.progress*100);
		//loadProgressLabel.text = progresPrecentage + "% Loaded" ;
		//updating the stage to draw the changes
		stage.update();
	}

	//this function is called when everyhing is loaded
	function handleComplete() {
		//getting the loaded images

		//we remove the progres label and loading bar and also remove the click event listener
		stage.removeChild(loadProgressLabel, loadingBarContainer);
		
		stage.update();

		//on click we call our start(); function
		start();

	}

	

	/** start() *********************
	*   Adds all the display objects to 
	*   stage and give them event listeners
	***************************************/
	function start() {

		//Load Background
		jQuery('#shapeSelect,#regionSelect').show();
		var loadedImage = preload.getResult(backgrounds[4].id);
		var bitmapImage = new createjs.Bitmap(loadedImage);
			
		stage.addChild(bitmapImage);


		//Load States

		for(var counter = 0; counter < shapes.length; counter++)
		{
			var loadedImage = preload.getResult(shapes[counter].id);
			var bitmapImage = new createjs.Bitmap(loadedImage);
			
			shapes[counter].bitmapID = bitmapImage.id;
			//console.log(shapes[counter]);

			if(typeof (shapes[counter].data) != 'undefined')
			{
				var coordinates = shapes[counter].data.split(',');
				bitmapImage.x = coordinates[0]
				bitmapImage.y = coordinates[1]; 

			}
			
			shapes[counter].element = stage.addChild(bitmapImage);
			shapes[counter].element. cursor = "pointer";
			//console.log(shapes[counter].id.indexOf('ver'));

			//Add event listeners to the default polygons.
			//console.log(shapes[counter].id);
			if((shapes[counter].id.indexOf('over')==-1)&&(shapes[counter].id.indexOf('background')==-1))
				bitmapImage.addEventListener("mouseover", handleStateHover);
			//Add evenet listener to show the hidden polygon
			else{
				bitmapImage.addEventListener("mouseout", handleStateOut);
				
			}
			bitmapImage.addEventListener("click", handleStateClick);
		}

		//Load Circle Buttons

		for(var counter = 0; counter < circles.length; counter++)
		{
			var loadedImage = preload.getResult(circles[counter].id);
			var bitmapImage = new createjs.Bitmap(loadedImage);

			circles[counter].bitmapID = bitmapImage.id;
			//console.log(circles[counter]);

			if(typeof (circles[counter].data) != 'undefined')
			{
				var coordinates = circles[counter].data.split(',');
				bitmapImage.x = coordinates[0]
				bitmapImage.y = coordinates[1]; 

			}
			
			circles[counter].element = stage.addChild(bitmapImage);
			circles[counter].element.cursor = "pointer";
			//circles[counter].element.opacity = ".5";

			bitmapImage.addEventListener("mouseover", handleCircleHover);
			bitmapImage.addEventListener("click", handleCircleClick);
			bitmapImage.addEventListener("mouseout", handleStateOut);
		}


		//Load Instructions
		var loadedImage = preload.getResult('instructions');
		var bitmapImage = new createjs.Bitmap(loadedImage);
		instructionsImage = stage.addChild(bitmapImage);

		jQuery('#cew4us-clickmap').mouseenter(function(){
			stage.removeChild(instructionsImage);
			//console.log('enter');
			stage.update();

		}).mouseleave(function(){
			var loadedImage = preload.getResult('instructions');
			var bitmapImage = new createjs.Bitmap(loadedImage);
			for(var i = 0; i < shapeHovered.length; i++)
			{
				stage.addChild(shapeHovered[i]);
			}
			stage.removeChild(instructionsImage);
			shapeHovered = new Array();
			instructionsImage = stage.addChild(bitmapImage);
			stage.update();
		})

	

		//refresh the stage
		stage.update();

		
	}


	/** Hover over shape ************
	*   Remove the default polygon
	*   JPS 07/16/13
	*********************************/
	function handleStateHover(e){

		//console.log('Hovered');
		//console.log(e);
		
		for(var i = 0; i < shapeHovered.length; i++)
		{
			stage.addChild(shapeHovered[i]);
		}
		
		shapeHovered = new Array();
		//Srote the hovered over shape
		shapeHovered.push(e.target);

		//Remove/Hide the shape that shape
		stage.removeChild(e.target);
		//shapeHovered.opacity= 0.0;

		//Add mouseout event


		stage.update();
	}

	/** Hover Out of a shape *********
	*   Replaces the removed shape
	*   JPS 07/16/13
	*********************************/
	function handleStateOut(e){

		
		for(var i = 0; i < shapeHovered.length; i++)
		{
			stage.addChild(shapeHovered[i]);
		}
		
		shapeHovered = new Array();
		

		//Update Stage
		stage.update();
	}

	/** Hover Out of a shape *********
	*   Replaces the removed shape
	*   JPS 07/16/13
	*********************************/
	function handleStateClick(e){

		var shapeLink = ''; 

		for(var i=0; i < shapes.length; i++)
		{		
			if (shapes[i].bitmapID == e.target.id){
				shapeLink = ((shapes[i].id).split('-over'))[0];
			}
		}
		
		window.location = siteURL + "/shapes/" + shapeLink;   
	}


	/** Click on circle shape icon *********
	*   Makes the circle shape icons clickable
	*   MY 07/26/13
	*********************************/
	function handleCircleClick(e){

		var shapeLink = ''; 

		for(var i=0; i < circles.length; i++)
		{
			//console.log('Does ' + shapes[i].bitmapID + '  equal  ' + e.target.id)			
			if (circles[i].bitmapID == e.target.id){
				shapeLink = ((circles[i].id).split('circle-'))[1];
			}
		}
		
		window.location = siteURL + "/shapes/" + shapeLink;
	}

	/** Hover over shape ************
	*   Remove the default polygon
	*   JPS 07/16/13
	*********************************/
	function handleCircleHover(e){

		//console.log('Circle Hovered');
		//console.log(e);
		var shapeLink = null;
		var shapeToHide = null;

		for(var i=0; i < circles.length; i++)
		{
			if (circles[i].bitmapID == e.target.id)
			{	

				shapeLink = ((circles[i].id).split('circle-'))[1];				

			}
		}	

		if(shapeLink != null){

			for(var i=0; i< shapes.length; i++)
			{
				//console.log(shapeLink.trim() + '  ' + shapes[i].id.trim());
				if( shapeLink.trim() == shapes[i].id.trim())
				{
					//console.log(shapeLink.trim() + '  ' + shapes[i].id.trim());
					shapeToHide = shapes[i].element;

				}
			}
		}

		if(shapeToHide != null){

		stage.removeChild(shapeToHide);	
		shapeHovered.push(shapeToHide);

		}

		//Remove/Hide the shape that shape
		//stage.removeChild(e.target);
		//shapeHovered.opacity= 0.0;

		//Add mouseout event


		stage.update();
	}

	/** Hover Out of a shape *********
	*   Replaces the removed shape
	*   JPS 07/16/13
	*********************************/
	function handleCircleClick(e){

		var shapeLink = ''; 
		console.log('clicked');
		//var circleName = (e.target.id).split('-');

		for(var i=0; i < circles.length; i++)
		{
			//console.log('Does ' + shapes[i].bitmapID + '  equal  ' + e.target.id)
			if (circles[i].bitmapID == e.target.id)
				shapeLink = (circles[i].id);
		}

		
		circleName = shapeLink.split('-');
		
		if(circleName.length == 3){
			console.log(circleName);
			shapeLink = circleName[1] + '-' + circleName[2];
		}
		else
			shapeLink = circleName[1];
		console.log(shapeLink);
		window.location = siteURL + "/shapes/" + shapeLink;   
	}

	
	var slideDropDown  = function(){
		if(jQuery(this).parent().find('.dropdown').is(":visible"))
		{
			jQuery(this).parent().find('.dropdown').slideUp();
			jQuery(this).parent().off('mouseleave',slideDropDown);
		}
		else
		{
			jQuery(this).parent().find('.dropdown').slideDown();
			jQuery(this).parent().on('mouseleave',slideDropDown);	
		}
		
		//console.log('clicked');
	};

	//Drop Down Stuff

	jQuery('.selectLabel').on('click', slideDropDown);

	


	//It's a me Mario!
	jQuery(document).ready(function($) {
		init();
	});
})



jQuery(document).ready(function(){

	/** Add the title information later**/

	var stage;  						// The Actual Stage
	var loadingBarContainer;			// The Preloader
	var instructionsImage;
	var stateHovered = new Array();		// Array to hold elements currently hidden

	var path = '';
	var siteURL = jQuery('#siteURL').val();

	//Sets up the data 
	var backgrounds = 
		[
			{	id: "background-borders",	src: path + "assets/backgrounds/usMap-borders.png",  data: "0,0"	 },
			{	id: "background-borders-names",      src: path + "assets/backgrounds/USMap-borders-names.png",  data: "0,0"	 },
			{	id: "background-full",   src: path + "assets/backgrounds/USMap-full.png",  data: "0,0"	 },
			{	id: "background-states-borders",   src: path + "assets/backgrounds/USMap-states-borders.png",  data: "0,0"	 },
		];
	
	var states = 
		[	

//		alabama
//			{	id: "alabama-name", 		src: path + "assets/names/alabama-n.png", 			data: "704.678,330.104"  },
			{	id: "alabama-state", 		src: path + "assets/states/alabama-s.png", 			data: "704.678,330.104"  },																				
			{	id: "alabama-overlay", 		src: path + "assets/overlays/alabama-o.png", 			data: "704.678,330.104"  },																				
//
//		alaska
//			{	id: "alaska-name", 			src: path + "assets/names/alaska-n.png", 				data: "18.529,416.641"  },
			{	id: "alaska-state", 		src: path + "assets/states/alaska-s.png", 			data: "18.529,416.641"  },																				
			{	id: "alaska-overlay", 		src: path + "assets/overlays/alaska-o.png", 			data: "18.529,416.641"  },																				
//
//		arizona
//			{	id: "arizona-name", 		src: path + "assets/names/arizona-n.png", 			data: "301.455,272.605"  },
			{	id: "arizona-state", 		src: path + "assets/states/arizona-s.png", 			data: "301.455,272.605"  },																				
			{	id: "arizona-overlay", 		src: path + "assets/overlays/arizona-o.png", 			data: "301.455,272.605"  },																				
//
//		arkansas
//			{	id: "arkansas-name", 		src: path + "assets/names/arkansas-n.png", 			data: "608.949,307.643"  },
			{	id: "arkansas-state", 		src: path + "assets/states/arkansas-s.png", 			data: "608.949,307.643"  },																				
			{	id: "arkansas-overlay", 	src: path + "assets/overlays/arkansas-o.png", 		data: "608.949,307.643"  },																				
//
//		california
//			{	id: "california-name", 		src: path + "assets/names/california-n.png", 			data: "204.071,148.278"  },
			{	id: "california-state", 	src: path + "assets/states/california-s.png", 		data: "204.071,148.278"  },																				
			{	id: "california-overlay", 	src: path + "assets/overlays/california-o.png", 		data: "204.071,148.278"  },																				
//
//		colorado
//			{	id: "colorado-name", 		src: path + "assets/names/colorado-n.png", 			data: "399.892,212.478"  },
			{	id: "colorado-state", 		src: path + "assets/states/colorado-s.png", 			data: "399.892,212.478"  },																				
			{	id: "colorado-overlay", 	src: path + "assets/overlays/colorado-o.png", 		data: "399.892,212.478"  },																				
//
//		conneticut
//			{	id: "conneticut-name", 		src: path + "assets/names/connecticut-n.png", 			data: "892.382,169.49"  },
			{	id: "conneticut-state", 	src: path + "assets/states/connecticut-s.png", 		data: "892.382,169.49"  },																				
			{	id: "conneticut-overlay", 	src: path + "assets/overlays/connecticut-o.png", 		data: "892.382,169.49"  },																				
//
//		deleware
//			{	id: "deleware-name", 		src: path + "assets/names/delaware-n.png", 			data: "870.169,219.873"  },
			{	id: "deleware-state", 		src: path + "assets/states/delaware-s.png", 			data: "870.169,219.873"  },																			
			{	id: "deleware-overlay", 	src: path + "assets/overlays/delaware-o.png", 		data: "870.169,219.873"  },																			
//
//		florida
//			{	id: "florida-name", 		src: path + "assets/names/florida-n.png", 			data: "719.041	399.933"  },
			{	id: "florida-state", 		src: path + "assets/states/florida-s.png", 			data: "719.041	399.933"  },																			
			{	id: "florida-overlay", 		src: path + "assets/overlays/florida-o.png", 			data: "719.041	399.933"  },																			
//
//		georgia
//			{	id: "georgia-name", 		src: path + "assets/names/georgia-n.png", 			data: "742.809,325.883"  },
			{	id: "georgia-state", 		src: path + "assets/states/georgia-s.png", 			data: "742.809,325.883"  },																			
			{	id: "georgia-overlay", 		src: path + "assets/overlays/georgia-o.png", 			data: "742.809,325.883"  },																																							
//
//		hawaii
//			{	id: "hawaii-name", 			src: path + "assets/names/hawaii-n.png", 				data: "292.984,520.42"  },
			{	id: "hawaii-state", 		src: path + "assets/states/hawaii-s.png", 			data: "292.984,520.42"  },																			
			{	id: "hawaii-overlay", 		src: path + "assets/overlays/hawaii-o.png", 			data: "292.984,520.42"  },																				
//
//		idaho
//			{	id: "idaho-name", 			src: path + "assets/names/idaho-n.png", 				data: "307.439,49.907"  },
			{	id: "idaho-state", 			src: path + "assets/states/idaho-s.png", 				data: "307.439,49.907"  },																				
			{	id: "idaho-overlay", 		src: path + "assets/overlays/idaho-o.png", 			data: "307.439,49.907"  },																				
//
//		illinois
//			{	id: "illinois-name", 		src: path + "assets/names/illinois-n.png", 			data: "651.729,196.073"  },
			{	id: "illinois-state", 		src: path + "assets/states/illinois-s.png", 			data: "651.729,196.073"  },																			
			{	id: "illinois-overlay", 	src: path + "assets/overlays/illinois-o.png", 		data: "651.729,196.073"  },																			
//
//		indiana
//			{	id: "indiana-name", 		src: path + "assets/names/indiana-n.png", 			data: "702.065,205.31"  },
			{	id: "indiana-state", 		src: path + "assets/states/indiana-s.png", 			data: "702.065,205.31"  },																				
			{	id: "indiana-overlay", 		src: path + "assets/overlays/indiana-o.png", 			data: "702.065,205.31"  },																		
//
//		iowa
//			{	id: "iowa-name", 			src: path + "assets/names/iowa-n.png", 				data: "581.242,179.749"  },
			{	id: "iowa-state", 			src: path + "assets/states/iowa-s.png", 				data: "581.242,179.749"  },																			
			{	id: "iowa-overlay", 		src: path + "assets/overlays/iowa-o.png", 			data: "581.242,179.749"  },																				
//
//		kansas
//			{	id: "kansas-name", 			src: path + "assets/names/kansas-n.png", 				data: "501.356,240.946"  },
			{	id: "kansas-state", 		src: path + "assets/states/kansas-s.png", 			data: "501.356,240.946"  },																			
			{	id: "kansas-overlay", 		src: path + "assets/overlays/kansas-o.png", 			data: "501.356,240.946"  },																			
//
//		kentucky
//			{	id: "kentucky-name", 		src: path + "assets/names/kentucky-n.png", 			data: "684.337,253.214"  },
			{	id: "kentucky-state", 		src: path + "assets/states/kentucky-s.png", 			data: "684.337,253.214"  },																			
			{	id: "kentucky-overlay", 	src: path + "assets/overlays/kentucky-o.png", 		data: "684.337,253.214"  },																			
//
//		louisiana
//			{	id: "louisiana-name", 		src: path + "assets/names/louisiana-n.png", 			data: "617.849,372.586"  },
			{	id: "louisiana-state", 		src: path + "assets/states/louisiana-s.png", 			data: "617.849,372.586"  },																			
			{	id: "louisiana-overlay", 	src: path + "assets/overlays/louisiana-o.png", 		data: "617.849,372.586"  },																			
//
//		maine
//			{	id: "maine-name", 			src: path + "assets/names/maine-n.png", 				data: "909.128,63.723"  },
			{	id: "maine-state", 			src: path + "assets/states/maine-s.png", 				data: "909.128,63.723"  },,																				
			{	id: "maine-overlay", 		src: path + "assets/overlays/maine-o.png", 			data: "909.128,63.723"  },																				
//
//		maryland
//			{	id: "maine-name", 			src: path + "assets/names/maryland-n.png", 			data: "819.403,222.965"  },
			{	id: "maine-state", 			src: path + "assets/states/maryland-s.png", 			data: "819.403,222.965"  },																				
			{	id: "maine-overlay", 		src: path + "assets/overlays/maryland-o.png", 		data: "819.403,222.965"  },																				
//
//		massachusettes
//			{	id: "massachusettes-name", 			src: path + "assets/names/massachusetts-n.png", 		data: "891.723,150.956"  },
			{	id: "massachusettes-state", 		src: path + "assets/states/massachusetts-s.png", 	data: "891.723,150.956"  },																				
			{	id: "massachusettes-overlay", 		src: path + "assets/overlays/massachusetts-o.png", 	data: "891.723,150.956"  },																				
//
//		michigan
//			{	id: "michigan-name", 		src: path + "assets/names/michigan-n.png", 			data: "661.354,104.954"  },
			{	id: "michigan-state", 		src: path + "assets/states/michigan-s.png", 			data: "661.354,104.954"  },																				
			{	id: "michigan-overlay", 	src: path + "assets/overlays/michigan-o.png", 		data: "661.354,104.954"  },																				
//
//		minnesota
//			{	id: "minnesota-name", 		src: path + "assets/names/minnesota-n.png", 			data: "575.956,73.311"  },
			{	id: "minnesota-state", 		src: path + "assets/states/minnesota-s.png", 			data: "575.956,73.311"  },																				
			{	id: "minnesota-overlay", 	src: path + "assets/overlays/minnesota-o.png", 		data: "575.956,73.311"  },																				
//
//		mississippi
//			{	id: "mississippi-name", 	src: path + "assets/names/mississippi-n.png", 		data: "655.614,333.363"  },
			{	id: "mississippi-state", 	src: path + "assets/states/mississippi-s.png", 		data: "655.614,333.363"  },																				
			{	id: "mississippi-overlay", 	src: path + "assets/overlays/mississippi-o.png", 		data: "655.614,333.363"  },																				
//
//		missouri
//			{	id: "missouri-name", 		src: path + "assets/names/missouri-n.png", 			data: "592.664,233.343"  },
			{	id: "missouri-state", 		src: path + "assets/states/missouri-s.png", 			data: "592.664,233.343"  },																				
			{	id: "missouri-overlay", 	src: path + "assets/overlays/missouri-o.png", 		data: "592.664,233.343"  },																				
//
//		montana
//			{	id: "montana-name", 		src: path + "assets/names/montana-n.png", 			data: "344.316,52.563"  },
			{	id: "montana-state", 		src: path + "assets/states/montana-s.png", 			data: "344.316,52.563"  },																				
			{	id: "montana-overlay", 		src: path + "assets/overlays/montana-o.png", 			data: "344.316,52.563"  },																				
//
//		nebraska
//			{	id: "nebraska-name", 		src: path + "assets/names/nebraska-n.png", 			data: "479.325,184.098"  },
			{	id: "nebraska-state", 		src: path + "assets/states/nebraska-s.png", 			data: "479.325,184.098"  },																				
			{	id: "nebraska-overlay", 	src: path + "assets/overlays/nebraska-o.png", 		data: "479.325,184.098"  },																				
//
//		nevada
//			{	id: "nevada-name", 			src: path + "assets/names/nevada-n.png", 				data: "253.835,163.923"  },
			{	id: "nevada-state", 		src: path + "assets/states/nevada-s.png", 			data: "253.835,163.923"  },																				
			{	id: "nevada-overlay", 		src: path + "assets/overlays/nevada-o.png", 			data: "253.835,163.923"  },																				
//
//		new hampshire
//			{	id: "newhampshire-name", 	src: path + "assets/names/newhampshire-n.png", 		data: "899.869,109.317"  },
			{	id: "newhampshire-state", 	src: path + "assets/states/newhampshire-s.png", 		data: "899.869,109.317"  },																				
			{	id: "newhampshire-overlay", src: path + "assets/overlays/newhampshire-o.png", 	data: "899.869,109.317"  },																				
//
//		new jersey
//			{	id: "newjersey-name", 		src: path + "assets/names/newjersey-n.png", 			data: "873.656,190.124"  },
			{	id: "newjersey-state", 		src: path + "assets/states/newjersey-s.png", 			data: "873.656,190.124"  },																				
			{	id: "newjersey-overlay", 	src: path + "assets/overlays/newjersey-o.png", 		data: "873.656,190.124"  },																				
//
//		new mexico
//			{	id: "newmexico-name", 		src: path + "assets/names/newmexico-n.png", 			data: "384.545,285.188"  },
			{	id: "newmexico-state", 		src: path + "assets/states/newmexico-s.png", 			data: "384.545,285.188"  },																				
			{	id: "newmexico-overlay", 	src: path + "assets/overlays/newmexico-o.png", 		data: "384.545,285.188"  },																				
//
//		new york
//			{	id: "newyork-name", 		src: path + "assets/names/newyork-n.png", 			data: "808.187,121.822"  },
			{	id: "newyork-state", 		src: path + "assets/states/newyork-s.png", 			data: "808.187,121.822"  },																				
			{	id: "newyork-overlay", 		src: path + "assets/overlays/newyork-o.png", 			data: "808.187,121.822"  },																				
//
//		north carolina
//			{	id: "northcarolina-name", 		src: path + "assets/names/northcarolina-n.png", 		data: "762.12,278.268"  },
			{	id: "northcarolina-state", 		src: path + "assets/states/northcarolina-s.png", 		data: "762.12,278.268"  },																				
			{	id: "northcarolina-overlay",	src: path + "assets/overlays/northcarolina-o.png", 	data: "762.12,278.268"  },																				
//
//		north dakota
//			{	id: "northdakota-name", 	src: path + "assets/names/northdakota-n.png", 		data: "487.926,75.911"  },
			{	id: "northdakota-state", 	src: path + "assets/states/northdakota-s.png", 		data: "487.926,75.911"  },																				
			{	id: "northdakota-overlay", 	src: path + "assets/overlays/northdakota-o.png", 		data: "487.926,75.911"  },																				
//
//		oaklahoma
//			{	id: "oaklahoma-name", 		src: path + "assets/names/oklahoma-n.png", 			data: "486.325,295.367"  },
			{	id: "oaklahoma-state", 		src: path + "assets/states/oklahoma-s.png", 			data: "486.325,295.367"  },																				
			{	id: "oaklahoma-overlay", 	src: path + "assets/overlays/oklahoma-o.png", 		data: "486.325,295.367"  },																			
//
//		ohio
//			{	id: "ohio-name", 			src: path + "assets/names/ohio-n.png", 				data: "741.73,193.881"  },
			{	id: "ohio-state", 			src: path + "assets/states/ohio-s.png", 				data: "741.73,193.881"  },																				
			{	id: "ohio-overlay", 		src: path + "assets/overlays/ohio-o.png", 			data: "741.73,193.881"  },																				
//
//		oregon
//			{	id: "oregon-name", 			src: path + "assets/names/oregon-n.png", 				data: "214.805,76.626"  },
			{	id: "oregon-state", 		src: path + "assets/states/oregon-s.png", 			data: "214.805,76.626"  },																			
			{	id: "oregon-overlay", 		src: path + "assets/overlays/oregon-o.png", 			data: "214.805,76.626"  },																				
//
//		pennsylvania
//			{	id: "pennsylvania-name", 		src: path + "assets/names/pennsylvania-n.png", 		data: "798.892,181.022"  },
			{	id: "pennsylvania-state", 		src: path + "assets/states/pennsylvania-s.png", 		data: "798.892,181.022"  },																			
			{	id: "pennsylvania-overlay", 	src: path + "assets/overlays/pennsylvania-o.png", 	data: "798.892,181.022"  },																				
//
//		rhode island
//			{	id: "rhodeisland-name", 	src: path + "assets/names/rhodeisland-n.png", 		data: "914.256,167.848"  },
			{	id: "rhodeisland-state", 	src: path + "assets/states/rhodeisland-s.png", 		data: "914.256,167.848"  },																			
			{	id: "rhodeisland-overlay", 	src: path + "assets/overlays/rhodeisland-o.png", 		data: "914.256,167.848"  },																			
//
//		south carolina
//			{	id: "southcarolina-name", 		src: path + "assets/names/southcarolina-n.png", 		data: "777.109,319.271"  },
			{	id: "southcarolina-state", 		src: path + "assets/states/southcarolina-s.png", 		data: "777.109,319.271"  },																				
			{	id: "southcarolina-overlay", 	src: path + "assets/overlays/southcarolina-o.png", 	data: "777.109,319.271"  },																				
//
//		south dakota
//			{	id: "southdakota-name", 	src: path + "assets/names/southdakota-n.png", 		data: "482.825,130.611"  },
			{	id: "southdakota-state", 	src: path + "assets/states/southdakota-s.png", 		data: "482.825,130.611"  },																			
			{	id: "southdakota-overlay", 	src: path + "assets/overlays/southdakota-o.png", 		data: "482.825,130.611"  },																				
//
//		tennessee
//			{	id: "tennessee-name", 		src: path + "assets/names/tennessee-n.png", 			data: "673.132,292.739"  },
			{	id: "tennessee-state", 		src: path + "assets/states/tennessee-s.png", 			data: "673.132,292.739"  },																			
			{	id: "tennessee-overlay", 	src: path + "assets/overlays/tennessee-o.png", 		data: "673.132,292.739"  },																				
//
//		texas
//			{	id: "texas-name", 			src: path + "assets/names/texas-n.png", 				data: "661.354,104.954"  },
			{	id: "texas-state", 			src: path + "assets/states/texas-s.png", 				data: "661.354,104.954"  },																			
			{	id: "texas-overlay", 		src: path + "assets/overlays/texas-o.png", 			data: "661.354,104.954"  },																			
//
//		utah
//			{	id: "utah-name", 			src: path + "assets/names/utah-n.png", 				data: "328.47,182.492"  },
			{	id: "utah-state", 			src: path + "assets/states/utah-s.png", 				data: "328.47,182.492"  },																			
			{	id: "utah-overlay", 		src: path + "assets/overlays/utah-o.png", 			data: "328.47,182.492"  },																				
//
//		vermont
//			{	id: "vermont-name", 		src: path + "assets/names/vermont-n.png", 			data: "881.803,116.271"  },
			{	id: "vermont-state", 		src: path + "assets/states/vermont-s.png", 			data: "881.803,116.271"  },																				
			{	id: "vermont-overlay", 		src: path + "assets/overlays/vermont-o.png", 			data: "881.803,116.271"  },																				
//
//		virginia
//			{	id: "virginia-name", 		src: path + "assets/names/virginia-n.png", 			data: "767.999,234.685"  },
			{	id: "virginia-state", 		src: path + "assets/states/virginia-s.png", 			data: "767.999,234.685"  },																			
			{	id: "virginia-overlay", 	src: path + "assets/overlays/virginia-o.png", 		ddata: "767.999,234.685"  },																				
//
//		washington
//			{	id: "washington-name", 		src: path + "assets/names/washington-n.png", 			data: "241.304,31.857"  },
			{	id: "washington-state", 	src: path + "assets/states/washington-s.png", 		data: "241.304,31.857"  },																			
			{	id: "washington-overlay", 	src: path + "assets/overlays/washington-o.png", 		data: "241.304,31.857"  },																				
//
//		west virginia
//			{	id: "westvirginia-name", 		src: path + "assets/names/westvirginia-n.png", 		data: "779.518,218.057"  },
			{	id: "westvirginia-state", 		src: path + "assets/states/westvirginia-s.png", 		data: "779.518,218.057"  },																			
			{	id: "westvirginia-overlay", 	src: path + "assets/overlays/westvirginia-o.png", 	data: "779.518,218.057"  },																				
//
//		wisconsin
//			{	id: "wisconsin-name", 		src: path + "assets/names/wisconsin-n.png", 			data: "630.297,117.085"  },
			{	id: "wisconsin-state", 		src: path + "assets/states/wisconsin-s.png", 			data: "630.297,117.085"  },																			
			{	id: "wisconsin-overlay", 	src: path + "assets/overlays/wisconsin-o.png", 		data: "630.297,117.085"  },																				
//
//		wyoming
//			{	id: "wyoming-name", 		src: path + "assets/names/wyoming-n.png", 			data: "383.601,135.683"  },
			{	id: "wyoming-state", 		src: path + "assets/states/wyoming-s.png", 			data: "383.601,135.683"  },																				
			{	id: "wyoming-overlay", 		src: path + "assets/overlays/wyoming-o.png", 			data: "383.601,135.683"  },																				
		];//    ^^   ID of the          	^^^  Relative location of assets					^^^   X,Y cordinates


	/**		var circles =
		[
			
			{	id: "circle-alaska", 		src: path + "assets/circle-buttons/Alaska.png",			data: "30,295" },
			{	id: "circle-hawaii", 		src: path + "assets/circle-buttons/Hawaii.png",			data: "30,332" },
			{	id: "circle-vermont", 		src: path + "assets/circle-buttons/Vermont.png",			data: "565,127" },
			{	id: "circle-new-hampshire",	src: path + "assets/circle-buttons/New-Hampshire.png",	data: "565,162" },
			{	id: "circle-massachusetts",	src: path + "assets/circle-buttons/Massachusetts.png",	data: "565,197" },
			{	id: "circle-rhode-island",	src: path + "assets/circle-buttons/Rhode-Island.png",		data: "565,233" },
			{	id: "circle-connecticut",	src: path + "assets/circle-buttons/Connecticut.png",		data: "565,268" },
			{	id: "circle-delaware",		src: path + "assets/circle-buttons/Delaware.png",			data: "565,303" },
			{	id: "circle-maryland",		src: path + "assets/circle-buttons/Maryland.png",			data: "565,338" },
	*/

	/** Init *********************
	*   Setup the Canvas element
	*   enable needed CreateJS elements
	*   Setup preloading bar
	*   JPS 07/15/2013
	*********************************/
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
			preload.addEventListener("complete", handleComplete);
			preload.addEventListener("progress", handleProgress);
			
			//adding our files to the queue
			//preload.loadFile({id: "backgrounds", src:"images/background.jpg"});

			var assets = backgrounds.concat(states);
//			var assets = assets.concat(circles); // commented this out - Teresa Light 2014 02, not using this

			preload.loadManifest(assets);
//			preload.loadFile({id: "instructions", src: path + "assets/instructions.png"});
			
			stage.update();
		}else{
			jQuery('#stateSelect,#regionSelect').show();
			jQuery('.picme').css('height','21px');
			jQuery('#stateSelect').css('top','209px');
			jQuery('#stateSelect').css('left','110px');
			jQuery('#stateSelect select').css('width','167px');
			jQuery('#stateSelect select').css('height','21px');
			jQuery('#regionSelect').css('top','209');
			jQuery('#regionSelect').css('left','327');
			jQuery('#regionSelect select').css('width','167px');
			jQuery('#regionSelect select').css('height','21px');
			jQuery('#stateMap').css('display','none');
			jQuery('#stateMap').css('width','0');
			jQuery('#stateMap').css('height','0');
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
		jQuery('#stateSelect,#regionSelect').show();
		var loadedImage = preload.getResult(background[0].id);
		var bitmapImage = new createjs.Bitmap(loadedImage);
			
		stage.addChild(bitmapImage);


		//Load States

		for(var counter = 0; counter < states.length; counter++)
		{
			var loadedImage = preload.getResult(states[counter].id);
			var bitmapImage = new createjs.Bitmap(loadedImage);
			
			states[counter].bitmapID = bitmapImage.id;
			//console.log(states[counter]);

			if(typeof (states[counter].data) != 'undefined')
			{
				var coordinates = states[counter].data.split(',');
				bitmapImage.x = coordinates[0]
				bitmapImage.y = coordinates[1]; 

			}
			
			states[counter].element = stage.addChild(bitmapImage);
			states[counter].element. cursor = "pointer";
			//console.log(states[counter].id.indexOf('ver'));

			//Add event listeners to the default polygons.
			//console.log(states[counter].id);
			if((states[counter].id.indexOf('over')==-1)&&(states[counter].id.indexOf('background')==-1))
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
			for(var i = 0; i < stateHovered.length; i++)
			{
				stage.addChild(stateHovered[i]);
			}
			stage.removeChild(instructionsImage);
			stateHovered = new Array();
			instructionsImage = stage.addChild(bitmapImage);
			stage.update();
		})

	

		//refresh the stage
		stage.update();

		
	}


	/** Hover over state ************
	*   Remove the default polygon
	*   JPS 07/16/13
	*********************************/
	function handleStateHover(e){

		//console.log('Hovered');
		//console.log(e);
		
		for(var i = 0; i < stateHovered.length; i++)
		{
			stage.addChild(stateHovered[i]);
		}
		
		stateHovered = new Array();
		//Srote the hovered over state
		stateHovered.push(e.target);

		//Remove/Hide the state that state
		stage.removeChild(e.target);
		//stateHovered.opacity= 0.0;

		//Add mouseout event


		stage.update();
	}

	/** Hover Out of a state *********
	*   Replaces the removed state
	*   JPS 07/16/13
	*********************************/
	function handleStateOut(e){

		
		for(var i = 0; i < stateHovered.length; i++)
		{
			stage.addChild(stateHovered[i]);
		}
		
		stateHovered = new Array();
		

		//Update Stage
		stage.update();
	}

	/** Hover Out of a state *********
	*   Replaces the removed state
	*   JPS 07/16/13
	*********************************/
	function handleStateClick(e){

		var stateLink = ''; 

		for(var i=0; i < states.length; i++)
		{		
			if (states[i].bitmapID == e.target.id){
				stateLink = ((states[i].id).split('-over'))[0];
			}
		}
		
		window.location = siteURL + "/states/" + stateLink;   
	}


	/** Click on circle state icon *********
	*   Makes the circle state icons clickable
	*   MY 07/26/13
	*********************************/
	function handleCircleClick(e){

		var stateLink = ''; 

		for(var i=0; i < circles.length; i++)
		{
			//console.log('Does ' + states[i].bitmapID + '  equal  ' + e.target.id)			
			if (circles[i].bitmapID == e.target.id){
				stateLink = ((circles[i].id).split('circle-'))[1];
			}
		}
		
		window.location = siteURL + "/states/" + stateLink;
	}

	/** Hover over state ************
	*   Remove the default polygon
	*   JPS 07/16/13
	*********************************/
	function handleCircleHover(e){

		//console.log('Circle Hovered');
		//console.log(e);
		var stateLink = null;
		var stateToHide = null;

		for(var i=0; i < circles.length; i++)
		{
			if (circles[i].bitmapID == e.target.id)
			{	

				stateLink = ((circles[i].id).split('circle-'))[1];				

			}
		}	

		if(stateLink != null){

			for(var i=0; i< states.length; i++)
			{
				//console.log(stateLink.trim() + '  ' + states[i].id.trim());
				if( stateLink.trim() == states[i].id.trim())
				{
					//console.log(stateLink.trim() + '  ' + states[i].id.trim());
					stateToHide = states[i].element;

				}
			}
		}

		if(stateToHide != null){

		stage.removeChild(stateToHide);	
		stateHovered.push(stateToHide);

		}

		//Remove/Hide the state that state
		//stage.removeChild(e.target);
		//stateHovered.opacity= 0.0;

		//Add mouseout event


		stage.update();
	}

	/** Hover Out of a state *********
	*   Replaces the removed state
	*   JPS 07/16/13
	*********************************/
	function handleCircleClick(e){

		var stateLink = ''; 
		console.log('clicked');
		//var circleName = (e.target.id).split('-');

		for(var i=0; i < circles.length; i++)
		{
			//console.log('Does ' + states[i].bitmapID + '  equal  ' + e.target.id)
			if (circles[i].bitmapID == e.target.id)
				stateLink = (circles[i].id);
		}

		
		circleName = stateLink.split('-');
		
		if(circleName.length == 3){
			console.log(circleName);
			stateLink = circleName[1] + '-' + circleName[2];
		}
		else
			stateLink = circleName[1];
		console.log(stateLink);
		window.location = siteURL + "/states/" + stateLink;   
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



jQuery(document).ready(function(){

	var stage;
	var canvas;
	var preload;
	// The preloader
	var loadingBarContainer;
	var loadingBar;
	var shapeLabel;

	// Base path to the relative assets
	var path = '';
	
	/***********************************
	 * Define all arrays for the assets
	 *********/

	// array for the images of the backgrounds
	var backgrounds = 
	[
		{	id: "background-shapes-borders",   	src: path + "assets/backgrounds/blank.png",  data: "0,0"	 },
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
		{	id: "alabama-overlay", 			src: path + "assets/overlays/alabama-o.png", 		data: "582,272", label: "Alabama"    	},																																					
		{	id: "alaska-overlay", 			src: path + "assets/overlays/alaska-o.png", 		data: "14,344",  label: "Alaska"     	},																																								
		{	id: "arizona-overlay", 			src: path + "assets/overlays/arizona-o.png", 		data: "249,225", label: "Arizona"    	},																																							
		{	id: "arkansas-overlay", 		src: path + "assets/overlays/arkansas-o.png", 		data: "503,254", label: "Arkansas"  	},																																						
		{	id: "california-overlay", 		src: path + "assets/overlays/california-o.png", 	data: "168,122", label: "California" 	},																				
		{	id: "colorado-overlay", 		src: path + "assets/overlays/colorado-o.png", 		data: "330,175", label: "Colorado"		},																				
		{	id: "conneticut-overlay", 		src: path + "assets/overlays/connecticut-o.png", 	data: "738,139", label: "Connecticut" 	},																				
		{	id: "delaware-overlay", 		src: path + "assets/overlays/delaware-o.png", 		data: "720,182", label: "Delaware" 		},																			
		{	id: "florida-overlay", 			src: path + "assets/overlays/florida-o.png", 		data: "595,330", label: "Florida" 		},																			
		{	id: "georgia-overlay", 			src: path + "assets/overlays/georgia-o.png", 		data: "614,269", label: "Georgia" 		},																			
		{	id: "hawaii-overlay", 			src: path + "assets/overlays/hawaii-o.png", 		data: "241,430", label: "Hawaii"		},																			
		{	id: "idaho-overlay", 			src: path + "assets/overlays/idaho-o.png", 			data: "254,40",  label: "Idaho"  		},																				
		{	id: "illinois-overlay", 		src: path + "assets/overlays/illinois-o.png", 		data: "538,162", label: "Illinois" 		},																			
		{	id: "indiana-overlay", 			src: path + "assets/overlays/indiana-o.png", 		data: "580,169", label: "Indiana" 		},																				
		{	id: "iowa-overlay", 			src: path + "assets/overlays/iowa-o.png", 			data: "480,148", label: "Iowa"			},																			
		{	id: "kansas-overlay", 			src: path + "assets/overlays/kansas-o.png", 		data: "414,198", label: "Kansas" 		},																			
		{	id: "kentucky-overlay", 		src: path + "assets/overlays/kentucky-o.png", 		data: "566,209", label: "kentucky" 		},																			
		{	id: "louisiana-overlay", 		src: path + "assets/overlays/louisiana-o.png", 		data: "510,308", label: "Louisiana"		},																			
		{	id: "maine-overlay", 			src: path + "assets/overlays/maine-o.png", 			data: "752,52",  label: "Maine"			},																			
		{	id: "maryland-overlay", 		src: path + "assets/overlays/maryland-o.png", 		data: "677,184", label: "Maryland"		},																			
		{	id: "massachusettes-overlay",	src: path + "assets/overlays/massachusetts-o.png", 	data: "738,125", label: "Massachusetts"	},																				
		{	id: "michigan-overlay", 		src: path + "assets/overlays/michigan-o.png", 		data: "547,86",  label: "Michigan"		},																			
		{	id: "minnesota-overlay", 		src: path + "assets/overlays/minnesota-o.png", 		data: "476,60",  label: "Minnesota"		},																				
		{	id: "mississippi-overlay", 		src: path + "assets/overlays/mississippi-o.png", 	data: "542,275", label: "Mississippi"	},																			
		{	id: "missouri-overlay", 		src: path + "assets/overlays/missouri-o.png", 		data: "489,192", label: "Missouri"		},																				
		{	id: "montana-overlay", 			src: path + "assets/overlays/montana-o.png", 		data: "284,42",  label: "Montana"		},																				
		{	id: "nebraska-overlay", 		src: path + "assets/overlays/nebraska-o.png", 		data: "396,152", label: "Nebraska"		},																				
		{	id: "nevada-overlay", 			src: path + "assets/overlays/nevada-o.png", 		data: "209,135", label: "Nevada"		},																				
		{	id: "newhampshire-overlay", 	src: path + "assets/overlays/newhampshire-o.png", 	data: "744,90",  label: "New Hampshire"	},																				
		{	id: "newjersey-overlay", 		src: path + "assets/overlays/newjersey-o.png", 		data: "722,157", label: "New Jersey"	},																				
		{	id: "newmexico-overlay", 		src: path + "assets/overlays/newmexico-o.png", 		data: "317,236", label: "New Mexico"	},																				
		{	id: "newyork-overlay", 			src: path + "assets/overlays/newyork-o.png", 		data: "668,100", label: "New York"		},																				
		{	id: "northcarolina-overlay", 	src: path + "assets/overlays/northcarolina-o.png", 	data: "630,230", label: "North Carolina"},																				
		{	id: "northdakota-overlay", 		src: path + "assets/overlays/northdakota-o.png", 	data: "403,62",  label: "North Dakota"	},																				
		{	id: "oaklahoma-overlay", 		src: path + "assets/overlays/oklahoma-o.png", 		data: "402,244", label: "Oklahoma"		},																		
		{	id: "ohio-overlay", 			src: path + "assets/overlays/ohio-o.png", 			data: "613,159", label: "Ohio"			},																				
		{	id: "oregon-overlay", 			src: path + "assets/overlays/oregon-o.png", 		data: "177,62",  label: "Oregon"		},																			
		{	id: "pennsylvania-overlay", 	src: path + "assets/overlays/pennsylvania-o.png", 	data: "661,149", label: "Pennsylvania"	},																			
		{	id: "rhodeisland-overlay", 		src: path + "assets/overlays/rhodeisland-o.png", 	data: "756,139", label: "Rhodeisland"	},																			
		{	id: "southcarolina-overlay", 	src: path + "assets/overlays/southcarolina-o.png", 	data: "643,264", label: "South Carolina"},																				
		{	id: "southdakota-overlay", 		src: path + "assets/overlays/southdakota-o.png", 	data: "398,107", label: "South Dakota"	},																			
		{	id: "tennessee-overlay", 		src: path + "assets/overlays/tennessee-o.png", 		data: "556,241", label: "Tennessee"		},																			
		{	id: "texas-overlay", 			src: path + "assets/overlays/texas-o.png", 			data: "349,251", label: "Texas"			},																			
		{	id: "utah-overlay", 			src: path + "assets/overlays/utah-o.png", 			data: "271,150", label: "Utah"			},																			
		{	id: "vermont-overlay", 			src: path + "assets/overlays/vermont-o.png", 		data: "729,96",  label: "Vermont"		},																				
		{	id: "virginia-overlay", 		src: path + "assets/overlays/virginia-o.png", 		data: "635,193", label: "Virginia"		},																			
		{	id: "washington-overlay", 		src: path + "assets/overlays/washington-o.png", 	data: "199,25",  label: "Washington"	},																			
		{	id: "westvirginia-overlay", 	src: path + "assets/overlays/westvirginia-o.png", 	data: "644,180", label: "West Virginia"	},																			
		{	id: "wisconsin-overlay", 		src: path + "assets/overlays/wisconsin-o.png", 		data: "521,96",  label: "Wisconsin"		},																			
		{	id: "wyoming-overlay", 			src: path + "assets/overlays/wyoming-o.png", 		data: "316,111", label: "Wyoming"		},																																						
	];
	
	
		
	function init() {
			//console.log ("Names Array: ", nameArray);
			// initialize the stage
			
			// see of the broswer supports Canvas
			function isCanvasSupported(){
			  var elem = document.createElement("canvas");
			  return !!(document.createElement("canvas").getContext && document.createElement("canvas").getContext("2d"));
			}
	
			//Concatonate all the arrays
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
			loadProgressLabel.text = "loading:" + Math.round(preload.progress*100);
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
	 	 
	 	function handleClick(event) {
	 		var container = event.currentTarget;
	 		var image = event.target;
	 		var label = container.label;
			shapeLabel.text = label;
	 	}
	 	
	 	function handleOver(event) {
			var container = event.currentTarget;
			var image = event.target;
			var label = container.label;
			
			 createjs.Tween.get(container.getChildAt(0)).to({alpha:1}, 500);
			 //container.getChildAt(0).alpha = 1;
			 //container.getChildAt(1).alpha = 0;
			 createjs.Tween.get(container.getChildAt(1)).to({alpha:0}, 500);
			
			shapeLabel.text = label;
	 	}
	 	
	 	function handleOut(event) {
			var container = event.currentTarget;
			var image = event.target;
			//container.getChildAt(0).alpha = 0;
			//container.getChildAt(1).alpha = 1;
			createjs.Tween.get(container.getChildAt(0)).to({alpha:0}, 500);
			createjs.Tween.get(container.getChildAt(1)).to({alpha:1}, 500);
			
			var label = container.label;
			shapeLabel.text = "";
	 	}
	 	 
		function start() {
			
			createjs.Ticker.addEventListener("tick", stage);
			createjs.Sound.registerSound({id:"tick", src:"assets/sounds/tap-play-6.wav"});
			//Put the background images on the stage
			
			var bitMapImage = new createjs.Bitmap(preload.getResult("background-shapes-borders"));
			stage.addChild(bitMapImage);
			
			for (var counter = 0; counter < overlays.length; counter ++){
				var shapeData = shapes[counter];
				var overlayData = overlays[counter];
				var shapeImage = new createjs.Bitmap(preload.getResult(shapeData.id));
				var overlayImage = new createjs.Bitmap(preload.getResult(overlayData.id));
				var coordinates = shapeData.data.split(',');
				var container = new createjs.Container();
				container.x = coordinates[0];
				container.y = coordinates[1];
				container.label = overlayData.label;
				container.addEventListener('mouseover',handleOver);
				container.addEventListener('mouseout',handleOut);
				container.addEventListener('click', handleClick);
				
				container.addChild(overlayImage, shapeImage);
				stage.addChild(container);
			}
	
			//Text Box for State Labels
			var border = new createjs.Shape();
			border.graphics.beginStroke("#3336699");
			border.graphics.setStrokeStyle(1);
			border.snapToPixel = true;
			border.graphics.drawRect(0, 0, 200, 100);
			border.x = 740;
			border.y = 420;
			stage.addChild(border);
	
			shapeLabel = new createjs.Text("", "18px Arial", "#3336699");
			shapeLabel.y = 445;
	    	shapeLabel.x = 840;
	    	shapeLabel.width= 200;
	    	shapeLabel.textAlign = "center";
			stage.addChild(shapeLabel);
		}
		
	//Do what you love...Love what you do...Pixel Heart Apps.

	jQuery(document).ready(function($) {
		init();
	});
})
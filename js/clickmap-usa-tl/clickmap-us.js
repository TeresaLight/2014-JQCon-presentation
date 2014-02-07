jQuery(document).ready(function(){

	//console.log = function() {};
	/** Globals *********************
	*   The elements that will be 
	*	used throughout the code
	*   JPS 07/15/2013
	*********************************/

	//console.log('Loaded CEW4US Map');

	var stage;  						// The Actual Stage
	var loadingBarContainer;			// The Preloader
	var instructionsImage;
	var stateHovered = new Array();		// Array to hold elements currently hidden

	var pluginpath = jQuery('#pluginpath').val();
	var siteURL = jQuery('#siteURL').val();

	//console.log(pluginpath);
	//Sets up the data for each polygon
	var background = 
		[
			{	id: "background",       	src: pluginpath + "assets/map-background.jpg",     		data: "0,0"	 },
		];

	var states = 
		[	

			{	id: "alabama-over", 		src: pluginpath + "assets/over/Alabama-over.png", 			data: "406,237"  },																				
			{	id: "alabama", 				src: pluginpath + "assets/states/Alabama.png", 				data: "406,237"  },

			{	id: "arizona-over", 		src: pluginpath + "assets/over/Arizona-over.png", 			data: "89,198"  },																				
			{	id: "arizona", 				src: pluginpath + "assets/states/Arizona.png", 				data: "89,198"  },

			{	id: "arkansas-over", 		src: pluginpath + "assets/over/Arkansas-over.png", 			data: "331,220"  },
			{	id: "arkansas", 			src: pluginpath + "assets/states/Arkansas.png", 			data: "331,220"  },

			{	id: "california-over", 		src: pluginpath + "assets/over/California-over.png", 		data: "7.5,101"  },
			{	id: "california", 			src: pluginpath + "assets/states/California.png", 			data: "7.5,101"  },

			{	id: "colorado-over", 		src: pluginpath + "assets/over/Colorado-over.png", 			data: "165,148"  },
			{	id: "colorado", 			src: pluginpath + "assets/states/Colorado.png", 			data: "165,148"  },

			{	id: "connecticut-over", 	src: pluginpath + "assets/over/Connecticut-over.png", 		data: "554,108"  },
			{	id: "connecticut", 			src: pluginpath + "assets/states/Connecticut.png", 			data: "554,108"  },

			{	id: "delaware-over", 		src: pluginpath + "assets/over/Delaware-over.png", 			data: "539,151"  },
			{	id: "delaware", 			src: pluginpath + "assets/states/Delaware.png", 			data: "539,151"  },

			{	id: "florida-over", 		src: pluginpath + "assets/over/Florida-over.png", 			data: "420,292"  },
			{	id: "florida", 				src: pluginpath + "assets/states/Florida.png", 				data: "420,292"  },

			{	id: "georgia-over",			src:pluginpath + "assets/over/Georgia-over.png",			data: "437,232" },
			{	id: "georgia",				src:pluginpath + "assets/states/Georgia.png",				data: "437,232" },

			{	id: "idaho-over", 			src: pluginpath + "assets/over/Idaho-over.png", 			data: "90,20" 	},
			{	id: "idaho", 				src: pluginpath + "assets/states/Idaho.png", 				data: "90,20"  	},

			{	id: "illinois-over", 		src: pluginpath + "assets/over/Illinois-over.png", 			data: "364,132"  },
			{	id: "illinois", 			src: pluginpath + "assets/states/Illinois.png", 			data: "364,132"  },

			{	id: "indiana-over", 		src: pluginpath + "assets/over/Indiana-over.png", 			data: "405,138"  },
			{	id: "indiana", 				src: pluginpath + "assets/states/Indiana.png", 				data: "405,138"  },

			{	id: "iowa-over", 			src: pluginpath + "assets/over/Iowa-over.png", 				data: "306,121"  },
			{	id: "iowa", 				src: pluginpath + "assets/states/Iowa.png", 				data: "306,121"  },

			{	id: "kansas-over", 			src: pluginpath + "assets/over/Kansas-over.png", 			data: "246,169"  },
			{	id: "kansas", 				src: pluginpath + "assets/states/Kansas.png", 				data: "246,169"  },

			{	id: "kentucky-over", 		src: pluginpath + "assets/over/Kentucky-over.png", 			data: "390,177"  },
			{	id: "kentucky", 			src: pluginpath + "assets/states/Kentucky.png", 			data: "390,177"  },

			{	id: "louisiana-over", 		src: pluginpath + "assets/over/Louisiana-over.png", 		data: "339,273"  },
			{	id: "louisiana", 			src: pluginpath + "assets/states/Louisiana.png", 			data: "339,273"  },

			{	id: "maine-over", 			src: pluginpath + "assets/over/Maine-over.png", 			data: "567,22"  },
			{	id: "maine", 				src: pluginpath + "assets/states/Maine.png", 				data: "567,22"  },

			{	id: "maryland-over", 		src: pluginpath + "assets/over/Maryland-over.png", 			data: "498,151"  },		
			{	id: "maryland", 			src: pluginpath + "assets/states/Maryland.png", 			data: "498,151"  },

			{	id: "massachusetts-over", 	src: pluginpath + "assets/over/Massachusetts-over.png", 	data: "554,92"  },		
			{	id: "massachusetts", 		src: pluginpath + "assets/states/Massachusetts.png", 		data: "554,92"  },

			{	id: "michigan-over", 		src: pluginpath + "assets/over/Michigan-over.png", 			data: "370,59"  },
			{	id: "michigan", 			src: pluginpath + "assets/states/Michigan.png", 			data: "370,59"  },

			{	id: "minnesota-over", 		src: pluginpath + "assets/over/Minnesota-over.png", 		data: "301,36"  },
			{	id: "minnesota", 			src: pluginpath + "assets/states/Minnesota.png", 			data: "301,36"  },

			{	id: "mississippi-over", 	src: pluginpath + "assets/over/Mississippi-over.png", 		data: "370,241"  },		
			{	id: "mississippi", 			src: pluginpath + "assets/states/Mississippi.png", 			data: "370,241"  },		

			{	id: "missouri-over", 		src: pluginpath + "assets/over/Missouri-over.png", 			data: "316,163"  },
			{	id: "missouri", 			src: pluginpath + "assets/states/Missouri.png", 			data: "316,163"  },

			{	id: "montana-over", 		src: pluginpath + "assets/over/Montana-over.png", 			data: "117,22"  },
			{	id: "montana", 				src: pluginpath + "assets/states/Montana.png", 				data: "117,22"  },

			{	id: "nebraska-over", 		src: pluginpath + "assets/over/Nebraska-over.png", 			data: "228,123"  },
			{	id: "nebraska", 			src: pluginpath + "assets/states/Nebraska.png", 			data: "228,123"  },

			{	id: "nevada-over", 			src: pluginpath + "assets/over/Nevada-over.png", 			data: "49,114"  },
			{	id: "nevada", 				src: pluginpath + "assets/states/Nevada.png", 				data: "49,114"  },

			{	id: "new-hampshire-over", 	src: pluginpath + "assets/over/New-Hampshire-over.png", 	data: "560,59"  },
			{	id: "new-hampshire", 		src: pluginpath + "assets/states/New-Hampshire.png", 		data: "560,59"  },

			{	id: "new-jersey-over", 		src: pluginpath + "assets/over/New-Jersey-over.png", 		data: "540,125"  },
			{	id: "new-jersey", 			src: pluginpath + "assets/states/New-Jersey.png", 			data: "540,125"  },

			{	id: "new-mexico-over", 		src: pluginpath + "assets/over/New-Mexico-over.png", 		data: "156,208"  },
			{	id: "new-mexico", 			src: pluginpath + "assets/states/New-Mexico.png", 			data: "156,208"  },

			{	id: "new-york-over", 		src: pluginpath + "assets/over/New-York-over.png", 			data: "486,69"  },
			{	id: "new-york", 			src: pluginpath + "assets/states/New-York.png", 			data: "486,69"  },

			{	id: "north-carolina-over", 	src: pluginpath + "assets/over/North-Carolina-over.png", 	data: "453,196"  },
			{	id: "north-carolina", 		src: pluginpath + "assets/states/North-Carolina.png", 		data: "453,196"  },

			{	id: "north-dakota-over", 	src: pluginpath + "assets/over/North-Dakota-over.png", 		data: "232,39"  },
			{	id: "north-dakota", 		src: pluginpath + "assets/states/North-Dakota.png", 		data: "232,39"  },

			{	id: "ohio-over", 			src: pluginpath + "assets/over/Ohio-over.png", 				data: "434,127"  },
			{	id: "ohio", 				src: pluginpath + "assets/states/Ohio.png", 				data: "434,127"  },

			{	id: "oklahoma-over", 		src: pluginpath + "assets/over/Oklahoma-over.png", 			data: "234,214"  },
			{	id: "oklahoma", 			src: pluginpath + "assets/states/Oklahoma.png", 			data: "234,214"  },

			{	id: "oregon-over", 			src: pluginpath + "assets/over/Oregon-over.png", 			data: "15,44"},
			{	id: "oregon", 				src: pluginpath + "assets/states/Oregon.png", 				data: "15,44"},

			{	id: "pennsylvania-over", 	src: pluginpath + "assets/over/Pennsylvania-over.png", 		data: "480,117"  },
			{	id: "pennsylvania", 		src: pluginpath + "assets/states/Pennsylvania.png", 		data: "480,117"  },

			{	id: "rhode-island-over", 	src: pluginpath + "assets/over/Rhode-Island-over.png", 		data: "571,106"  },
			{	id: "rhode-island", 		src: pluginpath + "assets/states/Rhode-Island.png", 		data: "571,106"  },

			{	id: "south-carolina-over", 	src: pluginpath + "assets/over/South-Carolina-over.png", 	data: "466,228"  },
			{	id: "south-carolina", 		src: pluginpath + "assets/states/South-Carolina.png", 		data: "466,228"  },

			{	id: "south-dakota-over",	src: pluginpath + "assets/over/South-Dakota-over.png", 		data: "229,79"  },
			{	id: "south-dakota", 		src: pluginpath + "assets/states/South-Dakota.png", 		data: "229,79"  },

			{	id: "tennessee-over", 		src: pluginpath + "assets/over/Tennessee-over.png", 		data: "382,207"  },	
			{	id: "tennessee", 			src: pluginpath + "assets/states/Tennessee.png", 			data: "382,207"  },	

			{	id: "texas-over", 			src: pluginpath + "assets/over/Texas-over.png", 			data: "184,221"  },
			{	id: "texas", 				src: pluginpath + "assets/states/Texas.png", 				data: "184,221"  },

			{	id: "utah-over", 			src: pluginpath + "assets/over/Utah-over.png", 				data: "110,127"  },
			{	id: "utah", 				src: pluginpath + "assets/states/Utah.png", 				data: "110,127"  },

			{	id: "vermont-over", 		src: pluginpath + "assets/over/Vermont-over.png", 			data: "545,64"  },
			{	id: "vermont", 				src: pluginpath + "assets/states/Vermont.png", 				data: "545,64"  },

			{	id: "virginia-over", 		src: pluginpath + "assets/over/Virginia-over.png", 			data: "458,160"  },
			{	id: "virginia", 			src: pluginpath + "assets/states/Virginia.png", 			data: "458,160"  },

			{	id: "west-virginia-over",	src: pluginpath + "assets/over/West-Virginia-over.png", 	data: "466,148"  },
			{	id: "west-virginia", 		src: pluginpath + "assets/states/West-Virginia.png", 		data: "466,148"  },

			{	id: "wisconsin-over", 		src: pluginpath + "assets/over/Wisconsin-over.png", 		data: "346,70"  },
			{	id: "wisconsin", 			src: pluginpath + "assets/states/Wisconsin.png", 			data: "346,70"  },

			{	id: "wyoming-over", 		src: pluginpath + "assets/over/Wyoming-over.png", 			data: "151,88"  },
			{	id: "wyoming", 				src: pluginpath + "assets/states/Wyoming.png", 				data: "151,88"  },

			{	id: "washington-over", 		src: pluginpath + "assets/over/Washington-over.png", 		data: "32,7"  },
			{	id: "washington", 			src: pluginpath + "assets/states/Washington.png", 			data: "32,7"  },


		];//    ^^   ID of the          	^^^  Relative location of assets					^^^   X,Y cordinates

		var circles =
		[
			
			{	id: "circle-alaska", 		src: pluginpath + "assets/circle-buttons/Alaska.png",			data: "30,295" },
			{	id: "circle-hawaii", 		src: pluginpath + "assets/circle-buttons/Hawaii.png",			data: "30,332" },
			{	id: "circle-vermont", 		src: pluginpath + "assets/circle-buttons/Vermont.png",			data: "565,127" },
			{	id: "circle-new-hampshire",	src: pluginpath + "assets/circle-buttons/New-Hampshire.png",	data: "565,162" },
			{	id: "circle-massachusetts",	src: pluginpath + "assets/circle-buttons/Massachusetts.png",	data: "565,197" },
			{	id: "circle-rhode-island",	src: pluginpath + "assets/circle-buttons/Rhode-Island.png",		data: "565,233" },
			{	id: "circle-connecticut",	src: pluginpath + "assets/circle-buttons/Connecticut.png",		data: "565,268" },
			{	id: "circle-delaware",		src: pluginpath + "assets/circle-buttons/Delaware.png",			data: "565,303" },
			{	id: "circle-maryland",		src: pluginpath + "assets/circle-buttons/Maryland.png",			data: "565,338" },
		];


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
			//preload.loadFile({id: "background", src:"images/background.jpg"});
			var assets = background.concat(states);
			var assets = assets.concat(circles);

			preload.loadManifest(assets);
			preload.loadFile({id: "instructions", src: pluginpath + "assets/instructions.png"});
			
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
			//console.log('Does ' + states[i].bitmapID + '  equal  ' + e.target.id)			
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



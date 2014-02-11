

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

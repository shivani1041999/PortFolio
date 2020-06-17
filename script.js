var navMenuAnchorTag = document.querySelectorAll('.nav-menu a');

var scrollInterval;
for(var i = 0; i < navMenuAnchorTag.length; i++){
	navMenuAnchorTag[i].addEventListener('click',function(event){
		event.preventDefault();

		var targetSectionId = this.textContent.trim().toLowerCase();
		console.log(targetSectionId);
		if(targetSectionId == 'home'){
			return;
		}
		var targetSection = document.getElementById(targetSectionId);
		console.log(targetSection);
		
		// scrollInterval = setInterval(scrollVertically,20,targetSection);
		scrollInterval = setInterval(function () {
            scrollVertically(targetSection);
        }, 20);
	});
}

function scrollVertically(targetSection){
		var targetSectionCoordinates = targetSection.getBoundingClientRect();
		console.log(targetSectionCoordinates);
    	if(targetSectionCoordinates.top <= 120){
        	clearInterval(scrollInterval);
        	return;
    	}

        window.scrollBy(0,50);
   	}

// auto fill skill bar animation

var progressBars = document.querySelectorAll('.skill div');
var skillContainer = document.getElementById('skills-container');
initaliseBars();
window.addEventListener('scroll',checkScroll);


var animationDone = false;

function initaliseBars(){
	// initalise progressbars width to 0
	for( let bar of progressBars){
		bar.style.width = 0 + "%";
	}
}

function fillBars(){
	// shoot animation 
	for(let bar of progressBars){
		let targetWidth = bar.getAttribute('data-bar-width');
		console.log(targetWidth);
		let currentWidth = 0;
		let interval = setInterval(function(){
			if(currentWidth > targetWidth){
				clearInterval(interval);
				// console.log(currentWidth,targetWidth);
				return;
			}
			
			currentWidth++;
			bar.style.width = currentWidth + '%';
		},5);
		
	}
}
function checkScroll(){
	var coordinates = skillContainer.getBoundingClientRect();
	if(!animationDone && coordinates.top <= window.innerHeight){ 
		// window.innerHeight is equal to the viewport height
		animationDone = true;
		console.log('skill section visible');
		fillBars();
	}else if(coordinates.top > window.innerHeight){
		animationDone = false;
		initaliseBars();
	}

}
const colors = {
	purple: '#ff00ff',
	green: '#00ff00',
	red: '#ff0000',
	blue: '#0000ff',
	white: '#fff',
};

// var elements = document.querySelectorAll('.flicker');

var replayAnimation = function(element) {
	var randomDelay = (Math.random() * 100 + 1) * 100;
	var color = element.dataset.color;
	var duration = 40;
	var options = [
		{ stroke: colors[color], fill: colors[color] },
		{ stroke: colors.white, fill: colors.white },
		{ stroke: colors[color], fill: colors[color] },
	];
	var animation = element.animate(options, {
		delay: randomDelay,
		duration,
	});	
	
	if(animation.finished) {
		animation.finished.then(() => {
			 return replayAnimation(element);
		});
	} else { 
		setTimeout(() => {
			return replayAnimation(element);
		}, duration + randomDelay);
	}
}

/* elements.forEach(element => {
	replayAnimation(element);
}); */

/* elementsGreen.forEach(element => {
	replayAnimation(element, flicker);
});

elementsRed.forEach(element => {
	replayAnimation(element, flicker);
});

elementsBlue.forEach(element => {
	replayAnimation(element, flicker);
});
*/
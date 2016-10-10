$(function(){
	var deferred = $.Deferred();

	$('.resolve').on('click', function(e){
	    e.preventDefault();

		deferred.resolve();
	});
	
	$('.reject').on('click', function(e){
	    e.preventDefault();

		setTimeout(function () {
			deferred.reject();
		}, 2000);
	});

	deferred.then(function () {
		console.log('obj is resolved');
	}, function () {
		console.log('obj is rejected');
	});

	// deferred.done(function () {
	// });
	//
	// deferred.fail(function () {
	// });

});


//preloader
$(function () {

	var imgs = [];

	$.each($('*'), function () {
		var
			$this = $(this),
			background = $this.css('background-image'),
			img = $this.is('img');

		if (background != 'none') {
			var path = background.replace('url("', '').replace('")', '');
			imgs.push(path);
		}

		if (img) {
			var path = $this.attr('src');

			if (path) {
				imgs.push(path);
			}
		}
	});
	
	var percentsTotal = 1;

	for (var i = 0; i < imgs.length; i++) {
		var image = $('<img>', {
			attr: {
				src: imgs[i]
			}
		});

		image.on({
			load : function () {
				setPercents(imgs.length, percentsTotal);
				percentsTotal++;
			},

			error : function () {
				percentsTotal++;
			}
		});
	}

	function setPercents(total, current) {
		var percent = Math.ceil(current / total * 100);

		if (percent >= 100) {
			$('.preloader').fadeOut();
		}

		$('.preloader__percents').text(percent + '%');
	}
});

$(function(){

	var counter = 2;
	var counter2 = counter + 1;
	var counter3 = counter - 1;
	var flag = true;

	$('.slider__item').on('transitionend', function(e){
	    e.preventDefault();
	    
	});

	$('.slider__controls-top').on('click', function(e){
	    e.preventDefault();

		var $this = $(this),
			container = $this.closest('.slider'),
			items = container.find('.slider__item'),
			activeItem = items.filter('.active'),
			duration = 300;

		var leftSlider = $.Deferred();
		var rightSlider = $.Deferred();
		var bigSlider = $.Deferred();

		var oppositeItems = $('.slider_opposite .slider__item'),
			oppositeActive = oppositeItems.filter('.active');

		var bigItems = $('.slider_big .slider__item'),
			bigActive = bigItems.filter('.active');


		if (flag) {
			flag = false;

			if (counter >= items.length) {
				counter = 0;
			}
			if (counter == items.length-1) {
				counter2 = 0;
			}
			if (counter == 1) {
				counter3 = 0;
			}

			var reqItem = items.eq(counter);
			var oppositeReqItem = oppositeItems.eq(counter2);
			var bigReqItem = bigItems.eq(counter3);

			function AnimateUp(el,em,slider){
			el.animate({
				'top' : '100%'
			}, duration);	

			em.animate({
				'top' : '0%'
			}, duration, function () {
				el.removeClass('active').css('top', '-100%');

				slider.resolve($(this));
			});
			};	

			oppositeActive.animate({
				'top' : '-100%'
			}, duration);
			oppositeReqItem.animate({
				'top' : '0%'
			}, duration, function () {
				oppositeActive.removeClass('active').css('top', '100%');

				rightSlider.resolve($(this));
			});
			counter++;	
			counter2++;
			counter3++;	

			AnimateUp(activeItem,reqItem,leftSlider);
			AnimateUp(bigActive,bigReqItem,bigSlider);
			$.when(leftSlider, rightSlider,bigSlider).done(function (data1, data2,data3) {
				data1.addClass('active');
				data2.addClass('active');
				data3.addClass('active');

				flag = true;
			});
		}
	});
	
}());



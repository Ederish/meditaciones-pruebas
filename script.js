if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log('Registro de SW exitoso', reg))
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
}
Texto=fetch('Meditacones.json').then(Response =>Response.json()).then(data=>{Texto= data})
$("ul#books").children().click(()=>{$("ul#books").children().remove()

for(i=0;i<j;i++){
$("ul#books")
.append(`<li class="grid__item grid__item--4"><a class="grid__link"><h2 class="grid__title">AFORISMO ${i+1}</h2><p>Meditaciones</p></a></li>`)
}
for(i=0;i<j;i++){
$('.article').append(`<section class="post">
	<article class="post__wrapper">
	<h1>LIBRO ${k+1}</h1>
	<h3>Marco Aurelio</h3>
	<p>${Texto[k][i]}</p>
	<div class="icons_container">
   <button id="voice"><span class="material-icons">mic_none</span></button>
   <button id="share"><span class="material-icons">share</span></button>
   </div>
	</article>
	<a href="" class="post__back">
	<svg width="24" height="24" viewBox="0 0 24 24"><path d="M4 11h5v-6h-5v6zm0 7h5v-6h-5v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5v-6h-5v6zm6-6v6h5v-6h-5z"/><path d="M0 0h24v24h-24z" fill="none"/>
	</svg> Atras
	</a>
	<a href="" class="post__forw">
	Siguiente<svg width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24h-24z" fill="none"/><path d="M12 4l-1.41 1.41 5.58 5.59h-12.17v2h12.17l-5.58 5.59 1.41 1.41 8-8z"/></svg> 
	</a></section>`);

$('#voice').click(function(){
	msg= Texto[k][i];
	var uterance = new SpeechSynthesisUtterance(msg);
	speechSynthesis.speak(uterance);
})
}
var ZoomGrid = (function() {
	var w = $(window);
	var grid = $('.grid');
	var item = $('.grid__item');
	var itemContent = item.find('.grid__link');
	var post = $('.post');
	var backBtn = post.find('.post__back');
	var nextBtn = post.find('.post__forw');
	var breakpoint = 700;
	var isBig = false;

	var zoom = function(event) {
		var content = $(this).find('.grid__link');
		var self = $(this);
		var index = self.index();
		var vw = w.innerWidth();
		var vh = w.innerHeight();
		var ds = $(document).scrollTop();
		var px = event.pageX;
		var py = event.pageY;
		// scale stuff
		var iw = $(this).innerWidth();
		var ih = $(this).innerHeight();
		var sx = vw/iw;
		var sy = vh/ih;
		// transform-origin stuff
		var o = $(this).offset();
		var xc = vw/2;
		var yc = ds + vh/2;
		var dsp = ds/ (vh+ds) * 100;
		tox = px/vw *100;
		toy = py/vh *100;
		toy = toy - dsp;

		if (!isBig && vw >= breakpoint) {
			grid.css({
				'transform-origin': tox + '% ' + toy + '%'
			});
			setTimeout(function() {
				requestAnimationFrame(function() {
					grid.css({
						'transform-origin': tox + '% ' + toy + '%',
						'transform': 'scale(' + sx + ',' + sy + ')'
					});
					itemContent.css({'opacity': '0'});
					$('body').css('overflow', 'hidden');
					showPost(index); // show post function
					isBig = true;
				});

			}, 50);

		} else {
			// this stuff happens at the breakpoint/smaller screens
			itemContent.css({
				'opacity': '0'
			});
			showPost(index);
			isBig = true;
		}
		return false;
	};
	var zoomout = function() {
		// reset grid back to normal/hide post
		if (isBig) {
			post.addClass('post--hide');
			post.removeClass('post--active');
			post.on('transitionend', function() {
				grid.css({
					'transform': 'scale(1)'
				});
				itemContent.css({'opacity': '1'});
				$('body').removeAttr('style');
				post.off('transitionend');
			});

			isBig = false;
		}
		return false;
	};
	var showPost = function(index) {
		post.eq(index).removeClass('post--hide').addClass('post--active');
	};
	var nextPost = function() {
		var cur = $('.post--active');
		var next = cur.next('.post');
		if (!next.length) {
			next = post.first();
		}
		cur.addClass('post--hide').removeClass('post--active');
		next.removeClass('post--hide').addClass('post--active');
		return false;
	};
	var bindActions = function() {
		item.on('click', zoom);
		backBtn.on('click', zoomout);
		nextBtn.on('click', nextPost);
	};
	var init = function() {
		bindActions();
	};
	return {init: init};

}());
$('#share').click(function(){
	navigator.share({
		title:'MEDITACIONES',
		text:'Marco Aurelio',
		url:Texto[k][i],
	});
})
ZoomGrid.init();$("#bk").click(function(){location.reload()})
});
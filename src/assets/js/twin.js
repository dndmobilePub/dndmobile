
$(document).ready(function() {
	
	"use strict";
	
	PageLoad();
	FirstLoad();
	QuickMenu();
	Portfolio();	
	Sliders();	
	Showcase();
	ShowcaseCarousel();
	AjaxLoad();	
	Shortcodes();
	JustifiedGrid();
	Lightbox();
	ContactForm();
	PlayVideo();
	ContactMap();	
	TweenMaxIMG();	
	
});


// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {	
		
		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');			
		}
		
		$('body').removeClass('hidden');		
		
		var width = 100,
			perfData = window.performance.timing, 
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = ((EstimatedTime/1000)%50) * 50
			
		// Loadbar Animation
		$(".loadbar").animate({
			width: width + "%"
		}, time / 1 );	
		
		
		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time + 400;
				animateValue(PercentageID, start, end, durataion);
				
		function animateValue(id, start, end, duration) {
		  
			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);
			
			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}
		
		// Fading Out Loadbar on Finised
		setTimeout(function(){
			$('.loadbar').append('<span class="hold-progress-bar"></span>');
			
			TweenMax.to($('.hold-progress-bar'), 1, {force3D:true,width:'100%', delay:0, ease:Power2.easeOut, onComplete:function(){  //modified time
				TweenMax.set($(".trackbar"), {visibility:'hidden', opacity:0});
				$('body').waitForImages({
						finished: function() {
							
							TweenMax.to($(".percentage"),0.1, {force3D:true, opacity:0, y:-30, delay:0, ease:Power1.easeInOut});
							TweenMax.to($(".headphones, .headphones-text"),0.3, {force3D:true, opacity:0, y:-50, delay:0.2, ease:Power2.easeOut});
							TweenMax.to($(".preloader-wrap"),0.7, {force3D:true, yPercent: -101, delay:0.3, ease:Power2.easeInOut});
							TweenMax.set($(".preloader-wrap"), {visibility:'hidden', delay:0.8, opacity:0});
							
							setTimeout(function(){
							
								$('body').waitForImages({
									finished: function() {
										TweenMax.to($("#header-container, .header-middle, #footer-container"), 1, {force3D:true, opacity:1, delay:0, ease:Power2.easeOut}); //modified time
										$('body').removeClass('hidden-ball');		
									},
									waitForAll: true
								});
								
								if( $('.hero-video-wrapper').length > 0 ){
									$('#hero-bg-wrapper').find('video').each(function() {
										$(this).get(0).play();
									}); 
								}
								
								TweenMax.to($("#main"), 0, {force3D:true, opacity:1, delay:0, ease:Power2.easeOut});//modified time
								if( $('#hero').hasClass("has-image")) {	
									TweenMax.to($("#hero-bg-image"), 1, {force3D:true, scale:1.05 , opacity:1, delay:0.2, ease:Power2.easeOut});
									TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 10, opacity:1, delay:0.9, ease:Power2.easeOut});
									TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y:10, opacity:1, delay:0.95, ease:Power2.easeOut});
									TweenMax.to($(".hb-left"), 0.4, {force3D:true, y:0, opacity:1, delay:1.1, ease:Power2.easeOut, onComplete:function(){
										$('.hb-left').addClass('enable');
									}});
									TweenMax.to($(".hb-right"), 0.4, {force3D:true, y:0, opacity:1, delay:1.2, ease:Power2.easeOut});									
									TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:1.15, ease:Power2.easeOut});
								} else {
									TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 10, opacity:1, delay:0.9, ease:Power2.easeOut});
									TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 10, opacity:1, delay:0.95, ease:Power2.easeOut});									
									TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:1, ease:Power2.easeOut});							
								}								
								
								if ($('#hero-bg-image').hasClass("light-content")) {
									$('#hero-caption').addClass('light-content');
									setTimeout(function(){
										$('#magic-cursor').addClass('light-content');
									} , 700 );			
									setTimeout(function(){
										$('#header-container').addClass('light-content');
									} , 600 );
								}
								
								// Fading In Showcase elements on Finised
								TweenMax.set($("#showcase-holder"), {opacity:0, scale:1.05});								
								TweenMax.to($("#showcase-holder"), 0.4, {force3D:true, opacity:1, scale:1, delay:0.8, ease:Power2.easeOut});
								
								TweenMax.set($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), {opacity:0, y:-120});
								TweenMax.set($('.no-stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
								TweenMax.set($('.stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
								TweenMax.set($('.stroked .swiper-pagination-bullet-active').next().find('.title'), {opacity:0, y:240});
								
								var slidertitleheight = $(".title").height()
								
								TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.5, {force3D:true, opacity:0.3, y:-slidertitleheight, delay:0.8, ease:Power2.easeOut});
								TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:1, y:0, delay:0.9, ease:Power2.easeOut});
								TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0.3, y:0, delay:0.9, ease:Power2.easeOut});
								TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.5, {force3D:true, opacity:0.3, y:slidertitleheight, delay:1, ease:Power2.easeOut});
								
								TweenMax.set($('.swiper-slide-active').find('.title'), {y:slidertitleheight});
								TweenMax.set($('.swiper-slide-active').find('.subtitle'), {y:40});
								
								
								TweenMax.to($('.swiper-slide-active').find('.title'), 0.8, {force3D:true, y:0, delay:0.8, ease:Power2.easeOut});
								TweenMax.to($('.swiper-slide-active').find('.subtitle'), 0.7, {force3D:true, y:0, delay:0.9, ease:Power2.easeOut});
								
								
								
								// Fading In Small Carousel elements on Finised
								var tlCarousel = new TimelineLite();
								tlCarousel.set($("#showcase-carousel .swiper-slide"), {x: 300, opacity:0});
								$("#showcase-carousel .swiper-slide").each(function(index, element) {
									tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.9, ease:Power3.easeOut}, index * 0.1)
								});
								// Fading In Large Carousel elements on Finised
								var tlCarousel = new TimelineLite();
								tlCarousel.set($("#large-showcase-carousel .swiper-slide"), {x: 300, opacity:0});
								$("#large-showcase-carousel .swiper-slide").each(function(index, element) {
									tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.9, ease:Power3.easeOut}, index * 0.1)
								});
								TweenMax.set($(".swiper-scrollbar"), {scaleX: 0,});
								TweenMax.to($(".swiper-scrollbar"), 1.2, {force3D:true, scaleX: 1, delay:0.9, ease:Power2.easeOut});			
									
								setTimeout( function(){	
									$('body').removeClass("load-project-page").removeClass("load-project-page-carousel");
								} , 600 );
								
								setTimeout( function(){	
									$('body').removeClass("load-next-project");
									$('body').addClass("header-visible");
									$('#showcase-holder').removeClass("disabled");
								} , 1600 );
								
								setTimeout( function(){	
									$('body').removeClass("show-loader")
								} , 800 );	
								
							} , 100 );
						},
					waitForAll: true
				});
				
			}});
	  
		}, time);
		
		
		
	}// End Page Load
		


/*--------------------------------------------------
Function First Load
---------------------------------------------------*/	

	function FirstLoad() {	
		if (!!window.MSInputMethodContext && !!document.documentMode) {
  			$('body').addClass('ie11');
		}
		if (navigator.appVersion.indexOf('MSIE 10') !== -1) {
		  	$('body').addClass('ie10');
		}
		if (agent.indexOf("msie") != -1) {
			$('body').addClass('ieie');
		}

		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});			
		}
		
				
		/* HEADER Wheel addClass 작업    */
		$(window).on('mousewheel',function(e){
			var wheel = e.originalEvent.wheelDelta;
			var current = $(window).scrollTop();
			if(wheel<0){
				if(current>300){
				   $("header").addClass('small-height').removeClass("normal-height")
				   $("#header-container").addClass('header-inner');}
			}else{
				$("header").addClass('normal-height').removeClass("small-height")
				   $("header-container").removeClass('header-inner');
			}
		});
		
		$("html,body").animate({scrollTop: 0}, 1);
		
		if ($("#page-content").hasClass("light-content")) {
			$("main, nav").css('background-color', '#111');
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){						
				if( $('#hero').hasClass("has-image")) {	
					$("header").addClass("hero");	
				} else {
					$("header").addClass("none-hero");
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {
			$("main").css('background-color', '#fff');
			$("nav").css('background-color', '#111');
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){	
				if( $('#hero').hasClass("has-image")) {	
					$("header").css('background-color', 'transparent');
				} else {
					$("header").css('background-color', 'transparent');
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}
		
		$('.section-image').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		$('.item').each(function() {
			var image = $(this).find('.item-image').data('src');	
			$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
		});
		
		$('.thumb-page').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		$('.video-cover').each(function() {
			var image = $(this).data('src');	
			$(this).css({'background-image': 'url(' + image + ')'});
		});
		
		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");	
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			var tlMenu = new TimelineLite();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, 0.25, {y:-30, opacity:0, ease:Power2.easeIn}, index * 0.03)
			});	
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if( $('#showcase-holder').length > 0 ){
				TweenMax.to($(".swiper-pagination-bullet .title"), 0.4, {force3D:true, opacity:0, ease:Power2.easeOut});
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.2, ease:Power0.ease});
			} else {
				TweenMax.to($("#main"), 0.3, {opacity:0, delay:0.1, ease:Power0.ease});
			}		
			TweenMax.to($("#footer-container, .header-middle"), 0.3, {opacity:0, ease:Power0.ease});
		});
		
		//Load Project from Showcase
		$('#showcase-slider a.title').on('click', function() {
			$('#showcase-tilt').addClass('disabled');		
			TweenMax.to($(".showcase-captions-wrap.stroked, .header-middle, .title span"), 0.3, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".arrows-wrap"), 0.2, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".footer-middle"), 0.2, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
			TweenMax.to($(".socials-wrap"), 0.2, {force3D:true, opacity:0, delay:0.15, ease:Power2.easeOut});
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', delay:0.3, scale:1, opacity:1});
			$("body").addClass("load-project-page").addClass("show-loader");
		});
		
		//Load Project from Showcase Carousel
		$('#showcase-carousel-slider a.title').on('click', function() {
			$( "#ball" ).removeClass("hold");	
			TweenMax.to($("#showcase-carousel-slider .section-image"), 0.7, {force3D:true, scale:1.05, maxWidth: '100%', height:"100%", top:0, delay:0, ease:Power2.easeInOut});
			TweenMax.to($("#showcase-carousel-slider .img-mask"), 0.7, {force3D:true, padding:0, delay:0, ease:Power2.easeInOut});
			TweenMax.to($("#showcase-carousel-slider .title span"), 0.4, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".arrows-wrap"), 0.2, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".footer-middle"), 0.2, {force3D:true, opacity:0, delay:0.1, ease:Power2.easeOut});
			TweenMax.to($(".socials-wrap"), 0.2, {force3D:true, opacity:0, delay:0.15, ease:Power2.easeOut});
			TweenMax.to('#ball', 0.3,{borderWidth: '2px', delay:0.3, scale:1, opacity:1});
			$("body").addClass("load-project-page-carousel").addClass("show-loader");
		});
		
		
		//Load Page From Menu
		$('nav .ajax-link').on('click', function() {
			var tl = new TimelineLite();
			$(".menu-timeline").each(function(index, element) {
				tl.to(element, 0.25, {y:-80, opacity:0, ease:Power1.easeIn }, index * 0.05)
			});
		});
		
		$('#burger-wrapper').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');			
			setTimeout( function(){			
				if ($('#menu-burger').hasClass("open")) {
					$('header').addClass('over-sidebar');
					if (!$('#page-content').hasClass("light-content")) {	
						$('#magic-cursor').addClass('light-content');
						$('#header-container').addClass('light-content');
					}
					//Fade In Navigation Lists
					var tlMenu = new TimelineLite();
					tlMenu.set($(".menu-timeline"), {y: 80, opacity:0});
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});
						
				} else {	
					//Fade Out Navigation Lists					
					var tlMenu = new TimelineLite();
					$(".menu-timeline").each(function(index, element) {
						tlMenu.to(element, 0.25, {y:-80, opacity:0, ease:Power2.easeIn}, index * 0.05)
					});
					if (!$('#page-content').hasClass("light-content")) {	
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');
							$('#header-container').removeClass('light-content');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar');
					} , 500 );
				}							
			} , 20 );
		});
		
		
		
		
		
		// Page  Navigation Events
		$('.next-ajax-link-page').on('click', function() {					
			$("body").addClass("load-next-page");
			$("body").addClass("show-loader");
			var pageheight = $(".scroll-content").height()
			if ($("body").hasClass("smooth-scroll")) {
				TweenMax.to(scrollbar, 0.5, {scrollTop :pageheight, ease:Power4.easeIn});
			} else {                    
                TweenMax.to(window, 0.5, {scrollTo :$("footer").offset().top, ease:Power4.easeIn});               
            }	
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}
			if ($("body").hasClass("smooth-scroll")) {
				var navmove = $("#content-scroll").height() - $("#hero").height() - $("footer").height() - 10			
			} else {
				var navmove = window.innerHeight - $("#hero").height() - $("footer").height() - 10			   
			}
			
			TweenMax.to($(".subtitle-info"), 0.3, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".subtitle-name"), 0.3, {force3D:true, opacity:1, y: 0, delay:0.3, ease:Power2.easeOut});
			
			TweenMax.to($("#main-page-content, #hero"), 0.3, {opacity:0});		
			TweenMax.to($("#page-nav"), 0.6, {y: - navmove, ease:Power2.easeInOut});
			TweenMax.to($("footer"), 0.3, {opacity:0, delay:0.2, ease:Power2.easeInOut});
		});
		
		
		// Project Navigation Events
		$('.next-ajax-link-project').on('click', function() {					
			$("body").addClass("load-next-project");
			$("body").addClass("show-loader");
			$('header').removeClass('small-height');		
			var pageheight = $(".scroll-content").height()
			if ($("body").hasClass("smooth-scroll")) {
				TweenMax.to(scrollbar, 0.5, {scrollTop :pageheight, ease:Power4.easeIn});
			} else {                    
                TweenMax.to(window, 0.5, {scrollTo :$("footer").offset().top, ease:Power4.easeIn});               
            }		
			TweenMax.to('#ball', 0.3,{borderWidth:"2px",scale:1,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			if ($('#project-nav').hasClass("light-content")) {				
				setTimeout(function(){
					$('body').addClass('light-content');								
				} , 300 );
			}	
			
			
			TweenMax.to($(".next-subtitle-info"), 0.3, {force3D:true, opacity:0, delay:0, ease:Power2.easeOut});
			TweenMax.to($(".next-subtitle-name"), 0.3, {force3D:true, opacity:1, y: 0, delay:0.3, ease:Power2.easeOut});
			
			TweenMax.to($("#main-page-content"), 0.3, {opacity:0});			
			setTimeout(function(){
				TweenMax.to($("#project-nav"), 1, {height:"100vh", ease:Power2.easeInOut});
				TweenMax.to($(".next-project-image"), 1, {top:"0", y: 0, ease:Power2.easeInOut});
				TweenMax.to($("footer"), 0.3, {opacity:0, ease:Power2.easeInOut});
			} , 50 );	
		});
		
		
		if( $('#project-nav').length > 0 ){
			$('#main-page-content').addClass('project-page');	
			
		}
		
		if( $('#portfolio').length > 0 ){
			$('#main-page-content').addClass('portfolio-page');
						
		}
			
		// Slider Center on click
		$('.slider').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
				TweenLite.to(scrollbar, 0.8, {scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                    
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		// Carousel Center on click
		$('.carousel').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);	
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
				TweenLite.to(scrollbar, 0.8, {scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                    
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		
		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				$(".white-section").each(function () {
					var $this = $(this),
					elementTop = $this.offset().top;
					if (scrollbar.isVisible(this)) {	
						if (elementTop <= 60) {	
							$("header").addClass("white-header")
						} else {
							$("header").removeClass("white-header")
						}
					} else {
						$("header").removeClass("white-header")
					}
				});
			});
		}
		
		
		// Video Center on click
		$('.video-wrapper').on('click', function() {				
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
			if ($("body").hasClass("smooth-scroll")) {					
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);                    
				TweenLite.to(scrollbar, 0.8, {scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});                    
			}
			else{                    
				$("html, body").animate({ scrollTop: scrollIt }, 350);                
			}				
		});
		
		
		var viewportWidth = $(window).width();
		if (viewportWidth < 320) {				
			$('.hero-video-wrapper').remove();							 
		}
		
		$('#backtotop').on('click', function() {	
			if ($("body").hasClass("smooth-scroll")) {
				TweenLite.to(scrollbar, 1.5, {scrollTop:0, ease:Power4.easeInOut});
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
			}
		});
		
//		$('#scrolldown').on('click', function() {	
//			var heroheight = $("#hero").height();			
//			if ($("body").hasClass("smooth-scroll")) {
//				TweenLite.to(scrollbar, 1.5, {scrollTop:heroheight, ease:Power4.easeInOut});
//			} else {
//				TweenLite.to(window, 1.5, {scrollTop:heroheight, ease:Power4.easeInOut});
//			}
//		});
		
		
		// Tilt Showcase Wrapper
		if( $('#hero').hasClass("has-image")) {				
			var timeout;
			$(window).resize(changePersective);				
			changePersective();				
			function changePersective(){
				TweenMax.set('#hero-bg-wrapper', {perspective: $('body').width()});
			}
			$('#hero').mousemove(function(e){
				if(timeout) clearTimeout(timeout);
				setTimeout(callParallaxHero.bind(null, e));			
			});				
			function callParallaxHero(e){
				parallaxItHero(e, '#hero-bg-image', 0); //5
				moveItHero(e, '#hero-bg-image', - 30); //80
			}				
			function parallaxItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;					
				TweenMax.to(target, 1, {
					rotationY: (relX - $this.width()/1.5) / $this.width() * movement,
					rotationX: (relY - $this.height()/2) / $this.height() * movement,
				})
			}				
			function moveItHero(e, target, movement){
				var $this = $('#hero-bg-wrapper');
				var relX = e.pageX - $this.offset().left;
				var relY = e.pageY - $this.offset().top;					
				TweenMax.to(target, 1, {
					x: (relX - $this.width()/2) / $this.width() * movement,
					y: (relY - $this.height()/2) / $this.height() * movement,
				})
			}
		}
		
		var heroparallax = TweenMax.to('#hero-image-parallax', 1, {top:"20%", scale:1.2, ease:Linear.easeNone});
		var captionParallax = TweenMax.to('.has-image #hero-caption', 0.5, {top:"25%", ease:Linear.easeNone});
		var bottomParallax = TweenMax.to('.has-image .hero-bottom', 0.5, {opacity:"0", ease:Linear.easeNone});
		
		var controller = new ScrollMagic.Controller();
		
		var heroScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(heroparallax)
		.addTo(controller);
		  
		var captionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'100%'
		})
		.setTween(captionParallax)
		.addTo(controller);
		
		var bottomScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'20%'
		})
		.setTween(bottomParallax)
		.addTo(controller);
		
		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				heroScene.refresh()
				captionScene.refresh()
				bottomScene.refresh()
			});
		}
		
		// 	parallax image 
		$(".has-parallax").each( function () {
			var $this = $(this);
			var $thisHeight = $(this).height();
			var bg = $this.find("img");
			
			// Add tweenmax for backgroundParallax
			var parallax = TweenMax.fromTo( bg, 1, {y: '-20%'}, {y: '10%',ease:Linear.easeNone});
			
			// Create scrollmagic scene
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:'300%'
			})
			.setTween(parallax)
			.addTo(controller);
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}
			
		});
		
		// animate each
		$('.has-animation').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					TweenMax.to($this, 0.6, {force3D:true, opacity:1, y:0, scale:1, delay:0.1, ease:Power2.easeOut});
					next();
				});
			});
			
			scene.on('leave', function(event){
				$this.removeClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});
		
		$('.has-mask').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				
				var tl = new TimelineLite();
						
				$this.find('span > span').each(function(index, element) {
					tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0.03)
				});
				
			});
			
			scene.on('leave', function(event){
				$this.removeClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		$('.item-appear').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();
			
			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);
			
			scene.triggerHook(1)
			
			scene.on('enter', function(){				
				$this.addClass('active');
			});
			
			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})
		
		
		
	}// End First Load
	
	
	
/*--------------------------------------------------
Function QuickMenu
---------------------------------------------------*/

	function QuickMenu() {
		
		//Quick Menu
		$('.quickmenu, #close-quickmenu').on('click', function() {			
			$('.quickmenu, #quickmenu').toggleClass('active');
			
			setTimeout( function(){			
				if ($('#quickmenu').hasClass("active")) {	
					
					$('#quickmenu-scroll').animate({ scrollTop: $('#quickmenu').offset().top },0);					
					
					TweenMax.to($("#showcase-holder"), 0.5, {force3D:true, opacity:0, delay:0.3, ease:Power2.easeInOut});	
					
					var slidertitleheight = $(".title").height()
					
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.5, {force3D:true, opacity:0, y:-slidertitleheight*2, delay:0.1, ease:Power2.easeOut});
					TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0, y:-slidertitleheight/2, delay:0.2, ease:Power2.easeOut});
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0, y:-slidertitleheight/2, delay:0.2, ease:Power2.easeOut});
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.5, {force3D:true, opacity:0, y:slidertitleheight, delay:0.3, ease:Power2.easeOut});
					
					TweenMax.to($("#footer-container"), 0.3, {force3D:true, opacity:0, delay:0.4, ease:Power2.easeOut});
					
					TweenMax.set($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), {opacity:0, y:-slidertitleheight, delay:0.4});
					TweenMax.set($('.no-stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:slidertitleheight/2, delay:0.4});
					TweenMax.set($('.stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:slidertitleheight/2, delay:0.4});
					TweenMax.set($('.stroked .swiper-pagination-bullet-active').next().find('.title'), {opacity:0, y:slidertitleheight*2, delay:0.4});
					
					var quicktitle = new TimelineLite();
					quicktitle.set($(".q-timeline"), {opacity:0, y:60});
					$(".q-timeline").each(function(index, element) {
						quicktitle.to(element, 0.5, {opacity:1, y:0, delay:0.5, ease:Power3.easeOut}, index * 0.1)
					});
						
				} else {
					
					var quicktitle = new TimelineLite();
					$(".q-timeline").each(function(index, element) {
						quicktitle.to(element, 0.25, {opacity:0, y:-60, ease:Power1.easeIn}, index * 0.05)
					});
					
//					setTimeout(function(){
//						$('#quickmenu-scroll').animate({ scrollTop: $('#quickmenu').offset().top },100);
//					} , 700 );
					
					var slidertitleheight = $(".title").height()
					
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.5, {force3D:true, opacity:0.3, y:-slidertitleheight, delay:0.6, ease:Power2.easeOut});
					TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:1, y:0, delay:0.7, ease:Power2.easeOut});
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0.3, y:0, delay:0.7, ease:Power2.easeOut});
					TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.5, {force3D:true, opacity:0.3, y:slidertitleheight, delay:0.8, ease:Power2.easeOut});
					
					TweenMax.to($("#footer-container"), 0.5, {force3D:true, opacity:1,delay:1, ease:Power2.easeOut});				
					
					TweenMax.to($("#showcase-holder"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
					
					
				}							
			} , 20 );
		});
		
		
		$(".header-middle .button-wrap, #close-quickmenu").on('click', function() {
			$(".header-middle .icon-wrap").toggleClass("disabled");			   
			if ($(".header-middle .icon-wrap").hasClass('disabled')) {
				$('.header-middle .button-text span').text($('.header-middle .button-text span').data('off'));
				$('.header-middle .button-text span').attr("data-off", $('.header-middle .button-text span').data('on'));
				$('.header-middle .button-text span').attr("data-on", $('.header-middle .button-text span').text());
				
			} else {
				$('.header-middle .button-text span').text($('.header-middle .button-text span').data('on'));
				$('.header-middle .button-text span').attr("data-on", $('.header-middle .button-text span').data('on'));
				$('.header-middle .button-text span').attr("data-off", $('.header-middle .button-text span').data('off'));
			}
		});		
		
		if( $('#quickmenu').length > 0 ){
			var offsetHeight = document.getElementById('quick-projects').offsetHeight;
			document.getElementById('close-quickmenu').style.height = offsetHeight+'px';
		}
		
		$("#close-quickmenu").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
		});
			
		$("#close-quickmenu").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("close-icon");
			$('#ball i').remove();
		});
		
		$("#close-quickmenu").on('click', function() {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("close-icon");
			$('#ball i').remove();
		});


		const getMousePos = (e) => {
			let posx = 0;
			let posy = 0;
			if (!e) e = window.event;
			if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
			}
			else if (e.clientX || e.clientY) 	{
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			return { x : posx, y : posy }
		}
	
		// Effect 1
		class HoverImgFx1 {
			constructor(el) {
				this.DOM = {el: el};
				this.DOM.reveal = document.createElement('div');
				this.DOM.reveal.className = 'hover-reveal';
				this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
				this.DOM.el.appendChild(this.DOM.reveal);
				this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
				this.DOM.revealInner.style.overflow = 'hidden';
				this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
	
				this.initEvents();
			}
			initEvents() {
				this.positionElement = (ev) => {
					const mousePos = getMousePos(ev);
					const docScrolls = {
						left : document.body.scrollLeft + document.documentElement.scrollLeft, 
						top : document.body.scrollTop + document.documentElement.scrollTop
					};
					this.DOM.reveal.style.top = `${mousePos.y-50-docScrolls.top}px`;//수정//
					this.DOM.reveal.style.left = `${mousePos.x-50-docScrolls.left}px`;//수정//
				};
				this.mouseenterFn = (ev) => {
					this.positionElement(ev);
					this.showImage();
				};
				this.mousemoveFn = ev => requestAnimationFrame(() => {
					this.positionElement(ev);
				});
				this.mouseleaveFn = () => {
					this.hideImage();
				};
				
				this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
				this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
				this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
			}
			showImage() {
				TweenMax.killTweensOf(this.DOM.revealInner);
				TweenMax.killTweensOf(this.DOM.revealImg);
	
				this.tl = new TimelineMax({
					onStart: () => {
						this.DOM.reveal.style.opacity = 1;
						TweenMax.set(this.DOM.el, {zIndex: 0});
					}
				})
				.add('begin')
				.add(new TweenMax(this.DOM.revealInner, 0, {
					ease: Sine.easeOut,
					startAt: {x: '0%'},//수정//
					x: '0%'
				}), 'begin')
				.add(new TweenMax(this.DOM.revealImg, 0, {
					ease: Sine.easeOut,
					startAt: {x: '0%'},
					x: '0%'
				}), 'begin');
			}
			hideImage() {
				TweenMax.killTweensOf(this.DOM.revealInner);
				TweenMax.killTweensOf(this.DOM.revealImg);
	
				this.tl = new TimelineMax({
					onStart: () => {
						TweenMax.set(this.DOM.el, {zIndex: 999});
					},
					onComplete: () => {
						TweenMax.set(this.DOM.el, {zIndex: ''});
						TweenMax.set(this.DOM.reveal, {opacity: 0});
					}
				})
				.add('begin')
				.add(new TweenMax(this.DOM.revealInner, 0, {
					ease: Sine.easeOut,
					x: '0%'
				}), 'begin')
				
				.add(new TweenMax(this.DOM.revealImg, 0, {
					ease: Sine.easeOut,
					x: '0%'
				}), 'begin');
			}
		}
		
		Array.from(document.querySelectorAll('[data-fx="1"] > li, li[data-fx="1"]')).forEach(link => new HoverImgFx1(link));
		
		
		class Spring {
			constructor(list, friction) {
				this.__list = $(list);
				this.friction = friction;
				this.desire_positionY = $("#quickmenu-scroll").scrollTop();
				this.py = [];
				// Behaviours
				$("#quickmenu-scroll").on("scroll", this.handleChange.bind(this));
				this.update();
			}

			handleChange(e){
				this.desire_positionY = $("#quickmenu-scroll").scrollTop();
				
			}
  
			update(){
				$.each(this.__list, function(i, e){
					if(this.py[i] == null) this.py[i] = 0;
					this.py[i] += ( (this.desire_positionY) - this.py[i]) / (this.friction+i);
					$(e).css({
						"top":  Math.round(this.desire_positionY)+"px",
						"transform": " translateY(-"+ Math.round(this.py[i])+"px)"
					});
				}.bind(this))
				window.requestAnimationFrame(this.update.bind(this));
				
			}
		}

		let spring = new Spring("#quick-projects li a", 6);

		
		FitQuickScreen();
		
	}// End QuickMenu			
	
	
	
		
	
	
/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {	
		
		if ($("body").hasClass("smooth-scroll")) {
			var elem = document.querySelector("#content-scroll");
			var scrollbar = Scrollbar.init(elem,
			{
				renderByPixels: true,
				damping:0.05
			});
		}
		
		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){	
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});	
		
		$('body').waitForImages({
			finished: function() {
				TweenMax.to($("#header-container, .header-middle"), 1, {force3D:true, opacity:1, ease:Power2.easeOut});				
			},
			waitForAll: true
		});
		
		TweenMax.to($("#main"), 0.2, {force3D:true, opacity:1, delay:0.1, ease:Power2.easeOut});
						
		
		if( $('#hero').hasClass("has-image")) {	
			if( $('body').hasClass("load-project-thumb")) {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.05 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title"), 0.4, {force3D:true, y:10, opacity:1, delay:0.5, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y:10, opacity:1, delay:0.6, ease:Power2.easeOut});
				TweenMax.to($(".hb-left"), 0.4, {force3D:true, y:0, opacity:1, delay:0.8, ease:Power2.easeOut, onComplete:function(){
					$('.hb-left').addClass('enable');
				}});
				TweenMax.to($(".hb-right"), 0.4, {force3D:true, y:0, opacity:1, delay:0.9, ease:Power2.easeOut});	
			} else {
				TweenMax.to($("#hero-bg-image"), 0, {force3D:true, scale:1.05 , opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-title"), 0, {force3D:true, y:10, opacity:1, delay:0, ease:Power2.easeOut});
				TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y:10, opacity:1, delay:0.2, ease:Power2.easeOut});
				TweenMax.to($(".hb-left"), 0.4, {force3D:true, y:0, opacity:1, delay:0.4, ease:Power2.easeOut, onComplete:function(){
					$('.hb-left').addClass('enable');
				}});
				TweenMax.to($(".hb-right"), 0.4, {force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut});	
			}
			TweenMax.to($(".scroll-down-wrap"), 0.4, {force3D:true, y: 0, opacity:1, delay:0.85, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.95, ease:Power2.easeOut});
		} else {
			TweenMax.to($(".hero-title"), 0.4, {force3D:true, y: 10, opacity:1, delay:0.1, ease:Power2.easeOut});
			TweenMax.to($(".hero-subtitle"), 0.4, {force3D:true, y: 10, opacity:1, delay:0.15, ease:Power2.easeOut});
			TweenMax.to($(".post-article-wrap"), 0.4, {force3D:true, y: 0, opacity:1, ease:Power2.easeOut});
			TweenMax.to($("#main-page-content"), 0.4, {force3D:true, opacity:1, y:0, delay:0.15, ease:Power2.easeOut});			
		}		
		
		if ($('#hero-bg-image').hasClass("light-content")) {
			$('#hero-caption').addClass('light-content');
			setTimeout(function(){
				$('#magic-cursor').addClass('light-content');
			} , 700 );			
			setTimeout(function(){
				$('#header-container').addClass('light-content');
			} , 600 );
		}
		
		TweenMax.to($("#showcase-holder"), 0.4, {force3D:true, opacity:1, scale:1, delay:0.2, ease:Power2.easeOut});//modified time
		
		TweenMax.to($("#footer-container"), 1, {force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});		
		
		if( $('.load-project-thumb').length > 0 ){
			setTimeout( function(){
				$('#hero-bg-wrapper').find('video').each(function() {
					$(this).get(0).play();
				});
				$('.thumb-container').remove();				
			} , 200 );
		} else {
			$('#hero-bg-wrapper').find('video').each(function() {
				$(this).get(0).play();
			});
		}
		
		setTimeout( function(){	
			$('body').removeClass("load-project-thumb").removeClass("load-project-page").removeClass("load-project-page-carousel").removeClass("load-next-project").removeClass("show-loader").removeClass("load-next-page");
		} , 800 );
		
		setTimeout( function(){				
			$('#showcase-holder').removeClass("disabled");
		} , 1900 );
		
	
	}// End Lazy Load		





/*--------------------------------------------------
Function Showcase
---------------------------------------------------*/
	
	function Showcase() {
		
	
		if( $('#showcase-slider').length > 0 ){	
			
			var titles = [];
			var subtitle = [];
			var counter = [];
			var subtext = [];
			$('#showcase-slider .swiper-slide').each(function(i) {
			  	titles.push($(this).data('title'));
				subtitle.push($(this).data('subtitle'));
				counter.push($(this).data('number'))
				subtext.push($(this).data('subtext'))
			});
						
			var interleaveOffset = 0.4;

			var swiperOptions = {
				direction: "vertical",
				loop: false,
				grabCursor: true,
				resistance : true,
				resistanceRatio : 0,
				allowTouchMove:true, 
				speed:600,
				autoplay: false,
				effect: "slide",
				mousewheelControl: false,
				hashnav: true,
				replaceState: true,
				pagination: {
					el: '.showcase-captions',
					clickable: true,
					renderBullet: function (index, className) {
						return '<div class="tab__link ' + className + '">' + '<div class="subtitle">' + counter[index] + '</div>' + '<div class="title">' + titles[index] + '<span class="counter">' + subtitle[index] + '</span>' + '<p class="subtext">' + subtext[index] + '</p>' + '<div class="btn">' + 'View Article' + '</div>' + '</div>' + '</div>';
						 
					},
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				on: {
					progress: function() {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						var slideProgress = swiper.slides[i].progress;
						var innerOffset = swiper.height * interleaveOffset;
						var innerTranslate = slideProgress * innerOffset;
						swiper.slides[i].querySelector(".img-mask").style.transform = "translate3d(0, " + innerTranslate + "px,0)";
					  }
					},
					touchStart: function() {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = "";
					  }
					},
					setTransition: function(speed) {
					  var swiper = this;
					  for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.transition = speed + "ms";
						swiper.slides[i].querySelector(".img-mask").style.transition = speed + "ms";
					  }   
				  },
					init: function () {
						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						});						
						$('.showcase-captions-wrap').clone().removeClass('no-stroked').addClass('stroked').insertAfter('.showcase-captions-wrap');
						$('.stroked .showcase-captions').clone().removeClass('no-stroked').appendTo('.showcase-subtitles-wrap');
						
						
					},				
					slideChangeTransitionStart: function () {
						
						var slidertitleheight = $(".title").height()
						
						TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.6, {y:-slidertitleheight, opacity:1, ease:Power1.easeInOut})
						TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.6, {y:0, opacity:1, delay:0, ease:Power1.easeInOut})
						TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').next().find('.title'), 0.6, {y:slidertitleheight, opacity:1, ease:Power1.easeInOut})
						
						
						TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.6, {y:-slidertitleheight, opacity:0.3, ease:Power1.easeInOut})
						TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().prev().find('.title'), 0.6, {y:-slidertitleheight*2, opacity:0.3, ease:Power1.easeInOut})						
						
						TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.6, {y:0, opacity:0.3, delay:0, ease:Power1.easeInOut})											
						
						TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.6, {y:slidertitleheight, opacity:0.3, ease:Power1.easeInOut})
						TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().next().find('.title'), 0.6, {y:slidertitleheight*2, opacity:0.3, ease:Power1.easeInOut})
						
						TweenMax.to($('.showcase-subtitles-wrap .swiper-pagination-bullet-active').prev().find('.subtitle'), 0.6, {y:-20, opacity:1, ease:Power1.easeInOut})
						TweenMax.to($('.showcase-subtitles-wrap .swiper-pagination-bullet-active').find('.subtitle'), 0.6, {y:0, opacity:1, delay:0, ease:Power1.easeInOut})
						TweenMax.to($('.showcase-subtitles-wrap .swiper-pagination-bullet-active').next().find('.subtitle'), 0.6, {y:20, opacity:1, ease:Power1.easeInOut})									
						
						$('.swiper-slide-active').find('video').each(function() {
							$(this).get(0).play();
						}); 					
						
					},		
					slideChangeTransitionEnd: function () {	
						
						$('.swiper-slide-prev').find('video').each(function() {
							$(this).get(0).pause();
						});
						
						$('.swiper-slide-next').find('video').each(function() {
							$(this).get(0).pause();
						});
						
					}
  				},
			};
							
			var swiper = new Swiper(".swiper-container", swiperOptions);
			
			var indicator = new WheelIndicator({
			  elem: document.querySelector('.swiper-container'),
			  callback: function(e){
				if(e.direction == 'up') swiper.slidePrev();
				else swiper.slideNext();
			  }
			});
			
			$("#showcase-slider .swiper-slide").find(".title").each(function(i) {				
				$(this).wrap( "<div class='outer'><div class='inner'></div></div>" );
			});
			
			$('.showcase-subtitles-wrap .title').remove();
			$('.no-stroked .subtitle, .stroked .subtitle').remove();
			
			$("footer").addClass("showcase-footer")
			
			// Tilt Showcase Wrapper
			var maxTilt = 1.5;
			var mouseX, mouseY;
			$(document).on("mousemove", function(event) {
				mouseX = event.pageX;
				mouseY = event.pageY;
			});
			$('#showcase-tilt').each(function() {
				var thisWidth = $(this).width();
				var thisHeight = $(this).height();
				var thisOffset = $(this).offset();
				$(document).mousemove(function() {
					var horTilt = ((mouseX / thisWidth) * (maxTilt * 2)) - maxTilt;
					var verTilt = (((mouseY - thisOffset.top) / thisHeight) * (maxTilt * 2)) - maxTilt;					
					TweenMax.to('#showcase-tilt', 1,{rotationY: horTilt, rotationX: verTilt, scale: 1.05, ease:Power1.easeOut});
				});
			});
			
			
			$('#showcase-slider').on('mousedown touchstart', function(event) {				
				$('body').addClass('scale-up');
				TweenMax.to('#ball', 0.2,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.6});
			});
						
			$('#showcase-slider').on('mouseup touchend', function(event) {				
				$('body').removeClass('scale-up');
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale:1, x: -15, y: -15});
			});
			
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), {opacity:0, y:-120});
			TweenMax.set($('.no-stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').find('.title'), {opacity:0, y:60});
			TweenMax.set($('.stroked .swiper-pagination-bullet-active').next().find('.title'), {opacity:0, y:240});
			
			var slidertitleheight = $(".title").height()
			
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').prev().find('.title'), 0.5, {force3D:true, opacity:0.3, y:-slidertitleheight, delay:0.4, ease:Power2.easeOut});
			TweenMax.to($('.no-stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:1, y:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').find('.title'), 0.5, {force3D:true, opacity:0.3, y:0, delay:0.5, ease:Power2.easeOut});
			TweenMax.to($('.stroked .swiper-pagination-bullet-active').next().find('.title'), 0.5, {force3D:true, opacity:0.3, y:slidertitleheight, delay:0.6, ease:Power2.easeOut});
			
		}	
		
			
	}//End Showcase
	
	
	
/*--------------------------------------------------
Function Showcase Carousel
---------------------------------------------------*/
	
	function ShowcaseCarousel() {
		
	
		if( $('#showcase-carousel-slider').length > 0 ){
						
			if ($(window).width() >= 1024) {
			   var swiperOptions = {
					direction: "vertical",
					loop: false,
					grabCursor: true,
					resistance : true,
					resistanceRatio:0.5,
					slidesPerView: 1,
					allowTouchMove:false,   
					longSwipes:true,
					longSwipesRatio:0.5,
					touchRatio:12,
					speed:800,
					mousewheelControl: false,
					hashnav: true,
					replaceState: true,
					autoplay: false,
					effect: "slide",
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					on: {
						init: function () {
							
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							});	
							
						},
						progress: function() {
							if ($('.swiper-slide').first().hasClass('swiper-slide-active')){
								$('body').addClass('scale-up-top');
							} else { 
								$('body').removeClass('scale-up-top');
							}
							
							if ($('.swiper-slide').last().hasClass('swiper-slide-active')){
								$('body').addClass('scale-up-bottom');
							} else { 
								$('body').removeClass('scale-up-bottom');
							}
						},			
						slideChangeTransitionStart: function () {						
							
							var slidertitleheight = $(".title").height()
							
							TweenMax.to($('.swiper-slide-active').prev().find('.title'), 0.4, {y:-slidertitleheight, opacity:1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').find('.title'), 0.8, {y:0, opacity:1, delay:0, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').next().find('.title'), 0.4, {y:slidertitleheight, opacity:1, ease:Power1.easeInOut})
							
							TweenMax.to($('.swiper-slide-active').prev().find('.subtitle'), 0.4, {y:-40, opacity:1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').find('.subtitle'), 0.7, {y:0, opacity:1, delay:0.1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').next().find('.subtitle'), 0.4, {y:40, opacity:1, ease:Power1.easeInOut})
								
							
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							}); 					
							
						},		
						slideChangeTransitionEnd: function () {	
							
							$('.swiper-slide-prev').find('video').each(function() {
								$(this).get(0).pause();
							});
							
							$('.swiper-slide-next').find('video').each(function() {
								$(this).get(0).pause();
							});
							
						}
					},
				};
								
				var swiper = new Swiper(".swiper-container", swiperOptions);
				
				var indicator = new WheelIndicator({
				  elem: document.querySelector('.swiper-container'),
				  callback: function(e){
					if(e.direction == 'up') swiper.slidePrev();
					else swiper.slideNext();
				  }
				});
			}
			else {
			   var swiperOptions = {
					direction: "vertical",
					loop: false,
					grabCursor: true,
					resistance : true,
					resistanceRatio:0.5,
					slidesPerView: 1,
					allowTouchMove:true,
					speed:800,
					autoplay: false,
					effect: "slide",
					mousewheel: true,
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					on: {
						init: function () {
							
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							});	
							
						},
						progress: function() {
							if ($('.swiper-slide').first().hasClass('swiper-slide-active')){
								$('body').addClass('scale-up-top');
							} else { 
								$('body').removeClass('scale-up-top');
							}
							
							if ($('.swiper-slide').last().hasClass('swiper-slide-active')){
								$('body').addClass('scale-up-bottom');
							} else { 
								$('body').removeClass('scale-up-bottom');
							}
						},			
						slideChangeTransitionStart: function () {						
							
							var slidertitleheight = $(".title").height()
							
							TweenMax.to($('.swiper-slide-active').prev().find('.title'), 0.4, {y:-slidertitleheight, opacity:1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').find('.title'), 0.8, {y:0, opacity:1, delay:0, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').next().find('.title'), 0.4, {y:slidertitleheight, opacity:1, ease:Power1.easeInOut})
							
							TweenMax.to($('.swiper-slide-active').prev().find('.subtitle'), 0.4, {y:-40, opacity:1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').find('.subtitle'), 0.7, {y:0, opacity:1, delay:0.1, ease:Power1.easeInOut})
							TweenMax.to($('.swiper-slide-active').next().find('.subtitle'), 0.4, {y:40, opacity:1, ease:Power1.easeInOut})
								
							
							$('.swiper-slide-active').find('video').each(function() {
								$(this).get(0).play();
							}); 					
							
						},		
						slideChangeTransitionEnd: function () {	
							
							$('.swiper-slide-prev').find('video').each(function() {
								$(this).get(0).pause();
							});
							
							$('.swiper-slide-next').find('video').each(function() {
								$(this).get(0).pause();
							});
							
						}
					},
				};
								
				var swiper = new Swiper(".swiper-container", swiperOptions);
			}	

			
			$("footer").addClass("showcase-carousel-footer")
		
			
			if ($(window).width() >= 1024) {
			
				$('#showcase-holder').on('mousedown', function(event) {				
					event.preventDefault();
					$( "#ball" ).removeClass("hold");
					TweenMax.to('#ball', 0.6,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.6});
					TweenMax.to('#hold-event', 0.6,{scale:0});
					var progress = $('#hold-event');
					TweenMax.to(progress, 0.6, {force3D:true, backgroundColor : 'rgba(255, 255, 255, 1)'﻿, onComplete:function(){
						
						
						var dragSwiper = document.querySelector('.swiper-container').swiper;
						dragSwiper.allowTouchMove = true;
						
						TweenMax.to('#showcase-holder-wrap', 1,{scale: 0.7, ease:Power4.easeOut});
						
						$('body').addClass('scale-up');
						
						if ($('.swiper-slide').first().hasClass('swiper-slide-active')){
							$('body').addClass('scale-up-top');
						} else { 
							$('body').removeClass('scale-up-top');
						}
						
						if ($('.swiper-slide').last().hasClass('swiper-slide-active')){
							$('body').addClass('scale-up-bottom');
						} else { 
							$('body').removeClass('scale-up-bottom');
						}		
						
						TweenMax.to(progress, 0.3,{force3D:true, backgroundColor : 'rgba(255, 255, 255, 0)'});
						
						
						TweenMax.to($('.swiper-slide').find('.title'), 0, {y:0, opacity:1, delay:0, ease:Power1.easeInOut})
						TweenMax.to($('.swiper-slide').find('.subtitle'), 0.4, {y:40, opacity:1, delay:0, ease:Power1.easeInOut})
						
				  }});
				});
				
				$('#showcase-holder').on('mouseup', function(event) {
					
					var dragSwiper = document.querySelector('.swiper-container').swiper;
					dragSwiper.allowTouchMove = false;
						
					TweenMax.to('#showcase-holder-wrap', 0.4,{scale:1, delay:0.5});
					TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale:1, x: -15, y: -15});
					TweenMax.to('#hold-event', 0.3,{force3D:true, scale:1, width:26, height:26, backgroundColor : 'rgba(255, 255, 255, 0)'});
					
					$('body').removeClass('scale-up').removeClass('scale-up-bottom').removeClass('scale-up-top');
					TweenMax.to($('.swiper-slide-active').find('.subtitle'), 0.5, {y:0, opacity:1, delay:0.1, ease:Power1.easeInOut})				
				});
			
			}
			
			$("#showcase-carousel-slider .title").mouseenter(function(e) {	
				$( "#ball" ).addClass("with-icon");				
			});
			
			$("#showcase-carousel-slider .title").mouseleave(function(e) {
				$("#ball").removeClass("with-icon");
			});	
			
			$('#showcase-carousel-slider .title').on('mousedown', function(event) {
				return false;
			});
			
			$(".section-image").mouseenter(function(e) {					
				$( "#ball" ).addClass("hold")
			});
			
			$(".section-image").mouseleave(function(e) {					
				$( "#ball" ).removeClass("hold")
			});
			
			TweenMax.set($('.swiper-slide-active').find('.title'), {y:180});
			TweenMax.set($('.swiper-slide-active').find('.subtitle'), {y:40});
			
			
			TweenMax.to($('.swiper-slide-active').find('.title'), 0.8, {force3D:true, y:0, delay:0.2, ease:Power2.easeOut});
			TweenMax.to($('.swiper-slide-active').find('.subtitle'), 0.7, {force3D:true, y:0, delay:0.3, ease:Power2.easeOut});
			
		}	
		
			
	}//End Showcase	Carousel		


/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/	
		
	function Portfolio() {	
			
		if( $('#portfolio-wrap').length > 0 ){			
			
			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{
					renderByPixels: true,
					damping:0.05
				});
			}
			
			var $container = $('#portfolio');
		
			$container.isotope({
				layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				$('.item').addClass('item-margins');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector }, function( $changedItems, instance ) {
				  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				  instance.$filteredAtoms.addClass('is-filtered');
				});		
				return false;
			});
			
			$("#all").trigger('click');
				
			$('.item').each(function() {
				var image = $(this).find('.item-image').data('src');	
				$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
			});
			
			
			$(".item-image").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
				$(this).find('video').each(function() {
					$(this).get(0).play();
				});
			});
			
			$('.item-image').on('mousedown', function(event) {
				return false;
			});
				
			$(".item-image").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale:1, x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
				$(this).find('video').each(function() {
					$(this).get(0).pause();
				});
			});
			
			$("#main-page-content").mouseenter(function(e) {					
				$( "#ball" ).addClass("hold")
			});
			
			$("#main-page-content").mouseleave(function(e) {					
				$( "#ball" ).removeClass("hold")
			});
			
			
			$('#main-page-content.portfolio-page').on('mousedown', function(event) {				
				event.preventDefault();
				$( "#ball" ).removeClass("hold");
				TweenMax.to('#ball', 1,{width:60, height:60});
				TweenMax.to('#hold-event', 1,{scale:0, width:56, height:56});
				var progress = $('#hold-event');
				TweenMax.to(progress, 1, {force3D:true, backgroundColor : 'rgba(255, 255, 255, 1)'﻿, onComplete:function(){
					
					//Execute trigger click here
					var heroheight = $("#hero").height() 
					if ($("body").hasClass("smooth-scroll")) {
						TweenLite.to(scrollbar, 1.5, {scrollTo:heroheight, ease:Power4.easeInOut});
					} else {
						TweenLite.to(window, 1.5, {scrollTo:heroheight, ease:Power4.easeInOut});
					}
					
					TweenMax.to(progress, 0.3,{force3D:true, backgroundColor : 'rgba(255, 255, 255, 0)'});
					TweenMax.to('#ball', 0.3,{width:30, height:30});
					TweenMax.to($("#hero"), 2, {force3D:true, scale: 1, opacity:0, delay:0, ease:Power2.easeInOut});
					TweenMax.to($("#main"), 0.6, {force3D:true, scale: 1, opacity:0.3, delay:0, ease:Power2.easeInOut});
					$('#filters-overlay').addClass('active');
					TweenMax.to($(".below-caption .item-caption"), 0.5, {opacity:0, delay:0.2, ease:Power2.easeOut});
					
					//Fade In Navigation Lists
					TweenMax.set($(".filters-info"), {y:30, opacity:0});
					TweenMax.to($(".filters-info"), 0.4, {force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
					var tlMenu = new TimelineLite();
					tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
					$(".filters-timeline").each(function(index, element) {
						tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.8, ease:Power3.easeOut}, index * 0.1)
					});
			  }});
			});
			
			$('#main-page-content.portfolio-page').on('mouseup touchend', function(event) {
				$( "#ball" ).addClass("hold")
				TweenMax.to('#ball', 0.3,{width:30, height:30});
				TweenMax.to('#hold-event', 0.3,{force3D:true, scale:1, width:26, height:26, backgroundColor : 'rgba(255, 255, 255, 0)'});
			});
			
			//Overlay Menu
			$('#show-filters, #close-filters').on('click', function() {			
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()
				
				setTimeout( function(){			
					if ($('#filters-overlay').hasClass("active")) {	
						TweenMax.to($("#hero, #show-filters"), 0.6, {force3D:true, scale: 1, opacity:0, delay:0.6, ease:Power2.easeInOut});
						TweenMax.to($("#main"), 0.6, {force3D:true, scale: 1, opacity:0.3, delay:0, ease:Power2.easeInOut});					
						TweenMax.to($(".below-caption .item-caption"), 0.3, {opacity:0, ease:Power2.easeOut});
						
						//Fade In Navigation Lists
						TweenMax.set($(".filters-info"), {y:30, opacity:0});
						TweenMax.to($(".filters-info"), 0.4, {force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
						var tlMenu = new TimelineLite();
						tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
						$(".filters-timeline").each(function(index, element) {
							tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.8, ease:Power3.easeOut}, index * 0.1)
						});
							
					} else {					
						
						TweenMax.to($("#hero, #show-filters"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});
						TweenMax.to($("#main"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
						TweenMax.to($(".below-caption .item-caption"), 0.5, {opacity:1, delay:0.5, ease:Power2.easeOut});
						
						//Fade Out Navigation Lists
						TweenMax.to($(".filters-info"), 0.2, {force3D:true, y:-30, opacity:0, delay:0, ease:Power1.easeIn});					
						var tlMenu = new TimelineLite();
						$(".filters-timeline, .jssocials-share").each(function(index, element) {
							tlMenu.to(element, 0.25, {opacity:0, y:-60, delay:0.1, ease:Power1.easeIn }, index * 0.1)
						});
						TweenMax.to('#hold-event', 0.3,{force3D:true, scale:1, width:26, height:26, backgroundColor : 'rgba(255, 255, 255, 0)'});	
						TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
						$("#ball").removeClass("close-icon");
						$('#ball i').remove();
						
					}							
				} , 20 );
			});
			
			
			$("#close-filters").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
			});
				
			$("#close-filters").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("close-icon");
				$('#ball i').remove();
			});
			
			FitThumbScreen();
			
		}	
		if( $('#news-wrap').length > 0 ){			
			
			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{
					renderByPixels: true,
					damping:0.05
				});
			}
			
			var $container = $('#portfolio');
		
			$container.isotope({
				layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});
			
			
				
			$('.item').each(function() {
				var image = $(this).find('.item-image').data('src');	
				$(this).find('.item-image').css({'background-image': 'url(' + image + ')'});
			});
			
			
			$(".item-image").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '1px', top: 1, left: 1});
				$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
				$(this).find('video').each(function() {
					$(this).get(0).play();
				});
			});
			
			$('.item-image').on('mousedown', function(event) {
				return false;
			});
				
			$(".item-image").mouseleave(function(e) {
				TweenMax.to('#ball', 0.2,{borderWidth: '2px', scale:1, x: -15, y: -15});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '2px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball i').remove();
				$(this).find('video').each(function() {
					$(this).get(0).pause();
				});
			});
			
			
			
			//Overlay Menu
			$('#show-filters, #close-filters').on('click', function() {			
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()
				
				setTimeout( function(){			
					if ($('#filters-overlay').hasClass("active")) {	
						TweenMax.to($("#hero, #show-filters"), 0.6, {force3D:true, scale: 1, opacity:0, delay:0.6, ease:Power2.easeInOut});
						TweenMax.to($("#main"), 0.6, {force3D:true, scale: 1, opacity:0.3, delay:0, ease:Power2.easeInOut});					
						TweenMax.to($(".below-caption .item-caption"), 0.3, {opacity:0, ease:Power2.easeOut});
						
						//Fade In Navigation Lists
						TweenMax.set($(".filters-info"), {y:30, opacity:0});
						TweenMax.to($(".filters-info"), 0.4, {force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
						var tlMenu = new TimelineLite();
						tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
						$(".filters-timeline").each(function(index, element) {
							tlMenu.to(element, 0.5, {y:0, opacity:1, delay:0.8, ease:Power3.easeOut}, index * 0.1)
						});
							
					} else {					
						
						TweenMax.to($("#hero, #show-filters"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});
						TweenMax.to($("#main"), 0.6, {force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});					
						TweenMax.to($(".below-caption .item-caption"), 0.5, {opacity:1, delay:0.5, ease:Power2.easeOut});
						
						
						
						
					}							
				} , 20 );
			});
			
			
			
			FitThumbScreen();
			
		}
	
	}//End Portfolio

	

/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/
	
	function Shortcodes() {
		
		// Accordion	  
		
		$('dd.accordion-content2').slideUp(1).addClass('hide');		
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(200).siblings('dd.accordion-content2').slideUp(200).prev().removeClass('accordion-active');						
		});	
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content2').slideUp(200);
		});
		
		$(".flexnav").flexNav({ 'animationSpeed' : 250 });
	
	}//End Shortcodes
	

	
	
/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/
	
	function Sliders() {
		
		$('.slider').owlCarousel({
			loop:true,
			margin:500,
			center: true,
			autoHeight:false,
			nav:true,
			navSpeed: 500,
			items:1,			
		});
		
		$( ".slider .owl-prev" ).removeClass( "parallax-wrap" );
		$( ".slider .owl-next" ).removeClass( "parallax-wrap" );
		
		if( $('.carousel').length > 0 ){
		
			$('.carousel').owlCarousel({
				loop:true,
				margin:20,
				autoHeight:false,
				navSpeed: 600,
				nav:true,
				responsive:{
					0:{
						items:1
					},
					479:{
						items:2
					},
					1024:{
						items:3
					},
					1466:{
						items:3
					}
				}
			});
			
			$( ".carousel .owl-prev" ).removeClass( "parallax-wrap" );
			$( ".carousel .owl-next" ).removeClass( "parallax-wrap" );
			
		}
				
		$(".owl-prev").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
		});
			
		$(".owl-prev").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
		
		$(".owl-next").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
		});
			
		$(".owl-next").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});		
		
		if( $('.text-carousel').length > 0 ){		
			$(".text-carousel").owlCarousel({	
				loop:true,
				dots:false,
				items:1,
				autoplay:false,
				smartSpeed: 750,
				autoHeight:true,
				autoplayHoverPause:true,
				nav:true,
				navText: ["<div class='prev-testimonial parallax-element'><i class='fa fa-chevron-left' aria-hidden='true'></i></div>","<div class='next-testimonial parallax-element'><i class='fa fa-chevron-right' aria-hidden='true'></i></div>"],
			});
		}
		
		
	}//End Sliders	
	
	
/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/	
	
	function JustifiedGrid() {
		
		if( $('#justified-grid').length > 0 ){
		
			$('#justified-grid').justifiedGallery({
				rowHeight : 300,
				lastRow : 'nojustify',
				margins : 10
			});
		
		}
		
	}//End Justified Grid	
	
	
/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/
	
	function Lightbox() {
		
		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',	
			gallery: {
			  enabled:true
			},		
			zoom: {
				enabled: true, 			
				duration: 300, 
				easing: 'ease-in-out', 
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}			
		});
		
		$(".image-link").mouseenter(function(e) {	
			TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 1.8});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '1px', top: 1, left: 1});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});
			
		$(".image-link").mouseleave(function(e) {
			TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1,  x: -15, y: -15});
			TweenMax.to('#ball-loader', 0.1,{borderWidth: '2px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});
			
	}//End Lightbox	
	
	
	
/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/	
		
	function ContactForm() {	
	
		if( jQuery('#contact-formular').length > 0 ){
			
			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');		
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						phone: $('#phone').val(),
						category: $('#category').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');		
					}
				);		
				});		
				return false;		
			});		
		}

	}//End ContactForm
	
	
	
/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/	


	function PlayVideo() {
	
		if( $('.video-wrapper').length > 0 ){	
			
			
			$(".video-wrapper").mouseenter(function(e) {
				if ($(this).hasClass("play")) {
					$( "#ball" ).addClass("pause-movie")		
				}
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});
			
			$(".video-wrapper").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{borderWidth: '2px', scale:1, x: -15, y: -15});
				$("#ball").removeClass("over-movie").removeClass("pause-movie");
				$('#ball i').remove();
			});
			
			$(".video-wrapper .control").mouseenter(function(e) {	
				TweenMax.to('#ball', 0.2,{borderWidth: '20px', scale: 0});
			});
			
			$(".video-wrapper .control").mouseleave(function(e) {
				TweenMax.to('#ball', 0.1,{transformOrigin: '15px 15px', borderWidth: '1px', scale: 2});
			});
			
			var videocenter = ($(window).height() - $('.video-cover').height()) / 2
					
			////////////////////////////////////////////////////// REFACTOR //////////////////////////////////////////////////////
			// plays or pause the video function of its current state
			var playpause = function( videoObj ) {
				
				if( videoObj[0] != null ){
					if(videoObj[0].paused || videoObj[0].ended) {
						
						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {
						
						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};
			
			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};
			
			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function() {
				
				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);		
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');
				
				$( "#ball" ).toggleClass("pause-movie");
				
				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function() {
					
					if( !current_wrapper.is( $(this) ) ){
						
						$(this).removeClass('play');
						$(this).find('video').each(function() {
							
							if( !$(this).get(0).paused && !$(this).get(0).ended ) {
								
								$(this).get(0).pause();
							}
						});
					}
					
				});
				
				// trigger the click for the inner video
				$(this).find('video').each(function() {

					playpause( $(this) );
				});

			});
			
			//fullscreen button clicked
			$('.btnFS').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				if($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}	
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
				
			});
				
			//sound button clicked
			$('.sound').on('click', function( e ) {
					
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
					
				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if(video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width',0);
				}
				else{
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume*100+'%');
				}
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			//progress bar (video timebar) clicked
			$('.progress').on('click', function( e ) {
				
				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');
									
				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration 	= video_object[0].duration;
				var position 			= e.pageX - $(this).offset().left;
				var percentage 	= 100 * position / $(this).width();
				if(percentage > 100) {
					
					percentage = 100;
				}
				if(percentage < 0) {
					
					percentage = 0;
				}
				$('.timeBar').css('width', percentage+'%');	
				video_object[0].currentTime = maxduration * percentage / 100;
				
				// prevent video wrapper div responding the event
				e.stopPropagation();
			});
			
			$('#main-page-content').find('video').each(function() {
			
				var video = $(this);
				var video_wrapper = $(this).parent();
				
				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);
			 
				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function() {
					
					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));
					
				});
				
				//display current video buffered progress
				video.on('progress', function() {
					
					var video_object 		= $(this);
					var parent_wrapper 	= $(this).parent();
					var maxduration 		= video_object [0].duration;
					
					if (maxduration > 0) {
					  for (var i = 0; i < video_object [0].buffered.length; i++) {
							if (video_object [0].buffered.start(video_object [0].buffered.length - 1 - i) <video_object [0].currentTime) {
								var perc = (video_object [0].buffered.end(video_object [0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width',perc+'%');
								break;
							}
						}
					}
					
				});
				
				//display current video play time
				video.on('timeupdate', function() {
					
					var parent_wrapper 	= $(this).parent();
					var currentPos 			= $(this).get(0).currentTime;
					var maxduration 		= $(this).get(0).duration;
					var perc 					= 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width',perc+'%');	
					parent_wrapper.find('.current').text(timeFormat(currentPos));	
				});
				
				//video screen and play button clicked
				video.on('click', function() { 
					
					playpause( $(this) ); 
				});
				
				//video canplay event
				video.on('canplay', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});
				
				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function() {
					
					completeloaded = true;
				});
				
				//video ended event
				video.on('ended', function() {		
					
					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$( "#ball" ).toggleClass("pause-movie");
				});
			
				//video seeking event
				video.on('seeking', function() {
					
					//if video fully loaded, ignore loading screen
					if(!completeloaded) { 
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}	
				});
				
				//video seeked event
				video.on('seeked', function() { });
				
				//video waiting for more data event
				video.on('waiting', function() {
					
					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});
				
			});
			
		}
		
	}// End PlayVideo					
	
	
	/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/	
		
	function ContactMap() {	
	
				if( jQuery('#map').length > 0 ){					

				mapboxgl.accessToken = 'pk.eyJ1Ijoic2FwaWVudGF0b20iLCJhIjoiY2p2N3Vjc3UyMGp3ejQzbnR6bG85cXU0YSJ9.HMJABwXay9WgU_8nqBMLsA';
		var map = new mapboxgl.Map({
		style: 'mapbox://styles/sapientatom/ck7605t3t00841io9mj5ndts1',
		center: [126.99491479864025, 37.58177226206988],
		zoom: 14,
		pitch: 45,
		bearing: 25,
		container: 'map'
		});

		// The 'building' layer in the mapbox-streets vector source contains building-height
		// data from OpenStreetMap.
		map.on('load', function() {
		// Insert the layer beneath any symbol layer.
		var layers = map.getStyle().layers;
		 
		var labelLayerId;
		for (var i = 0; i < layers.length; i++) {
		if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
		labelLayerId = layers[i].id;
		break;
		}
		}
		 
		map.addLayer({
		'id': '3d-buildings',
		'source': 'composite',
		'source-layer': 'building',
		'filter': ['==', 'extrude', 'true'],
		'type': 'fill-extrusion',
		'minzoom': 14,
		'paint': {
		'fill-extrusion-color': '#303030',
		 
		// use an 'interpolate' expression to add a smooth transition effect to the
		// buildings as the user zooms in
		'fill-extrusion-height': [
		"interpolate", ["linear"], ["zoom"],
		15, 0,
		22.05, ["get", "height"]
		],
		'fill-extrusion-base': [
		"interpolate", ["linear"], ["zoom"],
		15, 0,
		15.05, ["get", "min_height"]
		],
		'fill-extrusion-opacity': .7
		}
		}, labelLayerId);
		});

		map.scrollZoom.disable();
		map.addControl(new mapboxgl.NavigationControl());

		}
		
		return false
//		if( jQuery('#map_canvas').length > 0 ){					
//			var latlng = new google.maps.LatLng(43.270441,6.640888);
//			var settings = {
//				zoom: 14,
//				center: new google.maps.LatLng(43.270441,6.640888),
//				mapTypeControl: false,
//				scrollwheel: false,
//				draggable: true,
//				panControl:false,
//				scaleControl: false,
//				zoomControl: false,
//				streetViewControl:false,
//				navigationControl: false};			
//				var newstyle = [
//				{
//					"featureType": "all",
//					"elementType": "labels.text.fill",
//					"stylers": [
//						{
//							"saturation": 36
//						},
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 40
//						}
//					]
//				},
//				{
//					"featureType": "all",
//					"elementType": "labels.text.stroke",
//					"stylers": [
//						{
//							"visibility": "on"
//						},
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 16
//						}
//					]
//				},
//				{
//					"featureType": "all",
//					"elementType": "labels.icon",
//					"stylers": [
//						{
//							"visibility": "off"
//						}
//					]
//				},
//				{
//					"featureType": "administrative",
//					"elementType": "geometry.fill",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 20
//						}
//					]
//				},
//				{
//					"featureType": "administrative",
//					"elementType": "geometry.stroke",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 17
//						},
//						{
//							"weight": 1.2
//						}
//					]
//				},
//				{
//					"featureType": "landscape",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 20
//						}
//					]
//				},
//				{
//					"featureType": "poi",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 21
//						}
//					]
//				},
//				{
//					"featureType": "road.highway",
//					"elementType": "geometry.fill",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 17
//						}
//					]
//				},
//				{
//					"featureType": "road.highway",
//					"elementType": "geometry.stroke",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 29
//						},
//						{
//							"weight": 0.2
//						}
//					]
//				},
//				{
//					"featureType": "road.arterial",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 18
//						}
//					]
//				},
//				{
//					"featureType": "road.local",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 16
//						}
//					]
//				},
//				{
//					"featureType": "transit",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 19
//						}
//					]
//				},
//				{
//					"featureType": "water",
//					"elementType": "geometry",
//					"stylers": [
//						{
//							"color": "#000000"
//						},
//						{
//							"lightness": 17
//						}
//					]
//				}
//			];
//			var mapOptions = {
//				styles: newstyle,
//				mapTypeControlOptions: {
//					 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'holver']
//				}
//			};
//			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);	
//			var mapType = new google.maps.StyledMapType(newstyle, { name:"Grayscale" });    
//				map.mapTypes.set('holver', mapType);
//				map.setMapTypeId('holver');
//						
//			
//			google.maps.event.addDomListener(window, "resize", function() {
//				var center = map.getCenter();
//				google.maps.event.trigger(map, "resize");
//				map.setCenter(center);
//			});	
//			var contentString = '<div id="content-map-marker" style="text-align:center; padding-top:10px; padding-left:10px">'+
//				'<div id="siteNotice">'+
//				'</div>'+
//				'<h4 id="firstHeading" class="firstHeading" style="color:#000!important; font-weight:600; margin-bottom:0px;">Hello Friend!</h4>'+
//				'<div id="bodyContent">'+
//				'<p color:#999; font-size:14px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
//				'</div>'+
//				'</div>';
//			var infowindow = new google.maps.InfoWindow({
//				content: contentString
//			});	
//			var companyImage = new google.maps.MarkerImage('images/marker.png',
//				new google.maps.Size(58,63),<!-- Width and height of the marker -->
//				new google.maps.Point(0,0),
//				new google.maps.Point(35,20)<!-- Position of the marker -->
//			);
//			var companyPos = new google.maps.LatLng(43.270441,6.640888);	
//			var companyMarker = new google.maps.Marker({
//				position: companyPos,
//				map: map,
//				icon: companyImage,               
//				title:"Our Office",
//				zIndex: 3});	
//			google.maps.event.addListener(companyMarker, 'click', function() {
//				infowindow.open(map,companyMarker);
//			});	
//		}
//		
//		return false
	
	}//End ContactMap
	
/*--------------------------------------------------
Function TweenMaxIMG
---------------------------------------------------*/	
		
	function TweenMaxIMG() {	
	
				if( jQuery('#scene').length > 0 ){			
var canvas = document.querySelector('#scene');
var width = canvas.offsetWidth,
    height = canvas.offsetHeight;

var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
	alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height);

renderer.setClearColor(0x000000, 0);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(100, width / height, 0.1, 10000);
camera.position.set(120, 0, 300);

var light = new THREE.HemisphereLight(0xffffff, 0x0C056D, 0.6);
scene.add(light);

var light = new THREE.DirectionalLight(0x7d2502, 0.5);
light.position.set(200, 300, 400); 
scene.add(light);
var light2 = light.clone();
light2.position.set(-200, 300, 400); 
scene.add(light2);

var geometry = new THREE.IcosahedronGeometry(120, 4);
for(var i = 0; i < geometry.vertices.length; i++) {
    var vector = geometry.vertices[i];
    vector._o = vector.clone();  
}
var material = new THREE.MeshPhongMaterial({
    emissive: 0xd00000, 
    emissiveIntensity: 0.4,
    shininess: 0
});
var shape = new THREE.Mesh(geometry, material);
scene.add(shape);

function updateVertices (a) {
    for(var i = 0; i < geometry.vertices.length; i++) {
        var vector = geometry.vertices[i];
        vector.copy(vector._o);
        var perlin = noise.simplex3(
            (vector.x * 0.006) + (a * 0.0002),
            (vector.y * 0.006) + (a * 0.0003),
            (vector.z * 0.006)
        );
        var ratio = ((perlin*0.4 * (mouse.y+0.1)) + 0.8);
        vector.multiplyScalar(ratio);
    }
    geometry.verticesNeedUpdate = true;
}

function render(a) {
    requestAnimationFrame(render);
    updateVertices(a);
    renderer.render(scene, camera);
}

function onResize() {
    canvas.style.width = '';
    canvas.style.height = '';
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();  
    renderer.setSize(width, height);
}

var mouse = new THREE.Vector2(0.8, 0.5);
function onMouseMove(e) {
    TweenMax.to(mouse, 0.8, {
        y: (e.clientY / height),
        x : (e.clientX / width),
        ease: Power1.easeOut
    });
}

requestAnimationFrame(render);
window.addEventListener("mousemove", onMouseMove);
var resizeTm;
window.addEventListener("resize", function(){
    resizeTm = clearTimeout(resizeTm);
    resizeTm = setTimeout(onResize, 200);
});
}
return false
}

/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/	
		
	function LoadViaAjax() {		
		
		FirstLoad();		
		LazyLoad();
		QuickMenu();		
		Portfolio();
		Showcase();
		ShowcaseCarousel();		
		Shortcodes();
		Sliders();
		JustifiedGrid();
		Lightbox();
		ContactForm();
		PlayVideo();	
		ContactMap();	
		TweenMaxIMG();
	
	}//End Load Via Ajax				
	
		
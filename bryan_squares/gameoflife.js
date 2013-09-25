var loaded = false;
var cells = [];
var colorClassTemp = "start";
var colorClass = "start";
var colors = ["one","two","three"];
var setAll = false;
var randoms = false;

$(document).ready(function() {
	
	if(!loaded){
		reSetBackground();
		setColors();
		loaded=true;
		init();
	}

	function init(){
		for(var i=0; i<16; i++){
			cells.push([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
		}					
	}

	

	//$("#background").fadeTo('fast',0);
	
	function reSetBackground() {
		
		var divWidth = parseInt( parseInt($(window).width()) + parseInt($(window).width() / 15));		
		var divHeight = parseInt( $(window).width() / 30) +5;

		$(".row").each(function() {
			$(this).css('width' , divWidth);
			$(this).css('height', divHeight);
		});

		var square = parseInt(($(window).width()-50)/ 30);

		$('div div p').each(function(width) {
			$(this).css('width', square);
			$(this).css('height', square);
		});
		
		var leftShift = -(((divWidth - $(window).width()) - 20)/2);
		var topShift = -parseInt($(window).width()/30);

		$("#background").css('left' , leftShift);
		$("#background").css('top' , topShift);

		var leftShift = parseInt($(window).width()-$("#foreground").width())/2;
		$("#foreground").css('height' , parseInt($(window).height()));
		$("#foreground").css('left' , leftShift-7);

	};

		

	
	$('p').mouseenter(function() {
		$(this).css('opacity',0.2);
	});
	var id;
	$('p').mouseleave(function() {
		if(colorClass=="start"){}
		else if(randoms){

			var cla = Math.floor((Math.random()*3));
			$(this).removeClass();
			switch(cla)
				{
				case 1:
				 	$(this).addClass("one");
					break;
				case 2:
				 	$(this).addClass("two");
					break;
				default:
					$(this).addClass("three");
				}
		}
		else{
			$(this).removeClass();
			$(this).addClass(colorClass);
		}
			$(this).fadeTo('slow',1);
	});

	
	$('body').click(function(e) {
		if(e.shiftKey) {
			setAll = false;
			randoms = false;
			$("#colorSelector").remove();
			$(this).append('<div id="colorSelector">' + 
					'<x></x>' +
					'<sel>Select Color</sel>' +
					'<p id="a" class="colSel three"></p>' + 
					'<p id="b" class="colSel one"></p>' + 
					'<p id="c" class="colSel two"></p>' +
					'<p class="submit">Submit</p>' + 
					'<p id="all" class="all">Set All</p>' + 
					'<p id="random" class="random">Random</p>' +
					'</div>');
			var x = e.pageX;
			var y = e.pageY;
	
			if(x > $(window).width()-350)
				x = $(window).width()-350;
			if(y > $(window).height()-230)
				y = $(window).height()-230;
			if(x < 350)
				x = 50;
			if(y < 230)
				y = 50;

			$("#colorSelector").css('left', x);
			$("#colorSelector").css('top', y);
			$("#colorSelector").fadeTo('fast',1);


			$('x').click(function() {
				$("#colorSelector").fadeTo('fast',0);
				$(this).parent().remove();
			});	

			$('x').mouseenter(function() {
				$(this).fadeTo('slow',1);
			});

			$('x').mouseleave(function() {
				$(this).fadeTo('slow',0.5);
			});

			$('.submit').click(function() {
				$("#colorSelector").fadeTo('fast',0);
				colorClass = colorClassTemp;
				$(this).parent().remove();

				if(setAll && randoms){
					setColors();
				}

				else if(setAll){
					setAllColor();
				}	
				else{}
				

				
			});

			$('.submit').mouseenter(function() {
				$(this).fadeTo('slow',1);
			});

			$('.submit').mouseleave(function() {
				$(this).fadeTo('slow',0.5);
			});

			$('.colSel').click(function() {
				colorClassTemp = this.className.substring(6);
				toggleColors(this.id);			
			});	

			$('.colSel').mouseenter(function() {
				$(this).fadeTo('slow',1);
			});

			$('.colSel').mouseleave(function() {
				if(!(this.className.substring(6) == colorClassTemp)){
					$(this).fadeTo('slow',0.5);
				}
				else{}
			});
			
			$('.all').click(function() {
				if(document.getElementById('all').style.opacity==1){
					$(this).fadeTo('fast',0.5);
					setAll = false;
				}
				else{
					$(this).fadeTo('fast',1);
					setAll = true;
				}
			});

			$('.random').click(function() {
				if(document.getElementById('random').style.opacity==1){
					$(this).fadeTo('fast',0.5);
					randoms = false;
				}
				else{
					$(this).fadeTo('fast',1);
					randoms = true;
				}
			});



		}
	});

	
	$(window).resize(function(){
		reSetBackground();
	});	

	function setAllColor(){	
		$('div div p').each(function() {
			$(this).removeClass();
			$(this).addClass(colorClass);
		});
	}
	
	//window.setInterval(randomFades, 300);
	//window.setTimeout(loadLvl1, 1750);
	
	function loadLvl1() {
		$("#foreground").fadeTo(1000, 0.9);
	}

	function toggleColors(id) {

		if(id=="a"){
			//alert("a");
			$("#a").fadeTo('fast',1);
			$("#b").fadeTo('fast',0.5);
			$("#c").fadeTo('fast',0.5);
		}
		else if(id=="b"){
			//alert("b");
			$("#a").fadeTo('fast',0.5);
			$("#b").fadeTo('fast',1);
			$("#c").fadeTo('fast',0.5);
		}
		else if(id=="c"){
			//alert("c");
			$("#a").fadeTo('fast',0.5);
			$("#b").fadeTo('fast',0.5);
			$("#c").fadeTo('fast',1);
		}
		else{}			
	}

	function randomFades() {
		
		var indexes = [];

		for(var i = 0; i<8; i++){

			var row = Math.floor((Math.random()*15));
			var col = Math.floor((Math.random()*30));
			
			var index;

			if(row<10){
				if(col<10){
					index = ("#" + 0 + row.toString() + 0 + col.toString());					
				}
				else{
					index = ("#" + 0 + row.toString() + col.toString());							
				}
			}
			else{
				if(col<10){
					index = ("#" + row.toString() + 0 + col.toString());					
				}
				else{
					index = ("#" + row.toString() + col.toString());							
				}
			}

			indexes.push(index);
		}
		for(var i = 0; i < indexes.length; i++){
			$(indexes[i]).fadeTo('slow',0.05);
			$(indexes[i]).fadeTo('slow',1);
		}
	}

	function setColors(){

		$('div div p').each(function() {	
		
			var cla = Math.floor((Math.random()*3));
			
			$(this).removeClass();
			
			switch(cla)
				{
				case 1:
				 	$(this).addClass("one");
					break;
				case 2:
				 	$(this).addClass("two");
					break;
				default:
					$(this).addClass("three");
				}
		});
	}



});



// start of sayed code using in fire
// By Mohammed Megahed
var fire_interval;
var fire_number=0;
function fire_collision() {
	var fire_with_barrier = $(".fire").collision( ".flammable",{ relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(fire_with_barrier.length!=0){
		var c = $(fire_with_barrier[0]).data("cdata");
		var cwith = $(c).get(0).id;
		$("#"+cwith).remove();
		clearInterval(fire_interval);
	}
}
function move_fire(tux_dir,fire_id) {
	//alert(fire_id);
	if(tux_dir==1) {
		$("#fire_"+fire_id).css("left",(parseInt($("#fire_"+fire_id).css('left')) + 10));
		fire_collision();
	} else {
		$("#fire_"+fire_id).css("left",(parseInt($("#fire_"+fire_id).css('left')) - 10));
		fire_collision();
	}	
}
// end of sayed code using in fire 
////// class Timer
function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}


////// class Barrier
	function Barrier() 
		{ 
		this.drawBarrier=Ex_Level_drawBarrier;
		}

	function Ex_Level_drawBarrier(prmID,prmwidth,prmheight,prmtop,prmleft,prmclass)
		{
		var obj="<div id=\""+prmID+"\" style=\""+"width:"+prmwidth+";height:"+prmheight+";top:"+prmtop+"; left:"+prmleft+";\" class=\""+prmclass+" flammable\"></div>";
		return obj;
		}



		var coinsScore=0;
	
		function hitCoins() 
		{ 
	     var breakable = $("#imgtux").collision( ".Coin" );
		for(i=0;i<=breakable.length-1;i++)
		{
			coinsScore++;
			
			$("#ScoreDiplay").html("<font size='+2' color='black'>Score:<font color='darkblue'>"+coinsScore+"</font></font>");		
		}
		breakable.remove();
		}
		
var isTuxJump=false;
var isTuxFailed=false;
var LifesCount=4;
////// class Tux
		function TuxChar(prmID) 
		{ 
		Ex_Level_drawTux(prmID);
		this.animateTux=Ex_Level_Animate_Tux;
		this.jump=Ex_Level_Jump_Tux;
		this.fire=Ex_Level_Fire_Tux;	
		tid=prmID;
		this.dir="right";
		var rr=0;
		var xx=0;
		
		this.mytimer = new Timer(function() {
  		if(rr>5) rr=0;

		$("#"+tid).attr('src','images/imgs/tux_anim/right/largetux-walk-right-'+rr+'.png');
	
		rr++;
		}, 200);

		this.mytimer2 = new Timer(function() {
  		if(xx>5) xx=0;
		$("#"+tid).attr('src','images/imgs/tux_anim/left/largetux-walk-left-'+xx+'.png');
		xx++;
		}, 200);
		}

	function Ex_Level_drawTux(prmID)
		{
		var obj="<img src='images/imgs/tux_anim/right/largetux-walk-right-0.png' id=\""+prmID+"\" style='z-index:3;position:absolute;;width:46;height:66;bottom: 0'>";
		$(obj).appendTo('div.tuxStage');

		}
		
	// Sayed: tux fire method
	function Ex_Level_Fire_Tux() {
		// if(fire_number<3) {
			fire_number++;
			fire_top = $("#imgtux").position().top+10;
			fire_left = $("#imgtux").position().left;
			fire_displacement = parseInt($("#imgtux").css("width"));
			if(this.dir=="left") {
				lx = fire_left-fire_displacement;
				var obj="<sapn id='fire_"+fire_number+"' class='fire' style='background:url(images/imgs/fire.png);position:absolute;left:"+lx+";top:"+fire_top+";width:16;height:16'></span>";
				$(obj).appendTo('div.tuxStage');
				fire_interval = setInterval("move_fire(0,"+fire_number+")",1);
			} else if(this.dir=="right") {
				lx = fire_left+fire_displacement;
				var obj="<sapn id='fire_"+fire_number+"' class='fire' style='background:url(images/imgs/fire.png);position:absolute;left:"+lx+";top:"+fire_top+";width:16;height:16'></span>";
				$(obj).appendTo('div.tuxStage');
				fire_interval = setInterval("move_fire(1,"+fire_number+")",1)
			}
		// }
	}
	function Ex_Level_Animate_Tux(prmDirection)
		{

	switch(prmDirection)
		{
	case "Right":
			this.mytimer2.pause();
			this.mytimer.resume();
	Ex_Level_checkFail();
	break;
	case "Left":
			this.mytimer.pause();
			this.mytimer2.resume();
	Ex_Level_checkFail();
	break;
		}
		}
	
	function Ex_Level_Jump_Tux(prmID)
		{
	
	//var x=0;
	var eza7a;

	var colBarInfo=Ex_Level_checkBarier("S");
	if(colBarInfo != null)
	{
		
		eza7a=130;	
	 
	}
	else
	{

	eza7a=300;
	}
   prmStandPoint=($("#imgtux").position().top);
	var y=prmStandPoint;
	if(uptimer)
	{
	uptimer.pause();
	}
	if(downtimer)
	{
	downtimer.pause();
	}
	if(!downtimer)
	{

	var downtimer = new Timer(function() {
		  y+=8;
		  $("#"+prmID).css({'top' : y});
			hitCoins();
	  var breakable = $("#"+prmID).collision( ".Barrier" );
	  if(breakable.length>0)
	{
		prmStandPoint=($(breakable[0]).height());
	}
	else
	{
	prmStandPoint=485;
	}
		if(y>=prmStandPoint) 
		{
		downtimer.pause();
		isTuxJump=false;
		Ex_Level_checkFail();
		Ex_Level_checkStair();
		}
		else
		{
		isTuxJump=true;
		downtimer.resume();
		}
		}, 20);
	downtimer.pause();
	}
	else
	{
	downtimer=null;
	}
	if(!uptimer)
	{
	var uptimer = new Timer(function() {
		  y-=8;
		  $("#"+prmID).css({'top' : y});
		hitCoins();
		if(y<=eza7a)
			{ 
			downtimer.resume();
			uptimer.pause();
			}
		else
		{
		Ex_Level_checkStair();
		isTuxJump=true;
		uptimer.resume();
		}
		}, 20);
	}
	else
	{
	uptimer=null;
	}
		}
	function Ex_Level_checkFail()
	{
	var FialArea = $("#imgtux").collision( ".FailArea",{ relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(FialArea.length>0)
	{		for( var i=0; i<FialArea.length; i++ )
				{
;
				  var sid = $(FialArea[i]).data("ddata");
				  var Fside = sid;
				}

	if(Fside=="S" || Fside=="SE" ||Fside=="SW"){
 	//$("#imgtux").remove();
		$("#imgtux").animate({top:"+=100"},1000);
		//alert("GameOver!!");
isTuxFailed=true;
Ex_Level_loseLife(LifesCount);
LifesCount--;
mnuitem="";
$("body").append('<embed src="sound/fall.wav" autostart="true" hidden="true" loop="false">');	


$('<div id="pauseviewer" class="ActionScreen"></div>').appendTo('#levelContainer');
if(LifesCount>0)
{
mnuitem="Return to Game";
}
else
{
mnuitem="Restart Game";
 $('<div id="fScoreDisp" class="FinalScore"></div>').appendTo('#levelContainer');
 $('<div id="scoreitem" class="mnuItem" style="top:30;"><Font color="white"> Score: '+coinsScore+'</font><img src=\"images/imgs/coin1.png\" style=\"position:absolute;left:180\"></div>').appendTo('#fScoreDisp');
}
	                
	                $('<div id="pauseMenu" class="PauseMenu"></div>').appendTo('#levelContainer');
	                $('<div id="returnItem" class="mnuItem" style="top:40;"><Font color="white">'+mnuitem+'</font></div>').appendTo('#pauseMenu');
	                $('<div id="quitItem" class="mnuItem" style="top:90;"><font color="white"><b>Quit<b></font></div>').appendTo('#pauseMenu');

$("#returnItem,#quitItem").hover(

				function()
				{
				$(this).css({"background-color":"gray"});
				}
				,
				function()
				{
				$(this).css({"background-color":"black"});
				}
		
		);

$("#returnItem").click(

				function()
				{
if(mnuitem=="Return to Game"){
				$('#pauseviewer').remove();		
				$('#pauseMenu').remove();		
				$("#imgtux").show();
				$("#imgtux").position().left=50;
				$("#enimiesContainer").stop(true).animate({left:"-10"},20); 
				$("#imgtux").animate({top:"-=100"},1000);
				isTuxFailed=false;
				$("body").append('<embed src="sound/lifeup.wav" autostart="true" hidden="true" loop="false">');	
				}
else if(mnuitem=="Restart Game"){
$('#levelContainer').remove();
var level = new Level();
level.draw();
isTuxFailed=false;
}
}
		
		);
$("#quitItem").click(

				function()
				{
				$('#levelContainer').remove();		
				isTuxFailed=true;
afterQuit();
				}
		
		);
	}
	}
}	
	function Ex_Level_checkStair()
	{
	var StrairCol = $("#imgtux").collision( ".Stair",{ relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(StrairCol.length>0)
	{		for( var i=0; i<StrairCol.length; i++ )
				{
				 var o = $(StrairCol[i]).data("odata");

				  var cwith = $(o).get(0).id;
				  var sid = $(StrairCol[i]).data("ddata");
				  var Fside = sid;
				}

	if(Fside=="S"){
	var p = $("#"+cwith);
	var position = p.position();
		//alert(position.top);
	}
	}
}

	function Ex_Level_checkBarier(prmColSide)
	{
	var BarCol = $("#imgtux").collision( ".Barrier",{ relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(BarCol.length>0)
	{		for( var i=0; i<BarCol.length; i++ )
				{
				 var o = $(BarCol[i]).data("odata");

				  var cwith = $(o).get(0).id;
				  var sid = $(BarCol[i]).data("ddata");
				  var Fside = sid;
				}

	if(Fside==prmColSide){
	var p = $("#"+cwith);
	var position = p.position();
	res=[position.top,position.left, p.width(), p.height()];	
return res;	
}
	}
return null;
}
////// class Stair
	function Stair() 
		{ 
		this.drawStair=Ex_Level_drawStair;
		}

	function Ex_Level_drawStair(prmID,prmwidth,prmheight,prmtop,prmleft,prmclass)
		{
		var obj="<div id=\""+prmID+"\" style=\""+"width:"+prmwidth+";height:"+prmheight+";top:"+prmtop+"; left:"+prmleft+";\" class=\""+prmclass+" flammable\"></div>";
		return obj;
		}

///// class Floor

	function Floor() 
		{ 
		
		this.drawFloor=Ex_Level_drawFloor;
		}

	function Ex_Level_drawFloor(prmID,prmwidth,prmleft)
		{
		var obj="<div id=\""+prmID+"\" style=\""+"position:absolute;width:"+prmwidth+"; left:"+prmleft+";\" class=\"floor flammable\"></div>";
		return obj;
		}

///// class FailArea
	function FailArea() 
		{ 
		this.drawFailArea=Ex_Level_drawFailArea;
		}

	function Ex_Level_drawFailArea(prmID,prmwidth,prmleft,prmwd)
		{
		var obj="<div id=\""+prmID+"\" style=\""+"position:absolute;width:"+prmwidth+"; left:"+prmleft+";\" class=\"FailArea flammable\"></div>";
		return obj;
		}
///// class Lifes Pointer
	function LifePointer() 
		{ 
		this.drawLifePointer=Ex_Level_drawLifePointer;
		}

	function Ex_Level_drawLifePointer(prmID,prmleft,prmLifesNum)
		{
LifesCount=prmLifesNum;
		prmwidth=32*prmLifesNum;
		var obj="<div id=\""+prmID+"\" style=\""+"position:absolute;width:"+prmwidth+"; left:"+prmleft+";\" class=\"LifePointer\"></div>";
$(obj).appendTo('div.levelContainer');
		var xx=1;
		for (a=1;a<=prmLifesNum;a++)
		{
		var life="<img id=\"life"+a+"\" src='images/imgs/tux-life.png' class=\"lifepoint\">";
		$(life).appendTo('#'+prmID);
		}
		return obj;
		}

	function Ex_Level_loseLife(prmID)
		{
		$("#life"+prmID).remove();
		}

///// class Planet
	function Planet() 
		{ 
		
		this.drawPlanet=Ex_Level_drawPlanet;
		}

	function Ex_Level_drawPlanet(prmleft)
		{
		var obj="<img class='imgPlanet' src='images/imgs/background8.png' style=\"left:"+prmleft+";z-index:40;\" >";
		return obj;
		}

///// class Cloud
	function Cloud() 
		{ 
		
		this.drawCloud=Ex_Level_drawCloud;
		}

	function Ex_Level_drawCloud(prmtop,prmleft)
		{
		var obj="<img class='cloud' src='images/imgs/cloud.PNG' style=\"left:"+prmleft+";top:"+prmtop+";\" >";
		return obj;
		}

///// class EndPoint
	function EndPoint() 
		{ 
		this.drawEndPoint=Ex_Level_drawEndPoint;
		}

	function Ex_Level_drawEndPoint(prmleft)
		{
		var housepos=prmleft+429;
		var leftside=prmleft+60;
		var obj="<div id=\"EndPowinsint\" style=\""+"position:absolute;left:"+prmleft+";z-index:50;\" class=\"EndPoint\"></div><div id=\"EndPoint\" style=\""+"position:absolute;left:"+leftside+";\" class=\"EndPoint\"></div><div id=\"tuxHouse\" style=\""+"position:absolute;left:"+housepos+";\" class=\"tuxHouse\"></div>";
		return obj;
		}

///// class Coins
	function Coin() 
		{ 
		this.drawCoin=Ex_Level_drawCoin;
		}
	function Ex_Level_drawCoin(prmgroupid,prmtop,prmleft,prmtotal_coin_count,prmcoin_perlin,prmDirection)
		{
		var no_of_Lines=prmtotal_coin_count/prmcoin_perlin;

		prmwidth=32*prmcoin_perlin;
		prmheight=32*no_of_Lines;
		
		var coinGrp="<div id=\""+prmgroupid+"\" style=\""+"position:absolute;width:"+prmwidth+"; left:"+prmleft+";top:"+prmtop+";height:"+prmheight+";\" class=\""+prmDirection+" \"></div>";
		$(coinGrp).appendTo('#enimiesContainer');
		
		var xx=1;
		for (a=1;a<=prmtotal_coin_count;a++)
		{
		var coin="<img id=\""+prmgroupid+"_coin"+a+"\" src='images/imgs/coin1.png' class='Coin flammable'>";
		$(coin).appendTo('#'+prmgroupid);
		}

		setInterval(function() {
		if(xx>4) xx=1;
		for (a=1;a<=prmtotal_coin_count;a++)
		{
		$("#"+prmgroupid+"_coin"+a).attr('src','images/imgs/coin'+xx+'.png');
		}
		xx++;
		}, 100);


		return coinGrp;
		}

//// Enenmy
/// after Quit Game
function afterQuit(){
var color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';

var x = Math.floor(Math.random()*($(window).width()-50));
var y = Math.floor(Math.random()*$(window).height());
var text = '';
if(window.location.hash) {
  text = (window.location.hash).substring(1);
} else {
keywords =["ITI","Open Source","Intake32","Super Tux","Ashraf Gamal","El-Sayed Fathy","Mohammed Megahed","Rana Mobasher","Rasha Hassan"]
var text = keywords[Math.floor(Math.random()*keywords.length)]

}

drawingpix = $('<span>').html("<b style=\"width:200px;font-family: Cambria, 'Hoefler Text', Utopia, 'Liberation Serif', 'Nimbus Roman No9 L Regular', Times, 'Times New Roman', serif;\">"+text+"</b>").attr({class: 'drawingpix'}).hide();

var dispArea="<div id='displayArea' class='displayAre' ></div>"
 $(document.body).append(dispArea);

 $("#displayArea").append(drawingpix);
	 drawingpix.css({
			'color':color,
			top: y,	
			left: x 
			}).show().animate({
			                    fontSize:'26px',
						opacity: 0.0,
						top: y-200,		
						   
					   }, 833 * 5).fadeOut(833 * 10);
 $("#displayArea").remove(drawingpix);
			window.setTimeout('afterQuit()',833);
							
}


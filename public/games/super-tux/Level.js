	function Level() 
		{ 
		enimiesCol = [];
		for (i=0;i<=10;i++)
		{
		enimy = new Object();
		enimy.icon="shared/"+i+".png";
		enimiesCol.push(enimy);
		}
		
		var timer=0;
		this.setTimer=Ex_Level_setTimer;
		this.getTimer=Ex_Level_getTimer;
		
		var endPoint=0;
		var checkPoint=0;
		
		this.setCheckPoint=Ex_Level_setCheckPoint;
		this.getCheckPoint=Ex_Level_getCheckPoint;
		
		this.setScore=Ex_Level_setScore;
		this.getScore=Ex_Level_getScore;
		
		this.setTimer=Ex_Level_setTimer;
		this.getTimer=Ex_Level_getTimer;
		this.draw=Ex_Level_draw;
		}
 	function Ex_Level_setTimer(prmTimer)
		{
		this.timer=prmTimer;
		}
	function Ex_Level_getTimer()
		{
		return this.timer;
		}

 	function Ex_Level_setCheckPoint(prmcheckPoint)
		{
		this.checkPoint=prmcheckPoint;
		}
	function Ex_Level_getCheckPoint()
		{
		return this.checkPoint;
		}

	function Ex_Level_setScore(prmScore)
		{
		this.score=prmScore;
		}
	function Ex_Level_getScore()
		{
		return this.score;
		}

	function Ex_Level_setTimer(prmTimer)
		{
		this.timer=prmTimer;
		}
	function Ex_Level_getTimer()
		{
		return this.timer;
		}

	function Ex_Level_draw()
		{
$(document).ready(function () {

var levelProgress=50;

current=0;
xpre=0;
//draw Level Container
 $('<div id="levelContainer" class="levelContainer"></div>').appendTo('body');

var scrWidth=$(window).width();
var conWidth=$("#levelContainer").width();
$("#levelContainer").css({'left' : scrWidth/2-conWidth/2});
var scrHeight=$(window).height();
var conHeight=$("#levelContainer").height();
$("#levelContainer").css({'top' : scrHeight/2-conHeight/2});

$('#levelContainer').css({'backgroundPosition' : '50px 0'});
//$('#levelContainer').stop().animate({backgroundPosition:"2px 0"});

var scoreDisplay="<div style='position:absolute;width:150;height:40;top:20;left:20;z-index:3' id='ScoreDiplay'><font size='+2' color='black'>Score:<font color='darkblue'>0</font></font></div>";

$(scoreDisplay).appendTo('#levelContainer');

//draw enimies Container
 $('<div id="enimiesContainer" class="enimiesContainer"></div>').appendTo('div.levelContainer');

//draw tuxStage Container
 $('<div id="tuxStage" class="tuxStage"></div>').appendTo('div.levelContainer');

//$("#levelContainer").snowfall('clear');
//$("#tuxStage").snowfall({collection : '.collectonme', flakeCount : 250});

$("#tuxStage").snowfall();
$("#tuxStage").snowfall('clear');
$("#tuxStage").snowfall({round : true, minSize: 5, maxSize:8})

//draw planets///
var blnt=new Planet();
var rand_no =Math.floor(Math.random()* 100);
var rand =Math.floor(Math.random()* 100);
for(i=0;i<=100;i++)
{
rand_no = rand_no*rand ;
 $(blnt.drawPlanet(rand_no)).appendTo('div.enimiesContainer');
}
 /*$(blnt.drawPlanet(600)).appendTo('div.enimiesContainer');
 $(blnt.drawPlanet(1000)).appendTo('div.enimiesContainer');
*/
//draw cloud///
var cld=new Cloud();
 $(cld.drawCloud(0,100)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(50,200)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(20,300)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(0,600)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(50,1000)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(20,1800)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(0,1900)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(50,2100)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(20,2500)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(0,2650)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(50,2900)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(20,3100)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(14,3200)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(20,3500)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,3650)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,3800)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(11,4150)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,4350)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(50,4500)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(34,4620)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(12,4800)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,5050)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(35,5250)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(9,5300)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(28,5450)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(17,5500)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(3,5800)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(15,6150)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(52,6200)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(23,6320)).appendTo('div.enimiesContainer');
  $(cld.drawCloud(32,7000)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(12,7150)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(8,7320)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(4,7500)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,8240)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(22,8480)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(43,8620)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(33,8750)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(0,9000)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(30,9200)).appendTo('div.enimiesContainer');
 $(cld.drawCloud(42,9380)).appendTo('div.enimiesContainer');


//draw Barriers///
var bar=new Barrier();
 $(bar.drawBarrier("bar1",96,96,455,700,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar2",96,96,455,2400,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar3",128,150,400,2900,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar4",96,80,476,3586,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar5",128,180,380,3682,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar6",96,150,420,5700,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar7",96,80,490,6000,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar8",96,100,450,8000,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar9",32,170,390,8305,"Barrier")).appendTo('div.enimiesContainer');
 $(bar.drawBarrier("bar10",32,170,390,9010,"Barrier")).appendTo('div.enimiesContainer');

//draw floors///
var mflor=new Floor();
 $(mflor.drawFloor("flr1",800,0)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr2",500,1000)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr3",2000,2200)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr4",800,4400)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr5",800,5400)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr6",800,5400)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr7",800,7550)).appendTo('div.enimiesContainer');
 $(mflor.drawFloor("flr8",1500,9000)).appendTo('div.enimiesContainer');

//draw fail Areas///

var failp= new FailArea();
$(failp.drawFailArea("failp1",198,800,1)).appendTo('div.enimiesContainer');
$(failp.drawFailArea("failp2",698,1500,2)).appendTo('div.enimiesContainer');
$(failp.drawFailArea("failp3",198,4200,3)).appendTo('div.enimiesContainer');
$(failp.drawFailArea("failp4",198,5200,4)).appendTo('div.enimiesContainer');
$(failp.drawFailArea("failp5",1348,6200,4)).appendTo('div.enimiesContainer');


//draw stairs//
var stair=new Stair();
 $(stair.drawStair("stair1",192,32,300,860,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,450,1500,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",288,32,300,1800,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,400,5200,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,400,6300,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,300,6600,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,300,6900,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",192,32,400,7200,"Barrier")).appendTo('div.enimiesContainer');
 $(stair.drawStair("stair1",864,32,360,8242,"Barrier")).appendTo('div.enimiesContainer');

//draw Coins
var con=new Coin();
con.drawCoin("coin1",250,340,13,6,"CenterCoin");
con.drawCoin("coin2",150,1100,5,5,"RightCoin");
con.drawCoin("coin3",150,1700,7,5,"RightCoin");
con.drawCoin("coin4",200,3170,17,6,"LeftCoin");
con.drawCoin("coin5",380,4250,4,4,"LeftCoin");
con.drawCoin("coin6",200,5460,11,4,"CenterCoin");
con.drawCoin("coin7",200,6060,14,5,"LeftCoin");
con.drawCoin("coin8",430,6550,9,4,"CenterCoin");
con.drawCoin("coin9",150,6825,1,1,"CenterCoin");
con.drawCoin("coin10",250,7555,5,1,"CenterCoin");
con.drawCoin("coin11",320,9405,1,2,"CenterCoin");
con.drawCoin("coin12",320,9460,2,3,"CenterCoin");
con.drawCoin("coin13",480,9831,1,1,"CenterCoin");


//draw Tux///
var tuxchar= new TuxChar("imgtux");
tuxchar.animateTux("Right");

//draw life Pointer
var lifepointer= new LifePointer();
 $(lifepointer.drawLifePointer("LifePointer",700,4)).appendTo('div.levelContainer');

//draw End Point///
var endp= new EndPoint();
$(endp.drawEndPoint(9800)).appendTo('div.enimiesContainer');



$(window).resize(function() {
var scrWidth=$(window).width();
var conWidth=$("#levelContainer").width();
$("#levelContainer").css({'left' : scrWidth/2-conWidth/2});
var scrHeight=$(window).height();
var conHeight=$("#levelContainer").height();
$("#levelContainer").css({'top' : scrHeight/2-conHeight/2});
});
function enemyCollision(){
	var collisions2 = $("#imgtux").collision( "#enemy", { relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(collisions.length>0)
	{
		for( var i=0; i<collisions.length; i++ )
				{
				  var o = $(collisions[i]).data("odata");
				  var c = $(collisions[i]).data("cdata");
				  var d = $(collisions[i]).data("ddata");
				  var cwith = $(o).get(0).id;
				  var cside = d;
					if(cside!="S"){
						$("#imgtux").attr('scr','images/dead.png');
						$("#imgtux").animate({top:"+=500"},30);
						alert("Game Over");
					}
				}
	}
}
function reachEnd(){
	var collisions3 = $("#imgtux").collision( ".EndPoint", { relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(collisions3.length>0)
	{
		done=1;
	}
	else{
		done=0;
	}
	return done;
}

//setInterval('enemyCollision()',100);
var mle=0;

var bwid=0;
var bleft=0;
$(document).keydown(function(e){
done=reachEnd();
if(isTuxFailed!==true)
{
	var collisions = $("#imgtux").collision( ".Barrier", { relative: "collider", obstacleData: "odata", colliderData: "cdata", directionData: "ddata", as: "<div/>" }  );
	if(collisions.length>0)
	{
		for( var i=0; i<collisions.length; i++ )
				{
				  var o = $(collisions[i]).data("odata");
				  var c = $(collisions[i]).data("cdata");
				  var d = $(collisions[i]).data("ddata");
				  var cwith = $(o).get(0).id;
				  var cside = d;
				}


	}//alert(cwith)

	if(collisions.length<=0 && isTuxJump==false)
	{
	 $("#imgtux").css({'top' : 485});
	} 
	//Sayed check if ctrl key is pressed
	if(e.keyCode==17) {
		tuxchar.fire();
		$("body").append('<embed src="sound/shoot.wav" autostart="true" hidden="true" loop="false">');	
	}

    if (e.keyCode == 37 && cside!="W" && done==0) 
	{ 
	tuxchar.animateTux("Left");
	//Sayed set tux dir to be right
	tuxchar.dir="left";

	if ($("#imgtux").offset().left >=$("#levelContainer").position().left)
	{ 
	 $("#imgtux").stop(true).animate({left: "-=10"},5);
    	}
	else
	{
	$("#imgtux").stop()
	}
 	
	}

    else if (e.keyCode == 39 && cside!="E" && done==0) { 
	tuxchar.animateTux("Right"); 
	//Sayed set tux dir to be right
	tuxchar.dir="right";
	if ($("#imgtux").offset().left >= ($(window).width()/2)-100)
	{
	$('#levelContainer').stop().animate({backgroundPosition:"-=10px 0"},5)
	$("#enimiesContainer").stop(true).animate({left:"-=10"},5);     
	
	}
	else
	{
	 $("#imgtux").stop().animate({left:"+=10"},5);
	}	 
collisions
      
    }
    else if (e.keyCode == 32 && done==0) { 

	tuxchar.jump("imgtux");     
	$("body").append('<embed src="sound/jump.wav" autostart="true" hidden="true" loop="false">');	

    }
}
if(done==1)
{
	$("body").append('<embed src="sound/fortress.wav" autostart="true" hidden="true" loop="false">');
	$('#levelContainer').stop().animate({backgroundPosition:"-=500px 0"},3000)
	$("#enimiesContainer").stop(true).animate({left:"-=500"},3000);
	$("body").remove("#sound")
	$("body").append('<embed src="sound/fortress.wav" autostart="true" hidden="true" loop="false">');
	setTimeout("self.window.open('won.html','_self')",3000);
}
});
 
        });




//////////StopWatch /////////////////



1;
}






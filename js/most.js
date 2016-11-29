var menu=document.getElementById('menu');
var omore=document.getElementById('more');


//添加导航栏更多对应的js效果
omore.onmouseover=function(){
	menu.style.display='block';
}

omore.onmouseout=function(){
		timer=setTimeout(function(){
        menu.style.display='none';
		}, 800);
	} 

menu.onmouseover=function(){
	
		clearTimeout(timer);
        //menu.style.display='block';	
}
menu.onmouseout=function(){
		timer=setTimeout(function(){
        menu.style.display='none';
		}, 22);
}


//为所有的message添加js效果
for (var i = 1; i < 13; i++) {
			onshow('show'+i,'showmessage'+i);
		}


		function onshow(obj1,obj2){
			var shownum=document.getElementById(obj1);
			var showmessage=document.getElementById(obj2);

			shownum.onmouseover=function(){
				showmessage.style.display='block';
				// alert('message');
			}
			shownum.onmouseout=function(){
				showmessage.style.display='none';
			}
		}

		var oBox=document.getElementById("box");
		var oText=document.getElementById("text");
		var oBtn=document.getElementById("btn");
		
		function change(){
			var aSpan = oBox.getElementsByTagName('span');
			for(var i=0;i<aSpan.length;i++){
				aSpan[i].innerHTML = i+1;
			}
		}

		//留言板的功能
		oBtn.onclick=function(){
			
			oBox.innerHTML ='<p><span></span> '+oText.value+'</p>' + oBox.innerHTML;
			oText.value="";
			change();
		};
//处理登入时间
function login() {
	var t = document.documentElement.scrollTop || document.body.scrollTop;
	document.getElementById('fade').style.top=t+'px';
	document.getElementById('light').style.top=(t+300)+'px';
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
	document.body.style.overflow='hidden';
}

function closeIt(){
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
	document.body.style.overflow='scroll';
}
	

/***
   @name Fixed-To-Top
   @description 原生 JavaScript 的 fixed 效果的返回顶部，页面滚出一屏时出现
   @url https://github.com/wange1228/fixed-to-top
   @version 0.0.1
   @author 万戈
   @blog http://wange.im
***/
var FixedToTop;FixedToTop=function(){function a(){this.config={id:"",top:0,left:0},this.global={topEl:null,isIE6:!!c.ActiveXObject&&!c.XMLHttpRequest,scrollTop:0,winHeight:0}}var b,c;return c=window,b=document,a.prototype.init=function(a){this.config=a||this.config,this.bind()},a.prototype.getScrollTop=function(){return this.global.scrollTop=c.pageYOffset||b.documentElement.scrollTop||b.body.scrollTop},a.prototype.getWinHeight=function(){return this.global.winHeight=c.innerHeight||b.documentElement.offsetHeight||b.body.offsetHeight},a.prototype.bind=function(){var a;a=this,this.addHandler(c,"load",function(){a.getWinHeight()}),this.addHandler(c,"scroll",function(){var c,d;a.getScrollTop(),a.global.scrollTop>a.global.winHeight?(a.global.topEl?a.global.topEl.style.display="block":(c=b.createElement("a"),c.innerHTML="TOP",c.id=a.config.id,c.href="javascript:;",b.body.appendChild(c),a.global.topEl=b.getElementById(a.config.id)),a.setStyle()):null!=(d=a.global.topEl)&&(d.style.display="none")}),this.addHandler(c,"resize",function(){a.getWinHeight(),a.setStyle()}),this.addHandler(b,"click",function(b){var c;c=b.srcElement||b.target,c.id===a.config.id&&a.scrollToTop()})},a.prototype.addHandler=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c},a.prototype.setStyle=function(){var a,b,c,d,e;this.global.isIE6?(e=this.config.top+this.global.scrollTop+"px",b=this.config.left+"px",c="absolute"):(e=this.config.top+"px",b=this.config.left+"px",c="fixed"),d={top:e,left:b,position:c};for(a in d)this.global.topEl.style[a]=d[a]},a.prototype.scrollToTop=function(){var a,d,e;e=this,a=15,d=setInterval(function(){var a,f;return a=e.global.scrollTop-30,0>=a?(f=0,clearInterval(d)):f=a,c.pageYOffset=b.documentElement.scrollTop=b.body.scrollTop=f},a)},a}();
(function(){
/* Menu mobile */
var u=document.getElementById('ul');
document.getElementById('mn').onclick=function(){u.classList.toggle('open')};
[].forEach.call(u.querySelectorAll('a'),function(a){a.onclick=function(){u.classList.remove('open')}});

/* Fade-in conforme a rolagem */
var els=document.querySelectorAll('.fade');
if('IntersectionObserver' in window){var o=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');o.unobserve(e.target)}})},{threshold:.15});els.forEach(function(e){o.observe(e)})}
else els.forEach(function(e){e.classList.add('show')});
})();

/* Carrossel de avaliações: rolagem suave, snap, setas, pontos e autoplay */
(function(){
var tk=document.getElementById('rv');if(!tk)return;
var dts=document.getElementById('rd'),timer,pages=1;
var calm=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function step(){return tk.children[0].offsetWidth+(parseFloat(getComputedStyle(tk).columnGap)||0)}
function cur(){return Math.min(pages-1,Math.round(tk.scrollLeft/step()))}
function mark(){var c=cur();[].forEach.call(dts.children,function(d,j){d.className=j==c?'on':''})}
function to(k){tk.scrollTo({left:k*step(),behavior:calm?'auto':'smooth'})}
function next(d){var k=cur()+d;if(k>=pages)k=0;if(k<0)k=pages-1;to(k)}
function build(){
pages=Math.round((tk.scrollWidth-tk.clientWidth)/step())+1;dts.innerHTML='';
for(var k=0;k<pages;k++){(function(k){var b=document.createElement('button');b.setAttribute('aria-label','Avaliação '+(k+1));b.onclick=function(){to(k);play()};dts.appendChild(b)})(k)}
mark()}
function play(){clearInterval(timer);if(calm)return;timer=setInterval(function(){next(1)},6000)}
document.getElementById('rp').onclick=function(){next(-1);play()};
document.getElementById('rn').onclick=function(){next(1);play()};
tk.addEventListener('scroll',function(){requestAnimationFrame(mark)},{passive:true});
['mouseenter','touchstart'].forEach(function(ev){tk.addEventListener(ev,function(){clearInterval(timer)},{passive:true})});
['mouseleave','touchend'].forEach(function(ev){tk.addEventListener(ev,play,{passive:true})});
window.addEventListener('resize',build);
build();play();
})();
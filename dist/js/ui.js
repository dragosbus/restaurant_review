"use strict";var UI=function(){var l,a,n=0;function c(){a.classList.remove("show-overlay"),l.classList.remove("show-nav")}function i(){l.classList.add("show-nav"),a.classList.add("show-overlay")}return{init:function(){a=d.select(".overlay"),l=d.select(".main-nav");var e=d.select(".filter"),s=d.select(".close"),t=d.select(".menu");d.click([t],i),d.click([s,e],c)},swipeEvent:function(){var t=d.selectAll("#restaurants-list li");1<t.length?new Swipe(d.select(".front"),function(e,s){switch(s){case"left":!function(e,s){var t=s+1<e.length?s+1:0,l=d.select(".front");e[t].className="card",l.appendChild(e[t]),d.select("#restaurants-list").appendChild(e[s]);for(var a=d.selectAll("#restaurants-list li"),n=0;n<a.length;n++)a[n].className="res-".concat(n+1)}(t,n),n>=t.length-1?n=0:n++;break;case"right":n<=0?n=t.length-1:n--}}):t[n].className="only"}}}();
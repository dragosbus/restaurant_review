"use strict";var UI=function(){var t,c,l;function o(){c.classList.remove("show-overlay"),t.classList.remove("show-nav"),l.className="map"}function n(){t.classList.add("show-nav"),c.classList.add("show-overlay"),l.className="show-map"}return{init:function(){c=d.select(".overlay"),t=d.select(".main-nav"),l=d.select("#map");var e=d.select(".filter"),a=d.select(".close"),s=d.select(".menu");d.click([s],n),d.click([a,e],o)},lazyLoadImages:function(){[].forEach.call(document.querySelectorAll("img[data-src]"),function(e){e.src=e.getAttribute("data-src"),e.onload=function(){e.removeAttribute("data-src")}})}}}();
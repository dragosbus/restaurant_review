"use strict";var restaurant,map,fetchRestaurantFromURL,fillRestaurantHTML,fillRestaurantHoursHTML,fillReviewsHTML,createReviewHTML,fillBreadcrumb,getParameterByName,styling;function styling(e,t){for(var n=0;n<t.length;n++)e.style[t[n][0]]=t[n][1]}window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})},fetchRestaurantFromURL=function(n){if(self.restaurant)n(null,self.restaurant);else{var e=getParameterByName("id");e?DBHelper.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(fillRestaurantHTML(),n(null,t)):console.error(e)}):(error="No restaurant id in URL",n(error,null))}},fillRestaurantHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=document.getElementById("restaurant-img");t.className="restaurant-img",t.src=DBHelper.imageUrlForRestaurant(e),t.setAttribute("alt","".concat(e.name," Photo")),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var n in e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);var i=document.createElement("td");i.innerHTML=e[n],r.appendChild(i),t.appendChild(r)}},fillReviewsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,t=document.getElementById("reviews-container"),n=document.createElement("h4");if(n.innerHTML="Reviews",t.appendChild(n),!e){var r=document.createElement("p");return r.innerHTML="No reviews yet!",void t.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),t.appendChild(a)},createReviewHTML=function(e){var t=document.createElement("li"),n=document.createElement("p");n.innerHTML=e.name,t.appendChild(n);var r=document.createElement("p");r.innerHTML=e.date,t.appendChild(r);var a=document.createElement("p");a.innerHTML="Rating: ".concat(e.rating),t.appendChild(a);var i=document.createElement("p");return i.innerHTML=e.comments,t.appendChild(i),t},fillBreadcrumb=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)},getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]".concat(e,"(=([^&#]*)|&|#|$)")).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null},window.addEventListener("scroll",function(){var e=document.getElementById("breadcrumb"),t=document.querySelector(".inside #map-container");document.querySelector(".inside #map");100<window.scrollY?(e.style.transform="translate3d(0,-200px,0)",e.style.transition="0.6s",660<window.outerWidth&&styling(t,[["marginTop","15px"],["height","94%"]])):(styling(e,[["transform","translate3d(0,0,0)"]]),0<window.outerWidth&&window.outerWidth<411?styling(t,[["marginTop","135px"]]):411<=window.outerWidth&&window.outerWidth<660?styling(t,[["marginTop","115px"],["height","300px"]]):660<=window.outerWidth&&styling(t,[["marginTop","50px"],["height","90%"]]))});
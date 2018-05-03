"use strict";var restaurant,map,fetchRestaurantFromURL,fillRestaurantHTML,fillRestaurantHoursHTML,fillReviewsHTML,createReviewHTML,fillBreadcrumb,getParameterByName,styling;window.initMap=function(){fetchRestaurantFromURL(function(e,t){e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})},fetchRestaurantFromURL=function(n){if(self.restaurant)n(null,self.restaurant);else{var e=getParameterByName("id");e?DBHelper.fetchRestaurantById(e,function(e,t){(self.restaurant=t)?(fillRestaurantHTML(),n(null,t)):console.error(e)}):(error="No restaurant id in URL",n(error,null))}},fillRestaurantHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant;document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;var t=document.getElementById("restaurant-img");t.className="restaurant-img",t.src=DBHelper.imageUrlForRestaurant(e),t.setAttribute("alt","".concat(e.name," Photo")),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,setTimeout(UI.addReview,2e3),e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()},fillRestaurantHoursHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.operating_hours,t=document.getElementById("restaurant-hours");for(var n in e){var r=document.createElement("tr"),a=document.createElement("td");a.innerHTML=n,r.appendChild(a);var l=document.createElement("td");l.innerHTML=e[n],r.appendChild(l),t.appendChild(r)}};var addReviewContainer=function(){var e=document.createElement("div"),t=document.createElement("textarea"),n=document.createElement("button");return e.className="review-container",t.className="review-text",n.className="review-add",n.textContent="Comment",e.appendChild(t),e.appendChild(n),e};fillReviewsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant.reviews,t=document.getElementById("reviews-container"),n=document.createElement("h4");if(n.innerHTML="Reviews",t.appendChild(n),!e){var r=document.createElement("p");return r.innerHTML="No reviews yet!",void t.appendChild(r)}var a=document.getElementById("reviews-list");e.forEach(function(e){a.appendChild(createReviewHTML(e))}),t.appendChild(a),t.appendChild(addReviewContainer())},createReviewHTML=function(e){var t=document.createElement("li"),n=document.createElement("p");n.innerHTML=e.name,t.appendChild(n);var r=document.createElement("p");r.innerHTML=e.date,t.appendChild(r);var a=document.createElement("p");a.innerHTML="Rating: ".concat(e.rating),t.appendChild(a);var l=document.createElement("p");return l.innerHTML=e.comments,t.appendChild(l),t},fillBreadcrumb=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurant,t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)},getParameterByName=function(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]".concat(e,"(=([^&#]*)|&|#|$)")).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null};
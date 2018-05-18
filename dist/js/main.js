"use strict";var restaurants,neighborhoods,cuisines,map,fetchNeighborhoods,fetchCuisines,fillNeighborhoodsHTML,fillCuisinesHTML,updateRestaurants,resetRestaurants,fillRestaurantsHTML,createRestaurantHTML,addMarkersToMap,addAltToMap,markers=[],indexRes=1;document.addEventListener("DOMContentLoaded",function(e){fetchNeighborhoods(),fetchCuisines(),UI.init()}),fetchNeighborhoods=function(){DBHelper.fetchNeighborhoods(function(e,t){e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})},fillNeighborhoodsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.neighborhoods,n=document.getElementById("neighborhoods-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},fetchCuisines=function(){DBHelper.fetchCuisines(function(e,t){e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})},fillCuisinesHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.cuisines,n=document.getElementById("cuisines-select");e.forEach(function(e){var t=document.createElement("option");t.innerHTML=e,t.value=e,n.append(t)})},window.initMap=function(){self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants(),addAltToMap()},updateRestaurants=function(){var e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,r=e[n].value,s=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(r,s,function(e,t){e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())})},resetRestaurants=function(e){self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(function(e){return e.setMap(null)}),self.markers=[],self.restaurants=e,indexRes=1},fillRestaurantsHTML=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants,t=document.getElementById("restaurants-list");e.forEach(function(e){t.append(createRestaurantHTML(e))}),addMarkersToMap(),UI.lazyLoadImages()},createRestaurantHTML=function(e){var t=document.createElement("li"),n=document.createElement("img");n.classList.add("restaurant-img"),n.setAttribute("data-src",DBHelper.imageUrlForRestaurant(e)),n.setAttribute("alt","".concat(e.name," Photo")),t.append(n);var a=document.createElement("h3");a.innerHTML=e.name,t.append(a);t.innerHTML+='<div class="favorite"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="#fff" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.834 9.686l-4.166.575 3.032 2.914-.74 4.139 3.708-1.982 3.708 1.983-.74-4.139 3.032-2.915-4.166-.575-1.834-3.784-1.834 3.784z"/></svg></div>';var r=document.createElement("p");r.innerHTML=e.neighborhood,t.append(r);var s=document.createElement("p");s.innerHTML=e.address,t.append(s);var o=document.createElement("a");return o.innerHTML="View Details",o.href=DBHelper.urlForRestaurant(e),t.append(o),indexRes++,t},addMarkersToMap=function(){(0<arguments.length&&void 0!==arguments[0]?arguments[0]:self.restaurants).forEach(function(e){var t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",function(){window.location.href=t.url}),self.markers.push(t)})},addAltToMap=function(){for(var e=document.getElementById("map").querySelectorAll("img"),t=0;t<e.length;t++)e[t].setAttribute("alt","Map Image")};
"use strict";var UI=function(){var a,c=document.getElementById("reviews-list");return{addReview:function(e){e.preventDefault();var n,t=d.select(".review-name"),r=d.select(".review-rating"),o=d.select(".review-comment"),i=window.location.href,c={idRestaurant:a=Number.isNaN(+i.slice(-2))?i.slice(-1):i.slice(-2),name:t.value,rating:r.value,comment:o.value};return n=c,fetch("http://localhost:1337/reviews/",{method:"POST",body:JSON.stringify(n),headers:{"content-type":"application/json"}}).then(function(e){return e.json()}).then(function(){return console.log(n)}),fetch("http://localhost:1337/reviews/").then(function(e){return e.json()}).then(function(e){return console.log(e)}),Promise.resolve(c)},updateReviewsDB:function(e,t){e.then(function(e){var n=e.transaction("reviews","readwrite");return n.objectStore("reviews").put(t),n.complete}).then(function(){return console.log("added")})},appendReview:function(e){c.innerHTML="",e.then(function(e){return e.transaction("reviews").objectStore("reviews").getAll()}).then(function(e){return e.filter(function(e){return e.idRestaurant===a})}).then(function(e){e.map(function(e){var n,t,r,o,i;c.appendChild((n=e.name,t=e.rating,r=e.comment,o=document.createElement("li"),i="<h4>From ".concat(n,"</h4>\n        <p>Rating: ").concat(t,"</p>\n        <p>").concat(r,"</p>"),o.innerHTML=i,o))})})}}}();
/*
import Vue from 'vue';
import VueRouter from './router';
import App from './app.vue';

Vue.config.productionTip = false

new Vue({
  router: VueRouter,
  render: h => h(App)
}).$mount('#app')

*/

// Menu button
// 1. Hitta menu__toggle elementet.
// var menuButton = document.body.querySelector(".menu__toggle");

// 2. Hitta menu__content elementet.
// var menuContent = document.body.querySelector(".menu__content");

var kwitterButton = document.body.querySelector(".userContainer");

console.log(kwitterButton);// for debugging purpose

// 3. Skapa click event för menu__toggle.
// 4. Lägg till menu__content--open till menu__content._
// 5. Använd if/else för att växla classen menu__content--open.
// menuButton.addEventListener('click', function(event){
//
//   if(menuContent.getAttribute('class') == "menu__content"){
//       menuContent.setAttribute('class', "menu__content menu__content--open");
//     //  alert("Displaying the menu content");
//   }
//   else{
//       menuContent.setAttribute('class', "menu__content");
//     //  alert("Menu closed");
//   }
// });


kwitterButton.addEventListener('submit', function(event){
    event.preventDefault();

    alert("kweet button pressed");  // to see if eventListener reacted
  //  console.log('DOM-element:', document.body.querySelector('.textarea[name = tweet_content]'));

    const formContainer = document.body.querySelector('.userContainer');
    console.log(formContainer);  // for debugging purpose
    const formTextarea = formContainer.querySelector('textarea[name = "kweet_content"]');
    console.log(formTextarea);
//    var kweetContent = document.body.querySelector(".textarea[name = tweet_content]");
    console.log(formTextarea.value); // for debugging purpose


    var data =
    {
      "avatar": "avatar/avatar-loggedin.jpg",
      "username": "Johan Westling",
      "handle": "@johanwestling",
      "timestamp": "",
      "content": formTextarea.value,
      "media": {
        "type": "",
        "url": ""
      },
      "actions": {
        "replies": "",
        "rekweets": "",
        "likes": ""
      }
    };

    fetch('/api/feed/post', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(backendResponse){
      // Konvertera JSON data till ett JavaScript-objekt.
      return backendResponse.json();
    }) .then((backendData) => {
      // Agera på responsen från API:et (genomfört/problem).
      console.log('Backend API:', backendData); })
      .catch((backendResponse) => {
        // Agera på problem i själva API:et.
        console.warn('Backend API:', backendResponse);
      });

});


// Fetching JSON data
var allJsonData = new Array();
var jsonButton = document.body.querySelector(".JsonEx");
var count = 0;

function loadPage(){
  //  alert("JSON button pressed" + " (current count: " +  count  + " )");  // for debuggin purpose
  fetch('/api/feed/get' /* "/feed.json" */ /*/employees.json*/).then(function(response){
    return response.json();
  }).then(function(response){
    console.log(response);
    allJsonData = response;


    var jsonSize = allJsonData.length;  // get the JSON-data's array's size
    console.log(jsonSize);
  //  document.body.innerHTML[size];    // prepare placeholders big enough to contain all the JSON-data
                                      // in the form of array
    let allMarkup = '';

    // go through the JSON-data and allocate each piece of data
    for(var i = 0; i < jsonSize; i++){

        const markup = `
        <div class="allJsonData">

          <article>
             <div class = "container">
               <div class = "div1">
                 <img src= ${allJsonData[i].avatar}>
               </div>
               <div class = "div2">
                 <p>${allJsonData[i].username}</p>
                 <p>${allJsonData[i].handle}</p>
               </div>
             </div>
             <p>${allJsonData[i].content}</p>

             <p>Replies:   ${allJsonData[i].actions.replies}  Rekeweets:   ${allJsonData[i].actions.rekweets}
              Likes:   ${allJsonData[i].actions.likes}</p>
          </article>

        </div>
        `;

        // display the feched data in HTML
         allMarkup += markup;
    }
    document.body.querySelector("section").innerHTML = allMarkup;
  });
}

jsonButton.addEventListener('click', function(event){
  alert("Loaded by Event Listener");
  loadPage();
});

function loadJSON(){
    alert("Page is loaded");
    loadPage();
}

loadJSON();

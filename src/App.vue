<template>
  <div >  
    <!-- VueRouter-component som renderas till <a href="..."> -->
  <!--  <router-link to="/">Home</router-link> &nbsp;
    <router-link to="/about">About</router-link>  -->
    
    <br><br>

    <main role = "main">
      <div class = "flex-topbar">
        <div><h2> Kwitter </h2></div>

        <div class="kwitter">
          <ul class="menu" ontouchstart="">
            <li class="category" >MENY</li>
            <li class="category1">HEM</li>
            <a href = "https://dotinstall.com" target = "_blank">
              <li class="category2">Lär mer</li>
            </a>
          </ul>
        </div>
      </div>
      <br>

      <p>Vad händer?</p>
      <div class = "userContainer">
        <form >
          <div class = "user-avatar">  
            <img v-bind:src="`${userJSON.avatar}`">   
          </div>
        <p><span class="kweet-prompt">What's on your mind?</span></p>  
        <textarea rows = "10" cols = "80" v-model="kweetInput">  </textarea>  
        <p><span class="kweet-prompt">Video URL</span></p>  
        <textarea rows = "1" cols = "80" v-model="userJSON.media.url">  </textarea>   
          <p><button class = "kwitterBtn" type = "submit" @click.prevent="newKweet()">Kwitter</button></p>    
        </form>
      </div>
    </main>
    
      <button class = "JsonEx" @click="loadPage()" v-if="!pageLoaded">Show previous kweets</button>  
      <button @click="hideKweets()" v-else>Hide previous kweets</button>

    <br><br>

    <div v-if="pageLoaded">   
      <show-previous-kweets v-bind:allJsonData="allJsonData" v-bind:userId="userJSON.userId" @updated="loadPage"></show-previous-kweets>
    <!--  <v-pagination v-model="currentPage" :page-count="allJsonData.length" ></v-pagination>  -->
    </div>
  <!--  <router-view></router-view>     -->

  </div>
</template>

<script>
import ShowPreviousKweets from './components/ShowPreviousKweets';
//import vPagination from '../node_modules/vue-plain-pagination';
//import Pagination from './Pagination.vue';

export default {
  components: {
    'show-previous-kweets': ShowPreviousKweets,
  //  'v-pagination': vPagination
  //  'pagination': Pagination
  },
  data(){
    return {
      currentPage: 1,
      allJsonData: [],
      pageLoaded: false,
      kweetInput: '',
      userJSON: {
        userId: 7,
        avatar: 'avatar/king.jpg',
        username: 'S級7位',
        handle: '@登場するだけで面白い人',
        timestamp: '',
        kweetId: 13,
        content: this.kweetInput,
        media: {
          type: 'youtube',
          url: ''
        },
        actions: {
          replies: 0,
          rekweets: 0,
          likes: 0
        },
        reactionType: ''
      }
    }
  },
  created() {
    this.loadPage();
  },
  methods: {
    loadPage(){
      var self = this;     
      fetch('/feed.json').then(function(response){     //    "/feed.json"      //   http://localhost:3000/api/feed/get
        return response.json();
      }).then(function(response){

        var tempArray = [];
        for(var i = 0; i < response.length; i++){
          tempArray.push(response[i]);
        }  

        var reversedArray = [];
        for(var i = response.length; i > 0; i--){
          reversedArray.push(tempArray[i-1]);
        }

        self.allJsonData = reversedArray;
        self.setAllJsonData(self.allJsonData);
      });
      self.pageLoaded = true; 
    },  
    setAllJsonData(json){
      this.allJsonData = json;
    },
    hideKweets(){
      this.pageLoaded = false;
    },
    newKweet(){
      var self = this; 
      var data = self.userJSON;
      data.content = self.kweetInput;

      fetch('http://localhost:3000/api/feed/post', {
        method: 'POST',
        body: JSON.stringify(data),     
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(backendResponse){
        // Konvertera JSON data till ett JavaScript-objekt.
        return backendResponse.json();
      }).then((backendData) => {
        // Agera på responsen från API:et (genomfört/problem).
        //  console.log('Backend API:', backendData); 
      }).catch((backendResponse) => {
        // Agera på problem i själva API:et.
        console.warn('Backend API:', backendResponse);
      });

      self.kweetInput = '';
      this.loadPage();
      this.userJSON.kweetId++;
    }
  }
}

</script>

<style>
.kweet-prompt {
  background-color: lightblue;
  margin-left: 3px;
}
</style>

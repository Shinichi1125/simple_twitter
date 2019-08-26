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
      
      <div class="filter">
        <div><textarea rows = "1" cols = "40" v-model="searchString" placeholder="search by keyword">  </textarea> </div>
        <div><button @click="filterKweets()">Search</button></div>
        <p v-if="searchFound && filteredJson.length == 1"> {{ filteredJson.length }} kweet found for "{{ searchString }}".</p>
        <p v-else-if="searchFound && filteredJson.length > 0"> {{ filteredJson.length }} kweets found for "{{ searchString }}".</p>
        <p v-if="searchFailed" style="color:red;">No match found for "{{ searchString }}"</p>
      </div>
      
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

    <div v-if="pageLoaded && !searchFound">   
      <show-previous-kweets v-bind:allJsonData="allJsonData" v-bind:userId="userJSON.userId" @updated="loadPage"></show-previous-kweets>
    </div>
  <!--  <router-view></router-view>     -->
    
    <div v-if="pageLoaded && searchFound">
      <show-filtered-kweets v-bind:filteredJson="filteredJson" v-bind:userId="userJSON.userId" @updated="filterKweets"></show-filtered-kweets>
    </div>

  </div>
</template>

<script>
import ShowPreviousKweets from './components/ShowPreviousKweets';
import ShowFilteredKweets from './components/ShowFilteredKweets';

export default {
  components: {
    'show-previous-kweets': ShowPreviousKweets,
    'show-filtered-kweets': ShowFilteredKweets
  },
  data(){
    return {
      searchString: '',
    //  filtered: false,
      searchFailed: false,
      allJsonData: [],
      filteredJson: [],
      searchFound: false,
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
  watch:{
    searchString(){
      this.searchFailed = false; 
      this.searchFound = false; 
    }
  },
  methods: {
    async loadPage(){
      console.log('loadPage got called!');
      var self = this;  
      console.log('Right before fetching JSON by loadPage...');   
      await fetch('/feed.json').then(function(response){     //    "/feed.json"      //   http://localhost:3000/api/feed/get
        return response.json();
      }).then(function(response){
        console.log('The beginning of handling the response of loadPage...');
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
        console.log('JSON data updated');
      });
      self.pageLoaded = true; 
      self.searchFound = false; 
      console.log('The end of loadPage');  
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
    },
    async filterKweets(){
      console.log('filterKweets got called!');
      var self = this;
      await self.loadPage();
      console.log('Continuing with filterKweets...');
      
      var keyword = self.searchString;
      var found = false;
      
      self.filteredJson = [];

      if(self.searchString == ''){
        console.log('getting out of filterKweets...');
        return;
      }
      
      for(var i = 0; i < self.allJsonData.length; i++){ 
        if(self.allJsonData[i].username.includes(keyword)){
          found = true;
        }
        if(self.allJsonData[i].handle.includes(keyword)){
          found = true;
        }     
        if(self.allJsonData[i].content.includes(keyword)){
          found = true;
        }

        if(found){
          self.filteredJson.push(self.allJsonData[i]);
        }
        found = false; 
      }
      if(self.filteredJson.length > 0){
        self.searchFound = true;
        self.searchFailed = false;
      } else {
        self.searchFound = false; 
        self.searchFailed = true; 
      }
      console.log('The end of filterKweets');
      console.log('The search keyword is ' + keyword);
      console.log('The filtered kweets are...');
      console.log(self.filteredJson);
    }
  }
}

</script>

<style>
.kweet-prompt {
  background-color: lightblue;
  margin-left: 3px;
}

.filter {
  text-align: right;
  width: 125%;
  margin-bottom: 10px;
}

.filter p {
  text-align: right;
}

</style>

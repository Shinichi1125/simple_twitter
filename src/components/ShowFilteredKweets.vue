<template>
  <div>
    <div v-for="JsonData in filteredJson">   
        <article>
          <div class = "container">          
            <div class = "div1">
              <img v-bind:src= "`${JsonData.avatar}`">
            </div>   

            <div class = "div2">
              <p><span>Kweet ID: {{JsonData.kweetId}}</span></p>
              <p><span>{{JsonData.username}}</span></p>
              <p><span>{{JsonData.handle}}</span></p>
            </div>
                
            <p v-if="JsonData.content != ''" class = "container-content">{{JsonData.content}}</p>
            <p v-else></p>

            <div v-if="JsonData.media && JsonData.media.type == 'video'">
                <Media
                    :kind="'video' "
                    :controls="true"
                    :src="[`${ JsonData.media.url }`]">

                </Media>
                <br> <br>
            </div>

            <div v-if="JsonData.media && JsonData.media.type == 'youtube' && JsonData.media.url != ''">  
              <youtube :video-id="getYoutubeURL(JsonData.media.url)"></youtube>    
              <br> <br>
            </div>

            <div class = "container-image" v-else-if="JsonData.media && JsonData.media.type == 'image'">
                <img v-bind:src= "`${JsonData.media.url}`"> 
            </div>
            <br> 

            <div class="actions">
              <button @click="updateAction(JsonData, 'replies')">Replies</button> &nbsp; <span class="action-span"> {{JsonData.actions.replies}} </span> &nbsp;  
              <button @click="updateAction(JsonData, 'rekweets')">Rekweets</button> &nbsp; <span class="action-span"> {{JsonData.actions.rekweets}} </span> &nbsp;
              <button @click="updateAction(JsonData, 'likes')">Likes</button> &nbsp; <span class="action-span"> {{JsonData.actions.likes}} </span>
            </div>
            
            <br> <br>
            <button v-if="userId == JsonData.userId" @click="deleteKweet(JsonData)">Delete kweet</button>
          
          </div>
        </article>  

      </div>
    
  </div>  
</template>

<script>
import Media from '../../node_modules/@dongido/vue-viaudio';
import { getIdFromURL } from '../../node_modules/vue-youtube-embed';　

export default {
    props:{
        filteredJson: Array,
        userId: Number
    },  
    components:{
        Media: Media,
    },
    data(){
      return {
        videoId: null,
        url: ''
      }  
    },
    methods:{
      updateAction(JsonData, reactionType){     
        JsonData.reactionType = reactionType;
        var data = JsonData;

        fetch('http://localhost:3000/api/feed/patch', {
          method: 'PATCH',
          body: JSON.stringify(data),     
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function(backendResponse){
          // Konvertera JSON data till ett JavaScript-objekt.
          return backendResponse.json();
        }).then((backendData) => {
          // Agera på responsen från API:et (genomfört/problem).
        //  console.log('Backend API:', backendData); 
        }).then(() => {
            this.$emit('updated');
        }).catch((backendResponse) => {
            // Agera på problem i själva API:et.
            console.warn('Backend API:', backendResponse);
        });
      },
      deleteKweet(JsonData){
        if(confirm('Are you sure that you want to delete this kweet?')){
          var data = JsonData;
          
          fetch('http://localhost:3000/api/feed/delete', {
            method: 'DELETE',
            body: JSON.stringify(data),     
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function(backendResponse){
            // Konvertera JSON data till ett JavaScript-objekt.
            return backendResponse.json();
          }).then((backendData) => {
            // Agera på responsen från API:et (genomfört/problem).
          //  console.log('Backend API:', backendData); 
          }).then(() => {
              this.$emit('updated');
          }).then(() => {
            //  this.updateVisibleKweets();
          }).catch((backendResponse) => {
              // Agera på problem i själva API:et.
              console.warn('Backend API:', backendResponse);
          });
        }
      },
      getYoutubeURL(url){
        console.log('getYoutubeURL getting called');
        this.url = url; 

        let videoId = this.$youtube.getIdFromURL(url);
        return videoId;
      }   
    }   
}
</script>

<style>
.username {
  background-color: yellow;
}

.handle {
  background-color: yellow;
}

</style>
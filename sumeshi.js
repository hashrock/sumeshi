var Posts = new Meteor.Collection('posts');

if (Meteor.isClient) {
  Template.main.rendered = function() {
    new Vue({
      el: '#vue',
      data: {
        text : ""
      },
      computed:{
        previewList : function(){
          var tmp = [];
          if(!this.posts){
            return [];
          }
          this.posts.forEach(function(item){
            tmp.push({
              title: item.title,
              text: item.text,
              _id: item._id
            });
          });
          return tmp.reverse();
        }
      },
      sync: {
        "posts" : function(){
          return Posts.find();
        }
      },
      methods: {
        addPost : function(){
          var self = this;
          Posts.insert({
            title: this.title,
            text: this.text 
          }, function(){
            self.title = "";
            self.text = "";
          });
        },
        removePost : function(id){
          Posts.remove(id);
        }
      },
      filters: {
        marked: window.marked
      }
    });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
  });
}

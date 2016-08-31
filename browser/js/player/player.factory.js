'use strict';

juke.factory('PlayerFactory', function($rootScope){
  var currentSong, playing, songlist, songIndex, progress = 0;

  var audio = document.createElement('audio');

  audio.addEventListener('timeupdate', function(){
        progress = audio.currentTime / audio.duration;
        $rootScope.$evalAsync();
      });

  // non-UI logic in here
  var PlayerFactory = {
  };

  PlayerFactory.start = function(song, songList){
    // if (song === currentSong){
    //   PlayerFactory.pause();
    // }
    if (songList){
      songlist = songList;
      songIndex = songList.indexOf(song);
    }
    if (playing && song === currentSong) {
    PlayerFactory.pause();
    } else {
      playing = true;
      currentSong = song;
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
    };
  };

  PlayerFactory.pause = function(song){
    playing = false;
    audio.pause();
  };

  PlayerFactory.resume = function(){
    playing = true;
    audio.play();
  };

  PlayerFactory.isPlaying = function(){
    if (playing) return true;
    return false;
  };

  PlayerFactory.getCurrentSong = function(){
    if (!currentSong) return null;
    return currentSong;
  };

  PlayerFactory.next = function(){
    var nextSong;
    if (songIndex === songlist.length -1){
      songIndex = 0;
    }else
    songIndex++;
    nextSong = songlist[songIndex];
    PlayerFactory.start(nextSong);
  };

  PlayerFactory.previous = function () {
    var nextSong;
    if (songIndex === 0){
      songIndex = songlist.length -1;
    }else
    songIndex--;
    nextSong = songlist[songIndex];
    PlayerFactory.start(nextSong);
  };

  PlayerFactory.getProgress = function () {
    return progress;
    // var progress = audio.currentTime / audio.duration;
    // if (isNaN(progress)) {
    //   return 0;
    // } else {
    //   return progress;
    // }
  };
  return PlayerFactory;
});

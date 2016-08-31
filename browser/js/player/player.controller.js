/* global juke */
'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', function () {
  //   $scope.next();
  //   // $scope.$apply(); // triggers $rootScope.$digest, which hits other scopes
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });
  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   // $scope.$digest(); // re-computes current template only (this scope)
  //   $scope.$evalAsync(); // likely best, schedules digest if none happening
  // });

  $scope.currentSong = PlayerFactory.getCurrentSong;

  $scope.playing = PlayerFactory.isPlaying;

  $scope.toggle = function(song, songList){
    if ($scope.currentSong() === song && !$scope.playing()){
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, songList);
    }
  };
  $scope.prev = PlayerFactory.previous;
  $scope.next = PlayerFactory.next;
  $scope.progress = PlayerFactory.getProgress;

});

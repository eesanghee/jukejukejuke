/* global juke */
'use strict';

juke.controller('AlbumCtrl', function ($scope, $http, $rootScope, $log, AlbumFactory, PlayerFactory) {
  var audio = document.createElement('audio');

  AlbumFactory.fetchById(1)
  .then(function(album){
    console.log(album);
    $scope.album = album;
  })
  .catch($log.error);

  $scope.currentSong = PlayerFactory.getCurrentSong;

  $scope.playing = PlayerFactory.isPlaying;

  $scope.toggle = function(song, songList){
    if ($scope.currentSong() === song && !$scope.playing()){
      PlayerFactory.resume();
    } else {
      PlayerFactory.start(song, songList);
    }
  };

  // // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // }

  // // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; }

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // }
  // function next () { skip(1); }
  // function prev () { skip(-1); }

});

juke.controller('AlbumsCtrl', function(AlbumFactory, $scope, $log) {
    AlbumFactory.fetchAll()
  .then(function(albums){
    $scope.albums = albums;
  })
  .catch($log.error);
});

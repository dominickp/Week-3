define(['Playlist'], function(Playlist){
  var playlist;
  describe('Playlist', function(){
    beforeEach(function(){
      var store = {};
      spyOn(sessionStorage, "getItem").and.callFake(function(key){
        return store[key] || '[]';
      });
      spyOn(sessionStorage, "setItem").and.callFake(function(key, value){
        store[key] = value + '';
      });
      spyOn(sessionStorage, "clear").and.callFake(function(){
        store = {};
      });
      sessionStorage.clear();

      playlist = new Playlist();

    });
    describe('addSong', function(){
        it('can a song to the the array object', function(){

            var title = 'My cool song';
            playlist.addSong(title);
            expect(playlist.playlist[0].title).toEqual(title);


        });

        it("should call updatePlaylist", function(){
            spyOn(playlist, "updatePlaylist");
            playlist.addSong("My cool song");
            expect(playlist.updatePlaylist).toHaveBeenCalled();
        });


    });

    describe('removeSong', function(){
        it('can remove a song from the array', function(){
            playlist.removeSong('bar');
            expect(playlist.playlist).toEqual([]);
        });
        it("should call updatePlaylist", function(){
            spyOn(playlist, "updatePlaylist");
            playlist.removeSong("My cool song");
            expect(playlist.updatePlaylist).toHaveBeenCalled();
        });
    });

      describe('sessionStorage', function() {
          it('should be empty if sessionStorage is empty', function(){
              expect(playlist.playlist).toEqual([]);
          });

          it('should not be empty if sessionStorage is not empty', function(){
              playlist.addSong('foo');
              expect(playlist.playlist).not.toEqual([]);
              expect(playlist.playlist.length).toEqual(1);
          });
      });




  });


});

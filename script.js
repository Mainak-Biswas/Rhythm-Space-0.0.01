const body = document.body; //Body
const sections = document.getElementsByClassName('section'); //Sections
const themeMode= document.getElementById('theme-mode');
const heading = document.getElementById('heading'); //Main Heading
const headingImg = document.getElementById('heading-img');

//All songs and genre content
const allSongs = document.getElementById('all-songs');
const songsCont = document.getElementById('songs-container');
const genreFilter = document.getElementById('genre-filter');
const genreName = document.getElementById('genre-name');

//Song card content
const songDet = document.getElementById('song-det');
const songImgSrc = document.getElementById('song-img-src');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const audioPlayer = document.getElementById('audio-player');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const addToPl = document.getElementById('add-to-pl');

//Playlist contents
const createPLBtn = document.getElementById('createPLBtn');
const plBtns = document.getElementsByClassName('playlist-btn');
const allPlaylists = document.getElementById('all-playlists');
const currPlCont = document.getElementById('current-playlist');

//Theme Toggle control
let theme = 'light';
//Dark color scheme
const colorD1 = '#000000';
//Light color scheme
const colorL1 = '#ffffff';


//Fetching new objects after creation
const songBtns = document.getElementsByClassName('songBtn');

//Function to toggle theme
function toggleTheme(){
    theme = (theme==='light'?'dark':'light');
    setTheme(theme);
}


//Function ton set theme
function setTheme(theme){
    if(theme === 'light'){
        //Objects color to be set based on light color scheme
            //Body Color
            body.style.background = colorL1;
            //Sections 
            for(let section of sections){
                section.classList.remove('bgDark');
            }
            
            //Changing SongBtns display between dark and light
            for(let songBtn of songBtns){
                songBtn.classList.remove('songBtn-dark');
            };

            //Changing theme mode display between dark and light
            themeMode.classList.remove('theme-mode-dark');
            themeMode.textContent = 'Light';
            //Changing Heading between dark and light
            heading.classList.remove('head-dark');
            headingImg.classList.remove('heading-img-dark');
            //Changing Genre Filter 
            genreFilter.classList.remove('genre-filter-dark');
            //Changing Song card section theme
            songDet.classList.remove('song-det-dark');
            songImgSrc.classList.remove('song-img-dark');
            //Changing prev and next and add-to-playlist button of player
            prevBtn.classList.remove('ctrlBtn-dark');
            nextBtn.classList.remove('ctrlBtn-dark');
            addToPl.classList.remove('add-to-pl-dark');
            //Changing Playlist section
            createPLBtn.classList.remove('createPLBtn-dark');
            currPlCont.classList.remove('current-playlist-dark')
            for(let plBtn of plBtns){
                plBtn.classList.remove('playlist-btn-dark');
            };

    }
    else if(theme === 'dark'){
        //Objects color to be set basedn on Dark color scheme
            //Body Color
            body.style.background = colorD1;
            //Sections Color
            for(let section of sections){
                section.classList.add('bgDark')
            }

            //Changing SongBtns display between dark and light
            for(let songBtn of songBtns){
                songBtn.classList.add('songBtn-dark');
            }

            //Changing theme mode display between dark and light
            themeMode.classList.add('theme-mode-dark');
            themeMode.textContent = 'Dark';
            //Changing Heading between dark and light
            heading.classList.add('head-dark');
            headingImg.classList.add('heading-img-dark');
            //Changing Genre Filter 
            genreFilter.classList.add('genre-filter-dark');
            //Changing Song card section theme
            songDet.classList.add('song-det-dark');
            songImgSrc.classList.add('song-img-dark');
            //Changing prev and next button of player
            prevBtn.classList.add('ctrlBtn-dark');
            nextBtn.classList.add('ctrlBtn-dark');
            addToPl.classList.add('add-to-pl-dark');
            //Changing Playlist section
            createPLBtn.classList.add('createPLBtn-dark');
            currPlCont.classList.add('current-playlist-dark')
            for(let plBtn of plBtns){
                plBtn.classList.add('playlist-btn-dark');
            };
    }
}

//Toggle Button
const themeToggleBtn = document.getElementById('theme-toggle-cb');
themeToggleBtn.addEventListener('change',toggleTheme);
//Initital theme setting
setTheme(theme);


/////////////////////////////////////////////////////////////////////////////////////////////////////////


// Showing All Songs

//Maintaining Genre
let currentGenre = 'All';
const genreSongs = new Array();
const genreSet = new Set();//The list of Genre

//Maintaining a queue
const playQueue = new Array();
let currPointer = 0;

let currentSong = songList[0];

//Maintaining playlist array
const playLists = [
    {
        "name": "My playlist",
        "accessKey": 91229,
        "songList": [
            {
                "title": "Death Bed",
                "artist": "Powfu",
                "artwork": "https://samplesongs.netlify.app/album-arts/death-bed.jpg",
                "url": "https://samplesongs.netlify.app/Death%20Bed.mp3",
                "id": "1",
                "genre": "Rock"
            },
            {
                "title": "Bad Liar",
                "artist": "Imagine Dragons",
                "artwork": "https://samplesongs.netlify.app/album-arts/bad-liar.jpg",
                "url": "https://samplesongs.netlify.app/Bad%20Liar.mp3",
                "id": "2",
                "genre": "Rock"
            },
        ]
    }
];
let currentPlaylist = playLists[0];


    //Function to show all songs.
    function showSongs(){
        //Updating the genre name
        genreName.textContent = currentGenre;
        genreSongs.length = 0;
        //Updating the song list base on genre
        songsCont.textContent = '';
        if(currentGenre === 'All'){
            songList.forEach(song =>{
                const songBtn = createSong(song);
                songsCont.appendChild(songBtn);
                genreSongs.push(song);// Pushing song to genre array for playing via queue in future
            });
        }
        else{
            songList.forEach(song =>{
                if(song.genre === currentGenre)
                {  
                    const songBtn = createSong(song);
                    songsCont.appendChild(songBtn);
                    genreSongs.push(song);// Pushing song to genre array for playing via queue in future
                }
            });
        }
        //To change the theme of the songlist when rendered
        setTheme(theme);
    }

    function createSong(song){
        const songBtn = document.createElement('button');
        songBtn.value = song.id;
        songBtn.textContent = song.title;
        songBtn.classList.add('songBtn');

        songBtn.addEventListener('click', ()=>{//Error
            playGenre(songBtn.value);
        });
        return songBtn;
    }

    
    //Render Genre songs
    function playGenre(songId){
        currentSong = songList.find(song=>{
            if(song.id === songId) return song;
        })

        //Pushes songs from genre array to playing queue
        pushInQueueFromGenre();
        
        currPointer = playQueue.findIndex(song=>{
            return currentSong === song;
        }); 

        renderCurrentSong(currentSong);
    }

    
    //Function to push into the queue
    function pushInQueueFromGenre(){
        playQueue.length = 0;
        genreSongs.forEach(song => {
            playQueue.push(song);
        });
    }


    genreFilter.onchange = function(){
        currentGenre = genreFilter.value;
        showSongs();
    }

    //////////////////////////////////////////////////////////////////////////
     //songDet songImgSrc songTitle songArtist 
    //song = {"title" "artist" "artwork" "url" "id" "genre"
    function renderCurrentSong(currentSong){
        const {title, artist, artwork, url} = currentSong;
        songImgSrc.src = artwork;
        songTitle.textContent = title;
        songArtist.textContent = artist;
        
        // append audio to audioPlayerCont 
        audioPlayer.textContent = '';
        audioPlayer.autoplay=true;
            const audioSrc = document.createElement('source');
            audioSrc.src=url;
            audioPlayer.appendChild(audioSrc);
        
        audioPlayer.load();

        //Custom audio player
        loadMusicPlayer(currentSong);
        
        //To play the next song on ending of current song
        audioPlayer.addEventListener('ended',()=>{
            playNext();
        });
    }

    

    
    //Create playlist
    createPLBtn.addEventListener('click',createPlaylist);
    function createPlaylist(){
        const createPLInput = document.getElementById('createPLInput');
        const name = (createPLInput.value).trim();
        if(name != ""){
            
            const flag = playLists.findIndex(pl => {
                return pl.name === name;
            })
            if(flag<0){
                const newPlaylist = {};
                newPlaylist.name = name; //Name

                const PLId = Math.floor(Math.random()*100000);
                newPlaylist.accessKey = PLId; //Id

                newPlaylist.songList = new Array(); //List of songs in PL

                playLists.push(newPlaylist);

                notify('success','<p>Playlist <b>"'+name+'"</b> Created!</p>');

                renderPlaylists();
                setCurrentPlaylist(newPlaylist);
            }
            else{
                notify('error','<p>Playlist <b>"'+name+'"</b> Already Exists!</p>')
            }
        }else{
            console.log('empty')
        }
        createPLInput.value = '';
    }

    //Render all the playlists
    function renderPlaylists(){
        allPlaylists.textContent='';
        playLists.forEach(playList =>{
            const plBtn = createPlaylistButton(playList);
            allPlaylists.appendChild(plBtn);
        })
        
    }

    //Create a playlist button
    function createPlaylistButton(playlist){
        const playlistBtn = document.createElement('button');
        playlistBtn.id = 'playlist-btn';
        playlistBtn.className = 'playlist-btn';
        playlistBtn.value = playlist.name;
        playlistBtn.textContent = playlist.name;
        playlistBtn.accessKey = playlist.accessKey;
        playlistBtn.addEventListener('click',()=> {
            setCurrentPlaylist(playlist)
    
        })
        return playlistBtn;
    }


    //Setting current playlist
    function setCurrentPlaylist(playlist){
        currentPlaylist = playlist;
        
        renderPlaylistSongs(currentPlaylist);
        
        //Playing song from playlist when playlist is selected
        if(currentPlaylist.songList.length > 0)
            playPlaylist(currentPlaylist.songList[0].id);     
    }

    //Render playlist song
    function renderPlaylistSongs(playlist){
        //Updating name of current playlist
        const currPLName = document.getElementById('playlist-name-cont');
        currPLName.textContent = playlist.name;

        //Updating content of playlist
        const songList = playlist.songList;
        if(songList.length == 0){
            currPlCont.textContent='No songs in Playlist';
            // currentGenre = 'All';
            // playGenre();
        }
        else{
            currPlCont.textContent='';

            songList.forEach(song =>{
                const songBtn = createPLSong(song);
                currPlCont.appendChild(songBtn);

            })
        }
        
        //To change the theme of the songlist when rendered
        setTheme(theme);
    }

    //Create playlist song button
    function createPLSong(song){
        const songBtn = document.createElement('button');
        songBtn.value = song.id;
        songBtn.textContent = song.title;
        songBtn.classList.add('songBtn');

        songBtn.addEventListener('click', ()=>{
            playPlaylist(songBtn.value);
        });

        return songBtn;
    }

    //Playing song from playlist
    function playPlaylist(songId){
        currentSong = songList.find(song=>{
            if(song.id === songId) return song;
        })

        pushInQueueFromPlaylist();
        
        currPointer = playQueue.findIndex(song=>{
            return currentSong.id === song.id;
        }); 
        
        renderCurrentSong(currentSong);
        
    }

    //To push playlist into the queue
    function pushInQueueFromPlaylist(){
        playQueue.length = 0;
        currentPlaylist.songList.forEach(song => {
            playQueue.push(song);
        })
    }

    
    //add to playlist
    addToPl.addEventListener('click',addToPlaylist);
    function addToPlaylist(){
        const index = playLists.findIndex(pl=>{
            return pl.accessKey === currentPlaylist.accessKey;
        })
        if(index>=0){
            const hasSong = playLists[index].songList.findIndex(song => {
                return song.id === currentSong.id;
            })
            if(hasSong >= 0 )
                notify('error', `<img class="notifImg" src="${currentSong.artwork}"/> 
                <p><b>${currentSong.title}</b> already exists in <b>${currentPlaylist.name}</b></p>`);
            else{
                playLists[index].songList.push(currentSong);
                notify('success',`<img class="notifImg" src="${currentSong.artwork}"/> 
                        <p><b>${currentSong.title}</b> added to <b>${currentPlaylist.name}</b></p>`);
                currentPlaylist = playLists[index];
                renderPlaylistSongs(currentPlaylist)
            }
        }
    }

    //Play next and previous songs
    function playNext(){ 
        currPointer = (++currPointer)%playQueue.length; 
        currentSong = playQueue[currPointer]; 
        renderCurrentSong(currentSong);
    }
    function playPrev(){
        currPointer = (currPointer-1<0?playQueue.length-1:--currPointer);
        currentSong = playQueue[currPointer];  
        renderCurrentSong(currentSong);

    }

    nextBtn.addEventListener('click',playNext);
    prevBtn.addEventListener('click',playPrev);


////////////////////////////////////////////////////////////////////////////////////////
// Initial Rendering

    //Initail genre filter for songs
    genreSet.add('All')
    songList.forEach(song=>{
        genreSet.add(song.genre);
    })
 
    
    //Initialization of genre filter to show all genre
    genreSet.forEach(genre => {
        const genreOpt = document.createElement('option');
        genreOpt.textContent = genre;
        genreOpt.value = genre;

        genreFilter.appendChild(genreOpt);
    });
    
    //Initial call to show all songs
    showSongs();

    //Inital push in play queue from genre
    pushInQueueFromGenre();

    //Inital render of playlists
    renderPlaylists()

    //Initial render of current playlist
    renderPlaylistSongs(currentPlaylist);

    //Initial rendering of the song
    renderCurrentSong(currentSong)




//////////////////////////////////////////////////////////////////////////////
    //Modalds to notify 
    function notify(status,message){
        const modal= document.createElement('div');
        modal.className = 'notify';

        let icon = '';
        if(status === 'success'){
            icon = `<i class='fa fa-check-circle' style="font-size:40px; color:green"></i>`;
        }
        else if(status === 'error'){
            icon = `<i class='fas fa-exclamation-circle' style="font-size:40px; color:red"></i>`;
        }

        message = `<span>${message}</span>`;

        modal.innerHTML = icon + message;

        document.body.appendChild(modal);
        setTimeout(()=> { //To remove the modal after 3sec
            modal.remove();
          }, 3000);

    }

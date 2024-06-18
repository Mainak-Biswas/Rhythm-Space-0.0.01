//Create whole custom music player using JS
 function loadMusicPlayer(currSong){ 

    //Player Interval to update data of player
    let palyInterval

    //Fetching the audio player
    const audioPlayer = document.getElementById('audio-player');
    
    //To not display the original audio controls
    audioPlayer.controls = false;

////////////////////////////////////////////////////////////////////////////////////////////////
    //Player container
    const playerCont = document.getElementById('custom-audio-player');
    playerCont.textContent='';

    //Play Pause btn
    const audCtrlBtn = document.createElement('div');
    audCtrlBtn.id ='aud-ctrl-btn';
    audCtrlBtn.className ='aud-ctrl-btn'; 
    audCtrlBtn.innerHTML= `<i class="fas fa-play" style='font-size:18px'></i>`;
    audCtrlBtn.addEventListener('click',()=>{
        if(audioPlayer.paused) audioPlayer.play();
        else audioPlayer.pause();
    });
    
    //Player state while playing a song
    audioPlayer.addEventListener('play',()=>{  
        audCtrlBtn.innerHTML= `<i class="fa fa-pause"></i>`;
        palyInterval = setInterval(audioTime,100); //Updates time and progress
    });
    //Player state when paused
    audioPlayer.addEventListener('pause', ()=>{
        audCtrlBtn.innerHTML= `<i class="fas fa-play" style='font-size:18px'></i>`;
        clearInterval(palyInterval);
    });

    audioPlayer.addEventListener('ended',()=>{
        clearInterval(palyInterval);
    })
    playerCont.appendChild(audCtrlBtn);


///////////////////////////////////////////////////////////////////////////////////////////////////////    
    //Display play time
    const playtime = document.createElement('div');
    playtime.id='play-time';
    playtime.className='play-time';

        //Display current time
        const currTime = document.createElement('span');
        currTime.id = 'curr-time';
        currTime.className = 'curr-time';
        //Display /
        
        const playtimeSlash = document.createElement('span');
        playtimeSlash.textContent = '/';

        //Display total time 
        const totalTime = document.createElement('span');
        totalTime.id ='total-time';
        totalTime.className='total-time';

        playtime.appendChild(currTime);
        playtime.appendChild(playtimeSlash);
        playtime.appendChild(totalTime);

    playerCont.appendChild(playtime);

    //Displaying total time
    let audioDuration = ''; //Total time of play will be used at many places
    audioPlayer.oncanplay = ()=>{
        audioDuration = audioPlayer.duration;
        totalTime.textContent = inMinutes(audioDuration);
        audioTime()
    }

    // Updating the time in current time
    function audioTime(){ //Displays time in UI
        currTime.textContent = inMinutes(audioPlayer.currentTime); //Updates current time
        playProgress.value=(audioPlayer.currentTime/audioDuration)*100;// Updates progressbar
    }

//////////////////////////////////////////////////////////////////////////////////////////////

    //Display progress bar
    const playProgress = document.createElement('input');
    playProgress.type = 'range';
    playProgress.id= 'play-progress';
    playProgress.className= 'play-progress';

        //Play progress changes and update
        let paused = '';
        playProgress.addEventListener('mousedown',()=>{paused = audioPlayer.paused;}) //Mouse Event
        playProgress.addEventListener('touchstart',()=>{paused = audioPlayer.paused;}) //Touch Event


        playProgress.addEventListener('input',(event) => {
            audioPlayer.pause();
            currTime.textContent = inMinutes(audioDuration*event.target.value/100);
            updateProgress();
        });

        playProgress.addEventListener('mouseup',()=>{if(!paused)audioPlayer.play();}); //Mouse Event
        playProgress.addEventListener('touchend',()=>{if(!paused)audioPlayer.play();}); //Touch Event
        
    function updateProgress(){
        const newtime = audioDuration*(playProgress.value/100);
        audioPlayer.currentTime = newtime;
        
    }
    playerCont.appendChild(playProgress);

 ////////////////////////////////////////////////////////////////////////

    //Volume controls
    const volBar = document.createElement('input');
    volBar.type = 'range';
    volBar.id = 'vol-bar';
    volBar.className = 'vol-bar';
    volBar.value = currentVol*100;

    audioPlayer.volume = currentVol;

    volBar.oninput =  (event) => {
        audioPlayer.volume = event.target.value/100;
        currentVol = audioPlayer.volume;

        mute(audioPlayer.volume);
    };

    const muteBtn = document.createElement('div');
    muteBtn.id = 'mute-btn';
    muteBtn.className = 'mute-btn';
    muteBtn.innerHTML = `<i class='fas fa-volume-up'></i>`;

    muteBtn.onclick = ()=>{
        if(audioPlayer.volume !== 0){
            audioPlayer.volume = 0;
        }
        else{
            audioPlayer.volume = currentVol;
        }
        const dispVol = audioPlayer.volume;
        mute(dispVol);
        volBar.value = dispVol*100;
        
    }

    function mute(volume){
        if(volume === 0){
            //Change to icon to mute
            muteBtn.innerHTML = `<i class='fas fa-volume-mute'></i>`;
        }
        else{
            //Change to icon to mute
            muteBtn.innerHTML = `<i class='fas fa-volume-up'></i>`;
        }
    }     
    
    const volCtrl = document.createElement('div');
    volCtrl.id="vol-ctrl";
    volCtrl.className="vol-ctrl";
        volCtrl.appendChild(volBar);
        volCtrl.appendChild(muteBtn);
    
    playerCont.appendChild(volCtrl);

 }

 ///////////////////////////////////////////////////
 //To store current volume
 let currentVol = 1;


/////////////////////////////////////////////////////////////////////////////////////////////////////
 function inMinutes(time){ //Converts time in sec to minutes
    var mind = time % (60 * 60);
    var minutes = Math.floor(mind / 60);
            
    var secd = mind % 60;
    var seconds = Math.floor(secd);
    seconds = (seconds<10?'0'+seconds:seconds);

    return minutes+':'+seconds;
}


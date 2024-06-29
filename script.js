//initilize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem')); 
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName:"song1", filePath:"songs/1.mp3", coverPath:"cover/10.jpg"},
    {songName:"song2", filePath:"songs/2.mp3", coverPath:"cover/2.jpg"},
    {songName:"song3", filePath:"songs/3.mp3", coverPath:"cover/3.jpg"},
    {songName:"song4", filePath:"songs/4.mp3", coverPath:"cover/4.jpg"},
    {songName:"song5", filePath:"songs/5.mp3", coverPath:"cover/5.jpg"},
    {songName:"song6", filePath:"songs/6.mp3", coverPath:"cover/6.jpg"},
    {songName:"song7", filePath:"songs/7.mp3", coverPath:"cover/7.jpg"},
    {songName:"song8", filePath:"songs/8.mp3", coverPath:"cover/8.jpg"},
    {songName:"song9", filePath:"songs/9.mp3", coverPath:"cover/9.jpg"},

];

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});


//handle play/pause
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

    }

    else{

        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
})

//liaten to events
audioElement.addEventListener('timeupdate', ()=>{
    
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
})

document.getElementById('previous').addEventListener('click', ()=>{

    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');

})
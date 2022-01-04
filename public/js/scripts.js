
const queueListDump = document.getElementById("queueList");
const localQueue = window.localStorage

function SongQueue(pushbox = []) {
    this.container = pushbox;


    this.add2queue = (el) => {
        return this.container.push(el);
    }

    this.removeFromQueue = () => {
        const currItem = this.container[1];
        const btnSearch = currItem.title + "~" + currItem.ep;
        document.getElementById(btnSearch).remove();
        return this.container.shift();
    }

    this.grabNext = () => {
        return this.container[0];
    }

    this.grabLength = () => {
        return this.container.length;
    }

}
const songQueue = new SongQueue()

function Song(title, ep, art, url) {
    this.artist = "Lukasz Mauro"
    this.title = title;
    this.ep = ep;
    this.art = art;
    this.url = url;

    this.add2queueList = () => {
        const item = {
            "artist": this.artist,
            "title": this.title,
            "ep": this.ep,
            "art": this.art,
            "url": this.url,
        }
        songQueue.add2queue(item)
    }

    this.addSongButton = () => {
        const item = {
            "artist": this.artist,
            "title": this.title,
            "ep": this.ep,
            "art": this.art,
            "url": this.url,
        }
        songQueue.add2queue(item)

        const qBar = document.createElement("button");
        qBar.innerText = this.title + ' ~ ' + this.ep;
        qBar.id = this.title + '~' + this.ep;
        queueListDump.appendChild(qBar);
    }



}


// track fill control
const audioPlayer = document.getElementById("player");
const discoContainer = document.getElementById("disco");
const currArtistName = document.getElementById("artistName");
const currTrackName = document.getElementById("trackName");
const currTrackTime = document.getElementById("trackTime");
const currAlbumName = document.getElementById("albumName");
const currAlbumPic = document.getElementById("albumPic");



// reset now playing
const filterPlayer = () => {
    console.log("...Filtering to next track...")
    const wiperObj = songQueue.grabNext();

    const songHome = `https://forestw70.github.io/sketches-bcc-client/assets/music/${wiperObj.url}.mp3`

    currArtistName.innerText = "";
    currTrackName.innerText = "";
    currAlbumName.innerText = "";
    currAlbumPic.src = "";
    audioPlayer.src = "";
    // 
    currArtistName.innerText = wiperObj.artist;
    currTrackName.innerText = wiperObj.title;
    currAlbumName.innerText = wiperObj.ep;
    currAlbumPic.src = wiperObj.art;
    audioPlayer.src = songHome;
    console.log("Next track loaded!")
}

// create queue item
const addToQueue = (songInfo) => {
    // create new song and add to localstorage
    const title = songInfo.querySelector(".album-track").innerText;
    const album = songInfo.dataset.epname;
    const albumPic = songInfo.dataset.albumurl;
    const songSrc = songInfo.dataset.url
    const qItem = new Song(title, album, albumPic, songSrc)

    if (songQueue.grabLength() === 0) {
        qItem.add2queueList();
    } else {
        qItem.addSongButton();
    }

}

const handleTrackSelect = (e) => {

    console.log(e)
    const currQueueTime = songQueue.grabLength();
    const target = e;

    if (currQueueTime <= 1) {
        addToQueue(target);
        console.log(localQueue.length)
        filterPlayer();
    } else {
        addToQueue(target);
    }

}

const getItem = async (id) => {
    const response = await fetch('/api/queue', {
        method: 'GET',
        body: JSON.stringify({ id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        console.log(response.ok)
    } else {
        console.log('error')
    }
}

const newQueue = (e) => {
    e.preventDefault;
    const target = e.currentTarget;
    const sid = target.dataset.song + "~" + target.dataset.ep;
    const currQueueTime = songQueue.grabLength();

    if (currQueueTime <= 1) {
        getItem(sid);
        filterPlayer();
    } else {
        getItem(sid);
    }

    console.log(sid);

}



// build album view
const mapThruAlbums = () => {
    sketches.map(album => {
        // set up container variables and classes
        const albumContainer = document.createElement("article");
        const infoContainer = document.createElement("div");
        const trackContainer = document.createElement("div");
        const albumTitle = document.createElement("h3");
        const albumArt = document.createElement("img");
        albumContainer.classList.add("disco-item");
        infoContainer.classList.add("info-container");
        trackContainer.classList.add("track-container");
        // 

        const epName = album.title;
        albumTitle.innerText = album.title;
        // for web
        const epArt = album.webLink;
        albumArt.src = epArt;

        album.trackList.map((idvTrack, idx) => {
            // set up track info
            const trackRow = document.createElement("button");
            const tTitle = document.createElement("span");
            const tTime = document.createElement("span");
            const tNum = document.createElement("span");

            trackRow.type = "button";
            trackRow.dataset.url = idvTrack.url;
            trackRow.dataset.length = idvTrack.length;
            trackRow.dataset.epname = epName;
            trackRow.dataset.albumurl = epArt;
            trackRow.addEventListener("click", handleTrackSelect);
            trackRow.classList.add("t-row");
            tTitle.classList.add("album-track");
            tTime.classList.add("track-time");
            tNum.classList.add("track-num");
            // 

            tTitle.innerText = idvTrack.track;
            tTime.innerText = idvTrack.length;
            tNum.innerText = idx + 1;

            trackRow.appendChild(tNum);
            trackRow.appendChild(tTitle);
            trackRow.appendChild(tTime);
            trackContainer.appendChild(trackRow);
        })

        // write and append all info
        infoContainer.appendChild(albumArt)
        infoContainer.appendChild(albumTitle)
        albumContainer.appendChild(infoContainer)
        albumContainer.appendChild(trackContainer)
        document.getElementById("disco").appendChild(albumContainer);

    })
}


// soft reset
const clearPlayer = () => {
    currArtistName.innerText = "";
    currTrackName.innerText = "";
    currAlbumName.innerText = "No track queued!";
    currAlbumPic.src = "https://picsum.photos/25";
    audioPlayer.src = "";
}

// buttons
const discoTracks = document.querySelectorAll(".t-row")

discoTracks.forEach(e => {
    e.addEventListener("click", newQueue, false)
});


const nowPlaying = document.getElementById("nowPlaying");
document.getElementById("playingDropdownButton").addEventListener("click", () => {
    nowPlaying.classList.toggle('menu-hide')
})
document.getElementById("qButton").addEventListener("click", () => {
    queueListDump.classList.toggle('menu-hide')
})

document.getElementById("nextTrack").addEventListener("click", () => {
    const queueLength = songQueue.grabLength();
    console.log(queueLength)

    if (queueLength > 1) {
        songQueue.removeFromQueue();
        filterPlayer();
    } else {
        clearPlayer();
    }


})

// window.onload = mapThruAlbums();



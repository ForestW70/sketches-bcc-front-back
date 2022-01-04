
const makeSongBtn = (songInfo, index) => {
    const button = `
    <button type="button" class="t-row" data-ep="${album.title}" data-song="${song.url}">
        <span class="track-num">${idx + 1}</span>
        <span class="album-track">${song.track}</span>
        <span class="track-time">${song.length}</span>
    </button>
    `
}

const getSongData = async () => {
    let epObj = {};
    await fetch('/api/queue')
        .then(res => res.json())
        .then(json => {
            epObj = json
        });
        console.log(epObj)
    
    epObj.map(album => {
        const songArr = [];
        album.trackList.map((song, idx) => {
            const songBtn = `
            <button type="button" class="t-row" data-ep="${album.title}" data-song="${song.url}">
                <span class="track-num">${idx + 1}</span>
                <span class="album-track">${song.track}</span>
                <span class="track-time">${song.length}</span>
            </button>
            `
            songArr.push(songBtn);
        })
        console.log(songArr) 
    })   
}


const mapThroughEps = () => {
    const discoContainer = document.getElementById("disco");
    const eps = getSongData();
    // eps.map(ep => {
        // const songArr = [];
        // ep.trackList.map(song, idx => {
        //     const songBtn = `
        //     <button type="button" class="t-row" data-ep="${ep.title}" data-song="${song.url}">
        //         <span class="track-num">${idx + 1}</span>
        //         <span class="album-track">${song.track}</span>
        //         <span class="track-time">${song.length}</span>
        //     </button>
        //     `
        //     songArr.push(songBtn);
        // })

    // })
    console.log(eps)
}


mapThroughEps();
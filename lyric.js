
const searchBox = document.querySelector(".search-btn");

searchBox.addEventListener("click", function(){
    let search = document.getElementById('search-box').value;

    fetch(`https://api.lyrics.ovh/suggest/${search}/`)
    .then(res => res.json())
    .then(data => {
        let lyricList = document.getElementById('titleOne');
        lyricList.innerHTML = "";

        // console.log(data);
        for (let i = 0; i < 10; i++) {
            const t  = data.data[i];
            let artist = t.artist;
            let album = t.album;

            lyricList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"> <strong> ${album.title} </strong> </h3>
                <p class="author lead"> Album by <span> ${artist.name} </span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`

            let artistName = artist.name;
            let title= album.title;

            loadLyrics(artistName, title);    
        }
})
})

const singleLyrics = document.getElementById("single-lyrics");
const lyricsContainer = document.getElementById("lyrics");
const lyricsTitle = document.querySelector("#single-lyrics h2");

function loadLyrics(artistName, title){
        const getLyric = document.getElementById('getLyric');

        getLyric.addEventListener("click", function() {
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
            .then(res => res.json())
            .then(data => {
                return data;
        })
    })
}
function getLyrics(artistName, title) {
    toggleElement(lyricList, singleLyrics);
    const lyrics = loadLyrics(artistName, title);

    lyrics.then((lyric) => {
        if (lyric.lyrics) {
            lyricsContainer.innerHTML = lyric.lyrics;
        } else {
            lyricsContainer.innerHTML = "Sorry! Lyrics not available.";
        }
        lyricsTitle.innerHTML = title + " - " + artistName;
    });
}

//change Element display state
function toggleElement(hideElement, displayElement) {
    hideElement.style.display = "none";
    displayElement.style.display = "block";
}
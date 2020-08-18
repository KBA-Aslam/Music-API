
const searchBox = document.querySelector(".search-btn");

searchBox.addEventListener("click", function(){
    let search = document.getElementById('search-box').value;

    fetch(`https://api.lyrics.ovh/suggest/${search}/`)
    .then(res => res.json())
    .then(data => {
        let lyricList = document.getElementById('titleOne');
        lyricList.innerHTML = "";
        console.log(data);
        for (let i = 0; i < 10; i++) {

            const element = data.data[i];
            const songTitle = element.title;
            const artistName = element.artist.name;


            lyricList.innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"> <strong> ${songTitle} </strong> </h3>
                <p class="author lead"> Album by <span> ${artistName} </span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="loadLyrics('${artistName}', '${songTitle}')" class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`

            
                
        }
})
})

const singleLyrics = document.getElementById("single-lyrics");
const lyricsContainer = document.getElementById("lyrics");
const lyricsTitle = document.querySelector("#single-lyrics h2");

function loadLyrics(artistName, title){
        console.log(artistName, title);
        lyricsContainer.innerHTML = "";
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${title}`)
            .then(res => res.json())
            .then(data => {
                
                if (data.lyrics) {
                    console.log(data.lyrics)
                                lyricsContainer.innerHTML += data.lyrics;
                            } else {
                                lyricsContainer.innerHTML += "Sob lyric dekhate hobe emon kono kotha nai! Amar mon chaile dekhabo na!";
                            }
                            lyricsTitle.innerHTML += title + " - " + artistName;
                        });
                    }

// function getLyrics(artistName, title) {
//     toggleElement(lyricList, singleLyrics);
//     const lyrics = loadLyrics(artistName, title);

//     lyrics.then((lyric) => {
//         if (lyric.lyrics) {
//             lyricsContainer.innerHTML = lyric.lyrics;
//         } else {
//             lyricsContainer.innerHTML = "Sob lyric dekhate hobe emon kono kotha nai!";
//         }
//         lyricsTitle.innerHTML = title + " - " + artistName;
//     });
// }

// //change Element display state
// function toggleElement(hideElement, displayElement) {
//     hideElement.style.display = "none";
//     displayElement.style.display = "block";
// }
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inWord = document.getElementById("inp-word").value;
    fetch(`${url}${inWord}`)
    .then((response) => response.json())
    .then((data) => {
        const word = data[0].word;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        const phonetic = data[0].phonetic || "";
        const meaning = data[0].meanings[0].definitions[0].definition;
        const example = data[0].meanings[0].definitions[0].example || "No example available";
        const audio = data[0].phonetics[0].audio || "";

        result.innerHTML = `
        <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()">
                <i class="fa-solid fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${partOfSpeech}</p>
            <p>/${phonetic}/</p>
        </div>
        <p class="word-meaning">${meaning}</p>
        <p class="word-example">${example}</p>
        `;

        sound.setAttribute("src", audio);
    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });
});

function playSound() {
    sound.play();
}

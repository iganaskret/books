const link = "https://spreadsheets.google.com/feeds/list/1AQBvg1C7bOtdJcQPhTgwYS0_4Pojq2fyz4X3EbZp4I8/od6/public/values?alt=json";

console.log(link);

function loadJSON (link) {
    fetch(link).then(e=>e.json()).then(data=>data.feed.entry.forEach(displayBookData));
}

const template = document.querySelector('template').content;
const main = document.querySelector('main');

function displayBookData(book) {
    const clone = template.cloneNode('true');
    clone.querySelector("h1").textContent = book.gsx$title.$t;
    clone.querySelector("h2").textContent = book.gsx$author.$t;
    clone.querySelector("h3").textContent = book.gsx$publishingyear.$t;
    clone.querySelector("#longdescription").textContent = book.gsx$longdescription.$t;
    main.appendChild(clone);
}

loadJSON(link);

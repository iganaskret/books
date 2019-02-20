 const link = "https://spreadsheets.google.com/feeds/list/1AQBvg1C7bOtdJcQPhTgwYS0_4Pojq2fyz4X3EbZp4I8/od6/public/values?alt=json";
 const bookmark = document.querySelector("#bookmark");

 function loadJSON(link) {
     fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayBooksData));
 }

 // Template constants

 const template = document.querySelector('template').content;
 const main = document.querySelector('main');

 const imgLink = "https://kea-alt-del.dk/t5/site/imgs/";
 //const section = document.querySelector('section');

 function displayBooksData(data) {
     const clone = template.cloneNode('true');
     //clone.querySelector("p").textContent = data.gsx$img.$t;
     clone.querySelector("img").src = "imgs/and.jpg";
     clone.querySelector("#title").textContent = data.gsx$title.$t;
     clone.querySelector("#author").textContent = data.gsx$author.$t;
     clone.querySelector("#year").textContent = "(" + data.gsx$publishingyear.$t + ")";
     clone.querySelector("h3").textContent = data.gsx$shortdescription.$t
     //clone.querySelector("h5").textContent = data.gsx$price.$t
     //clone.querySelector("h6").textContent = data.gsx$shortdescription.$t
     //clone.querySelector("h7").textContent = data.gsx$longdescription.$t
     //clone.querySelector("h8").textContent = data.gsx$numberofpages.$t

     //BOOKMARK TOGGLE- DOESN'T WORK, ASK A TEACHER
     clone.querySelector("#bookmark").addEventListener("click", () => clone.querySelector("#bookmark").classList.toggle("checked"));

     main.appendChild(clone);
 }


 loadJSON(link);





 // MODAL SECTIONS

 // Template constants

 const link = "https://spreadsheets.google.com/feeds/list/1AQBvg1C7bOtdJcQPhTgwYS0_4Pojq2fyz4X3EbZp4I8/od6/public/values?alt=json";
 const bookmark = document.querySelector(".bookmark");
 const template = document.querySelector('template').content;
 const main = document.querySelector('main');
 const article = document.querySelector('article');
 //const section = document.querySelector('section');

 function loadJSON(link) {
     fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayBooksData));
 }


 function displayBooksData(data) {

     console.log(data);

     const clone = template.cloneNode('true');
     const img = data.gsx$img.$t;
     clone.querySelector("img").src = "imgs/" + data.gsx$img.$t;
     clone.querySelector("#title").textContent = data.gsx$title.$t;
     clone.querySelector("#author").textContent = data.gsx$author.$t;
     clone.querySelector("#year").textContent = " (" + data.gsx$publishingyear.$t + ")";
     clone.querySelector("h3").textContent = data.gsx$shortdescription.$t
     //clone.querySelector("h5").textContent = data.gsx$price.$t
     //clone.querySelector("h6").textContent = data.gsx$shortdescription.$t
     //clone.querySelector("h7").textContent = data.gsx$longdescription.$t
     //clone.querySelector("h8").textContent = data.gsx$numberofpages.$t

     //BOOKMARK TOGGLE- DOESN'T WORK, ASK A TEACHER
     clone.querySelector(".bkm").addEventListener("click", bookmarkChecked);

     function bookmarkChecked (evt) {
         console.log(evt)
         //clone.querySelector(".bkm").classList.remove("bookmark");
         evt.target.classList.toggle("checked");
     }

     main.appendChild(clone);
 }

 loadJSON(link);



 // MODAL SECTIONS

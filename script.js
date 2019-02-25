 // Template constants

 const link = "https://spreadsheets.google.com/feeds/list/1AQBvg1C7bOtdJcQPhTgwYS0_4Pojq2fyz4X3EbZp4I8/od6/public/values?alt=json";
 const bookmark = document.querySelector("#bookmark");
 const template = document.querySelector('template').content;
 const main = document.querySelector('main');
 const article = document.querySelector('article');
 const modal = document.querySelector(".modal-background"); //MODAL
 modal.addEventListener("click", () => modal.classList.add("hide"));

 function loadJSON(link) {
     fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayBooksData));
 }

 function displayBooksData(data) {

     console.log(data);
     const clone = template.cloneNode('true');

     // ----------------- MODAL INFORMATION -----------------

     clone.querySelector("button").addEventListener("click", () => {
         var span = document.getElementsByClassName("close")[0];


         // NO NEED TO FETCH THE SAME LINK AGAIN, JUST CREATE A FUNCTION THAT WILL HANDLE THE BOOK data
         detailBooksData(data);
     })

     function detailBooksData(data) {
         modal.querySelector("img").src = "imgs/" + data.gsx$img.$t;
         modal.querySelector("#title").textContent = data.gsx$title.$t;
         modal.querySelector("#year").textContent = " (" + data.gsx$publishingyear.$t + ")";
         modal.querySelector("#author").textContent = data.gsx$author.$t;
         modal.querySelector("#long").textContent = data.gsx$longdescription.$t;
         modal.querySelector("#price").textContent = Math.ceil(data.gsx$price.$t) + " $";
         modal.querySelector("#pages").textContent = data.gsx$numberofpages.$t + " pages";
         modal.classList.remove('hide');
     }

     // ----------------- END MODAL INFORMATION -----------------

     const img = data.gsx$img.$t;
     clone.querySelector("img").src = "imgs/" + data.gsx$img.$t;
     clone.querySelector("#title").textContent = data.gsx$title.$t;
     clone.querySelector("#author").textContent = data.gsx$author.$t;
     clone.querySelector("#year").textContent = " (" + data.gsx$publishingyear.$t + ")";
     clone.querySelector("h3").textContent = data.gsx$shortdescription.$t;
     //clone.querySelector("h5").textContent = data.gsx$price.$t
     //clone.querySelector("h6").textContent = data.gsx$shortdescription.$t
     //clone.querySelector("h7").textContent = data.gsx$longdescription.$t
     //clone.querySelector("h8").textContent = data.gsx$numberofpages.$t

     // Get the modal

     //BOOKMARK TOGGLE- DOESN'T WORK, ASK A TEACHER
     clone.querySelector("#bookmark").addEventListener("click", () => clone.querySelector("#bookmark").classList.toggle("checked"));

     main.appendChild(clone);
 }

 loadJSON(link);



 // MODAL SECTIONS

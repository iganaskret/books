 // Template constants

 const link = "https://spreadsheets.google.com/feeds/list/1AQBvg1C7bOtdJcQPhTgwYS0_4Pojq2fyz4X3EbZp4I8/od6/public/values?alt=json";
 const linkCat = "https://spreadsheets.google.com/feeds/list/1g4L6l6l7nG86TEMtBzwR04zwwEwT6NB8hVTqevM989o/od6/public/values?alt=json";
 const bookmark = document.querySelector(".bookmark");
 const template = document.querySelector('template').content;
 const main = document.querySelector('main');
 const genre = document.querySelector('#genre');
 const article = document.querySelector('article');
 const modal = document.querySelector(".modal-background"); //MODAL
 const modalCat = document.querySelector(".modal-background-cat"); //MODAL GENRES
 const modalCatContent = document.querySelector(".modal-content-cat");
 const modalCatList = document.querySelector(".cat-list");
 modal.addEventListener("click", () => modal.classList.add("hide"));
 modalCat.addEventListener("click", () => modalCat.classList.add("hide"));
 genre.addEventListener("click", () => modalCat.classList.remove("hide"));

 function loadJSON(link) {
     fetch(link).then(e => e.json()).then(data => data.feed.entry.forEach(displayBooksData));
 }


 function displayBooksData(data) {
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
     clone.querySelector("h5").textContent = data.gsx$genres.$t;
     clone.querySelector(".bkm").addEventListener("click", bookmarkChecked);

     function bookmarkChecked(evt) {
         console.log(evt)
         //clone.querySelector(".bkm").classList.remove("bookmark");
         evt.target.classList.toggle("checked");
     }

     main.appendChild(clone);
 }

 // MODAL CATEGORIES //

 function loadCat(link) {
     fetch(linkCat).then(e => e.json()).then(data => data.feed.entry.forEach(createCategories));
 }

 function createCategories(category) {
     const newLi = document.createElement("li");
     const newA = document.createElement("a")
     newA.textContent = category.gsx$genres.$t;;
     newA.href = "#";
     newA.addEventListener("click", () => showCategory(category));
     modalCatList.appendChild(newLi);
     modalCatList.appendChild(newA);
 }

 function showCategory(category) {
     // if the name of the category == name of the category in the article (h5) then display it, otherwise don't //
      document.querySelectorAll("article").forEach(article =>{
                if (article.genre == category) {
                    article.style.display = "grid";
                    console.log("jest taka książka");
                } else {
                    article.style.display = "none";
                    console.log("ni mo");
                };
      })
 };

 // END OF MODAL CATEGORIES //

 loadJSON(link);
 loadCat(linkCat);

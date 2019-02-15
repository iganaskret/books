
        // More information button

        function on() {
            document.getElementById("overlay").style.display = "block";
        }

        function off() {
            document.getElementById("overlay").style.display = "none";
        }

        // Template constants

        const template = document.querySelector("template").content; //select the template

        const imgLink = "https://kea-alt-del.dk/t5/site/imgs/";

        const catLink = "https://kea-alt-del.dk/t5/api/categories";

        const productlistLink = "https://kea-alt-del.dk/t5/api/productlist";

        const productLink = "https://kea-alt-del.dk/t5/api/product?id=";

        const modal = document.getElementById("overlay");

        const main = document.querySelector("main"); // select a container element

        const nav = document.querySelector("nav");

        // MODAL SECTIONS

        fetch(catLink).then(result => result.json()).then(data => createCatSections(data));

        // Function

        function createCatSections(categories) {

            console.log(categories);
            categories.forEach(cat => {
                const newSection = document.createElement("section");
                const newHeader = document.createElement("h1");
                const newA = document.createElement("a");

                newA.textContent = cat;
                newA.href = "#";
                newA.addEventListener("click", () => showCategory(cat));
                nav.appendChild(newA);
                newSection.id = cat;

                newHeader.textContent = cat;
                newSection.appendChild(newHeader);
                main.appendChild(newSection);
            })

            fetch(productlistLink).then(e => e.json()).then(data => data.forEach(showData));
        }

        function showCategory(category) {
            console.log(category);
            document.querySelectorAll("main > section").forEach(section => {
                if (section.id == category || category == "all") {
                    section.style.display = "grid";

                } else {
                    section.style.display = "none";
                }
            })
        }


        function showData(oneObject) {

            const section = document.querySelector("#" + oneObject.category);
            let clone = template.cloneNode(true);
            clone.querySelector("h1").textContent = oneObject.name;
            clone.querySelector(".current-price").textContent = oneObject.price + " kr";
            clone.querySelector(".new-price").textContent = oneObject.price - (oneObject.price * (oneObject.discount / 100)) + " kr"; //%
            clone.querySelector("p.description").textContent = oneObject.shortdescription;
            clone.querySelector("img").src = "https://kea-alt-del.dk/t5/site/imgs/small/" + oneObject.image + "-sm.jpg";
            clone.querySelector("img.icon-veg").src = "imgs/leaf.png";
            clone.querySelector("img.icon-alco").src = "imgs/percent.png";
            clone.querySelector("img.icon-allergy").src = "imgs/rash.png";
            clone.querySelector("img.icon-allergy").src = "imgs/rash.png";
            clone.querySelector("img.icon-discount").src = "imgs/discount.png";


            // OVERLAY INFORMATION

            clone.querySelector(".button-info").addEventListener("click", function() {
                fetch("http://kea-alt-del.dk/t5/api/product?id=" + oneObject.id).then(e => e.json()).then(data => showOne(data))
            })

            function showOne(product) {
                console.log(product.longdescription)
                modal.querySelector("#overlay p").textContent = product.longdescription;
                modal.style.display = "block";
            }


            // IF STATEMENT - DISPLAY OF PRICE

            if (oneObject.discount > 0) {
                clone.querySelector(".current-price").classList.add("current-price");
                clone.querySelector(".current-price").classList.add("on-discount");
                clone.querySelector("img.icon-discount").classList.add("pulse");

            } else {
                clone.querySelector(".new-price").remove();
                clone.querySelector("img.icon-discount").classList.add("hide");
                console.log("hide");
            }


            // IF STATEMENT - DEFINING THE SOLD OUT

            if (oneObject.soldout == true) {

                const article = clone.querySelector("article");
                article.classList.add("soldout");

                const message = document.createElement("h1");
                message.textContent = "SOLD OUT";
                message.classList.add("overlay");
                article.appendChild(message);
                clone.querySelector("img.icon-discount").remove();
            }

            // IF STATEMENT - defining the display of the vegetarian, alcoholic and allergy (need improvement) icons

            if (oneObject.vegetarian == false) {
                clone.querySelector('.icon-veg').remove();
            }

            if (oneObject.alcohol == false) {
                clone.querySelector('.icon-alco').remove();
            }

            section.appendChild(clone);
        }

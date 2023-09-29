class Database {
    #DATA = [];
    #id = 0;

    get getData() {
        return this.#DATA;
    }

    getSupplierById(id) {
        for (let i = 0; i < this.#DATA.length; i++) {
            if (this.#DATA[i].id === id) {
                return this.#DATA[i];
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    getIndexById(id) {
        for (let i = 0; i < this.#DATA.length; i++) {
            if (this.#DATA[i].id === id) {
                return i;
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    /* adds a new supplier to DATA. Returns that supplier's new id. */
    add(name, tagline, category, priceRange, MoQ, product, email, telp, address) {
        this.#id++;
        this.#DATA.push({
            id: this.#id, name, tagline, category, priceRange, MoQ, product, email, telp, address 
        });
        return this.#id;
    }

    /* deletes the supplier based on id from DATA. */
    delete(id) {
        let indexToRemove = this.getIndexById(id);
        this.#DATA.splice(indexToRemove, 1);
    }
}

class Favourites {
    #FAVES = [];
    #id = 0;

    get getFavourites() {
        return this.#FAVES;
    }

    getSupplierBySupplierId(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            if (this.#FAVES[i].id === id) {
                return this.#FAVES[i];
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    getIndexBySupplierId(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            if (this.#FAVES[i].id === id) {
                return i;
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    getSupplierByFavId(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            if (this.#FAVES[i].favId === id) {
                return this.#FAVES[i];
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    getIndexByFavId(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            // console.log(this.#FAVES[i].favId);
            if (this.#FAVES[i].favId === id) {
                return i;
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    /** adds a new supplier to FAVES.
     * parameters:
     * data: Database object
     * dataId: supplier id from data to be added to FAVES
     * Returns that favourite supplier's new id.
     */ 
    add(data, dataId) {
        let supplier = data.getSupplierById(dataId);
        this.#id++;
        supplier.favId = this.#id;
        this.#FAVES.push(supplier);
        return this.#id;
    }

    /* deletes the supplier based on id from FAVES. */
    delete(favId) {
        let indexToRemove = this.getIndexByFavId(favId);
        this.#FAVES.splice(indexToRemove, 1);
    }
}


/*  -----------------------------------------------------------------------------------------------
 *  ------------------------------------------- DOM -----------------------------------------------
 *  -----------------------------------------------------------------------------------------------
 */

const cardsContainer = document.querySelector(".cards");
const contactInfoButtons = document.querySelectorAll(".card button.contacts");
const saveButtons = document.querySelectorAll(".card button.save");
const favouritesList = document.querySelector(".sidebar ul");
const database = new Database();
const favourites = new Favourites();
let submits = 0;


function addData(name, tagline, category, priceRange, MoQ, product, email, telp, address) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    // logo
    card.innerHTML += 
    `<img src="images/${category}.jpg" alt="${category} image">
    <div class="text">
        <h2 class="business-name">${name}</h2>
        <h4 class="tagline">"${tagline}"</h4>
        <p class="category">Category: <span>${category}</span></p>
        <p class="price-range">Price range: <span>${priceRange}</span></p>
        <p class="MoQ">Min order qty: <span>${MoQ}</span></p>
        <p class="product">Product: <span>${product}</span></p>
        <p class="email hidden" style = "display: none;">Email: <span>${email}</span></p>
        <p class="telp hidden" style = "display: none;">Telp: <span>${telp}</span></p>
        <p class="address hidden" style = "display: none;">Address: <span>${address}</span></p>
    </div>
    <button class="contacts">Contact Info</button>
    <button class="save">Save to Favourites</button>`;

    const id = database.add(name, tagline, category, priceRange, MoQ, product, email, telp, address);
    card.setAttribute("id", id);
    cardsContainer.appendChild(card);
    return card;
}

function addFavourites(favId) {
    // const favouritesList = document.querySelector(".sidebar ul");
    const supplier = favourites.getSupplierByFavId(favId);
    favouritesList.innerHTML += 
    `<li id="${favId}">${supplier.name}
        <div style="display: none;">
            <p>email: ${supplier.email}</p>
            <p>phone: ${supplier.telp}</p>
        <button>delete</button>
        </div>
    </li>`;
}


function contactInfoOnClick(card) {
    const contactInfo = card.querySelector("button.contacts");
    const hiddenTexts = card.querySelectorAll("p.hidden");

    contactInfo.addEventListener("click", () => {
        // console.log(contactInfo.innerHTML);
        hiddenTexts.forEach(hiddenText => {
            if (hiddenText.style.display === "none") {
                hiddenText.style.display = "";
            } else {
                hiddenText.style.display = "none";
            }
        })
    });
}


function saveToFavOnClick() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const id = Number(card.id);
        const save = card.querySelector("button.save");
        save.addEventListener("click", () => {
            // console.log(save.innerHTML);
            try {
                // id exists in favourites
                favourites.getSupplierBySupplierId(id);
            } catch (e) {
                // id doesn't exist in favourites
                const favId = favourites.add(database, id);
                addFavourites(favId);
                savedListOnClick();
                deleteListOnClick();
            }
            // console.log(favourites.getFavourites);
        })
    });
}

function savedListOnClick() {
    const list = favouritesList.querySelectorAll("li");
    list.forEach(savedSupplier => {
        savedSupplier.addEventListener("click", () => {
            // console.log("show");
            let hidden = savedSupplier.querySelector("div");
            if (hidden.style.display === "none") {
                hidden.style.display = "";
            } else {
                hidden.style.display = "none";
            }
        })
    });
}

function deleteListOnClick() {
    const list = favouritesList.querySelectorAll("li");
    list.forEach(favSupplier => {
        // console.log("delete");
        let button = favSupplier.querySelector("button");
        button.addEventListener("click", () => {
            favourites.delete(Number(favSupplier.id));
            favSupplier.remove();
        });
    });
}

function submitOnClick() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const telphone = document.getElementById("telphone").value;
        const MoQ = document.getElementById("MoQ").value;
        const category = document.getElementById("category").value;
        const priceRange = document.getElementById("priceRange").value;
        const address = document.getElementById("address").value;
        const desc = document.getElementById("desc").value;
        const tagline = document.getElementById("tagline").value;

        const card = addData(name, tagline, category, priceRange, MoQ, desc, email, telphone, address);
        contactInfoOnClick(card);
        saveToFavOnClick();
    })
}

let firstData = addData("Meet Meat", "Everything about Meat", "Pangan", "10,000-15,000", 
    1, "pangaaaaan", "meatmeet@mail.com", "0869-6969-6969", "10 Love St, Antartica");
// addData("a", "a", "a", "a", "a", "a", "a", "a", "a");
// addData("b", "b", "b", "b", "b", "b", "b", "b", "b");
// addData("c", "c", "c", "c", "c", "c", "c", "c", "c");
submitOnClick();
contactInfoOnClick(firstData);
saveToFavOnClick();
savedListOnClick();
deleteListOnClick();
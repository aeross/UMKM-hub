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
        console.log(this.#DATA);
        for (let i = 0; i < this.#DATA.length; i++) {
            if (this.#DATA[i].id === id) {
                return i;
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    /* adds a new supplier to DATA. */
    add(name, tagline, category, priceRange, MoQ, product, email, telp, address) {
        this.#id++;
        this.#DATA.push({
            id: this.#id, name, tagline, category, priceRange, MoQ, product, email, telp, address 
        });
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

    getSupplierById(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            if (this.#FAVES[i].id === id) {
                return this.#FAVES[i];
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    getIndexById(id) {
        for (let i = 0; i < this.#FAVES.length; i++) {
            if (this.#FAVES[i].id === id) {
                return i;
            }
        }
        throw new Error(`Error: id=${id} doesn't exist`);
    }

    /** adds a new supplier to FAVES.
     * parameters:
     * data: Database object
     * dataId: supplier id from data to be added to FAVES
     */ 
    add(data, dataId) {
        let supplier = data.getSupplierById(dataId);
        this.#id++;
        this.#FAVES.push(supplier);
    }

    /* deletes the supplier based on id from FAVES. */
    delete(id) {
        let indexToRemove = this.getIndexById(id);
        this.#FAVES.splice(indexToRemove, 1);
    }
}


/*  -----------------------------------------------------------------------------------------------
 *  ------------------------------------------- DOM -----------------------------------------------
 *  -----------------------------------------------------------------------------------------------
 */

const cardsContainer = document.querySelector(".cards");
const contactInfoButtons = document.querySelectorAll(".card button");
const database = new Database();
const favourites = new Favourites();

function addData(name, tagline, category, priceRange, MoQ, product, email, telp, address) {
    const card = document.createElement("div");
    card.setAttribute("class", "card");

    // logo
    card.innerHTML += 
    `<span class="fa fa-star"></span>
    <img src="images/dummy.jpg" alt="dummy image">
    <div class="text">
        <h2 class="business-name">${name}</h2>
        <h4 class="tagline">"${tagline}"</h4>
        <p class="category">Category: <span>${category}</span></p>
        <p class="price-range">Price-range: <span>${priceRange}</span></p>
        <p class="MoQ">Minimal order quantity: <span>${MoQ}</span></p>
        <p class="product">Product: <span>${product}</span></p>
        <p class="email hidden" >Email: <span>${email}</span></p>
        <p class="telp hidden" >Telp: <span>${telp}</span></p>
        <p class="address hidden" >Address: <span>${address}</span></p>
    </div>
    <button>Contact Info</button>`;

    database.add(name, tagline, category, priceRange, MoQ, product, email, telp, address);
    cardsContainer.appendChild(card);
}

function contactInfoOnClick() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const contactInfo = card.querySelector("button");
        const hiddenTexts = card.querySelectorAll("p.hidden");

        contactInfo.addEventListener("click", () => {
            hiddenTexts.forEach(hiddenText => {
                if (hiddenText.style.display === "none") {
                    hiddenText.style.display = "";
                } else {
                    hiddenText.style.display = "none";
                }
            })
        });
    });
}

addData("a", "a", "a", "a", "a", "a", "a", "a", "a");
contactInfoOnClick();
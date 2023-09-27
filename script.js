// supplier data
let DATA = [];
// supplier id
let id = 0;


class Database {
    #DATA = [];
    #id = 0;

    get getData() {
        return this.#DATA;
    }

    /** PRIVATE METHODS */

    #getSupplierById(id) {
        for (let i = 0; i < this.#DATA.length; i++) {
            if (this.#DATA[i].id === id) {
                return this.#DATA[i];
            }
        }
    }

    #getIndexById(id) {
        for (let i = 0; i < this.#DATA.length; i++) {
            if (this.#DATA[i].id === id) {
                return i;
            }
        }
    }

    /** PUBLIC METHODS */

    /* adds a new supplier to DATA. */
    add(name, address, email, telp, contactName, tagline, desc, MoQ, priceRange, category) {
        this.#id++;
        this.#DATA.push({
            id: this.#id, name, address, email, telp, contactName, tagline, desc, MoQ, priceRange, category 
        });
    }

    /* deletes the supplier based on id from DATA. */
    delete(id) {
        let indexToRemove = this.#getIndexById(id);
        this.#DATA.splice(indexToRemove, 1);
    }
}
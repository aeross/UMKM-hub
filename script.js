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
    add(name, address, email, telp, contactName, tagline, desc, MoQ, priceRange, category) {
        this.#id++;
        this.#DATA.push({
            id: this.#id, name, address, email, telp, contactName, tagline, desc, MoQ, priceRange, category 
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

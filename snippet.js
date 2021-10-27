class Snippet extends Finder {
    /**
     * @param {Array | boolean} products
     */
    constructor(products = false) {
        super(products);

        this.oChange = () => {};
    }

    elementFinder() {
        document.querySelectorAll(".productfinder-dom").forEach(element => {
            element.addEventListener("click", event => {
                let activeElement = false;

                if(element.getAttribute("pf-dom-property")){
                    if(this.hasFilter("property", element.getAttribute("pf-dom-property"))) {
                        this.removeFilter("property", element.getAttribute("pf-dom-property"));
                    } else {
                        this.setFilter("property", element.getAttribute("pf-dom-property"));
                        activeElement = true;
                    }
                }

                if(element.getAttribute("pf-dom-price")){
                    if(this.hasFilter("price", element.getAttribute("pf-dom-price"))) {
                        this.removeFilter("price", element.getAttribute("pf-dom-price"));
                    } else {
                        this.setFilter("price", element.getAttribute("pf-dom-price"));
                        activeElement = true;
                    }
                }

                if(element.getAttribute("pf-dom-discount")){
                    if(this.hasFilter("discount", element.getAttribute("pf-dom-discount"))) {
                        this.removeFilter("discount", element.getAttribute("pf-dom-discount"));
                    } else {
                        this.setFilter("discount", element.getAttribute("pf-dom-discount"));
                        activeElement = true;
                    }
                }

                this.toggleActiveClass(element, activeElement);

                this.oChange();
            });
        });
    }

    onChange(callback) {
        this.oChange = callback;
    }

    /**
     * @param {*} element
     * @param {Boolean} toggle
     */
    toggleActiveClass(element, toggle) {
        if(element.getAttribute("pf-dom-active")){
            if(toggle){
                element.classList.add(element.getAttribute("pf-dom-active"));
            } else {
                element.classList.remove(element.getAttribute("pf-dom-active"));
            }
        }
    }
}

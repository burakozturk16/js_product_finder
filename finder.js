class Finder {
    /**
     * @param {Array | boolean} products
     */
    constructor(products = false) {
        this.products = products;
        this.filters = {
            "properties": [],
            "price": [],
            "discount": []
        };
    }

    /**
     * @param {Array | boolean} products
     */
    loadProducts(products = false) {
        if (products) {
            this.products = products;
        } else {
            throw new Error("Load products first.");
        }
    }

    resetFilters() {
        this.filters = {
            "properties": [],
            "price": false,
            "discount": false
        };
    }

    get() {
        if (this.filters.properties.length === 0 && this.filters.price.length === 0 && this.filters.discount.length === 0) {
            return this.products;
        } else {
            let tmpProducts = Object.assign([], this.products);

            if (this.filters.price.length !== 0) {
                let tmpForEachProducts = [];

                tmpProducts.forEach(product => {
                    let actualPrice = product.discount ? product.discount : product.price;
                    let pass = false;

                    this.filters.price.forEach(price => {
                        if (price.includes(":")) {
                            let minMax = price.split(":");

                            if (actualPrice >= +minMax[0] && actualPrice <= +minMax[1]) {
                                pass = true;
                            }
                        } else {
                            if (actualPrice === +price) {
                                pass = true;
                            }
                        }
                    });

                    if (pass) {
                        tmpForEachProducts.push(product);
                    }
                });

                tmpProducts = tmpForEachProducts;
            }


            if (this.filters.discount.length !== 0) {
                let tmpForEachProducts = [];

                tmpProducts.forEach(product => {
                    let pass = false;

                    if (product.discount) {
                        this.filters.discount.forEach(discount => {
                            if (discount.includes("%")) {
                                if (Math.floor((product.discount / product.price) * 100) === (+discount.replace("%", ""))) {
                                    pass = true;
                                }
                            } else {
                                if ((product.price - +discount) === product.discount) {
                                    pass = true;
                                }
                            }
                        });
                    }

                    if (pass) {
                        tmpForEachProducts.push(product);
                    }
                });

                tmpProducts = tmpForEachProducts;
            }


            if (this.filters.properties.length !== 0) {
                let tmpForEachProducts = [];

                tmpProducts.forEach(product => {
                    let pass = false;

                    this.filters.properties.forEach(property => {
                        if (!pass) {
                            if (product.properties.includes(property)) {
                                pass = true;
                            }
                        }
                    });

                    if (pass) {
                        tmpForEachProducts.push(product);
                    }
                });

                tmpProducts = tmpForEachProducts;
            }

            return tmpProducts;
        }
    }

    getFilters() {
        return this.filters;
    }

    /**
     * @param {string} type
     * @param {*} value
     */
    setFilter(type, value) {
        switch (type) {
            case "property":
                if (!this.filters.properties.includes(value)) {
                    this.filters.properties.push(value);
                }
                break;
            case "price":
                if (!/^(([0-9]|:)+)$/g.test(value)) {
                    throw new Error("The format is number or numberMin:numberMax");
                }
                if (value.includes(":")) {
                    let minMax = value.split(":");
                    if (+minMax[0] > +minMax[1]) {
                        throw new Error("The format is number or numberMin:numberMax");
                    }
                }
                if (!this.filters.price.includes(value)) {
                    this.filters.price.push(value);
                }
                break;
            case "discount":
                if (!this.filters.discount.includes(value)) {
                    this.filters.discount.push(value);
                }
                break;
            default:
                throw new Error("The type must be property|price|discount");
        }
    }

    /**
     * @param {string} type
     * @param {*} value
     */
    removeFilter(type, value) {
        switch (type) {
            case "property":
                if (this.filters.properties.includes(value)) {
                    this.filters.properties.splice(this.filters.properties.indexOf(value), 1);
                }
                break;
            case "price":
                if (this.filters.price.includes(value)) {
                    this.filters.price.splice(this.filters.price.indexOf(value), 1);
                }
                break;
            case "discount":
                if (this.filters.discount.includes(value)) {
                    this.filters.discount.splice(this.filters.discount.indexOf(value), 1);
                }
                break;
        }
    }

    /**
     * @param {string} type
     * @param {*} value
     */
    hasFilter(type, value) {
        switch (type) {
            case "property":
                if (this.filters.properties.includes(value)) {
                    return true;
                }
                break;
            case "price":
                if (this.filters.price.includes(value)) {
                    return true;
                }
                break;
            case "discount":
                if (this.filters.discount.includes(value)) {
                    return true;
                }
                break;
        }

        return false;
    }
}

# Simple Product Finder Snippet for Your E-Commerce Site

**finder.js** is made to simplify the integration of a complete product finder in your e-commerce projects.

## Add to Scripts 

    <script src="finder.js"></script>

## How it works ?

init finder

```javascript
const productFinder = new Finder(products);
// OR
const productFinder = new ProductFinder();
productFinder.loadProducts(products);
```

Schema of products

```javascript
const products = [
 "name": String,
 "properties": [String],
 "price": Number,
 "discount": Number|Boolean
];
```

Also, you can add custom fields


# Finder Snippet

**snippet.js** is an extension of the **finder.js** to simplify the integration of a product finder system with already created functions

## Add to Scripts 
    <script src="finder.js"></script>
    <script src="snippet.js"></script>

## How it works ?

Initialize

```javascript
const productSnippet = new Snippet(products);
// OR
const productSnippet = new Snippet();
productSnippet.loadProducts(products);
```

### Exaples

You can find example of usage both of **finder.js** and **snippet.js** in example folder.

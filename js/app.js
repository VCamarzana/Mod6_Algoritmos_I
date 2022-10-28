// Constantes.
const REGULAR_TYPE = 21;
const LOWER_TYPE = 4;
const EXEMPT_TYPE = 0;

// Entrada.
const products = [
    {
        description: "Goma de borrar",
        price: 0.25,
        tax: LOWER_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Lápiz H2",
        price: 0.4,
        tax: LOWER_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Cinta rotular",
        price: 9.3,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Papelera plástico",
        price: 2.75,
        tax: REGULAR_TYPE,
        stock: 5,
        units: 0,
    },
    {
        description: "Escuadra",
        price: 8.4,
        tax: REGULAR_TYPE,
        stock: 3,
        units: 0,
    },
    {
        description: "Pizarra blanca",
        price: 5.95,
        tax: REGULAR_TYPE,
        stock: 2,
        units: 0,
    },
    {
        description: "Afilador",
        price: 1.2,
        tax: LOWER_TYPE,
        stock: 10,
        units: 0,
    },
    {
        description: "Libro ABC",
        price: 19,
        tax: EXEMPT_TYPE,
        stock: 2,
        units: 0,
    },
];

let container = document.getElementById("product-list");

function createDescription(item) {
    let description = document.createElement("div");
    description.setAttribute("class", "description");
    description.innerText = item.description + ": " + item.price + " €/ud.";
    container.appendChild(description);
}

function createInput(item) {
    var input = document.createElement("input");
    input.setAttribute("class", "product-unit");
    input.setAttribute("type", "number");
    input.setAttribute("min", "0");
    input.setAttribute("max", item.stock);
    input.setAttribute("value", 0);
    input.addEventListener("change", event => item.units = event.target.value);
    input.addEventListener("change", isDisabled);
    container.appendChild(input);
}

function getProductDescription(productList) {
    for (var item of productList) {
        createDescription(item);
        createInput(item);
    }
}
getProductDescription(products);

document.getElementById("total-button").disabled = true;

function isDisabled(event) {
    products.units = event.target.value; // lo dejo aquí y en el createInput(item) porque si no, no suma las unidades que corresponden.
    if (products.units <= 0) {
        document.getElementById("total-button").disabled = true;
    } else {
        document.getElementById("total-button").disabled = false;
    }
}

// subtotal = price * units (de todos los productos)

function getSubtotal() {
    let subtotal = 0;
    for (var item of products) {
        subtotal += item.price * item.units;
    }
    document.getElementById("subtotal").innerText = subtotal;
    return subtotal;
}

// taxes = subtotal * tax /100 : de todos los productos

function getTaxes() {
    let totalTaxes = 0;
    for (var item of products) {
        var taxes = item.tax / 100;
        totalTaxes += (item.price * item.units) * taxes;
    }
    document.getElementById("taxes").innerText = totalTaxes;
    return totalTaxes;
}

// total = subtotal + taxes : de todos los productos.

function getTotal() {
    total = getSubtotal() + getTaxes();
    document.getElementById("total").innerText = total;
    return total;
}

document.getElementById("total-button").addEventListener("click", getTotal);

/* 
Calcular Factura:
 - Recorrer lista de productos con un bucle y 
   hacer los siguientes cálculos para cada producto:
        - subtotal = price * units (precio unitario * unidades)
        - Dependiendo del tipo de Iva (if/else);
            taxes = subtotal * tax /100
            - taxes => const REGULAR_TYPE = 21;
                       const LOWER_TYPE = 4;
                       const EXEMPT_TYPE = 0;
Al pulsar el botón CALCULAR, nos mostrará los resultados de:
 - SUBTOTAL: subtotal de todos los productos.
 - IMPUESTOS: taxes de todos los productos.
 - TOTAL: subtotal + taxes de todos los productos.

 El botón calcular se habilitará o desabilitará si (if/else):
 - Si las unidades de todos los productos están a 0
    - if (units <= 0){
        document.getElementById("button-calculate").disabled = true; // Disabled
      } else {
        document.getElementById("button-calculate").disabled = false; // Enabled
      }
 Si las unidades de un producto son superiores a su stock, no se pueden añadir más unidades.

*/


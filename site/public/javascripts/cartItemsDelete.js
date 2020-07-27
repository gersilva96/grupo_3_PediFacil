const deleteOneItem = document.querySelectorAll(".cart-item_delete");
const deleteAllItems = document.querySelector(".cart_clear_form");

if (deleteOneItem.length != 0) {
    deleteOneItem.forEach(item => {
        item.addEventListener("submit", (e) => {
            let confirma = confirm("¿Seguro querés eliminar este producto?");
            if (!confirma) {
                e.preventDefault();
            }
        });
    });
}

if (deleteAllItems != undefined) {
    deleteAllItems.addEventListener("submit", (e) => {
        let confirma = confirm("¿Seguro que querés vaciar el carrito?");
        if (!confirma) {
            e.preventDefault();
        }
    });
}
const deleteOneItem = document.querySelectorAll(".product-actions_delete");

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
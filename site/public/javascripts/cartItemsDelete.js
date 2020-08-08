const deleteOneItem = document.querySelectorAll(".cart-item_delete");
const deleteAllItems = document.querySelector(".cart_clear_form");

if (deleteOneItem.length != 0) {
    deleteOneItem.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();
            Swal.fire({
                title: '¿En serio querés eliminar este producto?\n:(',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    item.submit();
                }
            });
        });
    });
}

if (deleteAllItems != undefined) {
    deleteAllItems.addEventListener("submit", (e) => {
        e.preventDefault();
            Swal.fire({
                title: '¿En serio querés vaciar el carrito?\n:(',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, vaciar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    deleteAllItems.submit();
                }
            });
    });
}
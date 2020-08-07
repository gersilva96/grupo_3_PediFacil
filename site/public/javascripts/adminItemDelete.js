const deleteOneItem = document.querySelectorAll(".product-actions_delete");

if (deleteOneItem.length != 0) {
    deleteOneItem.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();
            Swal.fire({
                title: '¡Atención!',
                text: "Esta acción no elimina el producto, sólo setea el stock a 0",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, anular stock',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    item.submit();
                }
            });
        });
    });
}
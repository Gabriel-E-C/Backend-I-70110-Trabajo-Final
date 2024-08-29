const socket = io();
const deleteBtn = document.getElementById("deleteBtn");
const addBtn = document.getElementById("addBtn");

socket.on("showProducts", (productsArray) => {
    renderProducts(productsArray);
})

const renderProducts = (data) => {
    const rtArray = document.getElementById("realTimeArray");
    rtArray.innerHTML = "";

    data.forEach(item => {
        const card = document.createElement("div"); 
        
        card.innerHTML = `
                        <div>
                        <h3>Producto: ${item.title}</h3>          
                        <p>ID: ${item.id}</p>
                        <p>Descripcion: ${item.description}</p>
                        <p>Codigo: ${item.code}</p>
                        <p>Precio: ${item.price}</p>
                        <p>Categoria: ${item.category}</p>
                        `
        rtArray.appendChild(card); 
        })
    }


deleteBtn.addEventListener("click", () => {
    deletingAProduct();
})

const deletingAProduct = () => {
    let id = document.getElementById("id").value;
    socket.emit("deleteProduct", id); 
}

document.getElementById("addBtn").addEventListener("click", () => {
    addingAProduct();
})

const addingAProduct = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };

    socket.emit("addProduct", producto);
}

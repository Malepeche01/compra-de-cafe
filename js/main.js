const container = document.getElementById("content");
container.classList.add("container");


const titulo = document.createElement("h2");
titulo.innerText = ("Café de Especialidad en Casa");
container.appendChild(titulo);
let carrito = []


fetch("./js/variedades.json")
    .then(response => response.json())
    .then(data => {
 
    data.forEach(variedad => {
        const card = document.createElement("card");
        card.classList.add("card");
    
        const nombreVariedad = document.createElement("h4")
        nombreVariedad.innerText =  variedad.nombre;

        const perfilDeTueste = document.createElement("p")
        perfilDeTueste.innerText = variedad.perfilDeTueste;
    
    
        const imgVariedad = document.createElement("img")
        imgVariedad.src = variedad.imagen;
    
    
        const precioVariedad = document.createElement("p")
        precioVariedad.innerText = `$ ${variedad.precio}`
        
        let botonAgregar = document.createElement("button")
        botonAgregar.innerText = "Agregar"
    
        

        botonAgregar.addEventListener("click", () => {
        carrito.push({
            id: variedad.id,
            imagen: variedad.imagen,
            precio: variedad.precio,
            })

        console.log(carrito);
        guardar()
        })
    

        card.appendChild(nombreVariedad);
        card.appendChild(perfilDeTueste);
        card.appendChild(imgVariedad);
        card.appendChild(precioVariedad);
        card.appendChild(botonAgregar);  
        container.appendChild(card);  
    })
})

verCompra.addEventListener("click", async () =>{
    contenidoCarrito.innerHTML = ""
    const tituloCarrito = document.createElement("div")
    tituloCarrito.innerHTML = `
    <h2>Carrito</h2>`

    contenidoCarrito.append(tituloCarrito);

    
    carrito.forEach((el) => {
    
        let miCarrito = document.createElement("div")
        miCarrito.innerHTML = `
        <img src="${el.imagen}">
        <h4> ${el.id}</h4>
        <p> $${el.precio}<p/>

        `
        
        contenidoCarrito.append(miCarrito);
    
        

        
    })

    const total = carrito.reduce((acc,el) => acc + el.precio, 0);
        const totalCompra = document.createElement("div");
        totalCompra.innerHTML = `Su compra: $${total}`;

        contenidoCarrito.append(totalCompra);

   
    function mail(){
        
        const { value: email } = Swal.fire({
            title: "Nos pondremos en contacto a la brevedad para hacerte el envío",
            input: "email",
            inputLabel: "Ingresá tu dirección de correo electrónico",
            inputPlaceholder: "nombre@mail.com"
          });
          if (email) {
            Swal.fire(`email ingresado: ${email}`);
          }
    }
    setTimeout(mail, 5000);
 
})

const guardar = () => {
    localStorage.setItem("miCarrito", JSON.stringify(carrito))
    }




        



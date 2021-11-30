// -----------------------MENU RESPONSIVE------------------------------

const menu_bar = document.querySelector(".menu_bars");
const menu = document.querySelector(".menu");

const ico = document.querySelector(".icomenubars");
let click = false;

menu_bar.addEventListener("click", (e) => {
  menu.classList.toggle("menu_visible");
  if (click == false) {
    click = true;

    ico.classList.replace("fa-bars", "fa-times");
    ico.style.transform = "rotate(180deg)";
    ico.style.transition = "all 1s ease";
  } else {
    click = false;

    /* -----------------------animacion icono menu responsive para cerrar la X----------- */
    setTimeout(() => {
      ico.classList.replace("fa-times", "fa-bars");
    }, 500);
    ico.style.transform = "rotate(-180deg)";
    ico.style.transition = "all 1s ease";
  }
});

menu.addEventListener("click", () => {
  menu.classList.toggle("menu_visible");
  click = false;

  /* -----------------------animacion icono menu responsive para cerrar la X----------- */
  setTimeout(() => {
    ico.classList.replace("fa-times", "fa-bars");
  }, 500);
  ico.style.transform = "rotate(-180deg)";
});

let menu_visible = false;

const input_search = document.querySelector(".input_search");

const cards_comida = document.querySelector(".cards_comida");

const cards_bebida = document.querySelector(".cards_bebida");

const cards_ensalada = document.querySelector(".cards_ensalada");

const cards_promo = document.querySelector(".cards_promo");

const titulo_hamburguesas = document.querySelector(".titulo-hamburguesas");
const titulo_bebidas = document.querySelector(".titulo-bebidas");
const titulo_ensaladas = document.querySelector(".titulo-ensaladas");
const titulo_promos = document.querySelector(".titulo-promos");
const hr_hamburguesas = document.querySelector(".hr_hamburguesas");
const hr_bebidas = document.querySelector(".hr_bebidas");
const hr_ensaladas = document.querySelector(".hr_ensaladas");
const hr_promos = document.querySelector(".hr_promos");

const cargarCards = (info_cards, donde) => {
    // console.log(info_cards);
    
    const fragmento = document.createDocumentFragment();
    for (item of info_cards) {
      const divcard = document.createElement("DIV");
      divcard.classList.add("card");
      const divCardImg = document.createElement("DIV");
      divCardImg.classList.add("divcardImg");
      const img = document.createElement("IMG");
      img.classList.add("imgcard");
      img.setAttribute("src", `./assets/${item.imgurl}`);
      img.setAttribute("alt", `${item.descripcion}`);
      const cardDescription = document.createElement("DIV");
      cardDescription.classList.add("cardDescription");
      const h2 = document.createElement("H2");
      h2.textContent = item.nombre;
      h2.classList.add("cardTitulo");
      const pdesc = document.createElement("P");
      pdesc.textContent = item.descripcion;
      pdesc.classList.add("cardTexto");
      const precio = document.createElement("P");
      precio.textContent = item.precio;
      precio.classList.add("precio");
  
      divCardImg.appendChild(img);
      cardDescription.appendChild(h2);
      cardDescription.appendChild(pdesc);
      cardDescription.appendChild(precio);
  
      divcard.appendChild(divCardImg);
      divcard.appendChild(cardDescription);
      // -------------seteo este atributo para poder hacer el search
      divcard.setAttribute("data-card", item.nombre.toLowerCase());
      fragmento.appendChild(divcard);
    }
    document.querySelector(donde).appendChild(fragmento);
  };

const peticiones = async (url, where) => {
  try {
        let peticion = await fetch(url);
        let res = await peticion.json();
                cargarCards(res,where)
        return res;
  } catch (err) {
        return document.querySelector(where).innerHTML=`<h2 style="color:white">Error al intentar leer el archivo de datos</h2>`

  }
};


const uploadFiles = async ()=>{
   await peticiones("./hamburguesas.json", ".cards_comida");
   await peticiones("./bebidas.json", ".cards_bebida");
   await peticiones("./ensaladas.json", ".cards_ensalada");
   await peticiones("./promos.json", ".cards_promo");

}


uploadFiles();




// -----------------------BUSCADOR------------------------------
input_search.addEventListener("keyup", () => {
  const cards = document.querySelectorAll(".card");
  // console.log(e.target.value).
  console.log(input_search.value);
  cards.forEach((card) => {
    // console.log(card.dataset.card)

    if (card.dataset.card.includes(input_search.value.toLowerCase())) {
      card.dataset.card.toLowerCase();

      card.classList.remove("none");
    } else {
      input_search.value.toLowerCase();
      card.classList.add("none");

      // console.log("no hay coincidencias");
    }
  });

  if (input_search.value != "") {
    titulo_hamburguesas.classList.add("none");
    titulo_bebidas.classList.add("none");
    titulo_ensaladas.classList.add("none");
    titulo_promos.classList.add("none");
    hr_hamburguesas.classList.add("none");
    hr_bebidas.classList.add("none");
    hr_ensaladas.classList.add("none");
    hr_promos.classList.add("none");
  } else {
    titulo_hamburguesas.classList.remove("none");
    titulo_bebidas.classList.remove("none");
    titulo_ensaladas.classList.remove("none");
    titulo_promos.classList.remove("none");
    hr_hamburguesas.classList.remove("none");
    hr_bebidas.classList.remove("none");
    hr_ensaladas.classList.remove("none");
    hr_promos.classList.remove("none");
  }
});

input_search.addEventListener("blur", () => {
  input_search.value = "";
  titulo_hamburguesas.classList.remove("none");
  titulo_bebidas.classList.remove("none");
  titulo_ensaladas.classList.remove("none");
  titulo_promos.classList.remove("none");
  hr_hamburguesas.classList.remove("none");
  hr_bebidas.classList.remove("none");
  hr_ensaladas.classList.remove("none");
  hr_promos.classList.remove("none");
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.remove("none");
  });
});

//---------------- ContactForm -----------------------

const form = document.querySelector(".form_contactos"),
  loader = document.querySelector(".form_contact_loader"),
  response = document.querySelector(".modal");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  loader.classList.remove("none");
  fetch("https://formsubmit.co/ajax/gabriellastfoguel@gmail.com", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((res) => {
      res.ok ? res.json() : Promise.reject(res);
      return res;
    })
    .then((json) => {
      console.log(json);
      location.hash = "#gracias";
      form.reset();
    })
    .catch((err) => {
      console.log(err);
      response.querySelector("h3").innerHTML =
        "Ocurrio un error al enviar. Intenta nuevamente" + err;
    })
    .finally(() => {
      loader.classList.add("none");

      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
});

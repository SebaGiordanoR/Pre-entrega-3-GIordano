class producto{
    id;
    nombre;
    precio;
    imagen;
    alt;

    constructor(id, nombre, precio, imagen, alt){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio,
        this.imagen = imagen
        this.alt = alt
    }
}

const catalogo =[
    new producto("Piedra", "Piedra amatista", 4300, "amatista.webp", "Imagen piedra amatista"),
    new producto("Cuarzo", "cuarzo rosa", 3200 , "cuarzoRosa.webp", "Imagen Cuarzo Rosa"),
    new producto ("Sales y sahumerios", "sahumerio", 2000, "sahumerios.webp", "imagen sahumerios" ),
    new producto("Sales y sahumerios", "Sal negra", 5000, "salNegra.webp", "Imagen de sal negra"),
    new producto("Cartas", "Tarot Rider Waite", 10000, "TarotRiderWaite.webp", "mazo de cartas tarot"),
    new producto("Velas", "vela amatista", 1500, "velaamatistal.webp", "Foto vela amatista"),
    new producto("Velas", "Vela blanca", 1200, "velablanca.webp", "Vela blanca"),
    new producto("Velas", "Vela negra", 2000, "velanegra.webp", "Vela negra")


]
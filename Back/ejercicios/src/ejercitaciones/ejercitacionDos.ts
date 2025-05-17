/**
 * Ejercicio 1: Convertir función tradicional a arrow function
 * Tradicional: function saludar(nombre) { return "Hola " + nombre + "!"; }
 * Convertida a función flecha.
 * @param nombre - Nombre a saludar.
 * @returns Saludo personalizado.
 */
const script1_Ej2 = (nombre: string = "Desconocido"): string =>
  `Hola ${nombre}!`;

/**
 * Ejercicio 2: Filtrar productos con filter
 * Dado un array de productos, filtra solo los que cuestan más de $500.
 */
const script2_Ej2 = () => {
  const productos = [
    { nombre: "Celular", precio: 900 },
    { nombre: "Auriculares", precio: 300 },
    { nombre: "Tablet", precio: 600 },
  ];

  const productosCaros = productos.filter((producto) => producto.precio > 500);
  return productosCaros;
};
/**
 * Ejercicio 3: Calcular total con reduce
 * Suma todos los precios del array anterior.
 * @returns La suma total de los precios.
 */
const script3_Ej2 = (array: { precio: number }[]): number => {
  const totalPrecios = array.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );
  return totalPrecios;
};

/**
 * Ejercicio 4: Higher Order Function personalizada
 * Crea una función ejecutarSiEsPar que recibe un número y una función callback.
 * Si el número es par, ejecuta la callback.
 * @param num - Número a evaluar.
 * @param callback - Función a ejecutar si num es par.
 */
const script4_Ej2 = (num: number, callback: () => void): void => {
  if (num % 2 === 0) {
    callback();
  }
};

/**
 * Ejercicio 5: Objetos funcionales (factory functions)
 * Crea una función crearUsuario que reciba nombre y edad, y retorne un objeto
 * con esas propiedades y un método presentarse.
 * @param nombre - Nombre del usuario.
 * @param edad - Edad del usuario.
 * @returns Objeto usuario con método presentarse.
 */

const script5_Ej2 = (nombre: string, edad: number) => {
  class Usuario {
    constructor(
      public nombre: string,
      public edad: number
    ) {}

    /**
     * Método para presentarse.
     * @returns Mensaje de presentación.
     */
    presentarse(): string {
      return `Hola, soy ${this.nombre} y tengo ${this.edad} años.`;
    }
  }
  return new Usuario(nombre, edad);
};

/**
 * Ejercicio 6: Clase con métodos
 * Crea una clase Rectangulo con propiedades ancho y alto, y un método para calcular el área.
 */
class Rectangulo {
  constructor(
    public ancho: number,
    public alto: number
  ) {}

  /**
   * Calcula el área del rectángulo.
   * @returns Área del rectángulo.
   */
  calcularArea(): number {
    return this.ancho * this.alto;
  }
}

/**
 * Ejercicio 7: Obtener claves y valores de un objeto
 * Dado un objeto, imprime todas sus claves y valores.
 */
const script7_Ej2 = (objeto: Record<string, any>): void => {
  Object.entries(objeto).forEach(([clave, valor]) => {
    console.log(`Clave: ${clave}, Valor: ${valor}`);
  });
};

/**
 * Ejercicio 8: Mapear y transformar arrays de objetos
 * De un array de usuarios, retorna un array con solo los nombres en mayúsculas.
 */
const script8_Ej2 = <T extends { nombre: string }>(
  arrayDeObjetos: T[]
): string[] => {
  return arrayDeObjetos.map((usuario) => usuario.nombre.toUpperCase());
};

/**
 * Ejercicio 9: Agregar propiedades nuevas a objetos
 * Dado un array de usuarios, agrega a cada uno una propiedad activo: true.
 */
const script9_Ej2 = <T extends { nombre: string; activo?: boolean }>(usuarios: T[]): T[] => {
  return usuarios.map((usuario) => ({ ...usuario, activo: true }));
};

/**
 * Ejercicio 10: Crear función que devuelve otra función (closure)
 * Crea una función multiplicador que recibe un número n y devuelve otra función
 * que multiplique cualquier número por n.
 * @param n - Factor multiplicador.
 * @returns Función que multiplica su argumento por n.
 */
const script10_Ej2 = (n: number) => {
  return (num: number): number => n * num;
};

export {
  script1_Ej2,
  script2_Ej2,
  script3_Ej2,
  script4_Ej2,
  script5_Ej2,
  Rectangulo,
  script7_Ej2,
  script8_Ej2,
  script9_Ej2,
  script10_Ej2,
};

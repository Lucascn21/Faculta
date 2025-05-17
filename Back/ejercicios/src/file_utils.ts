const fs = require("fs");
const path = require("path");

const validateFilePath = (rutaArchivo?: String) => {
  if (typeof rutaArchivo !== "string") {
    throw new Error("La ruta proporcionada no es válida.");
  }
  if (!path.isAbsolute(rutaArchivo)) {
    throw new Error("La ruta proporcionada no es válida.");
  }
  if (!fs.existsSync(rutaArchivo)) {
    throw new Error("El archivo no existe.");
  }
};

const joinPath = (rutaArchivo: String) => {
  const pathArchivo = path.join(__dirname, rutaArchivo);
  return pathArchivo;
};

export { validateFilePath, joinPath };

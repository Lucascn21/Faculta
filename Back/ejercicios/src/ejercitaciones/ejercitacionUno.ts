import {
  gradosCelsiusAFahrenheit,
  kilogramosALibras,
  metrosAKilometros,
} from "../conversor";
import { joinPath, validateFilePath } from "../file_utils";
import { Request, Response } from "express";
const fs = require("fs");
const path = require("path");

/**
 * Practica #1: Verifica el entorno y muestra la versión de Node.js.
 *
 * - Detecta si se ejecuta en Node.js o en el navegador.
 * - Si es Node.js, imprime la versión (process.version).
 * - Utiliza los conceptos: global vs window, process.version.
 */
export const script1Ej1 = () => {
  const environmentIsNotBrowser = () => {
    if (typeof global !== "undefined") return true;
    if (typeof window !== "undefined") return false;
    throw new Error("Se rompió la matrix, no se puede determinar el entorno.");
  };

  const nodeVersion = () => {
    return process.version;
  };

  environmentIsNotBrowser()
    ? console.dir(nodeVersion())
    : console.dir("El entorno no es Node.js.");
};

/**
 * Practica #2: Temporizador con fecha y hora.
 *
 * - Imprime la fecha y hora actual cada segundo.
 * - Detiene la ejecución automáticamente después de 10 segundos.
 * - Utiliza: setInterval(), clearInterval(), Date().
 */
export const script2Ej1 = () => {
  console.log("Iniciando temporizador...");
  console.time("Temporizador");
  const startTime = Date.now();
  console.log(
    "Fecha de inicio:",
    new Date(startTime).toLocaleString("es-ES", {
      timeZone: "America/Argentina/Buenos_Aires",
    })
  );
  let count = 0;
  const timeInfoList: { Iteración: number; fechaYHora: string }[] = [];

  const timer = setInterval(() => {
    count++;
    timeInfoList.push({
      Iteración: count,
      fechaYHora: new Date().toLocaleString("es-ES", {
        timeZone: "America/Argentina/Buenos_Aires",
      }),
    });

    if (Date.now() - startTime >= 10000) {
      clearInterval(timer);
      console.table(timeInfoList);
      console.log(`Fin. Se mostraron ${count} tiempos.`);
      console.timeEnd("Temporizador");
    }
  }, 1000);
};

/**
 * Practica #3: Módulo de conversión de unidades.
 *
 * - Importa el módulo conversor.js y utiliza sus funciones para realizar conversiones:
 *   • Metros a kilómetros
 *   • Kilogramos a libras
 *   • Grados Celsius a Fahrenheit
 */
export const script3Ej1 = () => {
  console.dir(metrosAKilometros(1000));
  console.dir(kilogramosALibras(100));
  console.dir(gradosCelsiusAFahrenheit(25));
};

/**
 * Practica #4: Información del sistema operativo.
 *
 * - Muestra el sistema operativo, la cantidad de memoria total y libre, y el tiempo de encendido (uptime).
 * - Utiliza: os.platform(), os.totalmem(), os.freemem(), os.uptime().
 */
export const script4Ej1 = () => {
  const os = require("os");
  const { platform, totalmem, freemem, uptime } = os;

  const SEGUNDOS_EN_UNA_HORA = 3600;
  const TIEMPO_ENCENDIDO_EN_SEGUNDOS = uptime();
  const TIEMPO_ENCENDIDO_EN_HORAS = Math.floor(
    TIEMPO_ENCENDIDO_EN_SEGUNDOS / SEGUNDOS_EN_UNA_HORA
  );
  const MEMORIA_LIBRE_EN_BYTES = freemem();
  const MEMORIA_TOTAL_EN_BYTES = totalmem();
  const MEMORIA_TOTAL_EN_MB = MEMORIA_TOTAL_EN_BYTES / 1024 / 1024;
  const MEMORIA_LIBRE_EN_MB = MEMORIA_LIBRE_EN_BYTES / 1024 / 1024;

  const systemInfo = {
    SistemaOperativo: platform(),
    MemoriaTotal: `${Math.floor(MEMORIA_TOTAL_EN_MB)} MB`,
    MemoriaLibre: `${Math.floor(MEMORIA_LIBRE_EN_MB)} MB`,
    TiempoEncendido: `${TIEMPO_ENCENDIDO_EN_HORAS} horas`,
  };

  console.table(systemInfo);
};

/**
 * Practica #5: Lectura y escritura de archivos (modo asíncrono).
 *
 * - Lee el contenido de "entrada.txt", lo convierte a mayúsculas, y lo guarda en "salida.txt".
 * - Utiliza: fs.readFile(), fs.writeFile().
 */
export const script5Ej1 = () => {
  const ENTRADA_PATH = joinPath("entrada.txt");
  const SALIDA_PATH = joinPath("salida.txt");

  if (!fs.existsSync(ENTRADA_PATH)) {
    throw new Error(`No existe el archivo entrada.txt`);
  }
  fs.readFile(ENTRADA_PATH, "utf8", (err: Error, data: string) => {
    if (err) {
      console.error("Error leyendo el archivo", err);
      return;
    }
    const upperCaseData = data.toUpperCase();
    fs.writeFile(SALIDA_PATH, upperCaseData, (err: Error) => {
      if (err) {
        console.error("Error escribiendo el archivo", err);
        return;
      }
      console.log("Archivo escrito con éxito:", upperCaseData);
    });
  });
};

/**
 * Practica #6: Analizador de rutas.
 *
 * - Recibe una ruta de archivo y muestra:
 *   • El directorio absoluto
 *   • La ruta relativa
 *   • El nombre del archivo
 *   • La extensión del archivo
 * - Utiliza: path.dirname(), path.basename(), path.extname().
 *
 * @param {String} rutaArchivo La ruta del archivo a analizar.
 */
export const script6Ej1 = (rutaArchivo: String) => {
  const pathArchivo = joinPath(rutaArchivo);
  validateFilePath(pathArchivo);

  const { dirname, relative, basename, extname } = require("path");

  const rutaAnalizada = {
    directorioAbsoluto: dirname(pathArchivo),
    rutaRelativa: relative(__dirname, pathArchivo),
    nombreArchivo: basename(pathArchivo),
    extension: extname(pathArchivo),
  };

  console.table(rutaAnalizada);
};

/**
 * Practica #7: Gestión de directorios.
 *
 * - Crea la carpeta "logs" si no existe.
 * - Genera 5 archivos de log (log1.txt a log5.txt) dentro de dicha carpeta.
 * - Lista todos los archivos de la carpeta "logs".
 * - Utiliza: fs.mkdirSync(), fs.writeFileSync(), fs.readdirSync().
 */
export const script7Ej1 = () => {
  const carpetaLogs = joinPath("logs");

  if (!fs.existsSync(carpetaLogs)) {
    fs.mkdirSync(carpetaLogs);
    console.log("Carpeta logs creada.");
  } else {
    console.log("La carpeta logs ya existe.");
  }

  for (let i = 1; i <= 5; i++) {
    fs.writeFileSync(
      path.join(carpetaLogs, `log${i}.txt`),
      `Contenido log ${i}`
    );
    console.log(`Archivo log${i}.txt creado.`);
  }

  const archivos = fs.readdirSync(carpetaLogs);
  console.log("Archivos en la carpeta logs:", archivos);
};

/**
 * Practica #8: Eliminación de archivos y directorio.
 *
 * - Elimina todos los archivos dentro de la carpeta "logs" y luego elimina la carpeta.
 * - Utiliza: fs.unlinkSync(), fs.rmdirSync().
 */
export const script8Ej1 = () => {
  const carpetaLogs = joinPath("logs");

  if (fs.existsSync(carpetaLogs)) {
    const archivos = fs.readdirSync(carpetaLogs);
    archivos.forEach((archivo: string) => {
      fs.unlinkSync(path.join(carpetaLogs, archivo));
      console.log(`Archivo ${archivo} eliminado.`);
    });
    fs.rmdirSync(carpetaLogs);
    console.log("Carpeta logs eliminada.");
  } else {
    console.log("La carpeta logs no existe.");
  }
};
/**
 * Espera una cantidad de milisegundos y retorna una promesa que se resuelve o rechaza con un mensaje.
 *
 * @param {number} ms Milisegundos a esperar.
 * @param {boolean} [shouldReject=false] Indica si se debe simular un error.
 * @returns {Promise<string>} Una promesa que se resuelve o rechaza con el mensaje de espera.
 */
export const esperar = (
  ms: number,
  shouldReject: boolean = false
): Promise<string> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        return reject(`Error: No pude esperar ${ms} milisegundos.`);
      }
      resolve(`Esperé ${ms} milisegundos.`);
    }, ms);
  });
};

/**
 * Practica #9: Temporizador con promesa.
 *
 * - Implementa un temporizador que espera una cantidad de milisegundos utilizando una promesa.
 * - Maneja correctamente tanto la resolución (resolve) como el rechazo (reject).
 * - Utiliza: setTimeout(), Promesas, async/await.
 */
export const script9Ej1 = async (shouldReject: boolean = false) => {
  console.log("Iniciando espera...");
  try {
    const resultado = await esperar(5000, shouldReject);
    console.log(resultado);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
};

/**
 * Practica #10: Servidor HTTP con respuesta dinámica.
 *
 * - Crea un servidor HTTP que devuelve la hora actual en formato JSON.
 * - Responde con la fecha y hora actual según la zona horaria "America/Argentina/Buenos_Aires".
 * - Utiliza: http.createServer(), res.writeHead(), JSON.stringify().
 */
export const script10Ej1 = () => {
  const http = require("http");

  const server = http.createServer((req: Request, res: Response) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    const horaActual = new Date().toLocaleTimeString("es-ES", {
      timeZone: "America/Argentina/Buenos_Aires",
    }); 
    res.end(JSON.stringify({ horaActual }));
  });

  server.listen(3001, () => {
    console.log("Servidor escuchando en el puerto 3001");
  });
};

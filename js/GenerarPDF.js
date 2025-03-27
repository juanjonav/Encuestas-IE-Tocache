// Eliminar la importación de PDFLib ya que ahora usamos la versión global
document.addEventListener("DOMContentLoaded", () => {
    // Función para agregar el event listener cuando el botón exista
    function agregarEventListeners() {
        const btnGenerar = document.getElementById("btnGenerar");
        if (btnGenerar) {
            btnGenerar.addEventListener("click", async () => {
                try {
                    const pdfUrl = "https://juanjonav.github.io/HIS/Plantillas/formulario.pdf";
                    async function generarPDF() {
                        // Cargar PDF base
                        const response = await fetch(pdfUrl);
                        const existingPdfBytes = await response.arrayBuffer();

                        const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);
                        const page1 = pdfDoc.getPage(0); // Primera página
                        const page2 = pdfDoc.getPage(1); // Segunda página

                        // Obtener los datos del párrafo
                        const datosElement = document.getElementById('datos-ficha');
                        if (!datosElement) {
                            console.error("No se encontraron los datos de la ficha");
                            return;
                        }
                        /*
                        const coordenadasViveCon = [
                            { x: 176.00, y: 364 }, // op1
                            { x: 258.00, y: 364 }, // op2
                            { x: 304.00, y: 364 }, // op3
                            { x: 350.00, y: 364 }, // op4
                            { x: 412.00, y: 364 }  // op5
                        ];
                        
                        const opcionViveCon = datos[34]?.match(/\d+/)?.[0];*/
                        // Convertir el texto del párrafo en un array
                        const datos = datosElement.textContent.split(',');
                        console.log(datos[34]);
                        const respuestasTexto = [
                            //DATOS PERSONALES
                            { x: 180, y: 648, texto: datos[1] || "" },
                            { x: 536, y: 648, texto: datos[2] || "" },
                            { x: 180, y: 634, texto: datos[3] || "" },
                            { x: 415, y: 634, texto: datos[4] || "" },
                            { x: 137, y: 620, texto: datos[5] || "" },
                            { x: 421, y: 620, texto: datos[6] || "" },
                            { x: 137, y: 606, texto: datos[7] || "" },
                            { x: 286, y: 606, texto: datos[8] || "" },
                            { x: 421, y: 606, texto: datos[9] || "" },
                            //DATOS FAMILIARES
                            //Padre
                            { x: 124, y: 567, texto: datos[10] || "" },
                            { x: 538, y: 567, texto: datos[11] || "" },
                            { x: 125, y: 555, texto: datos[12] || "" },
                            { x: 404, y: 555, texto: datos[13] || "" },
                            { x: 125, y: 540, texto: datos[14] || "" },
                            { x: 289, y: 540, texto: datos[15] || "" },
                            { x: 449, y: 540, texto: datos[16] || "" },
                            //Madre
                            { x: 124, y: 513, texto: datos[17] || "" },
                            { x: 538, y: 513, texto: datos[18] || "" },
                            { x: 125, y: 499, texto: datos[19] || "" },
                            { x: 403, y: 499, texto: datos[20] || "" },
                            { x: 125, y: 485, texto: datos[21] || "" },
                            { x: 288, y: 485, texto: datos[22] || "" },
                            { x: 448, y: 485, texto: datos[23] || "" },
                            //APODERADO
                            { x: 129, y: 459, texto: datos[24] || "" },
                            { x: 538, y: 459, texto: datos[25] || "" },
                            { x: 125, y: 444, texto: datos[26] || "" },
                            { x: 403, y: 444, texto: datos[27] || "" },
                            { x: 125, y: 431, texto: datos[28] || "" },
                            { x: 288, y: 431, texto: datos[29] || "" },
                            { x: 448, y: 431, texto: datos[30] || "" },
                            //HERMANOS
                            { x: 208, y: 404, texto: datos[31] || "" },
                            { x: 508, y: 404, texto: datos[32] || "" },
                            { x: 325, y: 390, texto: datos[33] || "" },
                            //op con quien vive
                            { x: 176.00, y: 364, texto: datos[34] || "" },
                            { x: 258.00, y: 364, texto: "X" },
                            { x: 304.00, y: 364, texto: "X" },
                            { x: 350.00, y: 364, texto: "X" },
                            { x: 412.00, y: 364, texto: "X" },
                            //especial
                            { x: 357.00, y: 350, texto: datos[35] || "" },
                            //op situacion de padres
                            { x: 148.00, y: 294, texto: datos[36] || "" },
                            { x: 214.00, y: 294, texto: "X" },
                            { x: 302.00, y: 294, texto: "X" },
                            { x: 374.00, y: 294, texto: "X" },
                            { x: 453.00, y: 294, texto: "X" },
                            { x: 516.00, y: 294, texto: "X" },
                            //DATOS ESCOLARES
                            //inicial primaria
                            { x: 106.00, y: 235, texto: datos[37] || "" },
                            { x: 344.00, y: 235, texto: datos[38] || "" },
                            //op repitio
                            { x: 200.00, y: 220, texto: datos[39] || "" },
                            { x: 237.00, y: 220, texto: "x" },
                            //cuales motivo
                            { x: 347.00, y: 220, texto: datos[40] || "" },
                            { x: 114.00, y: 205, texto: datos[41] || "" },
                            //op clases
                            { x: 213.00, y: 193, texto: datos[42] || "" },
                            { x: 242.00, y: 194, texto: "x" },
                            //materia y años anteriores
                            { x: 361.00, y: 194, texto: datos[43] || "" },
                            { x: 379.00, y: 180, texto: datos[44] || "" },
                            //op estudiosfuera
                            { x: 429.00, y: 167, texto: datos[45] || "" },
                            { x: 458.00, y: 167, texto: "x" },
                            //tipo
                            { x: 138.00, y: 152, texto: datos[46] || "" },
                            //op rendimiento escolar
                            { x: 88.00, y: 125, texto: datos[47] || "" },
                            { x: 183.00, y: 126, texto: "x" },
                            { x: 268.00, y: 126, texto: "x" },
                            { x: 358.00, y: 126, texto: "x" },
                            { x: 434.00, y: 126, texto: "x" },
                            //op tiempoesfuerzo
                            { x: 377.00, y: 111, texto: datos[48] || "" },
                            { x: 418.00, y: 111, texto: "x" },
                            //respuestas multiples de si o no
                            { x: 79.00, y: 58, texto: datos[49] || "" },
                            { x: 282, y: 58, texto: datos[50] || "" },
                            { x: 446, y: 58, texto: datos[51] || "" },
                            { x: 79, y: 43, texto: datos[52] || "" },
                            { x: 282, y: 43, texto: datos[53] || "" },
                            { x: 79, y: 32, texto: datos[54] || "" },
                            { x: 281, y: 32, texto: datos[55] || "" },
                        ];

                        const respuestasTexto2 = [
                            //HOJA 2
                            { x: 81.00, y: 747, texto: datos[56] || "" },
                            { x: 285.00, y: 747, texto: datos[57] || "" },
                            { x: 81.00, y: 734, texto: datos[58] || "" },
                            { x: 283.00, y: 734, texto: datos[59] || "" },
                            //reaccion notas
                            { x: 85.00, y: 709, texto: datos[60] || "" },
                            //op cumples?
                            { x: 305.00, y: 694, texto: datos[61] || "" },
                            { x: 344.00, y: 694, texto: "x" },
                            //por que
                            { x: 82.00, y: 670, texto: datos[62] || "" },
                            //educacion religiosa
                            { x: 258.00, y: 614, texto: datos[63] || "" },
                            { x: 345.00, y: 614, texto: "x" },
                            { x: 442.00, y: 614, texto: "x" },
                            { x: 490.00, y: 614, texto: "x" },
                            //DATOS MEDICOS
                            //padece algo
                            { x: 198.00, y: 542.13, texto: datos[64] || "" },
                            //tratamiento
                            { x: 356.00, y: 528.13, texto: datos[65] || "" },
                            //tipo
                            { x: 141.00, y: 516.13, texto: datos[66] || "" },
                            /*op hospitalizado
                            { x: 246.00, y: 501.13, texto: "x" },
                            { x: 281.00, y: 501.13, texto: "x" },*/
                            //hospit
                            { x: 358.00, y: 501.13, texto: datos[67] || "" },
                            /*op operado
                            { x: 195.00, y: 488.13, texto: "x" },
                            { x: 227.00, y: 487.13, texto: "x" },*/
                            //operado
                            { x: 297.00, y: 487.13, texto: datos[68] || "" },
                            //op enf cronica
                            { x: 423.00, y: 475.13, texto: datos[69] || "" },
                            { x: 455.00, y: 476.13, texto: "x" },
                            //cual
                            { x: 111.00, y: 464.13, texto: datos[70] || "" },
                            //ESPECTATIVAS DE NUEVO GRADO
                            //atre o preocupa
                            { x: 85.00, y: 409.80, texto: datos[71] || "" },
                            { x: 123.00, y: 381.80, texto: datos[72] || "" },
                            //op el estudio es
                            { x: 96.00, y: 355.80, texto: datos[73] || "" },
                            { x: 188.00, y: 355.80, texto: "x" },
                            { x: 292.00, y: 356.80, texto: "x" },
                            { x: 369.00, y: 356.80, texto: "x" },
                            //op que tan preparado estas
                            { x: 109.00, y: 313.13, texto: datos[74] || "" },
                            { x: 180.00, y: 313.13, texto: "x" },
                            { x: 263.00, y: 313.13, texto: "x" },
                            { x: 339.00, y: 313, texto: "x" },
                            { x: 400.00, y: 313.13, texto: "x" },
                            //op prefieres trabajar
                            { x: 81.00, y: 273.13, texto: datos[75] || "" },
                            { x: 306.00, y: 273, texto: "x" },
                            { x: 81.00, y: 259.13, texto: "x" },
                            { x: 306.00, y: 259.13, texto: "x" },
                            //INQUIETUDES Y tiempo libre
                            { x: 80.00, y: 205.13, texto: datos[76] || "" },
                            //op actividad extraescolar
                            { x: 543.00, y: 191.13, texto: datos[77] || "" },
                            { x: 97.00, y: 179.13, texto: "x" },
                            //otros
                            { x: 221.00, y: 179.13, texto: datos[78] || "" },
                            { x: 276.00, y: 166.13, texto: datos[79] || "" },
                            { x: 337.00, y: 153.13, texto: datos[80] || "" },
                            { x: 255.00, y: 141.13, texto: datos[81] || "" },
                            { x: 449.00, y: 141.13, texto: datos[82] || "" },
                            { x: 256.00, y: 128.13, texto: datos[83] || "" },
                            { x: 469.00, y: 128.13, texto: datos[84] || "" },

                            //CONSLUSIONES
                            { x: 77, y: 81, texto: datos[85] || "" },
                        ];
                        // ** Preguntas de marcar con una "X"**
                        respuestasTexto.forEach(p => {
                            page1.drawText(p.texto, {
                            x: p.x,
                            y: p.y,
                            size: 10,
                            color: PDFLib.rgb(0, 0, 0)
                            });
                        });
                        respuestasTexto2.forEach(p => {
                            page2.drawText(p.texto, {
                            x: p.x,
                            y: p.y,
                            size: 10,
                            color: PDFLib.rgb(0, 0, 0)
                            });
                        });
                         // Guardar el PDF en el navegador
                         const pdfBytes = await pdfDoc.save();
                         const blob = new Blob([pdfBytes], { type: "application/pdf" });
                         const url = URL.createObjectURL(blob);
                         
                         // Crear enlace de descarga
                         const a = document.createElement("a");
                         a.href = url;
                         a.download = "formulario-completado.pdf";
                         document.body.appendChild(a);
                         a.click();
                         document.body.removeChild(a);
                         URL.revokeObjectURL(url);
                        console.log("PDF generado correctamente.");
                    }
                    await generarPDF();
                } catch (error) {
                    console.error("Error al generar el PDF:", error);
                }
            });
        } else {
            // Si el botón no existe, esperar un poco y volver a intentar
            setTimeout(agregarEventListeners, 100);
        }
    }

    // Iniciar el proceso de agregar event listeners
    agregarEventListeners();
});
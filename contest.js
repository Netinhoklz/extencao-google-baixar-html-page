// Este script é injetado na página e executado imediatamente.

// 1. Pega todo o conteúdo HTML da página (incluindo <head> e <body>).
const htmlContent = document.documentElement.outerHTML;

// 2. Tenta criar um nome de arquivo a partir do título da página.
// Remove caracteres inválidos para nomes de arquivo.
let pageTitle = document.title.replace(/[^a-z0-9_.-]/gi, '_').toLowerCase();

// Se o título for vazio, usa um nome padrão.
if (!pageTitle || pageTitle.trim() === "") {
  pageTitle = "pagina_web";
}

const filename = `${pageTitle}.html`;

// 3. Cria um Blob (um objeto de arquivo na memória) com o conteúdo HTML.
// "text/html;charset=utf-8" garante a codificação correta.
const blob = new Blob([htmlContent], { type: "text/html;charset=utf-8" });

// 4. Cria um link <a> temporário para iniciar o download.
const link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = filename;

// 5. Adiciona o link ao corpo, clica nele (para iniciar o download)
//    e depois o remove.
document.body.appendChild(link);
link.click();
document.body.removeChild(link);

// 6. Libera a URL do Blob da memória para evitar vazamentos.
URL.revokeObjectURL(link.href);
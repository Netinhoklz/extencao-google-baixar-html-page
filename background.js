// 1. Função que será injetada na página
function getPageHTML() {
  // Retorna o HTML completo da página, incluindo a tag <html>
  return document.documentElement.outerHTML;
}

// 2. Ouve por mensagens vindas do popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Verifica se a mensagem é a que esperamos
  if (message.action === "downloadHTML") {

    // 3. Encontra a guia ativa
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) {
        console.error("Nenhuma guia ativa encontrada.");
        sendResponse({ status: 'error', message: 'Nenhuma guia ativa.' });
        return;
      }
      const tab = tabs[0];

      // 4. Executa o script na guia
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getPageHTML,
      }, (injectionResults) => {
        if (chrome.runtime.lastError || !injectionResults || injectionResults.length === 0) {
          console.error(chrome.runtime.lastError || 'Nenhum resultado da injeção de script.');
          sendResponse({ status: 'error', message: 'Erro ao obter HTML.' });
          return;
        }

        const htmlContent = injectionResults[0].result;
        if (htmlContent) {

          // ----- AQUI ESTÁ A CORREÇÃO -----
          // 5. Cria uma Data URL em vez de um Blob URL
          // Isso codifica o HTML diretamente na URL.
          const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(htmlContent);
          // ------------------------------------

          // Tenta extrair um nome de arquivo
          let filename = "pagina.html";
          try {
            const tabUrl = new URL(tab.url);
            if (tabUrl.hostname) {
              filename = tabUrl.hostname.replace('www.', '') + ".html";
            }
          } catch (e) {
            // Ignora erros de URL (ex: 'about:blank')
          }

          // 6. Inicia o download
          chrome.downloads.download({
            url: url, // Passa a nova Data URL
            filename: filename,
            saveAs: true // Pede ao usuário para confirmar o local
          }, (downloadId) => {
            // 7. IMPORTANTE: Não precisamos mais revogar a URL!

            if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              sendResponse({ status: 'error', message: 'Falha ao salvar.' });
            } else {
              // Envia uma resposta de sucesso de volta ao popup
              sendResponse({ status: 'success', message: 'Download iniciado.' });
            }
          });
        } else {
          sendResponse({ status: 'error', message: 'Não foi possível obter o HTML.' });
        }
      });
    });

    // Retorna true para indicar que a resposta sendResponse será assíncrona
    return true;
  }
});
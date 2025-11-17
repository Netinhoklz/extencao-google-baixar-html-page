document.getElementById('downloadButton').addEventListener('click', () => {
  const status = document.getElementById('status');
  status.textContent = 'Processando...';

  // 1. Envia uma mensagem para o service worker (background.js)
  chrome.runtime.sendMessage({ action: "downloadHTML" }, (response) => {

    if (chrome.runtime.lastError) {
      // Erro ao comunicar com o service worker
      status.textContent = 'Erro de comunicação.';
      console.error(chrome.runtime.lastError.message);
      return;
    }

    // 2. Recebe a resposta do service worker
    if (response && response.status === 'success') {
      status.textContent = response.message;
      // Agora podemos fechar o popup com segurança
      setTimeout(() => window.close(), 1500);
    } else if (response) {
      // O service worker relatou um erro
      status.textContent = response.message;
      console.error(response.message);
    } else {
      status.textContent = 'Resposta inesperada.';
    }
  });
});
# 📥 Baixar HTML da Página (Chrome Extension)

Uma extensão leve e eficiente para Google Chrome que permite baixar o código-fonte completo (HTML) da guia ativa com apenas um clique.

Desenvolvida seguindo os padrões do **Manifest V3**, esta extensão resolve problemas comuns de download em Service Workers utilizando injeção de scripts e Data URLs.

## 🚀 Funcionalidades

* **Extração Completa:** Obtém todo o conteúdo da tag `<html>`, garantindo que a estrutura completa da página seja salva.
* **Nomeação Automática:** O arquivo é salvo automaticamente utilizando o nome do domínio da página (ex: `google.com.html`), facilitando a organização.
* **Solução para Manifest V3:** Utiliza codificação `Data URL` para contornar as limitações de uso de `Blob` dentro de Service Workers (background scripts).
* **Interface Limpa:** Popup simples com feedback visual de status ("Processando...", "Download iniciado").

## 🛠️ Tecnologias Utilizadas

* **JavaScript (ES6+)**
* **Chrome Extension API (Manifest V3)**
    * `chrome.scripting`: Para injetar a função de extração na página.
    * `chrome.downloads`: Para gerenciar o salvamento do arquivo.
    * `chrome.runtime`: Para comunicação assíncrona entre o popup e o background script.
* **HTML5 & CSS3**

## 📂 Estrutura do Projeto

```text
.
├── manifest.json    # Configuração principal (Permissões, Versão V3)
├── background.js    # Service Worker: Lógica de injeção e download via Data URL
├── popup.html       # Interface do usuário (Botão de download)
├── popup.js         # Lógica da interface (Mensageria com background)
└── icon.png         # Ícone da extensão
````

## 📦 Como Instalar e Testar (Modo Desenvolvedor)

1.  Faça o download ou clone este repositório.
2.  Abra o Google Chrome e acesse `chrome://extensions/`.
3.  No canto superior direito, ative a opção **Modo do desenvolvedor** (Developer mode).
4.  Clique no botão **Carregar sem compactação** (Load unpacked).
5.  Selecione a pasta onde você salvou os arquivos deste projeto.
6.  A extensão aparecerá na sua barra de ferramentas.

## ⚙️ Como Funciona (Fluxo Técnico)

1.  **Interação:** O usuário clica no botão "Salvar HTML" no popup.
2.  **Mensageria:** `popup.js` envia uma mensagem `downloadHTML` para o `background.js`.
3.  **Injeção:** O `background.js` identifica a guia ativa e injeta a função `getPageHTML`.
4.  **Retorno:** O HTML é recuperado e convertido em uma **Data URL** (base64/encoded) para evitar erros de referência de memória no Service Worker.
5.  **Download:** O arquivo é baixado via `chrome.downloads` com o nome do host da página.

## 📝 Permissões

  * `activeTab`: Acesso à guia atual.
  * `scripting`: Execução de código na página.
  * `downloads`: Gerenciamento de downloads.

-----

*Projeto desenvolvido para fins de estudo e automação.*


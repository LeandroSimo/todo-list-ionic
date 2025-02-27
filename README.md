# Todo List - Aplicação com Ionic e React

Este projeto é uma aplicação de lista de tarefas (Todo List) desenvolvida com Ionic, React e TypeScript. Ele permite gerenciar tarefas, incluindo criação, edição, exclusão e alteração de status. A aplicação também inclui testes unitários.

## Tecnologias Utilizadas

- **Ionic**: Framework para desenvolvimento de aplicações móveis e web.

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.

- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

- **Vite**: Ferramenta de build rápida para desenvolvimento moderno.

- **Vitest**: Framework de testes unitários.

- **JSON Server**: Simula uma API RESTful para desenvolvimento e testes.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior).
- **npm** ou **yarn** (Gerenciadores de pacotes).
- **Ionic CLI** (Para rodar o projeto Ionic)
  ```
  npm install -g @ionic/cli
  ```

## Como Rodar o Projeto

1. Clonar o Repositório

   Primeiro, clone o repositório do projeto:

```
git clone https://github.com/LeandroSimo/todo-list-ionic.git
cd todo-list-ionic
```

2. Instalar Dependências

   Instale as dependências do projeto usando npm ou yarn:

   ```
   npm install

   ou

   yarn install
   ```

3. Rodar o Projeto

   Para iniciar o servidor de desenvolvimento, execute:

   ```
   npm run start

   ou

   yarn start
   ```

   Isso iniciará o servidor de desenvolvimento do Ionic. Abra o navegador e acesse:

   ```
   http://localhost:8100
   ```

4. Rodar a API Fake (JSON Server)

   Para simular uma API RESTful, inicie o JSON Server:

   ```
   npm run api

   ou

   yarn api
   ```

   A API estará disponível em:

   ```
   http://localhost:5000
   ```

5. Build do Projeto

   Para gerar uma versão de produção do projeto, execute:

   ```
   npm run build

   ou

   yarn build
   ```

   Isso criará uma pasta `dist` com os arquivos otimizados para produção.

6. Rodar App no Emulador Android

   Para rodar a aplicação no emulador Android execute o comando:

   ```
   ionic cap build android
   ```

   Isso irá copiar os arquvios de build para o projeto Android e abrirá o Android Studio. Caso não abra, execute o comando abaixo:

   ```
   ionic cap open android
   ```

7. Execute no Emulador

   No Android Studio:

   1. Selecione o dispositivo virtual (emulador) que você configurou.
   2. Clique no botão Run (ícone de play).

8. Rodar App no Emulador iOS (Xcode)

   Copie os arquivos de build para o projeto iOS:

   ```
   npx cap copy ios
   ```

   Navegue até a pasta ios e instale as dependências com Cocoapods:

   ```
   cd ios/App
   pod install
   ```

   Abra o projeto iOS no Xcode:

   ```
   npx cap open ios
   ```

   No Xcode:

   1. Selecione um dispositivo iOS na lista de dispositivos (por exemplo, iPhone 15 Pro).
   2. Clique no botão Run (ícone de play).

9. Rodar os Testes

   **Testes Unitários**

   Para rodar os testes unitários com Vitest:

   ```
   npm run test.unit

   ou

   yarn test.unit
   ```

### Agora você está pronto para começar a desenvolver e testar a aplicação Todo List! 🚀

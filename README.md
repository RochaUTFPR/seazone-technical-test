# Seazone Technical Test

Este projeto é um Teste Técnico web desenvolvido em [Next.js](https://nextjs.org/) para simular a reserva de propriedades.

## Instruções de Instalação

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/RochaUTFPR/seazone-technical-test
   cd seazone-technical-test/web-seazone
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz de `web-seazone` com:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://mock-api-temporada.onrender.com
     ```

## Como Executar

- **Modo desenvolvimento:**
  ```sh
  npm run dev
  # ou
  yarn dev
  ```
  Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Decisões Técnicas

- **Framework:** [Next.js](https://nextjs.org/).
- **Linguagem:** TypeScript, para maior segurança e produtividade.
- **Componentização:** Componentes reutilizáveis em `src/components`, organizados seguindo os princípios do [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/), para garantir consistência, escalabilidade e fácil manutenção.
- **Estilização:** CSS Modules para escopo local e fácil manutenção.
- **Requisições HTTP:** [Axios](https://axios-http.com/) configurado em [`src/service/utils/api.ts`](src/service/utils/api.ts).
- **Gerenciamento de estado:** Hooks do React (`useState`, `useEffect`, `useCallback`).
- **Notificações:** [React Toastify](https://fkhadra.github.io/react-toastify/) para feedback ao usuário.
- **Paginação e filtros:** Implementados na listagem de propriedades.
- **Organização:** Separação clara entre modelos, enums, serviços e componentes.
- **Boas práticas:** Tipagem forte, código limpo, responsividade e acessibilidade.

---

## Pontos importantes
1. Durante os testes, a rota paginada da API não funcionava corretamente e sempre retornava um array vazio, tanto rodando o mock-api-temporada localmente quanto consumindo a versão remota. Exemplo: como https://mock-api-temporada.onrender.com/properties?_page=1&_limit=10&_sort=pricePerNight&_order=asc". Por esse motivo, a paginação foi implementada diretamente na aplicação web.

2. Em algumas consultas, como: https://mock-api-temporada.onrender.com/properties?city=São Paulo&type=Apartamento, se o parâmetro minPrice não fosse informado, a API retornava um array vazio. Para corrigir esse comportamento, a aplicação sempre envia minPrice=0 quando o usuário não informa um valor.

---

## Pontos a serem Melhorados

1. **Componentização:** Melhorar a estrutura de componentes, adotando de forma mais consistente os princípios do **Atomic Design**. 

2. **Variáveis de estilo:** Centralizar todas as cores do sistema em um único arquivo para facilitar a manutenção e permitir, no futuro, a implementação de **dark mode/light mode**.  


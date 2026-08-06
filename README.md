# 📅 Cronograma IASD (Igreja Adventista do Sétimo Dia)

Aplicativo desktop desenvolvido para automatizar, organizar e padronizar a criação de cronogramas e escalas eclesiásticas para os cultos da **Igreja Adventista do Sétimo Dia** (Quartas, Sábados e Domingos), garantindo uma exportação visual perfeita no formato padrão A4 para impressão ou envio digital.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando tecnologias modernas de desenvolvimento web e desktop:
* **[Electron](https://www.electronjs.org/)** — Framework para criação de aplicativos desktop multiplataforma.
* **[React](https://react.dev/)** — Biblioteca JavaScript para construção da interface de usuário.
* **[TypeScript](https://www.typescriptlang.org/)** — Superset do JavaScript com tipagem estática.
* **[Tailwind CSS](https://tailwindcss.com/)** — Framework CSS utilitário para estilização rápida e responsiva.
* **[Html2Canvas-Pro](https://www.npmjs.com/package/html2canvas-pro)** — Biblioteca para captura e conversão do layout em imagem PNG em alta resolução.

---

## 📂 Estrutura do Projeto & Arquivos Chave

A arquitetura do projeto foi modularizada para facilitar a manutenção e customização:

* **`src/App.tsx`**
  Componente principal da aplicação. Gerencia o estado global (mês, ano, tema de cores, escalas salvas no `localStorage`), calcula dinamicamente os dias da semana e gerencia a exportação de imagem.

* **`src/membros.ts.example`**
  **Modelo de Membros:** Contém um array de exemplo com nomes genéricos para alimentar a lista de sugestões (*datalist*).
  > 💡 **Nota para clonagem:** Renomeie este arquivo para `membros.ts` caso queira pré-cadastrar os membros da sua comunidade. O sistema também permite digitar nomes livremente a qualquer momento.

* **`src/versiculos.ts`**
  Repositório contendo uma lista de versículos bíblicos utilizados pelo sistema para o recurso de **sorteio automático de versículos e avisos** no rodapé do cronograma.

* **`src/components/Sidebar.tsx`**
  Painel lateral de controle para alternância de meses/anos, temas de cores, sorteio de versículos e gerenciamento de dados.

* **`src/components/CartaoDia.tsx`**
  Componente responsável por renderizar cada data, exibindo os cargos preenchidos (Cântico, Plataforma, Sermão, Mensagem, Recepção e Ofertas) ou indicando cultos cancelados/datas especiais.

---

## ✨ Principais Funcionalidades

1. **Geração Dinâmica de Datas:** O app calcula automaticamente quais dias caem em quartas-feiras, sábados e domingos para qualquer mês e ano.
2. **Validação Inteligente de Membros:** O sistema impede que a mesma pessoa seja escalada para duas funções diferentes no mesmo dia, emitindo um alerta visual.
3. **Suporte a Múltiplas Pessoas:** Permite escalar duplas em funções essenciais (como Plataforma, Recepção e Mensagem Especial).
4. **Tratamento de Dias Especiais:** Possibilidade de marcar dias sem culto regular ou inserir títulos personalizados (ex: *Culto da Família*, *Dia de Graça*).
5. **Zoom de Usabilidade & Exportação Perfeita:** Interface confortável para visualização na tela de edição, combinada com um mecanismo de clonagem que gera imagens PNG nítidas no formato exato da folha A4.

---

## 📥 Baixar Aplicativo (.exe para Windows)

Se você deseja apenas utilizar o aplicativo no Windows sem precisar clonar o repositório ou rodar comandos de código, acesse a aba **[Releases](https://github.com/SaraMag25/Cronograma-IASD/releases)** deste repositório e faça o download direto do instalador **`Cronograma IASD Setup.exe`**.

---

## 🛠️ Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/SaraMag25/Cronograma-IASD.git
   ```

2. Entre na pasta do projeto:
   ```bash
   cd Cronograma-IASD
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Para gerar a build de produção e o instalador `.exe` executável localmente:
   ```bash
   npm run build
   ```

---

Desenvolvido com dedicação por **Sara**.
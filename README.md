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

* **`src/membros.ts`**
  **Lista de Membros:** Contém o array com os nomes cadastrados para alimentar a lista de sugestões (*datalist*).
  > 💡 **Nota sobre customização:** Preencher este arquivo **não é obrigatório**. Caso queira, você pode clonar o repositório e adicionar os nomes dos membros da sua igreja aqui para facilitar a seleção. No entanto, o sistema também permite que você digite nomes livremente a qualquer momento.

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

## 🛠️ Como Executar o Projeto Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/SaraMag25/Conograma-IASD.git
   ```

2. Entre na pasta do projeto:
   ```bash
   cd cronograma
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Para gerar a build de produção / instalador executável:
   ```bash
   npm run build
   ```

---

Desenvolvido com dedicação por **Sara**.
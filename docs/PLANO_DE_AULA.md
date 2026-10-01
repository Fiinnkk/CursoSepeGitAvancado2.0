# 📋 Plano de Ensino: Git Avançado Descomplicado (1h)

> **Público-Alvo:** Estudantes do Ensino Médio em evento/minicurso universitário (SEPE ou similar)  
> **Duração Total:** 60 minutos  
> **Pré-requisitos dos Alunos:** Conhecimento prévio básico ou noção superficial de terminal/computação (não exige saber programar).  
> **Foco:** Prática colaborativa real, desmistificação de conflitos, branches e kit salva-vidas do Git — sem ruído de servidores ou código legado.

---

## 1. Diagnóstico do Material Anterior & Justificativa do Novo Formato

O repositório de referência anterior continha sérios problemas pedagógicos para uma oficina de 1 hora:
1. **Ruído e Bloat Excessivo:** Código de aplicação web completa (Node.js, PHP, Apache com certificados SSL, MySQL, Composer com 17KB de lockfile, `package-lock.json` com 64KB). Numa aula de 60 minutos, tentar subir Docker ou debugar ambiente consumiria 40 minutos em vão.
2. **Incoerência de Nível:** 85% do conteúdo cobria o básico (`git init`, `add`, `commit`, `push`), e a única parte "avançada" era um comando longo e complexo de rebase interativo com script bash (`git rebase -i --root -x ...`), intimidando o aluno sem utilidade prática imediata.
3. **Foco Errado para o Ensino Médio:** O objetivo para essa faixa etária não é simular a dor de um estagiário com código legado de 10 anos, mas sim **encantar e capacitar**: mostrar que o Git é uma máquina do tempo e uma ferramenta de trabalho em equipe essencial para o mercado e faculdade.

### A Nova Abordagem (Zero Dependências, Máximo Aprendizado):
- Todas as práticas utilizam arquivos Markdown/Texto simples (`historia.txt` ou `equipe.md`).
- Foco nas habilidades que realmente diferenciam o uso avançado: **Branches simultâneas**, **O armário secreto (`stash`)**, **Resolução de Conflitos na prática** e **Como desfazer erros sem pânico (`revert` vs `reset`)**.

---

## 2. Objetivos de Aprendizagem

Ao final desta aula de 1 hora, o estudante será capaz de:
1. **Compreender o modelo mental do Git:** Entender commits como "savepoints" e branches como "linhas temporais alternativas".
2. **Trabalhar em paralelo:** Criar branches, alternar entre elas e usar `git stash` para pausar tarefas temporárias.
3. **Resolver Conflitos de Merge:** Identificar as marcações de conflito (`<<<<<<<`, `=======`, `>>>>>>>`), resolver o código com confiança e concluir o merge.
4. **Acionar o Kit Salva-Vidas:** Saber a diferença prática entre `git restore`, `git revert` (seguro para equipes) e `git reset` (voltar no tempo local).
5. **Adotar boas práticas de mercado:** Escrever mensagens semânticas simples (`feat:`, `fix:`) que são o padrão da indústria.

---

## 3. Cronograma Minuto a Minuto (60 Minutos)

| Bloco | Tempo | Tema Principal | Dinâmica / Atividade |
| :--- | :---: | :--- | :--- |
| **01** | 00 – 10 min (10') | **A Mente do Git: Desmistificando o Versionamento** | Analogia dos "Jogos & Linhas Temporais (Multiverso)". Mostrar o que é `HEAD` e ponteiros de branches de forma gráfica. |
| **02** | 10 – 25 min (15') | **Multiverso na Prática: Branches & Stash** | Criando branches de trabalho (`git switch -c`). Prática do `git stash` ("o pause do videogame") para salvar progresso rápido. |
| **03** | 25 – 45 min (20') | **O Terror Desmistificado: Conflitos de Merge** | **Clímax da aula:** Dois alunos (ou professor simulando duas branches) alteram a mesma linha. Explicar e resolver o conflito ao vivo! |
| **04** | 45 – 55 min (10') | **A Máquina do Tempo: Kit Salva-Vidas** | "Socorro, fiz besteira!": Desfazer alterações locais (`git restore`), desfazer commit com histórico seguro (`git revert`) e o perigo do `git reset`. |
| **05** | 55 – 60 min (05') | **Padrão de Mercado & Encerramento** | Commits Semânticos básicos (`feat:`, `fix:`), indicações de jogos para praticar (*Learn Git Branching*) e Q&A. |

---

## 4. Detalhamento Metodológico por Bloco

### Bloco 1 (00–10 min): O Conceito que Ninguém Explica no Básico
- **Gatilho Mental:** "Quem aqui já perdeu um trabalho de escola porque salvou com o nome `trabalho_final_v2_agora_vai_mesmo.docx`?"
- **Explicação Visual:**
  - Git não guarda cópias completas de pastas inteiras, ele tira "fotos" (snapshots) e cria uma cadeia de blocos interligados (grafo).
  - A `branch` não é uma pasta nova, é apenas uma etiqueta apontando para um commit.
  - O `HEAD` é simplesmente a câmera: ele diz "você está olhando para cá agora".

### Bloco 2 (10–25 min): Branches e o Poder do `git stash`
- **Cenário:** Você está desenvolvendo um novo poder para um jogo na branch `feature-super-pulo`, mas o chefe avisa que a tela inicial está com defeito crítico na `main`. Você não quer commitar código pela metade e quebrado.
- **Ação:**
  1. `git stash` (guarda tudo na gaveta secreta).
  2. `git switch main` (vai lá, arruma o bug).
  3. `git switch feature-super-pulo` (volta para o seu projeto).
  4. `git stash pop` (tira da gaveta e continua de onde parou).
- **Impacto para os alunos:** Eles adoram ver o arquivo sumir e reaparecer no editor como mágica.

### Bloco 3 (25–45 min): Conflitos de Merge sem Traumas
- **A quebra do mito:** Conflito não é erro! Conflito é o Git dizendo: *"Vocês dois foram geniais, mas eu sou apenas um programa e não sei qual das duas ideias vocês querem manter. Decidam aí!"*
- **Laboratório Hands-On:**
  1. O arquivo base tem a linha: `Status do Servidor: Offline`.
  2. Branch A muda para: `Status do Servidor: Ativo e Seguro`.
  3. Branch B muda para: `Status do Servidor: Em Manutenção até 18h`.
  4. Executa-se `git merge`. Conflito acontece!
  5. Exibição das marcas:
     ```text
     <<<<<<< HEAD
     Status do Servidor: Ativo e Seguro
     =======
     Status do Servidor: Em Manutenção até 18h
     >>>>>>> branch-b
     ```
  6. Resolução no VS Code / editor de texto: limpar as tags, escolher a versão certa (ou mesclar as duas), salvar, `git add` e `git commit`.

### Bloco 4 (45–55 min): O Kit Salva-Vidas (Desfazendo Bobagens)
- **Cenário 1: "Editei um arquivo, apaguei coisa demais e nem commitei ainda."**
  - Comando: `git restore nome_do_arquivo` (volta ao estado do último commit).
- **Cenário 2: "Cometei uma bobagem e já enviei ou quero desfazer profissionalmente."**
  - Comando: `git revert <hash>` (cria um commit inverso que cancela as mudanças sem destruir o histórico).
- **Cenário 3: "O que é o `git reset` e por que você deve ter muito cuidado com o `--hard`?"**
  - Explicar a diferença: `soft` (desfaz o commit e deixa as linhas preparadas), `hard` (apaga sem volta).

### Bloco 5 (55–60 min): Boas Práticas & Recursos Futuros
- Apresentar Conventional Commits em 60 segundos:
  - `feat:` quando adiciona novidade.
  - `fix:` quando conserta algo quebrado.
  - `docs:` quando edita documentação.
- Indicação do game interativo web: [Learn Git Branching](https://learngitbranching.js.org/?locale=pt_BR).

---

## 5. Requisitos de Infraestrutura para a Aula

- **Laboratório:** Computadores com Git e VS Code instalados (ou terminal básico).
- **Configuração inicial já pronta (ou feita nos primeiros 2 minutos):**
  ```bash
  git config --global user.name "Seu Nome"
  git config --global user.email "seu_email@exemplo.com"
  ```
- **Material do Aluno:** O arquivo `TUTORIAL.md` disponível para consulta ou impresso/digital.

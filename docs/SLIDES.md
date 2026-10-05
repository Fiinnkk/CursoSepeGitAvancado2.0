---
marp: true
theme: default
paginate: true
header: "Git Avançado • Oficina Prática (1h)"
footer: "Faculdade & Ensino Médio"
style: |
  section {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 26px;
    padding: 40px;
  }
  h1 {
    color: #F05032;
  }
  h2 {
    color: #2F363F;
  }
  code {
    background-color: #f1f2f6;
    color: #c0392b;
  }
  pre {
    background-color: #2f3542 !important;
    color: #f1f2f6 !important;
  }
  .highlight {
    background-color: #ffeaa7;
    padding: 2px 8px;
    border-radius: 4px;
  }
---

<!-- _class: lead -->
# Git Avançado
### O Multiverso do Código e o Fim do Medo de Conflitos
**Oficina de 1 Hora • Ensino Médio**

---

## Quem nunca passou por isso?

- `trabalho_historia.docx`
- `trabalho_historia_FINAL.docx`
- `trabalho_historia_FINAL_MESMO_AGORA_VAI.docx`
- `trabalho_historia_FINAL_DEFINITIVO_V2.docx`

> *"No Git, o seu histórico não vira bagunça. Cada alteração é um ponto de restauração num jogo."*

---

## Como o Git Pensa (Por Baixo dos Panos)

- **Git Básico:** "Eu salvo linhas de texto que mudaram."
- **Git Avançado (A Verdade):**
  - O Git tira **Snapshots (fotos)** do projeto inteiro a cada commit.
  - Commits são nós interligados num **Grafo** (uma linha do tempo).
  - **`HEAD`** é a câmera: ela diz exatamente onde você está no multiverso.
  - **`Branches`** são apenas post-its (ponteiros móveis) apontando para um commit.

---

## Os Estados de um Arquivo

1. **Working Directory:** Sua mesa de trabalho (onde você escreve).
2. **Staging Area (`git add`):** A caixa de envio (o que vai na foto).
3. **Repositório Local (`git commit`):** O cofre do histórico definitivo.
4. **Repositório Remoto (`git push`):** A nuvem compartilhada (GitHub).

---

## Branches: O Multiverso dos Desenvolvedores

Por que criar branches?
- Para desenvolver um recurso novo sem quebrar o que já está funcionando.
- Para várias pessoas trabalharem no mesmo arquivo simultaneamente.

```bash
# Cria e já entra na nova branch
git switch -c feature/nova-fase

# Lista as branches existentes
git branch

# Volta para a linha principal
git switch main
```

---

## `git stash`: O "Pause" do Videogame

**Cenário Real:**
Você está no meio de um código pela metade e com erros. O professor ou seu colega pede para você corrigir algo urgente na branch `main`.

> *Você não quer commitar código quebrado! O que fazer?*

```bash
# 1. Guarda tudo na gaveta secreta e limpa a tela:
git stash

# 2. Vai para a main, resolve a emergência e volta:
git switch main
# (arruma o bug...)
git switch feature/nova-fase

# 3. Puxa tudo da gaveta e continua trabalhando:
git stash pop
```

---

## 💥 O Grande Terror: CONFLITOS DE MERGE

> **O que é um conflito?**
> Acontece quando **duas pessoas (ou branches)** alteram **as mesmas linhas** do mesmo arquivo antes de juntar tudo.

- O Git **não sabe** qual versão é a correta.
- O Git **NÃO apaga** nada sozinho.
- Ele pausa o merge e pede: *"Humano, decida você!"*

---

## 🔍 Anatomia de um Conflito

Quando você roda `git merge`, o Git coloca marcadores no arquivo:

```text
<<<<<<< HEAD (O que estava na sua branch atual)
Missão: Derrotar o dragão de fogo
=======
Missão: Fazer amizade com o dragão de gelo
>>>>>>> feature/diplomacia (O que veio da outra branch)
```

**Como Resolver?**
1. Abra o arquivo no editor (ex: VS Code).
2. Apague as tags `<<<<<<<`, `=======` e `>>>>>>>`.
3. Escolha qual frase fica (ou misture as duas!).
4. Salve, faça `git add` e `git commit`. Pronto! 🎉

---

## Prática Relâmpago: Gerando um Conflito

1. Na branch `main`, adicione no arquivo `jogo.txt`:
   ```text
   Personagem: Guerreiro nível 10
   ```
   Faça o commit.
2. Crie a branch `git switch -c mago` e altere a mesma linha para:
   ```text
   Personagem: Mago das Chamas nível 12
   ```
   Faça o commit.
3. Volte para `main` (`git switch main`) e execute:
   ```bash
   git merge mago
   ```
4. Veja o conflito acontecer e resolva ao vivo!

---

## 🛟 O Kit Salva-Vidas: Desfazendo Bobagens

### Cenário 1: Editei o arquivo errado e estraguei tudo (sem commit)
```bash
git restore nome_do_arquivo.txt
```
*(Desfaz tudo e volta ao estado do último commit).*

### Cenário 2: Fiz um commit errado e quero desfazer com segurança
```bash
git revert HASH_DO_COMMIT
```
*(Cria um **novo commit** que anula o anterior. Seguro para trabalhar em equipe!).*

---

## A Caixa de Pandora: `git reset`

O `git reset` mexe nos ponteiros da história.

- **`git reset --soft HEAD~1`** (Modo Seguro):
  Desfaz o último commit, mas **mantém todos os arquivos editados** na Staging Area.
- **`git reset --hard HEAD~1`** (O Botão Vermelho 🚨):
  Apaga o commit e **DESTRÓI** todas as alterações dos arquivos.
  > *Regra de ouro: Só use `--hard` se tiver 100% de certeza que quer jogar o código no lixo!*

---

## Falando a Língua do Mercado: Conventional Commits

Pare de commitar coisas como: `"arrumei"`, `"teste"`, `"foi agora"`, `"asdasd"`.

Adote o padrão internacional:
- `feat:` Nova funcionalidade (`feat: adiciona sistema de pontuação`)
- `fix:` Correção de bug (`fix: corrige colisão do personagem`)
- `docs:` Alteração na documentação (`docs: atualiza instruções de jogo`)
- `style:` Formatação de código sem mudar a lógica

---

## Resumo Ninja em 4 Comandos de Ouro

| Quero... | Comando |
| :--- | :--- |
| Criar e entrar numa branch nova | `git switch -c minha-branch` |
| Pausar o trabalho sem commitar | `git stash` (depois `git stash pop`) |
| Desfazer alterações locais | `git restore arquivo.txt` |
| Desfazer um commit de forma limpa | `git revert <hash>` |

---

## 🎮 Onde Continuar Praticando?

- **Game Interativo Web:** [Learn Git Branching](https://learngitbranching.js.org/?locale=pt_BR) (Grátis, visual e direto no navegador).
- **Extensão do VS Code:** *Git Graph* (Permite ver as branches desenhadas).

---

<!-- _class: lead -->
# Dúvidas?
### Mãos à obra no laboratório! 💻🚀
Obrigado pela participação!

#  Tutorial Prático Hands-On: Git Avançado

Bem-vindo ao laboratório prático de Git! Este roteiro foi desenhado para ser executado em qualquer computador com Git instalado, sem precisar instalar bancos de dados, servidores ou frameworks.

---

##  Missão 0: Preparando o Terreno

Abra o terminal do seu computador (ou o terminal integrado do VS Code com `Ctrl + ~`):

1. **Configure sua identificação** (se ainda não fez):
   ```bash
   git config --global user.name "Seu Nome"
   git config --global user.email "seu_email@escola.com"
   ```

2. **Crie a pasta da nossa missão:**
   ```bash
   mkdir lab-git-avancado
   cd lab-git-avancado
   git init -b main
   ```

3. **Crie o arquivo do nosso projeto:**
   Crie um arquivo chamado `aventura.txt` com o seguinte conteúdo:
   ```text
   === RPG: A JORNADA DO DEV ===
   Fase 1: O Castelo dos Bugs
   Equipe: 4 Aventureiros
   Dificuldade: Normal
   ```

4. **Salve o primeiro commit:**
   ```bash
   git add aventura.txt
   git commit -m "feat: inicia o roteiro da aventura"
   ```

---

## 🎮 Missão 1: Trabalhando em Ramos com o `git stash`

Imagine que você está criando uma nova fase para o jogo.

### Passo 1: Crie uma nova branch
```bash
git switch -c fase-dragao
```

### Passo 2: Adicione conteúdo incompleto
Edite o arquivo `aventura.txt` e adicione no final:
```text
Fase 2: O Covil do Dragão de Fogo
(TRABALHO INCOMPLETO: o dragao tem 99999 de vida e...
```

Verifique o status:
```bash
git status
```
*Note que o arquivo está modificado no Working Directory.*

### Passo 3: A Emergência!
Seu professor avisa: *"A dificuldade na fase 1 da branch main está errada, mude para Difícil agora mesmo!"*

Você **NÃO pode commitar** essa frase incompleta. Vamos usar o **Stash**:

```bash
git stash
```
> 👀 **Olhe seu editor de texto:** O texto incompleto sumiu! O Git guardou suas mudanças em uma gaveta segura.

### Passo 4: Resolva a emergência na `main`
```bash
git switch main
```
Abra o `aventura.txt` e mude `Dificuldade: Normal` para:
```text
Dificuldade: Difícil
```
Salve e commite a correção:
```bash
git add aventura.txt
git commit -m "fix: atualiza dificuldade da fase 1 para dificil"
```

### Passo 5: Volte e recupere seu trabalho
```bash
git switch fase-dragao
git stash pop
```
> 🎉 **Mágica!** Seu texto da Fase 2 voltou para a tela exatamente de onde você parou!

Complete a frase:
```text
Fase 2: O Covil do Dragão de Fogo
Chefão: Dragão Ignis
Recompensa: Espada de Diamante
```
Salve e faça o commit:
```bash
git add aventura.txt
git commit -m "feat: completa a fase 2 com o dragao de fogo"
```

---

## ⚔️ Missão 2: O Duelo de Conflitos de Merge

Agora vamos enfrentar o maior medo de todo desenvolvedor: o **Merge Conflict**.

### Passo 1: Faça uma alteração na `main`
Volte para a branch `main`:
```bash
git switch main
```

Adicione uma linha no final do arquivo:
```text
Item Especial: Escudo de Madeira Reforçado
```
Commite na `main`:
```bash
git add aventura.txt
git commit -m "feat: adiciona escudo de madeira na main"
```

### Passo 2: Crie outra branch e altere A MESMA LINHA
Vamos criar uma branch chamada `escudo-lendario`:
```bash
git switch -c escudo-lendario
```
Edite o arquivo e mude a linha do item especial para:
```text
Item Especial: Escudo Mágico Ancestral de Ouro
```
Commite nessa branch:
```bash
git add aventura.txt
git commit -m "feat: melhora item especial para escudo de ouro"
```

### Passo 3: O Momento do Conflito!
Volte para a branch principal e tente trazer as mudanças da branch `escudo-lendario`:
```bash
git switch main
git merge escudo-lendario
```

 **O Terminal vai gritar:**
```text
Auto-merging aventura.txt
CONFLICT (content): Merge conflict in aventura.txt
Automatic merge failed; fix conflicts and then commit the result.
```

### Passo 4: Como ler e resolver o conflito
Abra o arquivo `aventura.txt` no seu editor. Você verá isto:

```text
<<<<<<< HEAD
Item Especial: Escudo de Madeira Reforçado
=======
Item Especial: Escudo Mágico Ancestral de Ouro
>>>>>>> escudo-lendario
```

**Como Decodificar:**
- O que está entre `<<<<<<< HEAD` e `=======` é o que **você tinha** na branch onde está (`main`).
- O que está entre `=======` e `>>>>>>> escudo-lendario` é o que **a outra branch** quer colocar.

**A Solução:**
Apague os marcadores (`<<<<<<<`, `=======`, `>>>>>>>`) e deixe apenas o texto que a equipe concordar em manter (ou una ambos!):
```text
Item Especial: Escudo Mágico Ancestral de Ouro
```

### Passo 5: Concluindo o Merge
Após salvar o arquivo corrigido:
```bash
git add aventura.txt
git commit -m "merge: resolve conflito escolhendo o escudo de ouro"
```
Execute `git log --oneline --graph` e contemple seu histórico limpo e unido!

---

## 🛟 Missão 3: O Kit Salva-Vidas

### Caso 1: "Apaguei linhas sem querer e o código parou de rodar!"
Apague todo o conteúdo de `aventura.txt`, digite besteiras e salve.
Veja o estrago:
```bash
git status
```
Para restaurar o arquivo ao estado perfeito do último commit:
```bash
git restore aventura.txt
```
Abra o arquivo: tudo voltou intacto!

### Caso 2: "Fiz um commit errado e preciso cancelar!"
Faça uma alteração boba no arquivo:
```text
// Linha errada adicionada por engano
```
Commite:
```bash
git add aventura.txt
git commit -m "feat: commit que contem erro grave"
```

Agora pegue o código identificador desse commit no histórico:
```bash
git log --oneline -n 2
```
Suponha que o hash do commit com erro seja `a1b2c3d`. Execute:
```bash
git revert a1b2c3d
```
*(Se abrir o editor de texto do terminal, apenas salve e feche: no Nano tecle `Ctrl + O`, `Enter` e `Ctrl + X`).*

> **Por que isso é avançado?** O `git revert` não tenta reescrever o passado nem apagar histórico compartilhado. Ele cria um novo commit que anula exatamente a alteração antiga, sendo a forma recomendada em empresas!

---

##  Resumo de Bolso dos Comandos

| O que você quer fazer? | Comando |
| :--- | :--- |
| Criar e entrar numa branch | `git switch -c <nome-da-branch>` |
| Trocar de branch | `git switch <nome-da-branch>` |
| Guardar trabalho em andamento (gaveta) | `git stash` |
| Recuperar trabalho da gaveta | `git stash pop` |
| Juntar uma branch na atual | `git merge <nome-da-outra-branch>` |
| Desfazer alterações não commitadas | `git restore <arquivo>` |
| Cancelar um commit com histórico limpo | `git revert <hash-do-commit>` |
| Visualizar histórico como um mapa gráfico | `git log --graph --oneline --all` |

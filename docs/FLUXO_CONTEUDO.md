# 🔄 Fluxo do Conteúdo & Diagramas Visuais

Este documento apresenta os mapas conceituais e os fluxogramas da aula de 1h de **Git Avançado**. Use estes diagramas na sua apresentação ou imprima como mapa mental de apoio.

---

## 1. Cronograma & Fluxo da Aula (60 Minutos)

```mermaid
flowchart LR
    A["00-10m<br/><b>Mente do Git</b><br/>Snapshots & Ponteiros"] --> B["10-25m<br/><b>Paralelismo</b><br/>Branches & Git Stash"]
    B --> C["25-45m<br/><b>O Terror Desmistificado</b><br/>Merge & Conflitos Reais"]
    C --> D["45-55m<br/><b>Kit Salva-Vidas</b><br/>Restore, Revert vs Reset"]
    D --> E["55-60m<br/><b>Padrão de Mercado</b><br/>Conventional Commits & Próximos Passos"]
    
    style A fill:#e1f5fe,stroke:#0288d1,stroke-width:2px;
    style B fill:#e8f5e9,stroke:#388e3c,stroke-width:2px;
    style C fill:#fff3e0,stroke:#f57c00,stroke-width:3px;
    style D fill:#fce4ec,stroke:#c2185b,stroke-width:2px;
    style E fill:#ede7f6,stroke:#512da8,stroke-width:2px;
```

---

## 2. O Ciclo de Vida do Git & O "Armário Secreto" (Stash)

Como as alterações transitam no computador do desenvolvedor:

```mermaid
flowchart TD
    subgraph Espaço Local do Aluno
        W["Working Directory<br/>(Arquivos que você edita)"]
        S["Staging Area / Index<br/>(git add - Prontos para salvar)"]
        R["Repositório Local<br/>(git commit - Histórico definitivo)"]
        STASH["📦 Git Stash<br/>(Gaveta Secreta Temporária)"]
    end
    
    REMOTE["☁️ Repositório Remoto<br/>(GitHub / GitLab)"]

    W -- "git add" --> S
    S -- "git commit" --> R
    R -- "git push" --> REMOTE
    REMOTE -- "git pull" --> W

    W -- "git stash (guarda trabalho pela metade)" --> STASH
    STASH -- "git stash pop (devolve na tela)" --> W
    
    style STASH fill:#fff9c4,stroke:#fbc02d,stroke-dasharray: 5 5;
    style W fill:#f5f5f5,stroke:#9e9e9e;
    style S fill:#e0f2f1,stroke:#00897b;
    style R fill:#e8eaf6,stroke:#3949ab;
    style REMOTE fill:#e1f5fe,stroke:#039be5;
```

---

## 3. O Fluxo de Branches e Resolução de Conflitos

O que acontece quando duas pessoas ou branches alteram a mesma linha:

```mermaid
gitGraph
   commit id: "Commit 1 (Início)"
   commit id: "Commit 2 (Projeto Base)"
   branch feature-layout
   checkout feature-layout
   commit id: "Altera linha 5: Cor Azul"
   checkout main
   commit id: "Altera linha 5: Cor Vermelha"
   merge feature-layout id: "💥 CONFLITO! Resolvido (Cor Roxa)"
   commit id: "Commit 4 (Versão Final Estável)"
```

### Como o Git marca o Conflito:
```text
<<<<<<< HEAD (Sua branch atual: main)
Cor do Botão: Vermelha
=======
Cor do Botão: Azul
>>>>>>> feature-layout (Branch que você está trazendo)
```
**Ação do Aluno:** Apagar os marcadores e escolher:
```text
Cor do Botão: Roxa (ou uma das duas opções)
```

---

## 4. Guia Rápido: Qual Ferramenta Salva-Vidas Usar?

```mermaid
flowchart TD
    Start{"O que deu errado?"}
    
    Start -- "Editei arquivos mas ainda NÃO commitei" --> Opt1["Quero descartar as alterações do arquivo"]
    Opt1 --> Cmd1["<b>git restore arquivo.txt</b><br/>(Volta ao último commit limpo)"]
    
    Start -- "Preciso trocar de branch agora, mas meu código está pela metade" --> Opt2["Quero guardar temporariamente sem commitar"]
    Opt2 --> Cmd2["<b>git stash</b><br/>(Para recuperar depois: <b>git stash pop</b>)"]
    
    Start -- "Já fiz o commit e quero desfazer com segurança (equipe)" --> Opt3["Cria um novo commit desfazendo o anterior"]
    Opt3 --> Cmd3["<b>git revert &lt;hash_do_commit&gt;</b><br/>(Recomendado para repositórios compartilhados)"]
    
    Start -- "Fiz o commit mas quero voltar o relógio no meu PC" --> Opt4["Volta o ponteiro de commits localmente"]
    Opt4 --> Cmd4["<b>git reset --soft &lt;hash&gt;</b> (Mantém código)<br/>⚠️ <i>Evite git reset --hard</i>"]
    
    style Cmd1 fill:#c8e6c9,stroke:#2e7d32;
    style Cmd2 fill:#fff9c4,stroke:#fbc02d;
    style Cmd3 fill:#bbdefb,stroke:#1565c0;
    style Cmd4 fill:#ffcdd2,stroke:#c62828;
```

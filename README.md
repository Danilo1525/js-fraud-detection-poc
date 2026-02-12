## 🛡️ BancoElite AI — Simulação de Detecção de Fraude (PoC)

Um experimento prático de **Machine Learning "Self-Healing"** rodando **100% em JavaScript**.

Este repositório é uma **Proof of Concept (PoC)** criada para testar os limites do TensorFlow.js e da Matemática Vetorial em um ambiente Node.js puro, sem necessidade de Python.

O objetivo não é ser um sistema bancário real, mas sim um laboratório de IA onde é possível observar, em tempo real, uma rede neural "viva" aprendendo a se defender de ataques que evoluem proceduralmente.

---

## 🧪 O Experimento

Ao executar este projeto, você simula um servidor bancário que roda continuamente. O sistema gera golpistas virtuais tentando burlar a segurança enquanto a IA precisa:

### 🎓 Aprender do zero
Começa sem conhecimento prévio e aprende apenas observando padrões.

### 🔄 Adaptar-se
Quando os golpistas mudam estratégias (horários, valores e padrões), a IA precisa detectar essas mudanças e reaprender.

### 💉 Resistir
O sistema utiliza técnicas de "vacinação", corrigindo seus próprios erros sem intervenção humana.

---

## 🧠 Arquitetura Trinity Ensemble

O sistema utiliza um comitê de três agentes especializados que votam para decidir se uma transação deve ser bloqueada.

### 🧙‍♂️ O Guardião (Baseline Model)

**Perfil:** Conservador e Estável  
**Função:** Mantém o conhecimento histórico e impede que a IA esqueça golpes clássicos enquanto aprende novos.

**Tecnologia:**
- Rede Neural Feedforward  
- Learning Rate baixo  

---

### 🏹 O Caçador (Active Learner)

**Perfil:** Agressivo e Rápido  
**Função:** Foca exclusivamente nos erros recentes, utilizando Experience Replay para treinar repetidamente fraudes que passaram despercebidas.

**Tecnologia:**
- Otimizador Adam agressivo  
- Treinamento balanceado 50/50  

---

### 💾 O Cofre (Pattern Vault)

**Perfil:** Memória Matemática  
**Função:** Armazena assinaturas vetoriais de fraudes confirmadas. Se uma transação possuir distância próxima a um golpe conhecido, o bloqueio é imediato.

**Tecnologia:**
- Algoritmo KNN modificado  
- Distância Euclidiana  

---

## ⚙️ Dinâmica da Simulação

O sistema roda em loop infinito simulando dias de operação bancária.

### 🌪️ Gerador de Caos
Um algoritmo cria novas temporadas de golpes a cada **10 dias simulados**.

### 🎭 Camuflagem Dinâmica
Se a IA atinge 100% de precisão, os golpistas aumentam a dificuldade, chegando até **95% de camuflagem**, tornando fraudes matematicamente quase idênticas a transações legítimas.

---

## 🚀 Como Testar

### 📌 Pré-requisitos

- Node.js v18 ou superior

---

## 📥 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/banco-elite-ai.git

# Entre na pasta do projeto
cd banco-elite-ai

# Instale as dependências
npm install @tensorflow/tfjs
```

---

## ▶️ Execução

```bash
node fraude.js
```

Após executar, observe o terminal. Você verá os dias simulados passando e a IA tentando manter a segurança acima de 90%.

---

## 📈 Exemplo de Log

```bash
⚠️ NOVA ONDA DE GOLPES: Gen-Z #100 (Camuflagem: 95%)

📅 --- DIA 101 ---
📊 Performance: 🟢 100.0%
🏆 Créditos: Memória[0] | Caçador[1] | Guardião[0]

✅ Sistema Blindado.
```

---

## 🛠️ Tecnologias Utilizadas

- JavaScript (Node.js) → Lógica de controle e simulação  
- TensorFlow.js → Criação e treinamento das redes neurais  
- Matemática Vetorial → Normalização de dados e cálculos de distância  

---

## ⚠️ Aviso

Este projeto é educacional.

Embora utilize conceitos avançados como:

- Ensemble Learning  
- Active Learning  
- Experience Replay  
- KNN  

Ele opera sobre dados sintéticos gerados proceduralmente.

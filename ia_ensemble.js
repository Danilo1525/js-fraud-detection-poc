/**
 * SISTEMA BANCÁRIO V9 - FINAL BOSS (SELF-HEALING AI)
 * "O Guardião, O Caçador e A Memória Fotográfica + Auditoria Detalhada"
 * Objetivo: Rodar infinitamente com golpistas que tentam se camuflar quando perdem.
 */

const tf = require("@tensorflow/tfjs");

// --- 1. MÓDULO DE MEMÓRIA (COM LIMPEZA AUTOMÁTICA) ---
class CofreDePadroes {
  constructor() {
    this.padroesConhecidos = [];
    this.limiarDeSemelhanca = 0.5; // Ajustado para precisão
    this.CAPACIDADE_MAXIMA = 800;
  }

  distancia(a, b) {
    return Math.sqrt(
      a.reduce((sum, val, i) => {
        const peso = i === 4 ? 4.0 : 1.0; // Peso maior para o "DNA" do golpe (Feature Cross)
        return sum + Math.pow(val - b[i], 2) * peso;
      }, 0),
    );
  }

  adicionar(features) {
    let menorDist = Infinity;
    let indexMelhor = -1;

    for (let i = 0; i < this.padroesConhecidos.length; i++) {
      const d = this.distancia(features, this.padroesConhecidos[i].centro);
      if (d < menorDist) {
        menorDist = d;
        indexMelhor = i;
      }
    }

    if (menorDist < this.limiarDeSemelhanca) {
      const p = this.padroesConhecidos[indexMelhor];
      const count = Math.min(p.count, 50);
      for (let j = 0; j < features.length; j++) {
        p.centro[j] = (p.centro[j] * count + features[j]) / (count + 1);
      }
      p.count++;
      p.ultimaVezVisto = Date.now();
    } else {
      // Limpeza de memória se estiver cheio
      if (this.padroesConhecidos.length >= this.CAPACIDADE_MAXIMA) {
        // Remove os 10% mais antigos de uma vez para ganhar performance
        this.padroesConhecidos.sort(
          (a, b) => a.ultimaVezVisto - b.ultimaVezVisto,
        );
        this.padroesConhecidos.splice(
          0,
          Math.floor(this.CAPACIDADE_MAXIMA * 0.1),
        );
      }
      this.padroesConhecidos.push({
        centro: [...features],
        count: 1,
        ultimaVezVisto: Date.now(),
      });
    }
  }

  comparar(features) {
    if (this.padroesConhecidos.length === 0) return 0;
    let menorDist = Infinity;
    for (const p of this.padroesConhecidos) {
      const d = this.distancia(features, p.centro);
      if (d < menorDist) menorDist = d;
    }
    // Retorna confiança baseada na proximidade
    return Math.exp(-menorDist * 3.0);
  }
}

// --- 2. GERADOR DE CAOS INTELIGENTE ---
let golpeDaTemporada = {
  hMin: 0.0,
  hMax: 0.2,
  vMin: 0.8,
  vMax: 1.0,
  nome: "Clássico",
  camuflagem: 0.0, // Nível de dificuldade
};

function atualizarTemporadaDeGolpes(dia, performanceAnterior) {
  // Se a IA está indo muito bem (100%), os golpistas aumentam a camuflagem!
  if (performanceAnterior === 100) {
    // AGORA O BICHO VAI PEGAR: Aumentei o limite de 40% (0.4) para 95% (0.95)
    golpeDaTemporada.camuflagem = Math.min(
      golpeDaTemporada.camuflagem + 0.05,
      0.95,
    );
  } else {
    // Se a IA falhou, eles ficam confiantes e diminuem a camuflagem (ficam óbvios)
    golpeDaTemporada.camuflagem = Math.max(
      golpeDaTemporada.camuflagem - 0.1,
      0.0,
    );
  }

  if (dia % 10 === 0) {
    const hBase = Math.random();
    const vBase = Math.random();
    // Camuflagem tenta aproximar os valores do "meio" (0.5), onde é mais difícil detectar
    // Ajustei a fórmula para ficar MUITO difícil quando a camuflagem é alta
    const variacao = 0.15 - golpeDaTemporada.camuflagem * 0.14;

    golpeDaTemporada.hMin = Math.max(0, hBase - variacao);
    golpeDaTemporada.hMax = Math.min(1, hBase + variacao);
    golpeDaTemporada.vMin = Math.max(0, vBase - variacao);
    golpeDaTemporada.vMax = Math.min(1, vBase + variacao);
    golpeDaTemporada.nome = `Gen-Z #${dia}`;
    return true;
  }
  return false;
}

function gerarTransacoesDoDia(qtd, dia) {
  const data = [];
  for (let i = 0; i < qtd; i++) {
    let h = Math.random();
    let v = Math.random();
    let d = Math.random();
    let f = Math.random();
    let isFraude = 0;
    let tipo = "Normal";

    // GOLPE DINÂMICO
    if (
      h > golpeDaTemporada.hMin &&
      h < golpeDaTemporada.hMax &&
      v > golpeDaTemporada.vMin &&
      v < golpeDaTemporada.vMax
    ) {
      isFraude = 1;
      tipo = golpeDaTemporada.nome;
    }

    // Ruído inteligente
    if (isFraude === 1 && Math.random() > 0.98) isFraude = 0;
    if (isFraude === 0 && Math.random() < 0.002) isFraude = 1;

    const cross = h * v;
    data.push({ features: [h, v, d, f, cross], label: isFraude, tipo });
  }
  return data;
}

// --- 3. FÁBRICA DE CÉREBROS ---
function criarModelo(learningRate) {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ inputShape: [5], units: 32, activation: "relu" }),
  );
  model.add(tf.layers.dense({ units: 16, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));
  model.compile({
    optimizer: tf.train.adam(learningRate),
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });
  return model;
}

// --- 4. SISTEMA DE ELITE COM AUDITORIA ---
class BancoElite {
  constructor() {
    this.guardiao = criarModelo(0.001);
    this.cacador = criarModelo(0.05);
    this.cofre = new CofreDePadroes();
    this.memoriaCacador = [];
    // Estatísticas de quem pega mais ladrão
    this.stats = { Guardiao: 0, Cacador: 0, Memoria: 0 };
  }

  async treinarInicial(dados) {
    console.log("🎓 Inicializando Redes Neurais...");
    const xs = tf.tensor2d(dados.map((d) => d.features));
    const ys = tf.tensor2d(
      dados.map((d) => d.label),
      [dados.length, 1],
    );
    await this.guardiao.fit(xs, ys, { epochs: 10, verbose: 0 });
    await this.cacador.fit(xs, ys, { epochs: 10, verbose: 0 });
    dados
      .filter((d) => d.label === 1)
      .forEach((d) => this.cofre.adicionar(d.features));
  }

  async analisar(transacoes) {
    const xs = tf.tensor2d(transacoes.map((d) => d.features));
    const pG = await this.guardiao.predict(xs).data();
    const pC = await this.cacador.predict(xs).data();

    const resultados = [];
    this.stats = { Guardiao: 0, Cacador: 0, Memoria: 0 }; // Reseta stats do dia

    for (let i = 0; i < transacoes.length; i++) {
      const pMemoria = this.cofre.comparar(transacoes[i].features);
      let riscoFinal = Math.max(pG[i], pC[i], pMemoria);

      // AUDITORIA: Quem foi o responsável pelo bloqueio?
      if (riscoFinal > 0.5 && transacoes[i].label === 1) {
        if (pMemoria >= pG[i] && pMemoria >= pC[i]) this.stats.Memoria++;
        else if (pC[i] >= pG[i]) this.stats.Cacador++;
        else this.stats.Guardiao++;
      }

      resultados.push({
        risco: riscoFinal,
        detalhes: { pG: pG[i], pC: pC[i], pMemoria },
        labelReal: transacoes[i].label,
      });
    }
    return resultados;
  }

  async aprender(errosDoDia, normaisDoDia) {
    // 1. MEMÓRIA
    errosDoDia.forEach((erro) => this.cofre.adicionar(erro.features));

    // 2. RETREINO
    if (errosDoDia.length > 0) {
      // Guardião
      const mix = [...errosDoDia, ...normaisDoDia.slice(0, 100)];
      const xs = tf.tensor2d(mix.map((d) => d.features));
      const ys = tf.tensor2d(
        mix.map((d) => d.label),
        [mix.length, 1],
      );
      await this.guardiao.fit(xs, ys, { epochs: 1, verbose: 0 });

      // Caçador
      this.memoriaCacador.push(...errosDoDia);
      if (this.memoriaCacador.length > 200) this.memoriaCacador.shift();

      const batchErros = [...this.memoriaCacador];
      const batchNormais = normaisDoDia.slice(0, batchErros.length);
      const treinoAgressivo = [...batchErros, ...batchNormais];

      const xsC = tf.tensor2d(treinoAgressivo.map((d) => d.features));
      const ysC = tf.tensor2d(
        treinoAgressivo.map((d) => d.label),
        [treinoAgressivo.length, 1],
      );
      await this.cacador.fit(xsC, ysC, { epochs: 20, verbose: 0 });
    }
  }
}

// --- 5. SIMULAÇÃO INFINITA ---
async function iniciar() {
  console.log("🛡️ INICIANDO SISTEMA V9 (FINAL)...");
  const banco = new BancoElite();
  const dadosBase = gerarTransacoesDoDia(1000, 1);
  await banco.treinarInicial(dadosBase);

  let dia = 1;
  let ultimaPerformance = 100;

  while (true) {
    const mudou = atualizarTemporadaDeGolpes(dia, ultimaPerformance);
    if (mudou) {
      const dificuldade = (golpeDaTemporada.camuflagem * 100).toFixed(0);
      console.log(
        `\n⚠️  NOVA ONDA DE GOLPES: ${golpeDaTemporada.nome} (Camuflagem: ${dificuldade}%)`,
      );
    }

    console.log(`\n📅 --- DIA ${dia} ---`);
    const transacoes = gerarTransacoesDoDia(300, dia);
    const resultados = await banco.analisar(transacoes);

    const errosParaAprender = [];
    const normaisParaAprender = [];
    let fraudesPassaram = 0;
    let fraudesPegas = 0;

    resultados.forEach((res, i) => {
      const eraFraude = res.labelReal === 1;
      const sistemaDisse = res.risco > 0.5;

      if (eraFraude && !sistemaDisse) {
        fraudesPassaram++;
        errosParaAprender.push(transacoes[i]);
      } else if (eraFraude && sistemaDisse) fraudesPegas++;
      if (!eraFraude) normaisParaAprender.push(transacoes[i]);
    });

    const total = fraudesPegas + fraudesPassaram;
    ultimaPerformance = total > 0 ? (fraudesPegas / total) * 100 : 100;
    let icone =
      ultimaPerformance > 90 ? "🟢" : ultimaPerformance > 50 ? "🟡" : "🔴";

    console.log(`   📊 Performance: ${icone} ${ultimaPerformance.toFixed(1)}%`);

    // AUDITORIA: MOSTRAR QUEM PEGOU O LADRÃO
    if (fraudesPegas > 0) {
      console.log(
        `      🏆 Créditos: Memória[${banco.stats.Memoria}] | Caçador[${banco.stats.Cacador}] | Guardião[${banco.stats.Guardiao}]`,
      );
    }

    if (fraudesPassaram > 0) {
      console.log(
        `   🚨 FALHA: ${fraudesPassaram} fraudes passaram. Aplicando Vacina...`,
      );
      await banco.aprender(errosParaAprender, normaisParaAprender);
    } else {
      console.log(`   ✅ Sistema Blindado.`);
    }

    dia++;
    await new Promise((r) => setTimeout(r, 1000));
  }
}

iniciar();

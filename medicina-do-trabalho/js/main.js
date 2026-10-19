/* Prumo Saúde Ocupacional — script do site
   Troque o número abaixo pelo WhatsApp do cliente (DDI 55 + DDD + número, só dígitos).
   Os links wa.me no index.html também usam este número: busque por "wa.me". */
var WHATSAPP = '5547999990001';

(function () {
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.href = 'https://wa.me/' + WHATSAPP + '?text=' +
      encodeURIComponent('Olá! Vim pelo site e gostaria de um orçamento de saúde ocupacional.');
  }

  // Menu mobile
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('menu');
  function fecharMenu() {
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menu');
  }
  btn.addEventListener('click', function () {
    var aberto = menu.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(aberto));
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(); });

  /* ---------- Diagnóstico rápido ---------- */
  var diag = document.getElementById('diag');
  var itens = diag.querySelectorAll('input[name=d]');
  var barras = diag.querySelectorAll('.diag__barra i');
  var nEl = document.getElementById('diag-n');
  var txt = document.getElementById('diag-txt');
  var cta = document.getElementById('diag-cta');
  var total = itens.length;
  var tocou = false;

  function pendencias() {
    return Array.prototype.filter.call(itens, function (i) { return !i.checked; })
      .map(function (i) { return i.value; });
  }

  function atualizar() {
    var feitos = total - pendencias().length;
    barras.forEach(function (b, idx) { b.classList.toggle('on', idx < feitos); });
    nEl.textContent = feitos + ' de ' + total;

    if (!tocou) {
      diag.removeAttribute('data-nivel');
      txt.textContent = 'Marque os itens para ver o resultado.';
      cta.textContent = 'Quero regularizar o que falta';
      return;
    }
    if (feitos === total) {
      diag.setAttribute('data-nivel', 'ok');
      txt.textContent = 'Tudo em dia. O próximo passo é não deixar vencer: a gente avisa antes de cada prazo.';
      cta.textContent = 'Quero acompanhamento dos prazos';
    } else if (feitos >= 3) {
      diag.setAttribute('data-nivel', 'medio');
      txt.textContent = 'Boa base, mas ' + (total - feitos) + (total - feitos === 1 ? ' item pendente pode' : ' itens pendentes podem') + ' gerar autuação na fiscalização ou no eSocial.';
      cta.textContent = 'Quero regularizar o que falta';
    } else {
      diag.setAttribute('data-nivel', 'baixo');
      txt.textContent = 'Prioridade: sem esses documentos a empresa fica exposta a multas e a riscos em ações trabalhistas.';
      cta.textContent = 'Quero regularizar o que falta';
    }
  }

  diag.addEventListener('change', function () { tocou = true; atualizar(); });
  diag.addEventListener('submit', function (e) { e.preventDefault(); });

  // Leva as pendências para o formulário de orçamento
  cta.addEventListener('click', function () {
    var p = pendencias();
    var obs = document.getElementById('obs');
    if (tocou) {
      obs.value = p.length
        ? 'Pendências marcadas no diagnóstico do site: ' + p.join(', ') + '.'
        : 'Diagnóstico do site: tudo em dia. Quero acompanhamento dos prazos.';
    }
    var mapa = { 'PGR atualizado': 'PGR', 'PCMSO vigente': 'PCMSO', 'ASOs periódicos em dia': 'Exames / ASO',
      'S-2220 enviado ao eSocial': 'eSocial SST', 'S-2240 enviado ao eSocial': 'eSocial SST', 'LTCAT atualizado': 'LTCAT' };
    if (tocou) {
      p.forEach(function (item) {
        var chip = document.querySelector('#necessidades input[value="' + mapa[item] + '"]');
        if (chip) chip.checked = true;
      });
    }
  });

  atualizar();

  /* ---------- Formulário de orçamento → WhatsApp ---------- */
  var tel = document.getElementById('tel');
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 0) out = '(' + d.slice(0, 2);
    if (d.length >= 3) out += ') ' + d.slice(2, d.length > 10 ? 7 : 6);
    if (d.length >= 7) out += '-' + d.slice(d.length > 10 ? 7 : 6);
    tel.value = out;
  });

  var form = document.getElementById('form');
  var ok = document.getElementById('form-ok');

  function erro(id, campo, msg) {
    document.getElementById(id + '-erro').textContent = msg || '';
    if (campo && campo.type !== 'checkbox') campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nec = Array.prototype.map.call(form.querySelectorAll('input[name=nec]:checked'), function (i) { return i.value; });
    var digitos = form.tel.value.replace(/\D/g, '');

    var v = [
      erro('empresa', form.empresa, form.empresa.value.trim().length < 2 ? 'Informe o nome da empresa.' : ''),
      erro('porte', form.porte, !form.porte.value ? 'Selecione o número de colaboradores.' : ''),
      erro('nome', form.nome, form.nome.value.trim().length < 2 ? 'Informe seu nome.' : ''),
      erro('tel', form.tel, digitos.length < 10 ? 'Informe um WhatsApp com DDD, por exemplo (47) 99999-9999.' : ''),
      erro('nec', null, !nec.length ? 'Marque pelo menos um serviço.' : ''),
      erro('lgpd', form.lgpd, !form.lgpd.checked ? 'Para continuar, autorize o contato.' : '')
    ];

    if (v.indexOf(false) !== -1) {
      var primeiro = form.querySelector('[aria-invalid=true]');
      if (primeiro) primeiro.focus();
      else if (!nec.length) form.querySelector('input[name=nec]').focus();
      else form.lgpd.focus();
      return;
    }

    var msg = 'Olá! Gostaria de um orçamento de saúde ocupacional.\n\n' +
      'Empresa: ' + form.empresa.value.trim() + '\n' +
      'Colaboradores: ' + form.porte.value + '\n' +
      'Contato: ' + form.nome.value.trim() + ' · ' + form.tel.value + '\n' +
      'Precisa de: ' + nec.join(', ') +
      (form.obs.value.trim() ? '\n\nObservações: ' + form.obs.value.trim() : '');

    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    ok.hidden = false;
    form.reset();
  });
})();

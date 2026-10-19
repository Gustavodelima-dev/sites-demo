/* Sereno Odontologia — script do site
   Troque o número abaixo pelo WhatsApp do cliente (DDI 55 + DDD + número, só dígitos).
   Os links wa.me no index.html também usam este número: busque por "wa.me". */
var WHATSAPP = '5547999990000';

document.documentElement.classList.add('js');

(function () {
  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  // Botão flutuante com mensagem pronta
  var waFloat = document.getElementById('wa-float');
  if (waFloat) {
    waFloat.href = 'https://wa.me/' + WHATSAPP + '?text=' +
      encodeURIComponent('Olá! Vim pelo site e gostaria de agendar uma avaliação.');
  }

  // Borda do topo ao rolar
  var topo = document.getElementById('topo');
  var onScroll = function () { topo.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

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

  // Máscara de telefone: (47) 99999-9999
  var tel = document.getElementById('tel');
  tel.addEventListener('input', function () {
    var d = tel.value.replace(/\D/g, '').slice(0, 11);
    var out = d;
    if (d.length > 0) out = '(' + d.slice(0, 2);
    if (d.length >= 3) out += ') ' + d.slice(2, d.length > 10 ? 7 : 6);
    if (d.length >= 7) out += '-' + d.slice(d.length > 10 ? 7 : 6);
    tel.value = out;
  });

  // Formulário → WhatsApp
  var form = document.getElementById('form');
  var ok = document.getElementById('form-ok');

  function erro(campo, msg) {
    var el = document.getElementById(campo.id + '-erro');
    el.textContent = msg || '';
    if (campo.type !== 'checkbox') campo.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = form.nome, fone = form.tel, lgpd = form.lgpd;
    var digitos = fone.value.replace(/\D/g, '');

    var v1 = erro(nome, nome.value.trim().length < 2 ? 'Informe seu nome.' : '');
    var v2 = erro(fone, digitos.length < 10 ? 'Informe um WhatsApp com DDD, por exemplo (47) 99999-9999.' : '');
    var v3 = erro(lgpd, !lgpd.checked ? 'Para continuar, autorize o contato.' : '');

    if (!(v1 && v2 && v3)) {
      var primeiro = form.querySelector('[aria-invalid=true]') || (!v3 ? lgpd : null);
      if (primeiro) primeiro.focus();
      return;
    }

    var periodo = form.querySelector('input[name=periodo]:checked').value;
    var msg = 'Olá! Gostaria de agendar uma avaliação.\n\n' +
      'Nome: ' + nome.value.trim() + '\n' +
      'WhatsApp: ' + fone.value + '\n' +
      'Assunto: ' + form.motivo.value + '\n' +
      'Melhor período: ' + periodo;

    var url = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    document.getElementById('form-wa').href = url;
    window.open(url, '_blank', 'noopener');
    ok.hidden = false;
    form.reset();
  });
})();

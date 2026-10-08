/* Batistela — interações da página */
(function () {
  'use strict';

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Revelar seções ao rolar
  var alvos = document.querySelectorAll('.card, .steps li, .quotes blockquote, .section-head, .split > *');
  alvos.forEach(function (el) { el.classList.add('reveal'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    alvos.forEach(function (el) { io.observe(el); });
  } else {
    alvos.forEach(function (el) { el.classList.add('in'); });
  }

  // Formulário de contato: validação + envio via WhatsApp/e-mail
  var form = document.getElementById('form-contato');
  if (!form) return;
  var status = form.querySelector('.form-status');

  function marcar(campo, invalido) {
    campo.setAttribute('aria-invalid', invalido ? 'true' : 'false');
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var nome = form.nome, email = form.email, msg = form.mensagem;
    var ok = true;
    [nome, email, msg].forEach(function (c) {
      var vazio = !c.value.trim();
      marcar(c, vazio);
      if (vazio) ok = false;
    });
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    if (!emailOk) { marcar(email, true); ok = false; }
    if (!ok) {
      status.className = 'form-status err';
      status.textContent = 'Preencha nome, e-mail válido e mensagem para continuar.';
      return;
    }

    // Monta a mensagem e abre o cliente de e-mail (troque por um endpoint de backend quando houver).
    var corpo = [
      'Nome: ' + nome.value.trim(),
      'E-mail: ' + email.value.trim(),
      'Telefone: ' + (form.telefone.value.trim() || '-'),
      'Empresa: ' + (form.empresa.value.trim() || '-'),
      'Interesse: ' + form.interesse.value,
      '',
      msg.value.trim()
    ].join('\n');
    var destino = 'contato@batistela.com.br';
    var assunto = 'Contato pelo site — ' + (form.empresa.value.trim() || nome.value.trim());
    window.location.href = 'mailto:' + destino +
      '?subject=' + encodeURIComponent(assunto) +
      '&body=' + encodeURIComponent(corpo);

    status.className = 'form-status ok';
    status.textContent = 'Abrindo seu e-mail para envio. Se preferir, fale conosco pelo WhatsApp.';
    form.reset();
  });
})();

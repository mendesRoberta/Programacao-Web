document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('a[href^="#"]');
  const saibaMaisBtn = document.getElementById('btn-saiba-mais');
  const temaBtn = document.getElementById('btn-tema');
  const nomeInput = document.getElementById('input-nome');
  const heroTexto = document.querySelector('.hero-texto');
  const logoImages = document.querySelectorAll('.logo-image, .footer-logo-image');

  const atualizarLogoTema = () => {
    const temaEscuroAtivo = document.body.classList.contains('dark-mode');
    const mobile = window.innerWidth <= 700;

    logoImages.forEach((logoImage) => {
      const usarLogoMobile = mobile || temaEscuroAtivo;
      logoImage.src = usarLogoMobile ? 'imagens/logo-doramania.png' : 'imagens/doramania_logo.jpg';
    });
  };

  const mostrarMensagemBoasVindas = () => {
    if (!nomeInput || !heroTexto) return;

    const nome = nomeInput.value.trim();
    const nomeFinal = nome || 'dorameiro';

    let mensagem = document.getElementById('saiba-mais-mensagem');
    if (!mensagem) {
      mensagem = document.createElement('p');
      mensagem.id = 'saiba-mais-mensagem';
      mensagem.className = 'saiba-mais-mensagem';
      heroTexto.appendChild(mensagem);
    }

    mensagem.textContent = `Bem-vindo(a), ${nomeFinal}! Vamos descobrir seu próximo K-drama favorito.`;
  };

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  if (saibaMaisBtn) {
    saibaMaisBtn.addEventListener('click', () => {
      const generoSection = document.getElementById('generos');

      if (generoSection) {
        generoSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  if (nomeInput) {
    nomeInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        mostrarMensagemBoasVindas();
      }
    });

    nomeInput.addEventListener('blur', () => {
      mostrarMensagemBoasVindas();
    });
  }

  if (temaBtn) {
    temaBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const darkModeAtivo = document.body.classList.contains('dark-mode');
      temaBtn.textContent = darkModeAtivo ? 'Modo claro' : 'Modo escuro';
      atualizarLogoTema();
    });
  }

  window.addEventListener('resize', atualizarLogoTema);
  atualizarLogoTema();

  document.querySelectorAll('.btn-curtir').forEach((botao) => {
    botao.addEventListener('click', () => {
      const contador = botao.querySelector('.contador');
      if (!contador) return;

      const valorAtual = Number(contador.textContent) || 0;
      contador.textContent = String(valorAtual + 1);
      botao.disabled = true;
      botao.style.opacity = '0.8';
    });
  });
});

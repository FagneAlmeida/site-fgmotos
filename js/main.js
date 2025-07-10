// --- CORREÇÃO PARA A ROLAGEM INICIAL (VERSÃO 3 - MAIS FORTE) ---

// 1. Diz ao navegador para não tentar restaurar a posição de scroll sozinho.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}


// --- CÓDIGO PRINCIPAL DA APLICAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    // 2. Força a rolagem para o topo duas vezes para combater o layout shift.
    // A primeira vez acontece imediatamente.
    window.scrollTo(0, 0);
    // A segunda vez acontece um momento depois, para corrigir qualquer
    // ajuste que o navegador faça após o primeiro scroll.
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100); // Atraso de 100 milissegundos.


    // Ativa os ícones do Lucide
    lucide.createIcons();

    // --- LAZY LOAD PARA O IFRAME DO CHATBOT ---
    // Esta é a solução principal para o problema de rolagem.
    // O iframe só será carregado quando o utilizador rolar até ele.
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection) {
        const iframeObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const chatbotIframe = entry.target.querySelector('iframe');
                    // Verifica se o iframe existe e se tem o atributo data-src
                    if (chatbotIframe && chatbotIframe.dataset.src) {
                        chatbotIframe.src = chatbotIframe.dataset.src; // Atribui o src para começar a carregar
                        observer.unobserve(entry.target); // Para de observar depois de carregar
                    }
                }
            });
        }, { rootMargin: '50px' }); // Começa a carregar quando estiver a 50px de distância

        iframeObserver.observe(chatbotSection);
    }


    // --- LÓGICA DO MODAL DE ARTIGOS ---
    const articleModal = document.getElementById('article-modal');
    const articleModalBody = document.getElementById('article-modal-body');
    const closeArticleModalBtn = document.getElementById('close-article-modal');

    // Função para abrir o modal com o artigo
    const openArticleModal = async (articleName) => {
        if (!articleName || !articleModal || !articleModalBody) return;
        articleModalBody.innerHTML = `<div class="p-12 text-center text-gray-400">A carregar artigo...</div>`;
        articleModal.classList.remove('hidden');
        articleModal.classList.add('flex');
        document.body.style.overflow = 'hidden';

        try {
            const response = await fetch(`artigos/${articleName}.html`);
            if (!response.ok) throw new Error('Artigo não encontrado.');
            
            const articleHtml = await response.text();
            articleModalBody.innerHTML = articleHtml;
            
            lucide.createIcons();

            const backButtonInArticle = articleModalBody.querySelector('.back-to-home');
            if (backButtonInArticle) {
                backButtonInArticle.parentElement.remove();
            }

        } catch (error) {
            console.error("Erro ao carregar o artigo:", error);
            articleModalBody.innerHTML = `<div class="p-12 text-center text-red-400">Desculpe, não foi possível carregar o artigo. Tente novamente mais tarde.</div>`;
        }
    };

    // Função para fechar o modal do artigo
    const closeArticleModal = () => {
        if (!articleModal) return;
        articleModal.classList.add('hidden');
        articleModal.classList.remove('flex');
        articleModalBody.innerHTML = '';
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-article]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const articleName = link.dataset.article;
            openArticleModal(articleName);
        });
    });

    if (closeArticleModalBtn) {
        closeArticleModalBtn.addEventListener('click', closeArticleModal);
    }
    if (articleModal) {
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                closeArticleModal();
            }
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && articleModal && !articleModal.classList.contains('hidden')) {
            closeArticleModal();
        }
    });


    // --- OUTRAS FUNCIONALIDADES (MENU, FORMULÁRIO, GALERIA) ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        mobileMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') mobileMenu.classList.add('hidden');
        });
    }

    const agendamentoForm = document.getElementById('agendamento-form');
    if (agendamentoForm) {
        agendamentoForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const fullName = document.getElementById('full-name').value;
            const phone = document.getElementById('phone').value;
            const motoModel = document.getElementById('moto-model').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            const whatsappNumber = "5567999271603";
            let preFilledMessage = `Olá! Gostaria de solicitar um agendamento.\n\n*Nome:* ${fullName}\n*Telefone:* ${phone}\n*Moto:* ${motoModel}\n*Serviço Desejado:* ${service}\n`;
            if (message) preFilledMessage += `*Mensagem Adicional:* ${message}\n`;
            const encodedMessage = encodeURIComponent(preFilledMessage);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
            const formConfirmation = document.getElementById('form-confirmation');
            if (formConfirmation) {
                formConfirmation.innerHTML = `<p class="text-green-400 mt-4 text-center">A abrir o WhatsApp... Por favor, envie a mensagem que preparámos para si!</p>`;
                setTimeout(() => { formConfirmation.innerHTML = ''; }, 7000);
            }
            agendamentoForm.reset();
        });
    }

    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalBtn = document.getElementById('close-modal');
    if (imageModal && modalImage && closeModalBtn) {
        document.querySelectorAll('.clickable-image').forEach(item => {
            item.addEventListener('click', function() {
                const imgElement = this.querySelector('img');
                if (imgElement && imgElement.src && !imgElement.src.includes('placehold.co')) {
                    modalImage.src = imgElement.src;
                    imageModal.classList.remove('hidden');
                    imageModal.classList.add('flex');
                }
            });
        });
        const closeImageModal = () => {
            imageModal.classList.add('hidden');
            imageModal.classList.remove('flex');
        };
        closeModalBtn.addEventListener('click', closeImageModal);
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) closeImageModal();
        });
    }

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});

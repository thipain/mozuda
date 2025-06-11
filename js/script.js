document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica da Contagem de Tempo do Namoro ---
    // ATENÇÃO: Mude esta data para o dia exato do início do namoro de vocês (ANO-MÊS-DIA).
    const startDate = new Date('2023-01-20T00:00:00'); // Exemplo: 20 de Janeiro de 2023

    const yearsSpan = document.getElementById('years');
    const monthsSpan = document.getElementById('months');
    const daysSpan = document.getElementById('days');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date();
        const diff = now.getTime() - startDate.getTime(); // Diferença em milissegundos

        // Calcula segundos, minutos, horas e dias totais
        const totalSeconds = Math.floor(diff / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);

        // Cálculos de anos, meses e dias específicos para a contagem 'Juntos há:'
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let remainingDays = now.getDate() - startDate.getDate();

        // Ajusta meses e anos se o dia atual for menor que o dia de início
        if (remainingDays < 0) {
            months--;
            // Calcula o número de dias no mês anterior para ajustar 'remainingDays'
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            remainingDays += prevMonth.getDate();
        }

        // Ajusta anos se o mês atual for menor que o mês de início
        if (months < 0) {
            years--;
            months += 12;
        }

        // Calcula as unidades de tempo para exibição (segundos, minutos, horas dentro de seu ciclo)
        const displaySeconds = totalSeconds % 60;
        const displayMinutes = totalMinutes % 60;
        const displayHours = totalHours % 24;

        // Atualiza os elementos HTML
        yearsSpan.textContent = years;
        monthsSpan.textContent = months;
        daysSpan.textContent = remainingDays; // Exibe os dias "restantes" dentro do mês atual
        hoursSpan.textContent = displayHours;
        minutesSpan.textContent = displayMinutes;
        secondsSpan.textContent = displaySeconds;
    }

    // Atualiza a contagem a cada segundo
    setInterval(updateCountdown, 1000);
    // Chama a função uma vez ao carregar para evitar um atraso inicial na exibição
    updateCountdown();

    // --- Lógica do Carrossel de Fotos ---
    // ATENÇÃO: Adicione os caminhos das suas fotos aqui.
    // Certifique-se de que as imagens estão na pasta 'mozuda/images/'
    const carouselImages = [
        'images/foto1.jpg',
        'images/foto2.jpg',
        'images/foto3.png', // Exemplo com outra extensão
        // Adicione mais fotos aqui: 'images/sua_outra_foto.jpg', etc.
    ];

    const carouselContainer = document.querySelector('.carousel-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0; // Começa na primeira imagem (índice 0)

    // Adiciona as imagens ao DOM (Document Object Model)
    carouselImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Nossa foto ${index + 1}`; // Texto alternativo para acessibilidade
        img.classList.add('carousel-item'); // Adiciona a classe 'carousel-item' para estilização e animação
        if (index === 0) {
            img.classList.add('active'); // Torna a primeira imagem visível por padrão
        }
        carouselContainer.appendChild(img);
    });

    const images = carouselContainer.querySelectorAll('.carousel-item'); // Seleciona todas as imagens com a classe 'carousel-item'

    // Função para mostrar a imagem no índice especificado
    function showImage(index) {
        // Primeiro remove a classe 'active' de todas as imagens para iniciar o fade-out
        images.forEach(img => img.classList.remove('active'));

        // Usa um pequeno timeout para garantir que o navegador processe a remoção
        // antes de adicionar a classe 'active' à próxima imagem. Isso é crucial para
        // que a transição de opacidade funcione corretamente.
        setTimeout(() => {
            if (images[index]) { // Verifica se o índice é válido
                images[index].classList.add('active'); // Adiciona a classe 'active' à imagem atual para o fade-in
            }
        }, 10); // Pequeno atraso (10ms)
    }

    // Event listener para o botão "anterior"
    prevBtn.addEventListener('click', () => {
        currentIndex--; // Decrementa o índice
        if (currentIndex < 0) {
            currentIndex = images.length - 1; // Volta para a última imagem se estiver na primeira
        }
        showImage(currentIndex);
    });

    // Event listener para o botão "próximo"
    nextBtn.addEventListener('click', () => {
        currentIndex++; // Incrementa o índice
        if (currentIndex >= images.length) {
            currentIndex = 0; // Volta para a primeira imagem se estiver na última
        }
        showImage(currentIndex);
    });

    // --- Auto-avanço do carrossel ---
    // Faz o carrossel avançar automaticamente a cada 3 segundos (3000 milissegundos)
    setInterval(() => {
        nextBtn.click(); // Simula um clique no botão "próximo", ativando sua lógica
    }, 3000);

    // --- NOVO CÓDIGO: Efeito de Corações Flutuantes ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        document.body.appendChild(heart);

        const size = Math.random() * 20 + 10; // Tamanho aleatório entre 10px e 30px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${Math.random() * 100}vw`; // Posição horizontal aleatória (viewport width)
        
        // Define uma var CSS para o X final, para que cada coração termine em um lugar diferente
        const endX = (Math.random() - 0.5) * 400; // Valor entre -200 e 200px
        heart.style.setProperty('--end-x', `${endX}px`);

        heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duração da animação entre 5 e 10 segundos
        heart.style.animationDelay = `${Math.random() * 2}s`; // Atraso para aparecerem em momentos diferentes

        // Remove o coração do DOM após a animação para evitar acúmulo e melhorar a performance
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }

    // Cria um novo coração a cada 300ms
    setInterval(createHeart, 300);

    // Opcional: Criar alguns corações iniciais para preencher a tela rapidamente
    // Ajuste o número se quiser mais ou menos corações no início
    for (let i = 0; i < 20; i++) {
        createHeart();
    }
});
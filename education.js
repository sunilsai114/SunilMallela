document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;
    let isAnimating = false;

    function initializePages() {
        pages.forEach((page, index) => {
            // Set initial states
            if (index === 0) {
                page.style.zIndex = pages.length;
            } else {
                page.style.zIndex = pages.length - index;
            }
        });

        // Add mouse move effect for 3D appearance
        document.querySelector('.book').addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const mouseX = e.clientX - left;
            const mouseY = e.clientY - top;
            
            const rotateY = ((mouseX - width/2) / width) * 10;
            const rotateX = ((mouseY - height/2) / height) * -10;
            
            this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });

        // Reset transform on mouse leave
        document.querySelector('.book').addEventListener('mouseleave', function() {
            this.style.transform = 'none';
        });
    }

    function nextPage() {
        if (currentPage >= pages.length - 1 || isAnimating) return;
        isAnimating = true;

        const currentPageEl = pages[currentPage];
        currentPageEl.classList.add('flipped');
        currentPageEl.style.zIndex = currentPage;

        setTimeout(() => {
            isAnimating = false;
            currentPage++;
        }, 800); // Match this with the CSS transition duration
    }

    function prevPage() {
        if (currentPage <= 0 || isAnimating) return;
        isAnimating = true;

        const currentPageEl = pages[currentPage - 1];
        currentPageEl.classList.remove('flipped');
        currentPageEl.style.zIndex = pages.length - currentPage;

        setTimeout(() => {
            isAnimating = false;
            currentPage--;
        }, 800); // Match this with the CSS transition duration
    }

    // Add click handlers
    document.addEventListener('click', (e) => {
        const book = document.querySelector('.book');
        const { left, width } = book.getBoundingClientRect();
        const mouseX = e.clientX - left;

        if (mouseX > width / 2) {
            nextPage();
        } else {
            prevPage();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextPage();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            prevPage();
        }
    });

    // Initialize
    initializePages();
}); 
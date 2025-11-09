// For Hero paralax effect
document.addEventListener('mousemove', parallax);

function parallax(e) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const normalizedX = mouseX / windowWidth;
    const normalizedY = mouseY / windowHeight;

    const moon = document.getElementById('moon');
    const earth = document.getElementById('earth');
    const astranout = document.getElementById('astranout');
    const text = document.getElementById('text');
    const merkuarius = document.getElementById('merkuarius');
    const saturnus = document.getElementById('saturnus');

    moon.style.transform = `translateX(${10 - mouseX * 0.02}px) translateY(${-100 - mouseY * 0.02}px)`;
    
    earth.style.transform = `translateX(${-13.5 - mouseX * 0.008}%) translateY(${80 + mouseY * 0.01}px)`;
    
    astranout.style.transform = `translateX(${-53 - mouseX * 0.015}%) translateY(${150 + mouseY * 0.015}px)`;
    
    merkuarius.style.transform = `translateX(${20 - mouseX * 0.01}%) translateY(${-90 + mouseY * 0.01}px)`;
    
    saturnus.style.transform = `translateX(${-300 - mouseX * 0.02}%) translateY(${-500 + mouseY * 0.02}px)`;
    
    text.style.transform = `translateX(${-mouseX * 0.02}px) translateY(${-mouseY * 0.02}px)`;

    // Debugging (optional)
    if (false) { 
        console.log('Mouse position:', mouseX, mouseY);
        console.log('Earth transform:', earth.style.transform);
    }
}

// shooting star for Hero
function createShootingStars(delay = 0) {
    const heroSection = document.querySelector('.hero');
    
    const existingStars = document.querySelectorAll('.shooting-star');
    existingStars.forEach(star => star.remove());
    
    if (delay > 0) {
        setTimeout(() => {
            createShootingStarsWithAnimation();
        }, delay * 1000);
        return;
    }
    
    createShootingStarsWithAnimation();
    function createShootingStarsWithAnimation() {
        const starCount = 5 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            star.style.animationDuration = `10s`;
            
            const angle = 215 + (Math.random() * 30 - 15);
            star.style.setProperty('--angle', `${angle}deg`);
            
            heroSection.appendChild(star);
        }
        
        const animationDuration = 10; 
        const pauseDuration = 3; 
        setTimeout(createShootingStars, (animationDuration + pauseDuration) * 1000);
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const style = document.createElement('style');
    style.textContent = `
        .shooting-star {
            transform: rotate(var(--angle, 215deg)) translateX(0);
        }
        @keyframes shooting {
            0% {
                transform: rotate(var(--angle, 215deg)) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            70% {
                opacity: 1;
            }
            100% {
                transform: rotate(var(--angle, 215deg)) translateX(-500px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    createShootingStars();
});

// navbar scroll
function handleScroll() {
    const navbar = document.querySelector('nav');
    const scrollPosition = window.scrollY;

    
    if (scrollPosition > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Shooting star for body
document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
});

function createAboutShootingStars() {
    const aboutSection = document.querySelector('.about');
    
    document.querySelectorAll('.about-shooting-star').forEach(star => star.remove());
    
    const starCount = 5;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'about-shooting-star';
        
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        const angle = 215 + (Math.random() * 30 - 15);
        star.style.setProperty('--angle', `${angle}deg`);
        
        aboutSection.appendChild(star);
    }
    
    setTimeout(createAboutShootingStars, 10000);
}

document.addEventListener('DOMContentLoaded', () => {
    createAboutShootingStars();
});

// Animation for neptunus
function animateNeptuneSection() {
    const section = document.querySelector('.content-1');
    const title = document.querySelector('.neptune-title');
    const content = document.querySelector('.neptune-content');
    const image = document.querySelector('#neptune');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    title.textContent = '';
                    content.textContent = '';
                    
                    title.classList.add('typing');
                    
                    // Animasi judul
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
});

// Animation for uranus
function animateUranusSection() {
    const section = document.querySelector('.content-2');
    const title = document.querySelector('.uranus-title');
    const content = document.querySelector('.uranus-content');
    const image = document.querySelector('#uranus');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    title.textContent = '';
                    content.textContent = '';
                    
                    title.classList.add('typing');
                    
                    // Animasi judul
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); 
                        }
                    }, 100); 
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}


document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection(); 
});

// animation for saturn
function animateSaturnusSection() {
    const section = document.querySelector('.content-3');
    const title = document.querySelector('.saturn-title');
    const content = document.querySelector('.saturn-content');
    const image = document.querySelector('#saturn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Simpan teks asli
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Kosongkan teks untuk animasi
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Animasi judul
                    title.classList.add('typing');
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection();
    animateSaturnusSection(); 
});

function animateJupiterSection() {
    const section = document.querySelector('.content-4');
    const title = document.querySelector('.jupiter-title');
    const content = document.querySelector('.jupiter-content');
    const image = document.querySelector('#jupiter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate image
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Save original text
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Clear text for animation
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Add typing class
                    title.classList.add('typing');
                    
                    // Animate title
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animate content
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Typing speed for content
                        }
                    }, 100); // Typing speed for title
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection();
    animateSaturnusSection();
    animateJupiterSection(); // Add this line
});

function animateMarsSection() {
    const section = document.querySelector('.content-5');
    const title = document.querySelector('.mars-title');
    const content = document.querySelector('.mars-content');
    const image = document.querySelector('#mars');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Simpan teks asli
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Kosongkan teks untuk animasi
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Animasi judul
                    title.classList.add('typing');
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection();
    animateSaturnusSection();
    animateJupiterSection();
    animateMarsSection(); 
});

function animateMarsSection() {
    const section = document.querySelector('.content-5');
    const title = document.querySelector('.mars-title');
    const content = document.querySelector('.mars-content');
    const image = document.querySelector('#mars');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Animasi judul
                    title.classList.add('typing');
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection();
    animateSaturnusSection();
    animateJupiterSection();
    animateMarsSection(); 
});

function animateBumiSection() {
    const section = document.querySelector('.content-6');
    const title = document.querySelector('.bumi-title');
    const content = document.querySelector('.bumi-content');
    const image = document.querySelector('#bumi');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Simpan teks asli
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Kosongkan teks untuk animasi
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Animasi judul
                    title.classList.add('typing');
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Panggil saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    animateBumiSection();
});

function animateVenusSection() {
    const section = document.querySelector('.content-7');
    const title = document.querySelector('.venus-title');
    const content = document.querySelector('.venus-content');
    const image = document.querySelector('#venus');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate image
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Save original text
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Clear text for animation
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Add typing class
                    title.classList.add('typing');
                    
                    // Animate title
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animate content
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Content typing speed
                        }
                    }, 100); // Title typing speed
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Add to DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateVenusSection(); 
});

function animateMercurySection() {
    const section = document.querySelector('.content-8');
    const title = document.querySelector('.mercury-title');
    const content = document.querySelector('.mercury-content');
    const image = document.querySelector('#mercury');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasi gambar
                entry.target.classList.add('in-view');
                
                if (!entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    
                    // Simpan teks asli
                    const titleText = title.textContent;
                    const contentText = content.textContent;
                    
                    // Kosongkan teks untuk animasi
                    title.textContent = '';
                    content.textContent = '';
                    
                    // Animasi judul
                    title.classList.add('typing');
                    let i = 0;
                    const typeTitle = setInterval(() => {
                        if (i < titleText.length) {
                            title.textContent += titleText.charAt(i);
                            i++;
                        } else {
                            clearInterval(typeTitle);
                            title.classList.remove('typing');
                            
                            // Animasi konten
                            content.classList.add('typing');
                            let j = 0;
                            const typeContent = setInterval(() => {
                                if (j < contentText.length) {
                                    content.textContent += contentText.charAt(j);
                                    j++;
                                } else {
                                    clearInterval(typeContent);
                                    content.classList.remove('typing');
                                }
                            }, 20); // Kecepatan ketik konten
                        }
                    }, 100); // Kecepatan ketik judul
                }
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(section);
}

// Panggil di DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    animateNeptuneSection();
    animateUranusSection();
    animateSaturnusSection();
    animateJupiterSection();
    animateMarsSection();
    animateBumiSection();
    animateVenusSection();
    animateMercurySection();
});

// Animation for Space Exploration section
function animateSpaceExploration() {
    const section = document.querySelector('.space-exploration');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(section);
}

document.addEventListener('DOMContentLoaded', () => {
    // ... other animations ...
    animateSpaceExploration();
});

// Animation for Gallery
function animateGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateGallery();
});

// Mobile menu toggle
const menuToggle = document.createElement('button');
menuToggle.className = 'menu-toggle';
menuToggle.innerHTML = '<i data-feather="menu"></i>';
document.querySelector('nav').appendChild(menuToggle);

menuToggle.addEventListener('click', function() {
    document.querySelector('.top').classList.toggle('active');
});

// Re-initialize Feather icons after adding new ones
feather.replace();e
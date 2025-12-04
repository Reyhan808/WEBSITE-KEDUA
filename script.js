// script.js - COMPLETE FIXED VERSION

// Inisialisasi partikel background
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ff0033" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ff0033",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Cursor kustom dengan jejak
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Jejak cursor dengan delay
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
        
        // Efek hover pada elemen interaktif
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .social-link, .nav-link');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursor.style.backgroundColor = 'rgba(255, 0, 51, 1)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'rgba(200, 0, 0, 0.8)';
            });
        });
    });

    // Typing effect untuk hero section
    const typingText = document.querySelector('.typing-dynamic');
    const phrases = [
        "web development",
        "aplikasi mobile",
        "desain UI/UX",
        "solusi digital",
        "pengalaman pengguna yang menarik"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Menghapus teks
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Mengetik teks
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Selesai mengetik, tunggu sebentar lalu mulai menghapus
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
                typeEffect();
            }, 1500);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            // Selesai menghapus, ganti ke frase berikutnya
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
        
        // Kecepatan mengetik/menghapus
        const speed = isDeleting ? 50 : 100;
        const delay = isEnd ? 1200 : speed;
        
        setTimeout(typeEffect, delay);
        isEnd = false;
    }
    
    // Mulai efek typing setelah halaman dimuat
    setTimeout(typeEffect, 1000);

    // Animasi statistik angka
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateNumber = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                setTimeout(updateNumber, 20);
            } else {
                stat.textContent = target;
            }
        };
        
        // Trigger animasi saat element masuk ke viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });

    // Animasi skill bar
    const skillBars = document.querySelectorAll('.skill-level');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = level + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });

    // Navigasi smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Update active nav link saat scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Hamburger menu untuk mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            
            // Animasi hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                navLinksContainer.style.display = 'flex';
                setTimeout(() => {
                    navLinksContainer.style.opacity = '1';
                    navLinksContainer.style.transform = 'translateY(0)';
                }, 10);
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                navLinksContainer.style.opacity = '0';
                navLinksContainer.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinksContainer.style.display = 'none';
                }, 300);
            }
        });
    }

    // Animasi pada project cards saat hover
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const border = card.querySelector('.project-border-animation');
            if (border) {
                border.style.animationDuration = '2s';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const border = card.querySelector('.project-border-animation');
            if (border) {
                border.style.animationDuration = '8s';
            }
        });
    });

    // Efek parallax sederhana pada hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
    
    // Inisialisasi animasi saat halaman dimuat
    window.onload = () => {
        document.body.style.opacity = '1';
    };
});

// ======================================
// FUNGSI UNTUK HANDLE FOTO DARI FOLDER
// ======================================

// Fungsi untuk menambahkan efek loading pada gambar
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Tambah class loading saat gambar belum dimuat
        if (!img.complete) {
            img.classList.add('loading');
        }
        
        // Saat gambar berhasil dimuat
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.style.opacity = '1';
            
            // Efek fade in untuk gambar
            this.style.transition = 'opacity 0.5s ease';
        });
        
        // Handle error jika gambar tidak ditemukan
        img.addEventListener('error', function() {
            console.warn(`Gambar tidak ditemukan: ${this.src}`);
            this.style.display = 'none';
            
            // Tampilkan placeholder
            const parent = this.parentElement;
            if (parent.classList.contains('image-placeholder')) {
                parent.innerHTML = '<i class="fas fa-user"></i>';
                parent.querySelector('i').style.fontSize = '5rem';
                parent.querySelector('i').style.color = '#ff0033';
            }
        });
    });
}

// Fungsi untuk preload gambar penting
function preloadImportantImages() {
    const importantImages = [
        'images/profile.jpg',
        'images/about.jpg',
        'images/pkk2.jpg'
    ];
    
    importantImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Jalankan fungsi saat halaman dimuat
window.addEventListener('load', function() {
    handleImageLoading();
    preloadImportantImages();
    
    // Animasi khusus untuk foto profil
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.style.opacity = '0';
        setTimeout(() => {
            profilePhoto.style.opacity = '1';
        }, 500);
    }
});

// ======================================
// BONUS: Fitur Zoom untuk Foto Project
// ======================================
document.addEventListener('DOMContentLoaded', function() {
    // Buat modal untuk zoom gambar
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: zoom-out;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        border: 2px solid #ff0033;
        border-radius: 5px;
    `;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Klik untuk zoom gambar project
    document.querySelectorAll('.project-screenshot').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            modalImg.src = this.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Klik untuk tutup modal
    modal.addEventListener('click', function() {
        this.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});

// ============================================
// PROJECT MODAL & CAROUSEL FUNCTIONALITY
// ============================================

// projectsData array - HANYA 5 PROJECT
const projectsData = [
    {
        id: 1,
        title: "Pengukur Jarak Dengan Arduino",
        category: "Arduino",
        year: "2024",
        description: "Project Ini Bertujuan Untuk Pengenalan Dasar Tentang Microcontroler Yaitu Arduino. (CLICK IKON YOUTUBE UNTUK MENGAKSES VIDEO PROJECTNYA)",
        techStack: ["Arduino", "Ultrasonic Sensor", "Lcd 16x2 I2C"],
        features: [
            "Bisa Sebagai Pengganti Pengaris Biasa",
            "mampu mengukur jarak dengan tepat",
            "tampilan yang user-friendly",
            "mudah dioperasikan",
            "hemat energi",
            "bisa di bawa kemana-mana"
        ],
        youtubeUrl: "https://youtu.be/qhOIErhSq5A?si=kispOclxR2a-bz1N",
        githubUrl: "https://github.com/username/project1",
        demoUrl: "https://project1-demo.com",
        images: [
            "images/LEDKK1.jpeg",
            "images/LEDKK2.jpeg",
            "images/LEDKKK3.jpeg",
            "images/LEDKK4.jpeg",
        ]
    },
    {
        id: 2,
        title: "Robot Avoider",
        category: "Arduino",
        year: "2024",
        description: "Nahh Project Ini Dimulai Awal semester genap Project ini sungguh sangat mengasah otak dan logika Butuh waktu 4 bulan untuk menyelesaikan Project ini dengan sempurna. (CLICK IKON YOUTUBE UNTUK MENGAKSES VIDEO PROJECTNYA)",
        techStack: ["Arduino", "Motor Driver", "Ultrasonic sensor", "Chassis Mobil"],
        features: [
            "Navigasi otonom", "Deteksi & penghindaran rintangan", "Perencanaan jalur waktu nyata", "Indikator LED", "Bertenaga baterai", "Desain compact"
        ],
        youtubeUrl: "https://youtu.be/mklQnvWb3No?si=EgfBL-x6Zksa414O",
        githubUrl: "https://github.com/username/project2",
        demoUrl: "https://fitness-demo.com",
        images: [
            "images/fotopkk.jpeg",
            "images/pkk2.jpeg",
            "images/pkk3.jpeg",
            "images/pkk4.jpeg",
            "images/pkk5.jpeg",
            "images/pkk6.jpeg",
            "images/pkk7.jpeg",
            "images/pkk8.jpeg.jpg",
        ]
    },
    {
        id: 3,
        title: "smart Home Berbasis IoT",
        category: "ESP-32",
        year: "2025",
        description: "Smart Home Berbasis IoT Lampu yang bisa dikontrol manual atau otomatis oleh pengguna,yang saya buat yaitu manual . (CLICK IKON YOUTUBE UNTUK MENGAKSES VIDEO PROJECTNYA)",
        techStack: ["ESP-32", "Relay 12V", "Blynk","lcd oled","Lampu"],
        features: [
            "Kontrol perangkat jarak jauh",
            "Pemantauan waktu nyata",
            "Peringatan notifikasi otomatis",
            "Antarmuka yang ramah pengguna",
            "Efisiensi energi",
            "Instalasi pengaturan mudah"
        ],
        youtubeUrl: "https://youtube.com/shorts/dwx3u4vhJl0?si=08MVLqn71EQ9zfpl",
        githubUrl: "",
        demoUrl: "",
        images: [
            "images/pkkcover.jpeg",
            "images/pkkl2.jpeg",
            "images/pkkl3.jpeg",
            "images/pkkl4.jpeg",
            "images/pkkl5.jpeg",
            "images/pkkl6.jpeg",
        ]
    },
    {
        id: 4,
        title: "Game berbasis Website",
        category: "Game Berbasis Website",
        year: "2025",
        description: "Game Sederhana yang mengadirkan game yang mengasah otak. (CLICK IKON GITHUB UNTUK MENGAKSES WEBSITE GAMENYA)",
        techStack: ["html", "css", "JavaScript"],
        features: [
            "anda bisa mengakses di web portfolio saya",
            "game yang setu dan mengasah otak"
        ],
        youtubeUrl: "",
        githubUrl: "https://reyhan808.github.io/WEBSITE-GAME/",
        demoUrl: "",
        images: [
            "images/cover.png",
            "images/pertama.png",
            "images/kedua.png",
            "images/ketiga.png"   
        ]
    },
    {
        id: 5,
        title: "Portfolio Web",
        category: "Portfolio Web",
        year: "2025",
        description: "Sama Seperti Portfolio ini hanya saja ada perbedaan fitur Ini. website ini harusnya saya buat untuk penilaian ujian project kelas XI semester ganjil ini tapi menurut saya terlalu biasa dan b aja. jadi saya buat yang lebih menarik lagi yaitu portfolio yang baru  ini. (CLICK IKON GITHUB UNTUK MENGAKSES WEBSITE PORTFOLIO SAYA YANG KE 2)",
        techStack: ["html", "css", "JavaScript"],
        features: [
            "anda juga bisa mengakses di web portfolio saya",
            ""
        ],
        youtubeUrl: "",
        githubUrl: "https://reyhan808.github.io/Website-Portfolio/",
        demoUrl: "",
        images: [
            "images/COVER_P.png",
            "images/ONE.png",
            "images/TWO.png",
            "images/THREE.png",
            "images/FOUR.png"  
        ]
    }
];

// Initialize modal functionality
function initProjectModal() {
    const modal = document.querySelector('.project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Elements untuk update konten modal
    const modalTitle = document.querySelector('.modal-title');
    const modalCategory = document.querySelector('.modal-category');
    const modalDate = document.querySelector('.modal-date');
    const modalDescription = document.querySelector('.modal-description p');
    const techStackContainer = document.querySelector('.stack-tags');
    const featuresList = document.querySelector('.project-features ul');
    const youtubeBtn = document.querySelector('.btn-youtube');
    const githubBtn = document.querySelector('.btn-github');
    const demoBtn = document.querySelector('.btn-demo');
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselDots = document.querySelector('.carousel-dots');
    
    // Carousel variables
    let currentSlide = 0;
    
    // Fungsi untuk update carousel
    function updateCarousel(images) {
        if (!images || images.length === 0) {
            carouselContainer.innerHTML = `
                <div class="carousel-slide active">
                    <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #aaa; font-size: 1.2rem;">
                        <i class="fas fa-image" style="font-size: 3rem; margin-bottom: 20px; display: block;"></i>
                        <p>No documentation images available</p>
                    </div>
                </div>`;
            return;
        }
        
        carouselContainer.innerHTML = '';
        carouselDots.innerHTML = '';
        
        images.forEach((img, index) => {
            // Tambahkan slide
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            slide.innerHTML = `<img src="${img}" alt="Project Documentation ${index + 1}">`;
            carouselContainer.appendChild(slide);
            
            // Tambahkan dot
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
        
        currentSlide = 0;
    }
    
    // Carousel navigation functions
    function goToSlide(slideIndex) {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot');
        
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        
        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[slideIndex].classList.add('active');
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[slideIndex].classList.add('active');
        
        // Update carousel container transform
        carouselContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
        
        currentSlide = slideIndex;
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Setup carousel navigation
    document.querySelector('.carousel-next')?.addEventListener('click', nextSlide);
    document.querySelector('.carousel-prev')?.addEventListener('click', prevSlide);
    
    // Auto slide (optional)
    let slideInterval;
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }
    
    // Fungsi untuk membuka modal dengan data project
    function openModal(projectId) {
        const project = projectsData.find(p => p.id === projectId);
        
        if (!project) {
            console.error(`Project with id ${projectId} not found`);
            return;
        }
        
        // Update modal content dengan data project
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDate.textContent = project.year;
        modalDescription.textContent = project.description;
        
        // Update tech stack
        techStackContainer.innerHTML = '';
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.textContent = tech;
            techStackContainer.appendChild(tag);
        });
        
        // Update features list
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update buttons URLs
        youtubeBtn.href = project.youtubeUrl;
        githubBtn.href = project.githubUrl;
        demoBtn.href = project.demoUrl;
        
        // Update carousel dengan gambar project
        updateCarousel(project.images);
        
        // ===== FIX CURSOR =====
        // 1. Tambah class ke body
        document.body.classList.add('modal-open');
        
        // 2. Pastikan cursor visible
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        if (cursor && cursorFollower) {
            cursor.style.opacity = '1';
            cursor.style.visibility = 'visible';
            cursor.style.display = 'block';
            
            cursorFollower.style.opacity = '1';
            cursorFollower.style.visibility = 'visible';
            cursorFollower.style.display = 'block';
        }
        
        // 3. Update z-index cursor
        document.querySelectorAll('.cursor, .cursor-follower').forEach(el => {
            el.style.zIndex = '10001';
        });
        
        // Tampilkan modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Start auto slide
        startAutoSlide();
    }
    
    // Fungsi untuk menutup modal
    function closeModal() {
        // ===== FIX CURSOR =====
        // 1. Hapus class dari body
        document.body.classList.remove('modal-open');
        
        // 2. Reset z-index cursor
        document.querySelectorAll('.cursor, .cursor-follower').forEach(el => {
            el.style.zIndex = '';
        });
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        stopAutoSlide();
    }
    
    // Event Listeners untuk project cards
    projectCards.forEach((card, index) => {
        card.addEventListener('click', (e) => {
            // Cegah event bubbling jika klik pada elemen tertentu
            if (e.target.closest('.view-project') || e.target.closest('a')) {
                return;
            }
            
            // Buka modal dengan project id (index + 1)
            openModal(index + 1);
        });
        
        // Tambahkan event listener untuk tombol "View Project"
        const viewProjectBtn = card.querySelector('.view-project');
        if (viewProjectBtn) {
            viewProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal(index + 1);
            });
        }
    });
    
    // Event Listeners untuk modal
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Close modal dengan ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Pause auto slide saat hover di carousel
    carouselContainer?.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer?.addEventListener('mouseleave', startAutoSlide);
}

// Initialize ketika DOM siap
document.addEventListener('DOMContentLoaded', function() {
    initProjectModal();
    
    // Tambahkan data attributes ke project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.setAttribute('data-project-id', index + 1);
        
        // Update tombol "View Project" untuk consistency
        const viewBtn = card.querySelector('.view-project');
        if (viewBtn) {
            viewBtn.innerHTML = '<i class="fas fa-external-link-alt"></i> View Details';
        }
    });
});

// ============================================
// OPTIONAL: SIMPLE IMAGE FALLBACK
// ============================================

// Handle broken images di carousel
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG' && e.target.closest('.carousel-slide')) {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%231a0a0a"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="%23aaa" text-anchor="middle" dominant-baseline="middle">Image not available</text></svg>';
            e.target.alt = 'Image placeholder';
        }
    }, true);
});

// ============================================
// SCROLL ANIMATION UNTUK PROJECT CARDS
// ============================================

function initScrollAnimations() {
    // Animasi untuk project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Buat observer untuk animasi scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Card masuk ke viewport
                entry.target.classList.add('visible');
                
                // Tambahkan efek tambahan berdasarkan urutan
                const index = Array.from(projectCards).indexOf(entry.target);
                setTimeout(() => {
                    entry.target.style.zIndex = 10 + index;
                    
                    // Efek ripple untuk card pertama yang tampil
                    if (index === 0) {
                        createRippleEffect(entry.target);
                    }
                }, index * 100);
                
                // Stop observing setelah animasi
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe setiap project card
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Animasi untuk section header projects
    const projectsSection = document.querySelector('.projects');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animasikan section title
                const title = document.querySelector('.section-title');
                title.classList.add('project-counter-animation');
                
                // Animasikan counter
                animateProjectCounter();
                
                // Stop observing
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (projectsSection) {
        sectionObserver.observe(projectsSection);
    }
    
    // Efek ripple saat card pertama muncul
    function createRippleEffect(card) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 0, 51, 0.2);
            transform: translate(-50%, -50%);
            z-index: 1;
            pointer-events: none;
        `;
        
        card.appendChild(ripple);
        
        // Animasikan ripple
        setTimeout(() => {
            ripple.style.transition = 'all 1s ease-out';
            ripple.style.width = '150%';
            ripple.style.height = '150%';
            ripple.style.opacity = '0';
        }, 100);
        
        // Hapus ripple setelah animasi
        setTimeout(() => {
            ripple.remove();
        }, 1200);
    }
    
    // Animasi counter untuk jumlah project
    function animateProjectCounter() {
        const counter = document.createElement('div');
        counter.className = 'project-count-badge';
        counter.innerHTML = '5 Projects';
        counter.style.cssText = `
            position: absolute;
            top: -20px;
            right: 20px;
            background: #ff0033;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: bold;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.5s ease 0.5s;
        `;
        
        const sectionHeader = document.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.style.position = 'relative';
            sectionHeader.appendChild(counter);
            
            // Animasikan counter badge
            setTimeout(() => {
                counter.style.opacity = '1';
                counter.style.transform = 'translateY(0)';
            }, 800);
        }
    }
    
    // Parallax effect untuk project cards saat scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const projectsSection = document.querySelector('.projects');
                
                if (projectsSection) {
                    const sectionTop = projectsSection.offsetTop;
                    const sectionHeight = projectsSection.offsetHeight;
                    const viewportHeight = window.innerHeight;
                    
                    // Cek jika section di viewport
                    if (scrolled > sectionTop - viewportHeight && 
                        scrolled < sectionTop + sectionHeight) {
                        
                        const progress = (scrolled - (sectionTop - viewportHeight)) / 
                                       (viewportHeight + sectionHeight);
                        
                        // Terapkan efek parallax pada cards
                        projectCards.forEach((card, index) => {
                            const speed = 0.1 + (index * 0.05);
                            const yOffset = Math.sin(progress * Math.PI) * 20 * speed;
                            const rotation = Math.sin(progress * Math.PI) * 2 * speed;
                            
                            if (card.classList.contains('visible')) {
                                card.style.transform = `translateY(${yOffset}px) rotate(${rotation}deg)`;
                            }
                        });
                    }
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// Panggil fungsi saat DOM ready
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi scroll animations
    initScrollAnimations();
});

// ============================================
// FORMULIR PENGUNJUNG DENGAN LOCALSTORAGE
// ============================================

// Data Pengunjung di localStorage
let visitors = JSON.parse(localStorage.getItem('websiteVisitors')) || [];
let currentPage = 1;
const itemsPerPage = 10;
let sortDirection = {};

// Initialize Visitor Form
function initVisitorForm() {
    const visitorForm = document.getElementById('visitorForm');
    const clearFormBtn = document.getElementById('clearFormBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const importCsvBtn = document.getElementById('importCsvBtn');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const csvFileInput = document.getElementById('csvFileInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const sortBtn = document.getElementById('sortBtn');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const confirmModal = document.getElementById('confirmModal');
    const confirmCancel = document.getElementById('confirmCancel');
    const confirmOk = document.getElementById('confirmOk');
    const modalClose = document.querySelector('.modal-close');

    // Load visitors on page load
    loadVisitors();

    // Handle form submission
    visitorForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validation
        const name = document.getElementById('visitorName').value.trim();
        const age = document.getElementById('visitorAge').value.trim();
        const email = document.getElementById('visitorEmail').value.trim();
        const note = document.getElementById('visitorNote').value.trim();
        
        let isValid = true;
        
        // Name validation
        if (name.length < 2) {
            showError('name-error', 'Nama minimal 2 karakter');
            isValid = false;
        } else {
            clearError('name-error');
        }
        
        // Age validation
        if (!age || age < 1 || age > 120) {
            showError('age-error', 'Umur harus antara 1-120');
            isValid = false;
        } else {
            clearError('age-error');
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showError('email-error', 'Format email tidak valid');
            isValid = false;
        } else {
            clearError('email-error');
        }
        
        if (!isValid) return;
        
        // Create visitor object
        const visitor = {
            id: Date.now(), // Unique ID
            name: name,
            age: parseInt(age),
            email: email,
            note: note,
            date: new Date().toLocaleString('id-ID', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        // Add to visitors array
        visitors.unshift(visitor); // Add to beginning for newest first
        
        // Save to localStorage
        saveVisitors();
        
        // Clear form
        clearForm();
        
        // Show success message
        showNotification('Data pengunjung berhasil disimpan!', 'success');
        
        // Reload table
        loadVisitors();
    });
    
    // Clear form button
    clearFormBtn.addEventListener('click', clearForm);
    
    // Export CSV
    exportCsvBtn.addEventListener('click', exportToCSV);
    
    // Import CSV
    importCsvBtn.addEventListener('click', () => {
        csvFileInput.click();
    });
    
    csvFileInput.addEventListener('change', handleCSVImport);
    
    // Clear All Data
    clearAllBtn.addEventListener('click', () => {
        if (visitors.length === 0) {
            showNotification('Tidak ada data untuk dihapus', 'info');
            return;
        }
        
        const modal = document.getElementById('confirmModal');
        const messageElement = document.getElementById('confirmMessage');
        
        messageElement.textContent = 'Apakah Anda yakin ingin menghapus semua data pengunjung? Tindakan ini tidak dapat dibatalkan.';
        modal.dataset.action = 'clearAll';
        modal.style.display = 'flex';
    });
    
    // Refresh button
    refreshBtn.addEventListener('click', loadVisitors);
    
    // Sort button
    sortBtn.addEventListener('click', () => {
        // Toggle sort by name
        if (!sortDirection.name || sortDirection.name === 'desc') {
            visitors.sort((a, b) => a.name.localeCompare(b.name));
            sortDirection.name = 'asc';
            showNotification('Data diurutkan berdasarkan nama (A-Z)', 'info');
        } else {
            visitors.sort((a, b) => b.name.localeCompare(a.name));
            sortDirection.name = 'desc';
            showNotification('Data diurutkan berdasarkan nama (Z-A)', 'info');
        }
        saveVisitors();
        loadVisitors();
    });
    
    // Pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadVisitors();
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(visitors.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            loadVisitors();
        }
    });
    
    // Modal handlers
    confirmCancel.addEventListener('click', hideConfirmModal);
    confirmOk.addEventListener('click', () => {
        const action = confirmModal.dataset.action;
        if (action === 'clearAll') {
            clearAllVisitors();
        } else if (action === 'delete') {
            deleteVisitor(confirmModal.dataset.visitorId);
        }
        hideConfirmModal();
    });
    
    modalClose.addEventListener('click', hideConfirmModal);
    
    // Close modal on outside click
    confirmModal.addEventListener('click', (e) => {
        if (e.target === confirmModal) {
            hideConfirmModal();
        }
    });
}

// Save visitors to localStorage
function saveVisitors() {
    localStorage.setItem('websiteVisitors', JSON.stringify(visitors));
}

// Load visitors and display in table
function loadVisitors() {
    const tableBody = document.getElementById('visitorTableBody');
    const visitorCount = document.getElementById('visitorCount');
    const currentCount = document.getElementById('currentCount');
    const totalCount = document.getElementById('totalCount');
    const currentPageElement = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    // Update counts
    visitorCount.textContent = `(${visitors.length})`;
    totalCount.textContent = visitors.length;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageVisitors = visitors.slice(startIndex, endIndex);
    
    currentCount.textContent = pageVisitors.length;
    
    // Update pagination controls
    const totalPages = Math.ceil(visitors.length / itemsPerPage);
    currentPageElement.textContent = currentPage;
    
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
    
    // Clear table
    tableBody.innerHTML = '';
    
    if (pageVisitors.length === 0) {
        tableBody.innerHTML = `
            <tr class="no-data">
                <td colspan="7">
                    <div class="empty-state">
                        <i class="fas fa-users-slash"></i>
                        <p>${visitors.length === 0 ? 'Belum ada data pengunjung.' : 'Tidak ada data di halaman ini.'}</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    // Add rows for each visitor
    pageVisitors.forEach((visitor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td>${escapeHTML(visitor.name)}</td>
            <td>${visitor.age}</td>
            <td>${escapeHTML(visitor.email)}</td>
            <td class="note-cell">${visitor.note ? escapeHTML(visitor.note) : '-'}</td>
            <td>${visitor.date}</td>
            <td class="action-cell">
                <button class="btn-table-action btn-edit" onclick="editVisitor(${visitor.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-table-action btn-delete" onclick="deleteVisitorPrompt(${visitor.id})" title="Hapus">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Clear form
function clearForm() {
    document.getElementById('visitorForm').reset();
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}

// Show error message
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

// Clear error message
function clearError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(255, 0, 51, 0.9)'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export to CSV
function exportToCSV() {
    if (visitors.length === 0) {
        showNotification('Tidak ada data untuk diekspor', 'info');
        return;
    }
    
    // Prepare CSV content
    const headers = ['No', 'Nama', 'Umur', 'Email', 'Note', 'Tanggal'];
    const rows = visitors.map((visitor, index) => [
        index + 1,
        `"${visitor.name}"`,
        visitor.age,
        `"${visitor.email}"`,
        `"${visitor.note || ''}"`,
        `"${visitor.date}"`
    ]);
    
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `daftar-pengunjung-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('Data berhasil diekspor ke CSV', 'success');
}

// Handle CSV import
function handleCSVImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvContent = e.target.result;
            const lines = csvContent.split('\n').filter(line => line.trim() !== '');
            const importedVisitors = [];
            
            // Skip header line
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i];
                // Handle quoted fields with commas
                const fields = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
                
                if (fields && fields.length >= 5) {
                    // Remove quotes from fields
                    const cleanFields = fields.map(field => 
                        field.replace(/^"|"$/g, '').trim()
                    );
                    
                    const visitor = {
                        id: Date.now() + i, // Unique ID
                        name: cleanFields[1] || '',
                        age: parseInt(cleanFields[2]) || 0,
                        email: cleanFields[3] || '',
                        note: cleanFields[4] || '',
                        date: cleanFields[5] || new Date().toLocaleString('id-ID')
                    };
                    
                    // Validate required fields
                    if (visitor.name && visitor.email && visitor.age > 0) {
                        importedVisitors.push(visitor);
                    }
                }
            }
            
            if (importedVisitors.length === 0) {
                showNotification('Tidak ada data valid yang dapat diimpor', 'info');
                return;
            }
            
            // Add to existing visitors
            visitors = [...importedVisitors, ...visitors];
            saveVisitors();
            loadVisitors();
            
            showNotification(`${importedVisitors.length} data berhasil diimpor`, 'success');
            
        } catch (error) {
            console.error('Error importing CSV:', error);
            showNotification('Gagal mengimpor file CSV. Pastikan formatnya benar.', 'info');
        }
        
        // Reset file input
        event.target.value = '';
    };
    
    reader.readAsText(file);
}

// Clear all visitors
function clearAllVisitors() {
    visitors = [];
    currentPage = 1;
    saveVisitors();
    loadVisitors();
    showNotification('Semua data pengunjung telah dihapus', 'info');
}

// Edit visitor - FIXED: Made globally accessible
window.editVisitor = function(id) {
    const visitor = visitors.find(v => v.id === id);
    if (!visitor) return;
    
    // Scroll to form
    const formSection = document.getElementById('visitor');
    if (formSection) {
        window.scrollTo({
            top: formSection.offsetTop - 100,
            behavior: 'smooth'
        });
    }
    
    // Fill form with visitor data
    document.getElementById('visitorName').value = visitor.name;
    document.getElementById('visitorAge').value = visitor.age;
    document.getElementById('visitorEmail').value = visitor.email;
    document.getElementById('visitorNote').value = visitor.note || '';
    
    // Remove the visitor from list
    visitors = visitors.filter(v => v.id !== id);
    saveVisitors();
    loadVisitors();
    
    showNotification('Data siap diedit. Silakan perbarui dan simpan.', 'info');
}

// Delete visitor prompt - FIXED: Made globally accessible
window.deleteVisitorPrompt = function(id) {
    const visitor = visitors.find(v => v.id === id);
    if (!visitor) return;
    
    const modal = document.getElementById('confirmModal');
    const messageElement = document.getElementById('confirmMessage');
    
    messageElement.textContent = `Apakah Anda yakin ingin menghapus data pengunjung "${visitor.name}"?`;
    modal.dataset.action = 'delete';
    modal.dataset.visitorId = id;
    modal.style.display = 'flex';
}

// Delete visitor - FIXED: Better implementation
function deleteVisitor(id) {
    const visitorId = parseInt(id);
    const visitorIndex = visitors.findIndex(v => v.id === visitorId);
    
    if (visitorIndex === -1) {
        showNotification('Data pengunjung tidak ditemukan', 'info');
        return;
    }
    
    visitors.splice(visitorIndex, 1);
    saveVisitors();
    
    // Reset to page 1 if current page is now empty
    const totalPages = Math.ceil(visitors.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    } else if (visitors.length === 0) {
        currentPage = 1;
    }
    
    loadVisitors();
    showNotification('Data pengunjung berhasil dihapus', 'info');
}

// Show confirmation modal
function showConfirmModal(message, action) {
    const modal = document.getElementById('confirmModal');
    const messageElement = document.getElementById('confirmMessage');
    
    messageElement.textContent = message;
    modal.dataset.action = action;
    modal.style.display = 'flex';
}

// Hide confirmation modal
function hideConfirmModal() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
    delete modal.dataset.action;
    delete modal.dataset.visitorId;
}

// Escape HTML to prevent XSS
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize visitor form
    initVisitorForm();
});

// Update active nav link saat scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navigasi smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navLinksContainer = document.querySelector('.nav-links');
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                navLinksContainer.style.opacity = '0';
                navLinksContainer.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    navLinksContainer.style.display = 'none';
                }, 300);
            }
        }
    });
});
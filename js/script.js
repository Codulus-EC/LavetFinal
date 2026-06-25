const header = document.querySelector(".header");
const hero = document.querySelector(".hero");
const heroLabel = document.querySelector(".hero__label");
const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroDots = document.querySelectorAll(".hero__dot");
const heroPrev = document.querySelector(".hero__arrow--left");
const heroNext = document.querySelector(".hero__arrow--right");

const heroSlides = [
    {
        label: "Общая информация",
        title: "ЛАВЕТ.РФ",
        subtitle: "Качественно лечим<br>ваших маленьких<br>друзей с 1997 года!",
        image: "images/hero.jpg"
    },
    {
        label: "Мы переехали!",
        title: "Новый адрес",
        subtitle: "Ждём вас по адресу:<br>Воронеж, улица 20-летия<br>Октября, 105/1",
        image: "images/bg-2.jpg"
    },
    {
        label: "Новый сайт",
        title: "ЛАВЕТ.РФ",
        subtitle: "Мы переехали с lavet.su<br>на новый удобный сайт<br>лавет.рф",
        image: "images/bg-3.jpg"
    }
];

let heroIndex = 0;
let heroTimer = null;

function setHeaderState() {
    if (!header) {
        return;
    }

    if (window.scrollY > 90) {
        header.classList.add("header--compact");
    } else {
        header.classList.remove("header--compact");
    }
}

function renderHeroSlide(index) {
    if (!hero || !heroLabel || !heroTitle || !heroSubtitle) {
        return;
    }

    hero.classList.add("is-changing");

    setTimeout(() => {
        const slide = heroSlides[index];

        heroLabel.textContent = slide.label;
        heroTitle.textContent = slide.title;
        heroSubtitle.innerHTML = slide.subtitle;
        hero.style.backgroundImage = `url("${slide.image}")`;

        heroDots.forEach((dot, dotIndex) => {
            dot.classList.toggle("hero__dot--active", dotIndex === index);
        });

        hero.classList.remove("is-changing");
    }, 220);
}

function goToHeroSlide(index) {
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    renderHeroSlide(heroIndex);
}

function startHeroSlider() {
    if (!hero) {
        return;
    }

    clearInterval(heroTimer);

    heroTimer = setInterval(() => {
        goToHeroSlide(heroIndex + 1);
    }, 5000);
}

if (heroPrev) {
    heroPrev.addEventListener("click", () => {
        goToHeroSlide(heroIndex - 1);
        startHeroSlider();
    });
}

if (heroNext) {
    heroNext.addEventListener("click", () => {
        goToHeroSlide(heroIndex + 1);
        startHeroSlider();
    });
}

heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        goToHeroSlide(index);
        startHeroSlider();
    });
});

window.addEventListener("scroll", setHeaderState);
setHeaderState();
startHeroSlider();

const articleCards = document.querySelectorAll(".article-card");
const articlePrev = document.querySelector(".articles__arrow--left");
const articleNext = document.querySelector(".articles__arrow--right");

let articleIndex = 0;

function getArticlePosition(index, activeIndex, length) {
    const diff = (index - activeIndex + length) % length;

    if (diff === 0) {
        return "is-active";
    }

    if (diff === 1) {
        return "is-next-1";
    }

    if (diff === 2) {
        return "is-next-2";
    }

    if (diff === length - 1) {
        return "is-prev-1";
    }

    if (diff === length - 2) {
        return "is-prev-2";
    }

    return "";
}

function renderArticles() {
    if (!articleCards.length) {
        return;
    }

    articleCards.forEach((card, index) => {
        card.classList.remove(
            "is-active",
            "is-prev-1",
            "is-prev-2",
            "is-next-1",
            "is-next-2"
        );

        const positionClass = getArticlePosition(index, articleIndex, articleCards.length);

        if (positionClass) {
            card.classList.add(positionClass);
        }
    });
}

function goToArticle(index) {
    articleIndex = (index + articleCards.length) % articleCards.length;
    renderArticles();
}

if (articlePrev) {
    articlePrev.addEventListener("click", () => {
        goToArticle(articleIndex - 1);
    });
}

if (articleNext) {
    articleNext.addEventListener("click", () => {
        goToArticle(articleIndex + 1);
    });
}

renderArticles();

const modal = document.getElementById("serviceModal") || document.querySelector(".service-modal");
const serviceButtons = document.querySelectorAll(".service-chip, .price-item");

if (modal) {
    const modalOverlay = modal.querySelector(".service-modal__overlay");
    const modalClose = modal.querySelector(".service-modal__close");
    const modalService = modal.querySelector(".service-modal__service");
    const modalCost = modal.querySelector(".service-modal__cost");
    const modalPrimaryBtn = modal.querySelector(".service-modal__btn--primary");

    function openServiceModal(serviceName, servicePrice) {
        if (modalService) {
            modalService.textContent = serviceName;
        }

        if (modalCost) {
            modalCost.textContent = servicePrice;
        }

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("is-modal-open");
    }

    function closeServiceModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("is-modal-open");
    }

    serviceButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const serviceName = button.dataset.service || button.textContent.trim();
            const servicePrice = button.dataset.price || "Цена уточняется";

            openServiceModal(serviceName, servicePrice);
        });
    });

    if (modalClose) {
        modalClose.addEventListener("click", closeServiceModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeServiceModal);
    }

    if (modalPrimaryBtn) {
        modalPrimaryBtn.addEventListener("click", closeServiceModal);
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeServiceModal();
        }
    });
}
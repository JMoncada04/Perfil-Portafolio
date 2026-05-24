document.addEventListener("DOMContentLoaded", () => {
    let miCarusel = new Carousel("caruselCreditos");
    miCarusel.init();
});

class Carousel {
    constructor(carouselId, tickTimeInSeconds = 3) {
        this.carouselHolder = document.getElementById(carouselId);
        this.track = this.carouselHolder.querySelector(".track");
        this.slides = [...this.track.querySelectorAll(".slide")];
        this.minLimit = 0;
        this.maxLimit = this.slides.length - 1;
        this.currentIndex = 0;
        this.tickTime = tickTimeInSeconds * 1000;
        this.tickerId = null;
        this.direction = 1;
    }

    init() {
        this.generateNavigationUI();
        this.tick();
    }

    tick() {
        this.tickerId = setTimeout(() => {
            this.moveNext();
            this.tick();
        }, this.tickTime);
    }

    moveNext() {
        let tmpNewIndex = this.currentIndex + this.direction;
        if (tmpNewIndex > this.maxLimit) {
            tmpNewIndex = this.maxLimit - 1;
            this.direction = -1;
        }
        if (tmpNewIndex < this.minLimit) {
            tmpNewIndex = this.minLimit + 1;
            this.direction = 1;
        }
        this.moveTo(tmpNewIndex);
    }

    moveTo(newIndex) {
        this.currentIndex = newIndex;
        this.track.style.left = `${-100 * this.currentIndex}%`;
    }

    generateNavigationUI() {
        let btnLeft = document.createElement("BUTTON");
        let btnRight = document.createElement("BUTTON");

        btnLeft.classList.add("carousel-btn", "btnleft");
        btnRight.classList.add("carousel-btn", "btnright");

        btnLeft.textContent = "<";
        btnRight.textContent = ">";

        btnRight.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.currentIndex < this.maxLimit) {
                this.moveTo(this.currentIndex + 1);
            }
            clearTimeout(this.tickerId);
            this.tick();
        });

        btnLeft.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (this.currentIndex > this.minLimit) {
                this.moveTo(this.currentIndex - 1);
            }
            clearTimeout(this.tickerId);
            this.tick();
        });

        this.carouselHolder.appendChild(btnLeft);
        this.carouselHolder.appendChild(btnRight);
    }
}
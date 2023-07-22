const searchLink = document.querySelector('.search__link'),
    mainContent = document.querySelector('.main__content'),
    mainClose = document.querySelector('.main__close'),
    mainBlock = document.querySelector('.main__block'),
    mainSolo = document.querySelector('.main__solo'),
    pagination = document.querySelector('.pagination'),
    formMain = document.querySelector('.form__main'),
    formInput = document.querySelector('.header__input'),
    anime = document.querySelector('.anime'),
    headerBurger = document.querySelector('.header__btn'),
    headerAbs = document.querySelector('.header__abs'),
    headerItems = document.querySelector('.header__items')


const openMenu = (e) => {
    e.preventDefault()
    const toggleClass = headerBurger.classList.contains('.active') ? 'remove' : 'add'
    headerBurger.classList[toggleClass]('.active')
    headerItems.classList[toggleClass]('.active')
    headerAbs.classList[toggleClass]('.active')
    document.body.classList[toggleClass]('.active')
}

headerBurger.addEventListener('click', (e) => openMenu(e))
headerAbs.addEventListener('click', (e) => openMenu(e))

const openSearchPanel = (e, toggler = true) => {
    e.preventDefault()
    mainContent.classList[toggler ? 'add' : 'remove']('.active')
}
searchLink.addEventListener('click', (e) => openSearchPanel(e))
mainClose.addEventListener('click', (e) => openSearchPanel(e, false))

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
const getLink = (url) => url.split('www.').join('')

const host = 'https://kinopoiskapiunofficial.tech'
const hostName = 'X-API-KEY'
const hostKey = '8cc49aba-151f-437d-927c-8d6093ddb608'

class Kino {
    constructor() {
        this.date = new Date().getMonth()
        this.month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        this.currentYear = new Date().getFullYear()
        this.currentMonth = this.month[this.date]
    }

    fStart = async (url) => {
        const res = await fetch(url, {
            headers: {
                'X-API-KEY': '8cc49aba-151f-437d-927c-8d6093ddb608',
            },
        })
        const json = await res.json()
        return json
    }
    getTopMovies = (page = 1) => this.fStart(`${host}/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)
    getSoloFilm = (id) => this.fStart(`${host}/api/v2.2/films/${id}`)
    getReleases = (page = 1, year = this.currentYear, month = this.currentMonth) => this.fStart(`${host}/api/v2.1/films/releases?year=${year}&month=${month}&page=${page}`)
    getFrames = (id) => this.fStart(`${host}/api/v2.2/films/${id}/images?type=STILL&page=1`)
    getReviews = (id) => this.fStart(`${host}/api/v2.2/films/${id}/reviews?page=1&order=DATE_DESC`)
    getSearch = (page = 1, keyword) => this.fStart(`${host}/api/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)
}

const db = new Kino()

const renderTrendMovies = (element = [], fn = [], films = [], params = []) => {
    anime.classList.add('.active')
    element.forEach((item, i) => {
        const parent = document.querySelector(`${item} .swiper-wrapper`)
        db[fn[i]](params[i]).then(data => {
            console.log(data);
            data[films[i]].forEach(element => {
                const slide = document.createElement('div')
                slide.classList.add('swiper-slide')
                slide.innerHTML = `
                    <div class="movie__item" data-id="${element.filmId}">
                            <img src="${element.posterUrlPreview
                    }" alt="" />
                    </div>
                `
                parent.append(slide)
            })
            const movieItem = document.querySelectorAll('.movie__item')
            movieItem.forEach(item => {
                item.addEventListener('click', () => {
                    let attr = item.getAttribute('data-id')
                    // Создать функцию для рендера одного фильма
                })
            })
            new Swiper(`${item}`, {
                slidesPerView: 1,
                spaceBetween: 27,
                loop: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            })
        })
            .then(() => {
                const pages = 13
                const randomNum = random(1, pages)
                // Создать функцию для header'a
            })
            .catch(e => {
                anime.classList.remove('.active')
                console.log(e);
            })
    })
}


renderTrendMovies(['.trend__tv-slider', '.popular__actors-slider'], ['getTopMovies', 'getReleases'], ['films', 'releases'], [1, 1])



const renderHeader = (page) => {
    db.getTopMovies(page).then(res => {
        anime.classList.add('.active')
        const max = random(0, res.films.length - 1)
        const filmId = res.films[max].filmId
        const filmRating = res.films[max].rating
        db.getSoloFilm(filmId).then(response => {
            const sm = response.data
            const headerText = document.querySelector('.header__text')
            headerText.innerHTML = `
                <h1 class="header__title">${sm.nameRu || sm.nameEn}</h1>
                <div class="header__balls">
                    <span class="header__year">${sm.year}</span>
                    <span class="header__rating">${sm.ratingAgeLimits}+</span>
                    <div class="header__stars">
                        <span class="icon-solid"></span>
                        <span class="header__rating">${filmRating}</span>
                    </div>
                    <p class="header__descr">
                        ${sm.description}
                    </p>
                    <div class="header__buttons">
                        <a href="#" class="header__watch">
                            <span class="icon-solid"></span>
                            watch
                        </a>
                        <a href="" class="header__more header__watch movie__item">
                            More information
                        </a>
                    </div>
                </div>
            `
            anime.classList.remove('.active')
        })
    })
}
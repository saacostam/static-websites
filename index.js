const navCards = [
    {
        title: 'Old School Monitor 📺🍎',
        paragraph: 'Portfolio website inspired by old school monitors.',
        href: './old-school-monitor'
    },
    {
        title: 'Sudoku 🎲',
        paragraph: 'Sudoku app created with vanilla javascript.',
        href: './sudoku'
    },
    {
        title: 'Music Visualizer 🎵',
        paragraph: 'Music Visualizer prototype created with the HTML canvas element.',
        href: 'https://saacostam.github.io/music-visualizer/'
    }
]

function getCardHtml(title, paragraph, href){
    const cardHtml = `
    <div class="card bg-secondary m-2 mb-3 p-0 col-11 col-md-5">
        <div class="card-header">${title}</div>
        <div class="card-body">
            <p class="card-text">${paragraph}</p>
            <a href="${href}" target="_blank" class="btn btn-sm btn-primary mx-auto d-block">Check it Out!</a>
        </div>
    </div>`

    return cardHtml;
}

function getLinkHtml(title, href){
    const linkHtml = `
    <li class="nav-item">
        <a class="nav-link text-dark" target="_blank" href="${href}">${title}</a>
    </li>`

    return linkHtml;
}

function addCards(){
    const navCardsDiv = document.querySelector('#nav-cards');
    let innerHTML = ``
    for (const index in navCards){
        const {title, paragraph, href} = navCards[index];
        innerHTML=innerHTML+getCardHtml(title, paragraph, href);
    }
    navCardsDiv.innerHTML=innerHTML;
}

function addLinks(){
    const navDropdownLinksDiv = document.querySelector('#nav-dropdown-links');
    let innerHTML = ``
    for (const index in navCards){
        const {title, href} = navCards[index];
        innerHTML=innerHTML+getLinkHtml(title, href);
    }
    navDropdownLinksDiv.innerHTML=innerHTML;
}

function init(){
    addLinks();
    addCards();
}

init();
let zIndexCounter = 5;

function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
  
    if(hh == 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
     ss = (ss < 10) ? "0" + ss : ss;
      
     let time = hh + ":" + mm + ":" + ss + " " + session;
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ currentTime() }, 1000);
}
currentTime();

function populateProjects(){
    const projects = [
        {href:'https://gentle-dawn-74672.herokuapp.com/#/login', name: 'mem'},
        {href:'https://saacostam.github.io/fake-store/#/explore', name: 'fake store'},
        {href:'https://saacostam.github.io/portfolio/#/piano-roll', name:'piano roll'},
        {href:'https://saacostam.github.io/portfolio/#/slippery-slope', name:'slippery slope'},
        {href:'https://saacostam.github.io/portfolio/#/vanilla-js-tetris', name: 'tetris'},
        {href:'https://saacostam.github.io/portfolio/#/', name: 'portfolio'},
    ];

    const projectsMenuUl = document.querySelector('#projects-menu');

    function getHTML(href, name){
        return `<li class="project-ref">
            <a href="${href}" target="_blank">
                <img src="./img/folder.png" alt="folder">
                <div class="project-name">${name}</div>
            </a>
        </li>`
    }

    for (const index in projects){
        const project = projects[index]; 
        const projectHTML = getHTML(project.href, project.name);
        projectsMenuUl.innerHTML += projectHTML;
    }
}
populateProjects();

function setWindow(id){
    const windowClose = document.querySelector(`#${id} .window-close`);
    windowClose.addEventListener('click', ()=>{
        const window = document.querySelector(`#${id}`);
        window.style.display = 'none';
    })

    const windowIcon = document.querySelector(`#desktop-icon-${id}`);
    windowIcon.addEventListener('click', ()=>{
        const window = document.querySelector(`#${id}`);
        window.style.display = 'block';
        window.style.zIndex = ''+zIndexCounter
        zIndexCounter+=1;
    })

    const windowNavOption = document.querySelector(`#nav-menu-${id}`);
    windowNavOption.addEventListener('click', ()=>{
        const window = document.querySelector(`#${id}`);
        window.style.display = 'block';
        window.style.zIndex = ''+zIndexCounter
        zIndexCounter+=1;
    })
}
setWindow('projects');
setWindow('about-me');
setWindow('props');
document.querySelector('#reserve-table-button').addEventListener('click', ()=>{
    $('#exampleModal').modal('show')
})

document.querySelector('#close-button').addEventListener('click', ()=>{
    $('#exampleModal').modal('hide')
})

document.querySelector('#cancel-button').addEventListener('click', ()=>{
    $('#exampleModal').modal('hide')
})
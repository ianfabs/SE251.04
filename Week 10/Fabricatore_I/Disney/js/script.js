const url = 'http://ict.neit.edu/evanrense/disney/disney.php';

document.querySelector('.btn-group').querySelectorAll('[type=button]').forEach( (btn)=>{
    let idx = btn.getAttribute('data-idx');
    btn.addEventListener('click',(e)=>{
        fetch(url+"?character="+idx, {method: "GET"})
        .then( res => res.json() )
        .then( res => {
            console.log(res);
            document.querySelector('#name').innerText = res.name;
            document.querySelector('#quote').innerText = res.quote;
            document.querySelector('#image').setAttribute('src', res.image)
        } )
    })
} );
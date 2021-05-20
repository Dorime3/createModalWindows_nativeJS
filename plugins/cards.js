$.createCard = function(products) {
    const row = document.querySelector('.row');
    products.forEach(prod => {
        row.innerHTML += `
        <div class="col">
        <div class="card">
            <img class="card-img-top" style="height:450px;" src=${prod.img} >
            <div class="card-body">
              <h5 class="card-title">${prod.name}</h5>
              <a href="#" class="btn btn-primary" id="definition" data-id="${prod.id}">Посмотреть цену</a>
              <a href="#" class="btn btn-danger" id="delete" data-id="${prod.id}">Удалить</a>
            </div>
          </div>
        </div>
        `;

        const def = document.querySelectorAll('#definition');
        def.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const id = +e.target.getAttribute(['data-id']);
                const fruit = fruits.find(f => f.id === id);
                priceModal.setContent(`
                <h4>Вкусные ${fruit.name}</h4>
                <p>Стоят: <strong>${fruit.price}$</strong></p>
                `);
                priceModal.open();
                console.log(fruit);
            })
        });

        // удаление карточки из домдерева
        const deleteBtn = document.querySelectorAll('#delete');
        deleteBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = +e.target.getAttribute(['data-id']);
                const fruit = fruits.find(f => f.id === id);
                $.confirm({
                    title: 'Вы уверены?',
                    content: `<p>Вы удаляете фрукт: <strong>${fruit.name}</strong></p>`,
                }).then(() => {
                    fruits = fruits.filter(f => f.id != id);
                    row.innerHTML = '';
                    $.createCard(fruits);
                }).catch(() => {
                    console.log('Cancel');
                })
            })
        })
    });

}











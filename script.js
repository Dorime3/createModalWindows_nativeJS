const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Купить', type: 'primary', handler() {
            priceModal.close();
        }}
    ]
    
});


let fruits = [
    {id: 1, name: 'аплоки', price: 10, img: "https://www.osnmedia.ru/wp-content/uploads/2021/02/izobrazhenie_2021-02-27_165851-min.png"},
    {id: 2, name: 'липисины', price: 20, img: "https://domstrousam.ru/wp-content/uploads/2021/04/apelsin_kisliy.jpg"},
    {id: 3, name: 'мангустины', price: 30, img: "https://eda-land.ru/images/article/orig/2018/06/dozrevanie-mango-v-domashnih-usloviyah.jpg"}
];

let createCard = $.createCard(fruits);




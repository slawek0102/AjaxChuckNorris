let url:string = 'http://jsonplaceholder.typicode.com/users';

let buttonNextUser = document.querySelector('#get-next-user');
let buttonPreviousUser = document.querySelector('#get-previous-user');
let paragrph = document.querySelector('#user');


window.addEventListener('load', function () {
    localStorage.clear();
    getAllUsersIntoStorage();
    localStorage.setItem('CurrentIndex', '0');   //wartosc indexu zapisuje w Storage zamiast jako zmiennej przekazywanej z funkcji do funkcji . Czy to dobra praktyka?
    // displayUser(0);  <=== niestety nie dziala, gdyz sciagam dane asynchronicznie i danych jeszcze nie ma gdy funkcja displayUser(0) jest wykonywana. Nie wiem jak to poprawić bez uzywania funkcji synchronicznej.
});

buttonNextUser.addEventListener('click', function () {
    let currentIndex:number = parseInt(localStorage.getItem('CurrentIndex')) + 1;
    displayUser(currentIndex);
});

buttonPreviousUser.addEventListener('click', function () {
    let currentIndex:number = parseInt(localStorage.getItem('CurrentIndex')) - 1;
    displayUser(currentIndex);
});

function getAllUsersIntoStorage() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        localStorage.setItem('AllUsers', xhr.response);
    });
    xhr.send();
};

function displayUser(currentIndex:number) {
    if (currentIndex > 9) {
        currentIndex = 0
    };
    if (currentIndex < 0) {
        currentIndex = 9
    };
    let response = JSON.parse(localStorage.getItem('AllUsers'));
    paragrph.innerHTML = response[currentIndex].name;
    localStorage.setItem('CurrentIndex', currentIndex.toString());
}
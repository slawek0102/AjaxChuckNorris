var url = 'http://jsonplaceholder.typicode.com/users';
var buttonNextUser = document.querySelector('#get-next-user');
var buttonPreviousUser = document.querySelector('#get-previous-user');
var paragrph = document.querySelector('#user');
window.addEventListener('load', function () {
    localStorage.clear();
    getAllUsersIntoStorage();
    localStorage.setItem('CurrentIndex', '0'); //wartosc indexu zapisuje w Storage zamiast jako zmiennej przekazywanej z funkcji do funkcji . Czy to dobra praktyka?
    // displayUser(0);  <=== niestety nie dziala, gdyz sciagam dane asynchronicznie i danych jeszcze nie ma gdy funkcja displayUser(0) jest wykonywana. Nie wiem jak to poprawić bez uzywania funkcji synchronicznej.
});
buttonNextUser.addEventListener('click', function () {
    var currentIndex = parseInt(localStorage.getItem('CurrentIndex')) + 1;
    displayUser(currentIndex);
});
buttonPreviousUser.addEventListener('click', function () {
    var currentIndex = parseInt(localStorage.getItem('CurrentIndex')) - 1;
    displayUser(currentIndex);
});
function getAllUsersIntoStorage() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
        localStorage.setItem('AllUsers', xhr.response);
    });
    xhr.send();
}
;
function displayUser(currentIndex) {
    if (currentIndex > 9) {
        currentIndex = 0;
    }
    ;
    if (currentIndex < 0) {
        currentIndex = 9;
    }
    ;
    var response = JSON.parse(localStorage.getItem('AllUsers'));
    paragrph.innerHTML = response[currentIndex].name;
    localStorage.setItem('CurrentIndex', currentIndex.toString());
}
//# sourceMappingURL=AjaxChuckNoris.js.map
/**
* Задание 3: 
* Нужно реализовать функцию request, которая:
* Запрашивает данные о сесси у метода https://api.tinkoff.ru/v1/session и добавляет в запрос параметр sessionid
* Делает запрос в сторонее API за данными с параметром sessionid
* При этом: 
* Нужно добавить кэширование данных, что-бы мы ходили за данными только один раз
* Написать тесты на реализацию
* Интерфейс библиотеки:
* request('/v1/personal_info', { origin: 'web' }) 
* После вызова этого метода, должен уйти запрос по адресу - https://api.tinkoff.ru/v1/personal_info?origin=web&sessionid=Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02
*/

const cashe = {};


async function getSessionId() {
        if (cashe.sessionId) { 
            return cashe.sessionId; 
        }
        const response = await fetch('https://api.tinkoff.ru/v1/session');
        cashe.sessionId = (await response.json()).payload;
        return cashe.sessionId
}

async function request(api, getParams = {}) {
   const sessionid = await getSessionId();
   const url = new URL(`https://api.tinkoff.ru${api}`);

   for (let key in getParams) {
     url.searchParams.append(key, getParams[key])
   }

   url.searchParams.append('sessionid', sessionid);

   if (cashe[url]) {
       return cashe[url]
   }

   const response = await fetch(url);
   cashe[url] = await response.json();
   
   return await cashe[url]
}

export default request;
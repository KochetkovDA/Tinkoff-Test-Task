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

async function getSessionId() {
        const response = await fetch('https://api.tinkoff.ru/v1/session');
        const sessionId = (await response.json()).payload;
        return sessionId
}

async function getRequest (getSessionId) {
  const sessionid = getSessionId ? await getSessionId(): '';
  const cashe = {};
  return async (api, getParams = {}) => {
    const url = new URL(`https://api.tinkoff.ru${api}`);
 
    for (let key in getParams) {
      url.searchParams.append(key, getParams[key])
    }
    if (sessionid) {
      url.searchParams.append('sessionid', sessionid);
    }
    if (cashe[url]) {
        return cashe[url]
    }
 
    const response = await fetch(url);
    cashe[url] = await response.json();
    
    return await cashe[url]
 }
}

export {
  getRequest, 
  getSessionId,
};
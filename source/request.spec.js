import { getRequest, getSessionId } from './request'
import "regenerator-runtime";

describe('getSessionId: ', () => {
    beforeEach(() => {
        const mockSuccessResponse = {
            payload: 'Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02'
        }
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
                
        return global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });
    
    test('Должен быть вызван fetch с нужным url', async () => {
        await getSessionId();
        expect(fetch).toHaveBeenCalledWith('https://api.tinkoff.ru/v1/session');
    })
        
    test('Должен вернуть sessionId', async () => {
        const sessionId = await getSessionId();
        expect(sessionId).toBe('Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02');
    })
})

describe('getRequest: ', () => {
    const getSessionId = jest.fn();
    
    test('Должен быть вызван getSessionId', async () => {
        await getRequest(getSessionId);
        expect(getSessionId).toHaveBeenCalled();
    })
    
    test('Должен вернуть Function', async () => {
        const request = await getRequest(getSessionId);
        expect(request).toBeInstanceOf(Function);
    })
})
    
    
describe('request: ', () => {
    const getSessionId = (() => 'Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02');
    beforeEach(() => {
        const mockSuccessResponse = {};
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
            json: () => mockJsonPromise,
        });
        global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    });

    describe('Должен быть вызван fetch с нужным url', () => {
        test('Когда передано только api', async () => {
            const request = await getRequest(getSessionId);
            await request('/v1/personal_info');
            expect(fetch.mock.calls[0][0].href)
                .toMatch('https://api.tinkoff.ru/v1/personal_info?sessionid=Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02');
        })

        test('Когда передан один get параметр', async () => {
            const request = await getRequest(getSessionId);
            await request('/v1/personal_info', { origin: 'web'});
            expect(fetch.mock.calls[0][0].href)
                .toMatch("https://api.tinkoff.ru/v1/personal_info?origin=web&sessionid=Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02");
        })
        
        test('Когда передано несколько get параметров', async () => {
            const request = await getRequest(getSessionId);
            await request('/v1/personal_info', { origin: 'web', param: 123 });
            expect(fetch.mock.calls[0][0].href)
                .toMatch("https://api.tinkoff.ru/v1/personal_info?origin=web&param=123&sessionid=Kw6fYMrCrCNfTgWlIQpeNOr6ZzhuErfc.m1-prod-api02");
        })
    }) 
    
    test('Должен вернуть результат из кэша', async () => {
            const request = await getRequest(getSessionId);
            await request('/v1/personal_info', { origin: 'web'});
            await request('/v1/personal_info', { origin: 'web'});
            await request('/v1/personal_info', { origin: 'web'});
            expect(fetch).toHaveBeenCalledTimes(1);
    })

})
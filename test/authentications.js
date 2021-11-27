import supertest from 'supertest'
import { expect } from 'chai';

import { request, registerData, loginData } from './test';



let cookie = []
describe('Authentication', () => {
  it('POST /register updates the list of registered users(register user)[3 pts] ', function () {
    this.timeout(15000) // heroku starts slow
    return request
      .post('register')
      .send(registerData)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(registerData.username, '!!! /POST register does not return correct username: user in response data (' + resBody + ')')
        expect(res.body.result.toLowerCase()).to.eq('success', '!!! /POST register does not return correct result: \'success\' in response data (' + resBody + ')')
      })
  });

  it('POST /register updates the list of registered users(login using registered user)[3 pts]', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(registerData.username, '!!! /POST login does not return correct username: user in response data(' + resBody + ')')
        expect(res.body.result.toLowerCase()).to.eq('success', '!!! /POST login does not return correct result: \'success\' in response data (' + resBody + ')')
      })
  });


  it('POST /login returns a username and message (login response) [3 pts] ', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        console.log(loginData)
        const resBody = JSON.stringify(res.body);
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(loginData.username, '!!! /POST login does not return correct username: user in response data (' + resBody + ')')
        expect(res.body.result.toLowerCase()).to.eq('success', '!!! /POST login does not return correct result: \'success\' in response data (' + resBody + ')')
      })
  });

  it('POST /login returns a username and message (cookie http-only) [3 pts] ', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        cookie = res.headers['set-cookie']
        console.log('### Cookie Result after login: ' + res.headers['set-cookie'])
        expect(cookie[0]).to.have.string('HttpOnly', '!!! The cookie is not http only! (' + res.headers['set-cookie'] + ')')
      })
  });

  it('POST /login returns a username and message(is authenticated after login)[3 pts] ', function () {
    return request
      .put('headline')
      .set('Cookie', cookie)
      .send({ headline: 'I am new' })
      .then((res) => {
        console.log(loginData)
        console.log(cookie)
        expect(res.status, res.err).to.eq(200)
      })

  })

  it('PUT /logout logs out user and removes session id(put logout success) [3 pts]', function () {
    return request
      .put('logout')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.status).to.eq(200)
      })
  })

  it('PUT /logout logs out user and removes session id(no auth after logout) [3 pts]', function () {
    return request
      .get('headline')
      .then((res) => {
        expect(res.status).to.eq(401)
      })
  })
})

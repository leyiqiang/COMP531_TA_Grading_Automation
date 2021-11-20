import supertest from 'supertest'
import { expect } from 'chai';

import {request} from './test';

const testUser1 = 'userTestOne' + new Date().getTime() // in case of repeat username
const testUser2 = 'userTestTwo' + new Date().getTime()
const password = 'AxoGyO9wjzESAFnL!' // in case someone have strong password verification
const dob = '11/1/1990'
const email = 'usertestone@gmail.com'
const zipcode = '12345'

const registerData = {
  'username': testUser1,
  'password': password,
  'email': email,
  'dob': dob,
  'zipcode': zipcode
}

export const loginData = {
  'username': testUser1,
  'password': password,
}

let cookie = []
describe('Authentications', () => {
  it('POST /register updates the list of registered users(register user)[3 pts] ', function () {
    return request
      .post('register')
      .send(registerData)
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1, '!!! /POST register does not return correct username: user in response data')
        expect(res.body.result).to.eq('success', '!!! /POST register does not return correct result: \'success\' in response data')
      })
  });

  it('POST /register updates the list of registered users(login using registered user)[3 pts]', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1, '!!! /POST login does not return correct username: user in response data')
        expect(res.body.result).to.eq('success', '!!! /POST login does not return correct result: \'success\' in response data')
      })
  });

  it('POST /login returns a username and message (login response) [3 pts] ', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1, '!!! /POST login does not return correct username: user in response data')
        expect(res.body.result).to.eq('success', '!!! /POST login does not return correct result: \'success\' in response data')
      })
  });

  it('POST /login returns a username and message (login response) [3 pts] ', function () {
    return request
      .post('login')
      .send(loginData)
      .then((res) => {
        cookie = res.headers['set-cookie']
        expect(cookie[0]).to.have.string('HttpOnly', '!!! The cookie is not http only![3 pts]')
        console.log('### Cookie Result after login: ' + res.headers['set-cookie'])
      })
  });

  it('POST /login returns a username and message(is authenticated after login)[3 pts] ', function () {
    return request
      .get('headline')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.status).to.eq(200)
      })
  });

  it('PUT /logout logs out user and removes session id(put logout success) [3 pts]', function() {
    return request
      .put('logout')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.status).to.eq(200)
      })
  })

  it('PUT /logout logs out user and removes session id(no auth after logout) [3 pts]', function() {
    return request
      .get('headline')
      .then((res) => {
        expect(res.status).to.eq(401)
      })
  })

})

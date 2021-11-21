import { request } from './test';
import { expect } from 'chai';
import { json } from 'mocha/lib/reporters';


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

const loginData = {
  'username': testUser1,
  'password': password,
}

let cookie = []


describe('Users/Followers', () => {
  before(() => {
    return request
      .post('register')
      .send(registerData)
      .then((res) => {
        return request
          .post('login')
          .send(loginData)
          .then((res) => {
            cookie = res.headers['set-cookie']
          })
      })
  })


  it('Stub: GET /following/:user? [2 pts] ', function () {
    return request
      .get('following')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /following res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body.username, "!!! GET /following returns invalid username: " + resBody).to.eq(testUser1)
        expect(res.body.following, "!!! GET /following returns invalid followers list: " + resBody).to.have.lengthOf(0);

        return request
          .get('following/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            const resBody = JSON.stringify(res.body);
            console.log('### GET /following/testUser1 res data: ' + resBody)
            expect(res.status).to.eq(200)
            expect(res.body.username, "!!! GET /following/testUser1 returns invalid username: " + resBody).to.eq(testUser1)
            expect(res.body.following, "!!! GET /following/testUser1 returns invalid followers list: " + resBody).to.have.lengthOf(0)
          })
      })
  })

  it('Stub: PUT /following/:user [2 pts] ', function () {
    const newUser = 'userx';
    return request
      .put('following/'+newUser)
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /following/:user res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body.username, "!!! PUT /following/:user returns invalid username: " + resBody).to.eq(testUser1)
        expect(res.body.following, "!!! PUT /following/:user returns invalid followers list: " + resBody).to.have.lengthOf(1)
      })
  })


  it('Stub: DELETE /following/:user [2 pts] ', function () {
    const newUser = 'userx';
    return request
      .delete('following/'+newUser)
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### DELETE /following/:user res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body.username, "!!! DELETE /following/:user returns invalid username: " + resBody).to.eq(testUser1)
        expect(res.body.following, "!!! DELETE /following/:user returns invalid follower list: " + resBody).to.have.lengthOf(0)
      })
  })

})

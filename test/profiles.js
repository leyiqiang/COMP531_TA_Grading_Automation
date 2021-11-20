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


describe('Headlines and Profiles', () => {
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

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline) [3 pts] ', function () {
    return request
      .get('headline')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /headline res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.headline, '!!! GET /headline does not have headline field in response').to.not.be.empty;
      })
  })

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline/user) [3 pts] ', function () {
    return request
      .get('headline/' + testUser1)
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /headline/testUser1 res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.headline, '!!! GET /headline/testUser1 does not have headline field in response').to.not.be.empty;
      })
  })

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline/Bret) [3 pts] ', function () {
    return request
      .get('headline/Bret')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /headline/Bret res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.headline, '!!! GET /headline/Bret does not have headline field in response').to.not.be.empty;
      })
  })

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline/notfound) [3 pts] ', function () {
    return request
      .get('headline/asjdklsdjflkdjlfkjwelkfjlk')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /headline/notfound res data: ' + JSON.stringify(res.body))
        expect(res.status).to.not.eq(200)
        expect(res.body.headline, '!!! GET /headline/notfound should not have headline field in response').to.be.undefined;
      })
  })

  it('PUT /headline updates the headline message [3 pts] ', function () {
    const updatedHeadline = 'my cool new headline 123'
    return request
      .put('headline')
      .set('Cookie', cookie)
      .send({ headline: updatedHeadline })
      .then((res) => {
        console.log('### PUT /headline res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.headline, '!!! PUT /headline does not update headline!').to.eq(updatedHeadline);
        return request.get('headline/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.headline, '!!! PUT /headline does not update headline!').to.eq(updatedHeadline);
          })
      })
  })


  it('Stub: PUT /password [2 pts] ', function () {
    return request
      .put('password')
      .set('Cookie', cookie)
      .send({ password: 'myNewPassword123!@' })
      .then((res) => {
        console.log('### PUT /password res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.result.toLowerCase()).to.eq('success')
      })
  })


  it('Stub: GET /email/:user? [2 pts] ', function () {
    return request
      .get('email')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /email res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.email).to.eq(email)

        return request
          .get('email/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            console.log('### GET /email/testUser1 res data: ' + JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body.username).to.eq(testUser1)
            expect(res.body.email).to.eq(email)
          })
      })
  })


  it('Stub: PUT /email [2 pts] ', function () {
    const newEmail = 'happy123@gmail.com';
    return request
      .put('email')
      .set('Cookie', cookie)
      .send({ email: newEmail })
      .then((res) => {
        console.log('### PUT /email res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.email).to.eq(newEmail)
      })
  })


  it('Stub: GET /zipcode/:user? [2 pts] ', function () {
    return request
      .get('zipcode')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /zipcode res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.zipcode.toString()).to.eq(zipcode.toString())

        return request
          .get('zipcode/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            console.log('### GET /zipcode/testUser1 res data: ' + JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body.username).to.eq(testUser1)
            expect(res.body.zipcode.toString()).to.eq(zipcode.toString())
          })
      })
  })


  it('Stub: PUT /zipcode [2 pts] ', function () {
    const newZip = '54321';
    return request
      .put('zipcode')
      .set('Cookie', cookie)
      .send({ zipcode: newZip })
      .then((res) => {
        console.log('### PUT /zipcode res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.zipcode.toString()).to.eq(newZip.toString())
      })
  })


  it('Stub: GET /avatar/:user? [2 pts] ', function () {
    return request
      .get('avatar')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /avatar res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.avatar).to.not.be.empty

        return request
          .get('avatar/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            console.log('### GET /avatar/testUser1 res data: ' + JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body.username).to.eq(testUser1)
            expect(res.body.avatar).to.not.be.empty
          })
      })
  })


  it('Stub: GET /dob/:user? [2 pts] ', function () {
    return request
      .get('dob')
      .set('Cookie', cookie)
      .then((res) => {
        console.log('### GET /dob res data: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.username).to.eq(testUser1)
        expect(res.body.dob).to.not.be.empty

        return request
          .get('dob/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            console.log('### GET /dob/testUser1 res data: ' + JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body.username).to.eq(testUser1)
            expect(res.body.dob).to.not.be.empty
          })
      })
  })


})

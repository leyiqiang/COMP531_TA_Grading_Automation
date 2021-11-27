import { request, registerData, loginData } from './test';
import { expect } from 'chai';
import { json } from 'mocha/lib/reporters';


let cookie = []


describe('Headlines and Profiles', () => {
  before( () => {
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

  it('PUT /headline updates the headline message [3 pts] ', function () {
    const updatedHeadline = 'my cool new headline 123'
    return request
      .put('headline')
      .set('Cookie', cookie)
      .send({ "headline": updatedHeadline })
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /headline res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['headline'], '!!! PUT /headline does not update headline!: ' + resBody).to.eq(updatedHeadline);
        return request
          .get('headline/' + loginData.username)
          .set('Cookie', cookie)
          .then((res2) => {
            const resBody = JSON.stringify(res2.body);
            expect(res2.status).to.eq(200)
            expect(res2.body['headline'], '!!! PUT /headline does not update headline!: ' + resBody).to.eq(updatedHeadline);
          })
      })
  })

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline) [3 pts] ', function () {
    return request
      .get('headline')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /headline res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['headline'], '!!! GET /headline does not have headline field in response (' + resBody + ')').to.be.ok;
      })
  })

  it('GET /headline/:user? returns the headline messages for requested users(GET /headline/user) [3 pts] ', function () {
    return request
      .get('headline/' + loginData.username)
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /headline/testUser1 res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['headline'], '!!! GET /headline/testUser1 does not have headline field in response:' + resBody).to.be.ok;
      })
  })


  it('GET /headline/:user? returns the headline messages for requested users(GET /headline/notfound) [3 pts] ', function () {
    return request
      .get('headline/asjdklsdjflkdjlfkjwelkfjlk')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /headline/notfound res data: ' + resBody)
        expect(res.status).to.not.eq(200)
        expect(res.body['headline'], '!!! GET /headline/notfound should not have headline field in response: ' + resBody).to.be.undefined;
      })
  })


  it('Stub: PUT /password [2 pts] ', function () {
    return request
      .put('password')
      .set('Cookie', cookie)
      .send({ password: 'myNewPassword123!@' })
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /password res data: ' + resBody)
        if(res.headers['set-cookie']) {
          cookie = res.headers['set-cookie']
        }
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! PUT /password returns invalid username: ' + resBody).to.be.ok
        expect(res.body['result'].toLowerCase(), '!!! PUT /password does not return success message: ' + resBody).to.eq('success')
      })
  })


  it('Stub: GET /email/:user? [2 pts] ', function () {
    return request
      .get('email')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /email res data: ' + resBody)
        expect(res.status).to.eq(200)
        let email = res.body['email'] || res.body['emailAddress']
        expect(res.body['username'], '!!! GET /email returns invalid username: ' + resBody).to.be.ok
        expect(email, '!!! GET /email returns invalid email: ' + resBody).to.be.ok

        return request
          .get('email/' + loginData.username)
          .set('Cookie', cookie)
          .then((res) => {
            const resBody = JSON.stringify(res.body);
            console.log('### GET /email/testUser1 res data: ' + resBody)
            expect(res.status).to.eq(200)
            let email = res.body['email'] || res.body['emailAddress']
            expect(res.body['username'], '!!! GET email/testUser1 returns invalid username: ' + resBody).to.be.ok
            expect(email, '!!! GET email/testUser1 returns invalid email: ' + resBody).to.be.ok
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
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /email res data: ' + resBody)
        expect(res.status).to.eq(200)
        let email = res.body['email'] || res.body['emailAddress']
        expect(res.body['username'], '!!! PUT /email returns invalid username: ' + resBody).to.be.ok
        expect(email, '!!! PUT /email returns invalid email: ' + resBody).to.be.ok
      })
  })


  it('Stub: GET /zipcode/:user? [2 pts] ', function () {
    return request
      .get('zipcode')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /zipcode res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! GET /zipcode returns invalid username: ' + resBody).to.be.ok
        expect(res.body['zipcode'].toString(), '!!! GET /zipcode returns invalid zipcode: ' + resBody).to.be.ok

        return request
          .get('zipcode/' + loginData.username)
          .set('Cookie', cookie)
          .then((res) => {
            const resBody = JSON.stringify(res.body);
            console.log('### GET /zipcode/testUser1 res data: ' + resBody)
            expect(res.status).to.eq(200)
            expect(res.body['username'], '!!! GET /zipcode/testUser1 returns invalid username: ' + resBody).to.be.ok
            expect(res.body['zipcode'].toString(), '!!! GET /zipcode/testUser1 returns invalid zipcode: ' + resBody).to.be.ok
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
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /zipcode res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! PUT /zipcode returns invalid username: ' + resBody).to.be.ok
        expect(res.body['zipcode'], '!!! PUT /zipcode returns invalid zipcode: ' + resBody).to.be.ok
      })
  })


  it('Stub: GET /avatar/:user? [2 pts] ', function () {
    return request
      .get('avatar')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /avatar res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! GET /avatar returns invalid username: ' + resBody).to.be.ok
        expect(res.body['avatar'], '!!! GET /avatar returns invalid avatar: ' + resBody).to.be.ok

        return request
          .get('avatar/' + loginData.username)
          .set('Cookie', cookie)
          .then((res) => {
            const resBody = JSON.stringify(res.body);
            console.log('### GET /avatar/testUser1 res data: ' + resBody)
            expect(res.status).to.eq(200)
            expect(res.body['username'], '!!! GET /avatar/testUser1 returns invalid username: ' + resBody).to.be.ok
            expect(res.body['avatar'], '!!! GET /avatar/testUser1 returns invalid avatar: ' + resBody).to.be.ok
          })
      })
  })


  it('Stub: PUT /avatar [2 pts] ', function () {
    const avatar = 'randomUrl';
    return request
      .put('avatar')
      .set('Cookie', cookie)
      .send({ avatar })
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### PUT /avatar res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! PUT /avatar returns invalid username: ' + resBody).to.be.ok
        expect(res.body['avatar'], '!!! PUT /avatar returns invalid avatar: ' + resBody).to.be.ok
      })
  })


  it('Stub: GET /dob/:user? [2 pts] ', function () {
    return request
      .get('dob')
      .set('Cookie', cookie)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### GET /dob res data: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body['username'], '!!! GET /dob returns invalid username: ' + resBody).to.be.ok
        expect(res.body['dob'], '!!! GET /dob returns invalid dob: ' + resBody).to.be.ok
        return request
          .get('dob/' + registerData.username)
          .set('Cookie', cookie)
          .then((res) => {
            console.log('### GET /dob/testUser1 res data: ' + JSON.stringify(res.body))
            expect(res.status).to.eq(200)
            expect(res.body['username'], '!!! GET /dob/testUer1 returns invalid username: ' + resBody).to.be.ok
            expect(res.body['dob'], '!!! GET /dob/testUser1 returns invalid dob: ' + resBody).to.be.ok
          })
      })
  })
})

import { request, registerData, loginData } from './test';
import { expect } from 'chai';
import { json } from 'mocha/lib/reporters';


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
        let following = res.body['following'] || res.body['followings']
        expect(res.status).to.eq(200)
        expect(res.body['username'], "!!! GET /following returns invalid username: " + resBody).to.be.ok
        expect(following, "!!! GET /following returns invalid followers list: " + resBody).to.be.ok;

        return request
          .get('following/' + testUser1)
          .set('Cookie', cookie)
          .then((res) => {
            const resBody = JSON.stringify(res.body);
            console.log('### GET /following/testUser1 res data: ' + resBody)
            let following = res.body['following'] || res.body['followings']
            expect(res.status).to.eq(200)
            expect(res.body['username'], "!!! GET /following/testUser1 returns invalid username: " + resBody).to.be.ok
            expect(following, "!!! GET /following/testUser1 returns invalid followers list: " + resBody).to.be.ok
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
        expect(res.status).that.is.oneOf([200, 400])
        if (res.status === 200) {
          let following = res.body['following'] || res.body['followings']
          expect(res.body['username'], "!!! PUT /following/:user returns invalid username: " + resBody).to.be.ok
          expect(following, "!!! PUT /following/:user returns invalid followers list: " + resBody).to.not.have.lengthOf(0)
        } else {
            // todo
        }
        expect(res.status).to.eq(200)
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
        let following = res.body['following'] || res.body['followings']
        expect(res.body['username'], "!!! DELETE /following/:user returns invalid username: " + resBody).to.be.ok
        expect(following, "!!! DELETE /following/:user returns invalid follower list: " + resBody).to.be.ok
      })
  })

})

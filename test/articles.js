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


describe('Articles', () => {
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

  it('GET /articles returns articles for logged in user [3 pts] ', function () {
    return request
      .get('articles')
      .set('Cookie', cookie)
      .then((res) => {
        console.log("### Get /articles of testUser1 response: " + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.articles).to.be.empty
      })
  })

  it('POST /article returns an array of articles with newly added article [3 pts] ', function () {
    const articleData = {
      text: "My New Article"
    }
    return request
      .post('article')
      .set('Cookie', cookie)
      .send(articleData)
      .then((res) => {
        console.log("### POST /article response: " + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
        expect(res.body.articles).to.have.lengthOf(1)
      })
  })
})

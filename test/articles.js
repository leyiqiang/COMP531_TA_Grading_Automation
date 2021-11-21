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
let articleID = []

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
        const resBody = JSON.stringify(res.body);
        console.log('### Get /articles of testUser1 response: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body.articles, '!!! res.body.articles is undefined: ' + resBody).to.not.be.undefined
        expect(res.body.articles, '!!! get article of a new user is invalid: ' + resBody).to.be.ok
      })
  })
  let articleResult = []
  it('POST /article returns an array of articles with newly added article [3 pts] ', function () {
    const articleData = {
      text: 'My New Article'
    }
    return request
      .post('article')
      .set('Cookie', cookie)
      .send(articleData)
      .then((res) => {
        const resBody = JSON.stringify(res.body);
        console.log('### POST /article response: ' + resBody)
        expect(res.status).to.eq(200)
        expect(res.body.articles, '!!! res.body.articles is undefined: ' + resBody).to.not.be.undefined
        expect(res.body.articles).to.have.lengthOf(1)
        articleResult = res.body.articles;
      })
  })

  it('PUT /articles/:id (article text) [3 pts] ', function () {
    const articleData = {
      text: 'new data'
    }
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')
    console.log(articleResult)
    return request
      .put('articles/' + articleResult[0]['_id'].toString())
      .set('Cookie', cookie)
      .send(articleData)
      .then((res) => {
        console.log('### PUT /article/1 response: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
      })
  })

  it('PUT /articles/:id (new comment) [3 pts] ', function () {
    const commentData = {
      text: 'new comment',
      commentId: -1
    }
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')
    console.log(articleResult)
    return request
      .put('articles/' + articleResult[0]['_id'].toString())
      .set('Cookie', cookie)
      .send(commentData)
      .then((res) => {
        console.log('### PUT /article/:id with new comment response: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
      })
  })

  it('PUT /articles/:id (modify comment) [3 pts] ', function () {
    const commentData = {
      text: 'updated comment',
      commentId: 0
    }
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')
    console.log(articleResult)
    return request
      .put('articles/' + articleResult[0]['_id'].toString())
      .set('Cookie', cookie)
      .send(commentData)
      .then((res) => {
        console.log('### PUT /article/:id with new comment response: ' + JSON.stringify(res.body))
        expect(res.status).to.eq(200)
      })
  })
})

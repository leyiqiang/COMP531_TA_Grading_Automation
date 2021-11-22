import { request } from './test';
import { expect } from 'chai';
import { json } from 'mocha/lib/reporters';

const ARTICLES = 'articles'
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

        let articles = res.body[ARTICLES] || res.body
        expect(res.status).to.eq(200)
        expect(articles, '!!! res.body.articles is undefined: ' + resBody).to.not.be.undefined
        expect(articles, '!!! get article of a new user is invalid: ' + resBody).to.be.ok
      })
  })
  it('POST /article returns an array of articles with newly added article [3 pts] ', async function () {
    const articleData = {
      text: 'My New Article'
    }

    const articleData2 = {
      text: 'My Second Article'
    }
    const articleData3 = {
      text: 'My 3d Article'
    }

    let post0 = await request
      .post('article')
      .set('Cookie', cookie)
      .send(articleData)
    let post1 = await request
      .post('article')
      .set('Cookie', cookie)
      .send(articleData2)

    let res = await request
      .get('articles')
      .set('Cookie', cookie)
    const resBody = JSON.stringify(res.body);
    console.log('### POST /article response: ' + resBody)

    let articles = res.body[ARTICLES] || res.body
    let post0Article = post0.body[ARTICLES] || post0.body
    expect(res.status).to.eq(200)
    expect(articles, '!!! res.body.articles is undefined: ' + resBody).to.not.be.undefined
    expect(articles).to.have.length.greaterThanOrEqual(2)
    expect(post0Article).to.have.lengthOf(1)

    return
  })

  let articleResult;
  let commentList = []
  it('PUT /articles/:id (article text) [3 pts] ', async function () {
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')

    const articleData = {
      text: 'new data'
    }
    // let afterPostRequest = await request
    //   .get('articles')
    //   .set('Cookie', cookie)
    // articleResult = afterPostRequest.body[ARTICLES] || afterPostRequest.body

    // let afterPostRequestBody = JSON.stringify(afterPostRequest.body)
    // console.log('### GET /articles(after added two articles) response: ' + afterPostRequestBody)

    // expect(afterPostRequest.status).to.eq(200)
    // expect(articleResult, '!!! res.body.articles is undefined: ' + afterPostRequestBody).to.not.be.undefined
    // expect(articleResult).to.have.length.greaterThanOrEqual(2)

    // let pid = articleResult[0]['pid'] || articleResult[0]['_id']
    let res = await request
      .put('articles/' + 'stub')
      .set('Cookie', cookie)
      .send(articleData)

    console.log('### PUT /article/pid response: ' + JSON.stringify(res.body))

    // let articles = res.body[ARTICLES] || res.body
    expect(res.status).to.eq(200)
    // expect(articles).to.have.lengthOf(2)
    return
  })

  it('STUB PUT /articles/:id (new comment) [3 pts] ', async function () {
    const commentData = {
      text: 'new comment',
      commentId: -1
    }
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')

    // let pid = articleResult[0]['pid'] || articleResult[0]['_id']
    let res = await request
      .put('articles/' + '1')
      .set('Cookie', cookie)
      .send(commentData)

    console.log('### STUB PUT /article/:id with new comment response: ' + JSON.stringify(res.body))

    // let articles = res.body[ARTICLES] || res.body
    // commentList = articles[0]['comments'] || articles[0]['comment']
    expect(res.status).to.eq(200)
    // expect(commentList).to.have.length.greaterThan(0)
    return
  })

  it('STUB PUT /articles/:id (modify comment) [3 pts] ', async function () {
    const commentData = {
      text: 'updated comment',
      commentId: 'stub'
      // commentId: commentList[0]['commentId'] || commentList[0]['cid'] || commentList[0]['id'] || commentList[0]['_id']
    }
    console.log('!!!!!!! IMPORTANT: if the PUT /articles/:id test failed, you need to check the article id first, some students may not using _id as the article id, you may need to modify the put request with the correct article id !!!!!!')

    // let pid = articleResult[0]['pid'] || articleResult[0]['_id']
    let res = await request
      .put('articles/' + '1')
      .set('Cookie', cookie)
      .send(commentData)
    console.log('### PUT /articles/:id with new comment response: ' + JSON.stringify(res.body))
    expect(res.status).to.eq(200)
    return
  })
})

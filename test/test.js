import supertest from 'supertest';
import { expect } from 'chai';

export const APP_URL = "https://ricebackendserver.herokuapp.com/";
export const request = supertest(APP_URL)

export const testUser1 = 'userTestOne' + new Date().getTime() // in case of repeat username
// export const testUser2 = 'userTestTwo' + new Date().getTime()
export const password = 'AxoGyO9wjzESAFnL!' // in case someone have strong password verification
export const dob = '11/1/1990'
export const email = 'usertestone@gmail.com'
export const zipcode = '12345'

export const registerData = {
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
describe('General', () => {

  it('Should hosted on heroku', () => {
    expect(APP_URL).to.contains("herokuapp.com");
  });
})
require('./authentications.js')
require('./profiles.js')
require('./users.js')
require('./articles.js')

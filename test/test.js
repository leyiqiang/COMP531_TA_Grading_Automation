import supertest from 'supertest';
import { expect } from 'chai';

// export const APP_URL = "...";
export const APP_URL = "localhost:3000/";
export const request = supertest(APP_URL)

// In case the newly registered data not working,
// and the student provides login info
let studentLoginUsername = 'starkkk';
let studentLoginPassword = '123';

export const testUser1 = 'userTestOne' + new Date().getTime() // in case of repeat username
// export const testUser2 = 'userTestTwo' + new Date().getTime()
export const password = 'AxoGyO9wjzESAFnL!' // in case someone have strong password verification
export const dob = '11/1/1990'
export const email = 'usertestone@gmail.com'
export const zipcode = '12345'
export const avatar = "testurl"
export const phone = '123-123-1234'

export const registerData = {
  'username': testUser1,
  'password': password,
  'name': testUser1,
  'email': email,
  'dob': dob,
  'phone': phone,
  'avatar': avatar,
  'dateOfBirth': dob,
  'zipcode': zipcode
}

export const loginData = {
  'username': studentLoginUsername || testUser1,
  'password': studentLoginPassword || password,
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

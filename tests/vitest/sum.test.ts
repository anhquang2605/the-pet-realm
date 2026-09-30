import { expect, test, describe } from 'vitest'
import sum from './sum'


describe('sum', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

  test('adds 1 + 4 to equal 5', () => {
    expect(sum(1, 4)).toBe(5)
  })

  test('adds -2 + 4 to equal 2', () => {
    expect(sum(-2, 4)).toBe(2)
  })

  test.only('adds 1 + 1 to equal 2', () => {
    expect(sum(1, 1)).toBe(2)
  }) //only this test will run

  test.skip('adds 1 + 3 to equal 4', () => {
    expect(sum(1, 3)).toBe(4)
  })//this test will be skipped

  test.todo('adds 1 + 1 to equal 2')//to mark futre test
})
 

interface User {
  name: string
  age: number
}

const createUser = (name: string, age: number): User => {
  return { name, age }
}

test('create user', () => {
  const user = createUser('John', 30)
  expect(user).toEqual({ name: 'John', age: 30 })
  expect(user.name).toBe('John');
})

//parameterized test
describe('create user with different ages', () => {
  const testCases = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 },
  ]
  //%i will seek out any intefger property, $property will seek out any property of the object
  test.each(testCases)('create user with age %i', (user) => {
    expect(createUser(user.name, user.age)).toEqual(user)
  })
  test.for([
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 },
  ])('create user with name $name and age $age', ({ name, age }) => {
    expect(createUser(name, age)).toEqual({ name, age })
  })
    
})
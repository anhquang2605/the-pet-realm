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

  test.skip('adds 1 + 1 to equal 2', () => {
    expect(sum(1, 1)).toBe(2)
  })//this test will be skipped

  test.todo('adds 1 + 1 to equal 2')//to mark futre test
})
 
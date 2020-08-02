import Payments from '../payments';

test('Valid card correct', () => {
  expect(Payments.isCardValid('4561261212345467')).toBeTruthy();
});

test('inValid card correct', () => {
  expect(Payments.isCardValid('4561261212345468')).toBeFalsy();
});

test('define payment', () => {
  expect(Payments.definePayment('4561261212345467')).toEqual('visa');
});
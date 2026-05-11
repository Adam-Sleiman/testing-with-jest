const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

// Egna tester för pop-funktionen
test('pop should return and remove the top element', () => {
    stack.push("apple");
    stack.push("banana");
    stack.push("cherry");
    const popped = stack.pop();
    expect(popped).toBe("cherry");
    // Kontrollera att elementet är borttaget genom att kolla peek
    expect(stack.peek()).toBe("banana");
});

test('pop on an empty stack should return undefined', () => {
    // Tom stack från tidigare test
    const popped = stack.pop();
    // Detta test kommer att misslyckas pga bugg - vi förväntar undefined men får något annat
    expect(popped).toBeUndefined();
});
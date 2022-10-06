import Storage from '../localStorage.js';

// eslint-disable-next-line func-names
const localStorageMock = (function () {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
}());

global.localStorage = localStorageMock;

describe('Task one: add and delete', () => {
  test('data is added into local storage', () => {
    const mockTodo = {
      description: 'json data',
      id: 1,
      completed: false,
    };

    const mockTodo2 = {
      description: 'jso',
      id: 2,
      completed: false,
    };

    const expected = [
      {
        id: 1,
        description: 'json data',
        completed: false,
      },
      {
        description: 'jso',
        id: 2,
        completed: false,
      },
    ];
    Storage.addTodo(mockTodo);
    Storage.addTodo(mockTodo2);
    expect(Storage.getToDo()).toEqual(expected);
  });

  test('Data is removed from local storage', () => {
    const expected = [
      {
        description: 'json data',
        id: 1,
        completed: false,
      },
    ];
    Storage.remove(2);
    expect(Storage.getToDo()).toStrictEqual(expected);
  });
});

  // edit description
  test('Edit updated description', () => {
    const tasks = {
      description: 'Update status',
      id: 2,
      completed: false,
    };
    const expected = [
      {
        description: 'Edit description',
        id: 2,
        completed: false,
      },
    ];

    Storage.addTodo(tasks);
    const output = Storage.updateDescription(2, 'Edit description', tasks);
    expect(output).toStrictEqual(expected);
  });
});

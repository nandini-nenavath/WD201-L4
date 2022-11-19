/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Refer the TODO LIST", () => {
  beforeAll(() => {
    add({
      title: "Sleep for an hour",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("Add a new todo to the list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Watch Shinchan movies to relax",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Finished the TODO LIST", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("The TODO which are overdue should be sorted", () => {
    let OD_LIST = overdue();

    expect(
      OD_LIST.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Get back the TODO of today", () => {
    let OD_LIST = dueToday();

    expect(
      OD_LIST.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("Get back the due TODOs for later", () => {
    let OD_LIST = dueLater();

    expect(
      OD_LIST.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});

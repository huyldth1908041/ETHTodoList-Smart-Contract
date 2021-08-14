const { assert } = require("chai")

const ToDoList = artifacts.require('TodoList.sol')

contract('ToDoList', (accounts) => {
  before(async () => {
    this.todoList = await ToDoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.todoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('list tasks', async () => {
      const taskCount = await this.todoList.taskCount()
      const task = await this.todoList.tasks(taskCount)
      assert.equal(task.id.toNumber(), taskCount.toNumber())
      assert.equal(task.content, "This a placeholder task")
      assert.equal(task.completed, false)
      assert.equal(taskCount.toNumber(), 1)
  })

  it('create task', async () => {
    const result = await this.todoList.createTask("New task");
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2);
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.content, "New task")
    assert.equal(event.completed, false)
  })

  it('toggle task complete', async () => {
    const result = await this.todoList.toggleComplete(1);
    const taskCount = await this.todoList.taskCount()
    assert.equal(taskCount, 2);
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })

  it('delete task', async () => {
    const result = await this.todoList.deleteTask(1);
    const taskCount = await this.todoList.taskCount()
    const deletedTask = await this.todoList.tasks(1)
    assert.equal(deletedTask.id.toNumber(), 0)
    assert.equal(deletedTask.content, "")
    assert.equal(deletedTask.completed, false)
    assert.equal(taskCount, 1)
  
  })


  it('update task', async () => {
    //before update
    const task = await this.todoList.tasks(2)

    assert.equal(task.content, "New task")
    assert.equal(task.completed, false)

    const result = await this.todoList.updateTask(2, "Updated task");
    const taskCount = await this.todoList.taskCount()
    const event = result.logs[0].args
   
    assert.equal(event.id.toNumber(), 2)
    assert.equal(event.completed, false) 
    assert.equal(event.content, "Updated task")
    assert.equal(taskCount.toNumber(), 1)
  })
})
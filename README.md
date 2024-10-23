# Task NodeX

JavaScript library for executing tasks in a tree structure. Create a hierarchy of functions to execute synchronously or asynchronously. After each task execute a finalizing function.

Useful for a webpage with multiple functions that need to fire in sequence. Where the functions are async functions, promises, or Observables.

## Git:

https://github.com/manit77/task-nodex/

## Example:

> masterTask, finalizeFunction()
>> task1, task1Func(), task1Done() (sync)
>>> initControls (async)
>>> getQueryStringVars (async)

>> task2 (sync)
>>> getProductCategories (async)
>>> getProductTypes (async)

>> Task3, task3Complete() (sync)
>>> getUser (async)
>>> getProduct (async)

- Tasks 1, 2, 3 will execute synchronously
- When Task1, execute  task1Func(), then execute initControls(), getQueryStringVars() asynchronously, then execute task1Done() synchronously
- When Task2, execute getProductCategories(), getProductTypes() asynchronously
- When Task3, execute getUser(),getProduct() asynchronously, then execute task3Complete() synchronously
- When all tasks are complete, execute finalizeFunction() function.

## Usage:
npm install task-nodex

## Example Code:
````md
import { execTaskNode, getTaskNode, TaskNode } from "task-nodex";

class WebController() {

  GetProduct(task: TaskNode) {
    // perform async task
    // call complete when task is done
    task.complete();
  }

}

let controller = new WebController();

let t1 = getTaskNode([controller.GetQueryStrings]);
let t2 = getTaskNode([controller.GetProductCategories, controller.GetProductTypes], true);
let t3 = getTaskNode([controller.GetUser, controller.GetProduct], true);

await execTaskNode(controller, [t1, t2, t3], controller.BindForm);

````
# Task NodeX

JavaScript library for executing tasks in a tree structure. Create a hierarchy of functions to execute synchronously or asynchronously. After each task execute a finalizing function.

Useful for a webpage with multiple functions that need to fire in sequence. Where the functions are async functions, promises, or Observables.

## Git:

https://github.com/manit77/task-node/

## Example:

> masterTask, BindForm()
>> task1 (sync)
>>> initControls
>>> getQueryStringVars 

>> task2 (sync)
>>> getProductCategories (async)
>>> getProductTypes (async)

>> Task3 (sync), task3Complete()
>>> getUser (async)
>>> getProduct (async)

- Tasks 1, 2, 3 will execute synchronously
- When Task1 is complete execute Task1
- When Task2, execute getProductCategories(), getProductTypes() asynchronously
- When Task3 is complete, execute task3Complete function
- When all tasks are complete, execute the finalizeFunction() function.

## Usage:
npm install task-nodex

## Exmple Code:
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
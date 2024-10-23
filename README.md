# Task Node

JavaScript library for executing tasks in a tree structure. Create a nested tree heirarchy of functions to execute synchronously or asynchronously, after each task exeute a finalizing function.


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


## Exmple Code:
````md

let controller = new WebController();

let t1 = getTaskNode([controller.GetQueryStrings]);
let t2 = getTaskNode([controller.GetProductCategories, controller.GetProductTypes], true);
let t3 = getTaskNode([controller.GetUser, controller.GetProduct], true);

await execTaskNode(controller, [t1, t2, t3], controller.BindForm);

````
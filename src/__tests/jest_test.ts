/* eslint-disable @typescript-eslint/no-unused-vars */
import { execTaskNode, getTaskNode, mergeTaskNodes, TaskNode } from "../taskNode";
let timeout = 90000;

function getRandomNumberSeconds() {
    return (Math.floor(Math.random() * 5) + 1) * 1000;
}

test("test hard oded nodes", async () => {
    /*

      >>master
      >>>>parent1
      >>>>>>>>    child1
      >>>>parent2
      >>>>>>>>    child2
      >>>>>>>>    child3
   
      -- execute master
      -- execute parent1
          -- execute child1
      -- execte parent 1 done
      -- execute parent2
          -- execute child2
          -- execute child3
      -- execte master done
      
      */
    let masterDone: any;

    let parent1Done: any;
    let child1Done: any;
    let child2Done: any;

    let parent2Done: any;
    let child3Done: any;


    let masternode = new TaskNode(undefined, "master", false, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("!!!! master done"); masterDone = process.hrtime.bigint(); });
        
    await masternode.exec();
    console.log("exit test"); 


}, timeout);



// test("test short notation", () => {

//     /*
//     Problem: each web page as a series of function calls (ie api calls, routines, etc.) that need to complete before presenting the ui to the user.
//     Some functions run synchronously and may run asynchronously. Functions can be grouped into tasks for execution. Each function will notify the caller of completion. 
//     After the execution of each each task, execute a finalize function.

//     example: Load a webpage the shows the user their product and bind the controls for product categories and product types.

//     Tasks:

//     Task1: Init Control - Get querystring variables from HTTP request
//     Task2: Load custom data lists - data will be used to populate drop down lists, radio buttons, etc.
//     Task3: fetch models from apis - query web api for UserModel, ProductModel
//     Task4: Bind the models - set the control values frome the models. ie. txtUserName.value = UserModel.UserName

//     Execution:  

//     Task1 : [GetQueryStrings]
//     Task2 : [GetProductCategories, GetProductTypes]
//     Task3 : [GetUser, GetProduct]
//     Task4 : [BindForm]

//     */

//     let controller = new WebController();

//     //example: short notation
//     let t1 = getTaskNode([controller.GetQueryStrings]).setId("querystrings");
//     let t2 = getTaskNode([controller.GetProductCategories, controller.GetProductTypes], true).setId("lists");
//     let t3 = getTaskNode([controller.GetUser, controller.GetProduct], true).setId("models");
//     let t4 = getTaskNode([controller.BindForm]).setId("bind");
//     execTaskNode(controller, [t1, t2, t3], ()=>{
//         expect(controller.bindFormDone > controller.getUserDone).toBe(true);
//         expect(controller.bindFormDone > controller.getProductDone).toBe(true);
//         expect(controller.getUserDone > controller.getProductCategoriesDone).toBe(true);
//         expect(controller.getUserDone > controller.getProductTypesDone).toBe(true);

//     });

// }, timeout);


/* eslint-disable @typescript-eslint/no-unused-vars */
import { execTaskNode, getTaskNode, mergeTaskNodes, TaskNode } from "../taskNode";
let timeout = 90000;

class WebController {
    productid = 0;
    userid = 0;
    categories: string[] | null = null;
    producttypes: string[] | null = null;
    product: any;
    user: any;

    getQueryStringsDone: any = 0;
    getProductCategoriesDone: any = 0;
    getProductTypesDone : any = 0;
    getUserDone : any = 0;
    getProductDone : any = 0;
    bindFormDone : any = 0;

    constructor() {

    }

    GetQueryStrings(task: TaskNode) {
        console.log("begin GetQueryStrings");
        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }
        this.productid = 10;
        this.userid = 1;
        console.log("done GetQueryStrings");
        this.getQueryStringsDone = process.hrtime.bigint();
        task.complete();
    }

    GetProductCategories(task: TaskNode) {
        let wait = getRandomNumberSeconds();
        console.log("begin GetProductCategories " + wait);

        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }

        setTimeout(() => {
            this.categories = ["category1", "category2"];
            console.log("done GetProductCategories");
            this.getProductCategoriesDone = process.hrtime.bigint();
            task.complete();
        }, wait);
    }

    GetProductTypes(task: TaskNode) {

        let wait = getRandomNumberSeconds();
        console.log("begin GetProductTypes " + wait);

        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }

        setTimeout(() => {
            this.producttypes = ["type1", "type2"];
            console.log("done GetProductTypes");
            this.getProductTypesDone = process.hrtime.bigint();
            task.complete();
        }, wait);
    }

    GetUser(task: TaskNode) {

        let wait = getRandomNumberSeconds();
        console.log("begin GetUser " + wait);

        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }

        if (!this.categories) {
            throw "categories must be fetched before GetUser";
        }

        if (!this.producttypes) {
            throw "producttypes must be fetched before GetUser";
        }

        if (this.userid > 0) {
            setTimeout(() => {
                this.user = { id: this.userid, username: "user1" };
                console.log("done GetUser");
                this.getUserDone = process.hrtime.bigint();
                task.complete();
            }, wait);
        } else {
            task.complete();
        }
    }

    GetProduct(task: TaskNode) {

        let wait = getRandomNumberSeconds();
        console.log("begin GetProduct " + wait);

        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }

        if (this.productid > 0) {
            //long running operation
            setTimeout(() => {
                this.product = { id: this.productid, name: "productid" };
                console.log("done GetProduct");
                this.getProductDone = process.hrtime.bigint();
                task.complete();
            }, wait);

        } else {
            task.complete();
        }
    }

    BindForm() {
        console.log("begin BindForm");
        if (this.constructor.name != "WebController") {
            throw "not in the correct instance";
        }

        //valid the data
        if (!this.categories) {
            console.log("*** ERROR: categories is not loaded");
        }

        if (!this.producttypes) {
            console.log("*** ERROR: producttypes is not loaded");
        }

        if (!this.user) {
            console.log("*** ERROR: user is not loaded");
        }

        if (!this.product) {
            console.log("*** ERROR: product is not loaded");
        }

        console.log("!!! done Bind Form");
        this.bindFormDone = process.hrtime.bigint();
    }

}

function getRandomNumberSeconds() {
    return (Math.floor(Math.random() * 5) + 1) * 1000;
}

test("test hard coded nodes", async () => {
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


    let masternode = new TaskNode(undefined, "master", false, async (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("!!!! master done"); masterDone = process.hrtime.bigint(); });
    
    
    let parent1 = new TaskNode(undefined, "parent1", false, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("*** parent1 done"); parent1Done = process.hrtime.bigint(); });
    let child1 = new TaskNode(undefined, "    child1", true, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("    child1 done"); child1Done = process.hrtime.bigint(); });
    parent1.add(child1);

    let parent2 = new TaskNode(undefined, "parent2", true, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("*** parent2 done"); parent2Done = process.hrtime.bigint(); });
    let child2 = new TaskNode(undefined, "    child2", true, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("    child2 done"); child2Done = process.hrtime.bigint(); });
    let child3 = new TaskNode(undefined, "    child3", true, (node: TaskNode) => { setTimeout(() => { console.log("-- " + node.id + " executed"); node.complete(); }, getRandomNumberSeconds()); }, () => { console.log("    child3 done"); child3Done = process.hrtime.bigint(); });
   
    parent2.add(child2);
    parent2.add(child3);

    masternode.add(parent1);
    masternode.add(parent2);
    masternode.print(">>");

    
    await masternode.exec();

    expect(parent1Done > child1Done).toBe(true);

    expect(parent2Done > child2Done).toBe(true);
    expect(parent2Done > child3Done).toBe(true);

    expect(masterDone > parent1Done).toBe(true);
    expect(masterDone > parent2Done).toBe(true);
   

}, timeout);

test("test short notation", async () => {

    /*
    Problem: each web page as a series of function calls (ie api calls, routines, etc.) that need to complete before presenting the ui to the user.
    Some functions run synchronously and may run asynchronously. Functions can be grouped into tasks for execution. Each function will notify the caller of completion. 
    After the execution of each each task, execute a finalize function.

    example: Load a webpage the shows the user their product and bind the controls for product categories and product types.

    Tasks:

    Task1: Init Control - Get querystring variables from HTTP request
    Task2: Load custom data lists - data will be used to populate drop down lists, radio buttons, etc.
    Task3: fetch models from apis - query web api for UserModel, ProductModel
    Task4: Bind the models - set the control values frome the models. ie. txtUserName.value = UserModel.UserName

    Execution:  

    Task1 : [GetQueryStrings]
    Task2 : [GetProductCategories, GetProductTypes]
    Task3 : [GetUser, GetProduct]
    Task4 : [BindForm]

    */

    let controller = new WebController();

    //example: short notation
    let t1 = getTaskNode([controller.GetQueryStrings]);
    let t2 = getTaskNode([controller.GetProductCategories, controller.GetProductTypes], true);
    let t3 = getTaskNode([controller.GetUser, controller.GetProduct], true); 
    await execTaskNode(controller, [t1, t2, t3], controller.BindForm);

    expect(controller.bindFormDone > controller.getUserDone).toBe(true);
    expect(controller.bindFormDone > controller.getProductDone).toBe(true);
    expect(controller.getUserDone > controller.getProductCategoriesDone).toBe(true);
    expect(controller.getUserDone > controller.getProductTypesDone).toBe(true);
    
    //this will execute bind form twice, execTaskNode creates a new master task    
    await execTaskNode(controller, [t1, t2, t3], controller.BindForm);



}, timeout);


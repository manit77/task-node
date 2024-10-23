import { LinkedList } from "./linkedList";

export class TaskNode {

    parent: TaskNode | null = null;
    children = new LinkedList<TaskNode>();
    done = false;
    private _resolve: any;
    private _timeoutid: any;

    constructor(public instance?: object, public id: any = "", private isasync: boolean = false, private func?: ((node: TaskNode) => any), private donefunc?: (() => any)) {

    }

    /**
    * checks if the current TaskNode is complete
    * if complete, exec the DoneFunction
    */
    async complete() {      
        let allChildrenDone = true;
        if (this.children.count() == 0) {
            allChildrenDone = true;
        }
        else {
            allChildrenDone = true;
            //traverse without next
            let curr = this.children.getFirst();

            while (curr) {
                if (!curr.data.done) {                  
                    allChildrenDone = false;
                    break;
                }
                curr = curr.next;
            }
        }

        if (allChildrenDone) {           
            if (this.donefunc) {
                let doawait = this.donefunc.constructor.name === "AsyncFunction";
                if (this.instance) {
                    if (doawait) {
                        await this.donefunc.bind(this.instance)();
                    } else {
                        this.donefunc.bind(this.instance)();
                    }
                } else {
                    if (doawait) {
                        await this.donefunc();
                    } else {
                        this.donefunc();
                    }
                }
            }
            this.done = true;
            this.resolve_node();

            if (this.parent) {              
                this.parent.complete();
            }

        } else {
            while (this.children.next()) {
                if (!this.children.current) {
                    break;
                }
                this.children.current.data.exec();
                if (!this.children.current.data.isasync) {
                    break;
                }
            }

        }
    }

    /**
    * adds children TaskNodes
    * @param nodes -array of TaskNodes or single TaskNode
    */
    add(...nodes: TaskNode[]): TaskNode {

        nodes.forEach(n => {
            n.parent = this;
            this.children.append(n);
        });

        return this;
    }

    /**
    *   resolve our task when all tasks are done
    */
    private resolve_node() {

        if (this._resolve) {
            this._resolve();
        }

        if (this._timeoutid) {
            clearTimeout(this._timeoutid);
            // console.log("**** clear timeoutid", this.id, this._timeoutid);
        }
    }

    /**
    * execution first for the TaskNode
    */
    async exec() {
        
        if(this.done) {            
            return;
        }

        if (this.func) {
            let promise_func = async (): Promise<void> => {
                return new Promise((resolve, reject) => {
                    this._resolve = resolve;
                    try {
                        this._timeoutid = setTimeout(() => reject("taskNode timeout "), 30000);
                        // console.log("**** created timeoutid ", this.id, this._timeoutid);
                        if (this.instance) {                           
                            this.func!.bind(this.instance)(this);
                        } else {                           
                            this.func!(this);
                        }                        
                        

                    } catch (err) {
                        reject(err);
                    }
                })
            };

            return promise_func();

        } else {
            return new Promise((resolve, reject) => {
                this._resolve = resolve;
                try {                  
                    this.complete();                    
                } catch (err) {
                    reject(err);
                }
            });
        }
    }

    /**
    * prints the TaskNode in a tree
    * @param indent -indent string, will duplicate at each level
    */
    print(indent: string = " ") {
        console.log(indent + this.id + "-" + this.isasync);
        let curr = this.children.getFirst();
        while (curr) {
            curr.data.print(indent + indent);
            curr = curr.next;
        }
    }

    /**
    * binds the functions to instance of an object
    * @param instance -the object to bind to
    */
    bind(instance: any): TaskNode {
        bindTaskNode(this, instance);
        return this;
    }

    setId(id: string) {
        this.id = id;
        return this;
    }
}

function bindTaskNode(node: TaskNode, instance: any) {
    node.instance = instance;

    let curr = node.children.getFirst();
    while (curr) {
        bindTaskNode(curr.data, instance);
        curr = curr.next;
    }
}

export function getTaskNode(functions: ((node: TaskNode) => any)[], isasnyc: boolean = false, funcdone?: (() => any)): TaskNode {
    let task = new TaskNode(undefined, "", false, undefined, funcdone);
    functions.forEach(func => {
        task.add(new TaskNode(undefined, "", isasnyc, func));
    });
    return task;
}

export function mergeTaskNodes(nodes: TaskNode[], funcdone: (() => any)): TaskNode {
    let task = new TaskNode(undefined, "master", false, undefined, funcdone);
    task.add(...nodes);
    return task;
}

export async function execTaskNode(instance: any, nodes: TaskNode[], funcdone: (() => any)) {
    let task = mergeTaskNodes(nodes, funcdone).bind(instance);
    return await task.exec();
}


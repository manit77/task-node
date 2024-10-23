export class LinkedNode<T> {

    constructor(public data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }

    next: LinkedNode<T> | null | undefined;
    prev: LinkedNode<T> | null | undefined;

}

export class LinkedList<T> {

    private elements: LinkedNode<T>[] = [];
    private currentIndex = -1;

    constructor() {
    }

     /**
     * the current element from calling next()
     */
    get current() {
        return this.elements[this.currentIndex];
    }

    /**
     * gets the first node   
     */
    getFirst(): LinkedNode<T> | null | undefined {
        return this.elements[0];
    }

    /**
     * gets the last node
     */
    getLast(): LinkedNode<T> | null | undefined {
        return this.elements[this.elements.length - 1];
    }

    /**
      * move to first position    
      */
    first() {
        this.currentIndex = -1;
    }

    last() {
        this.currentIndex =  this.elements.length - 1;
    }

    /**
     * move to next position     
     */
    next(): LinkedNode<T> | null | undefined {
        let i = this.currentIndex + 1;
        if (i >= 0 && i < this.elements.length) {
            this.currentIndex++;
            return this.elements[this.currentIndex];
        }
        return null;
    }

    /**
     * number of elements
     */
    count(): number {
        return this.elements.length;
    }

    /**
     * append a new node with data
     * @param data -data of the node
     */
    append(data: T): LinkedNode<T> | null | undefined {

        const newNode = new LinkedNode<T>(data);

        let len = this.elements.push(newNode);
        if (len > 1) {
            newNode.prev = this.elements[len - 2];
        }

        if (newNode.prev) {
            newNode.prev.next = newNode;
        }
        return newNode;

    }

    /**
    * deletes all nodes with the data
    * @param data -data of the node
    */
    delete(data: T): void {
        let index = this.elements.findIndex((n) => n.data === data);
        while (index >= 0) {
            this.elements.splice(index, 1);

            let prev = this.elements[index - 1];
            let node = this.elements[index];
            let next = this.elements[index + 1];

            if (prev) {
                prev.next = node;
            }
            if (node) {
                node.next = next
            }
            if (next) {
                next.prev = node;
            }

            index = this.elements.findIndex((n) => n.data === data);
        }
        
        if(this.elements.length == 0){
            this.first();
        }

        if(this.currentIndex > this.elements.length - 1) {
            this.currentIndex = this.elements.length - 1;
        }
    }

     /**
     * clear all elements
     */
    clear(){
        this.elements = [];
        this.currentIndex - 1;
    }

    toArray() {
        return [...this.elements];
    }

}

import { LinkedList } from "../linkedList"


test("test LinkedList", () => {
    const list = new LinkedList<number>();
    list.append(15);
    list.append(10);
    list.append(20);
    list.append(5);
    list.append(15);
    list.append(6);
    list.append(7);

    expect(list.count()).toBe(7);
    expect(list.getFirst()!.data).toBe(15);
    expect(list.getLast()!.data).toBe(7);

    console.log("-- traverse list using next");
    let values: number[] = [];
    while (list.next()) {
        console.log(list.current?.data);
        values.push(list.current!.data);
    }

    //check if data matches in traversal
    //move to first
    let counter = 0;
    list.first();
    while (list.next()) {
        expect(values[counter]).toBe(list.current!.data);
        counter++;
    }

    //all 15 values should be deleted
    console.log("--- delete");
    list.delete(15);
    list.first();
    while (list.next()) {
        expect(list.current.data != 15).toBe(true);
    }
    

    console.log("--- delete, should shift");
    list.last();
    expect(list.current.data).toBe(7);
    list.delete(7);
    expect(list.current.data).toBe(6);

    console.log("--- clear");
    list.clear();
    expect(list.count()).toBe(0);

});


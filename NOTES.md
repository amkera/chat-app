# General Information From the Course

SQL

1. Structured Query Language
2. Up-front design
3. Sometimes performance and query benefits
4. Sometimes performance hits

NoSQL

1. No structure, just collections of any data
2. Less or no up front design
3. Sometimes performance increases

Promises

Promises return an object which "promise" to do some work. The object has separate callbacks for success & failure.

```
MyFunction() {
    GetMessages((list) => {
        console.log(list)
    })
}
```

Refactor using async await:

```
async MyFunction() {
    let list = await GetMessages()
    console.log(list)
}
```

Error Handling: Refactor to use async await

```
MyFunction(){
    request((result, err) => console.log(result, err))
}
```

```
async MyFunction() {
    try {
        let result = await request()
        console.log(result)
    } catch (err) {
        console.log(error)
    }
}
```

Wrap request into the try block, leave the error for the catch block.

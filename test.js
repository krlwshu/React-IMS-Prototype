test = []

data = {id: "12345",qty:10}
data2 = {id: "123452",qty:12}
test = [...test,data]
test = [...test,data2]


key = 1232452;
const result = test.findIndex(element => element.id ==key);

const itemIdx = test.findIndex(element => element.id == key )

// console.log("Initial state");
// console.log(test)
// console.log(itemIdx)

// console.log("New state");

// itemIdx ? test[itemIdx].qty ++ ;

// console.log(test)

console.log(result)

//Code
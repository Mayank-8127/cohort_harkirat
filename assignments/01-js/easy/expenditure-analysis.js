/*
	Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
	and return a list of objects where each object is unique category-wise and has total price spent as its value.
	transactions is an array where each
	Transaction - an object like 
				{
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
	Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/
function calculateTotalSpentByCategory(transactions) {
	let arr = [];
	let obj = {
		category:undefined,
		totalSpent:0
	}
	for(i = 0; i < transactions.length; i++){
		let cat = transactions[i]["category"];
		let arrCat;
		if(arr.length == 0){
			arr.push({
				category:undefined,
				totalSpent:0
			});
			arr[arr.length - 1]["category"] = transactions[i]["category"];
			arr[arr.length - 1]["totalSpent"] += transactions[i]["price"];
		}
		else{
			if(arr.length > 0){
				for(j = 0; j < arr.length; j++){
					arrCat = arr[j]["category"];
					if(arrCat == cat){
						arr[j]["totalSpent"] += transactions[i]["price"];
                        break;
					}else{
						if(j == arr.length - 1){
							arr.push({
								category:undefined,
								totalSpent:0
							});
							arr[arr.length - 1]["category"] = transactions[i]["category"];
							arr[arr.length - 1]["totalSpent"] += transactions[i]["price"];
							break;
						}
					}
				}
			} 
		}
	} 
	return arr;
}
module.exports = calculateTotalSpentByCategory;
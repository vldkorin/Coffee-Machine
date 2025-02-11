
const input = require('sync-input')

// import input from "sync-input";

let coffee = `
   (  )   (   )  )
     ) (   )  (  (
     ( )  (    ) )
     _____________
    <_____________> ___
    |             |/ _ \\
    |               | | |
    |               |_| |
 ___|             |\\___/
/    \\___________/    \\
\\_____________________/
`;

let machineStock = {
    water: 400,
    milk: 540,
    coffeeBeans: 120,
    disposableCups: 9,
    sugarSachets: 500,
    money: 550
}


const coffeeTypes = {
    espresso: {
        water: 250,
        milk: 0,
        beans: 16,
        price: 4
    },
    latte: {
        water: 350,
        milk: 75,
        beans: 20,
        price: 7
    },
    cappuccino: {
        water: 200,
        milk: 100,
        beans: 12,
        price: 6
    }
}

function coffeeMachineStock() {
    console.log(`\nThe coffee machine has:
${machineStock.water} ml of water
${machineStock.milk} ml of milk
${machineStock.coffeeBeans} g of coffee beans
${machineStock.disposableCups} disposable cups
$${machineStock.money} of money\n`)
}
function menu() {
    while(true) {
        let inputOption = input("Write action (buy, fill, take, remaining, exit): ");
        if (inputOption.includes("buy")) {
            buyCoffee();
        } else if (inputOption.includes("fill")) {
            fillMachine();
        } else if (inputOption.includes("take")) {
            takeProfit();
        } else if (inputOption.includes("remaining")) {
            coffeeMachineStock();
        } else if (inputOption.includes("exit")) {
            break;
        }
    }

}

function buyCoffee() {
    let coffeeOptionInputted = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu: ");

    let coffeeType;
    if (coffeeOptionInputted === "1") {
        coffeeType = coffeeTypes.espresso;
    } else if (coffeeOptionInputted === "2") {
        coffeeType = coffeeTypes.latte;
    } else if (coffeeOptionInputted === "3") {
        coffeeType = coffeeTypes.cappuccino;
    } else if (coffeeOptionInputted.includes("back")) {
        return;
    } else {
        console.log("There is no such option!");
        return;
    }


    if (machineStock.water < coffeeType.water) {
        console.log("Sorry, not enough water!");
    } else if (machineStock.milk < coffeeType.milk) {
        console.log("Sorry, not enough milk!");
    } else if (machineStock.coffeeBeans < coffeeType.beans) {
        console.log("Sorry, not enough coffee beans!");
    } else if (machineStock.disposableCups < 1) {
        console.log("Sorry, not enough disposable cups!");
    } else {
        console.log("I have enough resources, making you a coffee!");
        machineStock.water -= coffeeType.water;
        machineStock.milk -= coffeeType.milk;
        machineStock.coffeeBeans -= coffeeType.beans;
        machineStock.disposableCups -= 1;
        machineStock.money += coffeeType.price;

        let inputSugar = input("Do you want to add sugar to your coffee?: ");
        if (inputSugar.toLowerCase().includes("yes")) {
            let inputAmountOfSugar = Number(input("How many sugar sachets do you want? "));
            if (machineStock.sugarSachets >= inputAmountOfSugar) {
                machineStock.sugarSachets -= inputAmountOfSugar;
                console.log(`Cheers\n${coffee}`)
            } else {
                console.log("We don't have this amount of sugar.")
            }
        } else {
            console.log(`Cheers\n${coffee}`)
        }
    }
}

function fillMachine() {
    let fillWater = Number(input("Write how many ml of water you want to add: "));
    machineStock.water += fillWater;
    let fillMilk = Number(input("Write how many ml of milk you want to add: "));
    machineStock.milk += fillMilk;
    let fillBeans = Number(input("Write how many grams of coffee beans you want to add: "));
    machineStock.coffeeBeans += fillBeans;
    let fillCups = Number(input("Write how many disposable cups you want to add: "));
    machineStock.disposableCups += fillCups;
}
function takeProfit() {
    if (machineStock.money === 0) {
        console.log("There is nothing to take :(.")
    } else {
        console.log(`I gave you $${machineStock.money}`);
        machineStock.money = 0;
    }

}
menu();



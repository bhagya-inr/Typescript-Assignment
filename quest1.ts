function totalCost(price:number,quantity:number):number{
    return price*quantity

}
let price=totalCost(5,10)
console.log(price);

function  formatId (id:string|number):string{
    return String(id);
}

let idString=formatId("Jaya")
let idNumber=formatId(100)
console.log(idString);
console.log(idNumber);
//quest2
interface User {
    nameU:string,
    address:string,
    age?:number,
    mobile?:number,
}

function createUser(nameU:string,address:string,age?:number,mobile?:number): User{
    return {nameU, address,age,mobile};
}
let User1=createUser("Amit","Nagpur",32,789007634);
console.log(User1);
let User2=createUser("Amit","Nagpur");
console.log(User2);

//quest3
type Status= "pending"|"approved"|"rejected";

function processStatus (status:Status):string{
    switch(status){
        case "pending":
            return "Your request is pending review";

        case "approved":
            return "Your request has been approved";

        case "rejected":
            return "Your request has been rejected";
}

}

let process=processStatus("approved")
console.log(process);

//quest4


type Point = {
    x: number;
    y: number;
};

// Shape interface
interface Shape {
    getArea(): number;
}


type Circle = Point & {
    radius: number;
};


class Rectangle implements Shape {
    constructor(
        public width: number,
        public height: number
    ) {}

    getArea(): number {
        return this.width * this.height;
    }
}


const rectangle = new Rectangle(10, 5);
console.log(rectangle.getArea());

const circle: Circle = {
    x: 0,
    y: 0,
    radius: 10
};

console.log(circle);


//quest5


type NumberArray = number[];


function sumArray(numbers: NumberArray): number {
    return numbers.reduce((sum, num) => sum + num, 0);
}


type PersonInfo = [string, number, boolean];


function formatPerson(person: PersonInfo): string {
    const [name, age, isActive] = person;

    return `Name: ${name}, Age: ${age}, Active: ${isActive}`;
}


const nums: NumberArray = [10, 20, 30];
console.log(sumArray(nums));

const person: PersonInfo = ["Alice", 25, true];
console.log(formatPerson(person));


//quest6
function isString(value: unknown): value is string {
    return typeof value === "string";
}


function safeUpperCase(
    value: string | number | null
): string | number | null {

    if (isString(value)) {
        return value.toUpperCase();
    }

    return value;
}

console.log(safeUpperCase("typescript"));
console.log(safeUpperCase(100));
console.log(safeUpperCase(null));


//quest7

class BankAccount {

    private balance: number = 0;

    deposit(amount: number): void {
        this.balance += amount;
    }

    withdraw(amount: number): boolean {

        if (amount > this.balance) {
            return false;
        }

        this.balance -= amount;
        return true;
    }

    get getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount();

account.deposit(5000);

console.log(account.getBalance);
console.log(account.withdraw(2000));
console.log(account.getBalance);
console.log(account.withdraw(5000));


//quest8
enum Direction {
    Up,
    Down,
    Left,
    Right
}


enum HttpStatus {
    OK = "200",
    NotFound = "404",
    ServerError = "500"
}

function getStatusMessage(status: HttpStatus): string {

    switch (status) {

        case HttpStatus.OK:
            return "Request Successful";

        case HttpStatus.NotFound:
            return "Resource Not Found";

        case HttpStatus.ServerError:
            return "Internal Server Error";

        default:
            return "Unknown Status";
    }
}

console.log(Direction.Left);
console.log(getStatusMessage(HttpStatus.OK));


//ques9
function process(value: string): string;
function process(value: number): number;


function process(value: string | number): string | number {

    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value * 2;
}

console.log(process("hello"));
console.log(process(25));

//quest10

interface Config {
    readonly apiKey: string;
    readonly timeout: number;
}

function updateConfig(config: Config): void {
    console.log(config);
}

const config: Config = {
    apiKey: "ABC123",
    timeout: 5000
};

updateConfig(config);

const numbers = [1, 2, 3] as const;

console.log(numbers);
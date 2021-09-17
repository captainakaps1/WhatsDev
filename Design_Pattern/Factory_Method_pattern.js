function Developer(name) {
    this.name = name;
    this.type = "Developer";
}

function Tester(name) {
    this.name = name;
    this.type = "Tester";
}

function EmployeeFactory() {
    this.create = (name, type) => {
        switch (type) {
            case 1:
                return new Developer(name);
                break;
            case 2:
                return new Tester(name);
                break;
        }
    };
}

function run() {
    console.log("Hi, I am " + this.name + " and I am a " + this.type);
}
const employeeFactory = new EmployeeFactory();
const employees = [];

employees.push(employeeFactory.create("Senyo", 1));
employees.push(employeeFactory.create("Bright", 2));

employees.forEach((element) => {
    run.call(element);
});
// tipado
const myName = 'Rodolfo';
const myAge = 12;

const suma = (a: number, b: number) => {
  return a + b;
}
suma(12, 2);

class Persona {
  // private age;
  // private name;

  constructor(private age: number, private name: string){
    this.age = age;
    this.name = name;
  }

  getSummary()
  {
    return `my name is ${this.name}, ${this.age}`;
  }
}

const rod = new Persona(32, 'Rodolfo');
rod.getSummary();

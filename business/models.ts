export class Color {
  red!: number
  green!: number
  blue!: number

  constructor(red: number, green: number, blue: number) {
    this.red = red
    this.green = green
    this.blue = blue
  }

  toString(): string {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`
  }

  rgba(a: number): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${a})`
  }
}

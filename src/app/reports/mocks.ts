import randomstring from 'random-string'
import uuid from 'uuid/v4'

export default class MockUtils {
  genBarcode(): number {
    const s = randomstring({
      length: 12,
      letters: false
    })

    return parseInt(s)
  }

  genSKU(): string {
    const s1 = randomstring({ length: 3 })
    const s2 = randomstring({ length: 3 })
    const s3 = randomstring({ length: 3 })
    const s4 = randomstring({ length: 2 })
    return `${s1}-${s2}-${s3}-${s4}`
  }

  genUUID(): string {
    return uuid()
  }

  genDeviceID(): string {
    return this.genUUID()
  }

  genInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  genFloat(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
  }

  genName(): string {
    const dictionary = [
      'Apple',
      'Banana',
      'Grapes',
      'Lettuce',
      'Mango',
      'Orange',
      'Pear',
      'Strawberry',
      'Sweet Pepper',
      'Tomato',
    ]

    const index = this.genInt(0, dictionary.length)
    return dictionary[index]
  }

  genOrigin(): string {
    const dictionary = [
      'ON Canada',
      'BC Canada',
      'SK Canada',
      'MN Canada',
      'NS Canada',
      'PEI Canada',
      'QC Canada',
    ]

    const index = this.genInt(0, dictionary.length)
    return dictionary[index]
  }

  genArrivalDate(): number {
    return Date.now()
  }

  genWeight(): number {
    return this.genFloat(100, 500)
  }

  genPrice(): number {
    return this.genFloat(5000, 10000)
  }

  genLot(): string {
    const s1 = randomstring({ length: 2 })
    const i1 = this.genInt(0, 9999)

    return `${s1}${i1}`
  }

  genEthyData():any {
    var array = []

    for (let index = 0; index < 100; index++) {
       array.push({
            "SKU": this.genSKU(),
            "Name": this.genName(),
            "Ethylene": this.genFloat(1, 80).toFixed(2),
           "Timestamp": new Date(this.genArrivalDate()).toISOString().split("T")[0],
            "Status": "Warning",
           "Projected Expiry": new Date(this.genArrivalDate() * 1.0001).toISOString().split("T")[0],
            "Trend (%)": (this.genFloat(-1, 1) * 5).toFixed(0)
        })
    }
    return array
  }
}
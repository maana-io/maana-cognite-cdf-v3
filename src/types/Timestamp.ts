import { Field, InputType, ObjectType, ID, Float } from "type-graphql";

@ObjectType({ description: "Either a number or a date" })
export class Timestamp {
  @Field(() => ID, { nullable: true, description: "Either the number or string value of the date" })
  id: number;

  @Field(() => Float, { nullable: true, description: "Numeric value" })
  number?: number;

  @Field({ nullable: true, description: "Date value" })
  date?: Date;

  constructor(value: number | Date) {
    this.number = value as number;
    this.date = value as Date;
    this.id = this.number || this.date.valueOf();
  }

  public value(): number | Date {
    return this.number || this.date || this.id;
  }
}

@InputType({ description: "Either a number or a date" })
export class TimestampAsInput {
  @Field(() => ID, { nullable: true, description: "Either the number or string value of the date" })
  id: number;

  @Field(() => Float, { nullable: true, description: "Numeric value" })
  number?: number;

  @Field({ nullable: true, description: "Date value" })
  date?: Date;

  constructor(value: number | Date) {
    this.number = value as number;
    this.date = value as Date;
    this.id = this.number || this.date?.valueOf();
  }

  public value(): number | Date {
    return this.number || this.date || this.id;
  }
}

import { Field, InputType, ObjectType, ID, Float } from "type-graphql";
import { Timestamp, TimestampInput } from "./Timestamp";

@ObjectType({ description: "Either a string or a timestamp" })
export class StringOrTimestamp {
  @Field(() => ID, {
    nullable: true,
    description: "Either the string value or the string value of the timestamp",
  })
  id: string;

  @Field({ nullable: true, description: "String value" })
  string?: string;

  @Field({ nullable: true, description: "Timestamp value" })
  timestamp?: Timestamp;

  constructor(value: string | Timestamp) {
    this.id = value.toString();
    this.string = value as string;
    this.timestamp = value as Timestamp;
  }

  public value(): string | number | Date {
    return this.string || this.timestamp?.value() || this.id;
  }
}

@InputType({ description: "Either a string or a timestamp" })
export class StringOrTimestampInput {
  @Field(() => ID, {
    nullable: true,
    description: "Either the string value or the string value of the timestamp",
  })
  id: string;

  @Field({ nullable: true, description: "String value" })
  string?: string;

  @Field(() => TimestampInput, { nullable: true, description: "Timestamp value" })
  timestamp?: Timestamp;

  constructor(value: string | Timestamp) {
    this.string = value as string;
    this.timestamp = value as Timestamp;
    this.id = this.string || this.timestamp?.toString();
  }

  public value(): string | Timestamp {
    return this.string || this.timestamp || this.id;
  }
}

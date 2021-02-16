import { Field, ObjectType, ID } from "type-graphql";
import {
  Datapoints as CDFDatapoints,
  StringDatapoints as CDFStringDatapoints,
  DoubleDatapoints as CDFDoubleDatapoints,
} from "@cognite/sdk";

import { CogniteExternalId } from "./common";
import { DoubleDatapoint } from "./DoubleDatapoint";
import { StringDatapoint } from "./StringDatapoint";

@ObjectType({ description: "CDF Datapoints" })
export class Datapoints {
  @Field(() => ID, { description: "The unique identifier of the timeseries" })
  id: string | number;

  @Field(() => ID, { nullable: true, description: "Externally supplied id of the timeseries" })
  externalId?: CogniteExternalId;

  @Field({ nullable: true, description: "" })
  isString?: boolean;

  @Field({ nullable: true, description: "" })
  unit?: string;

  @Field({ nullable: true, description: "" })
  isStep?: boolean;

  @Field(() => [StringDatapoint], { nullable: "itemsAndList", description: "" })
  stringDatapoints?: StringDatapoint[];

  @Field(() => [DoubleDatapoint], { nullable: "itemsAndList", description: "" })
  doubleDatapoints?: DoubleDatapoint[];

  //-------------------------------------------------------------------------

  isDoubleDatapoints(
    results: CDFStringDatapoints | CDFDoubleDatapoints
  ): results is CDFDoubleDatapoints {
    return !(results as CDFDoubleDatapoints).isString;
  }

  constructor(results: CDFDatapoints) {
    this.id = results.id;
    this.externalId = results.externalId;
    this.isString = results.isString;
    this.unit = results.unit;
    if (this.isDoubleDatapoints(results)) {
      this.isStep = results.isStep;
      this.doubleDatapoints = results.datapoints;
    } else {
      this.stringDatapoints = results.datapoints;
    }
  }
}

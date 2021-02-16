// import { Field, InputType, ObjectType, ID, Float } from "type-graphql";

// import { FileMimeType, FileName, CogniteExternalId, CogniteInternalId } from "./common";

// import { IdEither } from "./IdEither";
// import { Metadata } from "./Metadata";

// @InputType({ description: "CDF FileFilter (as input)" })
// export class LabelFilter {

//   @Field(() => ID, { description: "" })
//   externalId: CogniteExternalId;

//   @Field({ nullable: true, description: "" })
//   containsAny?: FileName;

//   @Field({ nullable: true, description: "" })
//   containsAll?: FileMimeType;
// }

// export declare type Label = ExternalId;
// export declare type LabelFilter = LabelContainsAnyFilter | LabelContainsAllFilter;
// export interface LabelContainsAnyFilter {
//     containsAny: Label[];
// }
// export interface LabelContainsAllFilter {
//     containsAll: Label[];
// }

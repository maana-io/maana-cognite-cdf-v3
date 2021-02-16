/**
 * Common type definitions used by Cognite
 */

export type CogniteExternalId = string;

export type CogniteInternalId = number;

export interface CreatedAndLastUpdatedTime {
  lastUpdatedTime: Date;
  createdTime: Date;
}

export interface ExternalId {
  externalId: CogniteExternalId;
}

export type IdEither = InternalId | ExternalId;

export interface InternalId {
  id: CogniteInternalId;
}

export type Label = ExternalId;

export interface Limit {
  limit?: number;
}

export interface IgnoreUnknownIds {
  /**
   * Ignore IDs and external IDs that are not found
   * @default false
   */
  ignoreUnknownIds?: boolean;
}

export type Timestamp = number | Date;

// --- Assets
export interface AssetAggregateResult {
  /**
   * Number of direct descendants for the asset
   */
  childCount?: number;
  /**
   * Asset path depth (number of levels below root node).
   */
  depth?: number;
  /**
   * IDs of assets on the path to the asset.
   */
  path?: AssetIdEither[];
}

export type AssetDescription = string;

export type AssetIdEither = IdEither;

export type AssetExternalId = ExternalId;

export type AssetInternalId = InternalId;

export type AssetName = string;

export type AssetSource = string;

// --- Files

export type FileName = string;

export type FileMimeType = string;

export interface FileLink {
  downloadUrl: string;
  id: number;
  externalId?: string;
}

// --- Timeseries

export type TimeseriesName = string;
export type TimeseriesIsString = boolean;
export type TimeseriesUnit = string;
export type TimeseriesIsStep = boolean;

// --- Datapoints

export type Datapoints = StringDatapoints | DoubleDatapoints;

export interface DoubleDatapoints extends DatapointsMetadata {
  isString: false;
  /**
   * Whether the timeseries is a step series or not
   */
  isStep?: boolean;
  /**
   * The list of datapoints
   */
  datapoints: DoubleDatapoint[];
}

export interface StringDatapoints extends DatapointsMetadata {
  isString: true;
  /**
   * The list of datapoints
   */
  datapoints: StringDatapoint[];
}

export interface DatapointInfo {
  timestamp: Date;
}

export interface DoubleDatapoint extends DatapointInfo {
  value: number;
}

export interface StringDatapoint extends DatapointInfo {
  value: string;
}
export interface DatapointsMetadata extends InternalId {
  /**
   * External id of the timeseries the datapoints belong to.
   */
  externalId?: CogniteExternalId;
  /**
   * Whether or not the datapoints are string values.
   */
  isString: boolean;
  /**
   * Name of the physical unit of the time series
   */
  unit?: string;
}

export interface DatapointAggregates extends DatapointsMetadata {
  isString: false;
  /**
   * Whether the timeseries is a step series or not
   */
  isStep: boolean;
  datapoints: DatapointAggregate[];
}

export interface DatapointAggregate extends DatapointInfo {
  average?: number;
  max?: number;
  min?: number;
  count?: number;
  sum?: number;
  interpolation?: number;
  stepInterpolation?: number;
  continuousVariance?: number;
  discreteVariance?: number;
  totalVariation?: number;
}

export interface DatapointsMultiQuery extends DatapointsMultiQueryBase {
  items: DatapointsQuery[];
}

export type DatapointsQuery = DatapointsQueryId | DatapointsQueryExternalId;

export interface DatapointsQueryExternalId extends DatapointsQueryProperties, ExternalId {}

export interface DatapointsQueryId extends DatapointsQueryProperties, InternalId {}

export interface DatapointsQueryProperties extends Limit {
  /**
   * Get datapoints after this time. Format is N[timeunit]-ago where timeunit is w,d,h,m,s. Example: '2d-ago' will get everything that is up to 2 days old. Can also send in Date object. Note that when using aggregates, the start time will be rounded down to a whole granularity unit (in UTC timezone). For granularity 2d it will be rounded to 0:00 AM on the same day, for 3h it will be rounded to the start of the hour, etc.
   */
  start?: string | Timestamp;
  /**
   * Get datapoints up to this time. Same format as for start. Note that when using aggregates, the end will be rounded up such that the last aggregate represents a full aggregation interval containing the original end, where the interval is the granularity unit times the granularity multiplier. For granularity 2d, the aggregation interval is 2 days, if end was originally 3 days after the start, it will be rounded to 4 days after the start.
   */
  end?: string | Timestamp;
  /**
   * The aggregates to be returned.  Use default if null. An empty string must be sent to get raw data if the default is a set of aggregates.
   */
  aggregates?: Aggregate[];
  /**
   * The granularity size and granularity of the aggregates (2h)
   */
  granularity?: string;
  /**
   * Whether to include the last datapoint before the requested time period,and the first one after the requested period. This can be useful for interpolating data. Not available for aggregates.
   */
  includeOutsidePoints?: boolean;
}

export interface DatapointsMultiQueryBase extends Limit, IgnoreUnknownIds {
  /**
   * Get datapoints after this time. Format is N[timeunit]-ago where timeunit is w,d,h,m,s. Example: '2d-ago' will get everything that is up to 2 days old. Can also send in a Date object. Note that when using aggregates, the start time will be rounded down to a whole granularity unit (in UTC timezone). For granularity 2d it will be rounded to 0:00 AM on the same day, for 3h it will be rounded to the start of the hour, etc.
   */
  start?: string | Timestamp;
  /**
   * Get datapoints up to this time. Same format as for start. Note that when using aggregates, the end will be rounded up such that the last aggregate represents a full aggregation interval containing the original end, where the interval is the granularity unit times the granularity multiplier. For granularity 2d, the aggregation interval is 2 days, if end was originally 3 days after the start, it will be rounded to 4 days after the start.
   */
  end?: string | Timestamp;
  /**
   * The aggregates to be returned. This value overrides top-level default aggregates list when set. Specify all aggregates to be retrieved here. Specify empty array if this sub-query needs to return datapoints without aggregation.
   */
  aggregates?: Aggregate[];
  /**
   * The time granularity size and unit to aggregate over.
   */
  granularity?: string;
  /**
   * Whether to include the last datapoint before the requested time period,and the first one after the requested period. This can be useful for interpolating data. Not available for aggregates.
   */
  includeOutsidePoints?: boolean;
}

export type Aggregate =
  | "average"
  | "max"
  | "min"
  | "count"
  | "sum"
  | "interpolation"
  | "stepInterpolation"
  | "totalVariation"
  | "continuousVariance"
  | "discreteVariance";

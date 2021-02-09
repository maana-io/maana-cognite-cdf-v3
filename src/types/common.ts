/**
 * Common type definitions used by Cognite
 */

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

export type FileName = string;

export type FileMimeType = string;

export interface FileLink {
  downloadUrl: string;
  id: number;
  externalId?: string;
}

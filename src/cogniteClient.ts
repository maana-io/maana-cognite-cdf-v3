import { CogniteClient } from "@cognite/sdk";
import { environment } from "./environment";

export class Cognite {
  private static _instance: Cognite = new Cognite();

  private _client: CogniteClient;

  constructor() {
    if (Cognite._instance) {
      throw new Error("Error: Instantiation failed: Use Cognite.client() instead of new.");
    }

    this._client = new CogniteClient({ appId: environment.cogniteAppId });
    this._client.loginWithApiKey({
      project: environment.cogniteProject,
      apiKey: environment.cogniteCredentials,
    });

    Cognite._instance = this;
  }

  public static get client(): CogniteClient {
    return Cognite._instance._client;
  }
}

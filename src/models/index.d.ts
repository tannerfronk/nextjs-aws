import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MarvelCharactersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class MarvelCharacters {
  readonly id: string;
  readonly comics?: string;
  readonly description?: string;
  readonly events?: string;
  readonly charID?: number;
  readonly modified?: string;
  readonly name?: string;
  readonly resourceURI?: string;
  readonly series?: string;
  readonly stories?: string;
  readonly thumbnail?: string;
  readonly urls?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MarvelCharacters, MarvelCharactersMetaData>);
  static copyOf(source: MarvelCharacters, mutator: (draft: MutableModel<MarvelCharacters, MarvelCharactersMetaData>) => MutableModel<MarvelCharacters, MarvelCharactersMetaData> | void): MarvelCharacters;
}
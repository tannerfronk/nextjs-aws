import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MarvelCharactersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class MarvelCharacters {
  readonly id: string;
  readonly comics?: string | null;
  readonly description?: string | null;
  readonly events?: string | null;
  readonly charID?: number | null;
  readonly modified?: string | null;
  readonly name?: string | null;
  readonly resourceURI?: string | null;
  readonly series?: string | null;
  readonly stories?: string | null;
  readonly thumbnail?: string | null;
  readonly urls?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<MarvelCharacters, MarvelCharactersMetaData>);
  static copyOf(source: MarvelCharacters, mutator: (draft: MutableModel<MarvelCharacters, MarvelCharactersMetaData>) => MutableModel<MarvelCharacters, MarvelCharactersMetaData> | void): MarvelCharacters;
}
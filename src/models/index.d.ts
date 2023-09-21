import { ModelInit, MutableModel, __modelMeta__, CustomIdentifier, CompositeIdentifier, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Gender {
  MAN = "MAN",
  WOMAN = "WOMAN"
}

type EagerRouteDurations = {
  readonly spotName: string;
  readonly spotAddress: string;
  readonly duration: string;
  readonly distance: string;
}

type LazyRouteDurations = {
  readonly spotName: string;
  readonly spotAddress: string;
  readonly duration: string;
  readonly distance: string;
}

export declare type RouteDurations = LazyLoading extends LazyLoadingDisabled ? EagerRouteDurations : LazyRouteDurations

export declare const RouteDurations: (new (init: ModelInit<RouteDurations>) => RouteDurations)

type EagerRouteDurationsResponse = {
  readonly car: RouteDurations[];
  readonly walk: RouteDurations[];
}

type LazyRouteDurationsResponse = {
  readonly car: RouteDurations[];
  readonly walk: RouteDurations[];
}

export declare type RouteDurationsResponse = LazyLoading extends LazyLoadingDisabled ? EagerRouteDurationsResponse : LazyRouteDurationsResponse

export declare const RouteDurationsResponse: (new (init: ModelInit<RouteDurationsResponse>) => RouteDurationsResponse)

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'userId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly gender: Gender | keyof typeof Gender;
  readonly age?: number | null;
  readonly travels?: (TravelUser | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<User, 'userId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly userId: string;
  readonly name: string;
  readonly email: string;
  readonly gender: Gender | keyof typeof Gender;
  readonly age?: number | null;
  readonly travels: AsyncCollection<TravelUser>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerTravel = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Travel, ['travelId', 'travelDate']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly travelId: string;
  readonly travelDate: string;
  readonly travelName: string;
  readonly users?: (TravelUser | null)[] | null;
  readonly spots?: (Spot | null)[] | null;
  readonly ownerId: string;
  readonly owner?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTravel = {
  readonly [__modelMeta__]: {
    identifier: CompositeIdentifier<Travel, ['travelId', 'travelDate']>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly travelId: string;
  readonly travelDate: string;
  readonly travelName: string;
  readonly users: AsyncCollection<TravelUser>;
  readonly spots: AsyncCollection<Spot>;
  readonly ownerId: string;
  readonly owner: AsyncItem<User | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Travel = LazyLoading extends LazyLoadingDisabled ? EagerTravel : LazyTravel

export declare const Travel: (new (init: ModelInit<Travel>) => Travel) & {
  copyOf(source: Travel, mutator: (draft: MutableModel<Travel>) => MutableModel<Travel> | void): Travel;
}

type EagerSpot = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Spot, 'spotId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly spotId: string;
  readonly location: string;
  readonly departureTime: string;
  readonly arrivalTime: string;
  readonly stayTimeMin: number;
  readonly travelId: string;
  readonly travelDate: string;
  readonly travel?: Travel | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySpot = {
  readonly [__modelMeta__]: {
    identifier: CustomIdentifier<Spot, 'spotId'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly spotId: string;
  readonly location: string;
  readonly departureTime: string;
  readonly arrivalTime: string;
  readonly stayTimeMin: number;
  readonly travelId: string;
  readonly travelDate: string;
  readonly travel: AsyncItem<Travel | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Spot = LazyLoading extends LazyLoadingDisabled ? EagerSpot : LazySpot

export declare const Spot: (new (init: ModelInit<Spot>) => Spot) & {
  copyOf(source: Spot, mutator: (draft: MutableModel<Spot>) => MutableModel<Spot> | void): Spot;
}

type EagerTravelUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TravelUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userUserId?: string | null;
  readonly travelTravelId?: string | null;
  readonly traveltravelDate?: string | null;
  readonly user: User;
  readonly travel: Travel;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTravelUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TravelUser, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userUserId?: string | null;
  readonly travelTravelId?: string | null;
  readonly traveltravelDate?: string | null;
  readonly user: AsyncItem<User>;
  readonly travel: AsyncItem<Travel>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type TravelUser = LazyLoading extends LazyLoadingDisabled ? EagerTravelUser : LazyTravelUser

export declare const TravelUser: (new (init: ModelInit<TravelUser>) => TravelUser) & {
  copyOf(source: TravelUser, mutator: (draft: MutableModel<TravelUser>) => MutableModel<TravelUser> | void): TravelUser;
}
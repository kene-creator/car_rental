
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class NewCar {
    thumbnailSrc: string;
    name: string;
    gearType: string;
    gasTank: string;
    passenger: string;
    dailyPrice: string;
    monthlyPrice: string;
    discountPrice: string;
    vehicle: string;
}

export class UpdateCar {
    id: string;
    thumbnailSrc: string;
    name: string;
    gearType: string;
    gasTank: string;
    passenger: string;
    dailyPrice: string;
    monthlyPrice: string;
    discountPrice: string;
    vehicle: string;
    mileage: string;
}

export class Car {
    id: string;
    thumbnailSrc: string;
    name: string;
    gearType: string;
    gasTank: string;
    passenger: string;
    dailyPrice: string;
    monthlyPrice: string;
    discountPrice?: Nullable<string>;
    vehicle: string;
    createdAt?: Nullable<DateTime>;
    updatedAt?: Nullable<string>;
}

export abstract class IQuery {
    abstract cars(): Car[] | Promise<Car[]>;

    abstract car(id: string): Car | Promise<Car>;
}

export abstract class IMutation {
    abstract createCar(input: NewCar): Car | Promise<Car>;

    abstract updateCar(input: UpdateCar): Car | Promise<Car>;

    abstract deleteCar(id: string): Car | Promise<Car>;
}

export type DateTime = any;
type Nullable<T> = T | null;

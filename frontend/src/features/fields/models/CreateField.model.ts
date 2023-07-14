import {Field} from "./Field.model";

export type CreateFieldResponsePayload = {
    id: Field["id"];
    name: Field["name"];
};

export type CreateFieldRequestPayload = {
    name: Field["name"];
};

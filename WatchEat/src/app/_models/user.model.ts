import { Deserializable } from "./deserializable.model";

export class UserModel implements Deserializable {
  Id?: string;
  Nome?: string;
  Apelido?: string;
  Email?: string;
  NTelemovel?: bigint;
  Morada?: string;
  NIF?: string;
  ImagemPerfil?: string;
  Estado?: string;
  Utilizador_Roles?: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

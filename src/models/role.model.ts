export abstract class Role {
  static readonly ADMIN: Role = {name: 'ADMIN'};
  static readonly STAFF: Role = {name: 'STAFF'};
  static readonly IT_SUPPORT: Role = {name: 'IT_SUPPORT'};
  static readonly INSTRUMENT_CONTROL: Role = {name: 'INSTRUMENT_CONTROL'};
  static readonly INSTRUMENT_SCIENTIST: Role = {name: 'INSTRUMENT_SCIENTIST'};
  static readonly SCIENTIFIC_COMPUTING: Role = {name: 'SCIENTIFIC_COMPUTING'};

  name: string;
}

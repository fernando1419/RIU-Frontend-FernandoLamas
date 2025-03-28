export interface Result {
   superheroes: Superhero[];
}

export interface Superhero {
   id: number;
   name: string;
   realName: string;
   powers: string[];
   universe: Universe;
   aliases?: string[];
   biography?: string;
   firstAppearance?: string;
   team?: string;
   images?: Images;
   updatedAt?: Date | null;
   deletedAt?: Date | null;
}

export interface Images {
   xs: string;
   sm: string;
   md: string;
   lg: string;
}

export enum Universe {
   Dc = 'DC',
   Marvel = 'Marvel',
}

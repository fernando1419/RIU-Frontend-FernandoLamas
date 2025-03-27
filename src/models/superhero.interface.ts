export interface Result {
   superheroes: Superhero[];
}

export interface Superhero {
   id: number;
   name: string;
   realName: string;
   biography: string;
   powers: string[];
   universe: Universe;
   firstAppearance: string;
   team: string;
   aliases: string[];
   images: Images;
   updatedAt: Date | null;
   deletedAt: Date | null;
   image?: string;
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

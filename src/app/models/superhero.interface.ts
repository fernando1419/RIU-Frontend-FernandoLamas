export interface Result {
   superheroes: Superhero[];
}

export interface Superhero {
   id: number | string; // because json-server generates ids as strings
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

export enum Team {
   Avengers = 'Avengers',
   BirdsOfPrey = 'Birds of Prey',
   Defenders = 'Defenders',
   FantasticFour = 'Fantastic Four',
   JusticeLeague = 'Justice League',
   JusticeSocietyOfAmerica = 'Justice Society of America',
   None = 'None',
   Solo = 'Solo',
   TeenTitans = 'Teen Titans',
   XForce = 'X-Force',
   XMen = 'X-Men',
}

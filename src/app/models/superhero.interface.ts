export interface Result {
   superheroes: Superhero[];
}

export interface Superhero {
   id: number | string;
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

export const powers: string[] = [
   'Acrobat',
   'Acrobatics',
   'Adamantium claws',
   'Agility',
   'Aquatic respiration',
   'Astral projection',
   'Charm',
   'Chi manipulation',
   'Cold resistance',
   'Combat skills',
   'Computer hacking',
   'Control over thunder',
   'Cosmic power',
   'Density control',
   'Detective skills',
   'Dimensional travel',
   'Durability',
   'Elasticity',
   'Energy manipulation',
   'Energy projection',
   'Energy repulsor beams',
   'Enhanced agility',
   'Enhanced senses',
   'Escape artistry',
   'Expert archer',
   'Expert archery',
   'Expert combatant',
   'Expert detective skills',
   'Expert hand-to-hand combat',
   'Expert marksman',
   'Expert martial artist',
   'Expert tactician',
   'Fire manipulation',
   'Flight',
   'Flight with Mjolnir',
   'Force field generation',
   'Genius intellect',
   'Hand-to-hand combat',
   'Hand-to-hand combat skills',
   'Healing',
   'Heat vision',
   'Hellfire manipulation',
   'High-tech gadgets',
   'Hydrokinesis',
   'Ice manipulation',
   'Illusions',
   'Immune to bullets',
   'Indestructible shield',
   'Insect communication',
   'Intangibility',
   'Invention',
   'Invisibility',
   'Invulnerability',
   'Kinetic energy manipulation',
   'Lightning manipulation',
   'Magic',
   'Martial arts',
   'Martial arts skills',
   'Mastery of combat',
   'Mental projection',
   'Military training',
   'Mind control',
   'Optic blasts',
   'Peak human physical condition',
   'Power absorption',
   'Powered armor suit',
   'Reality manipulation',
   'Regeneration',
   'Regenerative healing',
   'Sharpshooting',
   'Size manipulation',
   'Solar energy absorption',
   'Sonic scream',
   'Spider sense',
   'Strength enhancement',
   'Super agility',
   'Super speed',
   'Super strength',
   'Superhuman senses',
   'Superhuman strength',
   'Survival skills',
   'Symbiote abilities',
   'Telekinesis',
   'Telepathy',
   'Teleportation',
   'Time travel',
   'Unbreakable skin',
   'Vampire physiology',
   'Vibranium suit',
   'Vibration manipulation',
   'Wall-crawling',
   'Weapon proficiency',
   'Weather control',
   'Web-slinging',
   'Wind manipulation',
   'X-ray vision',
];

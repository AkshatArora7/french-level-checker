export type Sample = {
  label: string;
  level: string;
  text: string;
};

export const SAMPLES: Sample[] = [
  {
    label: "Beginner (A1)",
    level: "A1",
    text:
      "Bonjour, je m'appelle Sophie. J'ai vingt-cinq ans et j'habite à Paris. J'aime le café et les croissants. Le matin, je vais au travail en métro. Le soir, je rentre à la maison et je regarde la télévision avec mon chat.",
  },
  {
    label: "Intermediate (B1)",
    level: "B1",
    text:
      "Quand j'étais petite, ma famille partait toujours en vacances au bord de la mer. Nous louions une petite maison près de la plage et nous passions nos journées à nager et à jouer dans le sable. Si je pouvais revivre un moment de mon enfance, ce serait sûrement ces étés-là, car ils m'ont laissé des souvenirs inoubliables.",
  },
  {
    label: "Advanced (C1)",
    level: "C1",
    text:
      "Bien que les enjeux climatiques fassent désormais l'objet d'un consensus scientifique quasi unanime, force est de constater que la classe politique peine à traduire cette urgence en mesures concrètes. Il eût été préférable d'agir en amont, plutôt que de se contenter de réactions ponctuelles dictées par les catastrophes successives qui ponctuent l'actualité.",
  },
];

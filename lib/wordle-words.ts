/**
 * Curated 5-letter French words with no diacritics.
 * Used as Wordle answer pool. Easy to extend.
 */
export const WORDLE_ANSWERS: string[] = [
  "abord", "acide", "aigle", "aimer", "aller", "amant", "amour", "ample",
  "ancre", "angle", "apres", "arbre", "armee", "aussi", "avant", "avare",
  "avion", "avoir", "banal", "barbe", "barre", "basse", "belle", "bilan",
  "blanc", "bleus", "blond", "boire", "bombe", "bonne", "bourg", "bovin",
  "brave", "brise", "brume", "brute", "buste", "cadre", "calme", "canal",
  "canon", "carre", "carte", "casse", "cause", "cents", "chair", "champ",
  "chant", "chaud", "chefs", "chien", "choix", "chose", "civil", "clair",
  "clans", "clefs", "comme", "conte", "coque", "corde", "corps", "coude",
  "court", "danse", "delta", "dense", "drame", "droit", "dunes", "elite",
  "email", "entre", "envie", "epais", "ergot", "errer", "etage", "exact",
  "faits", "ferme", "fetes", "fibre", "fiche", "fille", "final", "finie",
  "finir", "flair", "fleur", "flore", "flots", "foire", "folie", "force",
  "forge", "forme", "forte", "fosse", "foule", "foyer", "franc", "frein",
  "frime", "froid", "front", "fruit", "furie", "genre", "geste", "glace",
  "gomme", "gorge", "grand", "grave", "homme", "image", "jambe", "jaune",
  "jeune", "jolie", "jouer", "joyau", "jurer", "juste", "large", "legal",
  "leger", "lente", "lieux", "ligne", "livre", "local", "longe", "lourd",
  "lutte", "magie", "mains", "manie", "marin", "marre", "masse", "matin",
  "menus", "mince", "moins", "monde", "monte", "motif", "moule", "noeud",
  "noire", "nuage", "objet", "olive", "ombre", "orage", "ordre", "ouest",
  "ouvre", "pages", "parle", "pause", "peine", "pelle", "pente", "perdu",
  "perle", "perte", "peser", "photo", "piano", "place", "plage", "plain",
  "plein", "plier", "plomb", "pluie", "point", "poire", "pomme", "porte",
  "poule", "prime", "prude", "punir", "quart", "radio", "rares", "raser",
  "rayon", "reine", "repas", "repos", "revue", "riche", "rimer", "rival",
  "robes", "roche", "roman", "ronde", "rouge", "route", "royal", "ruban",
  "rural", "sable", "sages", "sains", "salle", "salon", "sauce", "sauve",
  "seize", "serre", "seuil", "signe", "sirop", "soeur", "solde", "somme",
  "sonde", "songe", "sorte", "souci", "sport", "stade", "stage", "stand",
  "store", "style", "suite", "sujet", "super", "table", "tache", "taire",
  "talon", "tante", "taper", "tapis", "tarde", "tarte", "taupe", "teint",
  "telle", "tempe", "tenir", "tente", "terme", "terre", "texte", "tigre",
  "tirer", "titre", "toile", "tombe", "tonne", "total", "train", "trame",
  "tribu", "trier", "trois", "tueur", "tuyau", "ultra", "unite", "usage",
  "usine", "usuel", "vache", "vague", "valet", "velue", "venir", "vente",
  "verre", "verte", "veste", "vexer", "video", "viens", "vieux", "ville",
  "vingt", "vivre", "voile", "voire", "votre", "vrais",

  // --- Expansion: verbs, nouns, conjugated forms (no diacritics) -----------
  "achat", "aider", "amers", "amine", "actif", "agent", "agile", "ainsi",
  "alors", "argot", "armer", "armes", "assez", "assis", "atone", "atout",
  "audit", "autel", "autos", "avait", "avers", "badge", "balle", "bande",
  "banni", "baron", "beige", "belge", "bigot", "bille", "bingo", "bison",
  "bisou", "blues", "boite", "boyau", "breve", "brins", "buche", "bugle",
  "bulle", "butin", "cafes", "cargo", "chape", "chats", "chips", "ciels",
  "clore", "clous", "cobra", "codes", "comte", "copie", "corne", "cours",
  "cousu", "couru", "crane", "creme", "crepe", "crete", "crime", "crise",
  "croit", "croix", "crues", "cuirs", "cuits", "culot", "cumul", "cuvee",
  "cycle", "dague", "daims", "dames", "damne", "datte", "debat", "debit",
  "debut", "delai", "demie", "depit", "depot", "dette", "devra", "dilue",
  "diner", "divan", "docks", "dodue", "doigt", "donna", "donne", "dorer",
  "dormi", "doute", "drape", "drone", "ducat", "duels", "durer", "duvet",
  "ebahi", "ecart", "eclat", "ecran", "ecrin", "ecrit", "edits", "egard",
  "egout", "elans", "emoji", "encan", "encre", "enfer", "enfin", "enjeu",
  "envoi", "epice", "epoux", "etain", "etang", "etant", "etape", "etats",
  "eveil", "exile", "exode", "falot", "faner", "farce", "fasse", "fatal",
  "faune", "fauve", "feint", "femme", "femur", "fente", "fesse", "ficus",
  "fines", "fiole", "firme", "fixer", "fjord", "flanc", "flash", "flics",
  "flute", "foies", "foins", "fonce", "fonds", "fonte", "foret", "forer",
  "fours", "frais", "fripe", "frire", "frise", "fumer", "fumet", "futon",
  "galon", "gamin", "garde", "garer", "gaule", "gazon", "genou", "gerbe",
  "gnome", "gosse", "gouts", "grade", "guide", "habit", "hache", "haine",
  "halos", "haras", "harem", "harpe", "herbe", "herse", "heros", "heure",
  "hibou", "hisse", "honte", "horde", "hotel", "hotes", "huile", "humer",
  "hymne", "idees", "idole", "igloo", "imbus", "impot", "index", "infos",
  "issue", "ivres", "jadis", "jaser", "joies", "jouet", "kayak", "kilos",
  "koala", "label", "lacer", "lacet", "ladre", "laide", "laine", "laits",
  "lamas", "lampe", "lance", "lapin", "larme", "lasse", "latte", "laver",
  "leche", "lever", "levee", "levre", "liane", "liens", "lilas", "liste",
  "lisse", "litre", "loger", "lotus", "louer", "lumen", "lunes", "lutin",
  "lycee", "macho", "magma", "maire", "malle", "manga", "maman", "marge",
  "marie", "match", "mauve", "media", "melee", "melon", "merci", "merle",
  "metal", "mille", "mines", "mites", "modes", "moine", "moisi", "morne",
  "morue", "moyen", "mural", "murir", "musee", "mythe", "nages", "nappe",
  "navet", "neige", "nerfs", "niais", "niche", "nique", "nomme", "notre",
  "nouer", "noyau", "nuque", "nylon", "oasis", "obese", "obeir", "ocean",
  "odeur", "oeufs", "offre", "ogive", "oncle", "opera", "orgue", "ornee",
  "oubli", "ourse", "outil", "outre", "oxyde", "pacha", "paire", "palme",
  "panda", "panne", "panse", "papas", "parka", "parmi", "patin", "patio",
  "paume", "paves", "payer", "peche", "peler", "petit", "peurs", "phare",
  "piece", "pions", "pique", "piste", "piton", "plant", "plats", "polar",
  "polis", "ponts", "poste", "pouce", "pouls", "prend", "prier", "prise",
  "prive", "prone", "prose", "puise", "puits", "pulpe", "purge", "quete",
  "queue", "rabat", "races", "raide", "raids", "rails", "ramer", "range",
  "ravir", "recel", "recit", "regle", "reins", "rhino", "rhume", "rider",
  "rieur", "rives", "robot", "rouet", "rusee", "sabre", "sache", "sales",
  "salut", "satin", "sauge", "savon", "scene", "seant", "seche", "seins",
  "semis", "sente", "serie", "siege", "silex", "singe", "sinon", "sites",
  "socle", "soies", "soifs", "soupe", "soute", "soyez", "stick", "stock",
  "suave", "taies", "taule", "tendu", "tenue", "teste", "tibia", "tilde",
  "tinte", "tique", "tisse", "titan", "toast", "toits", "tomes", "tordu",
  "tours", "trucs", "truie", "unira", "utile", "vanne", "varan", "vases",
  "velin", "venus", "verbe", "verge", "verse", "verso", "vetir", "vetus",
  "vigne", "villa", "vital", "vitre", "voeux", "voici", "voler", "volet",
  "volts", "vomir", "voter", "vouer", "voute", "vraie", "wagon", "watts",
  "yacht", "yucca",
];

const ANSWER_SET = new Set(WORDLE_ANSWERS);

/**
 * Strip diacritics so user input like "ecole" matches "école".
 */
export function normalizeGuess(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
}

export function isValidGuess(s: string) {
  const n = normalizeGuess(s);
  if (n.length !== 5) return false;
  // Lenient: accept any answer-list word OR any 5 letters of the alphabet.
  // Real French dictionary validation would need a much larger word list;
  // we trade strictness for not blocking creative learners.
  return /^[a-z]{5}$/.test(n) || ANSWER_SET.has(n);
}

export type LetterState = "correct" | "present" | "absent";

export function scoreGuess(answer: string, guess: string): LetterState[] {
  const a = normalizeGuess(answer);
  const g = normalizeGuess(guess);
  const result: LetterState[] = Array(5).fill("absent");
  const remaining: Record<string, number> = {};

  for (let i = 0; i < 5; i++) {
    if (g[i] === a[i]) {
      result[i] = "correct";
    } else {
      remaining[a[i]] = (remaining[a[i]] || 0) + 1;
    }
  }
  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const c = g[i];
    if (remaining[c] > 0) {
      result[i] = "present";
      remaining[c] -= 1;
    }
  }
  return result;
}

var questions = {
  "categories": [
    {
      "name": "Lavoro",
      "priority": 1,
      "questions": [
        { "question": "Il tuo personaggio è un fisico?", "answer": { "expression": "professions == physicist" } },
        { "question": "Il tuo personaggio è un chimico?", "answer": { "expression": "professions == chemist" } },
        { "question": "Il tuo personaggio è un divulgatore scientifico?", "answer": { "expression": "professions == science_communicator" } },
        { "question": "Il tuo personaggio è un matematico?", "answer": { "expression": "professions == mathematician" } },
        { "question": "Il tuo personaggio è un informatico?", "answer": { "expression": "professions == informatic" } },
        { "question": "Il tuo personaggio è un imprenditore?", "answer": { "expression": "professions == entrepreneur" } },
        { "question": "Il tuo personaggio è un proprietario di una azienda?", "answer": { "expression": "professions == company_owner" } },
        { "question": "Il tuo personaggio è un dirigente di una azienda?", "answer": { "expression": "professions == company_manager" } },
        { "question": "Il tuo personaggio è un ingegnere?", "answer": { "expression": "professions == engineer" } },
        { "question": "Il tuo personaggio è un artista?", "answer": { "expression": "professions == artist" } },
        { "question": "Il tuo personaggio è un inventore?", "answer": { "expression": "professions == inventor" } },
        { "question": "Il tuo personaggio è un astronomo?", "answer": { "expression": "professions == astronomer" } },
        { "question": "Il tuo personaggio è un cosmologo?", "answer": { "expression": "professions == cosmologist" } },
        { "question": "Il tuo personaggio è uno scienziato informatico?", "answer": { "expression": "professions == computer_scientist" } },
        { "question": "Il tuo personaggio è uno scultore?", "answer": { "expression": "professions == sculptor" } },
        { "question": "Il tuo personaggio è un architetto?", "answer": { "expression": "professions == architect" } },
        { "question": "Il tuo personaggio è un programmatore?", "answer": { "expression": "professions == programmer" } }
      ]
    },
    {
      "name": "Sesso",
      "priority": 2,
      "questions": [
        { "question": "Il tuo personaggio è maschio?", "answer": { "expression": "sex == m" } },
        { "question": "Il tuo personaggio è femmina?", "answer": { "expression": "sex == f" } }
      ]
    },
    {
      "name": "Data di nascita",
      "priority": 3,
      "questions": [
        { "question": "Il tuo personaggio è nato prima del 1900?", "answer": { "expression": "yearOfBirth < 1900" } },
        { "question": "Il tuo personaggio è nato dopo il 1900?", "answer": { "expression": "yearOfBirth > 1900" } },
        { "question": "Il tuo personaggio è nato dopo il 1950?", "answer": { "expression": "yearOfBirth > 1950" } },
        { "question": "Il tuo personaggio è nato prima dell'anno 0?", "answer": { "expression": "yearOfBirth < 0" } }
      ]
    },
    {
      "name": "Luogo di nascita",
      "priority": 4,
      "questions": [
        { "question": "Il tuo personaggio è nato in Polonia?", "answer": { "expression": "country == poland" } },
        { "question": "Il tuo personaggio è nato in Germania?", "answer": { "expression": "country == germany" } },
        { "question": "Il tuo personaggio è nato nel Regno Unito?", "answer": { "expression": "country == uk" } },
        { "question": "Il tuo personaggio è nato in Italia?", "answer": { "expression": "country == italy" } },
        { "question": "Il tuo personaggio è nato negli Stati Uniti?", "answer": { "expression": "country == usa" } },
        { "question": "Il tuo personaggio è nato in India?", "answer": { "expression": "country == india" } },
        { "question": "Il tuo personaggio è nato in Croazia?", "answer": { "expression": "country == croatia" } },
        { "question": "Il tuo personaggio è nato in Sudafrica?", "answer": { "expression": "country == south_africa" } },
        { "question": "Il tuo personaggio è nato nei Paesi Bassi?", "answer": { "expression": "country == netherlands" } },
        { "question": "Il tuo personaggio è nato in Messico?", "answer": { "expression": "country == mexico" } },
        { "question": "Il tuo personaggio è nato in Spagna?", "answer": { "expression": "country == spain" } },
        { "question": "Il tuo personaggio è nato in Grecia?", "answer": { "expression": "country == greece" } },
        { "question": "Il tuo personaggio è nato in Francia?", "answer": { "expression": "country == france" } }
      ]
    },
    {
      "name": "Capelli",
      "priority": 5,
      "questions": [
        { "question": "Il tuo personaggio ha i capelli?", "answer": { "expression": "colorOfHair != no" } },
        { "question": "Il tuo personaggio ha i capelli bianchi?", "answer": { "expression": "colorOfHair == white" } },
        { "question": "Il tuo personaggio ha i capelli biondi?", "answer": { "expression": "colorOfHair == blonde" } },
        { "question": "Il tuo personaggio ha i capelli castani?", "answer": { "expression": "colorOfHair == brown" } },
        { "question": "Il tuo personaggio ha i capelli grigi?", "answer": { "expression": "colorOfHair == grey" } },
        { "question": "Il tuo personaggio ha i capelli neri?", "answer": { "expression": "colorOfHair == black" } }
      ]
    },
    {
      "name": "Occhi",
      "priority": 6,
      "questions": [
        { "question": "Il tuo personaggio ha gli occhi castani?", "answer": { "expression": "colorOfEyes == brown" } },
        { "question": "Il tuo personaggio ha gli occhi verdi?", "answer": { "expression": "colorOfEyes == green" } },
        { "question": "Il tuo personaggio ha gli occhi azzurri?", "answer": { "expression": "colorOfEyes == blue" } },
        { "question": "Il tuo personaggio ha gli occhi neri?", "answer": { "expression": "colorOfEyes == black" } }
      ]
    },
    {
      "name": "Barba e baffi",
      "priority": 7,
      "questions": [
        { "question": "Il tuo personaggio ha barba/baffi?", "answer": { "expression": "colorOfMustache != no" } },
        { "question": "Il tuo personaggio ha barba/baffi grigi?", "answer": { "expression": "colorOfMustache == grey" } },
        { "question": "Il tuo personaggio ha barba/baffi bianchi?", "answer": { "expression": "colorOfMustache == white" } },
        { "question": "Il tuo personaggio ha barba/baffi neri?", "answer": { "expression": "colorOfMustache == black" } },
        { "question": "Il tuo personaggio ha barba/baffi biondi?", "answer": { "expression": "colorOfMustache == blonde" } }
      ]
    },
    {
      "name": "Premi",
      "priority": 8,
      "questions": [
        { "question": "Il tuo personaggio ha più di 4 premi vinti?", "answer": { "expression": "awards > 4" } },
        { "question": "Il tuo personaggio ha vinto almeno un Premio Nobel?", "answer": { "expression": "nobels >= 1" } }
      ]
    },
    {
      "name": "Morte",
      "priority": 9,
      "questions": [
        { "question": "Il tuo personaggio è morto?", "answer": { "expression": "yearOfDeath != null" } },
        { "question": "Il tuo personaggio è morto prima del 1950?", "answer": { "expression": "yearOfDeath < 1950" } },
        { "question": "Il tuo personaggio è morto prima dell'anno 0?", "answer": { "expression": "yearOfDeath < 0" } }
      ]
    },
    {
      "name": "Specialità",
      "priority": 10,
      "questions": [
        { "question": "Il tuo personaggio è riconosciuto per varie teorie sulla relatività?", "answer": { "expression": "specialities == relativity" } },
        { "question": "Il tuo personaggio è riconosciuto per i suoi studi sulle radiazioni?", "answer": { "expression": "specialities == radio" } },
        { "question": "Il tuo personaggio è riconosciuto per aver scoperto il polonio?", "answer": { "expression": "specialities == polonium" } },
        { "question": "Il tuo personaggio è riconosciuto per i suoi studi sui raggi-x?", "answer": { "expression": "specialities == x-ray" } },
        { "question": "Il tuo personaggio è riconosciuta per i suoi studi sui primati?", "answer": { "expression": "specialities == primate_research" } },
        { "question": "Il tuo personaggio è riconosciuto per la sua scoperta riguardante la struttura del DNA?", "answer": { "expression": "specialities == dna_structure_discovery" } },
        { "question": "Il tuo personaggio è un amministratore delegato di Apple?", "answer": { "expression": "specialities == apple_ceo" } },
        { "question": "Il tuo personaggio è il proprietario di Amazon?", "answer": { "expression": "specialities == amazon_owner" } },
        { "question": "Il tuo personaggio è il fondatore di Microsoft?", "answer": { "expression": "specialities == microsoft_founder" } },
        { "question": "Il tuo personaggio è un amministratore delegato di Facebook?", "answer": { "expression": "specialities == facebook_ceo" } },
        { "question": "Il tuo personaggio è un amministratore delegato di Microsoft?", "answer": { "expression": "specialities == microsoft_ceo" } },
        { "question": "Il tuo personaggio è riconosciuto per la base del sistema elettrico?", "answer": { "expression": "specialities == electrical_system_basis" } },
        { "question": "Il tuo personaggio è riconosciuto per l’invenzione del telegrafo?", "answer": { "expression": "specialities == telegraph_invention" } },
        { "question": "Il tuo personaggio è riconosciuto per l’invenzione del primo impianto di produzione basato sulla catena di montaggio?", "answer": { "expression": "specialities == assembly_line_invention" } },
        { "question": "Il tuo personaggio è riconosciuto per la costruzione del Great Eastern?", "answer": { "expression": "specialities == great_eastern_construction" } },
        { "question": "Il tuo personaggio è riconosciuto per l’invenzione dello space x?", "answer": { "expression": "specialities == spacex_invention" } },
        { "question": "Il tuo personaggio è riconosciuto per l’invenzione dell’Ornitottero?", "answer": { "expression": "specialities == ornithopter_invention" } },
        { "question": "Il tuo personaggio è riconosciuto per il dipinto ‘La notte stellata’?", "answer": { "expression": "specialities == starry_night_painting" } },
        { "question": "Il tuo personaggio è riconosciuto come espressionista della libertà?", "answer": { "expression": "specialities == liberty_expressionist" } },
        { "question": "Il tuo personaggio è riconosciuto per i suoi periodi blu e rosa?", "answer": { "expression": "specialities == blue_and_pink_periods" } },
        { "question": "Il tuo personaggio è riconosciuto per essere membro del surrealismo?", "answer": { "expression": "specialities == surrealism_member" } },
        { "question": "Il tuo personaggio è riconosciuto per la sua scoperta della gravità?", "answer": { "expression": "specialities == gravity_discovery" } },
        { "question": "Il tuo personaggio è riconosciuto per l’aritmetica modulare?", "answer": { "expression": "specialities == modular_arithmetic" } },
        { "question": "Il tuo personaggio è riconosciuto per le sue scoperte nel campo geometrico?", "answer": { "expression": "specialities == geometric_discoveries" } },
        { "question": "Il tuo personaggio è riconosciuto per la scoperta dei corpi galleggianti?", "answer": { "expression": "specialities == buoyancy_discovery" } },
        { "question": "Il tuo personaggio è riconosciuto per la teoria della computazione?", "answer": { "expression": "specialities == computation_theory" } },
        { "question": "Il tuo personaggio ha sostenuto la teoria eliocentrica o migliorato il telescopio?", "answer": { "expression": "specialities == heliocentrism || specialities == telescope_improvements" } },
        { "question": "Il tuo personaggio è considerato il primo programmatore della storia?", "answer": { "expression": "specialities == first_algorithm || specialities == analytical_engine" } },
        { "question": "Il tuo personaggio ha studiato i buchi neri e la radiazione di Hawking?", "answer": { "expression": "specialities == black_holes || specialities == hawking_radiation" } },
        { "question": "Il tuo personaggio ha inventato il World Wide Web?", "answer": { "expression": "specialities == world_wide_web" } },
        { "question": "Il tuo personaggio ha sviluppato il primo compilatore o il linguaggio COBOL?", "answer": { "expression": "specialities == compiler || specialities == cobol" } },
        { "question": "Il tuo personaggio è noto per l'elettromagnetismo o l'elettrolisi?", "answer": { "expression": "specialities == electromagnetism || specialities == electrolysis" } },
        { "question": "Il tuo personaggio ha migliorato la macchina a vapore?", "answer": { "expression": "specialities == steam_engine_improvement" } },
        { "question": "Il tuo personaggio ha dipinto la Cappella Sistina o scolpito il David?", "answer": { "expression": "specialities == sistine_chapel || specialities == david_sculpture" } },
        { "question": "Il tuo personaggio ha inventato la calcolatrice meccanica o studiato la probabilità?", "answer": { "expression": "specialities == pascal_calculator || specialities == probability" } },
        { "question": "Il tuo personaggio ha costruito il primo reattore nucleare?", "answer": { "expression": "specialities == nuclear_reactor" } }
      ]
    }
  ]
};
// JavaScript source code
/**
 * VINCODE Data Dictionaries extracted directly from workbook lookup sheets:
 * - latLookup (6°N - 38°N)
 * - longLookup (67°E - 96°E)
 * - shortCodes (P1, P3, P4, P5-1, P5-2, P6)
 * - shortCodesNumeric (Sheet8)
 * - syllables380 (Phonetic grid - Sheet6)
 */
const VINCODE_TABLES = {
  latLookup: {
    "6": { "primary": "LANKA", "aliases": [] },
    "7": { "primary": "KANYA", "aliases": [] },
    "8": { "primary": "PUDU", "aliases": [] },
    "9": { "primary": "TIRU", "aliases": [] },
    "10": { "primary": "PERIYAR", "aliases": ["ARASA", "AKSHARA"] },
    "11": { "primary": "KAVI", "aliases": ["BHAVANI", "MURUGA"] },
    "12": { "primary": "JANA", "aliases": ["KAVERI", "KARU", "KANNADA"] },
    "13": { "primary": "LOKA", "aliases": ["MANA", "KONKAN"] },
    "14": { "primary": "GANA", "aliases": [] },
    "15": { "primary": "GURU", "aliases": ["KRISHNA"] },
    "16": { "primary": "DAKSH", "aliases": ["GODAVARI"] },
    "17": { "primary": "RADHA", "aliases": ["MUSI", "KOYNA"] },
    "18": { "primary": "AMARA", "aliases": [] },
    "19": { "primary": "RATNA", "aliases": [] },
    "20": { "primary": "PURI", "aliases": [] },
    "21": { "primary": "AJANTA", "aliases": ["TAPTI"] },
    "22": { "primary": "SURAT", "aliases": ["NARMADA", "DWARKA", "DAMODAR"] },
    "23": { "primary": "SANJAY", "aliases": ["AJAY"] },
    "24": { "primary": "MEWAR", "aliases": ["KOTA", "MAYANK"] },
    "25": { "primary": "GANGA", "aliases": ["KEN"] },
    "26": { "primary": "DHANA", "aliases": ["PALI"] },
    "27": { "primary": "AGRA", "aliases": ["JAYA", "AJMER"] },
    "28": { "primary": "VANA", "aliases": [] },
    "29": { "primary": "THAR", "aliases": ["MALWA"] },
    "30": { "primary": "BADRI", "aliases": ["ONKAR"] },
    "31": { "primary": "KEDAR", "aliases": [] },
    "32": { "primary": "HIMA", "aliases": [] },
    "33": { "primary": "JAMMU", "aliases": [] },
    "34": { "primary": "NUBRA", "aliases": ["MARKHA"] },
    "35": { "primary": "GILGIT", "aliases": [] },
    "36": { "primary": "KARIM", "aliases": [] },
    "37": { "primary": "SINDHU", "aliases": ["MUKUT"] },
    "38": { "primary": "MUKTI", "aliases": [] }
  },
  longLookup: {
    "67": { "primary": "BHUVI", "aliases": [] },
    "68": { "primary": "PREM", "aliases": [] },
    "69": { "primary": "VINOD", "aliases": ["VIPUL"] },
    "70": { "primary": "ABHAY", "aliases": [] },
    "71": { "primary": "HITA", "aliases": ["KALYANA"] },
    "72": { "primary": "PARA", "aliases": ["SANAD", "JUHU", "VAPI"] },
    "73": { "primary": "PRIYA", "aliases": ["KUNJ", "MUMBRA"] },
    "74": { "primary": "KAMAL", "aliases": ["DHULE", "SHIRDI", "MAHI", "UDUPI"] },
    "75": { "primary": "GOVIND", "aliases": ["SIRI"] },
    "76": { "primary": "HARSH", "aliases": ["ANANTA"] },
    "77": { "primary": "KAVYA", "aliases": ["NADU", "GUNA", "KOVALAM"] },
    "78": { "primary": "SHAKTI", "aliases": ["JHANSI", "KAPRA", "CHOLA"] },
    "79": { "primary": "NAKUL", "aliases": ["KANADU", "NALLA", "AVANI"] },
    "80": { "primary": "ADITYA", "aliases": ["CHITRA", "TADA"] },
    "81": { "primary": "ARJUN", "aliases": ["VIKRANT"] },
    "82": { "primary": "KASHI", "aliases": [] },
    "83": { "primary": "PAVANA", "aliases": [] },
    "84": { "primary": "AKSHAY", "aliases": [] },
    "85": { "primary": "CHETAN", "aliases": ["BHUVAN"] },
    "86": { "primary": "MANOJ", "aliases": [] },
    "87": { "primary": "MOHAN", "aliases": ["MANDIR", "MAHAL"] },
    "88": { "primary": "BODHI", "aliases": ["SUNDAR"] },
    "89": { "primary": "RAJIV", "aliases": [] },
    "90": { "primary": "RAGHAV", "aliases": [] },
    "91": { "primary": "YASH", "aliases": [] },
    "92": { "primary": "TEJAS", "aliases": ["MIZO"] },
    "93": { "primary": "HEMANT", "aliases": [] },
    "94": { "primary": "KUSHAL", "aliases": [] },
    "95": { "primary": "LALIT", "aliases": [] },
    "96": { "primary": "INDRA", "aliases": [] }
  },
  shortCodes: {
    p1: {
      "12": "JANA", "13": "LOKA", "71": "HITA", "72": "PARA",
      "73": "PRIYA", "74": "SIRI", "75": "KALYANA", "76": "VAIBHAVA",
      "77": "KAVYA", "78": "NIGAMA"
    },
    p3: {
      "1": "PAVITRA", "2": "RAMYA", "3": "BHAVYA", "4": "VIBHAVA",
      "5": "NIRMALA", "6": "MANGALA", "7": "UTTAMA", "8": "BRIHAT", "9": "JAYA"
    },
    p4: {
      "0": "PRADESH", "25": "VALAYA", "50": "KSHETRA", "75": "BEEDU"
    },
    p5_1: {
      "1": "PAVITRA", "2": "RAMYA", "3": "BHAVYA", "4": "VIBHAVA",
      "5": "NIRMALA", "6": "MANGALA", "7": "UTTAMA", "8": "BRIHAT", "9": "JAYA"
    },
    p5_2: {
      "0": "RAMA", "1": "SHANKARA", "2": "MADHAVA", "3": "KAVERI",
      "4": "GANGA", "5": "GODAVARI", "6": "NARMADA", "7": "SINDHU",
      "8": "YAMUNA", "9": "SARAYU"
    },
    p6: {
      "0": "VIHARA", "25": "SAGARA", "50": "NAGARA", "75": "PURA"
    }
  },
  shortCodesNumeric: {
    "8": "Ja", "9": "Ma", "10": "Ga", "11": "Go", "12": "Je", "13": "Ma",
    "14": "Va", "15": "Pu", "16": "Pa", "17": "Da", "18": "Ha", "19": "Va",
    "20": "Na", "21": "Ba", "22": "Ka", "23": "Sa", "24": "Se", "25": "Su",
    "68": "Dma", "69": "Vin", "70": "Dha", "71": "Ra", "72": "Na", "73": "Dhu",
    "74": "Ma", "75": "Ru", "76": "Na", "77": "Mo", "78": "Ri", "79": "Ka", "80": "La"
  },
  syllables380: [
    "Ba", "Be", "Bi", "Bo", "Bu", "Bou", "By", "Ben", "Bon", "Bin",
    "Da", "De", "Di", "Do", "Du", "Dou", "Dy", "Den", "Don", "Din",
    "Fa", "Fe", "Fi", "Fo", "Fu", "Fou", "Fy", "Fen", "Fon", "Fin",
    "Ga", "Ge", "Gi", "Go", "Gu", "Gou", "Gy", "Gen", "Gon", "Gin",
    "Ja", "Je", "Ji", "Jo", "Ju", "Jou", "Jy", "Jen", "Jon", "Jin",
    "Ka", "Ke", "Ki", "Ko", "Ku", "Kou", "Ky", "Ken", "Kon", "Kin",
    "SHa", "SHe", "SHi", "SHo", "SHu", "SHou", "SHy", "SHen", "SHon", "SHin",
    "THa", "THe", "THi", "THo", "THu", "THou", "THy", "THen", "THon", "THin",
    "CRu", "CRou", "CRy", "CRen", "CRon", "CRin",
    "DRa", "DRe", "DRi", "DRo", "DRu", "DRou", "DRy", "DRen", "DRon", "DRin",
    "FRa", "FRe", "FRi", "FRo", "FRu", "FRou", "FRy", "FRen", "FRon", "FRin",
    "GRa", "GRe", "GRi", "GRo", "GRu", "GRou", "GRy", "GRen", "GRon", "GRin",
    "KRa", "KRe", "KRi", "KRo", "KRu", "KRou", "KRy", "KRen", "KRon", "KRin",
    "La", "Le", "Li", "Lo", "Lu", "Lou", "Ly", "Len", "Lon", "Lin",
    "Ma", "Me", "Mi", "Mo", "Mu", "Mou", "My", "Men", "Mon", "Min",
    "Na", "Ne", "Ni", "No", "Nu", "Nou", "Ny", "Nen", "Non", "Nin",
    "Pa", "Pe", "Pi", "Po", "Pu", "Pou", "Py", "Pen", "Pon", "Pin",
    "Qa", "Qe", "Qi", "Qo", "Qu", "Qou", "Qy", "Qen", "Qon", "Qin",
    "Ra", "Re", "Ri", "Ro", "Ru", "Rou", "Ry", "Ren", "Ron", "Rin",
    "Sa", "Se", "Si", "So", "Su", "Sou", "Sy", "Sen", "Son", "Sin",
    "Ta", "Te", "Ti", "To", "Tu", "Tou", "Ty", "Ten", "Ton", "Tin",
    "Va", "Ve", "Vi", "Vo", "Vu", "Vou", "Vy", "Ven", "Von", "Vin",
    "Wa", "We", "Wi", "Wo", "Wu", "Wou", "Wy", "Wen", "Won", "Win",
    "Xa", "Xe", "Xi", "Xo", "Xu", "Xou", "Xy", "Xen", "Xon", "Xin",
    "Za", "Ze", "Zi", "Zo", "Zu", "Zou", "Zy", "Zen", "Zon", "Zin",
    "MRa", "MRe", "MRi", "MRo", "MRu", "MRou", "MRy", "MRen", "MRon", "MRin",
    "NRa", "NRe", "NRi", "NRo", "NRu", "NRou", "NRy", "NRen", "NRon", "NRin",
    "PRa", "PRe", "PRi", "PRo", "PRu", "PRou", "PRy", "PRen", "PRon", "PRin",
    "SRa", "SRe", "SRi", "SRo", "SRu", "SRou", "SRy", "SRen", "SRon", "SRin",
    "TRa", "TRe", "TRi", "TRo", "TRu", "TRou", "TRy", "TRen", "TRon", "TRin",
    "VRa", "VRe", "VRi", "VRo", "VRu", "VRou", "VRy", "VRen", "VRon", "VRin",
    "BRa", "BRe", "BRi", "BRo", "BRu", "BRou", "BRy", "BRen", "BRon", "BRin",
    "CRa", "CRe", "CRi", "CRo",
    "BHa", "BHe", "BHi", "BHo", "BHu", "BHou", "BHy", "BHen", "BHon", "BHin",
    "CHa", "CHe", "CHi", "CHo", "CHu", "CHou", "CHy", "CHen", "CHon", "CHin",
    "DHa", "DHe", "DHi", "DHo", "DHu", "DHou", "DHy", "DHen", "DHon", "DHin",
    "GHa", "GHe", "GHi", "GHo", "GHu", "GHou", "GHy", "GHen", "GHon", "GHin",
    "KHa", "KHe", "KHi", "KHo", "KHu", "KHou", "KHy", "KHen", "KHon", "KHin"
  ]
};
# VINCODE Geographic Addressing System
### Interactive Web Application & Conversion Logic Specification

## 1. Overview
**VINCODE** is a custom geographic coordinate encoding engine tailored for the Indian subcontinent (Latitude 6°N–38°N, Longitude 67°E–96°E). It converts raw decimal GPS coordinates (e.g. `12.9375°N, 77.6250°E`) into structured, human-readable Indian language mnemonics and pronounceable phonetic names.

---

## 2. Logic Behind the Conversion

The system utilizes two distinct encoding methods:

### Method A: Hierarchical Word-Based Short Codes (P1 to P6)
Every coordinate pair $(Lat, Lon)$ is decomposed into 8 positional components spanning 3 hierarchy tiers:

$$\text{Latitude} = P_1 \,.\, [P_{3-1}]\,[P_{3-2}]\,[P_4]$$
$$\text{Longitude} = P_2 \,.\, [P_{5-1}]\,[P_{5-2}]\,[P_6]$$

#### Tier 1: Macro-Region ($P_1, P_2$)
* **$P_1$ (Latitude Integer, 6–38):** Maps to state/region names (e.g., `12` $\rightarrow$ `JANA`, `13` $\rightarrow$ `LOKA`, `22` $\rightarrow$ `SURAT`).
* **$P_2$ (Longitude Integer, 67–96):** Maps to regional longitudinal names (e.g., `77` $\rightarrow$ `KAVYA`, `74` $\rightarrow$ `KAMAL`, `88` $\rightarrow$ `BODHI`).
* *Resulting Phrase 1:* `[P1] [P2]` (e.g., `JANA KAVYA`).

#### Tier 2: Latitude Sub-Grid ($P_{3-1}, P_{3-2}, P_4$)
* **$P_{3-1}$ (1st Decimal Digit of Latitude, 0–9):** Maps to descriptors (e.g., `9` $\rightarrow$ `JAYA`, `1` $\rightarrow$ `PAVITRA`).
* **$P_{3-2}$ (2nd Decimal Digit of Latitude, 0–9):** Maps to secondary descriptors (e.g., `3` $\rightarrow$ `KAVERI`, `2` $\rightarrow$ `MADHAVA`).
* **$P_4$ (3rd and 4th Decimal Digits of Latitude, rounded to quarter steps):**
  * `00` $\rightarrow$ `PRADESH`
  * `25` $\rightarrow$ `VALAYA`
  * `50` $\rightarrow$ `KSHETRA`
  * `75` $\rightarrow$ `BEEDU`
* *Resulting Phrase 2:* `[P3-1] [P3-2] [P4]` (e.g., `JAYA KAVERI BEEDU`).

#### Tier 3: Longitude Sub-Grid ($P_{5-1}, P_{5-2}, P_6$)
* **$P_{5-1}$ (1st Decimal Digit of Longitude, 0–9):** Maps to descriptors (e.g., `6` $\rightarrow$ `MANGALA`).
* **$P_{5-2}$ (2nd Decimal Digit of Longitude, 0–9):** Maps to secondary descriptors (e.g., `2` $\rightarrow$ `MADHAVA`).
* **$P_6$ (3rd and 4th Decimal Digits of Longitude, rounded to quarter steps):**
  * `00` $\rightarrow$ `VIHARA`
  * `25` $\rightarrow$ `SAGARA`
  * `50` $\rightarrow$ `NAGARA`
  * `75` $\rightarrow$ `PURA`
* *Resulting Phrase 3:* `[P5-1] [P5-2] [P6]` (e.g., `MANGALA MADHAVA NAGARA`).

#### Complete Output Assembly
$$\text{Full VINCODE} = \text{Phrase 1} + \text{Phrase 2} + \text{Phrase 3}$$
**Example:** `12.9375, 77.6250` $\rightarrow$ **`JANA KAVYA JAYA KAVERI BEEDU MANGALA MADHAVA NAGARA`**

---

### Method B: Phonetic Syllable Names
Coordinates can also be represented as a compound Sanskrit/Indian name:
1. Coordinates are combined without decimal points (e.g., `13.683281, 79.347214` $\rightarrow$ `13683281-79347214`).
2. Numeric segments map to entries in the 380-syllable grid (`Sheet6` / `Sheet8`).
3. Examples from the reference table:
   * `13.683281, 79.347214` $\rightarrow$ **`VenKaTaRaMaNa`**
   * `13.341127, 74.751975` $\rightarrow$ **`GoPaLaGoVinDa`**
   * `15.942599, 77.422280` $\rightarrow$ **`PaRaMaGuRuRaYaRu`**

---

## 3. How to Run on Desktop

1. Save `index.html`, `style.css`, `vincode_tables.js`, and `app.js` into a folder on your computer.
2. Double-click `index.html` to open it in any web browser (Chrome, Safari, Firefox, Edge).
3. **No server or installation needed** — all scripts run client-side in the browser.

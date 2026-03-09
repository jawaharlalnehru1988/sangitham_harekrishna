const axios = require('axios');

const lessonContent = `## 🎼 **Rāga Lakṣaṇa of Māyāmāḷavagauḷa**

![Image](https://www.eviolinguru.com/uploads/7/3/5/7/735729/72-mela-list_orig.jpg)
![Image](https://storage.karmagroup.com/assets/karmagroup.com/blog/2018/04/Raaga.jpg)

**Mayamalavagowla** is fundamental in Carnatic music, used to teach beginners because of its symmetrical structure and clear interval spacing.

---

### 1️⃣ Melakarta Identity
| Property | Value |
| --- | --- |
| Melakarta # | **15** |
| Chakra | **Agni (3rd)** |
| Type | **Sampoorna** |
| Mood | **Devotional / Meditative** |

### 2️⃣ Swaras Used & Swarasthānas
\`S R₁ G₃ M₁ P D₁ N₃ S\`
- S: Shadjam | R₁: Shuddha Rishabham (Flat 2nd)
- G₃: Antara Gandharam (Major 3rd) | M₁: Shuddha Madhyamam (P4)
- P: Panchamam (P5) | D₁: Shuddha Dhaivatam (Flat 6th)
- N₃: Kakali Nishadam (Major 7th)

### 3️⃣ Ārohaṇa – Avarohaṇa (Symmetrical)
**Asc:** \`S R₁ G₃ M₁ P D₁ N₃ Ṡ\` | **Des:** \`Ṡ N₃ D₁ P M₁ G₃ R₁ S\`
Identity Phrase: \`G₃ M₁ P D₁ N₃\`

---

### 4️⃣ Important Swaras
- **Jīva (Vital):** R₁, D₁ | **Nyāsa (Pause):** R₁, P
- **Graha (Start):** S | **Amsa (Central):** G₃

### 5️⃣ Characteristic Prayogas
Typical phrases:
\`S R₁ G₃ M₁\` | \`G₃ M₁ P\` | \`P D₁ N₃ Ṡ\` | \`Ṡ N₃ D₁ P\` | \`M₁ G₃ R₁ S\`

---

### 6️⃣ Gamaka Usage
Relies heavily on **kampita gamaka** (oscillations).
- **R₁, D₁:** Broad oscillation between S-R1 and P-D1.
- **G₃:** Nokku (push) from R₁.
- **N₃:** Slight slide (Jaru) to high S.

### 7️⃣ Rāga Bhāva & Mood
Conveys **Shanta** (peace) and **Bhakti** (devotion). Ideal for morning practice (Ushas-kala).

---

### 8️⃣ Famous Compositions
- **Tyagaraja:** *Tulasi Dalamulache*, *Meru Samana*, *Vidulaku Mrokkeda*
- **Dikshitar:** *Sri Nathadi Guruguho*, *Mayatita Swaroopini*
- **Swati Tirunal:** *Deva Deva Kalayami*
- **Papanasam Sivan:** *Nan Oru Vilayattu Bommai*

---

### 9️⃣ Why for Beginners?
Systematized by **Sri Purandara Dasa**:
1. **Clear Semi-tones:** S-R1 and P-D1 spacing helps pitch recognition.
2. **Symmetry:** Identical intervals in ascent/descent help internalize distances.
3. **Training:** Introduces 'Kampita' gamaka early on.
Path: Sarali Varisai → Jantai Varisai → Alankaram.

---

✅ **Quick Reference Summary**
\`\`\`
Melakarta: 15
Swaras: S R1 G3 M1 P D1 N3 S
Aro/Ava: S R1 G3 M1 P D1 N3 S / S N3 D1 P M1 G3 R1 S
Key gamaka: Kampita on R1 and D1. Mood: Peaceful.
\`\`\``;

const payload = {
    division: "Ragalakshana",
    topic: "Mayamalavagaulai",
    lesson: lessonContent
};

axios.post('https://api.askharekrishna.com/api/v1/carnatic-syllabus/', payload)
    .then(response => {
        console.log('Success:', response.status);
        console.log('Data ID:', response.data.id);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.status : error.message);
        if (error.response) console.error(JSON.stringify(error.response.data, null, 2));
    });

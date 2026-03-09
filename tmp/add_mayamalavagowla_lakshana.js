const axios = require('axios');

const lessonContent = `## 🎼 **Rāga Lakṣaṇa of Māyāmāḷavagauḷa**

![Image](https://www.eviolinguru.com/uploads/7/3/5/7/735729/72-mela-list_orig.jpg)
![Image](https://static.wixstatic.com/media/c183f5_636cc70aecd84db7914b3bc79900ea74~mv2.jpg/v1/crop/x_209%2Cy_0%2Cw_1069%2Ch_1109/fill/w_320%2Ch_361%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/carnatic%20vocal%20classes%20sahakar%20nagar.jpg)

**Mayamalavagowla** is fundamental in Carnatic music, used to teach beginners due to its symmetrical structure and clear interval spacing.

---

### 1️⃣ Melakarta Identity & Swaras
- **Melakarta #:** 15 | **Chakra:** Agni (3rd)
- **Type:** Sampoorna | **Swarasthānas:**
  - S: Shadjam | R₁: Shuddha Rishabham
  - G₃: Antara Gandharam | M₁: Shuddha Madhyamam
  - P: Panchamam | D₁: Shuddha Dhaivatam
  - N₃: Kakali Nishadam

### 2️⃣ Ārohaṇa – Avarohaṇa
**Asc:** \`S R₁ G₃ M₁ P D₁ N₃ Ṡ\` | **Des:** \`Ṡ N₃ D₁ P M₁ G₃ R₁ S\`
The structure is **perfectly symmetrical**, ideal for beginner training.

---

### 3️⃣ Important Swaras & Prayogas
- **Jīva:** R₁, D₁ | **Nyāsa:** R₁, P | **Graha:** S | **Amsa:** G₃
**Characteristic Phrases:**
\`\`\`
S R₁ G₃ M₁ | G₃ M₁ P | P D₁ N₃ Ṡ | Ṡ N₃ D₁ P | M₁ G₃ R₁ S
\`\`\`
**Identity Phrase:** \`G₃ M₁ P D₁ N₃\`

---

### 4️⃣ Gamaka & Bhāva
Relies heavily on **kampita gamaka** (oscillations).
- R₁, D₁: Kampita
- G₃: Nokku from R₁ | N₃: Slight slide to S
**Mood:** Devotion, Seriousness, Meditative, Spiritual gravity.

### 5️⃣ Famous Compositions
- **Tyagaraja:** Meru Samana, Tulasi Dalamulache
- **Dikshitar:** Sri Nathadi Guruguho
- **Swati Tirunal:** Deva Deva Kalayami

---

### 6️⃣ Why for Beginners?
1. Clear swara spacing (Semi-tones)
2. Symmetrical structure
3. Strong gamaka base
4. Easy pitch recognition
Starting path: Sarali Varisai → Jantai Varisai → Alankaram.

---

✅ **Short Lakṣaṇa Summary**
\`\`\`
Melakarta: 15
Aro: S R1 G3 M1 P D1 N3 S
Ava: S N3 D1 P M1 G3 R1 S
Mood: Devotional
\`\`\``;

const payload = {
    division: "beginner pedagogy of Carnatic music",
    topic: "Mayamalavagaulai - Ragalakshana",
    lesson: lessonContent
};

axios.post('https://api.askharekrishna.com/api/v1/carnatic-syllabus/', payload)
    .then(response => {
        console.log('Success:', response.status);
        console.log('Data ID:', response.data.id);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.status : error.message);
        if (error.response) console.error(JSON.stringify(error.response.data));
    });

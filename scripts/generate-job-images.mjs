import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not set");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const OUTPUT_DIR = path.resolve("public/images/jobs");

const STYLE_PREFIX =
  "Cute fantasy creature mascot design in pixel art style. Chibi proportions, adorable and charming with big expressive eyes. NOT a literal animal — a fantasy being inspired by an animal. Simple iconic silhouette that works as an avatar. Dark navy (#0a0e1a) background with subtle gold accent lighting. Square 1:1 aspect ratio, centered, full body, facing forward. Clean pixel art edges.";

const JOBS = [
  // ========================================
  // ベーシック（9）- Simple, small, cute creatures
  // ========================================
  {
    id: "ai-apprentice",
    prompt: `${STYLE_PREFIX} A small owl-like fantasy creature named "Holon" with digital circuit patterns etched into its soft feathers. Tiny floating holographic runes orbit around it. Wearing an adorably oversized wizard hat tilted to one side. Big round curious eyes glowing faintly blue. Small and compact body, puffy and round. Beginner adventurer vibe.`,
  },
  {
    id: "code-blacksmith",
    prompt: `${STYLE_PREFIX} A beaver-like fantasy creature named "Tekka" with metallic silver-bronze fur that shimmers. Holding a tiny glowing hammer in one paw, sparks of colorful code symbols flying from each strike. Sturdy and round body. Determined expression with a little grin. Wearing a tiny blacksmith's apron. Small anvil nearby.`,
  },
  {
    id: "messenger-peddler",
    prompt: `${STYLE_PREFIX} A parrot-like fantasy creature named "Perol" with rainbow-tinted iridescent feathers that shift colors. Carrying a small leather messenger bag slung across its body, golden glowing letters and envelopes floating out of the bag. Cheerful wide smile. Small wings spread slightly. Energetic and friendly pose.`,
  },
  {
    id: "market-scout",
    prompt: `${STYLE_PREFIX} A meerkat-like fantasy creature named "Miruka" standing upright on hind legs in a vigilant scout pose. Wearing tiny brass goggles pushed up on its forehead. Holding a small rolled-up treasure map with glowing X marks. Alert big eyes scanning the horizon. Sandy-gold fur with darker markings. Adventurous and curious vibe.`,
  },
  {
    id: "fledgling-adventurer",
    prompt: `${STYLE_PREFIX} A puppy-like fantasy creature named "Pochiru" with comically oversized paws and big floppy ears. Wearing a tiny red adventurer's cape that's slightly too big. Looking upward with enormous sparkling eyes full of wonder and excitement. Soft fluffy body, warm golden-brown coloring. Pure beginner energy, brave but small.`,
  },
  {
    id: "ai-tinker",
    prompt: `${STYLE_PREFIX} An otter-like fantasy creature named "Rakkon" with sleek fur and mechanical brass goggles on its head. Playfully juggling three small glowing items — a gear, an AI orb, and a wrench — in the air. Mischievous happy expression. Dexterous little paws. Tinkerer's belt with tiny tools. Inventive and playful personality.`,
  },
  {
    id: "voice-trader",
    prompt: `${STYLE_PREFIX} A fox-like fantasy creature named "Konta" with a magnificently fluffy tail. Wearing a cozy merchant's scarf wrapped around its neck. Golden coins and small jewels floating in a gentle orbit around it. Sly but friendly smile with half-closed confident eyes. Warm orange-gold fur. Clever trader aesthetic.`,
  },
  {
    id: "prompt-squire",
    prompt: `${STYLE_PREFIX} A gecko-like fantasy creature named "Petari" with color-changing skin that displays scrolling text patterns and prompt symbols. Perched on a small floating magical keyboard. Sticky-padded feet gripping the keys. Bright attentive eyes with vertical pupils. Small and agile body. Digital text fragments floating nearby.`,
  },
  {
    id: "trend-herbalist",
    prompt: `${STYLE_PREFIX} A bunny-like fantasy creature named "Mimiru" with long antenna-like ears that glow at the tips with shifting colors. Holding tiny potion bottles in each paw — the bottles contain swirling social media icons (hearts, stars, arrows). Soft white-lavender fur. Gentle but knowing expression. Mystical herbalist pouch at its side.`,
  },

  // ========================================
  // スタンダード（12）- Medium size, more detailed, with accessories
  // ========================================
  {
    id: "tech-commander",
    prompt: `${STYLE_PREFIX} A dolphin-like fantasy creature named "Dolphin" with sleek tech armor plating in silver and blue. Floating gracefully in mid-air as if swimming through data streams. A holographic tactical display projected from a gem on its forehead. Confident commanding eyes. Medium-sized body with streamlined form. Leadership aura with subtle glow.`,
  },
  {
    id: "mentor-hermit",
    prompt: `${STYLE_PREFIX} A giant tortoise-like fantasy creature named "Gameron" with a mossy shell covered in softly glowing ancient rune carvings. Wise gentle eyes behind small round spectacles. Calm and patient expression. Slightly larger body with a sturdy shell. Small mushrooms and tiny plants growing on the shell. Warm golden glow from the rune patterns. Sage-like presence.`,
  },
  {
    id: "brand-strategist",
    prompt: `${STYLE_PREFIX} A peacock-like fantasy creature named "Kujaro" with magnificent tail feathers that look like miniature glowing screens displaying tiny graphs, charts, and brand logos. Proud but approachable posture. Vibrant jewel-toned plumage in teals and golds. Sharp intelligent eyes. Medium-sized with impressive fan-shaped tail display. Strategic elegance.`,
  },
  {
    id: "trade-negotiator",
    prompt: `${STYLE_PREFIX} A wolf-like fantasy creature named "Gald" wearing a sharp fitted vest with golden buttons. One paw extended forward as if offering a handshake. Confident smirk with sharp but friendly eyes. Silver-gray fur with darker accents. Medium-build, standing upright. Professional but approachable demeanor. Deal-maker energy.`,
  },
  {
    id: "ai-tactician",
    prompt: `${STYLE_PREFIX} A crow-like fantasy creature named "Crowl" with sleek metallic black feathers that shimmer with deep blue-purple iridescence. Three eyes — the third eye on the forehead is a glowing digital eye. A small floating chess piece (knight) hovering beside it. Calculating and intelligent expression. Medium-sized with folded wings. Strategic and mysterious aura.`,
  },
  {
    id: "soul-counselor",
    prompt: `${STYLE_PREFIX} A cat-like fantasy creature named "Nyalm" with incredibly soft-looking fluffy fur in gentle lavender-gray. Large empathetic warm eyes that seem to understand everything. Tiny floating heart-shaped healing particles and gentle sparkles drifting around it. Sitting in a calm composed pose. Comforting warm glow. Medium-sized with a fluffy tail curled around its paws.`,
  },
  {
    id: "growth-commander",
    prompt: `${STYLE_PREFIX} A falcon-like fantasy creature named "Falcon" in a dynamic slightly-angled flight pose with wings spread. Wearing tiny golden general's epaulettes on its shoulders. A glowing growth chart line trailing behind it like a contrail. Sharp determined eyes. Sleek aerodynamic body in warm brown and gold tones. Medium-sized. Commanding upward momentum energy.`,
  },
  {
    id: "product-crafter",
    prompt: `${STYLE_PREFIX} A chameleon-like fantasy creature named "Kamelio" with patchwork skin made of different materials — sections of wood grain, brushed metal, soft fabric, and crystal. Holding a tiny glowing sewing needle in one hand. One eye looking at its work, the other looking at the viewer. Curled tail. Medium-sized creative artisan body. Maker and crafter aesthetic.`,
  },
  {
    id: "data-alchemist",
    prompt: `${STYLE_PREFIX} An octopus-like fantasy creature named "Oktan" with eight tentacles, each holding a different tool — a bubbling flask, a tiny chart, a glowing crystal, a data scroll, a magnifying glass, a quill, a beaker, a compass. Wearing a small alchemist's hat. Wise but playful expression with large round eyes. Medium-sized body. Mystical data laboratory vibe.`,
  },
  {
    id: "automation-artisan",
    prompt: `${STYLE_PREFIX} An ant-like fantasy creature named "Antol" with a sleek mechanical exoskeleton in bronze and steel. Surrounded by tiny automated conveyor belts, miniature gears, and small assembly mechanisms all working in harmony. Industrious focused expression. Six small limbs each doing a different task. Medium-sized. Efficient and precise automation aesthetic.`,
  },
  {
    id: "content-enchanter",
    prompt: `${STYLE_PREFIX} A spider-like fantasy creature named "Spina" — designed to be cute and charming, NOT scary. Round fluffy body with big adorable eyes. Spinning an intricate web made of glowing content icons — tiny video play buttons, text documents, image frames, and music notes connected by golden silk threads. Medium-sized. Creative web-weaver aesthetic.`,
  },
  {
    id: "viral-engineer",
    prompt: `${STYLE_PREFIX} A bee-like fantasy creature named "Beenal" with hexagonal honeycomb-patterned wings that look like circuit boards with tiny glowing traces. Carrying golden data pollen in a small basket. Wearing tiny engineer's safety goggles. Buzzing with energy. Striped body in warm gold and dark brown. Medium-sized. Industrious viral spread aesthetic.`,
  },

  // ========================================
  // エキスパート（8）- Larger, more majestic, mythical elements
  // ========================================
  {
    id: "war-council",
    prompt: `${STYLE_PREFIX} An eastern dragon fantasy creature named "Ryujin" — small but undeniably majestic. Coiled elegantly with ancient strategy scrolls unfurling around it. Surrounded by a three-colored aura: communication blue on the left, tech orange above, and marketing green on the right. Wise powerful eyes with golden slit pupils. Serpentine body with fine scales. Expert-tier mythical grandeur.`,
  },
  {
    id: "people-maestro",
    prompt: `${STYLE_PREFIX} A qilin-like fantasy creature named "Kirino" with gentle compassionate eyes and a serene smile. Musical notes and harmonious golden sound waves emanating from a single elegant horn on its forehead. Flowing mane like silk ribbons. Hooved feet with small golden accents. Graceful and noble posture. Slightly larger body. Mythical harmony conductor aesthetic.`,
  },
  {
    id: "iron-maestro",
    prompt: `${STYLE_PREFIX} A phoenix-like fantasy creature named "Phenion" with magnificent tech-circuit patterned feathers that glow in alternating blue and gold. Holding a tiny conductor's baton in one wing tip. Spread wings revealing intricate glowing circuit traces. Fierce but elegant eyes. Slightly larger body with dramatic wing span. Mythical tech-conductor fusion aesthetic.`,
  },
  {
    id: "digital-shaman",
    prompt: `${STYLE_PREFIX} A nine-tailed fox fantasy creature named "Kyubi" with nine flowing tails, each tail tip glowing a different digital color — red, blue, green, yellow, cyan, magenta, orange, purple, and white. Wearing mystical prayer beads around the neck. Ancient yet digital aesthetic. Wise mystical eyes. Larger elegant body. Shamanic digital divinity.`,
  },
  {
    id: "growth-oracle",
    prompt: `${STYLE_PREFIX} A unicorn-like fantasy creature named "Uniol" with a crystalline horn that projects small holographic visions of future possibilities — tiny floating charts, upward arrows, and stars. Starry cosmic mane that flows like a nebula. Ethereal glowing body in white and soft gold. Larger graceful form. Prophetic and majestic. Oracle of growth aesthetic.`,
  },
  {
    id: "phantom-merchant",
    prompt: `${STYLE_PREFIX} A three-legged crow fantasy creature named "Yatarou" (Yatagarasu inspired) shrouded in swirling golden mist. Coins, gems, and miniature trade goods orbiting around it in a slow magical rotation. Three legs firmly planted. Dark feathers with golden edge highlights. Mysterious glowing eyes. Larger body with powerful presence. Phantom trade master aesthetic.`,
  },
  {
    id: "silent-general",
    prompt: `${STYLE_PREFIX} A white tiger fantasy creature named "Byakko" with pristine white fur and striking dark stripes. No armor at all — instead emanating a powerful aura of absolute calm competence as a soft white-gold glow. Piercing serene ice-blue eyes. Sitting in a composed regal pose. Larger powerful body. The quiet authority needs no decoration. Silent commanding presence.`,
  },
  {
    id: "one-man-army",
    prompt: `${STYLE_PREFIX} A griffin-like fantasy creature named "Grion" with a noble eagle head and a strong lion body. Sitting confidently with multiple tools arranged neatly at the ready — a sword, a book, a wrench, a wand, and a shield, all within easy reach. Golden feathered mane. Larger imposing but approachable body. Self-sufficient one-creature-army aesthetic.`,
  },

  // ========================================
  // レジェンド（3）- Grand, mythical, glowing, impressive
  // ========================================
  {
    id: "sovereign-hero",
    prompt: `${STYLE_PREFIX} A winged dragon fantasy creature named "Ouryuu" (応龍 style) — the most majestic of all. Grand spread wings with golden scales. Four distinct colored energy streams swirling around it: blue (communication), orange (tech), green (marketing), and purple (management) representing four power axes. Wearing a small but magnificent golden crown. Radiating legendary power. Eyes blazing with golden light. The largest creature, grand and awe-inspiring.`,
  },
  {
    id: "void-master",
    prompt: `${STYLE_PREFIX} A turtle-snake fusion fantasy creature named "Genbuu" (玄武 inspired) — a cosmic tortoise with a serpentine tail that coils with its own awareness. Serene and impossibly calm. Surrounded by a void of stars and galaxies as if carrying a pocket universe on its shell. A concentrated energy beam of pure white light from its core. Deep wise ancient eyes. Grand legendary cosmic presence.`,
  },
  {
    id: "era-architect",
    prompt: `${STYLE_PREFIX} A vermilion bird fantasy creature named "Suzakul" (朱雀 inspired) with magnificent spread wings that contain intricate architectural blueprint patterns — floor plans, building designs, and structural diagrams visible within the feathers. Actively constructing something grand from beams of golden light with its talons. Blazing red-gold plumage. Eyes burning with creative vision. Grand legendary world-builder aesthetic.`,
  },
];

async function generateImage(job) {
  const outputPath = path.join(OUTPUT_DIR, `${job.id}.png`);

  if (fs.existsSync(outputPath)) {
    console.log(`[SKIP] ${job.id} - already exists`);
    return;
  }

  console.log(`[GEN] ${job.id} - generating...`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-image-preview",
      contents: job.prompt,
      config: {
        responseModalities: ["TEXT", "IMAGE"],
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      console.error(`[FAIL] ${job.id} - no response parts`);
      return;
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outputPath, buffer);
        console.log(`[OK] ${job.id} - saved to ${outputPath}`);
        return;
      }
    }

    console.error(`[FAIL] ${job.id} - no image in response`);
  } catch (err) {
    console.error(`[ERR] ${job.id} - ${err.message}`);
  }
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Total jobs: ${JOBS.length}`);
  console.log("---");

  // Process sequentially to respect rate limits
  for (let i = 0; i < JOBS.length; i++) {
    const job = JOBS[i];
    console.log(`[${i + 1}/${JOBS.length}] Processing ${job.id}...`);
    await generateImage(job);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone! Check public/images/jobs/");
}

main();

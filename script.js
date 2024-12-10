let timeRemaining = 300;
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose one of 8 suspects
let currentClueIndex = 0;

const backstory = `
  Mr. Abel, a reclusive billionaire known for his ruthless business practices, 
  was found dead in his locked study during a stormy night. Eight individuals, all of whom 
  had a connection to him, were present in the mansion when the murder occurred. The 
  study was locked from the inside, and a rare and lethal poison was determined to be the cause. 

  The suspects include former employees, business rivals, and acquaintances—each with a possible 
  motive to commit the crime. The storm knocked out the power, and chaos ensued. Footprints, 
  smudges, and misplaced items hint at a scuffle, but nothing is conclusive. The mansion's 
  secrets are yours to uncover. Pay attention to the details—only one person could have carried 
  out such a cunning plan.
`;
document.getElementById("story").textContent = backstory;

const suspects = [
  {
    name: "Connor",
    backstory: "A former accountant dismissed after exposing the victim's shady financial practices. Known for his meticulous nature and inability to forgive betrayal.",
    clues: [
      "The scent of cologne, matching a brand known for its exclusivity, lingered in the room.",
      "A torn piece of fabric matching a tailored jacket, was found snagged on the study door.",
      "Fingerprints on the poison vial were consistent with someone who had recently handled financial records.",
      "A ledger containing discrepancies tied to the victim's finances was found open on the desk."
    ]
  },
  {
    name: "Jen",
    backstory: "The victim's ex-spouse, involved in a bitter divorce. Known for her refined taste, icy demeanor, and extensive legal battles.",
    clues: [
      "The faint aroma of jasmine, from a perfume, was detected in the study.",
      "A scratch on the study's desk aligned with a ring featuring an intricate design, worn earlier in the evening.",
      "A silk scarf, commonly worn during formal outings, was found near the broken lock.",
      "A threatening note in elegant handwriting, matching legal documents, was found crumpled on the floor."
    ]
  },
  {
    name: "Gabe",
    backstory: "A business rival who lost a high-stakes contract to the victim. Known for his cunning and aggressive tactics in business.",
    clues: [
      "Mud traces from a rare hiking boot, designed for rugged terrain, were near the study's entrance.",
      "A glass shard from the study window matched an expensive watch.",
      "A rare contract, signed and annotated with red ink, was found on the victim's desk.",
      "A pen with a distinctive company logo, often used by high-ranking executives, was left uncapped on the victim's chair."
    ]
  },
  {
    name: "Jassmine",
    backstory: "An investor who accused the victim of embezzling her life savings. Known for her sharp intellect and relentless pursuit of justice.",
    clues: [
      "Footprints from a designer boot, were identified near the scene.",
      "The study door’s lock showed signs of tampering with a tool commonly found in legal offices.",
      "A torn page from a financial ledger, matching a specific portfolio she once managed, was found in the victim's briefcase.",
      "A faint ink smudge consistent with documents detailing fraudulent transactions was found on the victim’s hand."
    ]
  },
  {
    name: "Cameron",
    backstory: "A dismissed chauffeur with an axe to grind. Known for his knowledge of the mansion’s layout and past confrontations with the victim.",
    clues: [
      "A scuff mark from a worn leather boot, consistent with a uniform, was near the broken window.",
      "A faint whiff of oil, was detected on the victim's desk.",
      "Grease stains were on the handle of the study's door.",
      "A keyring with an emblem from a classic car brand, which he often drove, was found under the study desk."
    ]
  },
  {
    name: "Alexses",
    backstory: "A personal assistant pushed to her limits by the victim's demanding nature. Known for her organizational skills and rising frustration.",
    clues: [
      "A faint cosmetic smudge was discovered on the study’s entry.",
      "A pen with distinctive markings from a luxury office supply store was found next to the poison vial.",
      "Traces of a rare ink, used exclusively for confidential notes, were smudged on the study desk.",
      "A handwritten resignation letter, crumpled and discarded, was found in the trash can."
    ]
  },
  {
    name: "Q",
    backstory: "A chef with a hidden past, employed by the victim under unusual circumstances. Known for his meticulous nature and access to the kitchen.",
    clues: [
      "A napkin with a distinctive logo was found near the broken lock.",
      "A knife, with a slight residue of the poison, was found tucked behind the study curtain.",
      "The faint scent of the evening’s meal, lingered on the study desk.",
      "Traces of a rare seasoning, used in only one dish that evening, were on the victim’s sleeve."
    ]
  },
  {
    name: "Gabrielle",
    backstory: "A neighbor resentful of the victim’s wealth and the destruction of shared property. Known for her environmental activism and sharp tongue.",
    clues: [
      "A personal item often used in outdoor activities was left near the back entrance.",
      "Traces of dirt, were left near the fireplace.",
      "Pollen from a rare flower was found on the study’s windowsill.",
      "A gardening tool, with soil matching the mansion’s flower beds, was discovered under the study table.",
    ]
  }
];

const suspectsList = document.getElementById("suspects-list");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const hintText = document.getElementById("hint-text");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const mainMenu = document.getElementById("game-container");
const suspectsPage = document.getElementById("suspects-page");
const suspectsButton = document.getElementById("suspects-button");
const backButton = document.getElementById("back-button");
const hintButton = document.getElementById("hint-button");

suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false);
  }
}, 1000);

suspectsButton.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  suspectsPage.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
  suspectsPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

hintButton.addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    hintText.textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    scoreDisplay.textContent = score;
  } else {
    hintText.textContent = "No more hints available!";
  }
});

document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      scoreDisplay.textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

function endGame(won) {
  clearInterval(timer);
  mainMenu.classList.add("hidden");
  suspectsPage.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const suspect = suspects[correctSuspect];
  
  // Update the end message with the final score
  endMessage.innerHTML = won
    ? `Congratulations! You solved the mystery! The culprit was ${suspect.name}. <br> Final Score: ${score}`
    : `Time's up! The culprit was ${suspect.name}. <br> Final Score: ${score}`;
  
  // Optionally, show the culprit's picture on the end screen
  const culpritImage = document.createElement("img");
  culpritImage.src = `images/${suspect.name.toLowerCase().replace(" ", "_")}.jpg`;  // Assuming image names follow the same convention
  culpritImage.alt = `${suspect.name}`;
  document.getElementById("culprit-image").appendChild(culpritImage);
}


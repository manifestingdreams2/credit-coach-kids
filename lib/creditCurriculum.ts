export type MCQuestion = {
  kind: "mcq";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ScenarioChoice = {
  text: string;
  outcome: string;
  correct: boolean;
};

export type ScenarioQuestion = {
  kind: "scenario";
  prompt: string;
  choices: ScenarioChoice[];
};

export type Question = MCQuestion | ScenarioQuestion;

export type Lesson = {
  id: string;
  title: string;
  description: string;
  concept: string;
  questions: Question[];
  closingTip: string;
};

export type Level = {
  id: string;
  number: number;
  title: string;
  description: string;
  unlockScore: number;
  lessons: Lesson[];
};

export type ScoreBand = {
  label: string;
  color: string;
  min: number;
  max: number;
};

export const SCORE_BANDS: ScoreBand[] = [
  { label: "Poor", color: "#ef4444", min: 300, max: 579 },
  { label: "Fair", color: "#f97316", min: 580, max: 669 },
  { label: "Good", color: "#eab308", min: 670, max: 739 },
  { label: "Very Good", color: "#22c55e", min: 740, max: 799 },
  { label: "Excellent", color: "#10b981", min: 800, max: 850 },
];

export function getScoreBand(score: number): ScoreBand {
  if (score < 300) return SCORE_BANDS[0];
  if (score > 850) return SCORE_BANDS[SCORE_BANDS.length - 1];
  for (const band of SCORE_BANDS) {
    if (score >= band.min && score <= band.max) return band;
  }
  return SCORE_BANDS[0];
}

export const curriculum: Level[] = [
  {
    id: "level1",
    number: 1,
    title: "The Basics",
    description: "What credit is, why it exists, and the number behind it.",
    unlockScore: 0,
    lessons: [
      {
        id: "lesson-1-1",
        title: "What Is Credit?",
        description: "Borrowing, trust, and paying back.",
        concept:
          "Credit means borrowing money or something valuable and promising to pay it back later. When a bank, store, or person lets you borrow, they trust that you'll return it — usually with a little extra to thank them for waiting. That extra is called interest. Credit is built on trust: keep your promises, and people will keep trusting you.",
        questions: [
          {
            kind: "mcq",
            prompt: "What is credit, in simple terms?",
            options: [
              "Free money from a bank",
              "Money or things you borrow and promise to pay back",
              "Coins you save in a piggy bank",
              "A game you play at school",
            ],
            correctIndex: 1,
            explanation:
              "Credit is a promise. You borrow something now and pay it back later, usually with a small fee called interest.",
          },
          {
            kind: "scenario",
            prompt:
              "Your cousin lends you $20 for a video game. You pay her back the next week. What happens to your 'credit' with her?",
            choices: [
              {
                text: "She'll probably trust you with more next time.",
                outcome:
                  "Good call — you proved you keep your word. She'll likely lend again, maybe even more.",
                correct: true,
              },
              {
                text: "She'll probably never lend to you again.",
                outcome:
                  "Not true — paying on time actually builds trust, it doesn't break it.",
                correct: false,
              },
              {
                text: "She won't notice or care.",
                outcome:
                  "People remember when you pay back. It matters more than you think.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "What is 'interest'?",
            options: [
              "A fee the lender charges for letting you borrow",
              "A bonus the borrower gets",
              "Free money for paying late",
              "The name of a bank",
            ],
            correctIndex: 0,
            explanation:
              "Interest is like a thank-you payment to the lender for the time they waited to be paid back.",
          },
        ],
        closingTip:
          "Credit = a promise. Keep your promises, and doors open. Break them, and they close.",
      },
      {
        id: "lesson-1-2",
        title: "Why Credit Matters",
        description: "How credit shapes real life.",
        concept:
          "You might not need credit today, but in a few years it decides big things — whether you can rent an apartment, buy a car, get a cell plan, or land certain jobs. Landlords, lenders, and employers check your credit score to see if you're reliable. Good credit means more freedom and lower prices. Bad credit means stuck options and paying extra for everything.",
        questions: [
          {
            kind: "mcq",
            prompt: "Which of these usually checks your credit?",
            options: [
              "A landlord renting you an apartment",
              "Your best friend",
              "A cashier at the grocery store",
              "Your math teacher",
            ],
            correctIndex: 0,
            explanation:
              "Landlords, car dealers, cell-phone companies, and many employers peek at credit before they say yes.",
          },
          {
            kind: "scenario",
            prompt:
              "Two people apply for the same apartment. Both have jobs. One has great credit, the other has none. Who gets the apartment?",
            choices: [
              {
                text: "The one with great credit — landlords trust proven payers.",
                outcome:
                  "Right. Credit history is a landlord's clearest clue about whether the rent will show up each month.",
                correct: true,
              },
              {
                text: "The one with no credit — landlords like fresh tenants.",
                outcome:
                  "Actually, no credit feels risky to landlords because they can't tell if you'll pay.",
                correct: false,
              },
              {
                text: "Doesn't matter — it's random.",
                outcome:
                  "Rarely random. Landlords use credit scores and history to decide.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "Why does good credit save you money?",
            options: [
              "Because taxes go down",
              "Because lenders offer lower interest rates to trusted borrowers",
              "Because stores give free pizza",
              "It doesn't save money",
            ],
            correctIndex: 1,
            explanation:
              "Good credit = lower interest. Over the years, that can save thousands on car loans, credit cards, and mortgages.",
          },
        ],
        closingTip:
          "Credit isn't just a number — it's doors opening or closing throughout your life.",
      },
      {
        id: "lesson-1-3",
        title: "Meet Your Credit Score",
        description: "The 300–850 number everyone cares about.",
        concept:
          "Your credit score is a number between 300 and 850 that shows how trustworthy you are with borrowed money. Higher is better. Under 580 is poor, 580–669 is fair, 670–739 is good, 740–799 is very good, and 800+ is excellent. The score mixes several things: paying on time, how much you owe, and how long you've had credit. In this game you start at 500 — just like a real beginner building from scratch.",
        questions: [
          {
            kind: "mcq",
            prompt: "What's the highest credit score you can have?",
            options: ["100", "500", "850", "1,000"],
            correctIndex: 2,
            explanation:
              "Scores top out at 850. Very few people hit it, but 740+ already counts as 'very good.'",
          },
          {
            kind: "mcq",
            prompt: "Which range is considered 'Good'?",
            options: ["300–500", "500–579", "670–739", "800–850"],
            correctIndex: 2,
            explanation:
              "670–739 is 'Good.' 740–799 is 'Very Good.' 800+ is 'Excellent.'",
          },
          {
            kind: "scenario",
            prompt:
              "You just turned 18 with no credit history. What's your starting point?",
            choices: [
              {
                text: "Most new adults start around 500 — you've got to build up.",
                outcome:
                  "Right. No history means lenders have nothing to judge yet. Time plus good habits raise the score.",
                correct: true,
              },
              {
                text: "You start at 850 until you mess up.",
                outcome:
                  "Nope — you have to earn trust, not lose it. Everyone starts low.",
                correct: false,
              },
              {
                text: "You don't have a score until you're 30.",
                outcome:
                  "You can build credit at 18, and even younger as an authorized user on a parent's card.",
                correct: false,
              },
            ],
          },
        ],
        closingTip:
          "The score is a scoreboard for trust. Play smart, and it climbs.",
      },
    ],
  },
  {
    id: "level2",
    number: 2,
    title: "Building It Up",
    description: "How you actually earn credit, step by step.",
    unlockScore: 550,
    lessons: [
      {
        id: "lesson-2-1",
        title: "What's a Credit Card?",
        description: "A powerful tool — if you handle it right.",
        concept:
          "A credit card lets you pay with money you don't have yet — the bank covers you now, and you pay them back later. Every month you get a bill. Pay it in full and no interest. Pay only part and the bank charges interest on the rest, often 20% or more. A credit card is a tool: useful if you handle it well, dangerous if you don't. It is not the bank's money; it is a short-term loan.",
        questions: [
          {
            kind: "mcq",
            prompt: "A credit card is…",
            options: [
              "Money the bank gives you for free",
              "A loan you repay, usually each month",
              "The same as a debit card",
              "A gift card from a store",
            ],
            correctIndex: 1,
            explanation:
              "It's a short-term loan. The bank pays, you repay. Debit cards use your own money; credit cards use the bank's.",
          },
          {
            kind: "scenario",
            prompt:
              "You buy $80 of video games on a credit card. The bill comes due. What's the smart move?",
            choices: [
              {
                text: "Pay the full $80 before the due date.",
                outcome:
                  "Smart — no interest, no stress. You used credit exactly right.",
                correct: true,
              },
              {
                text: "Pay $10 and let the rest 'roll over.'",
                outcome:
                  "Now the bank charges interest on $70 every month. Slowly, $80 could turn into $120+.",
                correct: false,
              },
              {
                text: "Ignore the bill — they'll forget.",
                outcome:
                  "They never forget. Late fees, interest, and a wrecked credit score — all for skipping one bill.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "If you don't pay the full bill, what does the bank charge?",
            options: [
              "Nothing — it's free money",
              "Interest on the leftover amount",
              "A flat $1 fee",
              "Rewards points",
            ],
            correctIndex: 1,
            explanation:
              "Unpaid balance means interest piles up every month, and credit card interest rates are usually very high.",
          },
        ],
        closingTip:
          "Use a credit card like a debit card — only spend what you can pay off this month.",
      },
      {
        id: "lesson-2-2",
        title: "Payment History — The #1 Factor",
        description: "On-time beats almost every trick.",
        concept:
          "Payment history is the single biggest piece of your credit score — about 35% of it. That means paying bills on time, every time, matters more than any other trick. One late payment can drop your score 50 points or more and stay on your record for up to 7 years. Set up autopay or phone reminders. The easiest path to great credit is boring: pay on time, always.",
        questions: [
          {
            kind: "mcq",
            prompt: "What's the #1 thing that affects your credit score?",
            options: [
              "How many credit cards you own",
              "Paying bills on time",
              "How often you check your score",
              "How many stores you shop at",
            ],
            correctIndex: 1,
            explanation:
              "Payment history is about 35% of your score — more than anything else combined.",
          },
          {
            kind: "scenario",
            prompt:
              "Your phone bill is due today. You're busy and think, 'I'll pay it next week.' What should you do?",
            choices: [
              {
                text: "Pay on time — one late payment can drop your score 50+ points.",
                outcome:
                  "Dodged a huge hit. Autopay would handle this automatically so it can never slip again.",
                correct: true,
              },
              {
                text: "Skip it — phone bills don't count.",
                outcome:
                  "They absolutely count. Missed phone bills can land in collections and trash your score.",
                correct: false,
              },
              {
                text: "Pay it two weeks late — close enough.",
                outcome:
                  "Anything 30+ days late gets reported. Score takes a major hit.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "How can you make on-time payments easy?",
            options: [
              "Turn on autopay or set a reminder",
              "Hope for the best",
              "Pay only when the lender calls",
              "Write it on a sticky note and lose it",
            ],
            correctIndex: 0,
            explanation:
              "Autopay is your credit's best friend. Set it once, and never miss a payment again.",
          },
        ],
        closingTip: "Boring wins. On-time, every time = great credit.",
      },
      {
        id: "lesson-2-3",
        title: "Starting Young",
        description: "Build credit before you need it.",
        concept:
          "The earlier you start, the stronger your credit becomes — 'length of credit history' is part of your score. As young as 13, you can become an authorized user on a parent's credit card (their good habits help you). At 18, you can open a student card or secured card yourself. Start small, pay in full every month, and by 21 you could already have excellent credit — way ahead of most adults.",
        questions: [
          {
            kind: "mcq",
            prompt: "What's an 'authorized user'?",
            options: [
              "A secret agent",
              "Someone added to another person's credit card account",
              "A government tax official",
              "A type of bank",
            ],
            correctIndex: 1,
            explanation:
              "Being added as an authorized user lets a responsible parent or guardian's good habits start building your history.",
          },
          {
            kind: "scenario",
            prompt:
              "You're 18 with no credit. You want to start building. What should you do first?",
            choices: [
              {
                text: "Apply for a student or secured card, then pay it off monthly.",
                outcome:
                  "Great plan — small purchases, full payments, fast and safe credit growth.",
                correct: true,
              },
              {
                text: "Apply for five cards at once to build fast.",
                outcome:
                  "Too many applications at once actually drop your score and look risky to lenders.",
                correct: false,
              },
              {
                text: "Wait until you're 30 to think about credit.",
                outcome:
                  "That's 12 years of missed credit-building. Start earlier for a huge head start.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "Why does starting young help your score?",
            options: [
              "'Length of credit history' counts — older accounts raise your score",
              "Kids get a score boost by law",
              "It doesn't matter when you start",
              "Only adults over 25 have scores",
            ],
            correctIndex: 0,
            explanation:
              "A 5-year-old credit account signals to lenders that you've been trustworthy a long time. Plant the tree now.",
          },
        ],
        closingTip: "Time is credit's best friend. Plant the tree today.",
      },
    ],
  },
  {
    id: "level3",
    number: 3,
    title: "Smart Spending",
    description: "Keeping your credit healthy day to day.",
    unlockScore: 600,
    lessons: [
      {
        id: "lesson-3-1",
        title: "Credit Utilization (30% Rule)",
        description: "How much of your limit to use.",
        concept:
          "Credit utilization is the percent of your limit you're actually using. If your card limit is $1,000 and you owe $300, that's 30%. The lower, the better — under 30% is the common rule, and under 10% is ideal. High utilization screams 'this person needs cash,' which drops your score even if you always pay on time. Spread spending across cards or pay your balance down before the statement closes.",
        questions: [
          {
            kind: "mcq",
            prompt:
              "If your credit limit is $1,000 and your balance is $500, your utilization is…",
            options: ["5%", "50%", "100%", "500%"],
            correctIndex: 1,
            explanation:
              "500 out of 1,000 is 50%. That's way over the 30% guideline and will pull your score down.",
          },
          {
            kind: "scenario",
            prompt:
              "Your card limit is $500. You want to buy a $450 phone. What's the smart move?",
            choices: [
              {
                text: "Save up cash for most of it, and put only a small part on the card.",
                outcome:
                  "Smart — you avoid maxing out and keep utilization low. Score stays healthy.",
                correct: true,
              },
              {
                text: "Charge the whole $450 — you'll pay it off soon enough.",
                outcome:
                  "That's 90% utilization. Your score can drop 30+ points, even if you pay it off.",
                correct: false,
              },
              {
                text: "Open a new card right before the purchase.",
                outcome:
                  "New cards right before big purchases often backfire. Better to plan ahead.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "What's the 30% rule?",
            options: [
              "Use less than 30% of your credit limit",
              "Pay 30% of your bill",
              "Only shop 30 days a year",
              "Get 30% off everything",
            ],
            correctIndex: 0,
            explanation:
              "Keep your balance under 30% of the limit. Under 10% is even better for your score.",
          },
        ],
        closingTip: "Low utilization = healthy credit. Leave room on the card.",
      },
      {
        id: "lesson-3-2",
        title: "Needs vs. Wants",
        description: "Every dollar has a purpose.",
        concept:
          "A need is something you must have — food, shelter, basic clothes, transportation to school. A want is nice but optional — the newest phone, fancy shoes, takeout food. Good credit habits start with knowing the difference. Charging needs you can pay off is smart; charging wants you can't is how people get trapped. Ask yourself: 'Can I pay this off this month?' If not, it might be a want, not a need.",
        questions: [
          {
            kind: "mcq",
            prompt: "Which of these is a 'need'?",
            options: [
              "The newest game console",
              "Groceries for the week",
              "A third pair of sneakers",
              "Movie tickets",
            ],
            correctIndex: 1,
            explanation:
              "Food is a need. The rest are wants — totally fine, but only if you can pay for them outright.",
          },
          {
            kind: "scenario",
            prompt:
              "You see a $200 jacket you really want. Your credit card could cover it, but you'd take 6 months to pay it off. What's the smart call?",
            choices: [
              {
                text: "Save up cash for it — it's a want, not an emergency.",
                outcome:
                  "Smart. Waiting builds discipline, and you avoid 6 months of interest.",
                correct: true,
              },
              {
                text: "Charge it now, pay $35/month.",
                outcome:
                  "By the time you finish, interest turns it into a $240+ jacket. Not worth it.",
                correct: false,
              },
              {
                text: "Charge it and pay only the minimum forever.",
                outcome:
                  "Minimums are a trap — that jacket could cost $400+ before you finish paying.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt:
              "A good question to ask before any credit card purchase is…",
            options: [
              "Will my friends be jealous?",
              "Can I pay this off by next month?",
              "Is it the most expensive option?",
              "Does it come in blue?",
            ],
            correctIndex: 1,
            explanation:
              "If you can't pay it off within the billing cycle, reconsider. Interest turns small wants into big debts.",
          },
        ],
        closingTip: "Credit for needs. Cash for wants. That's the rule.",
      },
      {
        id: "lesson-3-3",
        title: "Avoiding Debt Traps",
        description: "Spotting sneaky money drains.",
        concept:
          "Debt traps are spending habits that look harmless but snowball fast. Minimum payments, cash advances, payday loans, and 'buy now, pay later' stacks can all trap you. Minimums keep you in debt for decades. Cash advances have huge fees and instant interest. Payday loans charge 400%+ yearly. If a deal sounds too easy, it usually has teeth — read the fine print.",
        questions: [
          {
            kind: "mcq",
            prompt: "What's wrong with paying only the minimum on a credit card?",
            options: [
              "Nothing — minimum is fine",
              "Interest keeps piling on the rest, making debt last years",
              "It raises your score instantly",
              "The bank calls you",
            ],
            correctIndex: 1,
            explanation:
              "A $1,000 balance at minimum payments and 22% interest can take 8+ years to pay off and cost way more than $1,000.",
          },
          {
            kind: "scenario",
            prompt:
              "A 'payday loan' shop offers you $100 now for $115 in 2 weeks. Sounds small — is it?",
            choices: [
              {
                text: "Avoid it — that's about 390% yearly interest.",
                outcome:
                  "Correct. Payday loans are the classic trap. Walk away.",
                correct: true,
              },
              {
                text: "Take it — $15 is nothing.",
                outcome:
                  "$15 on $100 for 2 weeks is huge. Annualized, it's nearly 400% interest.",
                correct: false,
              },
              {
                text: "Take two of them to cover the first one.",
                outcome:
                  "Classic trap — borrowing to repay borrowing is how people end up thousands in the hole.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "Buy Now, Pay Later plans are risky when…",
            options: [
              "You stack several and lose track of them all",
              "You use them once for a known purchase and pay on time",
              "The store offers them",
              "They're the only way to shop",
            ],
            correctIndex: 0,
            explanation:
              "Stacking BNPL across sites means multiple due dates, missed payments, and surprise interest charges.",
          },
        ],
        closingTip:
          "If it feels too easy or too good, read twice. Cheap money isn't actually cheap.",
      },
    ],
  },
  {
    id: "level4",
    number: 4,
    title: "Real World",
    description: "Cars, apartments, and the grown-up game.",
    unlockScore: 670,
    lessons: [
      {
        id: "lesson-4-1",
        title: "Loans & Interest",
        description: "Borrowing the big stuff.",
        concept:
          "A loan is a larger, planned borrow — a car, college, or a house. You pay it back in fixed monthly chunks over months or years. The bank's fee is interest, shown as APR (annual percentage rate). Lower APR = you pay less total. Example: a $20,000 car loan for 5 years at 6% APR costs about $3,200 in interest. At 12% APR, it costs $6,700. Your credit score literally sets your APR.",
        questions: [
          {
            kind: "mcq",
            prompt: "APR stands for…",
            options: [
              "Always Pay Rent",
              "Annual Percentage Rate",
              "A Painful Reminder",
              "American Payment Record",
            ],
            correctIndex: 1,
            explanation:
              "APR is the yearly interest rate on a loan. Lower APR = a cheaper loan over time.",
          },
          {
            kind: "scenario",
            prompt:
              "Two people buy the same $20,000 car. One has great credit at 5% APR. The other has poor credit at 14% APR. After 5 years…",
            choices: [
              {
                text: "The person with great credit paid about $7,000 less.",
                outcome:
                  "Exactly. Your credit score literally writes you thousand-dollar checks over the life of a loan.",
                correct: true,
              },
              {
                text: "They paid the same.",
                outcome:
                  "Interest compounds fast. Even small APR differences become thousands.",
                correct: false,
              },
              {
                text: "The poor-credit person paid less — it evens out.",
                outcome:
                  "Never. Lower credit = higher APR = much more money paid over time.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "What controls the APR a bank offers you?",
            options: [
              "The color of your car",
              "Your credit score and history",
              "Your favorite cereal",
              "The weather that day",
            ],
            correctIndex: 1,
            explanation:
              "Trust = lower rate. Risk = higher rate. That's how banks see you.",
          },
        ],
        closingTip:
          "Your credit score is a discount coupon on every loan you'll ever take.",
      },
      {
        id: "lesson-4-2",
        title: "Renting Your First Place",
        description: "Why landlords love great credit.",
        concept:
          "Most landlords run a credit check before renting to you. Good credit tells them you're likely to pay rent on time — exactly what they want. Poor or no credit can mean a bigger deposit, a co-signer, or a flat 'no.' You'll also need first month, last month, and a security deposit saved (often 2–3x the rent). Start your score early and renting at 18 becomes way easier.",
        questions: [
          {
            kind: "mcq",
            prompt: "Why do landlords check credit?",
            options: [
              "To guess your favorite food",
              "To predict if you'll pay rent reliably",
              "Because it's a law",
              "To see your photos",
            ],
            correctIndex: 1,
            explanation:
              "Credit is the landlord's cheat sheet for 'will this tenant actually pay on time?'",
          },
          {
            kind: "scenario",
            prompt:
              "You're applying for an apartment with no credit history. The landlord hesitates. What helps most?",
            choices: [
              {
                text: "Offer a co-signer (parent/guardian) with good credit.",
                outcome:
                  "Strong move. A co-signer gives the landlord a backup they can trust.",
                correct: true,
              },
              {
                text: "Promise you're 'really responsible.'",
                outcome:
                  "Landlords hear that from everyone. They want proof, not promises.",
                correct: false,
              },
              {
                text: "Walk away — no one will rent to you without credit.",
                outcome:
                  "Plenty of places work with young renters, especially with a co-signer or bigger deposit.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "Which is NOT something landlords typically ask for?",
            options: [
              "Credit check",
              "Security deposit",
              "Your social media passwords",
              "Proof of income",
            ],
            correctIndex: 2,
            explanation:
              "Credit, deposit, and income — yes. Social passwords — never. That's a scam sign.",
          },
        ],
        closingTip:
          "Your credit score is a silent reference letter. Make it a good one.",
      },
      {
        id: "lesson-4-3",
        title: "Buying a Car",
        description: "Your first car, without getting taken.",
        concept:
          "When you buy a car with a loan, the bank uses your credit score to set your APR. A 100-point higher score can save you thousands over the life of the loan. Never just look at the monthly payment — that's how dealers trap buyers with long loans at high rates. Always compare total cost: price + interest + fees. Getting pre-approved at your bank or credit union is usually cheaper than dealer financing.",
        questions: [
          {
            kind: "mcq",
            prompt: "The best way to compare car loans is by…",
            options: [
              "Monthly payment only",
              "Total cost: price + interest + fees",
              "Color of the car",
              "Number of cup holders",
            ],
            correctIndex: 1,
            explanation:
              "A low monthly payment often hides a long loan and thousands in extra interest.",
          },
          {
            kind: "scenario",
            prompt:
              "The dealer offers a 7-year loan at $220/month. Your bank pre-approved a 4-year loan at $380/month. Which is cheaper overall?",
            choices: [
              {
                text: "The 4-year bank loan — shorter term, way less interest.",
                outcome:
                  "Exactly. $220 × 84 months = $18,480, usually at a higher APR. $380 × 48 = $18,240, typically cheaper. 4 years wins.",
                correct: true,
              },
              {
                text: "The 7-year dealer loan — a smaller payment is always better.",
                outcome:
                  "You'd pay thousands more in interest and be 'underwater' on the car for years.",
                correct: false,
              },
              {
                text: "They're basically the same.",
                outcome:
                  "Almost never. Longer loans = more interest, even at a lower monthly payment.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "What's 'pre-approval'?",
            options: [
              "A loan a bank already agreed to before you shop",
              "A coupon from the dealer",
              "The dealer's opinion of you",
              "A credit card in disguise",
            ],
            correctIndex: 0,
            explanation:
              "Pre-approval puts you in the driver's seat. You walk in with a set budget, not hopes.",
          },
        ],
        closingTip:
          "Negotiate the total price, not the monthly payment. Dealers count on people doing the opposite.",
      },
    ],
  },
  {
    id: "level5",
    number: 5,
    title: "Pro Level",
    description: "Reports, disputes, and 800-club habits.",
    unlockScore: 740,
    lessons: [
      {
        id: "lesson-5-1",
        title: "Credit Reports",
        description: "The full story of your credit life.",
        concept:
          "A credit report is a file that lists every credit card, loan, and payment you've ever had. Three big agencies — Experian, Equifax, and TransUnion — each keep one. You can pull all three free once a year at AnnualCreditReport.com. Check for mistakes, unknown accounts (possible identity theft), and late payments. A clean report equals a healthy score.",
        questions: [
          {
            kind: "mcq",
            prompt: "How often can you get a free credit report?",
            options: [
              "Never — it always costs money",
              "Once a year from each of the three major agencies",
              "Only on your birthday",
              "Every 10 years",
            ],
            correctIndex: 1,
            explanation:
              "Federal law lets you grab a free report from Experian, Equifax, and TransUnion each year.",
          },
          {
            kind: "scenario",
            prompt:
              "You check your credit report and see a credit card you don't remember opening. What do you do?",
            choices: [
              {
                text: "Report it right away — it could be identity theft.",
                outcome:
                  "Smart. Dispute it with the credit bureau and freeze your credit to stop further damage.",
                correct: true,
              },
              {
                text: "Ignore it — probably no big deal.",
                outcome:
                  "Ignoring fraud lets it grow. Your score and your wallet are both at risk.",
                correct: false,
              },
              {
                text: "Close it yourself and move on.",
                outcome:
                  "If it's fraud, closing alone isn't enough. You need to dispute and freeze your credit.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "The three major credit bureaus are…",
            options: [
              "Apple, Google, Microsoft",
              "Experian, Equifax, TransUnion",
              "FBI, CIA, IRS",
              "Visa, Mastercard, Amex",
            ],
            correctIndex: 1,
            explanation:
              "Each bureau keeps its own report on you. Scores can differ slightly between them.",
          },
        ],
        closingTip:
          "Check your report every year. Catching a mistake early saves your score.",
      },
      {
        id: "lesson-5-2",
        title: "Fixing Mistakes",
        description: "When your credit gets it wrong.",
        concept:
          "Mistakes on credit reports are common — wrong late payments, accounts that aren't yours, or old debts that should have dropped off. You can dispute any mistake for free with the credit bureau online. They must investigate within about 30 days. If they can't confirm it, they have to remove it. Fixing one error can jump your score 50–100 points. Always check before a big loan.",
        questions: [
          {
            kind: "mcq",
            prompt: "What should you do if you find a mistake on your credit report?",
            options: [
              "Nothing — it'll fix itself",
              "File a free dispute with the credit bureau",
              "Delete it from the website",
              "Pay the bureau to ignore it",
            ],
            correctIndex: 1,
            explanation:
              "Disputes are free. The bureau must investigate and remove anything they can't verify.",
          },
          {
            kind: "scenario",
            prompt:
              "You find a $500 late payment on your report that never happened. What's the right next step?",
            choices: [
              {
                text: "File a dispute online with proof (receipts, bank statements).",
                outcome:
                  "Good — proof speeds things up. Within 30 days, it's often removed completely.",
                correct: true,
              },
              {
                text: "Call and yell at customer service.",
                outcome:
                  "Doesn't work. You need a written dispute with evidence for it to count.",
                correct: false,
              },
              {
                text: "Pay the $500 so it goes away.",
                outcome:
                  "Never pay debts you don't owe — you might accidentally confirm them as yours.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "How long does a credit bureau have to investigate a dispute?",
            options: ["1 day", "About 30 days", "1 year", "Forever"],
            correctIndex: 1,
            explanation:
              "By law, bureaus have roughly 30 days. Unverified items must be removed after that.",
          },
        ],
        closingTip:
          "You have the right to accurate credit. Fixing one mistake can rewrite your financial life.",
      },
      {
        id: "lesson-5-3",
        title: "Excellent Habits",
        description: "What 800+ credit looks like day-to-day.",
        concept:
          "People with 800+ credit aren't financial geniuses — they just do boring things well. They pay every bill on time, keep balances under 10% of limits, don't open new accounts often, check their reports yearly, and keep old accounts open to lengthen credit history. No tricks, no hacks — just consistency over years. Build these habits young and you'll skip the stress most adults live with.",
        questions: [
          {
            kind: "mcq",
            prompt: "Which habit is most associated with 800+ credit scores?",
            options: [
              "Paying bills on time, every time",
              "Changing jobs often",
              "Using 90% of your credit limit",
              "Opening 5 new cards every year",
            ],
            correctIndex: 0,
            explanation:
              "Boring wins. Every 'credit expert' tip eventually comes back to: pay on time.",
          },
          {
            kind: "scenario",
            prompt:
              "You have an old credit card from 3 years ago you never use. Should you close it?",
            choices: [
              {
                text: "Usually keep it open — longer credit history helps your score.",
                outcome:
                  "Right. Closing old accounts shortens history and can raise your utilization percentage.",
                correct: true,
              },
              {
                text: "Close it — it's pointless.",
                outcome:
                  "Closing can actually drop your score by shortening history and bumping utilization.",
                correct: false,
              },
              {
                text: "Max it out so it 'counts.'",
                outcome:
                  "Terrible move — high utilization tanks your score fast.",
                correct: false,
              },
            ],
          },
          {
            kind: "mcq",
            prompt: "Why keep credit utilization under 10%?",
            options: [
              "It signals 'trustworthy' and maxes your score",
              "It doesn't matter after a while",
              "Because 10 is a round number",
              "It makes cards free",
            ],
            correctIndex: 0,
            explanation:
              "The lowest utilization tier — under 10% — sends the strongest 'trustworthy' signal to scoring models.",
          },
        ],
        closingTip:
          "Great credit is a long game. Small, steady habits beat flashy moves every time.",
      },
    ],
  },
];

export const levels = curriculum;

export function getLevelById(id: string): Level | undefined {
  return curriculum.find((l) => l.id === id);
}

export function getLessonById(id: string): Lesson | undefined {
  for (const level of curriculum) {
    const lesson = level.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return undefined;
}

export function getLevelForLesson(lessonId: string): Level | undefined {
  return curriculum.find((lvl) =>
    lvl.lessons.some((l) => l.id === lessonId)
  );
}

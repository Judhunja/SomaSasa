/**
 * AI Client for SomaNow
 * DeepSeek API Integration for Educational AI Tutoring
 */

const DEEPSEEK_API_KEY = 'sk-e50895f5daab4d589ce9b96a2a949e53';
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1';

/**
 * Call DeepSeek API for AI tutoring responses
 */
async function callDeepSeekAPI(message, gradeLevel = 'primary-4', subject = 'general') {
  try {
    console.log('Calling DeepSeek API with:', { message: message.substring(0, 100) + '...', gradeLevel, subject });
    
    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are an educational content creator. Generate clear, focused educational content that directly addresses the topic requested. Do not include meta-commentary about teaching methods.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1500,
        temperature: 0.7,
        stream: false
      })
    });

    console.log('DeepSeek API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DeepSeek API error response:', errorText);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('DeepSeek API response data:', data);
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return {
        success: true,
        message: data.choices[0].message.content,
        source: 'deepseek-api',
        usage: data.usage
      };
    } else {
      throw new Error('Invalid response format from DeepSeek API');
    }

  } catch (error) {
    console.error('DeepSeek API Error:', error);
    
    // Fallback to educational mock response
    return getMockEducationalResponse(message, gradeLevel, subject);
  }
}

/**
 * Fallback educational responses when API is unavailable
 */
function getMockEducationalResponse(message, gradeLevel, subject) {
  // Try to extract the lesson topic from the message
  const topicMatch = message.match(/about\s+"([^"]+)"/i) || message.match(/lesson\s+on\s+"([^"]+)"/i);
  const lessonTopic = topicMatch ? topicMatch[1] : 'this topic';
  
  // Generate content based on subject and topic
  if (subject.toLowerCase().includes('math')) {
    return {
      success: true,
      message: `# ${lessonTopic}

## What is ${lessonTopic}?

${lessonTopic} is an important concept in mathematics. Let's learn by doing!

## Let's Solve Together!

### Problem 1: Let's Start Simple
**Question**: If you have 3 mangoes and your friend gives you 2 more mangoes, how many mangoes do you have in total?

**Let's solve this step by step:**

Step 1: Count what you started with
- I have 3 mangoes
- I can picture them: 🥭 🥭 🥭

Step 2: Count what you received
- My friend gave me 2 more mangoes
- That's: 🥭 🥭

Step 3: Count them all together
- All my mangoes: 🥭 🥭 🥭 🥭 🥭
- Let me count: 1, 2, 3, 4, 5
- **Answer: 5 mangoes**

### Problem 2: Your Turn to Try!
**Question**: You have 7 pencils. You give 3 pencils to your classmate. How many pencils do you have left?

**Let's work through this:**

Step 1: Start with what you have
- I have 7 pencils: ✏️ ✏️ ✏️ ✏️ ✏️ ✏️ ✏️

Step 2: Take away what you gave
- I gave away 3 pencils
- Cross out 3: ~~✏️ ✏️ ✏️~~ ✏️ ✏️ ✏️ ✏️

Step 3: Count what's left
- Remaining pencils: ✏️ ✏️ ✏️ ✏️
- Count them: 1, 2, 3, 4
- **Answer: 4 pencils**

### Problem 3: Challenge Time!
**Question**: A matatu has 14 seats. 9 people are already sitting. How many more people can sit?

**Solution walkthrough:**

Step 1: Understand what we know
- Total seats = 14
- People already sitting = 9
- We need to find: How many more can sit?

Step 2: Set up the problem
- This is subtraction: 14 - 9 = ?

Step 3: Solve step by step
- Start with 14
- Take away 9
- 14 - 9 = 5
- **Answer: 5 more people can sit**

## Now You Try!
Practice with objects around you - count stones, bottle tops, or anything you can find!`,
      source: 'fallback'
    };
  } else if (subject.toLowerCase().includes('english')) {
    return {
      success: true,
      message: `# ${lessonTopic}

## Learning ${lessonTopic} Through Practice

Let's practice ${lessonTopic} by working through real examples together!

## Example 1: Let's Break It Down

**Sentence**: "The big brown dog ran quickly to the park."

**Let's identify ${lessonTopic} step by step:**

Step 1: Read the sentence carefully
- "The big brown dog ran quickly to the park."

Step 2: Look for the key words
- Let me underline the important parts
- "The **big brown** dog ran **quickly** to the park."

Step 3: Understand what each word does
- "big" and "brown" describe the dog
- "quickly" describes how the dog ran
- These are describing words!

## Example 2: Your Turn to Find Them!

**Sentence**: "The small red car moved slowly down the busy street."

**Let's work together:**

Step 1: Read it out loud
- "The small red car moved slowly down the busy street."

Step 2: Ask yourself - which words describe things?
- What kind of car? → small, red
- How did it move? → slowly  
- What kind of street? → busy

Step 3: Circle the describing words
- The **small red** car moved **slowly** down the **busy** street.

## Example 3: Make Your Own!

**Let's create a sentence:**

Step 1: Pick a thing (noun)
- Let's choose: "bird"

Step 2: Add describing words
- What kind of bird? → "beautiful yellow"
- How does it move? → "gracefully"

Step 3: Put it together
- "The beautiful yellow bird flew gracefully."

## Practice Activity
Look around your room. Can you describe 3 things you see using describing words?`,
      source: 'fallback'
    };
  } else if (subject.toLowerCase().includes('science')) {
    return {
      success: true,
      message: `# ${lessonTopic}

## Discovering ${lessonTopic} Through Investigation

Let's learn ${lessonTopic} by doing a real investigation together!

## Investigation 1: Let's Observe and Learn

**Question**: Why do some things float and others sink?

**Let's investigate step by step:**

Step 1: Gather materials (things you can find at home)
- A bowl of water
- A stone
- A piece of wood
- A coin
- A plastic bottle cap

Step 2: Make predictions
- Before we test, let's guess:
- Stone: Will it float or sink? (Write your guess)
- Wood: Will it float or sink? (Write your guess)
- Coin: Will it float or sink? (Write your guess)

Step 3: Test each item
- Put the stone in water → What happened? (It sank!)
- Put the wood in water → What happened? (It floated!)
- Put the coin in water → What happened? (It sank!)

Step 4: Look for patterns
- What do you notice?
- Heavy things like stone and coin → sink
- Light things like wood → float

## Investigation 2: Let's Solve a Problem

**Problem**: Your plant is wilting. What could be wrong?

**Let's think like scientists:**

Step 1: Observe carefully
- Look at the plant
- Are the leaves droopy?
- Is the soil dry or wet?
- Is it getting sunlight?

Step 2: Ask questions
- When did you last water it?
- Is it in a sunny or dark place?
- Are there any bugs on it?

Step 3: Form a hypothesis (educated guess)
- If the soil is dry → Maybe it needs water
- If it's in a dark corner → Maybe it needs sunlight
- If leaves are yellow → Maybe too much water

Step 4: Test your solution
- Try watering it (if soil is dry)
- Move it to sunlight (if it's too dark)
- Wait and observe what happens

## Your Turn to Investigate!
Find something in nature around you and ask "How does this work?" Then investigate!`,
      source: 'fallback'
    };
  } else {
    return {
      success: true,
      message: `# ${lessonTopic}

## Learning ${lessonTopic} Step by Step

Let's learn ${lessonTopic} by working through real examples together!

## Example 1: Breaking It Down

**Let's understand ${lessonTopic} by doing it:**

Step 1: Start with what we know
- ${lessonTopic} is important in ${subject}
- Let's see it in action

Step 2: Work through an example
- Here's a simple case of ${lessonTopic}
- Let's solve it together step by step

Step 3: Practice what we learned
- Now you try the same method
- Follow the same steps

## Example 2: Your Turn to Try

**Problem to solve:**

Step 1: Read the problem carefully
- What is being asked?
- What information do we have?

Step 2: Plan your approach
- What steps should we take?
- What do we need to do first?

Step 3: Work through the solution
- Let's do this together
- One step at a time

Step 4: Check our answer
- Does this make sense?
- Can we verify it?

## Practice Activity
Try applying what you learned to a new problem. Remember to follow the same steps!`,
      source: 'fallback'
    };
  }
}

/**
 * Main AI tutoring function
 */
export async function getAITutorResponse(message, context = {}) {
  const {
    gradeLevel = 'primary-4',
    subject = 'general',
    studentName = 'Student'
  } = context;

  // Validate inputs
  if (!message || message.trim().length === 0) {
    return {
      success: false,
      error: 'Please ask a question for me to help you with!'
    };
  }

  try {
    // Call DeepSeek API
    const response = await callDeepSeekAPI(message, gradeLevel, subject);
    
    if (response.success) {
      return {
        success: true,
        message: response.message,
        source: response.source,
        metadata: {
          gradeLevel,
          subject,
          timestamp: new Date().toISOString(),
          usage: response.usage
        }
      };
    } else {
      throw new Error('Failed to get AI response');
    }

  } catch (error) {
    console.error('AI Tutor Error:', error);
    
    // Return error-specific fallback
    return {
      success: true,
      message: `Hi! I'm having trouble connecting to my knowledge base right now, but I'm still here to help!

For your question about "${message.substring(0, 50)}${message.length > 50 ? '...' : ''}", here are some general study tips for ${gradeLevel} students:

📚 Study Tips:
1. Break big topics into smaller parts
2. Practice regularly, even just 15 minutes a day
3. Ask questions when you don't understand
4. Connect new learning to things you already know

📝 Remember: Every student learns differently, and that's perfectly fine! 

Try rephrasing your question or asking about a specific part you'd like help with. I'll do my best to guide you!

Keep learning and stay curious! 🌟`,
      source: 'fallback',
      error: error.message
    };
  }
}

/**
 * Get subject-specific study suggestions
 */
export function getSubjectSuggestions(subject, gradeLevel) {
  const suggestions = {
    'Mathematics': [
      'Practice daily with real-world problems',
      'Use visual aids and manipulatives',
      'Explain your thinking process aloud',
      'Connect math to everyday Kenyan experiences'
    ],
    'English': [
      'Read Kenyan literature and stories',
      'Practice writing about your experiences',
      'Expand vocabulary with new words daily',
      'Join discussions and debates'
    ],
    'Science': [
      'Observe the natural world around you',
      'Ask "why" and "how" questions',
      'Conduct safe experiments at home',
      'Connect science to Kenyan environmental issues'
    ],
    'Kiswahili': [
      'Practice speaking with family and friends',
      'Read Kiswahili newspapers and books',
      'Listen to Kiswahili radio and music',
      'Learn about Kenyan cultural traditions'
    ],
    'Social Studies': [
      'Explore your local community and history',
      'Discuss current events with others',
      'Visit museums and cultural sites',
      'Learn about different Kenyan communities'
    ]
  };

  return suggestions[subject] || [
    'Stay curious and ask questions',
    'Practice regularly',
    'Connect learning to real life',
    'Seek help when needed'
  ];
}

export default {
  getAITutorResponse,
  getSubjectSuggestions
};

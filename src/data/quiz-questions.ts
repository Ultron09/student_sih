export interface Question {
    id: string;
    text: string;
    options: string[];
    correctAnswer?: string;
}

export interface Section {
    id: string;
    title: string;
    description: string;
    questions: Question[];
}

interface QuizData {
    sections: Section[];
}

export const quizData: QuizData = {
    sections: [
        {
            id: 'reasoning',
            title: 'Logical & Analytical Reasoning',
            description: 'This section assesses your problem-solving, pattern recognition, and analytical thinking abilities.',
            questions: [
                {
                    id: 'q1',
                    text: 'Find the odd one out:',
                    options: ['Dog', 'Cat', 'Lion', 'Eagle', 'Tiger'],
                    correctAnswer: 'Eagle'
                },
                {
                    id: 'q2',
                    text: 'Complete the sequence: 3, 6, 12, 24, ?',
                    options: ['30', '36', '48', '60'],
                    correctAnswer: '48'
                }
            ]
        },
        {
            id: 'numerical',
            title: 'Numerical & Quantitative Aptitude',
            description: 'This section evaluates your numerical reasoning and quantitative thinking.',
            questions: [
                {
                    id: 'q3',
                    text: 'A train travels 120 km in 2 hours. How long would it take to travel 150 km at the same speed?',
                    options: ['2.5 hours', '3 hours', '3.5 hours', '4 hours'],
                    correctAnswer: '2.5 hours'
                },
                 {
                    id: 'q4',
                    text: 'If a bottle is 60% full and adding 5 liters makes it 70% full, what is its total capacity in liters?',
                    options: ['25 liters', '50 liters', '75 liters', '100 liters'],
                    correctAnswer: '50 liters'
                }
            ]
        },
        {
            id: 'verbal',
            title: 'Verbal & Comprehension Skills',
            description: 'This section assesses your communication, reading comprehension, and clarity of thought.',
            questions: [
                {
                    id: 'q5',
                    text: 'Which of the following is the best summary for the proverb "Actions speak louder than words"?',
                    options: ['Talking is easy', 'What you do is more important than what you say', 'You should always be active', 'Words can be powerful'],
                    correctAnswer: 'What you do is more important than what you say'
                },
                {
                    id: 'q6',
                    text: 'Rearrange the words to form a meaningful sentence: "always / learns / who / observes / carefully / success / achieves"',
                    options: [
                        'Who observes carefully always learns and achieves success.', 
                        'Success is achieved by who carefully observes and always learns.', 
                        'Carefully, who learns and observes, always achieves success.',
                        'Observes who learns carefully, achieves success always.'
                    ],
                    correctAnswer: 'Who observes carefully always learns and achieves success.'
                }
            ]
        },
        {
            id: 'creative',
            title: 'Creative & Conceptual Thinking',
            description: 'This section assesses your imagination, design thinking, and innovative potential.',
            questions: [
                {
                    id: 'q7',
                    text: 'If you were to design a new gadget to help students study better, what would its main feature be?',
                    options: ['Automated note-taking', 'AI-powered doubt solver', 'Distraction blocker', 'Interactive 3D models'],
                },
                {
                    id: 'q8',
                    text: 'Which of these activities stimulates your imagination the most?',
                    options: ['Building something with blocks', 'Writing a fictional story', 'Visualizing a complex geometric shape', 'Composing a new melody'],
                }
            ]
        },
        {
            id: 'situational',
            title: 'Situational Judgment & Decision Making',
            description: 'This section evaluates your practical thinking and response to real-life scenarios.',
            questions: [
                {
                    id: 'q9',
                    text: 'You are working on a group project and notice a mistake in someone else’s work that could affect the final grade. What do you do?',
                    options: ['Correct it yourself without telling them', 'Politely inform them about it in private', 'Ignore it to avoid conflict', 'Announce it to the whole group'],
                },
                {
                    id: 'q10',
                    text: 'You have multiple important tasks with the same deadline. How do you approach them?',
                    options: ['Start with the easiest one first', 'Start with the hardest one first', 'Break down each task and work on them in parallel', 'Ask for an extension on all of them'],
                }
            ]
        },
        {
            id: 'interest',
            title: 'Interest Mapping & Learning Style',
            description: 'This section helps identify your preferred domains and how you like to work and learn.',
            questions: [
                {
                    id: 'q11',
                    text: 'Which of these activities do you enjoy the most?',
                    options: ['Conducting experiments & finding out why things work', 'Solving complex puzzles and mathematical problems', 'Writing stories, poems, or articles', 'Designing or drawing something visually appealing', 'Building a program or a physical model'],
                },
                {
                    id: 'q12',
                    text: 'When learning something new, you prefer:',
                    options: ['Hands-on practice and experimentation', 'Reading theory and understanding concepts deeply', 'Discussing ideas with a group', 'Watching demonstrations and observing others'],
                }
            ]
        }
    ]
};

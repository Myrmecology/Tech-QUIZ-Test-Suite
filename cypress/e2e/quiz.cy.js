describe('Tech Quiz Application', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should start a quiz when clicking the start button', () => {
    // Find and click the start button
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Verify a question is displayed
    cy.get('div')
      .contains(/question/i)
      .should('be.visible');
  });

  it('should present a new question when an answer is selected', () => {
    // Start the quiz
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Store the first question text
    cy.get('div')
      .contains(/question/i)
      .invoke('text')
      .as('firstQuestion');
    
    // Select the first answer option
    cy.get('button').first().click();
    
    // Verify we get a new question (text should be different)
    cy.get('div')
      .contains(/question/i)
      .invoke('text')
      .then(newQuestionText => {
        cy.get('@firstQuestion').should('not.eq', newQuestionText);
      });
  });

  it('should complete the quiz and show the score after answering all questions', () => {
    // Start the quiz
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Answer all questions (assuming there are 10 questions)
    // Using a loop to click on the first answer for each question
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
      // Add a small wait to ensure the UI updates
      cy.wait(300);
    }
    
    // Verify the score is displayed
    cy.contains(/score|result/i).should('be.visible');
  });

  it('should allow starting a new quiz after completion', () => {
    // Start the quiz
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get('button').first().click();
      cy.wait(300);
    }
    
    // Look for a restart/new quiz button
    cy.get('button')
      .contains(/start|restart|new quiz|try again/i)
      .click();
    
    // Verify we're back to the start screen
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .should('be.visible');
  });
});
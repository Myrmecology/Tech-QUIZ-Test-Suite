describe('Quiz Component', () => {
  beforeEach(() => {
    // Visit the quiz page
    cy.visit('/');
  });

  it('should render the quiz component', () => {
    // Check that the main quiz container exists
    cy.get('div').contains('Tech Quiz').should('exist');
  });

  it('should display the start button initially', () => {
    // Check for a start button
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .should('be.visible');
  });

  it('should start the quiz when the start button is clicked', () => {
    // Click the start button
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Verify a question is displayed
    cy.get('div')
      .contains(/question/i)
      .should('be.visible');
      
    // Verify answer options are displayed
    cy.get('button').should('have.length.at.least', 2);
  });

  it('should display answer options for the current question', () => {
    // Start the quiz
    cy.get('button')
      .contains(/start|begin|take quiz/i)
      .click();
    
    // Check that multiple answer options are displayed
    cy.get('button').should('have.length.at.least', 2);
  });
});
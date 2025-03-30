describe('Tech Quiz Application', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should load the quiz application', () => {
    // Verify the page loads
    cy.get('button')
      .contains('Start Quiz')
      .should('be.visible');
  });

  it('should respond when clicking the start button', () => {
    // Click the start button
    cy.get('button')
      .contains('Start Quiz')
      .click();
    
    // Just verify the page doesn't crash
    cy.get('body').should('exist');
  });
});
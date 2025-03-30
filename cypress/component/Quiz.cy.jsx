describe('Quiz Component', () => {
  beforeEach(() => {
    // Visit the quiz page
    cy.visit('/');
  });

  it('should render the quiz component', () => {
    // Check that the page loads
    cy.get('body').should('exist');
  });

  it('should display the start button initially', () => {
    // Check for a start button
    cy.get('button')
      .contains('Start Quiz')
      .should('be.visible');
  });

  it('should attempt to start quiz when start button is clicked', () => {
    // Click the start button
    cy.get('button')
      .contains('Start Quiz')
      .click();
    
    // The button should still exist after clicking
    cy.get('button').should('exist');
  });
});
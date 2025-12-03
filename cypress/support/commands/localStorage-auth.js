// Comando simplificado para login headless usando solo localStorage
// Útil cuando no necesitas validar el API, solo establecer el estado de sesión

Cypress.Commands.add('loginViaLocalStorage', (userRole) => {
  cy.fixture('users').then(users => {
    const user = users[userRole];

    if (!user) {
      throw new Error(`User role "${userRole}" not found in users fixture`);
    }

    cy.log(`⚡ Setting up session for: ${userRole} (via localStorage)`);

    // Visitar la app primero para tener acceso a localStorage
    cy.visit('/');

    // Establecer el estado de autenticación directamente en localStorage
    cy.window().then((win) => {
      const userStorage = {
        state: {
          role: user.role || 'tenantAdmin'
        },
        version: 0
      };

      win.localStorage.setItem('user-storage', JSON.stringify(userStorage));
      cy.log('✅ User storage set in localStorage');
      cy.log(`📦 Role: ${user.role}`);
    });
  });
});

class DashboardPage {

    selectors = {
        userName: '[title="admin user"]',
        collapseButton: '[title="Colapsar sidebar"',
        isExpanded: '[title="Colapsar sidebar"]',
        isCollapsed: '[title="Expandir sidebar"]',
        userIcon: '.lucide-user'
    }


    checkUserNameLoaded()
    {
        cy.get(this.selectors.userName).should('be.visible');
    }

    checkUserNameNotLoaded()
    {
        cy.get(this.selectors.userName).should('not.be.visible');
    }

    checkCollapseButton()
    {
        cy.get(this.selectors.collapseButton).should('be.visible');
    }

    checkSidebarExpanded() {
    cy.get(this.selectors.isExpanded).should('be.visible');
    }

    checkSidebarCollapsed() {
    cy.get(this.selectors.isCollapsed).should('be.visible');
    }

    checkUserIcon(){
        cy.get(this.selectors.userIcon).should('be.visible');
    }

    openMenu(menuName) {
        cy.contains('button span', menuName)
          .closest('button')
          .click();
    }

    /**
     * Abre el menú SOLO si está cerrado. Si ya está abierto, no hace nada.
     * @param {string} menuName - Nombre del menú
     */
    ensureMenuOpen(menuName) {
        cy.contains('button span', menuName)
          .closest('button')
          .then($button => {
            const isExpanded = $button.attr('aria-expanded') === 'true';
            if (!isExpanded) {
              cy.wrap($button).click();
            }
          });
    }

    checkMenuCollapsed(menuName) {
        cy.contains('button span', menuName)
          .closest('button')
          .should('have.attr', 'aria-expanded', 'false');
    }

    checkMenuExpanded(menuName) {
        cy.contains('button span', menuName)
          .closest('button')
          .should('have.attr', 'aria-expanded', 'true');
    }

    checkMenuTextVisible(menuName) {
        cy.contains('button span', menuName).should('be.visible');
    }

    checkMenuItem(menuName) {
        cy.contains('a', menuName).should('be.visible');
    }

    checkMenuIcon(menuName) {
        cy.contains('button span', menuName)
        .closest('button')
        .find('svg:not(.lucide-chevron-down)')
        .should('be.visible');
    }

    /**
     * Verifica que cada subitem del menú tenga un ícono SVG visible
     * @param {string} parentMenuName - Nombre del menú padre (ej: 'Cotizaciones')
     * @param {string[]} subMenuItems - Array de nombres de subitems a verificar
     */
    checkAllSubMenusIcons(parentMenuName, subMenuItems) {
        this.checkMenuIcon(parentMenuName);
        this.getSubMenuContainer(parentMenuName).within(() => {
            subMenuItems.forEach(item => {
                cy.contains('a', item)
                  .should('be.visible')
                  .find('svg')
                  .should('be.visible');
            });
        });
    }

    /**
     * Verifica un subitem específico dentro de un menú padre
     * @param {string} parentMenuName - Nombre del menú padre
     * @param {string} subMenuItemName - Nombre del subitem a verificar
     */
    checkSubMenuItem(parentMenuName, subMenuItemName) {
        cy.contains('button span', parentMenuName)
          .closest('button')
          .parent()  
          .parent()   
          .find('div.pl-4')  
          .within(() => {
            cy.contains('a', subMenuItemName).should('be.visible');
          });
    }



    /**
     * Verifica múltiples subitems de un menú de una sola vez
     * @param {string} parentMenuName - Nombre del menú padre
     * @param {string[]} subMenuItems - Array de nombres de subitems a verificar
     * @example DashboardPage.checkAllSubMenuItems('Reportes', ['Cotizaciones', 'Recaudo', 'Clientes'])
     */
    checkAllSubMenuItems(parentMenuName, subMenuItems) {
     
        cy.contains('button span', parentMenuName)
          .closest('button')
          .parent()
          .parent()
          .find('div.pl-4')
          .within(() => {
            subMenuItems.forEach(item => {
              cy.contains('a', item).should('be.visible');
            });
          });
    }

    /**
     * Obtiene el contenedor del submenú para encadenar verificaciones
     * @param {string} parentMenuName - Nombre del menú padre
     * @returns {Cypress.Chainable} - El contenedor del submenú
     */
    getSubMenuContainer(parentMenuName) {
        return cy.contains('button span', parentMenuName)
          .closest('button')
          .parent()
          .parent()
          .find('div.pl-4');
    }

    /**
     * Verifica la estructura completa de un menú (expandido + subitems)
     * @param {string} menuName - Nombre del menú
     * @param {string[]} expectedSubItems - Array de subitems esperados
     */
    verifyMenuStructure(menuName, expectedSubItems) {
        this.checkMenuExpanded(menuName);
        this.checkAllSubMenusIcons(menuName, expectedSubItems);
        this.checkAllSubMenuItems(menuName, expectedSubItems);
    }

}

export default new DashboardPage();

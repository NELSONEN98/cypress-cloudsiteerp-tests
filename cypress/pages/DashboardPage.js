class DashboardPage {

    selectors = {
        userName: '[title="admin user"]',
        collapseButton: '[title="Colapsar sidebar"',
        isExpanded: '[title="Colapsar sidebar"]',
        isCollapsed: '[title="Expandir sidebar"]'
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

}

export default new DashboardPage();

import { before } from "lodash";
import DashboardPage from "../../pages/DashboardPage";


describe('Revisar componentes UI del dashboard', () => {

    beforeEach(() => {
        cy.loginWithSessionCache('admin');
        cy.visit('https://stage.cloudsiteerp.com/cotizaciones/crear-cotizacion');
    })
  
    it('Debe de cargar nombre de usuario', () => {
        DashboardPage.checkUserNameLoaded()
    })

    it('Debe de cargar boton para colapsar sidebar', () => {
        DashboardPage.checkCollapseButton()
        DashboardPage.checkSidebarExpanded()
    })
    
})
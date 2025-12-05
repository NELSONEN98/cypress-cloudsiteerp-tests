import DashboardPage from "../../pages/DashboardPage";

describe('Dashboard UI', () => {

    beforeEach(() => {
        cy.loginWithSessionCache('admin');
        //cy.visit('/');
    });

    context('Header del menú', () => {

        it('Debe mostrar el nombre de usuario y su icono', () => {
            DashboardPage.checkUserNameLoaded();
            DashboardPage.checkUserIcon();
        });

        it('Debe mostrar el botón para colapsar sidebar expandido', () => {
            DashboardPage.checkCollapseButton();
            DashboardPage.checkSidebarExpanded();
        });

    });
  
    context('Sidebar - Menús y submenús', () => {

        it('Debe mostrar el menú Cotizaciones con sus subitems', () => {
            DashboardPage.ensureMenuOpen('Cotizaciones');
            DashboardPage.verifyMenuStructure('Cotizaciones', [
                'Crear Cotización', 
                'Ver Cotizaciones'
            ]);
        });

        it('Debe mostrar el menú Valoraciones con sus subitems', () => {
            DashboardPage.openMenu('Valoraciones');
            DashboardPage.verifyMenuStructure('Valoraciones', [
                'Crear Valoración', 
                'Ver Valoraciones'
            ]);
        });

        it('Debe mostrar los items Clientes y Usuarios', () => {
            DashboardPage.checkMenuItem('Clientes');
            DashboardPage.checkMenuItem('Usuarios');
        });

        it('Debe mostrar el menú Reportes con sus subitems', () => {
            DashboardPage.openMenu('Reportes');
            DashboardPage.verifyMenuStructure('Reportes', [
                'Cotizaciones', 
                'Recaudo', 
                'Órdenes Pagadas', 
                'Clientes'
            ]);
        });

        it('Debe mostrar el menú Servicios Clínicos con sus subitems', () => {
            DashboardPage.openMenu('Servicios Clínicos');
            DashboardPage.checkSubMenuItem('Servicios Clínicos', 'Procedimientos');
        });

        it('Debe mostrar el menú Configuración con sus subitems', () => {
            DashboardPage.openMenu('Configuración');
            DashboardPage.verifyMenuStructure('Configuración', [
                'Tipo de Valoraciones', 
                'Categorías de Procedimientos', 
                'Configuración de Marca'
            ]);
        });

    });
  
});
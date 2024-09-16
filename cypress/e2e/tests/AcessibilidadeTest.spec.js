import { reportHTML } from '../../support/commands.js';

describe('Automação de Acessibilidade', () => {
    beforeEach(() => {
        cy.visit('https://www.guia-wcag.com/')
        cy.injectAxe();
    });

    it('Verifica todas as falhas de acessibilidade da página', () => {
        cy.checkA11y(null, null, reportHTML)
    });

    it("Exclui o elemento com a classe '.color-mode-dark' da verificação", () => {
        cy.checkA11y({ exclude: ['.color-mode-dark'] }, null, reportHTML)
    });

    it("Realiza a verificação apenas no elemento com a classe '.color-mode-dark'", () => {
        cy.checkA11y('.color-mode-dark', null, reportHTML)
    });

    it("Verifica falhas com impacto crítico ou sério", () => {
        cy.checkA11y(null, { includedImpacts: ['critical', 'serious'] }, reportHTML)
    });

    it("Exclui a verificação de contraste de contraste", () => {
        cy.checkA11y(null, { rules: { 'color-contrast': { enabled: false } } }, reportHTML)
    });

    it("Exclui contraste e verifica impacto sério/crítico", () => {
        cy.checkA11y(null, { includedImpacts: ['critical', 'serious'], rules: { 'color-contrast': { enabled: false } } }, reportHTML)
    });
});
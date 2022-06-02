/// <reference types = "cypress" />

Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('preCadastro', (email, nome, sobrenome) =>{
    cy.get('#reg_email').clear().type(email)
    cy.get('#reg_password').clear().type('senha222senha')
    cy.get('.button[name="register"]').should('be.visible').click()

    cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a')
        .click()

    cy.get('#account_first_name').clear().type(nome)
    cy.get('#account_last_name').clear().type(sobrenome)
    cy.get('.woocommerce-Button').should('be.visible').click()
});

Cypress.Commands.add('addProdutos', (nomeProduto, tamanho, cor, quantidade) => {
    cy.get('[class="product-block grid"]')
        .contains(nomeProduto)
        .click()
    
    cy.get('.button-variable-item-' + tamanho).click()
    cy.get('.button-variable-item-' + cor).click()
    cy.get('.input-text').clear().type(quantidade)
    cy.get('.single_add_to_cart_button').click()
});

Cypress.Commands.add('validaAddProduto', (quantCarrinho, nomeProd) => {
    cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantCarrinho)
    cy.get('.woocommerce-message').should('contain', nomeProd)
});

Cypress.Commands.add('editarEndFaturamento', (pais, endereco, numeroEnd, cidade, estado, cep, telefone) => {
    cy.get('#select2-billing_country-container').click()
    .type(pais).get('[aria-selected="true"]').click()
    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_address_2').clear().type(numeroEnd)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(`${estado}{enter}`)
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(telefone)
});
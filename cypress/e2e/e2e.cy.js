/// <reference types="cypress" />

import Chance from 'chance'
const chance = new Chance

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    const nome = chance.name()
    const sobrenome = chance.name_suffix()
    const email = chance.email()

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.preCadastro(email, nome, sobrenome)
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        const meioDePagamento = 'Transferência bancária'
        
        cy.visit('produtos')

        cy.addProdutos('Abominable Hoodie', 'XS', 'Red', 3)
        cy.validaAddProduto(3, 'Abominable Hoodie')
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Aero Daily Fitness Tee', 'S', 'Brown', 1)
        cy.validaAddProduto(4, 'Aero Daily Fitness Tee')
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Aether Gym Pant', '33', 'Green', 4)
        cy.validaAddProduto(8, 'Aether Gym Pant')
        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.get('[class="product-block grid"]')
            .eq(3)
            .click()
        cy.get('.single_add_to_cart_button').click()
        cy.validaAddProduto(9, 'Agasalho jhony quest')

        cy.get('.woocommerce-message > .button').click()

        cy.get('strong > .woocommerce-Price-amount > bdi').then(valorTotal => {
            const valor = valorTotal.text()
            expect(valor).to.eq('R$856,00')
        })

        cy.get('.checkout-button').click()
        cy.editarEndFaturamento('Brasil', 'Rua Itambé', '123', 'São Paulo', 'São Paulo', '01222111', '11988888983')
        cy.contains(meioDePagamento).click()
        cy.get('#terms').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        cy.get('tfoot > :nth-child(3) > td > .woocommerce-Price-amount').should('have.text', 'R$856,00')
        cy.get('tfoot > :nth-child(2) > td').should('have.text', meioDePagamento)    
    });


})
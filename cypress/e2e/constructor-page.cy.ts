const appURL = 'http://localhost:4000';

const constructorElementBun1 = `[data-cy=constructor-element-bun1]`;
const constructorElementMain = `[data-cy=constructor-element-main]`;
const constructorElementBun2 = `[data-cy=constructor-element-bun2]`;
const burgerIngredient = (_id: string) => `[data-cy=burger-ingredient-${_id}]`;
const modal = `[data-cy=modal]`;
const closeModalButton = `[data-cy=close-modal-button]`;
const modalOverlay = `[data-cy=modal-overlay]`;
const burgerConstructor = `[data-cy=burger-constructor]`;

beforeEach(() => {
  cy.setCookie('accessToken', 'mockAccessToken');
  window.localStorage.setItem('refreshToken', 'mockRefreshToken');

  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

  cy.visit(appURL);
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('Интеграционное тестирование cypress', () => {
  it('Добавление ингредиентов в конструктор', () => {
    const _id1 = '643d69a5c3f7b9001cfa093c'; // булка
    cy.get(constructorElementBun1).should('exist');
    cy.get(constructorElementBun2).should('exist');
    cy.get(burgerIngredient(_id1)).contains('Добавить').click();
    cy.get(constructorElementBun1).should('not.exist');
    cy.get(constructorElementBun2).should('not.exist');

    const _id2 = '643d69a5c3f7b9001cfa0941'; // котлета
    cy.get(constructorElementMain).should('exist');
    cy.get(burgerIngredient(_id2)).contains('Добавить').click();
    cy.get(constructorElementMain).should('not.exist');
  });

  it('Модальное окно ингредиента', () => {
    const _id1 = '643d69a5c3f7b9001cfa093c';
    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(_id1)).click(); // кнопка
    cy.get(modal).should('exist');
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');

    const _id2 = '643d69a5c3f7b9001cfa0941';
    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(_id2)).click();
    cy.get(modal).should('exist');
    cy.get(modalOverlay).click({ force: true }); // оверлей
    cy.get(modal).should('not.exist');
  });

  it('Оформление заказа', () => {
    const _id1 = '643d69a5c3f7b9001cfa093c'; // булка
    cy.get(constructorElementBun1).should('exist');
    cy.get(constructorElementBun2).should('exist');
    cy.get(burgerIngredient(_id1)).contains('Добавить').click();
    cy.get(constructorElementBun1).should('not.exist');
    cy.get(constructorElementBun2).should('not.exist');

    const _id2 = '643d69a5c3f7b9001cfa0941'; // котлета
    cy.get(constructorElementMain).should('exist');
    cy.get(burgerIngredient(_id2)).contains('Добавить').click();
    cy.get(constructorElementMain).should('not.exist');

    const number = '11111'; // поле number заказа
    cy.get(modal).should('not.exist');
    cy.get(burgerConstructor).contains('Оформить заказ').click();
    cy.get(modal).should('exist');
    cy.get(modal).should('contain', number);
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');
  });
});

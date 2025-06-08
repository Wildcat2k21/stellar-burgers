const appURL = 'http://localhost:4000';

const constructorElementBun1 = `[data-cy=constructor-element-bun1]`;
const constructorElementMain = `[data-cy=constructor-element-main]`;
const constructorElementBun2 = `[data-cy=constructor-element-bun2]`;
const burgerIngredient = (_id: string) => `[data-cy=burger-ingredient-${_id}]`;
const modal = `[data-cy=modal]`;
const closeModalButton = `[data-cy=close-modal-button]`;
const modalOverlay = `[data-cy=modal-overlay]`;
const burgerConstructor = `[data-cy=burger-constructor]`;
const constructorItemByName = (name: string) => `[data-cy=constructor-item][data-name="${name}"]`;
const modalTitle = `[data-cy=modal-title]`;

beforeEach(() => {
  cy.setCookie('accessToken', 'mockAccessToken');
  window.localStorage.setItem('refreshToken', 'mockRefreshToken');

  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

  cy.visit(appURL);
  cy.wait('@getIngredients');
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('Интеграционное тестирование cypress', () => {
  it('Добавление ингредиентов в конструктор', () => {
    const bunId = '643d69a5c3f7b9001cfa093c'; // булка
    const bunName = 'Краторная булка N-200i';
    cy.get(burgerIngredient(bunId)).contains('Добавить').click();

    cy.get(constructorElementBun1).should('exist');
    cy.get(constructorElementBun2).should('exist');
    cy.get(constructorItemByName(bunName)).should('exist');

    const mainId = '643d69a5c3f7b9001cfa0941'; // котлета
    const mainName = 'Филе Люминесцентного тетраодонтимформа';
    cy.get(burgerIngredient(mainId)).contains('Добавить').click();

    cy.get(constructorElementMain).should('not.exist');
    cy.get(constructorItemByName(mainName)).should('exist');
  });

  it('Модальное окно ингредиента отображает правильные данные', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';
    const bunName = 'Краторная булка N-200i';
    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(bunId)).click();
    cy.get(modal).should('exist');
    cy.get(modalTitle).should('contain', bunName);
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');

    const mainId = '643d69a5c3f7b9001cfa0941';
    const mainName = 'Филе Люминесцентного тетраодонтимформа';
    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(mainId)).click();
    cy.get(modal).should('exist');
    cy.get(modalTitle).should('contain', mainName);
    cy.get(modalOverlay).click({ force: true });
    cy.get(modal).should('not.exist');
  });

  it('Оформление заказа и очистка конструктора', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';
    const bunName = 'Краторная булка N-200i';
    const mainId = '643d69a5c3f7b9001cfa0941';
    const mainName = 'Филе Люминесцентного тетраодонтимформа';

    cy.get(burgerIngredient(bunId)).contains('Добавить').click();
    cy.get(burgerIngredient(mainId)).contains('Добавить').click();

    cy.get(modal).should('not.exist');
    cy.get(burgerConstructor).contains('Оформить заказ').click();
    cy.get(modal).should('exist');
    cy.get(modal).should('contain', '11111'); // проверка номера заказа

    // Проверка очистки конструктора
    cy.get(constructorItemByName(bunName)).should('not.exist');
    cy.get(constructorItemByName(mainName)).should('not.exist');

    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');
  });
});

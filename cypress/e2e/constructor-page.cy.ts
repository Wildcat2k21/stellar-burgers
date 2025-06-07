const appURL = 'http://localhost:4000';

const constructorElementBun1 = `[data-cy=constructor-element-bun1]`;
const constructorElementMain = `[data-cy=constructor-element-main]`;
const constructorElementBun2 = `[data-cy=constructor-element-bun2]`;
const burgerIngredient = (_id) => `[data-cy=burger-ingredient-${_id}]`;
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

/**
 * Утилита-обёртка:
 *  по ID берём полное имя ингредиента из фикстуры
 *  и ассертом проверяем, что оно присутствует в конструкторе.
 */
function expectIngredientInConstructor(_id) {
  cy.fixture('ingredients.json').then(({ data }) => {
    const { name } = data.find((i) => i._id === _id);
    cy.get(burgerConstructor).contains(name).should('exist');
  });
}

describe('Интеграционное тестирование cypress', () => {
  it('Добавление ингредиентов в конструктор', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';   // булка
    const meatId = '643d69a5c3f7b9001cfa0941';  // котлета

    // БУЛКА
    cy.get(constructorElementBun1).should('exist');
    cy.get(constructorElementBun2).should('exist');
    cy.get(burgerIngredient(bunId)).contains('Добавить').click();
    cy.get(constructorElementBun1).should('not.exist');
    cy.get(constructorElementBun2).should('not.exist');
    expectIngredientInConstructor(bunId);       // <-- точная проверка

    // НАЧИНКА
    cy.get(constructorElementMain).should('exist');
    cy.get(burgerIngredient(meatId)).contains('Добавить').click();
    cy.get(constructorElementMain).should('not.exist');
    expectIngredientInConstructor(meatId);      // <-- точная проверка
  });

  it('Модальное окно ингредиента', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';
    const meatId = '643d69a5c3f7b9001cfa0941';

    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(bunId)).click();    // кнопка
    cy.get(modal).should('exist');
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');

    cy.get(modal).should('not.exist');
    cy.get(burgerIngredient(meatId)).click();
    cy.get(modal).should('exist');
    cy.get(modalOverlay).click({ force: true }); // оверлей
    cy.get(modal).should('not.exist');
  });

  it('Оформление заказа', () => {
    const bunId = '643d69a5c3f7b9001cfa093c';   // булка
    const meatId = '643d69a5c3f7b9001cfa0941';  // котлета
    const orderNumber = '11111';                // поле number заказа

    // Добавляем булку
    cy.get(constructorElementBun1).should('exist');
    cy.get(constructorElementBun2).should('exist');
    cy.get(burgerIngredient(bunId)).contains('Добавить').click();
    cy.get(constructorElementBun1).should('not.exist');
    cy.get(constructorElementBun2).should('not.exist');
    expectIngredientInConstructor(bunId);

    // Добавляем начинку
    cy.get(constructorElementMain).should('exist');
    cy.get(burgerIngredient(meatId)).contains('Добавить').click();
    cy.get(constructorElementMain).should('not.exist');
    expectIngredientInConstructor(meatId);

    // Оформляем заказ
    cy.get(modal).should('not.exist');
    cy.get(burgerConstructor).contains('Оформить заказ').click();
    cy.get(modal).should('exist').and('contain', orderNumber);
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');
  });
});

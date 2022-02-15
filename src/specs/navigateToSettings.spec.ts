import HomePage from '../screenobjects/homePage';

const homePage = new HomePage();

describe('My sample app', () => {
  it('should be able to click buttons.', async function () {
    await homePage.appIsOldWarningButton.click({ ignoreFailures: true });
    await homePage.secondButton.click();
    
    const headerTextValue = await homePage.headerText.getText();
    expect(headerTextValue).toBe('Android UI Demo');
  });
});

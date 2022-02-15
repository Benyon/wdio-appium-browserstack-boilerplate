export default class AndroidActions {
  static async PerformAction (action: string): Promise<void> {
    if (driver.isAndroid) {
      await browser.execute( 'mobile: performEditorAction', { 'action': action } );
    } else {
      console.warn('Skipping android action as were running iOS');
    }
  }
}
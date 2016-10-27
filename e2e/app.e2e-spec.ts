import { ChallengeprojectPage } from './app.po';

describe('challengeproject App', function() {
  let page: ChallengeprojectPage;

  beforeEach(() => {
    page = new ChallengeprojectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

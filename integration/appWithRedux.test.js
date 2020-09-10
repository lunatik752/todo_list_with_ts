describe('appWithRedux', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto('http://localhost:9009/iframe.html?id=appwithredux-stories--app-with-redux-base-example&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

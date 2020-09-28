describe('task', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        // eslint-disable-next-line no-undef
        await page.goto('http://localhost:9009/iframe.html?id=example-task-stories--task-base-example&viewMode=story');
        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});

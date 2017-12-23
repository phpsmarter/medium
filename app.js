const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

async function run() {
    for (let i = 1; i < 10; i++) {
        const browser = await puppeteer.launch({
                                                headless: false,
                                                gpu: false,
                                                scrollbars: false,
                                                args: ['--reduce-security-for-testing', '--deterministic-fetch','--disable-background-networking' ]
                                            });

        const page = await browser.newPage();
        

        console.log(i);
        await page.goto('https://medium.com/tag/cybersecurity');

        for (let j = 0; j <30; j++) {

            let readMore = await page.$$('.postArticle-readMore > .button ');

            if (readMore.length <=j ){
                for (let k = 0; k <1000; k++){
                    await page.waitFor(1);
                    await page.keyboard.press('ArrowDown',{delay:5});
                }
            }
            
            readMore = await page.$$('.postArticle-readMore > .button ');           

            const pathname = await readMore[j].getProperty('pathname');

            const pathnameString = await pathname.jsonValue()
            
            if (pathnameString.search('liormarga')> 0){
                
                await readMore[j].click();
                for (let k = 0; k <30; k++){
                    await page.waitFor(1000);
                    
                    await page.keyboard.press('ArrowDown');
                }

                let imgs = await page.$$('img');
                if (imgs.length >2) 
                    await imgs[2].click();

                await page.keyboard.press('ArrowDown');
                
                for (let k = 0; k <30; k++){
                    await page.waitFor(1000);
                    
                    await page.keyboard.press('ArrowDown');
                }                

                break;
            }
                                                  
        }

        browser.close();
    }
}
run();
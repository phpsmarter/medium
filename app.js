const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];
const browseUrl = 'https://medium.com/tag/chrome';
const READ_MORE_SELECTOR = '.postArticle-readMore > .button ';
const WRITER = 'liormarga';
const IMG_SELECTOR = 'img';


let scrollDown = async (page,delay,pressNum) => {
    for (let i = 0; i <pressNum; i++){                    
        await page.keyboard.press('ArrowDown',{delay:delay});
    }
}

module.export =scrollDown;

async function run() {
    for (let i = 1; i < 10; i++) {
        const browser = await puppeteer.launch({
                                                headless: false,
                                                gpu: false,
                                                scrollbars: false,
                                                args: ['--reduce-security-for-testing', '--deterministic-fetch','--disable-background-networking' ]
                                            });

        const page = await browser.newPage();
        
        await page.goto(browseUrl);

        for (let j = 0; j <30; j++) {
            let readMore = await page.$$(READ_MORE_SELECTOR);

            if (readMore.length <=j ){
                await scrollDown(page,5,1000); 
            }
            
            readMore = await page.$$(READ_MORE_SELECTOR);           
            
            const pathname = await readMore[j].getProperty('pathname');

            const pathnameString = await pathname.jsonValue()
            
            if (pathnameString.search(WRITER)> 0){
                
                await readMore[j].click();
                await scrollDown(page,1000,30);

                let imgs = await page.$$(IMG_SELECTOR);
                if (imgs.length >2) 
                    await imgs[2].click();
                
                await scrollDown(page,1000,30);
                
                break;
            }
                                                  
        }

        browser.close();
    }
}
run();